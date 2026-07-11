import type { Metadata } from "next";
import Link from "next/link";
import { citiesInCounty, counties } from "@/lib/serviceAreas";
import { QuoteCta } from "@/components/QuoteCta";
import { Container, Eyebrow, Icon, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Service Area | Royal Rinse — Mobile Auto Detailing, Riverside & San Diego County",
  description:
    "Royal Rinse brings mobile auto detailing to your home or office across Riverside and San Diego County — from Menifee and Temecula to Carlsbad and Oceanside.",
};

export default function ServiceAreaPage() {
  return (
    <>
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Service area</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Serving Riverside &amp; San Diego County — We Come To You
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Our mobile rig is fully self-contained, so we detail your vehicle right where
            it sits — at your home or your office. No drop-off, no waiting room.
          </p>
        </Container>
      </div>

      <Section>
        <div className="grid gap-14 sm:grid-cols-2">
          {counties.map((county) => (
            <div key={county}>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                {county} County
              </h2>
              <ul className="mt-6 space-y-1">
                {citiesInCounty(county).map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/service-area/${city.slug}`}
                      className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
                    >
                      {city.name}
                      <span
                        aria-hidden="true"
                        className="text-royal opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-14 flex items-center gap-2 text-sm text-muted">
          <Icon name="check" className="h-4 w-4 shrink-0 text-royal" />
          Don&rsquo;t see your city? Give us a call — if you&rsquo;re nearby, we can
          usually get to you.
        </p>
      </Section>

      <QuoteCta heading="Ready to book?" />
    </>
  );
}
