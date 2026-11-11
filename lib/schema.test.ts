import { describe, expect, it } from "vitest";
import { CITY_LANDER_SUBSTANCE } from "./city-landers";
import { cityLanders } from "./landers";
import { LLM_CORE_QUERY_MAP } from "./llms-manifest";
import {
  citiesHubItemListJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
  webSiteJsonLd,
} from "./schema";
import { PAGE_SEO, SEO_ROUTE_KEYS } from "./seo-metadata";
import { getGuideLanderSubstance } from "./guide-landers";

/** Core query → title language that must appear. */
const PRIMARY_TITLE_FRAGMENTS: Record<string, string[]> = {
  "/": ["Cash home buyer", "Hector"],
  "/cities-we-buy-in-east-bay": ["Cities we've bought"],
  "/how-we-buy": ["How we buy houses"],
  "/about": ["About Hector Mena"],
  "/get-a-cash-offer": ["Get a cash offer"],
  "/sell-house-fast-oakland": ["Sell your Oakland house"],
  "/sell-house-fast-san-leandro": ["Sell your San Leandro house"],
  "/sell-house-fast-hayward": ["Sell your Hayward house"],
  "/sell-house-fast-castro-valley": ["Sell your Castro Valley house"],
  "/sell-house-fast-san-lorenzo": ["Sell your San Lorenzo house"],
  "/sell-house-fast-newark": ["Sell your Newark house"],
  "/sell-house-fast-tracy": ["Sell your Tracy house"],
  "/guides": ["Help before the offer"],
  "/guides/sell-inherited-house-east-bay": ["inherited"],
  "/guides/sell-house-as-is-east-bay": ["as-is"],
  "/tools/repair-or-as-is-east-bay": ["Repair or sell as-is"],
};

describe("JSON-LD builders", () => {
  it("emits Organization and WebSite without SearchAction or invented contacts", () => {
    const org = organizationJsonLd();
    const site = webSiteJsonLd();

    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("Mena Estates");
    expect(org).not.toHaveProperty("telephone");
    expect(org).not.toHaveProperty("logo");
    expect(org).not.toHaveProperty("sameAs");

    expect(site["@type"]).toBe("WebSite");
    expect(site).not.toHaveProperty("potentialAction");
    expect(site.publisher).toEqual({ "@id": org["@id"] });
  });

  it("emits cities hub ItemList for every city leaf once", () => {
    const list = citiesHubItemListJsonLd();
    const cities = cityLanders();

    expect(list["@type"]).toBe("ItemList");
    expect(list.numberOfItems).toBe(cities.length);
    expect(list.itemListElement).toHaveLength(cities.length);

    const urls = list.itemListElement.map(
      (row: { url: string }) => row.url,
    );
    expect(new Set(urls).size).toBe(urls.length);
    for (const lander of cities) {
      expect(urls.some((url: string) => url.endsWith(lander.path))).toBe(
        true,
      );
    }
  });

  it("builds FAQPage from shared FAQ arrays with matching question text", () => {
    const sample = CITY_LANDER_SUBSTANCE[0]!;
    const faqs = sample.objections.map((item) => ({
      question: item.title,
      answer: item.body,
    }));
    const schema = faqPageJsonLd(faqs, "https://example.com/leaf");

    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.url).toBe("https://example.com/leaf");
    expect(schema.mainEntity).toHaveLength(faqs.length);
    expect(schema.mainEntity[0].name).toBe(faqs[0]!.question);
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe(faqs[0]!.answer);
  });

  it("keeps guide FAQ arrays eligible for FAQPage (3–5 items)", () => {
    for (const slug of [
      "sell-inherited-house-east-bay",
      "sell-house-as-is-east-bay",
    ] as const) {
      const substance = getGuideLanderSubstance(slug);
      expect(substance).toBeDefined();
      const schema = faqPageJsonLd(substance!.faqs);
      expect(schema.mainEntity.length).toBeGreaterThanOrEqual(3);
      expect(schema.mainEntity.length).toBeLessThanOrEqual(5);
    }
  });
});

describe("AEO_ENTRY_MAP primary ↔ PAGE_SEO / core query", () => {
  it("maps each core query to a PAGE_SEO path with matching title language", () => {
    for (const row of LLM_CORE_QUERY_MAP) {
      const key = SEO_ROUTE_KEYS.find(
        (routeKey) => PAGE_SEO[routeKey].path === row.path,
      );
      expect(key, row.path).toBeDefined();
      const title = PAGE_SEO[key!].title;
      const fragments = PRIMARY_TITLE_FRAGMENTS[row.path];
      expect(fragments, row.path).toBeDefined();
      for (const fragment of fragments!) {
        expect(title, `${row.path} title missing “${fragment}”`).toContain(
          fragment,
        );
      }
      expect(row.query.toLowerCase().replace(/\s+/g, " ")).toBeTruthy();
    }
  });

  it("keeps one core query per indexable SEO route", () => {
    const mapped = new Set(LLM_CORE_QUERY_MAP.map((row) => row.path));
    for (const key of SEO_ROUTE_KEYS) {
      expect(mapped.has(PAGE_SEO[key].path), PAGE_SEO[key].path).toBe(true);
    }
    expect(LLM_CORE_QUERY_MAP).toHaveLength(SEO_ROUTE_KEYS.length);
  });
});
