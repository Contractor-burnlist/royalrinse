"use client";

import { useState } from "react";
import {
  bestTechFor,
  formatMoney,
  placeLabel,
  type Decision,
  type JobResult,
  type MissingField,
  type UpsellOffer,
} from "@/lib/ops/checkJob";
import { PRICE_LIMIT, type CityName, type TechId } from "@/lib/ops/rules";

const CARD = "rounded-2xl border border-ops-line bg-white p-5 shadow-sm sm:p-6";

const MISSING_TEXT: Record<MissingField, string> = {
  package: "Pick a package.",
  tech: "Pick a tech.",
  start: "Pick where the tech starts.",
  customer: "Pick the customer city.",
};

interface Props {
  result: JobResult;
  customerPlace: string;
  customerCity: CityName | null;
  upgradedFrom: string | null;
  onUpsellYes: () => void;
  onUpsellNo: () => void;
  onAddAddOn: (id: string) => void;
  onPickTech: (id: TechId) => void;
}

export function ResultPanel(props: Props) {
  const { result } = props;
  return (
    <div className="space-y-5">
      <p aria-live="polite" className="sr-only">
        {liveText(result)}
      </p>
      {result.status === "upsell" && (
        <UpsellCard offer={result.offer} onYes={props.onUpsellYes} onNo={props.onUpsellNo} />
      )}
      {result.status === "incomplete" && <IncompleteCard missing={result.missing} />}
      {result.status === "ask-tim" && <AskTimCard message={result.message} />}
      {(result.status === "book" || result.status === "dont-book") && (
        <DecisionCard d={result} upgradedFrom={props.upgradedFrom} onAddAddOn={props.onAddAddOn} />
      )}
      {props.customerCity && (
        <BestTechCard
          customerPlace={props.customerPlace}
          customerCity={props.customerCity}
          onPickTech={props.onPickTech}
        />
      )}
    </div>
  );
}

function liveText(result: JobResult): string {
  switch (result.status) {
    case "book":
      return `Book it. ${result.reason}`;
    case "dont-book":
      return `Do not book yet. ${result.reason}`;
    case "ask-tim":
      return result.message;
    case "upsell":
      return "Try once to upsell to Silver.";
    default:
      return "";
  }
}

/* ------------------------------------------------------------------------ */

