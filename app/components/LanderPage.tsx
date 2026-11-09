import { LeadForm } from "@/app/components/LeadForm";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { getLanderBySlug, type LanderDefinition } from "@/lib/landers";

type LanderPageProps = {
  lander: LanderDefinition;
};

export function LanderPage({ lander }: LanderPageProps) {
  const related = lander.relatedSlugs
    .map((slug) => getLanderBySlug(slug))
    .filter((entry): entry is LanderDefinition => Boolean(entry));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="me-hero" aria-labelledby="lander-title">
          <div className="me-shell me-hero__grid">
            <div className="me-hero__copy">
              <h1 id="lander-title">{lander.h1}</h1>
              <p className="me-hero__lead vc-reading-measure">{lander.answerFirst}</p>
              <div className="me-hero__cta">
                <a className="me-btn me-btn--primary" href="#offer-form">
                  Get a cash offer
                </a>
                <a className="me-btn me-btn--ghost" href="#how-it-works">
                  How it works
                </a>
              </div>
            </div>
            <aside className="me-hero__aside" aria-label="Place">
              <strong>{lander.asideTitle}</strong>
              <p>{lander.asideBody}</p>
            </aside>
          </div>
        </section>

        <section className="me-section" id="how-it-works" aria-labelledby="how-title">
          <div className="me-shell">
            <h2 id="how-title">How it works</h2>
            <p className="me-section__intro vc-reading-measure">
              Same form as the rest of the East Bay site. One callback. A cash path when
              the house fits.
            </p>
            <ol className="me-steps">
              <li>
                <strong>Tell us about the house</strong>
                <p>Address, county, timeline, and why you want to sell.</p>
              </li>
              <li>
                <strong>Operator calls you</strong>
                <p>We review numbers and walk the path. No lead auction.</p>
              </li>
              <li>
                <strong>Close with Mena</strong>
                <p>After under contract, Mena owns the exit with buyers and funding.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="me-section" aria-labelledby="form-title">
          <div className="me-shell">
            <h2 id="form-title">Request a cash offer</h2>
            <p className="me-section__intro vc-reading-measure">
              We call back the same day when we can. Alameda and Contra Costa only.
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
            className="me-section me-section--muted"
            aria-labelledby="related-title"
          >
            <div className="me-shell">
              <h2 id="related-title">Nearby pages</h2>
              <p className="me-section__intro vc-reading-measure">
                Same buyer. Same form. Different city or situation.
              </p>
              <ul className="me-city-list">
                {related.map((entry) => (
                  <li key={entry.slug}>
                    <a href={entry.path}>{entry.h1}</a>
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
