import type { GuideSource } from "@/lib/guide-landers";

type GuideSourcesProps = {
  sources: GuideSource[];
  headingId?: string;
  /** Overrides the default Sources intro. Guest voice only. */
  intro?: string;
};

const DEFAULT_SOURCES_INTRO =
  "Official pages that back the steps above. They are not a substitute for your own counsel, and they are not legal advice from us.";

/** Official sources list for guide and tool pages. Guest voice only. */
export function GuideSources({
  sources,
  headingId = "sources-title",
  intro = DEFAULT_SOURCES_INTRO,
}: GuideSourcesProps) {
  if (sources.length === 0) return null;

  return (
    <section
      className="me-section me-section--muted me-guide-sources"
      aria-labelledby={headingId}
    >
      <div className="me-shell">
        <h2 id={headingId}>Sources</h2>
        <p className="me-section__intro vc-reading-measure">{intro}</p>
        <ul className="me-guide-sources__list">
          {sources.map((source) => (
            <li key={source.href} className="me-guide-sources__item">
              <a
                href={source.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {source.label}
              </a>
              {source.note ? (
                <p className="me-guide-sources__note vc-reading-measure">
                  {source.note}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
