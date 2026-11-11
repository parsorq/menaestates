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

  it("keeps compact phone header and stacked CTAs below 744", () => {
    expect(css).toMatch(/\.me-brand\s*\{[^}]*white-space:\s*nowrap/s);
    expect(css).toMatch(/\.me-header-menu-toggle\s*\{/s);
    expect(css).toMatch(
      /\.me-site-header\[data-menu-open="true"\]\s*\.me-header-panel\s*\{[^}]*display:\s*flex/s,
    );
    expect(css).toMatch(/\.me-header-toolbar\s*\{[^}]*display:\s*none/s);
    expect(css).toMatch(
      /\.me-home-hero__cta\s*\{[^}]*flex-direction:\s*column/s,
    );
    expect(css).toMatch(/\.me-btn\s*\{[^}]*white-space:\s*nowrap/s);
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

  it("keeps ask context as identity plus compact next steps", () => {
    expect(css).toMatch(/\.me-offer-proof--identity\s*\{/s);
    expect(css).toMatch(/\.me-offer-proof__bio\s*\{/s);
    expect(css).toMatch(/\.me-offer-next\s*\{/s);
    expect(css).not.toMatch(/\.me-comment-list--trio\s*\{/);
  });

  it("centers city lander columns inside the shared wide shell", () => {
    expect(css).toMatch(
      /\.me-city-lander__answer-copy\s*\{[^}]*margin-inline:\s*auto/s,
    );
    expect(css).toMatch(
      /\.me-city-lander__proof\s*\{[^}]*margin-inline:\s*auto/s,
    );
    expect(css).toMatch(
      /\.me-city-lander__objections \.me-shell\s*,\s*\.me-city-lander__related \.me-shell\s*\{[^}]*align-items:\s*center/s,
    );
  });
});
