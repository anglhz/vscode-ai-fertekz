GRANT SELECT ON public.stripe_subscriptions TO authenticated;

CREATE POLICY "Admins can read Stripe subscriptions" ON public.stripe_subscriptions
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
