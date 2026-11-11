# Guide and tool sources (agent ledger)

**Purpose:** Official URLs that back guest teaching on `/guides/*` and `/tools/*`. Guest pages show a Sources list; this file is the internal ledger so the family stays honest as it grows.

**Last checked:** 2026-11-10 (post copy passes on inherited, as-is, and repair tool Sources labels/notes)

Guest copy must stay in [`docs/VOICE.md`](../VOICE.md). Always: not legal advice; no AVM / dollar range on the repair tool.

**Kind rename (`situation` → `guide`):** Code uses `LanderKind = "city" | "guide"` and substance in [`lib/guide-landers.ts`](../../lib/guide-landers.ts). Public paths (`/guides/...`) and form `source` strings (`lander-inherited`, `lander-as-is`) stay frozen for ops continuity. Ordinary English "situation" in guest prose and the guest-voice ban on "situation page" stay on purpose.

---

## Inherited guide (`/guides/sell-inherited-house-east-bay`)

| Claim area | URL | Last-checked note |
|------------|-----|-------------------|
| California Courts Self-Help: property after someone dies (what probate is; who handles the estate) | https://www.selfhelp.courts.ca.gov/probate | 200, no redirect |
| California Courts Self-Help: when formal probate may not be needed (trusts, joint title, beneficiaries, simpler transfers) | https://www.selfhelp.courts.ca.gov/probate/simple-transfer | 200, no redirect |
| Alameda Superior Court: administering the estate (full vs limited authority; Notice of Proposed Action; when a hearing is required to sell real property) | https://www.alameda.courts.ca.gov/divisions/probate/property-transfers/administering-estate | **Redirect:** prior ledger/guest href `…/index.php/divisions/…` returned **301** to this path (2026-11-10). Guest Sources href updated to the final URL. |
| California Probate Code §10511 (full-authority power to sell or exchange real property of the estate) | https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=PROB&division=7.&title=&part=6.&chapter=3.&article=2. | No redirect; automated fetch got HTTP 403 (bot filter). Confirm in a normal browser when the claim changes. |
| Judicial Council form DE-260 (report of sale / petition to confirm a sale of real property) | https://selfhelp.courts.ca.gov/jcc-form/DE-260 | 200, no redirect (`www.selfhelp…` also 200; guest keeps non-www) |

Substance SSOT: [`lib/guide-landers.ts`](../../lib/guide-landers.ts) (`guideKey: "inherited"`).

---

## As-is guide (`/guides/sell-house-as-is-east-bay`)

| Claim area | URL | Last-checked note |
|------------|-----|-------------------|
| California Civil Code §1102 (residential disclosure article; waiver of article requirements void) | https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1102. | No redirect; automated fetch got HTTP 403 (bot filter). Confirm in a normal browser when the claim changes. |
| California Civil Code §1102.1 (TDS delivery may not be waived in an as-is sale) | https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1102.1. | No redirect; automated fetch got HTTP 403 (bot filter). Confirm in a normal browser when the claim changes. |
| California DRE: information for homebuyers (inspection / residential disclosure expectations) | https://dre.ca.gov/consumers/informationforhomebuyers.html | 200, no redirect |

Substance SSOT: [`lib/guide-landers.ts`](../../lib/guide-landers.ts) (`guideKey: "as-is"`).

---

## Repair tool (`/tools/repair-or-as-is-east-bay`)

| Claim area | URL | Last-checked note |
|------------|-----|-------------------|
| CFPB: schedule a home inspection (how inspections can change a financed buyer's options; cash buy is not a mortgage closing) | https://www.consumerfinance.gov/owning-a-home/close/schedule-a-home-inspection/ | 200, no redirect |

Page sources list: [`app/tools/repair-or-as-is-east-bay/page.tsx`](../../app/tools/repair-or-as-is-east-bay/page.tsx). Chooser: [`app/components/RepairOrAsIsChooser.tsx`](../../app/components/RepairOrAsIsChooser.tsx).

---

## Adding a source

1. Prefer California Courts Self-Help, California Legislature (leginfo), DRE, CFPB, or county superior court pages over blogs.
2. Add the URL to the guest Sources list and to this ledger in the same pass.
3. Do not invent day counts, dollar ranges, or legal advice. Re-check the URL when the claim changes.
4. On re-check: if the URL redirects, record the final URL here, note the prior path and status (e.g. 301), and update the guest Sources `href` to the final URL in the same pass.
