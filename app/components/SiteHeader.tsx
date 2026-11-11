"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
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
  const pathname = usePathname();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className="me-site-header"
      data-menu-open={menuOpen ? "true" : "false"}
    >
      <div className="me-shell me-site-header__inner">
        <Link className="me-brand" href="/">
          Mena Estates
        </Link>

        <div className="me-header-toolbar">
          <button
            ref={toggleRef}
            type="button"
            className="me-header-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={panelId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            <span className="me-header-menu-toggle__bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        <div className="me-header-panel" id={panelId}>
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
      </div>
    </header>
  );
}
