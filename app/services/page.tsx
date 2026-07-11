import type { Metadata } from "next";
import Link from "next/link";
import {
  addOns,
  ceramicCoating,
  maintenancePlan,
  rvDetailing,
  tiers,
} from "@/lib/services";
import { QuoteCta } from "@/components/QuoteCta";
import { Card, Container, Eyebrow, Icon, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services | Royal Rinse — Mobile Auto Detailing, Southern California",
  description:
    "Detailing packages from Bronze to Diamond, ceramic coating, add-ons, maintenance plans, and RV detailing — all delivered to your driveway.",
};

/** Name + tagline + link. Depth lives on the detail page, not here. */
function DirectoryCard({
  name,
  tagline,
  href,
  icon,
}: {
  name: string;
  tagline: string;
  href: string;
  icon: string;
}) {
  return (
    <Card className="flex flex-col">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal/15 text-royal">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-5 font-display text-lg font-bold text-ink">{name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tagline}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
      >
        Learn more
        <span aria-hidden="true">→</span>
      </Link>
    </Card>
  );
}

const tierIcons: Record<string, string> = {
  bronze: "droplet",
  silver: "car",
  gold: "sparkle",
  platinum: "polish",
  diamond: "diamond",
};

export default function ServicesPage() {
  return (
    <>
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Detailing, delivered to you
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Five packages, ceramic coating, and a full add-on menu — all done on site.
          </p>
        </Container>
      </div>

      <Section className="!pb-0">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Packages
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <DirectoryCard
              key={tier.slug}
              name={tier.name}
              tagline={tier.tagline}
              href={`/services/${tier.slug}`}
              icon={tierIcons[tier.slug] ?? "sparkle"}
            />
          ))}
          <DirectoryCard
            name={ceramicCoating.name}
            tagline={ceramicCoating.tagline}
            href={`/services/${ceramicCoating.slug}`}
            icon="shield"
          />
        </div>
      </Section>

      <Section id="add-ons" className="!pb-0">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Add-ons
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Bolt any of these onto a package.
        </p>

        <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {addOns.map((addOn) => (
            <li key={addOn.name} className="flex gap-3">
              <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-royal" />
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-ink">{addOn.name}</span> — {addOn.desc}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Also available
        </h2>

        <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
          {[maintenancePlan, rvDetailing].map((service) => (
            <li
              key={service.slug}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5"
            >
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-display text-base font-bold text-ink">
                  {service.name}
                </span>
                <span className="mx-2 text-muted">—</span>
                {service.tagline}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
              >
                Learn more
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <QuoteCta />
    </>
  );
}
