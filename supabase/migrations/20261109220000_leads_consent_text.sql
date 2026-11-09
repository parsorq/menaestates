-- Call-consent trail: store the wording shown at submit (SSOT: lib/consent.ts).
-- Pre-migration rows keep version + timestamp only; consent_text stays null.
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS consent_text TEXT;
