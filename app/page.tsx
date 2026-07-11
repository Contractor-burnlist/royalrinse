import Image from "next/image";
import Link from "next/link";
import {
  serviceAreas,
  services,
  site,
  steps,
  telHref,
  testimonials,
  valueProps,
} from "@/lib/site";
import {
  exteriorGallery,
  featureVehicles,
  type GalleryImage,
} from "@/lib/gallery";
import { LightboxGrid } from "@/components/Lightbox";
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  Icon,
  Section,
  SectionHeading,
} from "@/components/ui";

const trustChips = ["Licensed & Insured", "Mobile — We Come To You", "5-Star Rated"];

const trustBadges = [
  "DLSE Licensed",
  "Fully Insured",
  "Mobile Service",
  "Satisfaction Guaranteed",
];

const heroShot = featureVehicles[1].exterior[1];

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
            <Eyebrow>Serving all of San Diego County</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              A showroom finish,
              <br />
              in your driveway.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted">{site.tagline}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={telHref}>Call {site.phone}</ButtonLink>
              <ButtonLink href="/book" variant="secondary">
                Book Now
              </ButtonLink>
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

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-hairline shadow-card lg:aspect-[5/4]">
            <Image
              src={heroShot.src}
              alt={heroShot.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function TrustBar() {
  return (
    <div className="border-b border-hairline bg-charcoal">
      <Container>
        <ul className="grid grid-cols-2 gap-y-4 py-6 sm:grid-cols-4">
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
        {services.map((service) => (
          <Card key={service.slug} className="flex flex-col">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal/15 text-royal">
              <Icon name={service.icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-ink">{service.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {service.description}
            </p>
            <p className="mt-4 text-sm font-semibold text-chrome">{site.price}</p>
            <Link
              href={`/services/${service.slug}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
            >
              Learn more
              <span aria-hidden="true">→</span>
            </Link>
          </Card>
        ))}
      </div>
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
          title="Serving San Diego County — we come to you"
          intro="If you're in the county, we can most likely get to you. Don't see your neighborhood? Just ask."
        />

        <ul className="mt-10 flex flex-wrap gap-3">
          {serviceAreas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/service-area/${area.slug}`}
                className="inline-flex rounded-xl border border-hairline bg-surface px-4 py-2 text-sm font-medium text-chrome transition-colors hover:border-royal hover:text-ink"
              >
                {area.name}
              </Link>
            </li>
          ))}
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
          intro="Real results from real San Diego driveways."
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
        <SectionHeading eyebrow="Reviews" title="What our customers say" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="flex h-full flex-col">
              <div className="flex gap-1 text-royal" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, star) => (
                  <svg
                    key={star}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <footer className="mt-5 border-t border-hairline pt-4">
                <p className="text-sm font-semibold text-ink">{testimonial.author}</p>
                <p className="text-xs text-muted">{testimonial.location}</p>
              </footer>
            </Card>
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
