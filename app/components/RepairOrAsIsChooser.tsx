"use client";

import Link from "next/link";
import { useState } from "react";
import { getHowWeBuyHref } from "@/lib/how-we-buy";
import { getLanderBySlug } from "@/lib/landers";

type Condition = "light" | "heavy" | null;
type FundRepairs = "yes" | "no" | "unsure" | null;
type Pace = "soon" | "flexible" | null;

type OutcomeId = "as-is" | "condition-in-offer" | "talk";

type OutcomeAction = {
  href: string;
  label: string;
  primary?: boolean;
};

type Outcome = {
  id: OutcomeId;
  title: string;
  body: string;
  actions: OutcomeAction[];
};

const AS_IS_HREF =
  getLanderBySlug("sell-house-as-is-east-bay")?.path ??
  "/guides/sell-house-as-is-east-bay";

const HOW_WE_BUY_HREF = getHowWeBuyHref();

const OUTCOMES: Record<OutcomeId, Outcome> = {
  "as-is": {
    id: "as-is",
    title: "As-is usually fits",
    body: "Heavy condition and a short timeline usually stay in an as-is cash sale. Name the repairs on the form. We do not require a remodel before close when the numbers work. Financed buyers often face lender repair conditions after an inspection; a cash buy with us does not use that mortgage process.",
    actions: [
      { href: "#offer-form", label: "Request a cash offer", primary: true },
      { href: AS_IS_HREF, label: "Sell a house as-is" },
    ],
  },
  "condition-in-offer": {
    id: "condition-in-offer",
    title: "Condition stays in the offer",
    body: "Light work or funded repairs can change the cash number. Request a cash offer either way. On the call we walk condition with you.",
    actions: [
      { href: "#offer-form", label: "Request a cash offer", primary: true },
      { href: HOW_WE_BUY_HREF, label: "How we buy" },
    ],
  },
  talk: {
    id: "talk",
    title: "Talk it through on the call",
    body: "When repair spend and timing are mixed, the next step is the call. Bring what you know about the house. Our core cities are Oakland, San Leandro, Hayward, Castro Valley, San Lorenzo, Newark, and Tracy. Outside them, we still buy when the house and the numbers fit.",
    actions: [
      { href: "#offer-form", label: "Request a cash offer", primary: true },
    ],
  },
};

function resolveOutcome(
  condition: Condition,
  fund: FundRepairs,
  pace: Pace,
): OutcomeId {
  if (condition === "heavy" && (fund === "no" || pace === "soon")) {
    return "as-is";
  }
  if (condition === "light" && fund === "yes" && pace === "flexible") {
    return "condition-in-offer";
  }
  if (condition === "heavy" && fund === "yes") {
    return "talk";
  }
  if (condition === "light" && (fund === "no" || pace === "soon")) {
    return "as-is";
  }
  if (fund === "unsure" || condition === null || fund === null || pace === null) {
    return "talk";
  }
  return "talk";
}

/**
 * Short decision aid before the cash-offer form. No login. No address.
 * No dollar outputs. No AVM language.
 */
