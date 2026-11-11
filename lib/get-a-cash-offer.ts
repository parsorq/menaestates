/**
 * Dedicated cash-offer ask. Primary: get a cash offer East Bay (AEO_ENTRY_MAP).
 * Standalone marketing page (not a lander). Form source: get-a-cash-offer.
 */

export const GET_A_CASH_OFFER_PATH = "/get-a-cash-offer" as const;

export const GET_A_CASH_OFFER_NAV_LABEL = "Get a cash offer";

export function getGetACashOfferHref(): string {
  return GET_A_CASH_OFFER_PATH;
}
