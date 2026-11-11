import Link from "next/link";
import { getAboutHref, ABOUT_NAV_LABEL } from "@/lib/about";
import {
  CITIES_HUB_NAV_LABEL,
  getCitiesHubHref,
} from "@/lib/cities-hub";
import {
  GET_A_CASH_OFFER_NAV_LABEL,
  getGetACashOfferHref,
} from "@/lib/get-a-cash-offer";
import { GUEST_PROOF } from "@/lib/guest-proof";
import { getHowWeBuyHref, HOW_WE_BUY_NAV_LABEL } from "@/lib/how-we-buy";

/** Shared footer: copy left, stacked site links on the right. */
export function SiteFooter() {
  const citiesHref = getCitiesHubHref();
  const howWeBuyHref = getHowWeBuyHref();
  const aboutHref = getAboutHref();
  const offerHref = getGetACashOfferHref();
  const { nap } = GUEST_PROOF;

  return (
    <footer className="me-site-footer">
      <div className="me-shell me-site-footer__inner">
        <div className="me-site-footer__main">
          <Link className="me-site-footer__brand" href="/">
            <strong>Mena Estates</strong>
          </Link>
          <p className="vc-reading-measure">
            Hector Mena leads our team. We buy houses for cash in the East Bay.
          </p>
          <p className="vc-reading-measure">
            <a href={`tel:${nap.phoneTel}`}>{nap.phoneDisplay}</a>
            {" · "}
            <a href={`mailto:${nap.email}`}>{nap.email}</a>
            <br />
            {nap.street}, {nap.cityStateZip}
          </p>
        </div>
        <nav className="me-site-footer__doors" aria-label="Footer links">
          <Link href="/">Home</Link>
          <Link href={offerHref}>{GET_A_CASH_OFFER_NAV_LABEL}</Link>
          <Link href={citiesHref}>{CITIES_HUB_NAV_LABEL}</Link>
          <Link href={howWeBuyHref}>{HOW_WE_BUY_NAV_LABEL}</Link>
          <Link href={aboutHref}>{ABOUT_NAV_LABEL}</Link>
        </nav>
      </div>
    </footer>
  );
}
