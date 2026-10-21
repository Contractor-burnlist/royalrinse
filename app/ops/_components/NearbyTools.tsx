"use client";

import { useMemo, useState, type ReactNode } from "react";
import { checkSlot, nearbyCities, placeOptions, resolvePlace, type RulesData } from "@/lib/ops/engine";
import { copyText } from "./copyText";
import { FollowupTimer } from "./FollowupTimer";
import { WithOpsData } from "./OpsData";
import { PlaceCombobox } from "./PlaceCombobox";

const CARD = "rounded-2xl border border-ops-line bg-white p-5 shadow-sm sm:p-6";
const H2 = "text-xl font-bold";
const LABEL = "block font-semibold";
const FIELD =
  "mt-2 w-full rounded-xl border border-ops-line bg-white px-4 py-3 text-base shadow-sm focus-visible:border-ops-primary";

/* ------------------------------------------------------------------------ */
/* Dates and times (California time)                                        */
/* ------------------------------------------------------------------------ */

/** Today in Pacific Time as YYYY-MM-DD, whatever the VA's own time zone. */
function pacificToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

/** "2026-10-23" -> "Friday, Oct 23" */
function dayLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

/** Minutes after midnight -> "10am", "10:30am", "12pm" */
function timeLabel(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h < 12 ? "am" : "pm"}`;
}

/** 7am to 8pm in half hours. */
const TIMES = Array.from({ length: 27 }, (_, i) => 7 * 60 + i * 30);

/* ------------------------------------------------------------------------ */
/* Follow-up slots                                                          */
/* ------------------------------------------------------------------------ */

interface Slot {
  date: string;
  start: string;
  end: string;
  techId: string;
  jobPlace: string;
}

const EMPTY_SLOT: Slot = { date: "", start: "", end: "", techId: "", jobPlace: "" };

interface SlotState {
  complete: boolean;
  /** Something typed, but not finished. */
  partial: boolean;
  warnings: string[];
  drive: number | null;
}

export function NearbyTools({ followupSop }: { followupSop: ReactNode }) {
  return <WithOpsData>{(data) => <NearbyToolsForm data={data} followupSop={followupSop} />}</WithOpsData>;
}

function NearbyToolsForm({ data, followupSop }: { data: RulesData; followupSop: ReactNode }) {
  const places = useMemo(() => placeOptions(data), [data]);
  const today = useMemo(() => pacificToday(), []);
  const lastDay = addDays(today, data.followupLookaheadDays);

  // Section A
  const [finderPlace, setFinderPlace] = useState("");
  const finderCity = resolvePlace(data, finderPlace);
  const nearby = finderPlace ? nearbyCities(data, finderPlace) : [];

  // Section C
  const [customerName, setCustomerName] = useState("");
  const [vaName, setVaName] = useState("");
  const [customerPlace, setCustomerPlace] = useState("");
  const [slots, setSlots] = useState<Slot[]>([EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT]);
  const [copied, setCopied] = useState(false);

  function chooseFinderPlace(place: string) {
    setFinderPlace(place);
    setCustomerPlace(place); // prefill the builder
  }

  function updateSlot(i: number, patch: Partial<Slot>) {
    setSlots((all) => all.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  }

  function slotState(slot: Slot): SlotState {
    const filled = [slot.date, slot.start, slot.end, slot.techId, slot.jobPlace].filter(Boolean).length;
    const complete = filled === 5;
    const warnings: string[] = [];
    const check = slot.jobPlace && customerPlace ? checkSlot(data, slot.jobPlace, customerPlace) : null;
    if (check?.status === "too-far") {
      warnings.push(`This job is more than ${data.driveLimitMin} minutes from your nearby job. Pick a different time.`);
    }
    if (slot.date && (slot.date < today || slot.date > lastDay)) {
      warnings.push(`Pick a day in the next ${data.followupLookaheadDays} days.`);
    }
    if (slot.start && slot.end && Number(slot.end) <= Number(slot.start)) {
      warnings.push("The end time must be after the start time.");
    }
    return {
      complete,
      partial: filled > 0 && !complete,
      warnings,
      drive: check && check.status !== "incomplete" ? check.drive : null,
    };
  }

  const states = slots.map(slotState);
  const validSlots = slots.filter((_, i) => states[i].complete && states[i].warnings.length === 0);
  const anyWarning = states.some((s) => s.warnings.length > 0);
  // Times 1 and 2 are required; time 3 must be finished or left empty.
  const unfinished = states.some((s, i) => (i < 2 ? !s.complete : s.partial));

  const problems = [
    !customerName.trim() && "add the customer's first name",
    !vaName.trim() && "add your first name",
    !resolvePlace(data, customerPlace) && "pick the customer city",
    anyWarning && "fix the red warnings",
    (unfinished || validSlots.length < 2) && "fill in at least 2 times (finish or clear time 3)",
  ].filter(Boolean) as string[];
  const canCopy = problems.length === 0;

  const lines = slots
    .filter((_, i) => states[i].complete)
    .map((s) => `- ${dayLabel(s.date)}, ${timeLabel(Number(s.start))} to ${timeLabel(Number(s.end))}`);
  const text =
    `Hi ${customerName.trim() || "[first name]"}, this is ${vaName.trim() || "[your name]"} from Royal Rinse ` +
    `Mobile Detailing. Thank you for calling us today! We will be working near you soon. If you book one of ` +
    `these times, we will take ${data.followupDiscountPercent}% off your detail:\n` +
    (lines.length ? lines.join("\n") : "- [day, date, time]\n- [day, date, time]") +
    `\nJust reply with the time that works for you.`;

  async function copy() {
    if (!canCopy) return;
    await copyText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      {/* SECTION A */}
      <section className={CARD} aria-labelledby="finder-title">
        <h2 id="finder-title" className={H2}>
          A. Find nearby jobs
        </h2>
        <div className="mt-4 max-w-xl">
          <PlaceCombobox
            label="Customer city"
            hint="We list the cities within the drive limit, closest first."
            value={finderPlace}
            onChange={chooseFinderPlace}
            places={places}
          />
        </div>

        {finderCity && (
          <div className="mt-5">
            <p className="font-semibold">Best: a job in {finderCity} itself (0 min). Also close:</p>
            {nearby.length > 0 ? (
              <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {nearby.map((n) => (
                  <li
                    key={n.city}
                    className="flex items-center justify-between rounded-xl border border-ops-line bg-ops-surface px-4 py-3 text-lg"
                  >
                    <span className="font-semibold">{n.city}</span>
                    <span>{n.drive} min</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-2 text-ops-muted">No other city is within {data.driveLimitMin} minutes. Ask Tim.</p>
            )}
            <p className="mt-4 rounded-xl bg-ops-primary-soft p-4 text-lg">
              Now open Housecall Pro. Look at the next {data.followupLookaheadDays} days. Find jobs in these cities.
              Offer times right before or right after those jobs.
            </p>
          </div>
        )}
      </section>

      {/* SECTION B (server-rendered SOP text) */}
      {followupSop}

      {/* SECTION C */}
      <section className={CARD} aria-labelledby="builder-title">
        <h2 id="builder-title" className={H2}>
          C. Follow-up text builder
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="fu-customer" className={LABEL}>
              Customer first name
            </label>
            <input
              id="fu-customer"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              autoComplete="off"
              className={FIELD}
            />
          </div>
          <PlaceCombobox label="Customer city" value={customerPlace} onChange={setCustomerPlace} places={places} />
          <div>
            <label htmlFor="fu-va" className={LABEL}>
              Your first name
            </label>
            <input
              id="fu-va"
              value={vaName}
              onChange={(e) => setVaName(e.target.value)}
              autoComplete="given-name"
              className={FIELD}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {slots.map((slot, i) => {
            const st = states[i];
            const id = `fu-slot-${i}`;
            return (
              <fieldset
                key={i}
                className={`rounded-xl border-2 p-4 ${
                  st.warnings.length ? "border-ops-stop bg-ops-stop-soft" : "border-ops-line"
                }`}
              >
                <legend className="px-1 font-bold">
                  Time {i + 1}
                  {i === 2 && <span className="font-normal text-ops-muted"> (optional)</span>}
                </legend>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  <div>
                    <label htmlFor={`${id}-date`} className={LABEL}>
                      Day
                    </label>
                    <input
                      id={`${id}-date`}
                      type="date"
                      min={today}
                      max={lastDay}
                      value={slot.date}
                      onChange={(e) => updateSlot(i, { date: e.target.value })}
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${id}-start`} className={LABEL}>
                      From
                    </label>
                    <select
                      id={`${id}-start`}
                      value={slot.start}
                      onChange={(e) => updateSlot(i, { start: e.target.value })}
                      className={FIELD}
                    >
                      <option value="">Pick</option>
                      {TIMES.map((t) => (
                        <option key={t} value={t}>
                          {timeLabel(t)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`${id}-end`} className={LABEL}>
                      To
                    </label>
                    <select
                      id={`${id}-end`}
                      value={slot.end}
                      onChange={(e) => updateSlot(i, { end: e.target.value })}
                      className={FIELD}
                    >
                      <option value="">Pick</option>
                      {TIMES.map((t) => (
                        <option key={t} value={t}>
                          {timeLabel(t)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`${id}-tech`} className={LABEL}>
                      Tech
                    </label>
                    <select
                      id={`${id}-tech`}
                      value={slot.techId}
                      onChange={(e) => updateSlot(i, { techId: e.target.value })}
                      className={FIELD}
                    >
                      <option value="">Pick</option>
                      {data.techs.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`${id}-job`} className={LABEL}>
                      Nearby job city
                    </label>
                    <select
                      id={`${id}-job`}
                      value={slot.jobPlace}
                      onChange={(e) => updateSlot(i, { jobPlace: e.target.value })}
                      className={FIELD}
                    >
                      <option value="">Pick</option>
                      {places.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {st.drive !== null && st.warnings.length === 0 && (
                  <p className="mt-3 font-semibold text-ops-go">
                    {resolvePlace(data, slot.jobPlace)} to {resolvePlace(data, customerPlace)}: {st.drive} min. Good.
                  </p>
                )}
                {st.warnings.map((w) => (
                  <p key={w} role="alert" className="mt-3 font-bold text-ops-stop">
                    {w}
                    {w.startsWith("This job") && st.drive !== null && (
                      <span className="font-semibold">
                        {" "}
                        ({resolvePlace(data, slot.jobPlace)} to {resolvePlace(data, customerPlace)}: {st.drive} min)
                      </span>
                    )}
                  </p>
                ))}
                {i === 2 && st.partial && (
                  <p className="mt-3 text-ops-muted">
                    Finish this time or{" "}
                    <button
                      type="button"
                      onClick={() => updateSlot(2, EMPTY_SLOT)}
                      className="font-semibold text-ops-primary underline"
                    >
                      clear it
                    </button>
                    .
                  </p>
                )}
              </fieldset>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-ops-line bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-bold">Text to send</h3>
            <button
              type="button"
              onClick={copy}
              aria-disabled={!canCopy}
              aria-describedby="fu-copy-help"
              className={`rounded-lg px-4 py-2 text-sm font-bold ${
                canCopy
                  ? "bg-ops-primary text-white hover:bg-ops-primary-dark"
                  : "cursor-not-allowed bg-ops-line text-ops-muted"
              }`}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p id="fu-copy-help" className={`mt-1 text-sm ${canCopy ? "text-ops-muted" : "font-semibold text-ops-stop"}`}>
            {canCopy ? "Ready. Copy it and send it to the customer." : `To copy: ${problems.join(", ")}.`}
          </p>
          <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-ops-surface p-3 font-sans text-base">{text}</pre>
          <p aria-live="polite" className="sr-only">
            {copied ? "Text copied." : ""}
          </p>
        </div>

        <FollowupTimer minutes={data.followupDelayMin} discountPercent={data.followupDiscountPercent} />
      </section>
    </div>
  );
}
