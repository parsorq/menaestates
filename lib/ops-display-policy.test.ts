import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const cssPath = join(process.cwd(), "app/globals.css");
const css = readFileSync(cssPath, "utf8");

describe("ops display policy", () => {
  it("keeps thin ops edge and safe-area padding", () => {
    const opsBlock = css.match(/\.me-ops\s*\{[^}]*\}/s);
    expect(opsBlock?.[0] ?? "").toMatch(/padding-inline:\s*var\(--edge-inline\)/);
    expect(opsBlock?.[0] ?? "").toMatch(/safe-area-inset-top/);
    expect(opsBlock?.[0] ?? "").toMatch(/safe-area-inset-bottom/);
    expect(css).toMatch(
      /\.me-ops__shell(?:,\s*\.me-ops \.me-shell-narrow)?\s*\{[^}]*width:\s*min\(var\(--content-standard\),\s*100%\)/s,
    );
  });

  it("keeps ops control floor at the shared button height", () => {
    expect(css).toMatch(
      /\.me-ops select,\s*\.me-ops input,\s*\.me-ops textarea,\s*\.me-ops button\s*\{[^}]*min-height:\s*2\.75rem/s,
    );
    expect(css).toMatch(
      /\.me-ops__filter-clear\s*\{[^}]*min-height:\s*2\.75rem/s,
    );
  });

  it("wraps long fact and field values at narrow widths", () => {
    expect(css).toMatch(
      /\.me-ops__facts dd\s*\{[^}]*min-width:\s*0[^}]*overflow-wrap:\s*anywhere/s,
    );
    expect(css).toMatch(
      /\.me-ops__soft\s*\{[^}]*overflow-wrap:\s*anywhere/s,
    );
    expect(css).toMatch(
      /\.me-ops__next\s*\{[^}]*min-width:\s*0[^}]*max-width:\s*100%/s,
    );
    expect(css).toMatch(
      /\.me-ops__notes\s*\{[^}]*scroll-margin-bottom:\s*6rem/s,
    );
  });

  it("keeps sticky commit bars on notes and handoff", () => {
    expect(css).toMatch(
      /\.me-ops__crm-actions\s*\{[^}]*position:\s*sticky[^}]*bottom:\s*max\(/s,
    );
  });

  it("keeps the 900px ops table card stack", () => {
    expect(css).toMatch(
      /@media\s*\(max-width:\s*900px\)\s*\{[\s\S]*?\.me-ops table[\s\S]*?display:\s*block/s,
    );
    expect(css).toMatch(
      /@media\s*\(max-width:\s*900px\)\s*\{[\s\S]*?\.me-ops td::before\s*\{[^}]*content:\s*attr\(data-label\)/s,
    );
  });
});
