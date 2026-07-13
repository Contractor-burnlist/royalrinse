import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PHONE_ARIA, site, telHref } from "@/lib/site";
import { allGalleryImages } from "@/lib/gallery";
import { BookNowButton } from "@/components/BookNowButton";
import { MilitaryDiscountBadge } from "@/components/MilitaryDiscountBadge";
import { ButtonAnchor, Card, Container, Eyebrow, Icon, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "About | Royal Rinse — Premium Mobile Detailing, Riverside & San Diego County",
  description:
    "About Royal Rinse — Southern California's premium mobile detailers. Founded on one idea: dealership-quality detailing that comes to you, anywhere in Riverside & San Diego County. Licensed, insured, and bonded.",
};

const whyRoyalRinse = [
  {
    icon: "car",
    title: "We come to you",
    description:
      "Home or office, your driveway becomes the detail bay. Our rig arrives fully self-contained — water, power, everything — so a professional detail costs you nothing but the walk to your window.",
  },
  {
    icon: "sparkle",
    title: "Meticulous by default",
    description:
      "The finish lives in the details most people skip: the vents, the seams, the door jambs, the badge edges. We work the whole vehicle, not just the parts you notice first.",
  },
  {
    icon: "shield",
    title: "Premium products, ceramic expertise",
    description:
      "Pro-grade equipment and premium chemistry, chosen for how they perform — not how they market. From ceramic spray waxes to multi-year coatings, we know what each finish needs.",
  },
  {
    icon: "check",
    title: "Licensed, insured & bonded",
    description:
      `Registered with the California DLSE under licence ${site.licenseNumber}. Your vehicle and your property are covered from the moment we arrive.`,
  },
];

/** A real photo from the gallery, used as the story section's image. */
const storyImage =
  allGalleryImages.find((image) => image.src.includes("vehicle-2-ext-2")) ??
  allGalleryImages[0];

function Hero() {
  return (
    <div className="border-b border-hairline bg-charcoal">
      <Container className="py-16 sm:py-20">
        <Eyebrow>About</Eyebrow>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          About Royal Rinse
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-chrome">
          Southern California&rsquo;s premium detailers — and we come to you.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          A showroom finish shouldn&rsquo;t cost you a day. We bring the whole shop to
          your driveway, do the work properly, and leave you with a car that looks like
          it just rolled off the lot.
        </p>
      </Container>
    </div>
  );
}

function OurStory() {
  return (
    <Section>
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Built on one simple idea
          </h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
            <p>
              Royal Rinse started about three years ago with a simple idea:
              dealership-quality detailing shouldn&rsquo;t require a dealership visit.
              No drop-off, no shuttle, no afternoon lost in a waiting room — just the
              standard of work you&rsquo;d expect from the best shop in town, delivered
              to wherever your car happens to be parked.
            </p>
            <p>
              It began with a single detailer, a rig, and an unreasonable amount of care
              per vehicle. Word travelled the way it does in this business — one gleaming
              car in one driveway at a time. As demand grew, we partnered with skilled,
              like-minded detailers who hold the same standard, so we could expand our
              coverage across Riverside &amp; San Diego County without ever thinning the
              quality that got us here.
            </p>
            <p>
              That&rsquo;s the whole model: convenience without compromise. A full
              professional setup arrives at your home or office, and the only thing you
              have to do is hand over the keys.
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-chrome/20 shadow-2xl">
          <Image
            src={storyImage.src}
            alt={storyImage.alt}
            fill
            loading="lazy"
            quality={90}
            // Matches the real column width — no upscaling.
            sizes="(max-width: 1024px) 92vw, 46vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}

function WhyRoyalRinse() {
  return (
    <div className="border-y border-hairline bg-charcoal">
      <Section className="!py-20 sm:!py-24">
        <Eyebrow>Why Royal Rinse</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          The care a car deserves, without the errand
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {whyRoyalRinse.map((prop) => (
            <Card key={prop.title} className="flex gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-royal/15 text-royal">
                <Icon name={prop.icon} className="h-5 w-5" />
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
          ))}
        </div>
      </Section>
    </div>
  );
}

function OurStandard() {
  return (
    <Section>
      <div className="max-w-3xl">
        <Eyebrow>Our standard</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Every vehicle gets the same obsession
        </h2>

        <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
          <p>
            A daily driver with a car seat in the back and a weekend classic with
            original chrome get the same hands, the same products, and the same
            unhurried attention. We&rsquo;ve detailed lifted trucks caked in trail dust
            and exotics that have never seen rain — and the standard doesn&rsquo;t move.
          </p>
          <p>
            That means honest work: no shortcuts on prep, no hiding swirls under a coat
            of gloss, no rushing the parts nobody photographs. Whether it&rsquo;s a
            maintenance wash to keep a car sharp between details, a full interior
            restoration, or a multi-year ceramic coating, the job gets the time it
            actually needs.
          </p>
          <p>
            We think that&rsquo;s what premium really means. Not a price tag — a
            standard you can see in the reflection.
          </p>
        </div>

        {/* Trust line */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-hairline pt-8">
          <span className="flex items-center gap-2 text-sm text-chrome">
            <Icon name="shield" className="h-4 w-4 shrink-0 text-royal" />
            Licensed &amp; Insured
            <span className="font-mono text-[11px] text-muted">
              CA DLSE {site.licenseNumber}
            </span>
          </span>

          <MilitaryDiscountBadge size="sm" />

          <span className="flex items-center gap-2 text-sm text-chrome">
            <Icon name="sparkle" className="h-4 w-4 shrink-0 text-royal" />
            5-Star Rated
          </span>
        </div>
      </div>
    </Section>
  );
}

function AboutCta() {
  return (
    <Section className="!pt-0">
      <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface px-6 py-16 text-center shadow-card sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-royal/25 blur-3xl"
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Ready for a showroom finish?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">
            Let&rsquo;s bring it to your driveway.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonAnchor href={telHref} aria-label={PHONE_ARIA}>
              Call {site.phone}
            </ButtonAnchor>
            <BookNowButton variant="secondary" />
          </div>

          <p className="mt-8 text-sm text-muted">
            Serving Riverside &amp; San Diego County —{" "}
            <Link
              href="/service-area"
              className="font-semibold text-royal transition-colors hover:text-chrome"
            >
              see if we cover your city
            </Link>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Hero />
      <OurStory />
      <WhyRoyalRinse />
      <OurStandard />
      <AboutCta />
    </>
  );
}
