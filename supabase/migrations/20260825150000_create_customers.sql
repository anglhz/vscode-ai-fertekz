CREATE TABLE public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  company_name text NOT NULL,
  organization_number text,
  contact_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  package_id text,
  status text NOT NULL DEFAULT 'material_received'
    CHECK (status IN ('material_received', 'planning', 'production', 'review', 'complete', 'paused')),
  notes text,
  checklist jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX customers_updated_at_idx ON public.customers (updated_at DESC);

INSERT INTO public.customers (
  company_name, organization_number, contact_name, email, phone, package_id, status, created_at, updated_at
)
SELECT DISTINCT ON (lower(email))
  company_name, organization_number, contact_name, lower(email), phone, package_id,
  CASE WHEN status = 'complete' THEN 'complete' ELSE 'material_received' END,
  created_at, created_at
FROM public.material_submissions
ORDER BY lower(email), created_at DESC
ON CONFLICT (email) DO NOTHING;

ALTER TABLE public.material_submissions
  ADD COLUMN customer_id uuid REFERENCES public.customers(id) ON DELETE SET NULL;

UPDATE public.material_submissions AS submission
SET customer_id = customer.id
FROM public.customers AS customer
WHERE lower(submission.email) = customer.email;

CREATE INDEX material_submissions_customer_idx
  ON public.material_submissions (customer_id, created_at DESC);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

GRANT SELECT, UPDATE ON public.customers TO authenticated;
GRANT SELECT, UPDATE ON public.material_submissions TO authenticated;
GRANT ALL ON public.customers TO service_role;

CREATE POLICY "Admins can read customers" ON public.customers
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update customers" ON public.customers
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read material submissions" ON public.material_submissions
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update material submissions" ON public.material_submissions
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
