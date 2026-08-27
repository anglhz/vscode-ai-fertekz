import { createClient } from "npm:@supabase/supabase-js@2";
import Stripe from "npm:stripe@^22.0.0";

const allowedOrigins = new Set([
  "https://fertekz.com",
  "https://www.fertekz.com",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:5173",
]);

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const n8nWebhookUrl = Deno.env.get("N8N_MATERIAL_WEBHOOK_URL");
const n8nWebhookSecret = Deno.env.get("N8N_MATERIAL_WEBHOOK_SECRET");
const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");

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

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const rateLimits = new Map<string, number>();

const verifyCheckoutSession = async (sessionId: unknown) => {
  const id = text(sessionId, 255);
  if (!stripeSecretKey || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(id)) {
    throw new Error("INVALID_CHECKOUT_SESSION");
  }

  const stripe = new Stripe(stripeSecretKey);
  const session = await stripe.checkout.sessions.retrieve(id, { expand: ["subscription"] });
  if (session.mode !== "subscription" || session.status !== "complete" || session.payment_status !== "paid") {
    throw new Error("PAYMENT_NOT_CONFIRMED");
  }

  const subscription = typeof session.subscription === "string"
    ? await stripe.subscriptions.retrieve(session.subscription)
    : session.subscription;
  if (!subscription || !["active", "trialing"].includes(subscription.status)) {
    throw new Error("SUBSCRIPTION_NOT_ACTIVE");
  }

  const email = (session.customer_details?.email ?? session.customer_email ?? "").trim().toLowerCase();
  const company = text(session.metadata?.company, 120);
  const packageId = text(session.metadata?.packageId, 30);
  if (!email || !company || !["start", "foretag", "pro"].includes(packageId)) {
    throw new Error("CHECKOUT_DATA_MISSING");
  }

  return { sessionId: session.id, email, company, packageId };
};

Deno.serve(async (request) => {
  const origin = request.headers.get("origin") ?? "";
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(origin) });
  if (request.method !== "POST") return json({ error: "Metoden stöds inte" }, 405, origin);
  if (!allowedOrigins.has(origin)) return json({ error: "Otillåtet ursprung" }, 403, origin);
  if (!supabaseUrl || !serviceRoleKey || !stripeSecretKey) return json({ error: "Tjänsten är inte konfigurerad" }, 503, origin);

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const lastSubmission = rateLimits.get(ip) ?? 0;
  if (Date.now() - lastSubmission < 60_000) {
    return json({ error: "Vänta en minut innan du skickar igen" }, 429, origin);
  }

  try {
    const body = await request.json();
    let checkout;
    try {
      checkout = await verifyCheckoutSession(body.checkoutSessionId);
    } catch (error) {
      console.error("submit-material-form checkout verification", error instanceof Error ? error.message : error);
      return json({
        error: "Betalningen kunde inte verifieras. Öppna materialformuläret via länken efter betalningen.",
        code: "PAYMENT_REQUIRED",
      }, 403, origin);
    }

    if (body.action === "verify") {
      return json({
        success: true,
        customer: { email: checkout.email, companyName: checkout.company, packageId: checkout.packageId },
      }, 200, origin);
    }

    if (text(body.website, 100)) return json({ success: true }, 200, origin);

    const submission = {
      package_id: checkout.packageId,
      company_name: checkout.company,
      organization_number: text(body.organizationNumber, 30) || null,
      contact_name: text(body.contactName, 120),
      email: checkout.email,
      phone: text(body.phone, 40) || null,
      existing_website: text(body.existingWebsite, 500) || null,
      business_description: text(body.businessDescription, 5000),
      services: text(body.services, 5000),
      target_audience: text(body.targetAudience, 3000),
      service_area: text(body.serviceArea, 1000) || null,
      website_goals: text(body.websiteGoals, 3000),
      desired_pages: text(body.desiredPages, 2000),
      primary_cta: text(body.primaryCta, 500) || null,
      differentiators: text(body.differentiators, 3000) || null,
      design_preferences: text(body.designPreferences, 3000) || null,
      brand_colors: text(body.brandColors, 500) || null,
      inspiration_sites: text(body.inspirationSites, 2000) || null,
      content_notes: text(body.contentNotes, 5000) || null,
      display_contact_details: text(body.displayContactDetails, 2000) || null,
      social_links: text(body.socialLinks, 2000) || null,
      material_link: text(body.materialLink, 1000) || null,
      additional_notes: text(body.additionalNotes, 5000) || null,
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!submission.company_name || !submission.contact_name || !emailPattern.test(submission.email) ||
        !submission.business_description || !submission.services || !submission.target_audience ||
        !submission.website_goals || !submission.desired_pages || body.consent !== true) {
      return json({ error: "Kontrollera de obligatoriska fälten" }, 400, origin);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .upsert({
        company_name: submission.company_name,
        organization_number: submission.organization_number,
        contact_name: submission.contact_name,
        email: submission.email,
        phone: submission.phone,
        package_id: submission.package_id,
        updated_at: new Date().toISOString(),
      }, { onConflict: "email" })
      .select("id")
      .single();
    if (customerError) {
      console.error("submit-material-form customer", customerError);
      return json({ error: "Kunduppgifterna kunde inte sparas", code: "CUSTOMER_SAVE_FAILED" }, 500, origin);
    }

    const { data, error } = await supabase
      .from("material_submissions")
      .insert({ ...submission, customer_id: customer.id, stripe_checkout_session_id: checkout.sessionId })
      .select("id")
      .single();
    if (error) {
      console.error("submit-material-form material", error);
      if (error.code === "23505") {
        return json({ error: "Material har redan skickats för den här beställningen.", code: "ALREADY_SUBMITTED" }, 409, origin);
      }
      return json({ error: "Materialuppgifterna kunde inte sparas", code: "MATERIAL_SAVE_FAILED" }, 500, origin);
    }

    rateLimits.set(ip, Date.now());

    if (n8nWebhookUrl && n8nWebhookSecret) {
      try {
        const response = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Fertekz-Webhook-Secret": n8nWebhookSecret,
          },
          body: JSON.stringify({ type: "material_form", submissionId: data.id, ...submission }),
        });
        if (!response.ok) console.error("n8n material webhook returned", response.status);
      } catch (error) {
        console.error("n8n material webhook failed", error);
      }
    } else if (n8nWebhookUrl) {
      console.error("N8N_MATERIAL_WEBHOOK_SECRET is missing; material notification skipped");
    }

    return json({ success: true, submissionId: data.id }, 200, origin);
  } catch (error) {
    console.error("submit-material-form", error);
    return json({ error: "Materialet kunde inte sparas" }, 500, origin);
  }
});
