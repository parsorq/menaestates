-- Status-change history for ops. Service role only. No public anon writes.

CREATE TABLE IF NOT EXISTS public.lead_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads (id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  kind TEXT NOT NULL,
  from_status public.lead_status,
  to_status public.lead_status NOT NULL,
  actor_label TEXT NOT NULL,
  CONSTRAINT lead_events_kind_check CHECK (kind = 'status_change')
);

CREATE INDEX IF NOT EXISTS idx_lead_events_lead_created
  ON public.lead_events (lead_id, created_at DESC);

ALTER TABLE public.lead_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role only" ON public.lead_events;
CREATE POLICY "Service role only"
  ON public.lead_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

REVOKE ALL ON TABLE public.lead_events FROM PUBLIC;
REVOKE ALL ON TABLE public.lead_events FROM anon, authenticated;
GRANT ALL ON TABLE public.lead_events TO service_role;
