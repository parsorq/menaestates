/**
 * Prompt E check: POST /api/leads with UTMs → leads.utm jsonb holds them.
 * Usage: node scripts/verify-utm.mjs
 * Optional: VERIFY_UTM_BASE=http://localhost:3000
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(import.meta.dirname, "..");
const env = Object.fromEntries(
  readFileSync(resolve(root, ".env.local"), "utf8")
    .split("\n")
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i), line.slice(i + 1)];
    })
);

const base = process.env.VERIFY_UTM_BASE || "http://localhost:3000";
const expectedUtm = {
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "eastbay-sellers",
  utm_content: "oakland-lander",
  utm_term: "sell-house-fast-oakland",
};

const res = await fetch(`${base}/api/leads`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    full_name: "UTM Script Verify",
    phone: "5105550188",
    email: "utm-script@example.com",
    property_address: "456 UTM Check Ave, Oakland, CA",
    county: "Alameda",
    motivation: "tired_landlord",
    timeline: "asap",
    occupancy: "vacant",
    consent_call: true,
    source: "lander-oakland",
    landing_path: "/sell-house-fast-oakland",
    notes: "verify-utm.mjs — auto-deleted",
    utm: expectedUtm,
  }),
});

const body = await res.json().catch(() => ({}));
if (!res.ok || !body.id) {
  console.error("POST /api/leads failed", res.status, body);
  process.exit(1);
}

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data, error } = await sb
  .from("leads")
  .select("id, source, landing_path, utm")
  .eq("id", body.id)
  .single();

if (error || !data) {
  console.error("Select failed", error);
  process.exit(1);
}

const utm = data.utm || {};
const missing = Object.entries(expectedUtm).filter(([k, v]) => utm[k] !== v);
if (missing.length > 0) {
  console.error("utm jsonb mismatch", { expected: expectedUtm, got: utm, missing });
  process.exit(1);
}

await sb.from("leads").delete().eq("id", body.id);

console.log(
  JSON.stringify(
    {
      ok: true,
      id: body.id,
      source: data.source,
      landing_path: data.landing_path,
      utm: data.utm,
      deleted: true,
    },
    null,
    2
  )
);
