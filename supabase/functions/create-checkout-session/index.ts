import Stripe from "npm:stripe@17.7.0";

const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
const allowedOrigins = new Set([
  "https://fertekz.com",
  "https://www.fertekz.com",
  "http://127.0.0.1:8080",
  "http://localhost:8080",
]);

const packages = {
  start: { name: "Fertekz Start", priceId: Deno.env.get("STRIPE_PRICE_START") },
  foretag: { name: "Fertekz Företag", priceId: Deno.env.get("STRIPE_PRICE_FORETAG") },
  pro: { name: "Fertekz Pro", priceId: Deno.env.get("STRIPE_PRICE_PRO") },
} as const;

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://fertekz.com",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  Vary: "Origin",
});

const json = (body: unknown, status: number, origin: string) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });

Deno.serve(async (request) => {
  const requestOrigin = request.headers.get("origin") ?? "";
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(requestOrigin) });
  if (request.method !== "POST") return json({ error: "Metoden stöds inte" }, 405, requestOrigin);
  if (!allowedOrigins.has(requestOrigin)) return json({ error: "Otillåtet ursprung" }, 403, requestOrigin);
  if (!stripeSecretKey) return json({ error: "Betalningen är inte konfigurerad ännu" }, 503, requestOrigin);

  try {
    const body = await request.json();
    const packageId = typeof body.packageId === "string" ? body.packageId : "";
    const selected = packages[packageId as keyof typeof packages];
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
    const company = typeof body.company === "string" ? body.company.trim().slice(0, 120) : "";
    const returnOrigin = typeof body.origin === "string" && allowedOrigins.has(body.origin) ? body.origin : requestOrigin;

    if (!selected || !selected.priceId || !email || !company) {
      return json({ error: "Paket, företag eller e-post saknas" }, 400, requestOrigin);
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-02-24.acacia" });
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: selected.priceId, quantity: 1 }],
      success_url: `${returnOrigin}/starta/klart?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnOrigin}/starta?paket=${encodeURIComponent(packageId)}&avbruten=1`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      tax_id_collection: { enabled: true },
      metadata: { packageId, packageName: selected.name, company },
      subscription_data: { metadata: { packageId, packageName: selected.name, company } },
      locale: "sv",
    });

    if (!session.url) return json({ error: "Stripe returnerade ingen betalningslänk" }, 502, requestOrigin);
    return json({ url: session.url }, 200, requestOrigin);
  } catch (error) {
    console.error("create-checkout-session", error);
    return json({ error: "Betalningen kunde inte startas" }, 500, requestOrigin);
  }
});
