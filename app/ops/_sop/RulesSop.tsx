import { DRIVE_LIMIT_MIN, PRICE_LIMIT } from "@/lib/ops/rules";
import { CARD, H2, STEPS } from "./styles";

/**
 * Tab 4: the booking rules in short, built from lib/ops/rules.ts. Server
 * component: rendered on the server, never in the JS bundle.
 */
export function RulesSop() {
  const price = `$${PRICE_LIMIT}`;
  return (
    <div className="space-y-6">
      <section className={CARD} aria-labelledby="rules-numbers">
        <h2 id="rules-numbers" className={H2}>
          2 numbers to remember: {DRIVE_LIMIT_MIN} minutes and {price}.
        </h2>
      </section>

      <section className={CARD} aria-labelledby="rules-steps">
        <h2 id="rules-steps" className={H2}>
          3 steps for every booking
        </h2>
        <ol className={STEPS}>
          <li>Bronze? Try once to upsell to Silver. If they say no, Bronze is fine.</li>
          <li>{price} or more? Book it, any distance.</li>
          <li>
            Under {price}? Book only if the drive is {DRIVE_LIMIT_MIN} minutes or less, from the tech&apos;s home (first
            job) or from another job that day.
          </li>
        </ol>
      </section>

      <section className={CARD} aria-label="Always remember">
        <ul className="space-y-3 text-lg font-semibold">
          <li>Always pick the closest tech.</li>
          <li>Same price for cash, Zelle, Venmo, or card.</li>
          <li>All dates and times are California time (Pacific Time).</li>
          <li className="text-ops-stop">Not sure? Do not book. Ask Tim.</li>
        </ul>
      </section>
    </div>
  );
}
