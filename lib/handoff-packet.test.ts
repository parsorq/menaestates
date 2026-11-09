import { describe, expect, it } from "vitest";
import {
  handoffPacketMissingLabels,
  isHandoffPacketComplete,
  isHttpUrl,
} from "@/lib/handoff-packet";

const complete = {
  property_address: "12 Main St, Oakland CA",
  motivation: "Inherited, needs cash",
  timeline: "30 days",
  numbers_discussed: "Offer $410k, seller wants $425k",
  access_photos_notes: "Lockbox 9921; Drive folder linked",
  contract_file_link: "https://example.com/contract.pdf",
};

describe("handoff packet completeness", () => {
  it("passes when all six fields are present", () => {
    expect(isHandoffPacketComplete(complete)).toBe(true);
    expect(handoffPacketMissingLabels(complete)).toEqual([]);
  });

  it("lists operator-facing labels for missing packet fields", () => {
    expect(
      handoffPacketMissingLabels({
        ...complete,
        numbers_discussed: null,
        access_photos_notes: "  ",
        contract_file_link: null,
      })
    ).toEqual(["numbers discussed", "access/photos notes", "contract file link"]);
  });

  it("treats intake address, motivation, and timeline as required packet fields", () => {
    expect(
      handoffPacketMissingLabels({
        ...complete,
        property_address: "",
        motivation: " ",
        timeline: "",
      })
    ).toEqual(["address", "motivation", "seller timeline"]);
  });
});

describe("contract file link", () => {
  it("accepts http(s) URLs only", () => {
    expect(isHttpUrl("https://drive.google.com/file/d/x")).toBe(true);
    expect(isHttpUrl("http://files.example/c.pdf")).toBe(true);
    expect(isHttpUrl("ftp://files.example/c.pdf")).toBe(false);
    expect(isHttpUrl("not-a-url")).toBe(false);
  });
});
