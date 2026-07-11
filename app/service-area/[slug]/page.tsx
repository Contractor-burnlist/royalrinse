import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCity } from "@/lib/serviceAreas";
import { ceramicCoating, tiers } from "@/lib/services";
import { QuoteCta } from "@/components/QuoteCta";
import { Card, Container, Eyebrow, Icon, Section } from "@/components/ui";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return cities.map((city) => ({ slug: city.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const city = getCity(params.slug);
  if (!city) return {};

  return {
    title: `Mobile Auto Detailing in ${city.name}, CA | Royal Rinse`,
    description: `Royal Rinse brings professional mobile auto detailing to ${city.name} in ${city.county} County. We come to your home or office — licensed, insured, and fully self-contained.`,
  };
}

const tierIcons: Record<string, string> = {
  bronze: "droplet",
  silver: "car",
  gold: "sparkle",
  platinum: "polish",
  diamond: "diamond",
};

export default function CityPage({ params }: { params: Params }) {
  const city = getCity(params.slug);
  if (!city) notFound();

  const services = [
    ...tiers.map((tier) => ({
      slug: tier.slug,
      name: tier.name,
      tagline: tier.tagline,
      icon: tierIcons[tier.slug] ?? "sparkle",
    })),
    {
      slug: ceramicCoating.slug,
      name: ceramicCoating.name,
      tagline: ceramicCoating.tagline,
      icon: "shield",
    },
  ];

  return (
    <>
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>{city.county} County</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Mobile Auto Detailing in {city.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            We come to you in {city.name}. Our fully self-contained mobile rig arrives at
            your home or office and details your vehicle right where it sits — no
            drop-off, no waiting room, no lost afternoon.
          </p>

          <Link
            href="/service-area"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
          >
            <span aria-hidden="true">←</span>
            All service areas
          </Link>
        </Container>
      </div>

      <Section className="!pb-0">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Services available in {city.name}
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.slug} className="flex flex-col">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal/15 text-royal">
                <Icon name={service.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">
                {service.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {service.tagline}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
              >
                Learn more
                <span aria-hidden="true">→</span>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <QuoteCta heading={`Ready for a showroom finish in ${city.name}?`} />
    </>
  );
}
