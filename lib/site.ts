import { SITE_ORIGIN } from "./brand";

export function getSiteUrl(): string {
  return SITE_ORIGIN;
}

export function getMetadataBase(): URL {
  return new URL(`${SITE_ORIGIN}/`);
}

export function absoluteSiteUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

export function canonicalMeta(
  pathname: string,
): { alternates: { canonical: string } } {
  return { alternates: { canonical: absoluteSiteUrl(pathname) } };
}
