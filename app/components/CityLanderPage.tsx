import { JsonLd } from "@/app/components/JsonLd";
import { LeadForm } from "@/app/components/LeadForm";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import {
  cityRelatedLinks,
  requireCityLander,
} from "@/lib/city-landers";
import type { LanderDefinition } from "@/lib/landers";
import { faqPageJsonLd } from "@/lib/schema";
import { absoluteSiteUrl } from "@/lib/site";

type CityLanderPageProps = {
  lander: LanderDefinition;
};

/** City page: local answer, buy area, questions, form. */
export function CityLanderPage({ lander }: CityLanderPageProps) {
  const { city } = requireCityLander(lander);
  const related = cityRelatedLinks(lander);
  const faqItems = city.objections.map((item) => ({
    question: item.title,
    answer: item.body,
  }));

  return (
    <>
      <JsonLd
        data={faqPageJsonLd(faqItems, absoluteSiteUrl(lander.path))}
      />
      <SiteHeader />
      <main className="me-city-lander">
        <section
          className="me-city-lander__answer"
          aria-labelledby="city-lander-title"
        >
          <div className="me-shell me-city-lander__answer-grid">
            <div className="me-city-lander__answer-copy">
              <p className="me-city-lander__place">
                {city.cityName} · {city.countyLabel}
              </p>
              <h1 id="city-lander-title">{lander.h1}</h1>
              <p className="me-city-lander__lead vc-reading-measure">
                {lander.answerFirst}
              </p>
              <div className="me-city-lander__cta">
                <a className="me-btn me-btn--primary" href="#offer-form">
                  Get a cash offer
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="me-city-lander__footprint"
          aria-labelledby="city-footprint-title"
        >
          <div className="me-shell">
            <aside className="me-city-lander__proof" aria-label="Where we've bought here">
              <h2 id="city-footprint-title">{lander.asideTitle}</h2>
              <p className="vc-reading-measure">{city.footprintBuys}</p>
              <p className="me-city-lander__nearby vc-reading-measure">
                {city.nearbyCities}
              </p>
            </aside>
          </div>
        </section>

        <section
          className="me-city-lander__objections"
          aria-labelledby="city-objections-title"
        >
          <div className="me-shell">
            <h2 id="city-objections-title">
              Common questions in {city.cityName}
            </h2>
            <p className="me-city-lander__intro vc-reading-measure">
              Ask about title, taxes, repairs, and timing for a house here. On
              the call we walk the numbers and set a close window from those
              facts. We do not invent a day count first.
            </p>
            <dl className="me-city-lander__faq">
              {city.objections.map((item) => (
                <div key={item.title} className="me-city-lander__faq-item">
                  <dt>{item.title}</dt>
                  <dd className="vc-reading-measure">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          className="me-city-lander__form"
          aria-labelledby="city-form-title"
        >
          <div className="me-shell">
            <h2 id="city-form-title">Request a cash offer</h2>
            <LeadForm
              source={lander.source}
              landingPath={lander.path}
              defaultCounty={lander.defaultCounty}
              defaultMotivation={lander.defaultMotivation}
            />
          </div>
        </section>

        {related.length > 0 ? (
          <section
            className="me-city-lander__related"
            aria-labelledby="city-related-title"
          >
            <div className="me-shell">
              <h2 id="city-related-title">Related pages</h2>
              <p className="me-city-lander__intro vc-reading-measure">
                Other places we buy nearby, how we buy for cash, and inherited
                or as-is sales.
              </p>
              <ul className="me-city-lander__links">
                {related.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
