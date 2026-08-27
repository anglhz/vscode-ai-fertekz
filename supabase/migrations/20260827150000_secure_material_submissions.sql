ALTER TABLE public.material_submissions
  ADD COLUMN stripe_checkout_session_id text;

CREATE UNIQUE INDEX material_submissions_checkout_session_idx
  ON public.material_submissions (stripe_checkout_session_id)
  WHERE stripe_checkout_session_id IS NOT NULL;
