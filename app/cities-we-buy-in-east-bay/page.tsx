import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/app/components/JsonLd";
import { LeadForm } from "@/app/components/LeadForm";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import type { LeadCounty } from "@/lib/counties";
import { getHowWeBuyHref, HOW_WE_BUY_NAV_LABEL } from "@/lib/how-we-buy";
import {
  CITIES_HUB_PATH,
  cityLanders,
  situationLanders,
  type LanderDefinition,
} from "@/lib/landers";
import {
  getRepairOrAsIsHref,
  REPAIR_OR_AS_IS_NAV_LABEL,
} from "@/lib/repair-or-as-is";
import { citiesHubItemListJsonLd } from "@/lib/schema";
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
    slug: "sell-house-fast-berkeley",
    name: "Berkeley",
    image: "/cities/berkeley.jpg",
    alt: "Sather Tower over Berkeley at sunset with the bay beyond",
    objectPosition: "72% 35%",
  },
  {
    slug: "sell-house-fast-hayward",
    name: "Hayward",
    image: "/cities/hayward.jpg",
    alt: "Hayward City Hall on a clear day",
    objectPosition: "50% 35%",
  },
  {
    slug: "sell-house-fast-fremont",
    name: "Fremont",
    image: "/cities/fremont.jpg",
    alt: "Lake Elizabeth and Central Park in Fremont with hills beyond",
    objectPosition: "50% 40%",
  },
  {
    slug: "sell-house-fast-concord",
    name: "Concord",
    image: "/cities/concord.jpg",
    alt: "Concord skyline with Mount Diablo in the distance",
    objectPosition: "48% 35%",
  },
  {
    slug: "sell-house-fast-walnut-creek",
    name: "Walnut Creek",
    image: "/cities/walnut-creek.webp",
    alt: "Walnut Creek downtown along the BART line",
    objectPosition: "50% 40%",
  },
  {
    slug: "sell-house-fast-richmond",
    name: "Richmond",
    image: "/cities/richmond.jpg",
    alt: "Bay view from Richmond toward San Francisco",
    objectPosition: "35% 45%",
  },
];

const MEDIA_BY_SLUG = new Map(CITY_CARD_MEDIA.map((row) => [row.slug, row]));

const COUNTY_ORDER: LeadCounty[] = ["Alameda", "Contra Costa"];

const SITUATION_LABELS: Record<string, string> = {
  "sell-inherited-house-east-bay": "Inherited house",
  "sell-house-as-is-east-bay": "Sell as-is",
};

function citiesByCounty(county: LeadCounty): LanderDefinition[] {
  return cityLanders().filter((lander) => lander.defaultCounty === county);
}

export default function CitiesHubPage() {
  const situations = situationLanders();
  const howWeBuyHref = getHowWeBuyHref();
  const repairOrAsIsHref = getRepairOrAsIsHref();

  return (
    <>
      <JsonLd data={citiesHubItemListJsonLd()} />
      <SiteHeader />
      <main className="me-cities-hub">
        <section className="me-cities-hub__hero" aria-labelledby="cities-hub-title">
          <div className="me-shell">
            <h1 id="cities-hub-title">{hubSeo.h1}</h1>
            <p className="me-cities-hub__lead vc-reading-measure">{hubSeo.answerFirst}</p>
            <div className="me-cities-hub__cta">
              <a className="me-btn me-btn--primary" href="#offer-form">
                Request a cash offer
              </a>
              <Link className="me-btn me-btn--ghost" href={howWeBuyHref}>
                {HOW_WE_BUY_NAV_LABEL}
              </Link>
              <Link className="me-btn me-btn--ghost" href="/">
                East Bay home
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
                  City pages for houses we buy in {county} County.
                </p>
                <ul className="me-cities-hub__grid">
                  {cities.map((lander) => {
                    const media = MEDIA_BY_SLUG.get(lander.slug);
                    const name =
                      media?.name ??
                      lander.asideTitle.split("·")[0]?.trim() ??
                      lander.slug;
                    return (
                      <li key={lander.slug} className="me-cities-hub__item">
                        <a className="me-cities-hub__card" href={lander.path}>
                          {media ? (
                            <img
                              className="me-cities-hub__card-image"
                              src={media.image}
                              alt={media.alt}
                              width={640}
                              height={400}
                              loading="lazy"
                              decoding="async"
                              style={{ objectPosition: media.objectPosition }}
                            />
                          ) : null}
                          <span className="me-cities-hub__card-body">
                            <span className="me-cities-hub__card-name">{name}</span>
                            <span className="me-cities-hub__card-go">Open city page</span>
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
          className="me-cities-hub__situations me-section me-section--muted"
          aria-labelledby="situations-title"
        >
          <div className="me-shell">
            <h2 id="situations-title">Situations and tools</h2>
            <p className="me-section__intro vc-reading-measure">
              Same footprint. Open a situation page when the exit is inherited or
              as-is. Use the repair-or-as-is chooser when condition is the open
              question.
            </p>
            <ul className="me-city-list">
              {situations.map((lander) => (
                <li key={lander.slug}>
                  <a href={lander.path}>
                    {SITUATION_LABELS[lander.slug] ?? lander.h1}
                  </a>
                </li>
              ))}
              <li>
                <Link href={repairOrAsIsHref}>{REPAIR_OR_AS_IS_NAV_LABEL}</Link>
              </li>
            </ul>
          </div>
        </section>

        <section
          className="me-cities-hub__form me-section"
          aria-labelledby="cities-form-title"
        >
          <div className="me-shell">
            <h2 id="cities-form-title">Request a cash offer</h2>
            <p className="me-section__intro vc-reading-measure">
              An operator calls back the same day when we can. Alameda and Contra Costa
              only.
            </p>
            <LeadForm source="cities-hub" landingPath={CITIES_HUB_PATH} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
