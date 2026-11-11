import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/** Live city card / tape files. Keep in sync with CITY_TAPE + CITY_CARD_MEDIA. */
const LIVE_CITY_IMAGES = [
  "oakland.jpg",
  "san-leandro.jpg",
  "hayward.jpg",
  "castro-valley.jpg",
  "san-lorenzo.jpg",
  "newark.jpg",
  "tracy.jpg",
] as const;

const CITIES_DIR = path.join(process.cwd(), "public", "cities");

describe("city card media", () => {
  it("keeps a distinct photo file for every live city card", () => {
    const hashes = new Map<string, string>();

    for (const file of LIVE_CITY_IMAGES) {
      const full = path.join(CITIES_DIR, file);
      expect(existsSync(full), `${file} missing`).toBe(true);
      const digest = createHash("sha256").update(readFileSync(full)).digest("hex");
      const prior = hashes.get(digest);
      expect(prior, `${file} duplicates ${prior}`).toBeUndefined();
      hashes.set(digest, file);
    }

    expect(hashes.size).toBe(LIVE_CITY_IMAGES.length);
  });
});
