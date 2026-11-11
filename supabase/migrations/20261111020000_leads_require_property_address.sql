-- Guest ask requires property address. County stays nullable.

UPDATE leads
SET property_address = 'To confirm on call'
WHERE property_address IS NULL OR btrim(property_address) = '';

ALTER TABLE leads
  ALTER COLUMN property_address SET NOT NULL;
