CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE TABLE public.web_vitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  metric_name text NOT NULL,
  metric_value double precision NOT NULL,
  rating text,
  device text,
  session_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX web_vitals_created_at_idx ON public.web_vitals (created_at DESC);
CREATE INDEX web_vitals_metric_idx ON public.web_vitals (metric_name, created_at DESC);

GRANT INSERT ON public.web_vitals TO anon, authenticated;
GRANT SELECT ON public.web_vitals TO authenticated;
GRANT ALL ON public.web_vitals TO service_role;
ALTER TABLE public.web_vitals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can report web vitals" ON public.web_vitals
FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can read web vitals" ON public.web_vitals
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));