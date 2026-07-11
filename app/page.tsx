import type { Metadata } from "next";
import Link from "next/link";
import {
  PHONE_ARIA,
  SERVICE_AREA_SHORT,
  site,
  steps,
  telHref,
  valueProps,
} from "@/lib/site";
import { featuredReviews } from "@/lib/reviews";
import { featuredCities } from "@/lib/serviceAreas";
import { ceramicCoating, tiers } from "@/lib/services";
import {
  exteriorGallery,
  featureVehicles,
  type GalleryImage,
} from "@/lib/gallery";
import { BookNowButton } from "@/components/BookNowButton";
import { HeroCarousel } from "@/components/HeroCarousel";
import { LightboxGrid } from "@/components/Lightbox";
import { ReviewCard } from "@/components/ReviewCard";
import {
  ButtonAnchor,
  Card,
  Container,
  Eyebrow,
  Icon,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Royal Rinse | Mobile Auto Detailing — Riverside & San Diego County",
  description:
    "Licensed, insured, and bonded mobile auto detailing. We come to your home or office anywhere in Riverside & San Diego County — no drop-off, no waiting room.",
};

const trustChips = [
  "Licensed, Insured & Bonded",
  "Mobile — We Come To You",
  "5-Star Rated",
];

const trustBadges = [
  "DLSE Licensed",
  "Fully Insured",
  "Bonded",
  "Mobile Service",
  "Satisfaction Guaranteed",
];

const tierIcons: Record<string, string> = {
  bronze: "droplet",
  silver: "car",
  gold: "sparkle",
  platinum: "polish",
  diamond: "diamond",
};

// Bronze → Diamond, then Ceramic Coating. Six cards, no prices.
const homeServices = [
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

// Strongest exterior shots from the feature set, plus the two best from the
// exterior gallery — six tiles, no placeholders.
const homeGalleryShots: GalleryImage[] = [
  ...featureVehicles.flatMap((vehicle) => vehicle.exterior).slice(0, 4),
  ...exteriorGallery.slice(0, 2),
];

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-royal/20 blur-3xl"
      />
      <Container className="relative py-20 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow>{SERVICE_AREA_SHORT}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              A showroom finish,
              <br />
              in your driveway.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted">{site.tagline}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonAnchor href={telHref} aria-label={PHONE_ARIA}>
                Call {site.phone}
              </ButtonAnchor>
              <BookNowButton variant="secondary" />
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {trustChips.map((chip) => (
                <li key={chip} className="flex items-center gap-2 text-sm text-chrome">
                  <Icon name="check" className="h-4 w-4 text-royal" />
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <HeroCarousel />
        </div>
      </Container>
    </section>
  );
}

function TrustBar() {
  return (
    <div className="border-b border-hairline bg-charcoal">
      <Container>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-4 py-6 sm:grid-cols-3 lg:grid-cols-5">
          {trustBadges.map((badge) => (
            <li
              key={badge}
              className="flex items-center justify-center gap-2 text-center text-sm font-medium text-chrome"
            >
              <Icon name="shield" className="h-4 w-4 shrink-0 text-royal" />
              {badge}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

function Services() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What we do"
        title="Detailing services, delivered to you"
        intro="Every service runs off our fully self-contained mobile rig — no shop visit, no drop-off."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homeServices.map((service) => (
          <Card key={service.slug} className="flex flex-col">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal/15 text-royal">
              <Icon name={service.icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-ink">{service.name}</h3>
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

      <p className="mt-10 text-sm text-muted">
        Also offering{" "}
        <Link href="/services#add-ons" className="font-semibold text-royal hover:text-chrome">
          add-ons
        </Link>
        ,{" "}
        <Link
          href="/services/maintenance-plans"
          className="font-semibold text-royal hover:text-chrome"
        >
          maintenance plans
        </Link>
        , and{" "}
        <Link
          href="/services/rv-detailing"
          className="font-semibold text-royal hover:text-chrome"
        >
          RV detailing
        </Link>
        .
      </p>
    </Section>
  );
}

function HowItWorks() {
  return (
    <div className="border-y border-hairline bg-charcoal">
      <Section className="!py-20 sm:!py-24">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps. Zero hassle."
        />

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number}>
              <Card className="h-full">
                <span className="font-display text-3xl font-bold text-royal">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

function WhyRoyalRinse() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why Royal Rinse"
        title="The care a car deserves, without the errand"
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {valueProps.map((prop) => (
          <Card key={prop.title} className="flex gap-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-royal/15 text-royal">
              <Icon name="check" className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-ink">{prop.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{prop.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function ServiceAreaTeaser() {
  return (
    <div className="border-y border-hairline bg-charcoal">
      <Section className="!py-20 sm:!py-24">
        <SectionHeading
          eyebrow="Service area"
          title={`${SERVICE_AREA_SHORT} — we come to you`}
          intro="If you're in the area, we can most likely get to you. Don't see your neighborhood? Just ask."
        />

        <ul className="mt-10 flex flex-wrap gap-3">
          {featuredCities.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/service-area/${city.slug}`}
                className="inline-flex rounded-xl border border-hairline bg-surface px-4 py-2 text-sm font-medium text-chrome transition-colors hover:border-royal hover:text-ink"
              >
                {city.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/service-area"
              className="inline-flex rounded-xl border border-hairline bg-surface px-4 py-2 text-sm font-semibold text-royal transition-colors hover:border-royal hover:text-ink"
            >
              View all →
            </Link>
          </li>
        </ul>
      </Section>
    </div>
  );
}

function Gallery() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Gallery"
          title="Recent work"
          intro="Real results from real driveways across Riverside and San Diego County."
        />
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
        >
          View full gallery
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <LightboxGrid images={homeGalleryShots} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" />
    </Section>
  );
}

function Testimonials() {
  return (
    <div className="border-y border-hairline bg-charcoal">
      <Section className="!py-20 sm:!py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Reviews" title="What our customers say" />
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
          >
            Read all reviews
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredReviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function FinalCta() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-xl border border-hairline bg-surface px-6 py-16 text-center shadow-card sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-royal/25 blur-3xl"
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Ready for a showroom finish?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">
            Book online in under a minute, or call and we&rsquo;ll find a time that works.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonAnchor href={telHref} aria-label={PHONE_ARIA}>
              Call {site.phone}
            </ButtonAnchor>
            <BookNowButton variant="secondary" />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <HowItWorks />
      <WhyRoyalRinse />
      <ServiceAreaTeaser />
      <Gallery />
      <Testimonials />
      <FinalCta />
    </>
  );
}
