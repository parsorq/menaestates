import { GuideSources } from "@/app/components/GuideSources";
import { JsonLd } from "@/app/components/JsonLd";
import { LeadForm } from "@/app/components/LeadForm";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import type { LanderDefinition } from "@/lib/landers";
import {
  guideRelatedLinks,
  requireGuideLander,
} from "@/lib/guide-landers";
import { faqPageJsonLd } from "@/lib/schema";
import { absoluteSiteUrl } from "@/lib/site";

type GuidePageProps = {
  lander: LanderDefinition;
};

/** Seller-help guide shell: process, need, FAQs, sources, form, related. */
export function GuidePage({ lander }: GuidePageProps) {
  const { guide } = requireGuideLander(lander);
  const related = guideRelatedLinks(lander);

  return (
    <>
      <JsonLd
        data={faqPageJsonLd(guide.faqs, absoluteSiteUrl(lander.path))}
      />
      <SiteHeader />
      <main className="me-guide">
        <section
          className="me-hero me-guide__hero"
          aria-labelledby="guide-title"
        >
          <div className="me-shell me-hero__grid">
            <div className="me-hero__copy">
              <h1 id="guide-title">{lander.h1}</h1>
              <p className="me-hero__lead vc-reading-measure">
                {lander.answerFirst}
              </p>
              <div className="me-hero__cta">
                <a className="me-btn me-btn--primary" href="#offer-form">
                  Get a cash offer
                </a>
                <a className="me-btn me-btn--ghost" href="#how-this-works">
                  How this works
                </a>
              </div>
            </div>
            <aside className="me-hero__aside" aria-label="About this sale">
              <strong>{lander.asideTitle}</strong>
              <p>{lander.asideBody}</p>
            </aside>
          </div>
        </section>

        <section
          className="me-section me-guide__process"
          id="how-this-works"
          aria-labelledby="process-title"
        >
          <div className="me-shell">
            <h2 id="process-title">How this works</h2>
            <p className="me-section__intro vc-reading-measure">
              What happens on a cash buy with us. This is not legal advice, and
              it is not a remodel plan for your house.
            </p>
            <ol className="me-guide__process-list">
              {guide.processSteps.map((step) => (
                <li key={step.title} className="me-guide__process-item">
                  <h3 className="me-guide__process-heading">{step.title}</h3>
                  <p className="vc-reading-measure">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {guide.doNotDo ? (
          <section
            className="me-section me-section--muted me-guide__do-not"
            aria-labelledby="do-not-title"
          >
            <div className="me-shell">
              <h2 id="do-not-title">{guide.doNotDo.heading}</h2>
              <ul className="me-guide__do-not-list vc-reading-measure">
                {guide.doNotDo.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section
          className="me-section me-guide__need"
          id="what-we-need"
          aria-labelledby="need-title"
        >
          <div className="me-shell">
            <h2 id="need-title">What we need from you</h2>
            <p className="me-section__intro vc-reading-measure">
              Tell us what you already know before the call. Clear facts keep
              the offer honest.
            </p>
            <ul className="me-guide__need-list">
              {guide.needFromSeller.map((item) => (
                <li key={item.title} className="me-guide__need-item">
                  <h3 className="me-guide__need-heading">{item.title}</h3>
                  <p className="vc-reading-measure">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="me-section me-guide__faqs"
          aria-labelledby="faq-title"
        >
          <div className="me-shell">
            <h2 id="faq-title">Common questions</h2>
            <p className="me-section__intro vc-reading-measure">
              Ask about title, timing, condition, and who still lives in the
              house. We leave room for your questions on the call.
            </p>
            <dl className="me-guide__faq-list">
              {guide.faqs.map((faq) => (
                <div key={faq.question} className="me-guide__faq">
                  <dt>{faq.question}</dt>
                  <dd className="vc-reading-measure">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <GuideSources sources={guide.sources} />

        <section
          className="me-section me-guide__form"
          aria-labelledby="form-title"
        >
          <div className="me-shell">
            <h2 id="form-title">Request a cash offer</h2>
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
            className="me-section me-section--muted me-guide__related"
            aria-labelledby="related-title"
          >
            <div className="me-shell">
              <h2 id="related-title">Related pages</h2>
              <p className="me-section__intro vc-reading-measure">
                Cities we&apos;ve bought in, how we buy for cash, and Help before
                the offer.
              </p>
              <ul className="me-guide__related-list">
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
