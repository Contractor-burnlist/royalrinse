import type { Metadata } from "next";
import Link from "next/link";
import {
  GOOGLE_REVIEWS_URL,
  PHONE_ARIA,
  REVIEW_COUNT_DISPLAY,
  REVIEW_RATING_DISPLAY,
  SERVICE_AREA_SHORT,
  site,
  steps,
  telHref,
  valueProps,
} from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { faqs } from "@/lib/faq";
import { featuredReviews } from "@/lib/reviews";
import { featuredCities } from "@/lib/serviceAreas";
import { ceramicCoating, tiers } from "@/lib/services";
import {
  allGalleryImages,
  exteriorGallery,
  featureVehicles,
  isNearDuplicate,
  type GalleryImage,
} from "@/lib/gallery";
import { serviceImage } from "@/lib/serviceImages";
import { BookNowButton } from "@/components/BookNowButton";
import { GoogleMark } from "@/components/GoogleMark";
import { GoogleRatingSummary } from "@/components/GoogleRatingSummary";
import { GoogleReviewsBadge, GoldStars } from "@/components/GoogleReviewsBadge";
import { GoogleReviewsLink } from "@/components/GoogleReviewsLink";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MilitaryDiscountBadge } from "@/components/MilitaryDiscountBadge";
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

export const metadata: Metadata = buildMetadata({
  title: "Mobile Auto Detailing in Menifee & Temecula | Royal Rinse",
  description:
    "Premium mobile auto detailing in Menifee, Temecula, and across Riverside & San Diego County. Licensed & insured — we come to you. Call (951) 338-9117.",
  path: "/",
});

const trustChips = [
  "Licensed, Insured & Bonded",
  "Mobile — We Come To You",
];

