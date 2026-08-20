CREATE TABLE public.stripe_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_subscription_id text NOT NULL UNIQUE,
  stripe_customer_id text,
  stripe_checkout_session_id text UNIQUE,
  customer_email text,
  company text,
  package_id text NOT NULL CHECK (package_id IN ('start', 'foretag', 'pro')),
  status text NOT NULL,
  current_period_end timestamptz,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX stripe_subscriptions_customer_idx
  ON public.stripe_subscriptions (stripe_customer_id);

CREATE INDEX stripe_subscriptions_status_idx
  ON public.stripe_subscriptions (status);

ALTER TABLE public.stripe_subscriptions ENABLE ROW LEVEL SECURITY;

GRANT ALL ON public.stripe_subscriptions TO service_role;

-- No anon/authenticated policy is intentional. Subscription data is private
-- and is only written by the Stripe webhook using the service role.
