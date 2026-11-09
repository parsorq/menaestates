import { describe, expect, it } from "vitest";
import {
  getOpsAllowlistEmails,
  isOpsEmailAllowed,
  parseOpsOperatorEmails,
} from "./ops-allowlist";

describe("ops allowlist", () => {
  it("always includes parsorq@gmail.com", () => {
    expect(getOpsAllowlistEmails("")).toEqual(["parsorq@gmail.com"]);
    expect(isOpsEmailAllowed("parsorq@gmail.com", "")).toBe(true);
    expect(isOpsEmailAllowed("Parsorq@Gmail.com", null)).toBe(true);
  });

  it("merges OPS_OPERATOR_EMAILS", () => {
    const emails = getOpsAllowlistEmails(
      "ops@example.com, Other@Example.COM; third@example.com"
    );
    expect(emails).toEqual([
      "parsorq@gmail.com",
      "ops@example.com",
      "other@example.com",
      "third@example.com",
    ]);
    expect(isOpsEmailAllowed("ops@example.com", "ops@example.com")).toBe(true);
  });

  it("rejects strangers", () => {
    expect(isOpsEmailAllowed("stranger@gmail.com", "ops@example.com")).toBe(
      false
    );
    expect(isOpsEmailAllowed("", "ops@example.com")).toBe(false);
    expect(isOpsEmailAllowed(null, "ops@example.com")).toBe(false);
  });

  it("parses empty env as no extras", () => {
    expect(parseOpsOperatorEmails(undefined)).toEqual([]);
    expect(parseOpsOperatorEmails("  ,  ")).toEqual([]);
  });
});