// `detail` renders as a smaller muted line beneath the label — used to surface
// the DLSE licence number itself, not just the claim of being licensed.
// Four credentials; the fifth grid slot is the Google-reviews stat (below).
const trustBadges: { label: string; detail?: string }[] = [
  { label: "CA DLSE Licensed", detail: site.licenseNumber },
  { label: "Fully Insured" },
  { label: "Bonded" },
  { label: "Mobile Service" },
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

/**
 * Six tiles, six DIFFERENT vehicles: the lead exterior of each feature vehicle
 * plus the two best from the exterior gallery.
 *
 * Taking one shot per vehicle rather than slicing the flattened list is what
 * keeps the two near-identical Ferrari framings from landing beside each other
 * — flatMap().slice(0, 4) put ferrari-hero and ferrari-hero-2 in adjacent
 * masonry tiles, the same stutter the hero row was fixed for.
 */
const homeGalleryShots: GalleryImage[] = [
  ...featureVehicles
    .map((vehicle) => vehicle.exterior.find((image) => !isNearDuplicate(image.src)))
    .filter((image): image is GalleryImage => Boolean(image))
    .slice(0, 4),
  ...exteriorGallery.slice(0, 2),
];

/**
 * Full-bleed interstitials, picked BY FILENAME on purpose.
 *
 * These were positional (heroExteriors[3] / [4]) and silently pointed at
 * different photos the moment new vehicles were added ahead of them — the
 * "we come to you" band ended up on a cabin close-up, which does not show a
 * van at all. The van is the whole point of that headline, so the two shots
 * are now named outright and adding photos cannot shift them again.
 */
const bandImage = (file: string): GalleryImage =>
  allGalleryImages.find((image) => image.src.endsWith(file)) ?? allGalleryImages[0];

const bandImages = {
  // Royal Rinse van parked behind the car.
  comeToYou: bandImage("vehicle-2-ext-2.jpg"),
  showroom: bandImage("vehicle-2-ext-3.jpg"),
};

function Hero() {
  return (
    <HeroCarousel>
      {/* Centered stack. HeroCarousel already centres and caps this block. */}
      <Eyebrow>{SERVICE_AREA_SHORT}</Eyebrow>

      {/* No forced <br> on mobile — it overflows narrow viewports. */}
      <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:text-6xl sm:leading-[0.98]">
        A showroom finish,
        <br className="hidden sm:inline" />{" "}
        in your driveway.
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-lg text-chrome sm:text-xl">
        {site.tagline}
      </p>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonAnchor href={telHref} aria-label={PHONE_ARIA}>
          Call {site.phone}
        </ButtonAnchor>
        <BookNowButton variant="secondary" />
      </div>

      <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
        {trustChips.map((chip) => (
          <li key={chip} className="flex items-center gap-2 text-sm text-chrome">
            <Icon name="check" className="h-4 w-4 text-royal" />
            {chip}
          </li>
        ))}
        <li>
          <GoogleReviewsBadge
            className="text-sm text-chrome hover:text-ink"
            starClassName="h-3.5 w-3.5"
          >
            {REVIEW_COUNT_DISPLAY} Five-Star Google Reviews
          </GoogleReviewsBadge>
        </li>
      </ul>
    </HeroCarousel>
  );
}

function TrustBar() {
  return (
    <div className="border-b border-hairline bg-charcoal">
      <Container>
        <div className="py-6">
          <ul className="grid grid-cols-2 items-start gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
            {trustBadges.map((badge) => (
              <li
                key={badge.label}
                className="flex items-start justify-center gap-2 text-center"
              >
                <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-royal" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-chrome">
                    {badge.label}
                  </span>
                  {badge.detail ? (
                    // The credential itself — muted and slightly smaller so it
                    // reads as detail, not another headline claim.
                    <span className="mt-0.5 block break-words font-mono text-[11px] tracking-tight text-muted">
                      {badge.detail}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}

            {/* Google reviews stat — clickable, gold stars + G, real figures. */}
            <li className="flex items-start justify-center gap-2 text-center">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
              >
                <GoogleMark className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-chrome transition-colors group-hover:text-ink">
                    {REVIEW_COUNT_DISPLAY} Google Reviews
                  </span>
                  <span className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-muted">
                    <GoldStars className="h-3 w-3" />
                    {REVIEW_RATING_DISPLAY} Rating
                  </span>
                  <span className="sr-only">(opens Google in a new tab)</span>
                </span>
              </a>
            </li>
          </ul>

          {/* Its own row — squeezed into the badge grid it wrapped and crowded
              the other marks. It's an offer, not just another trust mark. */}
          <div className="mt-5 flex justify-center border-t border-hairline pt-5">
            <MilitaryDiscountBadge size="sm" />
          </div>
        </div>
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
          title="Based in Menifee — we come to you"
          intro="Rooted in Menifee, we're quickest across Menifee, Temecula, and Murrieta — and we cover all of Riverside & San Diego County. Don't see your neighborhood? Just ask."
        />

        {/* Priority markets, called out prominently ahead of the full list. */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/service-area/menifee"
            className="inline-flex items-center gap-1.5 rounded-xl border border-royal/50 bg-royal/10 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-royal hover:bg-royal/20"
          >
            Detailing in Menifee
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/service-area/temecula"
            className="inline-flex items-center gap-1.5 rounded-xl border border-royal/50 bg-royal/10 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-royal hover:bg-royal/20"
          >
            Detailing in Temecula
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="mt-6 flex flex-wrap gap-3">
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
        <div className="max-w-2xl">
          <Eyebrow>Reviews</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Loved on Google
          </h2>
          <GoogleRatingSummary className="mt-5" />
          <p className="mt-4 text-base leading-relaxed text-muted">
            A few of our favorite reviews from real customers — read them all on
            our verified Google Business Profile.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredReviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <GoogleReviewsLink variant="button">
            See all reviews on Google
          </GoogleReviewsLink>
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

/**
 * A few common questions in plain text on the homepage — so the core facts
 * (we come to you, areas served, quote-based pricing, licensing, military
 * discount) are extractable by search and AI answer engines, not just buried in
 * buttons. The full list + FAQPage schema live on /faq.
 */
function HomeFaq() {
  return (
    <Section className="!pt-0">
      <SectionHeading
        eyebrow="Good to know"
        title="Common questions"
        intro="Quick answers about how mobile detailing with Royal Rinse works."
      />
      <dl className="mt-12 grid gap-x-12 gap-y-8 lg:grid-cols-2">
        {faqs.slice(0, 4).map((faq) => (
          <div key={faq.question}>
            <dt className="font-display text-base font-bold text-ink">
              {faq.question}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</dd>
          </div>
        ))}
      </dl>
      <Link
        href="/faq"
        className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
      >
        See all FAQs
        <span aria-hidden="true">→</span>
      </Link>
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
      <HomeFaq />
      <FinalCta />
    </>
  );
}
