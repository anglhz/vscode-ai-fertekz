import Stripe from "npm:stripe@^22.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const stripeId = (value: string | { id: string } | null) =>
  typeof value === "string" ? value : value?.id ?? null;

const periodEnd = (subscription: Stripe.Subscription) => {
  const periods = subscription.items.data
    .map((item) => item.current_period_end)
    .filter((value): value is number => typeof value === "number");
  return periods.length ? new Date(Math.max(...periods) * 1000).toISOString() : null;
};

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !serviceRoleKey) {
    console.error("Stripe webhook secrets are missing");
    return json({ error: "Webhook is not configured" }, 503);
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return json({ error: "Stripe signature is missing" }, 400);

  const stripe = new Stripe(stripeSecretKey);
  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      await request.text(),
      signature,
      webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch (error) {
    console.error("Invalid Stripe signature", error);
    return json({ error: "Invalid signature" }, 400);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const subscriptionId = stripeId(session.subscription);
      if (subscriptionId && session.metadata?.packageId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const { error } = await supabase.from("stripe_subscriptions").upsert({
          stripe_subscription_id: subscription.id,
          stripe_customer_id: stripeId(subscription.customer),
          stripe_checkout_session_id: session.id,
          customer_email: session.customer_details?.email ?? session.customer_email,
          company: session.metadata.company ?? null,
          package_id: session.metadata.packageId,
          status: subscription.status,
          current_period_end: periodEnd(subscription),
          cancel_at_period_end: subscription.cancel_at_period_end,
          updated_at: new Date().toISOString(),
        }, { onConflict: "stripe_subscription_id" });
        if (error) throw error;
      }
    }

    if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const { error } = await supabase.from("stripe_subscriptions").update({
        status: subscription.status,
        current_period_end: periodEnd(subscription),
        cancel_at_period_end: subscription.cancel_at_period_end,
        updated_at: new Date().toISOString(),
      }).eq("stripe_subscription_id", subscription.id);
      if (error) throw error;
    }

    return json({ received: true });
  } catch (error) {
    console.error(`Stripe webhook failed for ${event.id}`, error);
    return json({ error: "Webhook handler failed" }, 500);
  }
});
