import { JsonLd } from "@/app/components/JsonLd";
import { LeadForm } from "@/app/components/LeadForm";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import type { LanderDefinition } from "@/lib/landers";
import { faqPageJsonLd } from "@/lib/schema";
import { absoluteSiteUrl } from "@/lib/site";
import {
  requireSituationLander,
  situationRelatedLinks,
} from "@/lib/situation-landers";

type SituationLanderPageProps = {
  lander: LanderDefinition;
};

export function SituationLanderPage({ lander }: SituationLanderPageProps) {
  const { situation } = requireSituationLander(lander);
  const related = situationRelatedLinks(lander);

  return (
    <>
      <JsonLd
        data={faqPageJsonLd(situation.faqs, absoluteSiteUrl(lander.path))}
      />
      <SiteHeader />
      <main className="me-situation-lander">
        <section
          className="me-hero me-situation-lander__hero"
          aria-labelledby="situation-title"
        >
          <div className="me-shell me-hero__grid">
            <div className="me-hero__copy">
              <h1 id="situation-title">{lander.h1}</h1>
              <p className="me-hero__lead vc-reading-measure">
                {lander.answerFirst}
              </p>
              <div className="me-hero__cta">
                <a className="me-btn me-btn--primary" href="#offer-form">
                  Get a cash offer
                </a>
                <a className="me-btn me-btn--ghost" href="#what-we-need">
                  What we need
                </a>
              </div>
            </div>
            <aside className="me-hero__aside" aria-label="Situation">
              <strong>{lander.asideTitle}</strong>
              <p>{lander.asideBody}</p>
            </aside>
          </div>
        </section>

        <section
          className="me-section me-situation-lander__need"
          id="what-we-need"
          aria-labelledby="need-title"
        >
          <div className="me-shell">
            <h2 id="need-title">What we need from you</h2>
            <p className="me-section__intro vc-reading-measure">
              Facts for the callback. Not legal advice. Not a remodel plan.
            </p>
            <ul className="me-situation-lander__need-list">
              {situation.needFromSeller.map((item) => (
                <li key={item.title} className="me-situation-lander__need-item">
                  <h3 className="me-situation-lander__need-heading">
                    {item.title}
                  </h3>
                  <p className="vc-reading-measure">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="me-section me-section--muted me-situation-lander__faqs"
          aria-labelledby="faq-title"
        >
          <div className="me-shell">
            <h2 id="faq-title">Common questions</h2>
            <p className="me-section__intro vc-reading-measure">
              Situation-specific answers. City pages cover named cities. Home
              covers the East Bay thesis.
            </p>
            <dl className="me-situation-lander__faq-list">
              {situation.faqs.map((faq) => (
                <div key={faq.question} className="me-situation-lander__faq">
                  <dt>{faq.question}</dt>
                  <dd className="vc-reading-measure">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          className="me-section me-situation-lander__form"
          aria-labelledby="form-title"
        >
          <div className="me-shell">
            <h2 id="form-title">Request a cash offer</h2>
            <p className="me-section__intro vc-reading-measure">
              We call back the same day when we can. Alameda and Contra Costa
              only. Motivation starts on this situation.
            </p>
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
            className="me-section me-section--muted me-situation-lander__related"
            aria-labelledby="related-title"
          >
            <div className="me-shell">
              <h2 id="related-title">Related doors</h2>
              <p className="me-section__intro vc-reading-measure">
                Cities catalog, how we buy, two city leaves, and the other
                situation. Same form on every page.
              </p>
              <ul className="me-situation-lander__related-list">
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
