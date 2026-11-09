import { describe, expect, it } from "vitest";
import { formatUtmPath, pickUtmFromBody, readUtmFromSearchParams } from "./utm";

describe("readUtmFromSearchParams", () => {
  it("keeps only standard UTM keys with values", () => {
    const params = new URLSearchParams(
      "utm_source=google&utm_medium=cpc&utm_campaign=eastbay&foo=bar&utm_term="
    );
    expect(readUtmFromSearchParams(params)).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "eastbay",
    });
  });
});

describe("pickUtmFromBody", () => {
  it("trims strings and drops non-strings", () => {
    expect(
      pickUtmFromBody({
        utm_source: " meta ",
        utm_medium: 1,
        utm_campaign: "",
        utm_content: "oakland",
      })
    ).toEqual({
      utm_source: "meta",
      utm_content: "oakland",
    });
  });

  it("returns empty for bad shapes", () => {
    expect(pickUtmFromBody(null)).toEqual({});
    expect(pickUtmFromBody([])).toEqual({});
    expect(pickUtmFromBody("x")).toEqual({});
  });
});

describe("formatUtmPath", () => {
  it("formats source path for ops", () => {
    expect(
      formatUtmPath({
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "eastbay-sellers",
        utm_content: "oakland-lander",
        utm_term: "sell-house-fast",
      })
    ).toBe("google / cpc / eastbay-sellers · oakland-lander · sell-house-fast");
  });

  it("returns null when empty", () => {
    expect(formatUtmPath({})).toBeNull();
    expect(formatUtmPath(null)).toBeNull();
  });
});
