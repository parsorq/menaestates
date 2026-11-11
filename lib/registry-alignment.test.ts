import { describe, expect, it } from "vitest";
import {
  evaluateRegistryAlignment,
  firstRegistryAlignmentFailure,
  marketingRouteChecklistRows,
} from "./registry-alignment";
import { GET_A_CASH_OFFER_PATH } from "./get-a-cash-offer";
import { GUIDES_HUB_PATH } from "./guides-hub";
import { HOW_WE_BUY_PATH } from "./how-we-buy";
import { CITIES_HUB_PATH, LANDERS, guideLanders } from "./landers";
import { REPAIR_OR_AS_IS_PATH } from "./repair-or-as-is";
import { PAGE_SEO, SEO_ROUTE_KEYS } from "./seo-metadata";
import {
  getGuideLanderSubstance,
  guideRelatedLinks,
} from "./guide-landers";

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

  it("gives every guide substance, process, FAQs, sources, and related doors", () => {
    for (const lander of guideLanders()) {
      const substance = getGuideLanderSubstance(lander.slug);
      expect(substance, lander.slug).toBeDefined();
      expect(substance!.processSteps.length).toBeGreaterThanOrEqual(3);
      expect(substance!.needFromSeller.length).toBeGreaterThanOrEqual(3);
      expect(substance!.faqs.length).toBeGreaterThanOrEqual(3);
      expect(substance!.faqs.length).toBeLessThanOrEqual(5);
      expect(substance!.sources.length).toBeGreaterThanOrEqual(2);
      if (substance!.guideKey === "inherited") {
        expect(substance!.doNotDo?.items.length).toBeGreaterThanOrEqual(3);
      }
      expect(lander.path.startsWith("/guides/")).toBe(true);
      expect(lander.defaultMotivation).toBeTruthy();

      const related = guideRelatedLinks(lander);
      expect(related[0]?.href).toBe(CITIES_HUB_PATH);
      expect(related.some((link) => link.href === HOW_WE_BUY_PATH)).toBe(true);
      expect(related.some((link) => link.href === GUIDES_HUB_PATH)).toBe(true);
      const cityLinks = related.filter((link) =>
        link.href.startsWith("/sell-house-fast-"),
      );
      const peerGuide = related.filter(
        (link) =>
          link.href !== CITIES_HUB_PATH &&
          link.href !== HOW_WE_BUY_PATH &&
          link.href !== GUIDES_HUB_PATH &&
          link.href !== REPAIR_OR_AS_IS_PATH &&
          !link.href.startsWith("/sell-house-fast-"),
      );
      expect(cityLinks.length).toBeGreaterThanOrEqual(2);
      expect(peerGuide.length).toBe(1);
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
      "/about",
      GET_A_CASH_OFFER_PATH,
      GUIDES_HUB_PATH,
      "/sell-house-fast-oakland",
      "/sell-house-fast-san-leandro",
      "/sell-house-fast-hayward",
      "/sell-house-fast-castro-valley",
      "/sell-house-fast-san-lorenzo",
      "/sell-house-fast-newark",
      "/sell-house-fast-tracy",
      "/guides/sell-inherited-house-east-bay",
      "/guides/sell-house-as-is-east-bay",
      REPAIR_OR_AS_IS_PATH,
    ]);
    for (const row of checklist) {
      expect(row.coreQuery, row.path).toBeTruthy();
    }
  });
});
