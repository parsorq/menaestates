-- PostgREST lock: no grants for anon/authenticated on leads (service_role only).
REVOKE ALL ON TABLE public.leads FROM PUBLIC;
REVOKE ALL ON TABLE public.leads FROM anon, authenticated;
GRANT ALL ON TABLE public.leads TO service_role;
GRANT USAGE ON TYPE public.lead_status TO service_role;
