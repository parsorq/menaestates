/**
 * Trust / how-we-buy room. Primary: how we buy houses East Bay (AEO_ENTRY_MAP).
 * Standalone marketing page (not a lander). Form source: how-we-buy.
 */
export const HOW_WE_BUY_PATH = "/how-we-buy" as const;

export const HOW_WE_BUY_NAV_LABEL = "How we buy";

export const HOW_WE_BUY_RELATED_LINK = {
  href: HOW_WE_BUY_PATH,
  label: "How we buy in the East Bay",
} as const;

export function getHowWeBuyHref(): string {
  return HOW_WE_BUY_PATH;
}
