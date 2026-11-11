import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  CITY_TAPE_EAGER_COUNT,
  CITY_TAPE_IMAGE_SIZES,
} from "@/app/components/CityTape";

const CITY_TAPE_SOURCE = readFileSync(
  path.join(process.cwd(), "app/components/CityTape.tsx"),
  "utf8",
);

describe("city tape image loading", () => {
  it("keeps early eager tiles and low-priority lazy clones", () => {
    expect(CITY_TAPE_EAGER_COUNT).toBeGreaterThanOrEqual(2);
    expect(CITY_TAPE_IMAGE_SIZES).toContain("78vw");
    expect(CITY_TAPE_IMAGE_SIZES).toContain("24vw");
    expect(CITY_TAPE_SOURCE).toContain('loading={eager ? "eager" : "lazy"}');
    expect(CITY_TAPE_SOURCE).toContain(
      'fetchPriority={eager ? "high" : clone ? "low" : "auto"}',
    );
    expect(CITY_TAPE_SOURCE).toContain("from \"next/image\"");
    expect(CITY_TAPE_SOURCE).not.toMatch(/loading=\"lazy\"/);
  });
});
