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
