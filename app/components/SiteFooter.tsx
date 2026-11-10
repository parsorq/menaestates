import Link from "next/link";
import { getCitiesHubHref } from "@/lib/cities-hub";
import { getHowWeBuyHref, HOW_WE_BUY_NAV_LABEL } from "@/lib/how-we-buy";

/** Shared doors only: home, cities hub, trust, offer form (AEO_ENTRY_MAP). */
export function SiteFooter() {
  const citiesHref = getCitiesHubHref();
  const howWeBuyHref = getHowWeBuyHref();

  return (
    <footer className="me-site-footer">
      <div className="me-shell me-site-footer__inner">
        <Link className="me-site-footer__brand" href="/">
          <strong>Mena Estates</strong>
        </Link>
        <p className="vc-reading-measure">
          Cash home buyer for Alameda and Contra Costa. We buy as principal. An
          operator handles seller calls. We own the exit after under contract.
        </p>
        <nav className="me-site-footer__doors" aria-label="Footer doors">
          <Link href="/">Home</Link>
          <Link href="/#offer-form">Get a cash offer</Link>
          <Link href={citiesHref}>Cities</Link>
          <Link href={howWeBuyHref}>{HOW_WE_BUY_NAV_LABEL}</Link>
        </nav>
      </div>
    </footer>
  );
}
