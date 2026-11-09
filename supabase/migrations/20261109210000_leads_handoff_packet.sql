-- Prompt C: Mena handoff packet on the same leads table (no second CRM).
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS numbers_discussed TEXT,
  ADD COLUMN IF NOT EXISTS access_photos_notes TEXT,
  ADD COLUMN IF NOT EXISTS contract_file_link TEXT;
