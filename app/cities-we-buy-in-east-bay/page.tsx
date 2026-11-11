import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/app/components/JsonLd";
import { LeadForm } from "@/app/components/LeadForm";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import type { LeadCounty } from "@/lib/counties";
import {
  GUIDES_HUB_ALL_LABEL,
  getGuidesHubHref,
} from "@/lib/guides-hub";
import { getHowWeBuyHref, HOW_WE_BUY_NAV_LABEL } from "@/lib/how-we-buy";
import {
  CITIES_HUB_PATH,
  cityLanders,
  type LanderDefinition,
} from "@/lib/landers";
import { citiesHubItemListJsonLd } from "@/lib/schema";
import { SELLER_HELP_SHELF_ITEMS } from "@/lib/seller-help-shelf";
import { buildPageMetadata, getPageSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("cities-we-buy-in-east-bay");

const hubSeo = getPageSeo("cities-we-buy-in-east-bay");

type CityCardMedia = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  objectPosition: string;
};

/** Display media for hub cards. Paths match CITY_LANDER_PATHS / LANDERS. */
const CITY_CARD_MEDIA: CityCardMedia[] = [
  {
    slug: "sell-house-fast-oakland",
    name: "Oakland",
    image: "/cities/oakland.jpg",
    alt: "Oakland skyline with the Bay Bridge beyond the port",
    objectPosition: "42% 40%",
  },
  {
    slug: "sell-house-fast-san-leandro",
    name: "San Leandro",
    image: "/cities/san-leandro.jpg",
    alt: "Aerial view of the San Leandro Marina and shoreline",
    objectPosition: "58% 42%",
  },
  {
    slug: "sell-house-fast-hayward",
    name: "Hayward",
    image: "/cities/hayward.jpg",
    alt: "Hayward City Hall on a clear day",
    objectPosition: "50% 35%",
  },
  {
    slug: "sell-house-fast-castro-valley",
    name: "Castro Valley",
    image: "/cities/castro-valley.jpg",
    alt: "Castro Valley hills with Eden Medical Center in view",
    objectPosition: "52% 38%",
  },
  {
    slug: "sell-house-fast-san-lorenzo",
    name: "San Lorenzo",
    image: "/cities/san-lorenzo.jpg",
    alt: "Aerial view of San Lorenzo neighborhoods",
    objectPosition: "48% 45%",
  },
  {
    slug: "sell-house-fast-newark",
    name: "Newark",
    image: "/cities/newark.jpg",
    alt: "Aerial view of Newark beside the Bay salt ponds",
    objectPosition: "62% 40%",
  },
  {
    slug: "sell-house-fast-tracy",
    name: "Tracy",
    image: "/cities/tracy.jpg",
    alt: "Downtown Tracy at dusk",
    objectPosition: "48% 42%",
  },
];

const MEDIA_BY_SLUG = new Map(CITY_CARD_MEDIA.map((row) => [row.slug, row]));

/** Matches hub grid: 1 col / 2 col / 4 col. */
const CITY_HUB_IMAGE_SIZES =
  "(max-width: 743px) 100vw, (max-width: 1031px) 50vw, 25vw";

/** First county row starts immediately; later counties stay lazy. */
const CITY_HUB_EAGER_COUNT = 4;

const COUNTY_ORDER: LeadCounty[] = ["Alameda", "San Joaquin"];

function citiesByCounty(county: LeadCounty): LanderDefinition[] {
  return cityLanders().filter((lander) => lander.defaultCounty === county);
}

export default function CitiesHubPage() {
  const howWeBuyHref = getHowWeBuyHref();
  const guidesHubHref = getGuidesHubHref();

  return (
    <>
      <JsonLd data={citiesHubItemListJsonLd()} />
      <SiteHeader />
      <main className="me-cities-hub">
        <section className="me-cities-hub__hero" aria-labelledby="cities-hub-title">
          <div className="me-shell">
            <h1 id="cities-hub-title">{hubSeo.h1}</h1>
            <p className="me-cities-hub__lead vc-reading-measure">
              {hubSeo.answerFirst}
            </p>
            <div className="me-cities-hub__cta">
              <a className="me-btn me-btn--primary" href="#offer-form">
                Request a cash offer
              </a>
              <Link className="me-btn me-btn--ghost" href={howWeBuyHref}>
                {HOW_WE_BUY_NAV_LABEL}
              </Link>
              <Link className="me-btn me-btn--ghost" href="/">
                Back to home
              </Link>
            </div>
          </div>
        </section>

        {COUNTY_ORDER.map((county) => {
          const cities = citiesByCounty(county);
          if (cities.length === 0) return null;
          const headingId = `county-${county.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <section
              key={county}
              className="me-cities-hub__county me-section"
              aria-labelledby={headingId}
            >
              <div className="me-shell">
                <h2 id={headingId}>{county} County</h2>
                <p className="me-section__intro vc-reading-measure">
                  We buy houses in these {county} County cities. Open your city
                  for what selling there looks like, or request a cash offer and
                  we will talk it through on the call.
                </p>
                <ul className="me-cities-hub__grid">
                  {cities.map((lander, index) => {
                    const media = MEDIA_BY_SLUG.get(lander.slug);
                    const name =
                      media?.name ??
                      lander.asideTitle.split("·")[0]?.trim() ??
                      lander.slug;
                    const eager =
                      county === COUNTY_ORDER[0] && index < CITY_HUB_EAGER_COUNT;
                    return (
                      <li key={lander.slug} className="me-cities-hub__item">
                        <a className="me-cities-hub__card" href={lander.path}>
                          {media ? (
                            <Image
                              className="me-cities-hub__card-image"
                              src={media.image}
                              alt={media.alt}
                              width={640}
                              height={512}
                              sizes={CITY_HUB_IMAGE_SIZES}
                              quality={75}
                              loading={eager ? "eager" : "lazy"}
                              fetchPriority={
                                eager && index === 0 ? "high" : "auto"
                              }
                              decoding="async"
                              style={{ objectPosition: media.objectPosition }}
                            />
                          ) : null}
                          <span className="me-cities-hub__card-body">
                            <span className="me-cities-hub__card-name">{name}</span>
                            <span className="me-cities-hub__card-go">
                              Request a cash offer in {name}
                            </span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          );
        })}

        <section
          className="me-cities-hub__guides me-section me-section--muted"
          aria-labelledby="help-before-offer-title"
        >
          <div className="me-shell">
            <div className="me-home-doors-head">
              <h2 id="help-before-offer-title">Help before the offer</h2>
              <Link className="me-home-doors-hub" href={guidesHubHref}>
                {GUIDES_HUB_ALL_LABEL}
              </Link>
            </div>
            <p className="me-section__intro vc-reading-measure">
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
          className="me-cities-hub__form me-section"
          aria-labelledby="cities-form-title"
        >
          <div className="me-shell">
            <h2 id="cities-form-title">Request a cash offer</h2>
            <LeadForm source="cities-hub" landingPath={CITIES_HUB_PATH} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
