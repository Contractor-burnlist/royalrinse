import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  GOOGLE_REVIEWS_URL,
  INSTAGRAM_URL,
  REVIEW_COUNT_DISPLAY,
  REVIEW_RATING_DISPLAY,
  SERVICE_AREA_PRIORITY,
  SERVICE_AREA_SHORT,
  site,
  smsHref,
  steps,
  telHref,
  TOTAL_REVIEW_COUNT_DISPLAY,
  valueProps,
} from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import heroStyles from "./home-hero.module.css";
import theme from "./home-theme.module.css";
import { faqs } from "@/lib/faq";
import { featuredReviews } from "@/lib/reviews";
import { featuredCities } from "@/lib/serviceAreas";
import { getPost, sortedPosts } from "@/lib/blog";
import {
  addOns,
  CERAMIC_WARRANTY_PATH,
  CERAMIC_WARRANTY_TRUST,
  ceramicCoating,
  maintenancePlan,
  tiers,
} from "@/lib/services";
import {
  allGalleryImages,
  exteriorGallery,
  featureVehicles,
  isNearDuplicate,
  type GalleryImage,
} from "@/lib/gallery";
import { addOnPhoto, serviceImage } from "@/lib/serviceImages";
import { BlogCard } from "@/components/BlogCard";
import { BookNowButton } from "@/components/BookNowButton";
import { GoogleRatingSummary } from "@/components/GoogleRatingSummary";
import { GoldStars } from "@/components/GoogleReviewsBadge";
import {
  ReviewPlatformLogos,
  ReviewPlatformsBadge,
} from "@/components/ReviewPlatforms";
import {
  BrandChip,
  InstagramMark,
  brandChipSizes,
} from "@/components/SocialMarks";
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
  ButtonLink,
  Card,
  Container,
  Icon,
  Section,
} from "@/components/ui";

export const metadata: Metadata = buildMetadata({
  title: "Mobile Auto Detailing in Menifee & Temecula | Royal Rinse",
  description:
    "Premium mobile auto detailing in Menifee, Temecula, and across Riverside & San Diego County. Licensed & insured, we come to you. Call (951) 338-9117.",
  path: "/",
});

const trustChips = ["Licensed, Insured & Bonded", "Mobile: We Come To You"];

// `detail` renders as a smaller muted line beneath the label: used to surface
// the DLSE licence number itself, not just the claim of being licensed.
// Four credentials; the fifth grid slot is the reviews stat (below).
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
 *: flatMap().slice(0, 4) put ferrari-hero and ferrari-hero-2 in adjacent
 * masonry tiles, the same stutter the hero row was fixed for.
 */
const homeGalleryShots: GalleryImage[] = [
  ...featureVehicles
    .map((vehicle) =>
      vehicle.exterior.find((image) => !isNearDuplicate(image.src)),
    )
    .filter((image): image is GalleryImage => Boolean(image))
    .slice(0, 4),
  ...exteriorGallery.slice(0, 2),
];

/**
 * Photos are picked BY FILENAME on purpose. Positional picks silently pointed
 * at different photos the moment new vehicles were added ahead of them.
 */
const photo = (file: string): GalleryImage =>
  allGalleryImages.find((image) => image.src.endsWith(file)) ??
  allGalleryImages[0];

/** Full-bleed interstitial: wheel and paint close-up. */
const showroomBandImage = photo("vehicle-2-ext-3.jpg");

/**
 * The customer's car in the driveway with the stocked van open behind it. A
 * 768px source, so its frame is capped at 352px (704 device pixels on retina).
 */
const rigImage = photo("mobile-rig-1.jpeg");

/** 3840px source: sharp at any width the ceramic section gives it. */
const ceramicImage = photo("ferrari-hero-3.jpeg");

const vehicleTypes = [
  "Exotics",
  "Luxury sedans",
  "Sports cars",
  "Classics",
  "Teslas and EVs",
  "SUVs",
  "Trucks",
  "Vans",
  "RVs",
];

const mobilePoints = [
  "Fully self-contained setup: we bring our own water and power",
  "Deionized water for a spot-free rinse, even in hard-water areas",
  "Your car never leaves your driveway, at home or at the office",
  "No drop-off, no shuttle, no waiting room",
];

/**
 * Thumbnails for the specialization section. Named so the mix is deliberate
 * (a Porsche, a Ferrari, the classic coupe, a classic Chevy), then filtered to
 * the Exotic category so a recategorized photo drops out instead of lingering.
 */
