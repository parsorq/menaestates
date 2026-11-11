/**
 * Seller-visible guest copy corpus for Voice bans.
 * Keep this list tied to surfaces sellers and crawlers actually read.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { CONSENT_CALL_TEXT } from "./consent";
import { CITY_LANDER_SUBSTANCE } from "./city-landers";
import { GUEST_PROOF } from "./guest-proof";
import { LANDERS } from "./landers";
import { buildLlmsTxt } from "./llms-manifest";
import { PAGE_SEO } from "./seo-metadata";
import { GUIDE_LANDER_SUBSTANCE } from "./guide-landers";

export type GuestVoiceChunk = {
  source: string;
  text: string;
};

function walkGuestAppFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "ops" || name === "api") continue;
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) {
      walkGuestAppFiles(path, out);
      continue;
    }
    if (/\.(tsx|ts)$/.test(name)) out.push(path);
  }
  return out;
}

/** Visible text nodes and prose string literals from guest TSX/TS. */
export function proseFromSourceFile(source: string): string {
  const withoutBlockComments = source.replace(/\/\*[\s\S]*?\*\//g, "\n");
  const withoutLineComments = withoutBlockComments.replace(/^\s*\/\/.*$/gm, "");
  const texts: string[] = [];

  for (const match of withoutLineComments.matchAll(/>([^<>{]+)</g)) {
    const piece = match[1]?.replace(/\s+/g, " ").trim();
    if (piece && piece.length >= 8) texts.push(piece);
  }

  for (const match of withoutLineComments.matchAll(
    /(?:title|body|label|blurb|quote|description|answerFirst|asideBody|asideTitle|bio|text|question|answer)\s*[:=]\s*(["'`])([\s\S]*?)\1/g,
  )) {
    const piece = match[2]?.replace(/\s+/g, " ").trim();
    if (piece && piece.length >= 8) texts.push(piece);
  }

  for (const match of withoutLineComments.matchAll(
    /\{\s*(["'`])([^"'`]{12,})\1\s*\}/g,
  )) {
    const piece = match[2]?.replace(/\s+/g, " ").trim();
    if (piece) texts.push(piece);
  }

  return texts.join("\n");
}

export function collectGuestVoiceCorpus(appRoot = join(process.cwd(), "app")): GuestVoiceChunk[] {
  const chunks: GuestVoiceChunk[] = [];

  for (const [key, seo] of Object.entries(PAGE_SEO)) {
    chunks.push({
      source: `PAGE_SEO.${key}`,
      text: [seo.title, seo.description, seo.h1, seo.answerFirst].join("\n"),
    });
  }

  for (const lander of LANDERS) {
    chunks.push({
      source: `LANDERS.${lander.slug}`,
      text: [
        lander.title,
        lander.description,
        lander.h1,
        lander.answerFirst,
        lander.asideTitle,
        lander.asideBody,
      ].join("\n"),
    });
  }

  for (const city of CITY_LANDER_SUBSTANCE) {
    chunks.push({
      source: `city-landers.${city.slug}`,
      text: [
        city.footprintBuys,
        city.nearbyCities,
        ...city.objections.flatMap((row) => [row.title, row.body]),
      ].join("\n"),
    });
  }

  for (const guide of GUIDE_LANDER_SUBSTANCE) {
    chunks.push({
      source: `guide-landers.${guide.slug}`,
      text: [
        ...guide.needFromSeller.flatMap((row) => [row.title, row.body]),
        ...(guide.doNotDo
          ? [guide.doNotDo.heading, ...guide.doNotDo.items]
          : []),
        ...guide.faqs.flatMap((row) => [row.question, row.answer]),
      ].join("\n"),
    });
  }

  chunks.push({
    source: "GUEST_PROOF",
    text: [
      GUEST_PROOF.principal.name,
      GUEST_PROOF.principal.role,
      GUEST_PROOF.principal.bio,
      GUEST_PROOF.license.description,
      GUEST_PROOF.realtorCareer.label,
      GUEST_PROOF.realtorCareer.notCashCountsLine,
      GUEST_PROOF.closeTiming.text,
      GUEST_PROOF.buyCitiesLabel,
      ...GUEST_PROOF.reviewsNearAsk.flatMap((r) => [
        r.quote,
        r.attribution,
        r.place ?? "",
        r.date,
      ]),
      ...GUEST_PROOF.reviewsAbout.flatMap((r) => [
        r.quote,
        r.attribution,
        r.place ?? "",
        r.date,
      ]),
    ].join("\n"),
  });

  chunks.push({ source: "llms.txt", text: buildLlmsTxt() });
  chunks.push({ source: "consent", text: CONSENT_CALL_TEXT });

  for (const filePath of walkGuestAppFiles(appRoot)) {
    const raw = readFileSync(filePath, "utf8");
    const prose = proseFromSourceFile(raw);
    if (prose) {
      chunks.push({
        source: filePath.replace(`${process.cwd()}/`, ""),
        text: prose,
      });
    }
  }

  return chunks;
}

/** Phrases Voice bans on guest surfaces (exact or close paraphrase). */
export const GUEST_VOICE_BANS: { id: string; pattern: RegExp }[] = [
  // Studio / IA nouns. Sellers see house + call facts, not product framing.
  { id: "path(s)", pattern: /\bpaths?\b/i },
  { id: "door(s)", pattern: /\bdoors?\b/i },
  { id: "thesis", pattern: /\bthesis\b/i },
  { id: "hub", pattern: /\bhub\b/i },
  { id: "catalog", pattern: /\bcatalog\b/i },
  { id: "leaf", pattern: /\bleaf\b/i },
  { id: "lander", pattern: /\blander\b/i },
  { id: "mesh", pattern: /\bmesh\b/i },
  { id: "footprint", pattern: /\bfootprint\b/i },
  { id: "underwriting", pattern: /\bunderwriting\b/i },
  { id: "theater", pattern: /\btheater\b/i },
  { id: "lead auction", pattern: /\blead auction\b/i },
  { id: "refuse the request", pattern: /\brefuse the request\b/i },
  { id: "studio talk", pattern: /\bstudio talk\b/i },
  { id: "on this page", pattern: /\bon this page\b/i },
  { id: "what this page proves", pattern: /\bwhat this page proves\b/i },
  { id: "city page", pattern: /\bcity pages?\b/i },
  { id: "situation page", pattern: /\bsituation pages?\b/i },
  { id: "special page", pattern: /\bspecial pages?\b/i },
  { id: "cash buyer page", pattern: /\bcash buyer page\b/i },
  { id: "wherever you start", pattern: /\bwherever you start\b/i },
  {
    id: "same form wherever",
    pattern: /\bsame (cash-offer )?form wherever\b/i,
  },
  { id: "every page uses", pattern: /\bevery page uses\b/i },
  {
    id: "do not need a page",
    pattern: /\bdo not need a .{0,40}\bpages?\b/i,
  },
  { id: "this site markets", pattern: /\bthis site markets\b/i },
  {
    id: "form is the same everywhere",
    pattern: /\bform is the same everywhere\b/i,
  },
];

export function findGuestVoiceBanHits(
  chunks: GuestVoiceChunk[] = collectGuestVoiceCorpus(),
): { source: string; id: string; excerpt: string }[] {
  const hits: { source: string; id: string; excerpt: string }[] = [];
  for (const chunk of chunks) {
    for (const ban of GUEST_VOICE_BANS) {
      const match = chunk.text.match(ban.pattern);
      if (!match) continue;
      const idx = match.index ?? 0;
      const excerpt = chunk.text
        .slice(Math.max(0, idx - 40), idx + match[0].length + 40)
        .replace(/\s+/g, " ")
        .trim();
      hits.push({ source: chunk.source, id: ban.id, excerpt });
    }
  }
  return hits;
}
