import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/app/components/LeadForm";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { getCitiesHubHref } from "@/lib/cities-hub";
import { HOW_WE_BUY_PATH } from "@/lib/how-we-buy";
import { buildPageMetadata, getPageSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("how-we-buy");

const trustSeo = getPageSeo("how-we-buy");

/**
 * Trust room: who buys as principal, operator call split, East Bay footprint.
 * Answer-first leaf structure (Capital pattern). Mena voice. No fake reviews.
 */
export default function HowWeBuyPage() {
  const citiesHubHref = getCitiesHubHref();

  return (
    <>
      <SiteHeader />
      <main className="me-trust">
        <section className="me-trust__hero" aria-labelledby="trust-title">
          <div className="me-shell">
            <h1 id="trust-title">{trustSeo.h1}</h1>
            <p className="me-trust__lead vc-reading-measure">
              {trustSeo.answerFirst}
            </p>
            <div className="me-trust__cta">
              <a className="me-btn me-btn--primary" href="#offer-form">
                Request a cash offer
              </a>
              <Link className="me-btn me-btn--ghost" href={citiesHubHref}>
                Cities we buy in
              </Link>
            </div>
          </div>
        </section>

        <section
          className="me-section"
          aria-labelledby="principal-title"
        >
          <div className="me-shell">
            <h2 id="principal-title">Who buys</h2>
            <p className="me-section__intro vc-reading-measure">
              We buy as principal. When the house and numbers fit, the purchase
              sits with us. We do not list your house for other buyers as an
              agent. We do not auction your lead.
            </p>
            <p className="me-trust__prose vc-reading-measure">
              Trade: cash home buyer for the East Bay. This is not a remodel or
              design-build site.
            </p>
          </div>
        </section>

        <section
          className="me-section me-section--muted"
          aria-labelledby="split-title"
        >
          <div className="me-shell">
            <h2 id="split-title">Operator calls. We own the exit.</h2>
            <p className="me-section__intro vc-reading-measure">
              An operator handles seller calls. Your request stays with us. The
              operator reviews address, county, timeline, and condition, then
              calls you the same day when we can.
            </p>
            <ol className="me-trust__process">
              <li>
                <strong>Send the house facts</strong>
                <p>
                  Address, county, occupancy, timeline, and why you want to sell.
                  Use the form on this page, home, or a city or situation page.
                </p>
              </li>
              <li>
                <strong>Operator calls</strong>
                <p>
                  We walk numbers, condition, and title on that call. If the
                  house sits outside Alameda or Contra Costa, we say so and stop.
                </p>
              </li>
              <li>
                <strong>Contract, then we close</strong>
                <p>
                  When both sides agree, we go under contract. From there we own
                  the exit: access, buyers, and funding through close.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section
          className="me-section"
          aria-labelledby="footprint-title"
        >
          <div className="me-shell">
            <h2 id="footprint-title">East Bay footprint</h2>
            <p className="me-section__intro vc-reading-measure">
              Alameda and Contra Costa only. Oakland, Berkeley, Hayward,
              Fremont, Concord, Walnut Creek, Richmond, and nearby cities in
              those counties. Outside that footprint, we refuse the request.
            </p>
            <aside className="me-trust__proof" aria-label="Footprint proof">
              <h3 className="me-trust__proof-heading">What this page proves</h3>
              <ul className="me-trust__proof-list">
                <li>Principal purchase path when numbers fit</li>
                <li>One operator callback on seller requests</li>
                <li>Named county footprint, not a national farm</li>
              </ul>
              <p className="me-trust__proof-note vc-reading-measure">
                No star ratings. No invented testimonials. No license numbers or
                day-count guarantees on this page. Scope stays East Bay.
              </p>
            </aside>
          </div>
        </section>

        <section
          className="me-section me-section--muted"
          aria-labelledby="trust-related-title"
        >
          <div className="me-shell">
            <h2 id="trust-related-title">Related doors</h2>
            <p className="me-section__intro vc-reading-measure">
              Home keeps the thesis. The cities hub owns the catalog. City and
              situation pages keep the local exit. Same cash-offer form on every
              door.
            </p>
            <ul className="me-city-list">
              <li>
                <Link href="/">East Bay cash home buyer</Link>
              </li>
              <li>
                <Link href={citiesHubHref}>Cities we buy in East Bay</Link>
              </li>
              <li>
                <Link href="/sell-inherited-house-east-bay">
                  Sell inherited house East Bay
                </Link>
              </li>
              <li>
                <Link href="/sell-house-as-is-east-bay">
                  Sell house as-is East Bay
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section
          className="me-section"
          aria-labelledby="trust-form-title"
        >
          <div className="me-shell">
            <h2 id="trust-form-title">Request a cash offer</h2>
            <p className="me-section__intro vc-reading-measure">
              An operator calls back the same day when we can. Alameda and Contra
              Costa only.
            </p>
            <LeadForm source="how-we-buy" landingPath={HOW_WE_BUY_PATH} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