const exoticThumbs: GalleryImage[] = [
  "white-porsche-1.jpeg",
  "ferrari-hero-2.jpeg",
  "corvette-c2-2.jpeg",
  "exterior-1.jpg",
]
  .map((file) => allGalleryImages.find((image) => image.src.endsWith(file)))
  .filter(
    (image): image is GalleryImage =>
      Boolean(image) && image?.category === "Exotic",
  );

/** Related reading for the specialization section. Missing posts are skipped. */
const specialtyPosts = [
  "luxury-exotic-car-detailing-temecula-menifee",
  "classic-car-detailing-care",
]
  .map((slug) => getPost(slug))
  .filter((post): post is NonNullable<typeof post> => Boolean(post));

const deionizedPost = getPost("deionized-water-detailing");

/** Add-ons with a photo lead the showcase; the rest follow as a text list. */
const photoAddOns = addOns.flatMap((addOn) => {
  const image = addOnPhoto(addOn.name);
  return image ? [{ ...addOn, image }] : [];
});
const textAddOns = addOns.filter((addOn) => !addOnPhoto(addOn.name));

const planSchedules = ["Weekly", "Bi-weekly", "Monthly"];

/** Sorted newest first in lib/blog.ts, so this always tracks the latest three. */
const latestPosts = sortedPosts.slice(0, 3);

/**
 * The homepage shows eight of the FAQs: the five-city question, coming to
 * you, cost, ceramic coating, exotic and classic cars, timing, licensing and
 * the military discount. Picked by position-independent prefix so reordering
 * lib/faq.ts never changes which ones appear. The full list lives on /faq.
 */
const HOME_FAQ_PREFIXES = [
  "Do you offer mobile detailing in",
  "Do you come to my home",
  "How much does",
  "What is ceramic coating",
  "Do you detail exotic",
  "How long does a full detail",
  "Are you licensed",
  "Do you offer a military",
];
const homeFaqs = HOME_FAQ_PREFIXES.map((prefix) =>
  faqs.find((faq) => faq.question.startsWith(prefix)),
).filter((faq): faq is (typeof faqs)[number] => Boolean(faq));

/** FAQPage structured data for exactly the questions rendered on this page. */
const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/**
 * The slightly lighter band that alternates with the base background.
 * `slant` cuts its top and bottom edges on a diagonal that echoes the metal
 * sweep. Used on two bands only, so the page is not a stack of rectangles
 * but the effect stays an accent.
 */
function Band({
  children,
  slant = false,
}: {
  children: React.ReactNode;
  slant?: boolean;
}) {
  return (
    <div
      className={slant ? "band-slant metal-inset" : "rule-chrome-y metal-inset"}
    >
      {children}
    </div>
  );
}

/**
 * Homepage section heading in the /referral style: gold caps eyebrow and one
 * metallic gold phrase inside the title. Same structure as SectionHeading.
 */
function HomeHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className={theme.eyebrow}>{eyebrow}</p> : null}
      <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-metal sm:text-5xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>
      ) : null}
    </div>
  );
}

/** The one metallic gold phrase in a heading. */
function Gold({ children }: { children: React.ReactNode }) {
  return <span className={theme.gold}>{children}</span>;
}

/** A full-bleed chrome rule between major sections. Decorative. */
function MetalDivider() {
  return <div aria-hidden="true" className="rule-chrome-t h-px" />;
}

const textLink =
  "inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink";

/** Same cream Ferrari as /referral. 3840x5120: full-bleed at 2x without upscaling. */
const heroBackground = allGalleryImages.find((image) =>
  image.src.endsWith("ferrari-hero-2.jpeg"),
);

const heroEyebrow =
  "text-xs font-semibold uppercase tracking-[0.32em] text-[var(--gold-text)]";

/**
 * Full-bleed hero in the /referral treatment: photo background with a
 * directional scrim, left-aligned type, metallic gold phrase. The photo
 * carousel follows as the first section below.
 */
