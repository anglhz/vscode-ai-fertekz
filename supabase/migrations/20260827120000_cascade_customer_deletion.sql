ALTER TABLE public.material_submissions
  DROP CONSTRAINT IF EXISTS material_submissions_customer_id_fkey;

ALTER TABLE public.material_submissions
  ADD CONSTRAINT material_submissions_customer_id_fkey
  FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE;

GRANT DELETE ON public.customers TO authenticated;

CREATE POLICY "Admins can delete customers" ON public.customers
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
