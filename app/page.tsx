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
import { serviceImage } from "@/lib/serviceImages";
import { BookNowButton } from "@/components/BookNowButton";
import { HeroCarousel } from "@/components/HeroCarousel";
import { LightboxGrid } from "@/components/Lightbox";
import { PhotoBand } from "@/components/PhotoBand";
import { Reveal } from "@/components/Reveal";
import { ReviewCard } from "@/components/ReviewCard";
import { ServicePhotoCard } from "@/components/ServicePhotoCard";
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
    image: serviceImage(tier.slug),
  })),
  {
    slug: ceramicCoating.slug,
    name: ceramicCoating.name,
    tagline: ceramicCoating.tagline,
    icon: "shield",
    image: serviceImage(ceramicCoating.slug),
  },
];

// Strongest exterior shots from the feature set, plus the two best from the
// exterior gallery — six tiles, no placeholders.
const homeGalleryShots: GalleryImage[] = [
  ...featureVehicles.flatMap((vehicle) => vehicle.exterior).slice(0, 4),
  ...exteriorGallery.slice(0, 2),
];

// Full-bleed interstitials. The van is visible in the "we come to you" shot.
const heroExteriors = featureVehicles.flatMap((vehicle) => vehicle.exterior);
const bandImages = {
  comeToYou: heroExteriors[3] ?? heroExteriors[0],
  showroom: heroExteriors[4] ?? heroExteriors[1],
};

function Hero() {
  return (
    <HeroCarousel>
      {/* Centered stack. HeroCarousel already centres and caps this block. */}
      <Eyebrow>{SERVICE_AREA_SHORT}</Eyebrow>

      {/* No forced <br> on mobile — it overflows narrow viewports. */}
      <h1 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:text-6xl sm:leading-[0.98]">
        A showroom finish,
        <br className="hidden sm:inline" />{" "}
        in your driveway.
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-lg text-chrome sm:text-xl">
        {site.tagline}
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonAnchor href={telHref} aria-label={PHONE_ARIA}>
          Call {site.phone}
        </ButtonAnchor>
        <BookNowButton variant="secondary" />
      </div>

      <ul className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3">
        {trustChips.map((chip) => (
          <li key={chip} className="flex items-center gap-2 text-sm text-chrome">
            <Icon name="check" className="h-4 w-4 text-royal" />
            {chip}
          </li>
        ))}
      </ul>
    </HeroCarousel>
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

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homeServices.map((service, i) => (
          <Reveal key={service.slug} delay={(i % 3) * 80}>
            <ServicePhotoCard
              name={service.name}
              tagline={service.tagline}
              href={`/services/${service.slug}`}
              icon={service.icon}
              image={service.image}
              featured={service.slug === "diamond"}
            />
          </Reveal>
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

      {/* Masonry, not a forced 4:3 crop — the sources are portrait and a
          landscape tile threw away ~58% of every frame. */}
      <LightboxGrid
        images={homeGalleryShots}
        variant="masonry"
        className="mt-14 columns-2 gap-4 lg:columns-3"
        sizes="(max-width: 1023px) 50vw, 33vw"
      />
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

      <PhotoBand
        image={bandImages.comeToYou}
        headline="We come to you."
        sub="Our rig carries its own water and power. Your driveway is the shop."
      />

      <HowItWorks />
      <WhyRoyalRinse />

      <PhotoBand
        image={bandImages.showroom}
        headline="Showroom finish, every time."
        sub="The finish is in the parts most people skip — every vent, seam, and panel."
      />

      <ServiceAreaTeaser />
      <Gallery />
      <Testimonials />
      <FinalCta />
    </>
  );
}
