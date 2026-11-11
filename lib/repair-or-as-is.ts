/**
 * Free tool: repair-vs-as-is chooser.
 * Primary: repair or sell as-is East Bay (AEO_ENTRY_MAP).
 * Standalone marketing page under /tools (not a lander). Form source: repair-or-as-is.
 */
export const REPAIR_OR_AS_IS_PATH = "/tools/repair-or-as-is-east-bay" as const;

export const REPAIR_OR_AS_IS_NAV_LABEL = "Repair or sell as-is";

export const REPAIR_OR_AS_IS_RELATED_LINK = {
  href: REPAIR_OR_AS_IS_PATH,
  label: REPAIR_OR_AS_IS_NAV_LABEL,
} as const;

export function getRepairOrAsIsHref(): string {
  return REPAIR_OR_AS_IS_PATH;
}
