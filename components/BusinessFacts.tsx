import Link from "next/link";
import { businessFacts } from "@/lib/facts";

/**
 * "About Royal Rinse" fact block, rendered in the site-wide footer so it is on
 * every page, in the initial server HTML. Plain sentences on purpose: this is
 * the text AI answer engines and search snippets are most likely to quote.
 */
export function BusinessFacts() {
  const facts = businessFacts;

  return (
    <section aria-labelledby="about-royal-rinse" className="border-b border-hairline py-12">
      <h2
        id="about-royal-rinse"
        className="text-xs font-semibold uppercase tracking-[0.18em] text-chrome"
      >
        About Royal Rinse
      </h2>
      <div className="mt-5 grid gap-x-12 gap-y-4 text-sm leading-relaxed text-muted lg:grid-cols-2">
        <div className="space-y-3">
          <p>
            <span className="font-semibold text-ink">{facts.who}</span> {facts.where}
          </p>
          <p>{facts.what}</p>
          <p>
            {facts.credentials} {facts.hours} {facts.contact}
          </p>
        </div>
        <ul className="space-y-2">
          {facts.differentiators.map((fact) => (
            <li key={fact} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-chrome" />
              <span>{fact}</span>
            </li>
          ))}
          <li className="pt-1">
            <Link
              href="/faq"
              className="font-semibold text-accent transition-colors hover:text-ink"
            >
              Common questions, answered
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
