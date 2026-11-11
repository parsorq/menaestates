# Voice — Mena Estates

Cash home buyer. Guest copy defaults to **we / our** (the Mena Estates team). Hector Mena speaks in first person on **About** and in the short bio next to the offer ask. Not Mena Construction. For-sale inventory may appear later; do not ship placeholders, and do not write guest lines that permanently forbid showing houses we aim to sell.

## Who the reader is

Guest copy talks to a **seller** with a house in Oakland, San Leandro, Hayward, Castro Valley, San Lorenzo, Newark, or Tracy. Speak to that person. Do not speak to the studio, the sitemap, or another agent.

If a line would make sense only to someone who builds this site, it does not ship on a guest surface. Fail example: “You do not need a special page to sell.” That talks about the sitemap. Say what the seller should do next instead.

**Studio talk is banned on guest copy and on guest copy proposals.** Do not invent headings or body lines with IA words (path, door, lander, hub, and the rest below). A seller has a house and a call, not a path. Fail example: “On this path.” Say the fact instead: we buy for cash, we are not the listing agent, we call you.

Guard: `lib/guest-voice.test.ts` (corpus in `lib/guest-voice-corpus.ts`). Guest copy changes must keep that test green. A one-off audit PASS without this guard is not done.

## Hector manner (translation bar)

Guest copy is a **manner translation** of Hector Mena, drawn from how sellers and buyers describe working with him as a Realtor. The product on this site is still a **cash purchase**, not a listing or buyer-agent search. Keep the job clear. Keep his way of being in the sentences.

**Who he is in the room:** calm, patient, candid, humble. Warm without cheerleading. Not theatrical. Not pushy.

**How he talks:** plain and thorough. Explain the process in order. Name hard parts early (title, occupancy, repairs, heirs, timing). Leave room for questions. Stay reachable. Do not invent day-count promises before the facts are clear.

**What he prioritizes:** the household and a clear next step. Work around real life (kids at home, still living in the house, estate timing). Knowledge of the East Bay stays quiet competence, not a flex.

**Fail the persona if the line is only ops telegram** (“We call you. Numbers. Close.”) with no human order, or if it turns into national “we buy houses” hype.

**Career reviews** may sit on the site as labeled Realtor proof. Do not rewrite cash-buy copy as if we are showing thirty homes. Translate the manner, not the old job description.

## How to write

Lead with what is true, then explain what happens for the seller. Prefer short sentences. One claim per clause when the fact is structural (who buys, cities, as-is). Allow a second sentence that walks the person through the next step or names a life constraint.

Work verbs that earn their place: buy, call, close, walk through, explain, remodel (after close, our work), sell (houses we own after remodel). Do not use attitude pitch verbs: empower, enable, believe, strive, unlock, revolutionize. Do not write “we’re here for you” filler. Warmth is specificity and patience, not slogans.

Default guest voice is **we / our**. The brand mark on the site is Mena Estates. Contract and consent entity name stays Mena Estates where the legal trail requires it. Do not narrate every sentence as `Mena Estates buys…`; team **we** is the default narrator.

**About and ask-adjacent bio:** Hector may use `I` / `me`. Elsewhere name him in third person when needed (`Hector Mena leads…`). Do not narrate the whole site as solo Hector.

**Seller `I` stays** in consent and FAQ questions aimed at the seller (`I agree…`, `Do I have to repair…`).

**Verb-cover test:** cover every verb. If the remaining nouns no longer tell who buys, where, and how someone enters, the copy is not done. Manner does not replace those nouns.

## Guest nouns (use these)

| Say to the seller | Meaning |
|-------------------|---------|
| We buy your house for cash / We buy for cash | Team is the buyer for this sale, not a listing agent for that request |
| We call you / One of us calls | Callback after the form |
| After we are under contract, we handle closing | Title, access, funding through close |
| We buy, remodel after close, and sell | Our business model; not a remodel service for the seller before close |
| We do not remodel your house before close | Seller as-is promise; condition stays in the offer |
| Oakland, San Leandro, Hayward, Castro Valley, San Lorenzo, Newark, Tracy | Cities we've bought in (core area) |
| Alameda County and Tracy (San Joaquin) | County area we work |
| Related pages / other city pages | Cross-links (agent docs may say hub/leaf; guest UI names the pages) |
| Houses / homes | Inventory (cash buy today; for-sale listings may come later) |
| When we review the numbers | Offer math |
| How we buy / Cities we've bought in | Nav and trust labels (worked cities, not a hard fence) |

Primary action: Get a cash offer / Request a cash offer. Ops inbox is staff-only tooling; Hector’s public phone and email may appear as NAP.

## Business model vs seller promise

- **Our work:** We buy houses, remodel them after close, and sell them.
- **Seller promise:** We buy as-is when the numbers work. We do not remodel **your** house before close. Condition stays in the offer.
- Say the business model once clearly (How we buy; a short echo on home is fine). Do not expand into a flip pitch or Construction design-build copy.
- Remodel after close is work on houses **we own**. It is not Mena Construction selling remodel services to the seller.

## Proof that may ship

- Named principal photo and bio when operator-supplied (About may stay first person)
- Real CA license number when operator-supplied
- Real attributed reviews when labeled honestly (e.g. Zillow Realtor career reviews, not cash-buy proof)
- Real career Realtor stats when labeled as career, not cash purchases

Do not invent licenses, day-count close guarantees, star-rating chrome, or fake deal counts. Do not present Realtor career stats as cash-purchase counts.

## Internal nouns (never guest UI, meta, llms.txt, or guest copy proposals)

These stay in docs, code comments, and agent notes only. Do not propose them as live headings or body copy:

- path / paths / cash path / on this path / contract path / buy path (IA or product framing)
- door / doors / related doors
- thesis, hub, catalog, leaf, lander, mesh, room (IA sense)
- footprint, scope (as product jargon)
- operator (as org-chart title)
- principal (unexplained)
- exit (as IA or pipeline word)
- underwriting, stock, refuse the request, lead auction, theater
- studio talk, studio chrome (when naming the copy itself)
- “what this page proves,” “on this page” as self-policing

Product facts behind those words still ship. Translate them. Example: staff callback → “We call you” or “One of us calls.” Buy area → name the seven cities as the core. Outside them, we buy when the numbers work. “On this path we are the buyer” → “We are the buyer, not your listing agent.”

## Punctuation

No en dashes or em dashes. Comma or period to break a thought. Colon to introduce a list. Hyphen only for compounds or conventional numeric ranges.

## Abbreviations

Spell out words in reader-facing copy unless industry-standard: SEO, UTM, FAQ, TCPA. Do not write `eval` / `evals`.

## SEO / AEO

Tone must not delete the answer-first H1 and lead, entity clarity, or truthful metadata. Softer manner is not a reason to dilute a citable claim. Keep city names, counties, and cash-buyer language. Do not stuff internal nouns into titles or descriptions for SEO.

## Not this voice

Do not import Construction (design-build / contractor pitch) copy. Do not sound like a national “we buy houses” clone with fake urgency. Do not invent licenses, day-count guarantees, star ratings, or testimonials. Do not claim we never sell houses; for-sale inventory may ship later without placeholders in this pass. Do not paste Realtor open-house energy onto a cash ask.
