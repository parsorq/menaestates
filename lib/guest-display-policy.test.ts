import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const cssPath = join(process.cwd(), "app/globals.css");
const css = readFileSync(cssPath, "utf8");

describe("guest display policy", () => {
  it("keeps reading-measure and edge-inline tokens for marketing shells", () => {
    expect(css).toMatch(/--reading-measure:\s*min\(62ch,\s*100%\)/);
    expect(css).toMatch(/--ui-gutter:\s*clamp\(1rem,\s*4vw,\s*2rem\)/);
    expect(css).toMatch(/--edge-inline:\s*max\(/);
    expect(css).toMatch(
      /\.me-shell\s*\{[^}]*var\(--edge-inline\)/s,
    );
    expect(css).toMatch(/\.vc-reading-measure\s*\{[^}]*var\(--reading-measure\)/s);
  });

  it("does not clip or gutter-scroll on document root", () => {
    const htmlBlock = css.match(/html\s*\{[^}]*\}/);
    const bodyBlock = css.match(/body\s*\{[^}]*\}/);
    expect(htmlBlock?.[0] ?? "").not.toMatch(/overflow-x:\s*clip/);
    expect(htmlBlock?.[0] ?? "").not.toMatch(/scrollbar-gutter/);
    expect(bodyBlock?.[0] ?? "").not.toMatch(/overflow-x:\s*clip/);
    expect(bodyBlock?.[0] ?? "").not.toMatch(/scrollbar-gutter/);
  });

  it("keeps compact phone header below 744", () => {
    expect(css).toMatch(/\.me-brand\s*\{[^}]*white-space:\s*nowrap/s);
    expect(css).toMatch(/\.me-brand\s*\{[^}]*overflow:\s*hidden/s);
    expect(css).toMatch(/\.me-header-menu-toggle\s*\{/s);
    expect(css).toMatch(/\.me-header-panel\s*\{[^}]*display:\s*none/s);
    expect(css).toMatch(
      /\.me-site-header\[data-menu-open="true"\]\s*\.me-header-panel\s*\{[^}]*display:\s*flex/s,
    );
  });

  it("switches header to inline chrome from 744", () => {
    expect(css).toMatch(
      /@media\s*\(min-width:\s*744px\)\s*\{[\s\S]*?\.me-header-toolbar\s*\{[^}]*display:\s*none[\s\S]*?\.me-header-panel\s*\{[^}]*display:\s*contents/s,
    );
    expect(css).toMatch(
      /\.me-site-header__inner\s*\{[^}]*flex-wrap:\s*wrap[\s\S]*?\.me-brand\s*\{[^}]*flex:\s*0\s+0\s+auto[^}]*min-width:\s*max-content/s,
    );
    expect(css).not.toMatch(
      /\.me-site-header__inner\s*\{[^}]*flex-wrap:\s*wrap[\s\S]*?\.me-brand\s*\{[^}]*flex:\s*0\s+1\s+auto/s,
    );
    expect(css).toMatch(
      /\.me-site-header\s*\{[^}]*padding-top:\s*env\(safe-area-inset-top/s,
    );
    expect(css).toMatch(
      /\.me-site-footer\s*\{[^}]*env\(safe-area-inset-bottom/s,
    );
  });

  it("stacks dual CTA rows full width below 744 and wraps from 744", () => {
    expect(css).toMatch(
      /\.me-home-hero__cta\s*\{[^}]*flex-direction:\s*column/s,
    );
    expect(css).toMatch(
      /\.me-home-offer__cta\s*\{[^}]*flex-direction:\s*column/s,
    );
    expect(css).toMatch(
      /\.me-hero__cta\s*\{[^}]*flex-direction:\s*column/s,
    );
    expect(css).toMatch(
      /\.me-guides-hub__cta\s*\{[^}]*flex-direction:\s*column/s,
    );
    expect(css).toMatch(/\.me-btn\s*\{[^}]*white-space:\s*nowrap/s);
    expect(css).toMatch(
      /@media\s*\(min-width:\s*744px\)\s*\{[\s\S]*?\.me-home-hero__cta\s*\{[^}]*flex-direction:\s*row[^}]*flex-wrap:\s*wrap/s,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*744px\)\s*\{[\s\S]*?\.me-home-offer__cta\s*\{[^}]*flex-direction:\s*row[^}]*flex-wrap:\s*wrap/s,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*744px\)\s*\{[\s\S]*?\.me-hero__cta\s*\{[^}]*flex-direction:\s*row[^}]*flex-wrap:\s*wrap/s,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*744px\)\s*\{[\s\S]*?\.me-guides-hub__cta\s*\{[^}]*flex-direction:\s*row[^}]*flex-wrap:\s*wrap/s,
    );
  });

  it("clears sticky header on in-page jump targets", () => {
    expect(css).toMatch(
      /\.me-home-hero__cta\s*\{[^}]*scroll-margin-top:\s*calc\(/s,
    );
    expect(css).toMatch(
      /\.me-home-offer__cta\s*\{[^}]*scroll-margin-top:\s*calc\(/s,
    );
    expect(css).toMatch(
      /\.me-cities-hub__form\s*\{[^}]*scroll-margin-top:\s*calc\(/s,
    );
    expect(css).toMatch(
      /\.me-city-lander__form\s*\{[^}]*scroll-margin-top:\s*calc\(/s,
    );
    expect(css).toMatch(
      /\.me-city-lander \.me-offer-ask\s*\{[^}]*scroll-margin-top:\s*calc\(/s,
    );
    expect(css).toMatch(
      /\.me-offer-ask\s*\{[^}]*scroll-margin-top:\s*calc\(/s,
    );
    expect(css).toMatch(/scroll-margin-top:\s*calc\(8\.5rem/);
    expect(css).toMatch(
      /@media\s*\(min-width:\s*744px\)\s*and\s*\(max-width:\s*1031px\)\s*\{[\s\S]*?\.me-offer-ask[\s\S]*?scroll-margin-top:\s*calc\(8\.5rem/s,
    );
  });

  it("keeps guide leaf hero split from squeezing below 744", () => {
    const heroSplit = css.match(
      /@media\s*\(min-width:\s*900px\)\s*\{\s*\.me-hero__grid\s*\{[^}]*\}/s,
    );
    expect(heroSplit?.[0] ?? "").toMatch(/grid-template-columns/);
    expect(css).not.toMatch(
      /@media\s*\(min-width:\s*744px\)\s*\{[^}]*\.me-hero__grid[^}]*grid-template-columns/s,
    );
  });

  it("hardens guide source link wrap at narrow gates", () => {
    expect(css).toMatch(
      /\.me-guide-sources__item a\s*\{[^}]*overflow-wrap:\s*anywhere/s,
    );
  });

  it("locks cities hub grid to 1 then 2 at 744 then 4 at 1032", () => {
    const baseGrid = css.match(/\.me-cities-hub__grid\s*\{[^}]*\}/);
    expect(baseGrid?.[0] ?? "").toMatch(/display:\s*grid/);
    expect(baseGrid?.[0] ?? "").not.toMatch(/grid-template-columns/);
    expect(css).toMatch(
      /@media\s*\(min-width:\s*744px\)\s*\{[\s\S]*?\.me-cities-hub__grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*1032px\)\s*\{[\s\S]*?\.me-cities-hub__grid\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/s,
    );
  });

  it("keeps tool chooser options content-height below 744", () => {
    expect(css).toMatch(
      /\.me-tool-chooser__option\s*\{[\s\S]*?flex:\s*0\s+0\s+auto[\s\S]*?width:\s*100%/s,
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*744px\)\s*\{[\s\S]*?\.me-tool-chooser__option\s*\{[^}]*flex:\s*1\s+1\s+12rem/s,
    );
    expect(css).toMatch(
      /@media\s*\(max-width:\s*389px\)\s*\{[\s\S]*?\.me-tool-chooser__outcome-actions\s*\{[^}]*flex-direction:\s*column/s,
    );
  });

  it("keeps About stats one column until 744", () => {
    const baseStats = css.match(/\.me-about__stats\s*\{[^}]*\}/);
    expect(baseStats?.[0] ?? "").toMatch(/display:\s*grid/);
    expect(baseStats?.[0] ?? "").not.toMatch(/grid-template-columns/);
    expect(css).toMatch(
      /@media\s*\(min-width:\s*744px\)\s*\{[\s\S]*?\.me-about__stats\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/s,
    );
  });

  it("contains city tape horizontal motion on the tape only", () => {
    expect(css).toMatch(/\.me-city-tape\s*\{[^}]*overflow:\s*hidden/s);
    expect(css).toMatch(
      /prefers-reduced-motion:\s*reduce[\s\S]*?\.me-city-tape\s*\{[^}]*overflow-x:\s*auto/s,
    );
  });

  it("insets own select chevron off the field edges", () => {
    const selectBlock = css.match(/\.me-field select\s*\{[^}]*\}/);
    expect(selectBlock?.[0] ?? "").toMatch(/appearance:\s*none/);
    expect(selectBlock?.[0] ?? "").toMatch(
      /background-position:\s*right\s+1rem\s+center/,
    );
    expect(selectBlock?.[0] ?? "").toMatch(
      /padding-inline:\s*0\.75rem\s+2\.5rem/,
    );
  });

  it("stacks offer ask through 1032 and splits only at the laptop gate", () => {
    expect(css).toMatch(
      /@media \(min-width:\s*1280px\)\s*\{[\s\S]*?\.me-offer-ask__split\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(17rem,\s*1\.05fr\)/,
    );
    expect(css).not.toMatch(
      /@media \(min-width:\s*900px\)\s*\{\s*\.me-offer-ask\b/,
    );
  });

  it("keeps ask context as identity plus compact next steps", () => {
    expect(css).toMatch(/\.me-offer-proof--identity\s*\{/s);
    expect(css).toMatch(/\.me-offer-proof__bio\s*\{/s);
    expect(css).toMatch(/\.me-offer-next\s*\{/s);
    expect(css).not.toMatch(/\.me-comment-list--trio\s*\{/);
  });

  it("centers city lander columns inside the shared wide shell", () => {
    expect(css).toMatch(
      /\.me-city-lander__answer-copy\s*\{[^}]*width:\s*min\(100%,\s*var\(--reading-measure\)\)/s,
    );
    expect(css).toMatch(
      /\.me-city-lander__proof\s*\{[^}]*width:\s*min\(100%,\s*var\(--reading-measure\)\)/s,
    );
    expect(css).toMatch(
      /\.me-city-lander__objections \.me-shell\s*>\s*\*,\s*\.me-city-lander__related \.me-shell\s*>\s*\*\s*\{[^}]*width:\s*min\(100%,\s*var\(--content-standard\)\)/s,
    );
    expect(css).toMatch(
      /\.me-city-lander__objections \.me-shell\s*,\s*\.me-city-lander__related \.me-shell\s*\{[^}]*align-items:\s*center/s,
    );
  });
});
