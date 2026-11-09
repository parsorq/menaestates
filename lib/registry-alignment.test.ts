import { describe, expect, it } from "vitest";
import {
  evaluateRegistryAlignment,
  firstRegistryAlignmentFailure,
  marketingRouteChecklistRows,
} from "./registry-alignment";
import { LANDERS } from "./landers";
import { PAGE_SEO, SEO_ROUTE_KEYS } from "./seo-metadata";

describe("registry alignment", () => {
  it("keeps PAGE_SEO, sitemap, and llms aligned", () => {
    const result = evaluateRegistryAlignment();
    const failure = firstRegistryAlignmentFailure(result);
    expect(result.ok, failure?.detail).toBe(true);
    expect(failure).toBeNull();
  });

  it("lists every lander in SEO keys with matching path", () => {
    for (const lander of LANDERS) {
      expect(SEO_ROUTE_KEYS).toContain(lander.slug);
      expect(PAGE_SEO[lander.slug as keyof typeof PAGE_SEO].path).toBe(
        lander.path,
      );
    }
  });

  it("marks each marketing route present in sitemap and llms", () => {
    for (const row of marketingRouteChecklistRows()) {
      expect(row.inSitemap, row.path).toBe(true);
      expect(row.inLlmsIndexable, row.path).toBe(true);
      expect(row.inLlmsCanonicalBlock, row.path).toBe(true);
    }
  });
});
