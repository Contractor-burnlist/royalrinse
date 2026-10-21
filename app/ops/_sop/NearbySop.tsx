import { driveMinutes } from "@/lib/ops/checkJob";
import { FOLLOWUP_DELAY_MIN, FOLLOWUP_DISCOUNT_PERCENT, FOLLOWUP_LOOKAHEAD_DAYS } from "@/lib/ops/rules";
import { CARD, H2, NOTE, STEPS } from "./styles";

/*
 * Server components: this text is rendered on the server from lib/ops/rules.ts
 * and is never part of the JS bundle.
 */

export function NearbyGoal() {
  return (
    <p className="mb-6 rounded-2xl bg-ops-ink p-5 text-lg font-semibold text-white">
      GOAL: Line up jobs that are close to each other. Fewer miles on the vans means less gas and less repair cost.
    </p>
  );
}

/** Section B */
export function FollowupSop() {
  return (
    <section className={CARD} aria-labelledby="sop-followup-title">
      <h2 id="sop-followup-title" className={H2}>
        B. When to send a follow-up
      </h2>
      <p className="mt-3 text-lg font-semibold">If a customer calls but does not book on the phone:</p>
      <ol className={STEPS}>
        <li>Wait {FOLLOWUP_DELAY_MIN} minutes.</li>
        <li>
          Find 2 or 3 open times that are right before or right after a job we already have nearby (use the finder
          above). Only use the next {FOLLOWUP_LOOKAHEAD_DAYS} days.
        </li>
        <li>Send the follow-up text below. These times get {FOLLOWUP_DISCOUNT_PERCENT}% off.</li>
        <li>Only offer times that work with our schedule. Do not offer a time just because it is open.</li>
      </ol>
      <p className={`mt-4 ${NOTE}`}>
        If there is no job near them in the next {FOLLOWUP_LOOKAHEAD_DAYS} days, ask Tim before sending.
      </p>
    </section>
  );
}

/** Section D */
export function FollowupExample() {
  const drive = driveMinutes("Murrieta", "Temecula");
  return (
    <section className={`${CARD} mt-6`} aria-labelledby="sop-example-title">
      <h2 id="sop-example-title" className={H2}>
        D. Example
      </h2>
      <p className="mt-3 text-lg leading-relaxed">
        A customer in Temecula calls and does not book. You see we already have a job in Murrieta on Thursday at 10am.
        Murrieta to Temecula is {drive} minutes. Send them Thursday 12pm to 2pm, right after the Murrieta job. The tech
        drives {drive} minutes instead of coming from home.
      </p>
    </section>
  );
}
