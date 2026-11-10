import type { Metadata } from "next";
import Link from "next/link";
import { CityTape } from "@/app/components/CityTape";
import { LeadForm } from "@/app/components/LeadForm";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { getCitiesHubHref } from "@/lib/cities-hub";
import { getHowWeBuyHref } from "@/lib/how-we-buy";
import { getRepairOrAsIsHref } from "@/lib/repair-or-as-is";
import { buildPageMetadata, getPageSeo } from "@/lib/seo-metadata";

const CITY_TAPE = [
  {
    name: "Oakland",
    image: "/cities/oakland.jpg",
    alt: "Oakland skyline with the Bay Bridge beyond the port",
    objectPosition: "42% 40%",
  },
  {
    name: "Berkeley",
    image: "/cities/berkeley.jpg",
    alt: "Sather Tower over Berkeley at sunset with the bay beyond",
    objectPosition: "72% 35%",
  },
  {
    name: "Hayward",
    image: "/cities/hayward.jpg",
    alt: "Hayward City Hall on a clear day",
    objectPosition: "50% 35%",
  },
  {
    name: "Fremont",
    image: "/cities/fremont.jpg",
    alt: "Lake Elizabeth and Central Park in Fremont with hills beyond",
    objectPosition: "50% 40%",
  },
  {
    name: "Concord",
    image: "/cities/concord.jpg",
    alt: "Concord skyline with Mount Diablo in the distance",
    objectPosition: "48% 35%",
  },
  {
    name: "Walnut Creek",
    image: "/cities/walnut-creek.webp",
    alt: "Walnut Creek downtown along the BART line",
    objectPosition: "50% 40%",
  },
  {
    name: "Richmond",
    image: "/cities/richmond.jpg",
    alt: "Bay view from Richmond toward San Francisco",
    objectPosition: "35% 45%",
  },
] as const;

const SITUATIONS = [
  {
    href: "/sell-inherited-house-east-bay",
    label: "Inherited house",
    blurb: "Estate and probate exits stay on one callback path.",
  },
  {
    href: "/sell-house-as-is-east-bay",
    label: "Sell as-is",
    blurb: "Repairs and deferred maintenance stay in the deal when numbers fit.",
  },
] as const;


export const metadata: Metadata = buildPageMetadata("home");

const homeSeo = getPageSeo("home");