function Hero() {
  return (
    <section
      className={`${heroStyles.hero} relative -mt-24 flex min-h-[50svh] items-start overflow-hidden sm:-mt-32`}
    >
      {heroBackground ? (
        <Image
          src={heroBackground.src}
          alt="Cream Ferrari with a deep gloss finish after a Royal Rinse mobile detail in a customer's driveway"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[62%_58%]"
        />
      ) : null}
      {/* Directional scrim: darkest bottom-left, where the type sits. Held
          dark further right than /referral's, because this headline runs
          wider and crosses the car. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,19,22,0.94)_0%,rgba(17,19,22,0.86)_45%,rgba(17,19,22,0.6)_72%,rgba(17,19,22,0.3)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(17,19,22,0.96)_0%,rgba(17,19,22,0.55)_35%,rgba(17,19,22,0)_65%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[rgba(17,19,22,0.7)] to-transparent"
      />
      {/* Below xl the type sits over the car itself, so the photo is held
          down further to keep the gold phrase above contrast minimums. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(17,19,22,0.66)] sm:bg-[rgba(17,19,22,0.5)] xl:hidden"
      />

      {/* Seam fade: resolves the bottom edge into #111316, the exact color the
          carousel section below starts on, so hero and carousel read as one
          continuous dark surface. Sits below all hero text. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#111316]"
      />

      {/* Shorter hero with the type anchored high, so the top of the photo
          carousel below peeks above the fold. */}
      <Container className="relative z-10 pb-3 pt-[108px] sm:pb-4 sm:pt-[140px]">
        <div className="max-w-5xl">
          <p className={`${heroEyebrow} ${heroStyles.rise}`}>{SERVICE_AREA_SHORT}</p>

          <h1 className="mt-4 font-display text-[3.1rem] font-bold leading-[0.92] tracking-[-0.03em] text-[#f2f4f6] sm:text-[4.75rem] lg:text-[6rem]">
            <span className={`block ${heroStyles.rise}`}>
              A{" "}
              <span className={`${heroStyles.metal} ${heroStyles.goldPhrase}`}>showroom</span>{" "}
              <span className={`${heroStyles.metal} ${heroStyles.goldPhrase}`}>finish,</span>
            </span>
            <span className={`block ${heroStyles.rise}`}>in your driveway.</span>
          </h1>

          {/* Not animated: text that starts at opacity 0 is not an LCP
              candidate, and the full-bleed photo is ignored as a background,
              so this line is what LCP measures. */}
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#dfe3e8] sm:text-xl">
            {site.tagline}
          </p>

          <div className={`mt-5 flex gap-3 ${heroStyles.riseLate}`}>
            <a href={telHref} className={heroStyles.goldButton}>
              Call {site.phone}
            </a>
            <BookNowButton variant="ghost" className={heroStyles.pill} />
          </div>

          <div className={`mt-4 ${heroStyles.riseLate}`}>
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-1.5">
              {trustChips.map((chip) => (
                <li
                  key={chip}
                  className="flex items-center gap-2 text-sm text-[#dfe3e8]"
                >
                  <Icon name="check" className="h-4 w-4 text-[var(--gold-text)]" />
                  {chip}
                </li>
              ))}
            </ul>
            {/* Review badge, then the Instagram follow link. Instagram has no
                reviews, so it stays a separate link set apart by a divider. */}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
              {/* !justify-start: left-aligned like the rest of this hero when
                  the badge wraps on mobile (it centers by default). */}
              <ReviewPlatformsBadge className="text-chrome !justify-start" />
              <span aria-hidden="true" className="hidden h-6 w-px bg-hairline md:block" />
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Royal Rinse on Instagram, opens in a new tab"
                className="group/brand flex items-center gap-2.5 rounded-full text-sm font-medium text-[#dfe3e8] transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                <BrandChip size="lg">
                  <InstagramMark
                    gradientId="rr-instagram-gradient-hero"
                    className={brandChipSizes.lg.mark}
                  />
                </BrandChip>
                Follow our work
              </a>
            </div>
          </div>
        </div>
      </Container>

    </section>
  );
}

/** The photo carousel, now the first section below the hero. */
function RecentWork() {
  return (
    <div id="recent-work" className="scroll-mt-24">
      <HeroCarousel />
    </div>
  );
}

