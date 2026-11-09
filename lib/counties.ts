export const LEAD_COUNTIES = ["Alameda", "Contra Costa"] as const;

export type LeadCounty = (typeof LEAD_COUNTIES)[number];

export function isLeadCounty(value: unknown): value is LeadCounty {
  return typeof value === "string" && (LEAD_COUNTIES as readonly string[]).includes(value);
}
