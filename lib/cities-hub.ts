import { CITIES_HUB_PATH } from "./landers";

/**
 * Cities catalog hub URL for guest chrome and home doors.
 * Path locked in AEO_ENTRY_MAP (`/cities-we-buy-in-east-bay`).
 */
export function getCitiesHubHref(): string {
  return CITIES_HUB_PATH;
}
