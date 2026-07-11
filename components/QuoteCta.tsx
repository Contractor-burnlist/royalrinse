import { quoteNote } from "@/lib/services";
import { site, telHref } from "@/lib/site";
import { ButtonLink, Section } from "@/components/ui";

/** Stands in for pricing everywhere. No numbers, ever — quote on request. */
export function QuoteCta({ heading = "Ready for a showroom finish?" }: { heading?: string }) {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-xl border border-hairline bg-surface px-6 py-14 text-center shadow-card sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-royal/25 blur-3xl"
        />
        <div className="relative">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">{quoteNote}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={telHref}>Call {site.phone}</ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book Now
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
