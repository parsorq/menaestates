import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/app/components/LeadForm";
import { RepairOrAsIsChooser } from "@/app/components/RepairOrAsIsChooser";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { getCitiesHubHref } from "@/lib/cities-hub";
import { getHowWeBuyHref } from "@/lib/how-we-buy";
import { REPAIR_OR_AS_IS_PATH } from "@/lib/repair-or-as-is";
import { buildPageMetadata, getPageSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("repair-or-as-is-east-bay");

const toolSeo = getPageSeo("repair-or-as-is-east-bay");

/**
 * Free tool: repair vs as-is decision aid before the cash-offer form.
 * Answer-first leaf. Mena voice. No AVM. No dollar range.
 */
export default function RepairOrAsIsPage() {
  const citiesHubHref = getCitiesHubHref();
  const howWeBuyHref = getHowWeBuyHref();

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
                Cities we buy in
              </Link>
            </div>
          </div>
        </section>

        <section
          className="me-section"
          aria-labelledby="chooser-title"
        >
          <div className="me-shell">
            <h2 id="chooser-title">Repair or as-is</h2>
            <p className="me-section__intro vc-reading-measure">
              Three short questions. No login. No address. We do not price the
              house here. The cash-offer form stays the door into a real call.
            </p>
            <RepairOrAsIsChooser />
          </div>
        </section>

        <section
          className="me-section me-section--muted"
          aria-labelledby="tool-related-title"
        >
          <div className="me-shell">
            <h2 id="tool-related-title">Related doors</h2>
            <p className="me-section__intro vc-reading-measure">
              The as-is situation page owns the transactional exit. The cities
              hub owns the catalog. Same cash-offer form on every door.
            </p>
            <ul className="me-city-list">
              <li>
                <Link href="/">East Bay cash home buyer</Link>
              </li>
              <li>
                <Link href={citiesHubHref}>Cities we buy in East Bay</Link>
              </li>
              <li>
                <Link href="/sell-house-as-is-east-bay">
                  Sell house as-is East Bay
                </Link>
              </li>
              <li>
                <Link href="/sell-inherited-house-east-bay">
                  Sell inherited house East Bay
                </Link>
              </li>
              <li>
                <Link href={howWeBuyHref}>How we buy in the East Bay</Link>
              </li>
            </ul>
          </div>
        </section>

        <section
          className="me-section"
          aria-labelledby="tool-form-title"
        >
          <div className="me-shell">
            <h2 id="tool-form-title">Request a cash offer</h2>
            <p className="me-section__intro vc-reading-measure">
              An operator calls back the same day when we can. Alameda and Contra
              Costa only. We do not auction your lead.
            </p>
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