function UpsellCard({ offer, onYes, onNo }: { offer: UpsellOffer; onYes: () => void; onNo: () => void }) {
  const diff = formatMoney(offer.difference);
  return (
    <section aria-labelledby="upsell-title" className={`${CARD} border-2 border-ops-primary`}>
      <p className="text-sm font-semibold uppercase tracking-wide text-ops-primary">Before you book</p>
      <h2 id="upsell-title" className="mt-1 text-3xl font-extrabold tracking-tight">
        Try once to upsell to Silver
      </h2>
      <p className="mt-2 text-ops-muted">
        Customer picked <strong className="text-ops-ink">{offer.from.name}</strong> ({formatMoney(offer.from.price ?? 0)}).
        Offer <strong className="text-ops-ink">{offer.to.name}</strong> ({formatMoney(offer.to.price ?? 0)}), only{" "}
        <strong className="text-ops-ink">{diff} more</strong>.
      </p>

      <h3 className="mt-5 font-semibold">Why Silver</h3>
      <ul className="mt-2 space-y-1.5">
        {[
          "Best value: our best bang-for-your-buck package",
          "Inside and outside cleaned in one visit",
          "Ceramic spray wax lasts up to 6 months",
        ].map((b) => (
          <li key={b} className="flex gap-2">
            <span aria-hidden className="mt-2 h-2 w-2 flex-none rounded-full bg-ops-primary" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <h3 className="mt-5 font-semibold">Say this</h3>
      <blockquote className="mt-2 rounded-xl bg-ops-primary-soft p-4 text-lg leading-relaxed">
        Before I book, can I tell you about our Silver package? It cleans the inside and the outside of your car, and
        the ceramic spray wax protects your paint for up to 6 months. It is our best value. It is only{" "}
        <strong>{diff}</strong> more. Would you like to upgrade to Silver?
      </blockquote>

      <h3 className="mt-4 font-semibold">If they say no</h3>
      <blockquote className="mt-2 rounded-xl bg-ops-surface p-4 text-lg">No problem! I will book your Bronze.</blockquote>

      <p className="mt-4 text-sm font-semibold text-ops-muted">Ask only once. Do not push.</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onYes}
          className="rounded-xl bg-ops-go px-4 py-3.5 text-base font-bold text-white hover:bg-green-800"
        >
          Customer said YES to Silver
        </button>
        <button
          type="button"
          onClick={onNo}
          className="rounded-xl border-2 border-ops-ink bg-white px-4 py-3.5 text-base font-bold text-ops-ink hover:bg-ops-surface"
        >
          Customer said NO, keep Bronze
        </button>
      </div>
    </section>
  );
}

function IncompleteCard({ missing }: { missing: MissingField[] }) {
  return (
    <section aria-labelledby="result-title" className={`${CARD} border-dashed`}>
      <h2 id="result-title" className="text-2xl font-bold">
        Fill in the form to see the answer
      </h2>
      <ul className="mt-3 space-y-1 text-ops-muted">
        {missing.map((m) => (
          <li key={m}>{MISSING_TEXT[m]}</li>
        ))}
      </ul>
    </section>
  );
}

function AskTimCard({ message }: { message: string }) {
  return (
    <section aria-labelledby="result-title" className="rounded-2xl border-2 border-ops-warn bg-ops-warn-soft p-6 text-ops-warn">
      <h2 id="result-title" className="text-6xl font-black leading-none tracking-tight">
        ASK TIM
      </h2>
      <p className="mt-4 text-xl font-semibold">{message}</p>
      <p className="mt-1 text-lg">Do not book this job yet.</p>
    </section>
  );
}

function DecisionCard({
  d,
  upgradedFrom,
  onAddAddOn,
}: {
  d: Decision;
  upgradedFrom: string | null;
  onAddAddOn: (id: string) => void;
}) {
  const book = d.status === "book";
  return (
    <section
      aria-labelledby="result-title"
      className={`rounded-2xl border-2 p-6 ${book ? "border-ops-go bg-ops-go-soft" : "border-ops-stop bg-ops-stop-soft"}`}
    >
      <h2
        id="result-title"
        className={`text-6xl font-black leading-none tracking-tight sm:text-7xl ${book ? "text-ops-go" : "text-ops-stop"}`}
      >
        {book ? "BOOK IT" : "DON'T BOOK YET"}
      </h2>

      <dl className="mt-5 space-y-1.5 text-xl text-ops-ink">
        <div>
          <dt className="sr-only">Drive time</dt>
          <dd>
            {d.startCity} to {placeLabel(d.customerPlace, d.customerCity)}: <strong>{d.drive} min</strong>
          </dd>
        </div>
        <div>
          <dt className="sr-only">Job total</dt>
          <dd>
            Job total: <strong>{formatMoney(d.total)}</strong>
            {upgradedFrom && <span className="ml-2 text-base text-ops-muted">(upgraded from {upgradedFrom})</span>}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Reason</dt>
          <dd className="font-semibold">{d.reason}</dd>
        </div>
      </dl>

      {d.notes.map((n) => (
        <p key={n} className="mt-4 rounded-xl border border-ops-warn bg-ops-warn-soft px-4 py-3 font-semibold text-ops-warn">
          {n}
        </p>
      ))}

      {!book && d.shortfall !== undefined && (
        <ol className="mt-6 space-y-4">
          <li className="rounded-xl bg-white p-4">
            <p className="text-lg font-bold">
              1. Add {formatMoney(d.shortfall)} more to reach {formatMoney(PRICE_LIMIT)}.
            </p>
            {d.gapAddOns && d.gapAddOns.length > 0 ? (
              <>
                <p className="mt-1 text-ops-muted">Any one of these add-ons is enough. Click to add it:</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {d.gapAddOns.map((a) => (
                    <li key={a.id}>
                      <button
                        type="button"
                        onClick={() => onAddAddOn(a.id)}
                        className="rounded-full border border-ops-line bg-ops-surface px-3.5 py-2 text-sm font-semibold hover:border-ops-primary hover:bg-ops-primary-soft"
                      >
                        + {a.name} {formatMoney(a.price)}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-1 text-ops-muted">No single add-on is enough. Try two add-ons together.</p>
            )}
          </li>
          <li className="rounded-xl bg-white p-4 text-lg font-bold">
            2. Or offer a day when a tech already has a job near this customer.
          </li>
          <li className="rounded-xl bg-white p-4 text-lg font-bold">
            3. Nothing works? Do not book. Save as a lead in Housecall Pro.
          </li>
        </ol>
      )}

      <JobNote text={d.jobNote} />
    </section>
  );
}

function JobNote({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Older browsers: copy through a hidden text box.
      const box = document.createElement("textarea");
      box.value = text;
      document.body.appendChild(box);
      box.select();
      document.execCommand("copy");
      box.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-6 rounded-xl border border-ops-line bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold">Job note</h3>
        <button
          type="button"
          onClick={copy}
          className="rounded-lg bg-ops-primary px-4 py-2 text-sm font-bold text-white hover:bg-ops-primary-dark"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mt-1 text-sm text-ops-muted">Paste this into the Housecall Pro job notes.</p>
      <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-ops-surface p-3 font-sans text-base">{text}</pre>
      <p aria-live="polite" className="sr-only">
        {copied ? "Job note copied." : ""}
      </p>
    </div>
  );
}

function BestTechCard({
  customerPlace,
  customerCity,
  onPickTech,
}: {
  customerPlace: string;
  customerCity: CityName;
  onPickTech: (id: TechId) => void;
}) {
  const { options, best } = bestTechFor(customerCity);
  return (
    <section aria-labelledby="best-tech-title" className={CARD}>
      <h2 id="best-tech-title" className="text-lg font-bold">
        Best tech for {placeLabel(customerPlace, customerCity)}
      </h2>
      <ul className="mt-3 space-y-2">
        {options.map((o) => {
          const isBest = best?.tech.id === o.tech.id;
          return (
            <li
              key={o.tech.id}
              className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-3 ${
                isBest ? "border-ops-primary bg-ops-primary-soft" : "border-ops-line"
              }`}
            >
              <span className="text-lg">
                <strong>{o.tech.name}</strong> from {o.homeCity}: <strong>{o.drive} min</strong>
                {isBest && (
                  <span className="ml-2 rounded-full bg-ops-primary px-2 py-0.5 text-xs font-bold uppercase text-white">
                    Closer
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={() => onPickTech(o.tech.id)}
                className="rounded-lg border border-ops-line bg-white px-3 py-1.5 text-sm font-semibold hover:border-ops-primary"
              >
                Pick {o.tech.name}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 font-semibold">
        {best ? `Recommended: ${best.tech.name}.` : "They are the same distance. Pick either one."}
      </p>
    </section>
  );
}
