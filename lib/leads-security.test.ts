import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const migration = readFileSync(
  resolve(__dirname, "../supabase/migrations/20261109190000_leads.sql"),
  "utf8"
);
const lock = readFileSync(
  resolve(__dirname, "../supabase/migrations/20261109190100_leads_postgrest_lock.sql"),
  "utf8"
);
const leadEvents = readFileSync(
  resolve(__dirname, "../supabase/migrations/20261109230000_lead_events.sql"),
  "utf8"
);
const submitIp = readFileSync(
  resolve(__dirname, "../supabase/migrations/20261109240000_leads_submit_ip.sql"),
  "utf8"
);
const intakeStage = readFileSync(
  resolve(__dirname, "../supabase/migrations/20261110150000_leads_intake_stage.sql"),
  "utf8"
);
const optionalAddressCounty = readFileSync(
  resolve(
    __dirname,
    "../supabase/migrations/20261111010000_leads_optional_address_county.sql"
  ),
  "utf8"
);
const requirePropertyAddress = readFileSync(
  resolve(
    __dirname,
    "../supabase/migrations/20261111020000_leads_require_property_address.sql"
  ),
  "utf8"
);

describe("leads PostgREST lock", () => {
  it("enables RLS and service_role policy", () => {
    expect(migration).toMatch(/ENABLE ROW LEVEL SECURITY/);
    expect(migration).toMatch(/TO service_role/);
    expect(migration).toMatch(/REVOKE ALL ON TABLE leads FROM anon, authenticated/);
  });

  it("revokes anon/authenticated in lock migration", () => {
    expect(lock).toMatch(/REVOKE ALL ON TABLE public\.leads FROM anon, authenticated/);
    expect(lock).toMatch(/GRANT ALL ON TABLE public\.leads TO service_role/);
  });
});

describe("lead_events PostgREST lock", () => {
  it("enables RLS and service_role only", () => {
    expect(leadEvents).toMatch(/ENABLE ROW LEVEL SECURITY/);
    expect(leadEvents).toMatch(/TO service_role/);
    expect(leadEvents).toMatch(
      /REVOKE ALL ON TABLE public\.lead_events FROM anon, authenticated/
    );
    expect(leadEvents).toMatch(/GRANT ALL ON TABLE public\.lead_events TO service_role/);
  });
});

describe("leads submit_ip", () => {
  it("adds submit_ip for IP rate limits", () => {
    expect(submitIp).toMatch(/ADD COLUMN IF NOT EXISTS submit_ip TEXT/);
    expect(submitIp).toMatch(/idx_leads_submit_ip_created/);
  });
});

describe("leads intake_stage", () => {
  it("adds contact/qualified stage for staged guest intake", () => {
    expect(intakeStage).toMatch(/ADD COLUMN IF NOT EXISTS intake_stage TEXT/);
    expect(intakeStage).toMatch(/contact.*qualified|qualified.*contact/);
    expect(intakeStage).toMatch(/leads_intake_stage_check/);
  });
});

describe("leads optional county", () => {
  it("drops NOT NULL on county; address required again after", () => {
    expect(optionalAddressCounty).toMatch(/ALTER COLUMN county DROP NOT NULL/);
    expect(requirePropertyAddress).toMatch(
      /ALTER COLUMN property_address SET NOT NULL/
    );
  });
});
