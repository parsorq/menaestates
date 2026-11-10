import { describe, expect, it } from "vitest";
import {
  evaluateRegistryAlignment,
  firstRegistryAlignmentFailure,
  marketingRouteChecklistRows,
} from "./registry-alignment";
import { HOW_WE_BUY_PATH } from "./how-we-buy";
import { CITIES_HUB_PATH, LANDERS, situationLanders } from "./landers";
import { REPAIR_OR_AS_IS_PATH } from "./repair-or-as-is";
import { PAGE_SEO, SEO_ROUTE_KEYS } from "./seo-metadata";
import {
  getSituationLanderSubstance,
  situationRelatedLinks,
} from "./situation-landers";

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

  it("gives every situation lander substance, FAQs, and related doors", () => {
    for (const lander of situationLanders()) {
      const substance = getSituationLanderSubstance(lander.slug);
      expect(substance, lander.slug).toBeDefined();
      expect(substance!.needFromSeller.length).toBeGreaterThanOrEqual(3);
      expect(substance!.faqs.length).toBeGreaterThanOrEqual(3);
      expect(substance!.faqs.length).toBeLessThanOrEqual(5);
      expect(lander.defaultMotivation).toBeTruthy();

      const related = situationRelatedLinks(lander);
      expect(related[0]?.href).toBe(CITIES_HUB_PATH);
      expect(related.some((link) => link.href === HOW_WE_BUY_PATH)).toBe(true);
      const cityLinks = related.filter((link) =>
        link.href.startsWith("/sell-house-fast-"),
      );
      const peerSituation = related.filter(
        (link) =>
          link.href !== CITIES_HUB_PATH &&
          link.href !== HOW_WE_BUY_PATH &&
          link.href !== REPAIR_OR_AS_IS_PATH &&
          !link.href.startsWith("/sell-house-fast-"),
      );
      expect(cityLinks.length).toBeGreaterThanOrEqual(2);
      expect(peerSituation.length).toBe(1);
      if (lander.slug === "sell-house-as-is-east-bay") {
        expect(related.some((link) => link.href === REPAIR_OR_AS_IS_PATH)).toBe(
          true,
        );
      }
    }
  });

  it("keeps unique primary queries and a closed leaf↔hub graph", () => {
    const result = evaluateRegistryAlignment();
    const graphFailures = result.checks.filter(
      (check) =>
        !check.pass &&
        (check.id.startsWith("graph-") || check.id.startsWith("core-query-unique") || check.id.startsWith("core-query-path-unique")),
    );
    expect(graphFailures, JSON.stringify(graphFailures)).toEqual([]);

    const checklist = marketingRouteChecklistRows();
    expect(checklist.map((row) => row.path)).toEqual([
      "/",
      CITIES_HUB_PATH,
      HOW_WE_BUY_PATH,
      "/sell-house-fast-oakland",
      "/sell-house-fast-berkeley",
      "/sell-house-fast-hayward",
      "/sell-house-fast-fremont",
      "/sell-house-fast-concord",
      "/sell-house-fast-walnut-creek",
      "/sell-house-fast-richmond",
      "/sell-inherited-house-east-bay",
      "/sell-house-as-is-east-bay",
      "/repair-or-as-is-east-bay",
    ]);
    for (const row of checklist) {
      expect(row.coreQuery, row.path).toBeTruthy();
    }
  });
});
