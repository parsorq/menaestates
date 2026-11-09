export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "offer_out",
  "under_contract",
  "mena_handoff",
  "closed",
  "dead",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  offer_out: "Offer out",
  under_contract: "Under contract",
  mena_handoff: "Mena handoff",
  closed: "Closed",
  dead: "Dead",
};

export function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value);
}
