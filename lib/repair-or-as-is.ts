/**
 * Free tool: repair-vs-as-is chooser.
 * Primary: repair or sell as-is East Bay (AEO_ENTRY_MAP).
 * Standalone marketing page (not a lander). Form source: repair-or-as-is.
 */
export const REPAIR_OR_AS_IS_PATH = "/repair-or-as-is-east-bay" as const;

export const REPAIR_OR_AS_IS_NAV_LABEL = "Repair or as-is";

export const REPAIR_OR_AS_IS_RELATED_LINK = {
  href: REPAIR_OR_AS_IS_PATH,
  label: "Repair or sell as-is",
} as const;

export function getRepairOrAsIsHref(): string {
  return REPAIR_OR_AS_IS_PATH;
}