export default function HomePage() {
  const citiesHubHref = getCitiesHubHref();
  const howWeBuyHref = getHowWeBuyHref();
  const repairOrAsIsHref = getRepairOrAsIsHref();

  const tools = [
    {
      href: repairOrAsIsHref,
      label: "Repair or as-is",
      blurb: "Short chooser before the form. No price. No login.",
    },
  ] as const;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="me-home-hero" aria-labelledby="hero-title">
          <div className="me-shell me-home-hero__grid">
            <div className="me-home-hero__copy">
              <p className="me-home-hero__brand">Mena Estates</p>
              <h1 id="hero-title">{homeSeo.h1}</h1>
              <p className="me-home-hero__lead vc-reading-measure">
                {homeSeo.answerFirst}
              </p>
              <div className="me-home-hero__cta">
                <a className="me-btn me-btn--primary" href="#offer-form">
                  Get a cash offer
                </a>
                <Link className="me-btn me-btn--ghost" href={howWeBuyHref}>
                  How we buy
                </Link>
                <a className="me-btn me-btn--ghost" href="#east-bay-doors">
                  East Bay cities
                </a>
              </div>
            </div>
            <aside className="me-home-hero__aside" aria-label="Footprint">
              <strong>Alameda + Contra Costa</strong>
              <p className="vc-reading-measure">
                Oakland, Berkeley, Hayward, Fremont, Concord, Walnut Creek,
                Richmond, and nearby cities in both counties. Outside that
                footprint, we refuse the request.
              </p>
            </aside>
          </div>
        </section>

        <section
          className="me-home-section"
          id="how-we-buy"
          aria-labelledby="how-title"
        >
          <div className="me-shell">
            <h2 id="how-title">How we buy</h2>
            <p className="me-home-section__intro vc-reading-measure">
              We buy as principal. An operator handles seller calls. After under
              contract, we own the exit with buyers and funding. No agent listing
              theater. No lead auction.
            </p>

            <div className="me-home-facts">
              <div className="me-home-fact">
                <h3>Principal, not a listing</h3>
                <p className="vc-reading-measure">
                  The purchase sits with us when the house and numbers fit. We do
                  not market your house for other buyers as an agent.
                </p>
              </div>
              <div className="me-home-fact">
                <h3>One operator callback</h3>
                <p className="vc-reading-measure">
                  Your request stays with us. An operator reviews the address,
                  county, timeline, and condition, then calls you the same day
                  when we can.
                </p>
              </div>
              <div className="me-home-fact">
                <h3>Close path we own</h3>
                <p className="vc-reading-measure">
                  After under contract, we run title, access, and funding. The
                  exit stays with us through close.
                </p>
              </div>
            </div>

            <ol className="me-home-process">
              <li>
                <strong>Send the house facts</strong>
                <p>
                  Address, county, occupancy, timeline, and why you want to sell.
                  Use the form on this page or a city or situation page.
                </p>
              </li>
              <li>
                <strong>Operator calls</strong>
                <p>
                  We walk numbers, condition, and title questions on that call.
                  If the house sits outside Alameda or Contra Costa, we say so
                  and stop.
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

            <p className="me-home-section__more vc-reading-measure">
              <Link href={howWeBuyHref}>
                Full how we buy page: principal, operator split, and footprint
              </Link>
            </p>
          </div>
        </section>

        <section
          className="me-home-section"
          id="proof"
          aria-labelledby="proof-title"
        >
          <div className="me-shell">
            <h2 id="proof-title">Principal, operator, footprint</h2>
            <p className="me-home-section__intro vc-reading-measure">
              Proof for a cash exit in this footprint. No star ratings. No
              invented testimonials. No license numbers or fixed-day promises on
              this page.
            </p>
            <div className="me-home-proof">
              <div className="me-home-proof__item">
                <h3>Principal buyer</h3>
                <p className="vc-reading-measure">
                  We buy when the house and numbers fit. We are not an agent
                  listing site.
                </p>
              </div>
              <div className="me-home-proof__item">
                <h3>Operator on the call</h3>
                <p className="vc-reading-measure">
                  An operator reviews the request and calls you. After under
                  contract, we own the exit through close.
                </p>
              </div>
              <div className="me-home-proof__item">
                <h3>East Bay only</h3>
                <p className="vc-reading-measure">
                  Alameda and Contra Costa: Oakland, Berkeley, Hayward, Fremont,
                  Concord, Walnut Creek, Richmond, and nearby cities in those
                  counties. Outside that map, we refuse.
                </p>
              </div>
            </div>
            <p className="me-home-section__more vc-reading-measure">
              <Link href={howWeBuyHref}>Read how we buy</Link>
              {" · "}
              <a href="#offer-form">Request a cash offer</a>
            </p>
          </div>
        </section>

        <section
          className="me-home-section me-home-section--muted"
          id="east-bay-doors"
          aria-labelledby="doors-title"
        >
          <div className="me-shell">
            <h2 id="doors-title">East Bay cities and situations</h2>
            <p className="me-home-section__intro vc-reading-measure">
              Open a city page for a named East Bay city. Open a situation page
              for an inherited or as-is exit. Same cash-offer form on every door.
            </p>

            <div className="me-home-doors-head">
              <h3 className="me-home-section__subhead">Cities</h3>
              <Link className="me-home-doors-hub" href={citiesHubHref}>
                All cities we buy in
              </Link>
            </div>
            <CityTape cities={CITY_TAPE} />

            <h3 className="me-home-section__subhead">Situations</h3>
            <ul className="me-home-situation-list">
              {SITUATIONS.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>
                    <span className="me-home-situation-list__label">
                      {item.label}
                    </span>
                    <span className="me-home-situation-list__blurb">
                      {item.blurb}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="me-home-section__subhead">Tools</h3>
            <ul className="me-home-situation-list">
              {tools.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>
                    <span className="me-home-situation-list__label">
                      {item.label}
                    </span>
                    <span className="me-home-situation-list__blurb">
                      {item.blurb}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="me-home-section"
          aria-labelledby="form-title"
        >
          <div className="me-shell">
            <h2 id="form-title">Request a cash offer</h2>
            <p className="me-home-section__intro vc-reading-measure">
              An operator calls back the same day when we can. Alameda and Contra
              Costa only.
            </p>
            <LeadForm source="web" landingPath="/" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
