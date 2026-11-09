/** Packet required before status can become mena_handoff. */

export type HandoffPacketSource = {
  property_address: string;
  motivation: string;
  timeline: string;
  numbers_discussed: string | null;
  access_photos_notes: string | null;
  contract_file_link: string | null;
};

export const HANDOFF_FIELD_LABELS = {
  property_address: "address",
  motivation: "motivation",
  numbers_discussed: "numbers discussed",
  access_photos_notes: "access/photos notes",
  timeline: "seller timeline",
  contract_file_link: "contract file link",
} as const;

export type HandoffFieldKey = keyof typeof HANDOFF_FIELD_LABELS;

export function handoffPacketMissing(fields: HandoffPacketSource): HandoffFieldKey[] {
  const missing: HandoffFieldKey[] = [];
  if (!fields.property_address?.trim()) missing.push("property_address");
  if (!fields.motivation?.trim()) missing.push("motivation");
  if (!fields.numbers_discussed?.trim()) missing.push("numbers_discussed");
  if (!fields.access_photos_notes?.trim()) missing.push("access_photos_notes");
  if (!fields.timeline?.trim()) missing.push("timeline");
  if (!fields.contract_file_link?.trim()) missing.push("contract_file_link");
  return missing;
}

export function isHandoffPacketComplete(fields: HandoffPacketSource): boolean {
  return handoffPacketMissing(fields).length === 0;
}

export function handoffPacketMissingLabels(fields: HandoffPacketSource): string[] {
  return handoffPacketMissing(fields).map((key) => HANDOFF_FIELD_LABELS[key]);
}

export function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
