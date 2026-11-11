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

const phone =
  process.env.NEXT_PUBLIC_OPS_PHONE?.trim() || GUEST_PROOF.nap.phoneDisplay;

/** Shared nav: home (brand), cities, how we buy, about, offer page. */
export function SiteHeader() {
  const citiesHref = getCitiesHubHref();
  const howWeBuyHref = getHowWeBuyHref();
  const aboutHref = getAboutHref();
  const offerHref = getGetACashOfferHref();

  return (
    <header className="me-site-header">
      <div className="me-shell me-site-header__inner">
        <Link className="me-brand" href="/">
          Mena Estates
        </Link>
        <nav className="me-header-nav" aria-label="Site">
          <Link className="me-header-nav__link" href={citiesHref}>
            {CITIES_HUB_NAV_LABEL}
          </Link>
          <Link className="me-header-nav__link" href={howWeBuyHref}>
            {HOW_WE_BUY_NAV_LABEL}
          </Link>
          <Link className="me-header-nav__link" href={aboutHref}>
            {ABOUT_NAV_LABEL}
          </Link>
        </nav>
        <div className="me-header-actions">
          {phone ? (
            <a
              className="me-btn me-btn--ghost"
              href={`tel:${GUEST_PROOF.nap.phoneTel}`}
            >
              Call {phone}
            </a>
          ) : null}
          <Link className="me-btn me-btn--primary" href={offerHref}>
            {GET_A_CASH_OFFER_NAV_LABEL}
          </Link>
        </div>
      </div>
    </header>
  );
}
