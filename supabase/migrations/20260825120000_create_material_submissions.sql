CREATE TABLE public.material_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'complete')),
  package_id text,
  company_name text NOT NULL,
  organization_number text,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  existing_website text,
  business_description text NOT NULL,
  services text NOT NULL,
  target_audience text NOT NULL,
  service_area text,
  website_goals text NOT NULL,
  desired_pages text NOT NULL,
  primary_cta text,
  differentiators text,
  design_preferences text,
  brand_colors text,
  inspiration_sites text,
  content_notes text,
  display_contact_details text,
  social_links text,
  material_link text,
  additional_notes text
);

CREATE INDEX material_submissions_created_at_idx
  ON public.material_submissions (created_at DESC);

ALTER TABLE public.material_submissions ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.material_submissions TO service_role;

-- No browser-facing policies: submissions contain private customer material
-- and are only written by the submit-material-form Edge Function.
