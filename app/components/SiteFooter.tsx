import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="me-site-footer">
      <div className="me-shell me-site-footer__inner">
        <strong>Mena Estates</strong>
        <p className="vc-reading-measure">
          Cash home buyer for Alameda and Contra Costa. We buy as principal. An
          operator handles seller calls. We own the exit after under contract.
        </p>
        <p>
          <Link href="/#offer-form">Get a cash offer</Link>
        </p>
      </div>
    </footer>
  );
}