function TrustBar() {
  return (
    <div className="metal-strong metal-dim metal-edge-b">
      <Container>
        <div className="py-6">
          <ul className="grid grid-cols-2 items-start gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
            {trustBadges.map((badge) => (
              <li
                key={badge.label}
                className="flex items-start justify-center gap-2 text-center"
              >
                <Icon
                  name="shield"
                  className="mt-0.5 h-4 w-4 shrink-0 text-chrome"
                />
                <span className="min-w-0">
                  <span className="text-metal block text-sm font-semibold">
                    {badge.label}
                  </span>
                  {badge.detail ? (
                    // The credential itself: muted and slightly smaller so it
                    // reads as detail, not another headline claim.
                    <span className="mt-0.5 block break-words font-mono text-[11px] tracking-tight text-muted">
                      {badge.detail}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}

            {/* Reviews stat: platform logos, cross-platform total, Google rating. */}
            <li className="col-span-2 flex items-start justify-center text-center sm:col-span-1">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
              >
                <ReviewPlatformLogos size="sm" />
                <span className="min-w-0">
                  <span className="block whitespace-nowrap text-sm font-medium text-chrome transition-colors group-hover:text-ink">
                    {TOTAL_REVIEW_COUNT_DISPLAY} Five-Star Reviews
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

          {/* Its own row: squeezed into the badge grid it wrapped and crowded
              the other marks. It's an offer, not just another trust mark. */}
          <div className="mt-5 flex justify-center border-t border-hairline pt-5">
            <MilitaryDiscountBadge size="sm" />
          </div>
        </div>
      </Container>
    </div>
  );
}

function VehiclesStrip() {
  return (
    <div className="rule-chrome-b">
      <Container>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-5 text-center text-sm text-muted">
          <span className="font-semibold uppercase tracking-[0.18em] text-[var(--gold-text)]">
            Vehicles we detail
          </span>
          {vehicleTypes.map((type) => (
            <span key={type} className="flex items-center gap-3">
              <span aria-hidden="true" className="text-chrome/60">
                ·
              </span>
              {type}
            </span>
          ))}
        </p>
      </Container>
    </div>
  );
}

function ComeToYou() {
  return (
    <Section className="!py-16 sm:!py-20">
      <div className="grid items-center gap-12 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-[22rem] lg:mx-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl edge-chrome shadow-2xl">
            <Image
              src={rigImage.src}
              alt={rigImage.alt}
              fill
              loading="lazy"
              quality={85}
              // Fixed 22rem frame on every breakpoint; under the 768px source.
              sizes="352px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <HomeHeading
            eyebrow="Mobile detailing"
            title={<>We <Gold>come to you</Gold></>}
            intro={`Our rig is a complete detail bay on wheels. We pull up, set up, and do the work right where your car is parked. Serving ${SERVICE_AREA_PRIORITY}.`}
          />

          <ul className="mt-8 space-y-3">
            {mobilePoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-sm leading-relaxed text-chrome"
              >
                <Icon
                  name="check"
                  className="mt-0.5 h-4 w-4 shrink-0 text-chrome"
                />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/service-area" variant="secondary">
              See where we travel
            </ButtonLink>
            {deionizedPost ? (
              <Link href={`/blog/${deionizedPost.slug}`} className={textLink}>
                Why deionized water matters
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Services() {
  return (
    <Band slant>
      {/* Tighter than before: the slant this padding made room for is gone. */}
      <Section className="!py-16 sm:!py-20">
        <Reveal>
          <HomeHeading
            eyebrow="What we do"
            title={<>Detailing services, <Gold>delivered to you</Gold></>}
            intro="Every service runs off our fully self-contained mobile rig: no shop visit, no drop-off."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 140}>
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

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/packages" variant="ghost" className={theme.goldButton}>
            Compare all packages
          </ButtonLink>
          <BookNowButton variant="secondary" />
        </div>

        <p className="mt-6 text-sm text-muted">
          Also offering{" "}
          <Link
            href="/services#add-ons"
            className="font-semibold text-accent hover:text-ink"
          >
            add-ons
          </Link>
          ,{" "}
          <Link
            href="/services/maintenance-plans"
            className="font-semibold text-accent hover:text-ink"
          >
            maintenance plans
          </Link>
          , and{" "}
          <Link
            href="/services/rv-detailing"
            className="font-semibold text-accent hover:text-ink"
          >
            RV detailing
          </Link>
          .
        </p>
      </Section>
    </Band>
  );
}

function CeramicFeature() {
  return (
    <Section className="!pb-14 !pt-24 sm:!pb-16 sm:!pt-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className={theme.eyebrow}>Our flagship service</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-metal sm:text-5xl">
            <Gold>{ceramicCoating.name.split(" ")[0]}</Gold>
            {ceramicCoating.name.split(" ").length > 1
              ? ` ${ceramicCoating.name.split(" ").slice(1).join(" ")}`
              : null}
          </h2>
          <p className="mt-4 text-lg text-chrome">{ceramicCoating.tagline}</p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {ceramicCoating.intro}
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {ceramicCoating.levels.map((level) => (
              <li
                key={level.name}
                className="flex gap-3 rounded-xl border border-hairline bg-surface px-4 py-3 text-sm font-medium text-chrome"
              >
                <Icon
                  name="shield"
                  className="mt-0.5 h-4 w-4 shrink-0 text-chrome"
                />
                {level.name}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-chrome">
            <span className="font-semibold text-ink">Warranty:</span>{" "}
            {CERAMIC_WARRANTY_TRUST}{" "}
            <Link
              href={CERAMIC_WARRANTY_PATH}
              className="font-semibold text-accent transition-colors hover:text-ink"
            >
              See warranty details
            </Link>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={`/services/${ceramicCoating.slug}`}
              variant="ghost"
              className={theme.goldButton}
            >
              Explore ceramic coating
            </ButtonLink>
            <ButtonAnchor href={telHref} variant="secondary">
              Call for a coating quote
            </ButtonAnchor>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl edge-chrome shadow-2xl">
            <Image
              src={ceramicImage.src}
              alt={ceramicImage.alt}
              fill
              loading="lazy"
              quality={85}
              // Half the 72rem container less padding and gutter on lg.
              sizes="(min-width: 1024px) 512px, 92vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Specialization() {
  return (
    // Mirror of the ceramic section above it: photos left, copy right, and a
    // tight top so the two read as one zig-zag rather than two stacked blocks.
    <Section className="!pb-20 !pt-0 sm:!pb-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ul className="order-2 grid grid-cols-2 gap-4 lg:order-1">
          {exoticThumbs.map((image, i) => (
            <li key={image.src} className={i % 2 === 1 ? "lg:mt-10" : ""}>
              <Reveal delay={i * 140}>
                <Link
                  href="/gallery"
                  className="group relative block aspect-[3/4] overflow-hidden rounded-xl edge-chrome shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    quality={85}
                    // 2-up in half the 72rem container on lg, 2-up below.
                    sizes="(min-width: 1152px) 260px, (min-width: 1024px) 23vw, 46vw"
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="order-1 lg:order-2">
          <HomeHeading
            eyebrow="Luxury, exotic and classic"
            title={<>Cars that need <Gold>a different approach</Gold></>}
            intro="We regularly care for Porsche, Ferrari, Corvette, Mercedes, Tesla and classic collector cars. Single stage paint, delicate trim, and irreplaceable interiors get a different approach."
          />

          <div className="mt-8 flex flex-col items-start gap-4">
            <ButtonLink href="/gallery" variant="secondary">
              See the full gallery
            </ButtonLink>
            {specialtyPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={textLink}
              >
                {post.slug.startsWith("classic")
                  ? "How we care for classics"
                  : "Detailing luxury and exotic cars"}
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    // Asymmetric: the heading holds the narrow left column while the steps
    // run down the wide right one, divided by chrome rules instead of boxed
    // into three equal cards.
    <Section className="!py-20 sm:!py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
        <Reveal>
          <HomeHeading
            eyebrow="How it works"
            title={<>Three steps. <Gold>Zero hassle.</Gold></>}
          />
        </Reveal>

        <ol>
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.number}
              delay={i * 140}
              className="rule-chrome-t grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 py-8 first:pt-0 first:before:hidden sm:grid-cols-[6.5rem_minmax(0,1fr)]"
            >
              <span className={`${theme.gold} ${theme.numeral} font-display`}>
                {step.number}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function WhyRoyalRinse() {
  return (
    // Reverse of How It Works: cards take the wide left, heading the narrow
    // right. The band itself is cut on the diagonal.
    <Band slant>
      <Section className="!py-16 sm:!py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
          <div className="order-2 grid gap-6 sm:grid-cols-2 lg:order-1">
            {valueProps.map((prop, i) => (
              <Reveal key={prop.title} delay={(i % 2) * 140}>
                <Card className="flex h-full gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-chrome/10 text-chrome">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">
                      {prop.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {prop.description}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal className="order-1 lg:order-2 lg:pt-2">
            <HomeHeading
              eyebrow="Why Royal Rinse"
              title={<>The care a car deserves, <Gold>without the errand</Gold></>}
            />
          </Reveal>
        </div>
      </Section>
    </Band>
  );
}

function AddOnsShowcase() {
  return (
    <Section className="!py-20 sm:!py-24">
      <Reveal>
        <HomeHeading
          eyebrow="Add-ons"
          title={<>Bolt on exactly <Gold>what your vehicle needs</Gold></>}
          intro="Any of these can be added to a package, from the engine bay to the wheels."
        />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* The add-ons we have photos of lead, as proof of the work. */}
        <ul className="grid grid-cols-2 items-start gap-4 sm:gap-6">
          {photoAddOns.map((addOn, i) => (
            <li key={addOn.name}>
              <Reveal delay={i * 140}>
                <figure className="overflow-hidden rounded-xl surface-machined edge-chrome shadow-card">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={addOn.image.src}
                      alt={addOn.image.alt}
                      fill
                      loading="lazy"
                      quality={85}
                      // Two-up inside half the container on lg, two-up below.
                      sizes="(min-width: 1024px) 260px, 46vw"
                      className="object-cover object-[center_65%]"
                    />
                  </div>
                  <figcaption className="p-4">
                    <h3 className="font-display text-base font-bold text-ink">
                      {addOn.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {addOn.desc}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={120}>
          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {textAddOns.map((addOn) => (
              <li key={addOn.name} className="flex gap-3">
                <Icon
                  name="check"
                  className="mt-1 h-4 w-4 shrink-0 text-chrome"
                />
                <p className="text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-ink">{addOn.name}</span>:{" "}
                  {addOn.desc}
                </p>
              </li>
            ))}
          </ul>

          <Link href="/services" className={`mt-8 ${textLink}`}>
            See all services and add-ons
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}

function Gallery() {
  return (
    <Section className="!py-16 sm:!py-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <HomeHeading
          eyebrow="Gallery"
          title={<>Recent <Gold>work</Gold></>}
          intro="Real results from real driveways across Riverside and San Diego County."
        />
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink"
        >
          View full gallery
          <span aria-hidden="true">→</span>
        </Link>
      </Reveal>

      {/* Masonry, not a forced 4:3 crop: the sources are portrait and a
          landscape tile threw away ~58% of every frame. */}
      <Reveal delay={140}>
        <LightboxGrid
          images={homeGalleryShots}
          variant="masonry"
          className="mt-14 columns-2 gap-4 lg:columns-3"
          sizes="(max-width: 1023px) 50vw, 33vw"
        />
      </Reveal>
    </Section>
  );
}

function Testimonials() {
  return (
    <Band>
      <Section className="!py-24 sm:!py-28">
        <Reveal className="max-w-2xl">
          <p className={theme.eyebrow}>Reviews</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-metal sm:text-5xl">
            <Gold>Loved</Gold> on Google
          </h2>
          <GoogleRatingSummary className="mt-5" />
          <p className="mt-4 text-base leading-relaxed text-muted">
            {REVIEW_COUNT_DISPLAY} five-star Google reviews from real customers.
            Here are a few of our favorites. Read them all on our verified Google
            Business Profile.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredReviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 140}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <GoogleReviewsLink variant="button">
            See all reviews on Google
          </GoogleReviewsLink>
        </div>
      </Section>
    </Band>
  );
}

function ServiceAreaTeaser() {
  return (
    <Section className="!py-16 sm:!py-20">
      <Reveal>
        <HomeHeading
          eyebrow="Service area"
          title={<>Based in <Gold>Menifee</Gold>, we come to you</>}
          intro="Royal Rinse is based in Menifee and provides mobile auto detailing in Menifee, Temecula, Murrieta, Riverside, and San Diego, and the surrounding areas of Riverside County and San Diego County. Don't see your neighborhood? Just ask."
        />
      </Reveal>

      {/* The five priority markets, each linking to its own page. */}
      <Reveal delay={140}>
        <ul className="mt-8 flex flex-wrap gap-3">
          {featuredCities.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/service-area/${city.slug}`}
                className="inline-flex items-center gap-1.5 btn-metal rounded-xl px-4 py-2.5 text-sm font-semibold text-ink"
              >
                Detailing in {city.name}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/service-area"
              className="inline-flex items-center rounded-xl border border-hairline bg-surface px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:border-chrome/50 hover:text-ink"
            >
              All service areas<span aria-hidden="true">&nbsp;→</span>
            </Link>
          </li>
        </ul>
      </Reveal>
    </Section>
  );
}

function MaintenancePlans() {
  return (
    <Section className="!py-24 sm:!py-32">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <HomeHeading
            eyebrow={maintenancePlan.name}
            title={<>Keep it <Gold>looking new</Gold></>}
            intro={maintenancePlan.intro}
          />

          <ul
            className="mt-8 flex flex-wrap gap-3"
            aria-label="Available schedules"
          >
            {planSchedules.map((schedule) => (
              <li
                key={schedule}
                className="btn-metal inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-ink hover:!bg-graphite"
              >
                {schedule}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonAnchor href={telHref} variant="ghost" className={theme.goldButton}>
              Call {site.phone}
            </ButtonAnchor>
            <BookNowButton variant="secondary" />
          </div>

          <Link
            href={`/services/${maintenancePlan.slug}`}
            className={`mt-6 ${textLink}`}
          >
            How maintenance plans work
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <Reveal delay={100}>
          <Card>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold-text)]">
              Every visit includes
            </h3>
            <ul className="mt-5 space-y-3">
              {maintenancePlan.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-muted"
                >
                  <Icon
                    name="check"
                    className="mt-0.5 h-4 w-4 shrink-0 text-chrome"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-hairline pt-5 text-sm leading-relaxed text-chrome">
              {maintenancePlan.tagline} Quoted per vehicle, on the schedule that
              suits how you drive.
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

function FromTheBlog() {
  if (latestPosts.length === 0) return null;

  return (
    <Band>
      <Section className="!py-20 sm:!py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <HomeHeading
            eyebrow="From the blog"
            title={<>Detailing, <Gold>explained</Gold></>}
            intro="Straight answers on paint, protection, and upkeep for Southern California drivers."
          />
          <Link href="/blog" className={textLink}>
            Read the blog
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 140} className="h-full">
                <BlogCard post={post} headingAs="h3" />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </Band>
  );
}

/**
 * Accordion built on native details/summary: no client JS, keyboard support
 * for free, and the answers stay in the HTML for search and answer engines.
 * The full list lives on /faq.
 */
function HomeFaq() {
  return (
    <Section className="!py-20 sm:!py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
        <Reveal>
          <HomeHeading
            eyebrow="Good to know"
            title={<>Common <Gold>questions</Gold></>}
            intro="Quick answers about how mobile detailing with Royal Rinse works."
          />
          <Link href="/faq" className={`mt-8 ${textLink}`}>
            See all FAQs
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <div className="divide-y divide-hairline border-y border-hairline">
            {homeFaqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-base font-bold text-ink transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-lg [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full btn-metal text-chrome motion-safe:transition-transform motion-safe:duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-12 text-sm leading-relaxed text-muted sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    // Full-bleed steel band rather than a contained card: the page ends on
    // the widest metal surface on it.
    <section className={`${theme.closing} metal-edge-t`}>
      <Container className="py-20 text-center sm:py-28">
        <Reveal>
          <h2 className="text-metal font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Ready for a <Gold>showroom finish</Gold>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-chrome">
            Book online in under a minute, or call or text and we&rsquo;ll find
            a time that works.
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm font-semibold text-ink">
            Same-week appointments available. Reserve yours before they fill.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonAnchor href={telHref} variant="ghost" className={theme.goldButton}>
              Call {site.phone}
            </ButtonAnchor>
            <ButtonAnchor href={smsHref} variant="secondary">
              Text us
            </ButtonAnchor>
            {/* Royal blue: the one blue action, for contrast against the gold. */}
            <BookNowButton />
          </div>
          <Link
            href="/offers"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink"
          >
            See current offers
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />

      <Hero />
      <RecentWork />
      <div className={theme.theme}>
        <TrustBar />
        <VehiclesStrip />
        <ComeToYou />
        <Services />
        <CeramicFeature />
        <Specialization />
        <MetalDivider />
        <HowItWorks />
        <WhyRoyalRinse />
        <AddOnsShowcase />

        <div className={theme.bandBlend}>
          <PhotoBand
            image={showroomBandImage}
            headline="Showroom finish, every time."
            sub="The finish is in the parts most people skip: every vent, seam, and panel."
          />
        </div>

        <Gallery />
        <Testimonials />
        <ServiceAreaTeaser />
        <MetalDivider />
        <MaintenancePlans />
        <FromTheBlog />
        <HomeFaq />
        <FinalCta />
      </div>
    </>
  );
}
