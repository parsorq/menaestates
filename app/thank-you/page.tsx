import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "Request received",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <SiteHeader />
      <main className="me-section me-thank-you">
        <div className="me-shell-narrow">
          <h1 className="me-thank-you__title">We have your request</h1>
          <p className="me-thank-you__lead vc-reading-measure">
            One of us calls Monday to Friday, 9:00 to 17:00 Pacific Time. Same
            day when your request lands in that window. After hours, the next
            business day. On that call we walk through the numbers, the house,
            and your timing, and we answer your questions before anything moves
            forward.
          </p>
          <p className="me-thank-you__follow vc-reading-measure">
            If we miss each other, we call again in the next open window. Bring
            what you already know about the house; we will take it from there.
          </p>
          <Link className="me-btn me-btn--ghost" href="/">
            Back to home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