export function RepairOrAsIsChooser() {
  const [condition, setCondition] = useState<Condition>(null);
  const [fund, setFund] = useState<FundRepairs>(null);
  const [pace, setPace] = useState<Pace>(null);

  const ready = condition !== null && fund !== null && pace !== null;
  const outcome = ready
    ? OUTCOMES[resolveOutcome(condition, fund, pace)]
    : null;

  function reset() {
    setCondition(null);
    setFund(null);
    setPace(null);
  }

  return (
    <div className="me-tool-chooser">
      <ol className="me-tool-chooser__steps">
        <li className="me-tool-chooser__step">
          <h3 className="me-tool-chooser__prompt">How heavy is the condition?</h3>
          <div className="me-tool-chooser__options" role="group" aria-label="House condition">
            <button
              type="button"
              className={
                condition === "light"
                  ? "me-tool-chooser__option me-tool-chooser__option--active"
                  : "me-tool-chooser__option"
              }
              aria-pressed={condition === "light"}
              onClick={() => setCondition("light")}
            >
              Light wear or a short list
            </button>
            <button
              type="button"
              className={
                condition === "heavy"
                  ? "me-tool-chooser__option me-tool-chooser__option--active"
                  : "me-tool-chooser__option"
              }
              aria-pressed={condition === "heavy"}
              onClick={() => setCondition("heavy")}
            >
              Major systems, roof, or long deferred work
            </button>
          </div>
        </li>

        <li className="me-tool-chooser__step">
          <h3 className="me-tool-chooser__prompt">
            Can you fund repairs before a sale?
          </h3>
          <div
            className="me-tool-chooser__options"
            role="group"
            aria-label="Fund repairs"
          >
            <button
              type="button"
              className={
                fund === "yes"
                  ? "me-tool-chooser__option me-tool-chooser__option--active"
                  : "me-tool-chooser__option"
              }
              aria-pressed={fund === "yes"}
              onClick={() => setFund("yes")}
            >
              Yes, if it makes sense
            </button>
            <button
              type="button"
              className={
                fund === "no"
                  ? "me-tool-chooser__option me-tool-chooser__option--active"
                  : "me-tool-chooser__option"
              }
              aria-pressed={fund === "no"}
              onClick={() => setFund("no")}
            >
              No
            </button>
            <button
              type="button"
              className={
                fund === "unsure"
                  ? "me-tool-chooser__option me-tool-chooser__option--active"
                  : "me-tool-chooser__option"
              }
              aria-pressed={fund === "unsure"}
              onClick={() => setFund("unsure")}
            >
              Not sure yet
            </button>
          </div>
        </li>

        <li className="me-tool-chooser__step">
          <h3 className="me-tool-chooser__prompt">What pace do you need?</h3>
          <div className="me-tool-chooser__options" role="group" aria-label="Sale pace">
            <button
              type="button"
              className={
                pace === "soon"
                  ? "me-tool-chooser__option me-tool-chooser__option--active"
                  : "me-tool-chooser__option"
              }
              aria-pressed={pace === "soon"}
              onClick={() => setPace("soon")}
            >
              Need to move soon
            </button>
            <button
              type="button"
              className={
                pace === "flexible"
                  ? "me-tool-chooser__option me-tool-chooser__option--active"
                  : "me-tool-chooser__option"
              }
              aria-pressed={pace === "flexible"}
              onClick={() => setPace("flexible")}
            >
              Timing is flexible
            </button>
          </div>
        </li>
      </ol>

      {outcome ? (
        <div className="me-tool-chooser__outcome" aria-live="polite">
          <h3 className="me-tool-chooser__outcome-title">{outcome.title}</h3>
          <p className="me-tool-chooser__outcome-body vc-reading-measure">
            {outcome.body}
          </p>
          <div className="me-tool-chooser__outcome-actions">
            {outcome.actions.map((action) =>
              action.href.startsWith("#") ? (
                <a
                  key={action.href + action.label}
                  className={
                    action.primary ? "me-btn me-btn--primary" : "me-btn me-btn--ghost"
                  }
                  href={action.href}
                >
                  {action.label}
                </a>
              ) : (
                <Link
                  key={action.href + action.label}
                  className={
                    action.primary ? "me-btn me-btn--primary" : "me-btn me-btn--ghost"
                  }
                  href={action.href}
                >
                  {action.label}
                </Link>
              ),
            )}
            <button
              type="button"
              className="me-tool-chooser__reset"
              onClick={reset}
            >
              Start over
            </button>
          </div>
        </div>
      ) : (
        <p className="me-tool-chooser__hint vc-reading-measure">
          Answer all three. Then we say whether as-is, condition in the offer,
          or talking it through on the call fits.
        </p>
      )}
    </div>
  );
}
