import type { Metadata } from "next";
import { LeadForm } from "@/app/components/LeadForm";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import {
  GET_A_CASH_OFFER_PATH,
} from "@/lib/get-a-cash-offer";
import { buildPageMetadata, getPageSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("get-a-cash-offer");

const offerSeo = getPageSeo("get-a-cash-offer");

/** Dedicated ask: proof + next, then form. Laptop split puts form beside context. */
export default function GetACashOfferPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="me-section" aria-labelledby="offer-title">
          <div className="me-shell">
            <h1 id="offer-title">{offerSeo.h1}</h1>
            <LeadForm
              source="get-a-cash-offer"
              landingPath={GET_A_CASH_OFFER_PATH}
              autoFocusName
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
