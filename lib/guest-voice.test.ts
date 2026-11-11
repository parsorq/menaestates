import { describe, expect, it } from "vitest";
import { findGuestVoiceBanHits } from "./guest-voice-corpus";

describe("guest Voice bans", () => {
  it("keeps seller-visible copy free of sitemap and IA jargon", () => {
    const hits = findGuestVoiceBanHits();
    expect(
      hits,
      hits.map((h) => `${h.source} [${h.id}] … ${h.excerpt}`).join("\n"),
    ).toEqual([]);
  });
});
