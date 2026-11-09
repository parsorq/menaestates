import { describe, expect, it } from "vitest";
import {
  decideLeadGuard,
  normalizeAddressKey,
  normalizePhoneDigits,
} from "./lead-guards";

describe("normalizePhoneDigits", () => {
  it("strips punctuation and keeps US 10-digit", () => {
    expect(normalizePhoneDigits("(510) 555-1234")).toBe("5105551234");
    expect(normalizePhoneDigits("1-510-555-1234")).toBe("5105551234");
  });
});

describe("normalizeAddressKey", () => {
  it("soft-matches punctuation and case", () => {
    expect(normalizeAddressKey("123 Main St., Oakland")).toBe(
      "123 main st oakland"
    );
    expect(normalizeAddressKey("123 Main St Oakland")).toBe(
      "123 main st oakland"
    );
  });
});

describe("decideLeadGuard", () => {
  it("soft-dedupes same phone + address (double-submit)", () => {
    const d = decideLeadGuard({
      ipCount: 0,
      phoneCount: 1,
      duplicateId: "lead-1",
    });
    expect(d.allow).toBe(false);
    if (!d.allow) {
      expect(d.kind).toBe("duplicate");
      expect(d.message).toMatch(/already have this property/i);
    }
  });

  it("allows same phone with a different address when under phone cap", () => {
    const d = decideLeadGuard({
      ipCount: 1,
      phoneCount: 1,
      duplicateId: null,
    });
    expect(d).toEqual({ allow: true });
  });

  it("rate-limits IP bursts before insert", () => {
    const d = decideLeadGuard({
      ipCount: 8,
      phoneCount: 0,
      duplicateId: null,
      ipMax: 8,
    });
    expect(d.allow).toBe(false);
    if (!d.allow) {
      expect(d.kind).toBe("rate_limit");
      expect(d.scope).toBe("ip");
    }
  });

  it("rate-limits phone floods across addresses", () => {
    const d = decideLeadGuard({
      ipCount: 0,
      phoneCount: 5,
      duplicateId: null,
      phoneMax: 5,
    });
    expect(d.allow).toBe(false);
    if (!d.allow) {
      expect(d.kind).toBe("rate_limit");
      expect(d.scope).toBe("phone");
    }
  });

  it("prefers duplicate message over rate limit when both would apply", () => {
    const d = decideLeadGuard({
      ipCount: 99,
      phoneCount: 99,
      duplicateId: "lead-dup",
    });
    expect(d.allow).toBe(false);
    if (!d.allow) expect(d.kind).toBe("duplicate");
  });
});
