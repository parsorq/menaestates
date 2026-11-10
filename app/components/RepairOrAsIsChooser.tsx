"use client";

import Link from "next/link";
import { useState } from "react";

type Condition = "light" | "heavy" | null;
type FundRepairs = "yes" | "no" | "unsure" | null;
type Pace = "soon" | "flexible" | null;

type OutcomeId = "as-is" | "condition-in-offer" | "talk";

type Outcome = {
  id: OutcomeId;
  title: string;
  body: string;
};

const OUTCOMES: Record<OutcomeId, Outcome> = {
  "as-is": {
    id: "as-is",
    title: "Lean as-is",
    body: "Heavy condition and a short timeline usually stay in an as-is cash exit. Name the repairs on the form. We do not require a remodel before close when the numbers work.",
  },
  "condition-in-offer": {
    id: "condition-in-offer",
    title: "Condition stays in the offer",
    body: "Light work or funded repairs can change the cash number. The door is the same form. We walk condition on the operator call. We do not appraise the house on this page.",
  },
  talk: {
    id: "talk",
    title: "Talk it through on the call",
    body: "When repair spend and timing are mixed, the operator call is the next step. Bring what you know about the house. We stay in Alameda and Contra Costa only.",
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
          <div className="me-tool-chooser__options" role="group" aria-label="Condition load">
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
            <a className="me-btn me-btn--primary" href="#offer-form">
              Request a cash offer
            </a>
            <Link
              className="me-btn me-btn--ghost"
              href="/sell-house-as-is-east-bay"
            >
              Sell house as-is East Bay
            </Link>
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
          Answer all three. Then we point you at as-is, condition in the offer,
          or the operator call. No price on this page.
        </p>
      )}
    </div>
  );
}
