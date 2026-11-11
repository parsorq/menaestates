import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/app/components/LeadForm";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { GUIDES_HUB_PATH } from "@/lib/guides-hub";
import { getHowWeBuyHref, HOW_WE_BUY_NAV_LABEL } from "@/lib/how-we-buy";
import { guideLanders } from "@/lib/landers";
import {
  getRepairOrAsIsHref,
  REPAIR_OR_AS_IS_NAV_LABEL,
} from "@/lib/repair-or-as-is";
import { buildPageMetadata, getPageSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("guides");

const guidesSeo = getPageSeo("guides");

const GUIDE_LABELS: Record<string, string> = {
  "sell-inherited-house-east-bay": "Inherited house",
  "sell-house-as-is-east-bay": "Sell as-is",
};

const GUIDE_BLURBS: Record<string, string> = {
  "sell-inherited-house-east-bay":
    "Who can sign, estate status, and timing. No legal advice here.",
  "sell-house-as-is-east-bay":
    "How repairs and deferred maintenance show up in a cash offer when the numbers fit.",
};

export default function GuidesHubPage() {
  const guides = guideLanders();
  const howWeBuyHref = getHowWeBuyHref();
  const repairOrAsIsHref = getRepairOrAsIsHref();

  return (
    <>
      <SiteHeader />
      <main className="me-guides-hub">
        <section
          className="me-guides-hub__hero"
          aria-labelledby="guides-hub-title"
        >
          <div className="me-shell">
            <h1 id="guides-hub-title">{guidesSeo.h1}</h1>
            <p className="me-guides-hub__lead vc-reading-measure">
              {guidesSeo.answerFirst}
            </p>
            <div className="me-guides-hub__cta">
              <a className="me-btn me-btn--primary" href="#offer-form">
                Request a cash offer
              </a>
              <Link className="me-btn me-btn--ghost" href={howWeBuyHref}>
                {HOW_WE_BUY_NAV_LABEL}
              </Link>
              <Link className="me-btn me-btn--ghost" href="/">
                Back to home
              </Link>
            </div>
          </div>
        </section>

        <section
          className="me-section"
          aria-labelledby="guides-list-title"
        >
          <div className="me-shell">
            <h2 id="guides-list-title">Guides</h2>
            <p className="me-section__intro vc-reading-measure">
              Open a guide for process notes and what we need before the call.
              Each page ends with official sources.
            </p>
            <ul className="me-home-guide-list">
              {guides.map((lander) => (
                <li key={lander.slug}>
                  <Link href={lander.path}>
                    <span className="me-home-guide-list__label">
                      {GUIDE_LABELS[lander.slug] ?? lander.title}
                    </span>
                    <span className="me-home-guide-list__blurb">
                      {GUIDE_BLURBS[lander.slug] ?? lander.asideBody}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="me-section me-section--muted"
          aria-labelledby="tools-list-title"
        >
          <div className="me-shell">
            <h2 id="tools-list-title">Short tool</h2>
            <p className="me-section__intro vc-reading-measure">
              A few questions if the house needs work. No price on that step.
            </p>
            <ul className="me-city-list">
              <li>
                <Link href={repairOrAsIsHref}>{REPAIR_OR_AS_IS_NAV_LABEL}</Link>
              </li>
            </ul>
          </div>
        </section>

        <section
          className="me-section"
          aria-labelledby="guides-form-title"
        >
          <div className="me-shell">
            <h2 id="guides-form-title">Request a cash offer</h2>
            <LeadForm source="guides-hub" landingPath={GUIDES_HUB_PATH} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
