import { Resend } from "resend";
import {
  handoffPacketMissingLabels,
  isHandoffPacketComplete,
} from "@/lib/handoff-packet";
import type { InsertLeadInput, LeadRow } from "@/lib/leads";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function resendFrom(): string {
  return process.env.RESEND_FROM || "Mena Estates <onboarding@resend.dev>";
}

export async function sendLeadAlert(
  leadId: string,
  input: InsertLeadInput
): Promise<{ ok: true } | { error: string }> {
  const resend = getResend();
  const to = process.env.LEAD_ALERT_TO;
  const from = resendFrom();

  if (!resend) return { error: "RESEND_API_KEY missing." };
  if (!to) return { error: "LEAD_ALERT_TO missing." };

  const utmLines =
    input.utm && Object.keys(input.utm).length > 0
      ? Object.entries(input.utm)
          .map(([k, v]) => `  ${k}: ${v}`)
          .join("\n")
      : "  (none)";

  const text = [
    `New seller lead (${leadId})`,
    "",
    `Name: ${input.full_name}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email || "(none)"}`,
    `Address: ${input.property_address}`,
    `County: ${input.county}`,
    `Motivation: ${input.motivation}`,
    `Timeline: ${input.timeline}`,
    `Occupancy: ${input.occupancy}`,
    `Source: ${input.source}`,
    `Landing: ${input.landing_path}`,
    `Consent version: ${input.consent_text_version}`,
    `Consent at: ${input.consent_call_at}`,
    `Consent text: ${input.consent_text}`,
    `UTM:`,
    utmLines,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: `New lead: ${input.full_name} · ${input.county}`,
    text,
  });

  if (error) {
    console.error("[notify] Resend failed", error);
    return { error: typeof error === "object" && "message" in error ? String(error.message) : "Resend failed" };
  }
  return { ok: true };
}

/** Fired when status first becomes under_contract. Recipient: MENA_HANDOFF_TO. */
export async function sendMenaHandoffAlert(
  lead: LeadRow
): Promise<{ ok: true } | { error: string }> {
  const resend = getResend();
  const to = process.env.MENA_HANDOFF_TO;
  const from = resendFrom();

  if (!resend) return { error: "RESEND_API_KEY missing." };
  if (!to) return { error: "MENA_HANDOFF_TO missing." };

  const packetReady = isHandoffPacketComplete(lead);
  const missing = handoffPacketMissingLabels(lead);

  const text = [
    `Under contract · Mena handoff notice (${lead.id})`,
    "",
    `Name: ${lead.full_name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email || "(none)"}`,
    `Address: ${lead.property_address}`,
    `County: ${lead.county}`,
    `Motivation: ${lead.motivation}`,
    `Seller timeline: ${lead.timeline}`,
    `Occupancy: ${lead.occupancy}`,
    `Numbers discussed: ${lead.numbers_discussed || "(pending)"}`,
    `Access / photos: ${lead.access_photos_notes || "(pending)"}`,
    `Contract file: ${lead.contract_file_link || "(pending)"}`,
    `Packet: ${packetReady ? "complete" : `incomplete (${missing.join(", ")})`}`,
    `Status: under_contract`,
    `Notes: ${lead.notes || "(none)"}`,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: `Under contract: ${lead.full_name} · ${lead.property_address}`,
    text,
  });

  if (error) {
    console.error("[notify] Mena handoff Resend failed", error);
    return {
      error:
        typeof error === "object" && "message" in error
          ? String(error.message)
          : "Resend failed",
    };
  }
  return { ok: true };
}
