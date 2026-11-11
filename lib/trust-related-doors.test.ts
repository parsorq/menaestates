import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ABOUT_PATH, aboutRelatedLinks } from "./about";
import { GUIDES_HUB_PATH } from "./guides-hub";
import { HOW_WE_BUY_PATH, howWeBuyRelatedLinks } from "./how-we-buy";
import { REPAIR_OR_AS_IS_PATH } from "./repair-or-as-is";

describe("trust and about related doors", () => {
  it("wires how-we-buy Related to guides hub and repair tool", () => {
    const hrefs = howWeBuyRelatedLinks().map((link) => link.href);
    expect(hrefs).toContain(GUIDES_HUB_PATH);
    expect(hrefs).toContain(REPAIR_OR_AS_IS_PATH);
    expect(hrefs).toContain(ABOUT_PATH);
  });

  it("wires about Related to guides hub and repair tool", () => {
    const hrefs = aboutRelatedLinks().map((link) => link.href);
    expect(hrefs).toContain(GUIDES_HUB_PATH);
    expect(hrefs).toContain(REPAIR_OR_AS_IS_PATH);
    expect(hrefs).toContain(HOW_WE_BUY_PATH);
  });

  it("keeps header and footer on shared doors only (no Tools or Guides nav)", () => {
    const root = process.cwd();
    const header = readFileSync(
      join(root, "app/components/SiteHeader.tsx"),
      "utf8",
    );
    const footer = readFileSync(
      join(root, "app/components/SiteFooter.tsx"),
      "utf8",
    );
    for (const source of [header, footer]) {
      expect(source).not.toMatch(/Tools/);
      expect(source).not.toMatch(/\/tools\//);
      expect(source).not.toMatch(/getGuidesHubHref|GUIDES_HUB_PATH|\/guides/);
      expect(source).not.toMatch(/getRepairOrAsIsHref|REPAIR_OR_AS_IS/);
    }
  });
});
