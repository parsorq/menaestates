-- Guest ask: address and county are optional. Ops fills gaps on the call.

ALTER TABLE leads
  ALTER COLUMN property_address DROP NOT NULL;

ALTER TABLE leads
  ALTER COLUMN county DROP NOT NULL;
