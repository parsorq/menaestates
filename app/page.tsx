import type { Metadata } from "next";
import { LeadForm } from "@/app/components/LeadForm";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { CITY_LANDER_PATHS } from "@/lib/landers";
import { buildPageMetadata, getPageSeo } from "@/lib/seo-metadata";

const CITIES = [
  "Oakland",
  "Berkeley",
  "Hayward",
  "Fremont",
  "Concord",
  "Walnut Creek",
  "Richmond",
];

const SITUATIONS = [
  {
    href: "/sell-inherited-house-east-bay",
    label: "Inherited house",
  },
  {
    href: "/sell-house-as-is-east-bay",
    label: "Sell as-is",
  },
];

export const metadata: Metadata = buildPageMetadata("home");

const homeSeo = getPageSeo("home");

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="me-hero" aria-labelledby="hero-title">
          <div className="me-shell me-hero__grid">
            <div className="me-hero__copy">
              <h1 id="hero-title">{homeSeo.h1}</h1>
              <p className="me-hero__lead vc-reading-measure">{homeSeo.answerFirst}</p>
              <div className="me-hero__cta">
                <a className="me-btn me-btn--primary" href="#offer-form">
                  Get a cash offer
                </a>
                <a className="me-btn me-btn--ghost" href="#how-it-works">
                  How it works
                </a>
              </div>
            </div>
            <aside className="me-hero__aside" aria-label="Footprint">
              <strong>Alameda + Contra Costa</strong>
              <p>
                Oakland, Berkeley, Hayward, Fremont, Concord, Walnut Creek, Richmond,
                and nearby cities in both counties.
              </p>
            </aside>
          </div>
        </section>

        <section className="me-section" id="how-it-works" aria-labelledby="how-title">
          <div className="me-shell">
            <h2 id="how-title">How it works</h2>
            <p className="me-section__intro vc-reading-measure">
              One form. One callback. A cash close when the house and numbers fit.
            </p>
            <ol className="me-steps">
              <li>
                <strong>Tell us about the house</strong>
                <p>Address, county, timeline, and why you want to sell.</p>
              </li>
              <li>
                <strong>Operator calls you</strong>
                <p>We review numbers on your request. Your request stays with us.</p>
              </li>
              <li>
                <strong>We close</strong>
                <p>After under contract, we own the exit with buyers and funding.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="me-section me-section--muted" aria-labelledby="cities-title">
          <div className="me-shell">
            <h2 id="cities-title">Cities we cover</h2>
            <p className="me-section__intro vc-reading-measure">
              Primary footprint. Same cash-offer form for every city. Linked cities open a
              city page.
            </p>
            <ul className="me-city-list">
              {CITIES.map((city) => {
                const href = CITY_LANDER_PATHS[city];
                return (
                  <li key={city}>
                    {href ? <a href={href}>{city}</a> : city}
                  </li>
                );
              })}
            </ul>
            <h3 className="me-section__subhead">Situations</h3>
            <ul className="me-city-list">
              {SITUATIONS.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="me-section" aria-labelledby="form-title">
          <div className="me-shell">
            <h2 id="form-title">Request a cash offer</h2>
            <p className="me-section__intro vc-reading-measure">
              An operator calls back the same day when we can. Alameda and Contra Costa
              only.
            </p>
            <LeadForm source="web" landingPath="/" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
