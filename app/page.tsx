import type { Metadata } from "next";
import Link from "next/link";
import { CityTape } from "@/app/components/CityTape";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import {
  CITIES_HUB_ALL_LABEL,
  CITIES_HUB_NAV_LABEL,
  getCitiesHubHref,
} from "@/lib/cities-hub";
import {
  GET_A_CASH_OFFER_NAV_LABEL,
  getGetACashOfferHref,
} from "@/lib/get-a-cash-offer";
import {
  GUIDES_HUB_ALL_LABEL,
  getGuidesHubHref,
} from "@/lib/guides-hub";
import { getHowWeBuyHref, HOW_WE_BUY_NAV_LABEL } from "@/lib/how-we-buy";
import { SELLER_HELP_SHELF_ITEMS } from "@/lib/seller-help-shelf";
import { buildPageMetadata, getPageSeo } from "@/lib/seo-metadata";

const CITY_TAPE = [
  {
    name: "Oakland",
    image: "/cities/oakland.jpg",
    alt: "Oakland skyline with the Bay Bridge beyond the port",
    objectPosition: "42% 40%",
  },
  {
    name: "San Leandro",
    image: "/cities/san-leandro.jpg",
    alt: "Aerial view of the San Leandro Marina and shoreline",
    objectPosition: "58% 42%",
  },
  {
    name: "Hayward",
    image: "/cities/hayward.jpg",
    alt: "Hayward City Hall on a clear day",
    objectPosition: "50% 35%",
  },
  {
    name: "Castro Valley",
    image: "/cities/castro-valley.jpg",
    alt: "Castro Valley hills with Eden Medical Center in view",
    objectPosition: "52% 38%",
  },
  {
    name: "San Lorenzo",
    image: "/cities/san-lorenzo.jpg",
    alt: "Aerial view of San Lorenzo neighborhoods",
    objectPosition: "48% 45%",
  },
  {
    name: "Newark",
    image: "/cities/newark.jpg",
    alt: "Aerial view of Newark beside the Bay salt ponds",
    objectPosition: "62% 40%",
  },
  {
    name: "Tracy",
    image: "/cities/tracy.jpg",
    alt: "Downtown Tracy at dusk",
    objectPosition: "48% 42%",
  },
] as const;

export const metadata: Metadata = buildPageMetadata("home");

const homeSeo = getPageSeo("home");
const offerSeo = getPageSeo("get-a-cash-offer");

export default function HomePage() {
  const citiesHubHref = getCitiesHubHref();
  const guidesHubHref = getGuidesHubHref();
  const howWeBuyHref = getHowWeBuyHref();
  const offerHref = getGetACashOfferHref();

  return (
    <>
      <SiteHeader />
      <main>
        <div className="me-home-lead">
          <section className="me-home-hero" aria-labelledby="hero-title">
            <div className="me-shell me-home-hero__grid">
              <div className="me-home-hero__copy">
                <p className="me-home-hero__brand">Mena Estates</p>
                <h1 id="hero-title">{homeSeo.h1}</h1>
                <p className="me-home-hero__lead vc-reading-measure">
                  {homeSeo.answerFirst}
                </p>
                <div className="me-home-hero__cta">
                  <Link className="me-btn me-btn--primary" href={offerHref}>
                    {GET_A_CASH_OFFER_NAV_LABEL}
                  </Link>
                  <Link className="me-btn me-btn--ghost" href={howWeBuyHref}>
                    How we buy
                  </Link>
                  <a className="me-btn me-btn--ghost" href="#buy-cities">
                    Cities
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            className="me-home-cities"
            id="buy-cities"
            aria-labelledby="cities-title"
          >
            <div className="me-shell">
              <h2 id="cities-title">Cities we&apos;ve bought in</h2>
              <p className="me-home-cities__intro vc-reading-measure">
                These are cities where we&apos;ve bought. Open your city for local
                detail, or request a cash offer and we will talk it through.
                Outside that core, we still buy when the house and the numbers
                fit.
              </p>

              <div className="me-home-doors-head">
                <h3 className="me-home-section__subhead">Cities</h3>
                <Link className="me-home-doors-hub" href={citiesHubHref}>
                  {CITIES_HUB_ALL_LABEL}
                </Link>
              </div>
              <CityTape cities={CITY_TAPE} />
            </div>
          </section>
        </div>

        <section
          className="me-home-section"
          id="how-we-buy"
          aria-labelledby="how-title"
        >
          <div className="me-shell">
            <h2 id="how-title">How we buy</h2>
            <p className="me-home-section__intro vc-reading-measure">
              We buy your house for cash. We are not listing it for you, and we
              do not pass your information to other buyers. After close, we
              remodel houses we own. That is our work, not a remodel of your house
              before close.
            </p>

            <ol className="me-home-process">
              <li>
                <strong>Send the house facts</strong>
                <p>
                  Phone, name, and property address first, with call consent. Why
                  sell and notes are optional. Tell us what you already know; we
                  will fill in the rest on the call.
                </p>
              </li>
              <li>
                <strong>We call you</strong>
                <p>
                  We walk numbers, condition, and title at a pace you can follow.
                  Bring your questions. Outside our usual cities, we still buy
                  when the house and the numbers fit.
                </p>
              </li>
              <li>
                <strong>Contract, then we close</strong>
                <p>
                  When both sides agree, we go under contract. From there we
                  handle access, title, and funding through close, including when
                  you still need time in the house.
                </p>
              </li>
            </ol>

            <p className="me-home-section__more vc-reading-measure">
              <Link href={howWeBuyHref}>More detail on how we buy</Link>
            </p>
          </div>
        </section>

        <section
          className="me-home-section"
          id="seller-help"
          aria-labelledby="seller-help-title"
        >
          <div className="me-shell">
            <div className="me-home-doors-head">
              <h2 id="seller-help-title">Help before the offer</h2>
              <Link className="me-home-doors-hub" href={guidesHubHref}>
                {GUIDES_HUB_ALL_LABEL}
              </Link>
            </div>
            <p className="me-home-section__intro vc-reading-measure">
              These pages walk through inherited timing, selling as-is, and a
              short repair-versus-as-is tool. Open any of them from here; they
              are not tied to one city.
            </p>
            <ul className="me-home-guide-list">
              {SELLER_HELP_SHELF_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>
                    <span className="me-home-guide-list__label">
                      {item.label}
                    </span>
                    <span className="me-home-guide-list__blurb">
                      {item.blurb}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="me-home-section me-home-section--offer"
          aria-labelledby="home-offer-title"
        >
          <div className="me-shell">
            <h2 id="home-offer-title">{offerSeo.h1}</h2>
            <p className="me-home-section__intro vc-reading-measure">
              {offerSeo.answerFirst}
            </p>
            <div className="me-home-offer__cta">
              <Link className="me-btn me-btn--primary" href={offerHref}>
                {GET_A_CASH_OFFER_NAV_LABEL}
              </Link>
              <Link className="me-btn me-btn--ghost" href={howWeBuyHref}>
                {HOW_WE_BUY_NAV_LABEL}
              </Link>
              <Link className="me-btn me-btn--ghost" href={citiesHubHref}>
                {CITIES_HUB_NAV_LABEL}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
