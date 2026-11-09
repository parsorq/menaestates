import { describe, expect, it } from "vitest";
import { sanitizeLeadSearchQuery } from "@/lib/leads";

describe("sanitizeLeadSearchQuery", () => {
  it("trims and keeps a name fragment", () => {
    expect(sanitizeLeadSearchQuery("  Ada  ")).toBe("Ada");
  });

  it("strips PostgREST or() breakers", () => {
    expect(sanitizeLeadSearchQuery("Oak,(land).")).toBe("Oak land");
  });

  it("returns null for empty or non-string", () => {
    expect(sanitizeLeadSearchQuery("   ")).toBeNull();
    expect(sanitizeLeadSearchQuery(null)).toBeNull();
    expect(sanitizeLeadSearchQuery(12)).toBeNull();
  });

  it("caps length at 80", () => {
    const long = "a".repeat(100);
    expect(sanitizeLeadSearchQuery(long)?.length).toBe(80);
  });
});
