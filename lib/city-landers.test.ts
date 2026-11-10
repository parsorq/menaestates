import { describe, expect, it } from "vitest";
import {
  CITY_LANDER_SUBSTANCE,
  cityLanderSlugs,
  cityRelatedLinks,
  getCityLanderSubstance,
} from "./city-landers";
import { HOW_WE_BUY_PATH } from "./how-we-buy";
import { CITIES_HUB_PATH, CITY_LANDER_PATHS, LANDERS } from "./landers";

const TAPE_CITIES = [
  "Oakland",
  "Berkeley",
  "Hayward",
  "Fremont",
  "Concord",
  "Walnut Creek",
  "Richmond",
] as const;

describe("city lander leaves", () => {
  it("covers every CityTape city with a live path", () => {
    for (const name of TAPE_CITIES) {
      expect(CITY_LANDER_PATHS[name]).toMatch(/^\/sell-house-fast-/);
    }
    expect(Object.keys(CITY_LANDER_PATHS)).toHaveLength(TAPE_CITIES.length);
  });

  it("keeps city substance for every city lander", () => {
    const cityLanders = LANDERS.filter((lander) => lander.kind === "city");
    expect(cityLanders).toHaveLength(7);
    expect(cityLanderSlugs()).toHaveLength(7);

    for (const lander of cityLanders) {
      const city = getCityLanderSubstance(lander.slug);
      expect(city, lander.slug).toBeDefined();
      expect(city?.objections.length).toBeGreaterThanOrEqual(3);
      expect(city?.objections.length).toBeLessThanOrEqual(5);
      expect(city?.footprintBuys.length).toBeGreaterThan(40);
      expect(city?.nearbyCities.length).toBeGreaterThan(20);
      expect(lander.defaultCounty).toBe(city?.county);
      expect(CITY_LANDER_PATHS[city!.cityName]).toBe(lander.path);
    }
  });

  it("keeps unique H1 and answer-first copy per city", () => {
    const h1 = new Set<string>();
    const leads = new Set<string>();
    for (const row of CITY_LANDER_SUBSTANCE) {
      const lander = LANDERS.find((entry) => entry.slug === row.slug);
      expect(lander).toBeDefined();
      h1.add(lander!.h1);
      leads.add(lander!.answerFirst);
    }
    expect(h1.size).toBe(7);
    expect(leads.size).toBe(7);
  });

  it("maps Alameda and Contra Costa counties correctly", () => {
    const alameda = ["Oakland", "Berkeley", "Hayward", "Fremont"];
    const contraCosta = ["Concord", "Walnut Creek", "Richmond"];
    for (const name of alameda) {
      const slugPath = CITY_LANDER_PATHS[name];
      const lander = LANDERS.find((entry) => entry.path === slugPath);
      expect(lander?.defaultCounty).toBe("Alameda");
    }
    for (const name of contraCosta) {
      const slugPath = CITY_LANDER_PATHS[name];
      const lander = LANDERS.find((entry) => entry.path === slugPath);
      expect(lander?.defaultCounty).toBe("Contra Costa");
    }
  });

  it("opens related doors with hub, trust, peers, and situations", () => {
    for (const lander of LANDERS.filter((entry) => entry.kind === "city")) {
      const related = cityRelatedLinks(lander);
      expect(related[0]?.href).toBe(CITIES_HUB_PATH);
      expect(related.some((link) => link.href === HOW_WE_BUY_PATH)).toBe(true);
      const cityLinks = related.filter((link) =>
        link.href.startsWith("/sell-house-fast-"),
      );
      const situations = related.filter(
        (link) =>
          link.href !== CITIES_HUB_PATH &&
          link.href !== HOW_WE_BUY_PATH &&
          !link.href.startsWith("/sell-house-fast-"),
      );
      expect(cityLinks.length).toBe(2);
      expect(situations.length).toBe(2);
      expect(lander.source).toMatch(/^lander-/);
      expect(lander.path).toBe(CITY_LANDER_PATHS[
        getCityLanderSubstance(lander.slug)!.cityName
      ]);
    }
  });
});
