import { CARD, H2, NOTE, STEPS } from "./styles";

/** Tab 3. Server component: rendered on the server, never in the JS bundle. */
export function InvoicingSop() {
  return (
    <div className="space-y-6">
      <p className={NOTE}>Same price for every payment type. Never charge more for a card.</p>

      <section className={CARD} aria-labelledby="inv-cash">
        <h2 id="inv-cash" className={H2}>
          CASH, ZELLE, OR VENMO
        </h2>
        <p className="mt-3 text-lg leading-relaxed">
          The tech collects payment on site. The tech marks the job paid in Housecall Pro and picks the payment type.
          You do not need to do anything.
        </p>
      </section>

      <section className={CARD} aria-labelledby="inv-card">
        <h2 id="inv-card" className={H2}>
          CREDIT OR DEBIT CARD
        </h2>
        <ol className={STEPS}>
          <li>
            When the tech says the job is done and the customer wants to pay by card, open the invoice in Housecall Pro.
            Check that the total is correct.
          </li>
          <li>Call the customer.</li>
          <li>While you are on the phone, send the invoice from Housecall Pro by text and email.</li>
          <li>Stay on the call. Ask: &ldquo;Did you get the invoice?&rdquo; Wait until they say yes.</li>
          <li>Tell them: &ldquo;You can pay with your card right on the invoice. Just tap the pay button.&rdquo;</li>
          <li>If they do not answer, send the invoice by text anyway, write it in the job notes, and tell Tim.</li>
        </ol>
      </section>

      <section className={CARD} aria-labelledby="inv-eod">
        <h2 id="inv-eod" className={H2}>
          END OF DAY CHECK
        </h2>
        <p className="mt-3 text-lg leading-relaxed">
          Before you finish your shift: every completed job today must be either marked paid, or have an invoice sent.
          If not, tell Tim.
        </p>
      </section>
    </div>
  );
}
