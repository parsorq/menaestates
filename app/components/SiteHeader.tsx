import Link from "next/link";

const phone = process.env.NEXT_PUBLIC_OPS_PHONE?.trim() || "";

export function SiteHeader() {
  return (
    <header className="me-site-header">
      <div className="me-shell me-site-header__inner">
        <Link className="me-brand" href="/">
          Mena Estates
        </Link>
        <div className="me-header-actions">
          {phone ? (
            <a className="me-btn me-btn--ghost" href={`tel:${phone.replace(/\D/g, "")}`}>
              Call {phone}
            </a>
          ) : null}
          <Link className="me-btn me-btn--primary" href="/#offer-form">
            Get a cash offer
          </Link>
        </div>
      </div>
    </header>
  );
}
