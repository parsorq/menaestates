import Link from "next/link";
import { getCitiesHubHref } from "@/lib/cities-hub";
import { getHowWeBuyHref, HOW_WE_BUY_NAV_LABEL } from "@/lib/how-we-buy";

const phone = process.env.NEXT_PUBLIC_OPS_PHONE?.trim() || "";

/** Shared doors only: home (brand), cities hub, trust, offer form (AEO_ENTRY_MAP). */
export function SiteHeader() {
  const citiesHref = getCitiesHubHref();
  const howWeBuyHref = getHowWeBuyHref();

  return (
    <header className="me-site-header">
      <div className="me-shell me-site-header__inner">
        <Link className="me-brand" href="/">
          Mena Estates
        </Link>
        <nav className="me-header-nav" aria-label="Site">
          <Link className="me-header-nav__link" href={citiesHref}>
            Cities
          </Link>
          <Link className="me-header-nav__link" href={howWeBuyHref}>
            {HOW_WE_BUY_NAV_LABEL}
          </Link>
        </nav>
        <div className="me-header-actions">
          {phone ? (
            <a className="me-btn me-btn--ghost" href={`tel:${phone.replace(/\D/g, "")}`}>
              Call {phone}
            </a>
          ) : null}
          <Link className="me-btn me-btn--primary" href="/#offer-form">
            Get a cash offer
          </Link>
        </div>
      </div>
    </header>
  );
}
