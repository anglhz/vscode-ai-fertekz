import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const GSC_API_BASE_URL = Deno.env.get('GSC_API_BASE_URL') ?? 'https://www.googleapis.com';
const GSC_ACCESS_TOKEN = Deno.env.get('GSC_ACCESS_TOKEN');

const gscHeaders = () => ({
  Authorization: `Bearer ${GSC_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

async function gsc(path: string, init?: RequestInit) {
  const res = await fetch(`${GSC_API_BASE_URL}${path}`, { ...init, headers: gscHeaders() });
  const text = await res.text();
  if (!res.ok) {
    console.error(`GSC request failed ${path} [${res.status}]: ${text}`);
    throw new Error(`[${res.status}] ${text}`);
  }
  return text ? JSON.parse(text) : {};
}

function coversTarget(siteUrl: string, target: URL) {
  if (siteUrl.startsWith('sc-domain:')) {
    const domain = siteUrl.slice('sc-domain:'.length).toLowerCase();
    const host = target.hostname.toLowerCase();
    return host === domain || host.endsWith(`.${domain}`);
  }
  try {
    return target.href.startsWith(new URL(siteUrl).href);
  } catch {
    return false;
  }
}

const isoDaysAgo = (days: number) =>
  new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!GSC_ACCESS_TOKEN) {
      return json({ error: 'Search Console-kopplingen saknas' }, 500);
    }

    // --- Auth: signed-in admin only ---
    const authHeader = req.headers.get('Authorization') ?? '';
    const token = authHeader.replace('Bearer ', '');
    if (!token) return json({ error: 'Ej inloggad' }, 401);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData.user) return json({ error: 'Ej inloggad' }, 401);

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    const { data: roles } = await admin
      .from('user_roles')
      .select('role')
      .eq('user_id', userData.user.id)
      .eq('role', 'admin');
    if (!roles || roles.length === 0) return json({ error: 'Behörighet saknas' }, 403);

    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    const targetUrl: string = typeof body.targetUrl === 'string' ? body.targetUrl : 'https://fertekz.com/';
    const days: number = [7, 28, 90].includes(body.days) ? body.days : 28;
    const selected: string | undefined =
      typeof body.siteUrl === 'string' ? body.siteUrl : undefined;

    // --- Resolve verified property ---
    const sitesRes = await gsc('/webmasters/v3/sites');
    const entries: { siteUrl: string; permissionLevel?: string }[] = sitesRes.siteEntry ?? [];
    const target = new URL(targetUrl);
    const matches = entries.filter(
      (e) => e.permissionLevel !== 'siteUnverifiedUser' && coversTarget(e.siteUrl, target),
    );
    if (matches.length === 0) {
      return json({ status: 'no_property', message: 'Ingen verifierad Search Console-egendom täcker sajten.' }, 200);
    }
    let siteUrl: string;
    if (selected) {
      const hit = matches.find((m) => m.siteUrl === selected);
      if (!hit) return json({ error: 'Vald egendom är inte verifierad' }, 400);
      siteUrl = hit.siteUrl;
    } else if (matches.length === 1) {
      siteUrl = matches[0].siteUrl;
    } else {
      return json({ status: 'selection_required', candidates: matches.map((m) => m.siteUrl) }, 200);
    }

    const enc = encodeURIComponent(siteUrl);
    const startDate = isoDaysAgo(days + 2);
    const endDate = isoDaysAgo(2);
    const query = (dimensions: string[], rowLimit = 25) =>
      gsc(`/webmasters/v3/sites/${enc}/searchAnalytics/query`, {
        method: 'POST',
        body: JSON.stringify({ startDate, endDate, dimensions, rowLimit }),
      }).catch((e) => {
        console.error('searchAnalytics failed', e);
        return { rows: [] };
      });

    const [totals, byDate, pages, queries, sitemaps, inspection] = await Promise.all([
      gsc(`/webmasters/v3/sites/${enc}/searchAnalytics/query`, {
        method: 'POST',
        body: JSON.stringify({ startDate, endDate }),
      }).catch(() => ({ rows: [] })),
      query(['date'], 200),
      query(['page'], 25),
      query(['query'], 25),
      gsc(`/webmasters/v3/sites/${enc}/sitemaps`).catch((e) => {
        console.error('sitemaps failed', e);
        return { sitemap: [] };
      }),
      gsc('/v1/urlInspection/index:inspect', {
        method: 'POST',
        body: JSON.stringify({ inspectionUrl: targetUrl, siteUrl }),
      }).catch((e) => {
        console.error('urlInspection failed', e);
        return null;
      }),
    ]);

    return json({
      status: 'ok',
      siteUrl,
      properties: matches.map((m) => m.siteUrl),
      range: { startDate, endDate, days },
      totals: totals.rows?.[0] ?? null,
      byDate: byDate.rows ?? [],
      pages: pages.rows ?? [],
      queries: queries.rows ?? [],
      sitemaps: sitemaps.sitemap ?? [],
      indexing: inspection?.inspectionResult?.indexStatusResult ?? null,
      inspectionLink: inspection?.inspectionResult?.inspectionResultLink ?? null,
    });
  } catch (e) {
    console.error('seo-report error', e);
    return json({ error: e instanceof Error ? e.message : 'Okänt fel' }, 500);
  }
});
