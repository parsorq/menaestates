-- Staged guest intake: contact (phone + address) then qualify on call or step 2.
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS intake_stage TEXT NOT NULL DEFAULT 'qualified';

ALTER TABLE public.leads
  DROP CONSTRAINT IF EXISTS leads_intake_stage_check;

ALTER TABLE public.leads
  ADD CONSTRAINT leads_intake_stage_check
  CHECK (intake_stage IN ('contact', 'qualified'));

COMMENT ON COLUMN public.leads.intake_stage IS
  'contact = short first ask; qualified = name + sell facts present or confirmed on call';
