import type { Metadata } from "next";
import Link from "next/link";
import { GuideSources } from "@/app/components/GuideSources";
import { LeadForm } from "@/app/components/LeadForm";
import { RepairOrAsIsChooser } from "@/app/components/RepairOrAsIsChooser";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import {
  CITIES_HUB_NAV_LABEL,
  getCitiesHubHref,
} from "@/lib/cities-hub";
import {
  GUIDES_HUB_NAV_LABEL,
  getGuidesHubHref,
} from "@/lib/guides-hub";
import { getHowWeBuyHref } from "@/lib/how-we-buy";
import { getLanderBySlug } from "@/lib/landers";
import {
  REPAIR_OR_AS_IS_NAV_LABEL,
  REPAIR_OR_AS_IS_PATH,
} from "@/lib/repair-or-as-is";
import { buildPageMetadata, getPageSeo } from "@/lib/seo-metadata";
import type { GuideSource } from "@/lib/guide-landers";

export const metadata: Metadata = buildPageMetadata("repair-or-as-is-east-bay");

const toolSeo = getPageSeo("repair-or-as-is-east-bay");

const TOOL_SOURCES: GuideSource[] = [
  {
    label: "Consumer Financial Protection Bureau: schedule a home inspection",
    href: "https://www.consumerfinance.gov/owning-a-home/close/schedule-a-home-inspection/",
    note: "How inspections can change a financed buyer's options. A cash buy with us is not a mortgage closing, but condition still shapes the number.",
  },
];

/**
 * Free tool: repair vs as-is decision aid before the cash-offer form.
 * Answer-first leaf. Mena voice. No AVM. No dollar range.
 */
export default function RepairOrAsIsPage() {
  const citiesHubHref = getCitiesHubHref();
  const guidesHubHref = getGuidesHubHref();
  const howWeBuyHref = getHowWeBuyHref();
  const asIs = getLanderBySlug("sell-house-as-is-east-bay");
  const inherited = getLanderBySlug("sell-inherited-house-east-bay");

  return (
    <>
      <SiteHeader />
      <main className="me-tool">
        <section className="me-tool__hero" aria-labelledby="tool-title">
          <div className="me-shell">
            <h1 id="tool-title">{toolSeo.h1}</h1>
            <p className="me-tool__lead vc-reading-measure">
              {toolSeo.answerFirst}
            </p>
            <div className="me-tool__cta">
              <a className="me-btn me-btn--primary" href="#offer-form">
                Request a cash offer
              </a>
              <Link className="me-btn me-btn--ghost" href={citiesHubHref}>
                {CITIES_HUB_NAV_LABEL}
              </Link>
            </div>
          </div>
        </section>

        <section
          className="me-section"
          aria-labelledby="tool-scope-title"
        >
          <div className="me-shell">
            <h2 id="tool-scope-title">Before the cash offer</h2>
            <p className="me-section__intro vc-reading-measure">
              Answer three short questions about condition, whether you can fund
              repairs, and pace. We will say whether selling as-is, keeping
              condition in a cash offer, or talking it through on the call fits.
              The answers do not set a price. There is no AVM and no dollar range
              here.
            </p>
            <ul className="me-tool__scope-list">
              <li className="vc-reading-measure">
                Financed buyers often face lender repair conditions after an
                inspection. A cash buy with us does not use that mortgage
                process. Condition still changes the number.
              </li>
              <li className="vc-reading-measure">
                When you are ready, request a cash offer and we will walk the
                house with you on the call.
              </li>
            </ul>
          </div>
        </section>

        <section
          className="me-section me-section--muted"
          aria-labelledby="chooser-title"
        >
          <div className="me-shell">
            <h2 id="chooser-title">{REPAIR_OR_AS_IS_NAV_LABEL}</h2>
            <p className="me-section__intro vc-reading-measure">
              Three short questions. No address required.
            </p>
            <RepairOrAsIsChooser />
          </div>
        </section>

        <GuideSources
          sources={TOOL_SOURCES}
          headingId="tool-sources-title"
          intro="Official pages that back the notes above. They are not a substitute for your own counsel, and they are not legal advice from us."
        />

        <section
          className="me-section"
          aria-labelledby="tool-related-title"
        >
          <div className="me-shell">
            <h2 id="tool-related-title">Related pages</h2>
            <p className="me-section__intro vc-reading-measure">
              When repairs feel too heavy to take on before a sale, sell as-is
              may fit. Browse cities we&apos;ve bought in for your city.
            </p>
            <ul className="me-city-list">
              <li>
                <Link href="/">Cash home buyer</Link>
              </li>
              <li>
                <Link href={guidesHubHref}>{GUIDES_HUB_NAV_LABEL}</Link>
              </li>
              <li>
                <Link href={citiesHubHref}>{CITIES_HUB_NAV_LABEL}</Link>
              </li>
              {asIs ? (
                <li>
                  <Link href={asIs.path}>Sell a house as-is</Link>
                </li>
              ) : null}
              {inherited ? (
                <li>
                  <Link href={inherited.path}>Sell an inherited house</Link>
                </li>
              ) : null}
              <li>
                <Link href={howWeBuyHref}>How we buy</Link>
              </li>
            </ul>
          </div>
        </section>

        <section
          className="me-section me-section--muted"
          aria-labelledby="tool-form-title"
        >
          <div className="me-shell">
            <h2 id="tool-form-title">Request a cash offer</h2>
            <LeadForm
              source="repair-or-as-is"
              landingPath={REPAIR_OR_AS_IS_PATH}
              defaultMotivation="repairs"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
