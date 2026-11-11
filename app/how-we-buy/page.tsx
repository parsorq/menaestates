import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/app/components/LeadForm";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { getAboutHref } from "@/lib/about";
import {
  CITIES_HUB_NAV_LABEL,
  getCitiesHubHref,
} from "@/lib/cities-hub";
import { GUEST_PROOF } from "@/lib/guest-proof";
import { HOW_WE_BUY_PATH, howWeBuyRelatedLinks } from "@/lib/how-we-buy";
import { buildPageMetadata, getPageSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("how-we-buy");

const trustSeo = getPageSeo("how-we-buy");

/** How we buy: cash buyer, callback, buy cities. */
export default function HowWeBuyPage() {
  const citiesHubHref = getCitiesHubHref();
  const aboutHref = getAboutHref();
  const related = howWeBuyRelatedLinks();
  const { principal, license, nap } = GUEST_PROOF;

  return (
    <>
      <SiteHeader />
      <main>
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
                {CITIES_HUB_NAV_LABEL}
              </Link>
              <Link className="me-btn me-btn--ghost" href={aboutHref}>
                About Hector
              </Link>
            </div>
          </div>
        </section>

        <section
          className="me-section"
          aria-labelledby="principal-title"
        >
          <div className="me-shell me-trust__prose">
            <h2 id="principal-title">Who buys</h2>
            <p className="vc-reading-measure">
              {principal.name} leads our team. We buy your house for cash. When
              the house and the numbers fit, we are the buyer named on the
              contract. We do not list your house as an agent, and we do not pass
              your information to other buyers.
            </p>
            <p className="vc-reading-measure">
              We buy houses, remodel them after close, and sell them. That is our
              work. We buy as-is when the numbers work. We do not remodel your
              house before close. On the call we explain that plainly, including
              what stays yours until closing.
            </p>
            <p className="vc-reading-measure">
              {license.description} · {license.issuedBy} license #
              {license.number}. Call {nap.phoneDisplay}.
            </p>
          </div>
        </section>

        <section className="me-section" aria-labelledby="split-title">
          <div className="me-shell">
            <h2 id="split-title">What happens after you send the form</h2>
            <ol className="me-trust__process">
              <li>
                <strong>Send the request</strong>
                <p>
                  Phone, name, and property address first, with call consent. Why
                  sell and notes are optional. Share what you already know about
                  the house and your timing; we will take it from there on the
                  call.
                </p>
              </li>
              <li>
                <strong>We call you</strong>
                <p>
                  Monday to Friday, 9:00 to 17:00 Pacific Time. One of us walks
                  numbers, condition, and title at a pace you can follow. Outside
                  our usual cities, we still buy when the house and the numbers
                  fit, and we will say so straight.
                </p>
              </li>
              <li>
                <strong>Contract, then we close</strong>
                <p>
                  When both sides agree, we go under contract. From there we
                  handle access, title, and funding through close. Close timing
                  is set on the call once we know whether you still live in the
                  house and what title needs.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="me-section" aria-labelledby="footprint-title">
          <div className="me-shell me-trust__prose">
            <h2 id="footprint-title">Where we&apos;ve bought</h2>
            <p className="vc-reading-measure">
              {GUEST_PROOF.buyCitiesLabel}. Alameda County and Tracy in San
              Joaquin County. Those cities are the core. Outside them, we still
              buy when the house and the numbers fit.
            </p>
            <aside className="me-trust__proof" aria-label="On the call">
              <h3 className="me-trust__proof-heading">On the call</h3>
              <ul className="me-trust__proof-list">
                <li>
                  We walk through the house, the numbers, and your timing at a
                  pace you can follow
                </li>
                <li>
                  We give straight answers, including when we cannot buy
                </li>
                <li>
                  We start with our core cities; outside them we still buy when
                  the house and the numbers fit
                </li>
              </ul>
            </aside>
            <p className="me-trust__proof-note vc-reading-measure">
              See <Link href={citiesHubHref}>{CITIES_HUB_NAV_LABEL}</Link>, or{" "}
              <Link href={aboutHref}>About Hector</Link>.
            </p>
          </div>
        </section>

        <section
          className="me-section"
          aria-labelledby="trust-related-title"
        >
          <div className="me-shell">
            <h2 id="trust-related-title">Related pages</h2>
            <p className="me-section__intro vc-reading-measure">
              Cities we&apos;ve bought in, who we are, help before the offer, and a
              short tool if the house needs work.
            </p>
            <ul className="me-city-list">
              {related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="me-section" aria-labelledby="trust-form-title">
          <div className="me-shell">
            <h2 id="trust-form-title">Request a cash offer</h2>
            <LeadForm source="how-we-buy" landingPath={HOW_WE_BUY_PATH} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
