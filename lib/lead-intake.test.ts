import { afterEach, describe, expect, it } from "vitest";
import {
  DEFERRED_FULL_NAME,
  PENDING_QUALIFY,
  isIntakeStage,
  signLeadContinueToken,
  verifyLeadContinueToken,
} from "@/lib/lead-intake";

const priorSecret = process.env.AUTH_SECRET;

afterEach(() => {
  if (priorSecret === undefined) delete process.env.AUTH_SECRET;
  else process.env.AUTH_SECRET = priorSecret;
});

describe("intake stage helpers", () => {
  it("accepts contact and qualified only", () => {
    expect(isIntakeStage("contact")).toBe(true);
    expect(isIntakeStage("qualified")).toBe(true);
    expect(isIntakeStage("new")).toBe(false);
  });

  it("keeps deferred markers stable for ops scan", () => {
    expect(DEFERRED_FULL_NAME).toBe("To confirm on call");
    expect(PENDING_QUALIFY).toBe("pending_call");
  });
});

describe("continue token", () => {
  it("round-trips a valid token", () => {
    process.env.AUTH_SECRET = "test-secret-for-lead-continue";
    const token = signLeadContinueToken("lead-1", "2026-11-10T20:00:00.000Z");
    expect(typeof token).toBe("string");
    expect(
      verifyLeadContinueToken(
        "lead-1",
        "2026-11-10T20:00:00.000Z",
        token as string
      )
    ).toBe(true);
  });

  it("rejects wrong lead, time, or token", () => {
    process.env.AUTH_SECRET = "test-secret-for-lead-continue";
    const token = signLeadContinueToken("lead-1", "2026-11-10T20:00:00.000Z");
    expect(typeof token).toBe("string");
    expect(
      verifyLeadContinueToken(
        "lead-2",
        "2026-11-10T20:00:00.000Z",
        token as string
      )
    ).toBe(false);
    expect(
      verifyLeadContinueToken(
        "lead-1",
        "2026-11-10T21:00:00.000Z",
        token as string
      )
    ).toBe(false);
    expect(
      verifyLeadContinueToken(
        "lead-1",
        "2026-11-10T20:00:00.000Z",
        "0".repeat((token as string).length)
      )
    ).toBe(false);
  });

  it("fails closed when AUTH_SECRET is missing", () => {
    delete process.env.AUTH_SECRET;
    expect(signLeadContinueToken("lead-1", "t")).toEqual({
      error: "AUTH_SECRET missing.",
    });
    expect(verifyLeadContinueToken("lead-1", "t", "abc")).toBe(false);
  });
});
