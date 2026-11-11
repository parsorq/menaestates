import type { Metadata } from "next";
import Link from "next/link";
import { GuestReviewComment } from "@/app/components/GuestReviewComment";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { aboutRelatedLinks } from "@/lib/about";
import {
  CITIES_HUB_NAV_LABEL,
  getCitiesHubHref,
} from "@/lib/cities-hub";
import { GUEST_PROOF } from "@/lib/guest-proof";
import {
  GET_A_CASH_OFFER_NAV_LABEL,
  getGetACashOfferHref,
} from "@/lib/get-a-cash-offer";
import { getHowWeBuyHref } from "@/lib/how-we-buy";
import { buildPageMetadata, getPageSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("about");

const aboutSeo = getPageSeo("about");

export default function AboutPage() {
  const {
    principal,
    license,
    realtorCareer,
    reviewsAbout,
    nap,
    buyCitiesLabel,
  } = GUEST_PROOF;
  const citiesHubHref = getCitiesHubHref();
  const howWeBuyHref = getHowWeBuyHref();
  const offerHref = getGetACashOfferHref();
  const related = aboutRelatedLinks();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="me-about__hero" aria-labelledby="about-title">
          <div className="me-shell me-about">
            <div className="me-about__intro">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="me-about__photo"
                src={principal.photoSrc}
                alt={principal.photoAlt}
                width={200}
                height={200}
              />
              <div className="me-about__intro-copy">
                <h1 id="about-title">{aboutSeo.h1}</h1>
                <p className="me-about__lead vc-reading-measure">
                  {aboutSeo.answerFirst}
                </p>
              </div>
            </div>
            <div className="me-about__cta">
              <Link className="me-btn me-btn--primary" href={offerHref}>
                {GET_A_CASH_OFFER_NAV_LABEL}
              </Link>
              <a className="me-btn me-btn--ghost" href={`tel:${nap.phoneTel}`}>
                Call {nap.phoneDisplay}
              </a>
              <Link className="me-btn me-btn--ghost" href={howWeBuyHref}>
                How we buy
              </Link>
            </div>
          </div>
        </section>

        <section className="me-section" aria-labelledby="about-bio-title">
          <div className="me-shell me-about">
            <h2 id="about-bio-title" className="sr-only">
              How I work on a cash sale
            </h2>
            <p className="me-about__body vc-reading-measure">{principal.bio}</p>
            <p className="me-about__meta vc-reading-measure">
              Cities we&apos;ve bought in:{" "}
              <Link href={citiesHubHref}>{buyCitiesLabel}</Link>.
            </p>
            <p className="me-about__meta vc-reading-measure">
              {license.description} · {license.issuedBy} license #
              {license.number}.
            </p>
          </div>
        </section>

        <section
          className="me-section me-section--muted"
          aria-labelledby="about-contact-title"
        >
          <div className="me-shell me-about">
            <h2 id="about-contact-title">Contact</h2>
            <p className="me-section__intro vc-reading-measure">
              Call or email when you are ready. I answer questions before
              anything moves forward.
            </p>
            <ul className="me-about__nap">
              <li>
                <span className="me-about__nap-label">Phone</span>
                <a href={`tel:${nap.phoneTel}`}>{nap.phoneDisplay}</a>
              </li>
              <li>
                <span className="me-about__nap-label">Email</span>
                <a href={`mailto:${nap.email}`}>{nap.email}</a>
              </li>
              <li>
                <span className="me-about__nap-label">Office</span>
                <span>
                  {nap.street}
                  <br />
                  {nap.cityStateZip}
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="me-section" aria-labelledby="about-career-title">
          <div className="me-shell me-about">
            <h2 id="about-career-title">Realtor career (Zillow)</h2>
            <p className="me-section__intro vc-reading-measure">
              {realtorCareer.notCashCountsLine} The reviews below are that career
              record, labeled separately from this cash buy.
            </p>
            <ul className="me-about__stats">
              <li>
                <span className="me-about__stat-value">
                  {realtorCareer.totalSalesDisplay}
                </span>
                <span className="me-about__stat-label">
                  total sales ({realtorCareer.asOf})
                </span>
              </li>
              <li>
                <span className="me-about__stat-value">
                  {realtorCareer.salesLast12MonthsDisplay}
                </span>
                <span className="me-about__stat-label">
                  sales in the last 12 months
                </span>
              </li>
              <li>
                <span className="me-about__stat-value">
                  {realtorCareer.averagePriceDisplay}
                </span>
                <span className="me-about__stat-label">
                  average · range {realtorCareer.priceRangeDisplay}
                </span>
              </li>
            </ul>
            <p className="me-about__meta vc-reading-measure">
              <a
                href={realtorCareer.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Zillow profile
              </a>
            </p>

            <ul className="me-comment-list">
              {reviewsAbout.map((review) => (
                <li key={`${review.attribution}-${review.date}`}>
                  <GuestReviewComment review={review} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="me-section me-section--muted"
          aria-labelledby="about-related-title"
        >
          <div className="me-shell me-about">
            <h2 id="about-related-title">Related pages</h2>
            <p className="me-section__intro vc-reading-measure">
              How we buy for cash, cities we&apos;ve bought in, help before the
              offer, and a short tool if the house needs work.
            </p>
            <ul className="me-city-list" aria-labelledby="about-related-title">
              {related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>

            <div className="me-about__cta">
              <Link className="me-btn me-btn--primary" href={offerHref}>
                {GET_A_CASH_OFFER_NAV_LABEL}
              </Link>
              <Link className="me-btn me-btn--ghost" href={howWeBuyHref}>
                How we buy
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
