-- Client IP at guest submit for burst rate limits (service role only; not ops UI).
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS submit_ip TEXT;

CREATE INDEX IF NOT EXISTS idx_leads_submit_ip_created
  ON public.leads (submit_ip, created_at DESC)
  WHERE submit_ip IS NOT NULL;
