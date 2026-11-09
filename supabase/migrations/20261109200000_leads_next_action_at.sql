-- Prompt B: next follow-up time on the same leads table (no second CRM).
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS next_action_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_leads_next_action_at
  ON public.leads (next_action_at ASC NULLS LAST);
