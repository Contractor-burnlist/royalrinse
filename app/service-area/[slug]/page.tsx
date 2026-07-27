import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCity, type City } from "@/lib/serviceAreas";
import { cityCover, getCityPage, type CityPage } from "@/lib/cityPages";
import { ceramicCoating, tiers } from "@/lib/services";
import {
  GOOGLE_MAPS_URL,
  PHONE_ARIA,
  PHONE_DISPLAY,
  site,
  telHref,
} from "@/lib/site";
import { absoluteUrl, siteUrl } from "@/lib/url";
import { buildMetadata } from "@/lib/seo";
import { BookNowButton } from "@/components/BookNowButton";
import { QuoteCta } from "@/components/QuoteCta";
import { ButtonAnchor, Card, Container, Eyebrow, Icon, Section } from "@/components/ui";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return cities.map((city) => ({ slug: city.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const city = getCity(params.slug);
  if (!city) return {};

  const page = getCityPage(params.slug);
  return buildMetadata({
    title: `Mobile Auto Detailing in ${city.name}, CA | Royal Rinse`,
    description:
      page?.metaDescription ??
      `Royal Rinse brings professional mobile auto detailing to ${city.name} in ${city.county} County. We come to your home or office: licensed, insured, fully self-contained.`,
    path: `/service-area/${city.slug}`,
  });
}

const tierIcons: Record<string, string> = {
  bronze: "droplet",
  silver: "car",
  gold: "sparkle",
  platinum: "polish",
  diamond: "diamond",
};

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

/** Service JSON-LD scoped to this city, so each page advertises its own areaServed. */
function CitySchema({ city }: { city: City }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobile Auto Detailing",
    name: `Mobile Auto Detailing in ${city.name}`,
    provider: {
      "@type": "AutoDetailing",
      "@id": `${siteUrl}/#business`,
      name: site.legalName,
      telephone: PHONE_DISPLAY,
    },
    areaServed: { "@type": "City", name: `${city.name}, CA` },
    hasMap: GOOGLE_MAPS_URL,
    url: absoluteUrl(`/service-area/${city.slug}`),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Licensed & Insured · CA DLSE · 10% Military Discount · Mobile — one place. */
function TrustLine({ className = "" }: { className?: string }) {
  const items = [
    "Licensed & Insured",
    `CA DLSE ${site.licenseNumber}`,
    "10% Military Discount",
    "Mobile: We Come To You",
  ];
  return (
    <p
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-muted ${className}`}
    >
      {items.map((item, index) => (
        <span key={item} className="flex items-center gap-2">
          {index > 0 ? (
            <span aria-hidden="true" className="text-royal">
              ·
            </span>
          ) : null}
          <span className="text-chrome">{item}</span>
        </span>
      ))}
    </p>
  );
}

function ServicesGrid({ intro, cityName }: { intro: string; cityName: string }) {
  return (
    <Section className="!pb-0">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        Services available in {cityName}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        {intro} See the full lineup on our{" "}
        <Link
          href="/packages"
          className="font-semibold text-royal transition-colors hover:text-chrome"
        >
          packages page
        </Link>
        .
      </p>

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

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
        >
          All services
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/packages"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
        >
          Compare packages
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}

/** Urgency CTA band with the city-specific "we come to you" line. */
function CityCta({ ctaLine }: { ctaLine: string }) {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-xl border border-hairline bg-surface px-6 py-14 text-center shadow-card sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-royal/25 blur-3xl"
        />
        <div className="relative">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Ready for a showroom finish?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">{ctaLine}</p>
          <p className="mx-auto mt-6 max-w-md text-sm font-semibold text-chrome">
            Same-week appointments available. Call now for an instant quote.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonAnchor href={telHref} aria-label={PHONE_ARIA}>
              Call now for an instant quote
            </ButtonAnchor>
            <BookNowButton variant="secondary">Book Now</BookNowButton>
          </div>

          <TrustLine className="mt-8 justify-center" />
        </div>
      </div>
    </Section>
  );
}

/** The rich, hand-written page for the six showcase cities. */
function UniqueCityPage({ city, page }: { city: City; page: CityPage }) {
  const cover = cityCover(page);

  return (
    <>
      <CitySchema city={city} />

      {/* Hero: copy on the left, a unique framed cover photo on the right. */}
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-12 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>{city.county} County</Eyebrow>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Mobile Auto Detailing in {city.name}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-chrome">
                {page.subhead}
              </p>
              <TrustLine className="mt-6" />
              <Link
                href="/service-area"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
              >
                <span aria-hidden="true">←</span>
                All service areas
              </Link>
            </div>

            {cover ? (
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-chrome/20 shadow-2xl">
                <Image
                  src={cover.src}
                  alt={`Mobile auto detailing in ${city.name}, CA`}
                  fill
                  priority
                  quality={85}
                  // Half the container on lg (~540px), near-full-width below —
                  // matched to the slot so 900px sources never upscale.
                  sizes="(min-width: 1024px) 540px, 92vw"
                  className="object-cover object-center"
                />
              </div>
            ) : null}
          </div>
        </Container>
      </div>

      {/* Unique, city-specific intro. */}
      <Section className="!pb-0">
        <div className="max-w-[62ch] space-y-5 text-base leading-relaxed text-muted">
          {page.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {/* Local angle: which services matter most here. */}
      <Section className="!pb-0">
        <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-card sm:p-10">
          <Eyebrow>Local focus</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {page.angleHeading}
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted">
            {page.angleBody}
          </p>
        </div>
      </Section>

      <ServicesGrid intro={page.servicesIntro} cityName={city.name} />

      <CityCta ctaLine={page.ctaLine} />
    </>
  );
}

/** Generic fallback for cities without a hand-written page (still valid, no 404). */
function TemplatedCityPage({ city }: { city: City }) {
  return (
    <>
      <CitySchema city={city} />

      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>{city.county} County</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Mobile Auto Detailing in {city.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            We come to you in {city.name}. Our fully self-contained mobile rig arrives at
            your home or office and details your vehicle right where it sits: no
            drop-off, no waiting room, no lost afternoon.
          </p>
          <TrustLine className="mt-6" />
          <Link
            href="/service-area"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
          >
            <span aria-hidden="true">←</span>
            All service areas
          </Link>
        </Container>
      </div>

      <ServicesGrid
        intro={`Every Royal Rinse package is available in ${city.name}.`}
        cityName={city.name}
      />

      <QuoteCta heading={`Ready for a showroom finish in ${city.name}?`} />
    </>
  );
}

export default function CityPage({ params }: { params: Params }) {
  const city = getCity(params.slug);
  if (!city) notFound();

  const page = getCityPage(params.slug);
  return page ? (
    <UniqueCityPage city={city} page={page} />
  ) : (
    <TemplatedCityPage city={city} />
  );
}
