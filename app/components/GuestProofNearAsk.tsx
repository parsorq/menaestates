"use client";

import { GUEST_PROOF } from "@/lib/guest-proof";

/** Identity + short who-buys line in the ask context column. */
export function GuestProofNearAsk() {
  const { principal, license, askBioLine } = GUEST_PROOF;

  return (
    <aside className="me-offer-proof me-offer-proof--identity" aria-label="Who buys">
      <div className="me-offer-proof__person">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="me-offer-proof__photo"
          src={principal.photoSrc}
          alt={principal.photoAlt}
          width={72}
          height={72}
        />
        <div className="me-offer-proof__person-copy">
          <p className="me-offer-proof__name">{principal.name}</p>
          <p className="me-offer-proof__meta">
            {principal.role}
            <span className="me-offer-proof__dot" aria-hidden="true">
              ·
            </span>
            {license.description} · {license.issuedBy} #{license.number}
          </p>
          <p className="me-offer-proof__bio vc-reading-measure">{askBioLine}</p>
        </div>
      </div>
    </aside>
  );
}
