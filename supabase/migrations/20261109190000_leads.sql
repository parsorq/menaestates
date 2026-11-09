-- Mena Estates Phase 1: seller leads. Service role only. No public anon writes.

DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM (
    'new',
    'contacted',
    'qualified',
    'offer_out',
    'under_contract',
    'mena_handoff',
    'closed',
    'dead'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  property_address TEXT NOT NULL,
  county TEXT NOT NULL,
  motivation TEXT NOT NULL,
  timeline TEXT NOT NULL,
  occupancy TEXT NOT NULL,
  consent_call BOOLEAN NOT NULL DEFAULT false,
  consent_call_at TIMESTAMPTZ,
  consent_text_version TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'web',
  landing_path TEXT NOT NULL DEFAULT '/',
  status lead_status NOT NULL DEFAULT 'new',
  utm JSONB NOT NULL DEFAULT '{}'::jsonb,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_county ON leads (county);

CREATE OR REPLACE FUNCTION set_leads_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_leads_updated_at ON leads;
CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION set_leads_updated_at();

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role only" ON leads;
CREATE POLICY "Service role only"
  ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

REVOKE ALL ON TABLE leads FROM anon, authenticated;
GRANT ALL ON TABLE leads TO service_role;
