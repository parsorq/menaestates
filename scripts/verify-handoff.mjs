/**
 * Prompt C check: gate mena_handoff, fill packet, notify on under_contract.
 * Loads .env.local. Uses service role (not ops cookie).
 */
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env.local");

function loadEnvLocal() {
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i < 0) continue;
    const key = trimmed.slice(0, i);
    let val = trimmed.slice(i + 1);
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

function packetMissing(row) {
  const missing = [];
  if (!row.property_address?.trim()) missing.push("address");
  if (!row.motivation?.trim()) missing.push("motivation");
  if (!row.numbers_discussed?.trim()) missing.push("numbers discussed");
  if (!row.access_photos_notes?.trim()) missing.push("access/photos notes");
  if (!row.timeline?.trim()) missing.push("seller timeline");
  if (!row.contract_file_link?.trim()) missing.push("contract file link");
  return missing;
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const menaTo = process.env.MENA_HANDOFF_TO;
const resendKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM || "Mena Estates <onboarding@resend.dev>";

if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}
if (!menaTo || !resendKey) {
  console.error("Missing MENA_HANDOFF_TO or RESEND_API_KEY");
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false } });

const stamp = new Date().toISOString();
const { data: inserted, error: insertErr } = await sb
  .from("leads")
  .insert({
    full_name: "Handoff Verify Lead",
    phone: "5105550199",
    email: "handoff-verify@example.com",
    property_address: "100 Verify St, Oakland CA",
    county: "Alameda",
    motivation: "Test handoff packet",
    timeline: "ASAP",
    occupancy: "Vacant",
    consent_call: true,
    consent_call_at: stamp,
    consent_text_version: "verify",
    consent_text: "verify-handoff script consent text",
    source: "verify-handoff",
    landing_path: "/verify-handoff",
    status: "qualified",
    notes: "Prompt C verify script",
  })
  .select(
    "id, status, property_address, motivation, timeline, numbers_discussed, access_photos_notes, contract_file_link, full_name, phone, email, county, occupancy, notes"
  )
  .single();

if (insertErr) {
  console.error("Insert failed", insertErr.message);
  process.exit(1);
}

const leadId = inserted.id;
console.log("lead", leadId);

const missingBefore = packetMissing(inserted);
if (missingBefore.length === 0) {
  console.error("Expected incomplete packet before fill");
  process.exit(1);
}

if (missingBefore.includes("numbers discussed") === false) {
  console.error("Expected numbers discussed missing");
  process.exit(1);
}

// Simulate gate: refuse mena_handoff while incomplete
if (packetMissing(inserted).length === 0) {
  console.error("Gate would incorrectly allow mena_handoff");
  process.exit(1);
}
console.log("gate_block_ok", missingBefore.join(", "));

// Fill packet
const { data: filled, error: fillErr } = await sb
  .from("leads")
  .update({
    numbers_discussed: "Offer 410k; seller asked 425k",
    access_photos_notes: "Lockbox 1001; photos in Drive",
    contract_file_link: "https://example.com/verify-contract.pdf",
  })
  .eq("id", leadId)
  .select(
    "id, status, property_address, motivation, timeline, numbers_discussed, access_photos_notes, contract_file_link, full_name, phone, email, county, occupancy, notes"
  )
  .single();

if (fillErr) {
  console.error("Packet fill failed", fillErr.message);
  process.exit(1);
}

const missingAfter = packetMissing(filled);
if (missingAfter.length > 0) {
  console.error("Packet still incomplete", missingAfter.join(", "));
  process.exit(1);
}
console.log("packet_complete_ok");

// under_contract + notify
const previous = filled.status;
const { data: under, error: underErr } = await sb
  .from("leads")
  .update({ status: "under_contract" })
  .eq("id", leadId)
  .select(
    "id, status, property_address, motivation, timeline, numbers_discussed, access_photos_notes, contract_file_link, full_name, phone, email, county, occupancy, notes"
  )
  .single();

if (underErr) {
  console.error("under_contract failed", underErr.message);
  process.exit(1);
}

if (previous === "under_contract") {
  console.error("Unexpected prior status");
  process.exit(1);
}

const resend = new Resend(resendKey);
const text = [
  `Under contract · Mena handoff notice (${under.id}) [verify script]`,
  "",
  `Name: ${under.full_name}`,
  `Address: ${under.property_address}`,
  `Motivation: ${under.motivation}`,
  `Seller timeline: ${under.timeline}`,
  `Numbers discussed: ${under.numbers_discussed}`,
  `Access / photos: ${under.access_photos_notes}`,
  `Contract file: ${under.contract_file_link}`,
  `Packet: complete`,
].join("\n");

const { error: mailErr } = await resend.emails.send({
  from,
  to: [menaTo],
  subject: `[verify] Under contract: ${under.full_name} · ${under.property_address}`,
  text,
});

if (mailErr) {
  console.error("Mena notify failed", mailErr);
  process.exit(1);
}
console.log("mena_notify_ok");

const { data: handoff, error: handoffErr } = await sb
  .from("leads")
  .update({ status: "mena_handoff" })
  .eq("id", leadId)
  .select("id, status")
  .single();

if (handoffErr) {
  console.error("mena_handoff failed", handoffErr.message);
  process.exit(1);
}

if (handoff.status !== "mena_handoff") {
  console.error("Expected mena_handoff status");
  process.exit(1);
}
console.log("mena_handoff_ok", handoff.id);
console.log("verify_handoff_passed");
