import type { GuestProofReview } from "@/lib/guest-proof";

function reviewInitial(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return trimmed.charAt(0).toUpperCase();
}

type GuestReviewCommentProps = {
  review: GuestProofReview;
};

/** One attributed review as a comment row. No star chrome. */
export function GuestReviewComment({ review }: GuestReviewCommentProps) {
  const meta = [review.place, review.date].filter(Boolean).join(" · ");

  return (
    <blockquote className="me-comment">
      <div className="me-comment__avatar" aria-hidden="true">
        {reviewInitial(review.attribution)}
      </div>
      <div className="me-comment__main">
        <footer className="me-comment__byline">
          <cite className="me-comment__name">{review.attribution}</cite>
          {meta ? <span className="me-comment__meta">{meta}</span> : null}
        </footer>
        <p className="me-comment__quote vc-reading-measure">{review.quote}</p>
      </div>
    </blockquote>
  );
}
