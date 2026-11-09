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

  it("keeps header brand nowrap and header actions wrap bay", () => {
    expect(css).toMatch(/\.me-brand\s*\{[^}]*white-space:\s*nowrap/s);
    expect(css).toMatch(/\.me-header-actions\s*\{[^}]*flex:\s*1\s+1\s+12rem/s);
    expect(css).toMatch(/\.me-btn\s*\{[^}]*white-space:\s*nowrap/s);
  });
});
