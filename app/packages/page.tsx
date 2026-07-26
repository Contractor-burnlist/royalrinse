import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ceramicCoating, quoteNote, tiers } from "@/lib/services";
import { packageImage, packagesHeroImage } from "@/lib/serviceImages";
import { PHONE_ARIA, site, telHref } from "@/lib/site";
import { BookNowButton } from "@/components/BookNowButton";
import {
  PackagesCtaSentinel,
  PackagesMobileCta,
  PACKAGES_CTA_SENTINEL,
} from "@/components/PackagesMobileCta";
import { Reveal } from "@/components/Reveal";
import { ButtonAnchor, Container, Eyebrow, Icon, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Detailing Packages | Royal Rinse",
  description:
    "Royal Rinse mobile detailing packages — Bronze, Silver, Gold, Platinum, and Diamond, plus ceramic coating. We come to you across Riverside & San Diego County.",
};

/** Filled pips up to the tier's rank, hollow after — makes the ladder scannable. */
function TierRank({ rank }: { rank: number }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex gap-1"
        role="img"
        aria-label={`Level ${rank} of ${tiers.length}`}
      >
        {Array.from({ length: tiers.length }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-5 rounded-full ${
              i < rank ? "bg-royal" : "bg-chrome/20"
            }`}
          />
        ))}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Level {rank}
      </span>
    </div>
  );
}

/** Repeated trust reassurance, always sat next to a CTA. */
function TrustLine({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-muted ${className}`}
    >
      <span className="text-chrome">Licensed &amp; Insured</span>
      <span aria-hidden="true" className="text-royal">
        ·
      </span>
      <span className="text-chrome">10% Military Discount</span>
      <span aria-hidden="true" className="text-royal">
        ·
      </span>
      <span className="text-chrome">Mobile — We Come To You</span>
    </p>
  );
}

function CtaRow({ label }: { label: string }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <BookNowButton>{label}</BookNowButton>
      <ButtonAnchor href={telHref} aria-label={PHONE_ARIA} variant="secondary">
        Call for Quote
      </ButtonAnchor>
    </div>
  );
}

function TierCard({ tier, rank }: { tier: (typeof tiers)[number]; rank: number }) {
  const isTop = rank === tiers.length;
  const image = packageImage(tier.slug);

  const article = (
    <article
      className={`group relative overflow-hidden rounded-xl bg-surface shadow-card motion-safe:transition-all motion-safe:duration-500 motion-safe:hover:-translate-y-1 hover:shadow-glow ${
        isTop ? "" : "border border-hairline hover:border-royal/40"
      }`}
    >
      {/*
        Photo. On mobile it's a top band (content flows below); on lg it bleeds
        in from the right behind the content, faded to `surface` on the text
        side so copy stays legible. sizes match the real slot — ~680px on lg,
        full-width below — so nothing upscales past its source.
      */}
      <div className="relative h-44 w-full overflow-hidden sm:h-52 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-3/5">
        <Image
          src={image.src}
          alt=""
          aria-hidden="true"
          fill
          loading="lazy"
          quality={85}
          sizes="(min-width: 1024px) 680px, 100vw"
          className="object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105"
        />
        {/* Mobile: fade the band's bottom into the content. lg: fade the left
            edge into surface so the overlaid copy reads cleanly. */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/45 to-transparent lg:bg-gradient-to-r lg:from-surface lg:via-surface/85 lg:to-surface/25" />
      </div>

      <div className="relative z-10 p-6 sm:p-8 lg:w-[58%]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <TierRank rank={rank} />
          {isTop ? (
            <span className="inline-flex rounded-full bg-royal px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink">
              Most Complete
            </span>
          ) : null}
        </div>

        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink">
          {tier.name}
        </h2>
        <p className="mt-1.5 text-base text-chrome">{tier.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{tier.intro}</p>

        <div className="mt-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-chrome">
            What&rsquo;s included
          </h3>
          <ul className="mt-4 space-y-2.5">
            {tier.includes.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-muted"
              >
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-royal" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {tier.variants ? (
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-chrome">
              Available as
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {tier.variants.map((variant) => (
                <li
                  key={variant}
                  className="inline-flex rounded-xl border border-hairline bg-charcoal px-3.5 py-1.5 text-sm font-medium text-chrome"
                >
                  {variant}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {tier.addOnNote ? (
          <p className="mt-6 text-xs leading-relaxed text-muted">{tier.addOnNote}</p>
        ) : null}

        <CtaRow label="Book This Package" />

        <Link
          href={`/services/${tier.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition-colors hover:text-royal"
        >
          Learn more about {tier.name}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );

  if (!isTop) return article;

  /*
    Diamond (flagship) premium accent: a slow-rotating conic gradient sits
    behind the card and a 1.5px inset reveals it as an animated gradient
    border. The spin is behind motion-safe:, so reduced-motion users see a
    static gradient edge instead of movement.
  */
  return (
    <div className="relative overflow-hidden rounded-[calc(0.75rem+1.5px)] p-[1.5px] shadow-glow">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(29,78,216,0.75)_55deg,transparent_130deg,transparent_230deg,rgba(201,206,214,0.55)_300deg,transparent_360deg)] motion-safe:animate-spin [animation-duration:9s]" />
      </div>
      <div className="relative">{article}</div>
    </div>
  );
}

/** Reusable CTA band with a royal glow and a trust line. */
function CtaBand({
  heading,
  body,
  note,
  bookLabel = "Book Now",
}: {
  heading: string;
  body: string;
  note?: string;
  bookLabel?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-hairline bg-surface px-6 py-14 text-center shadow-card sm:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-royal/25 blur-3xl"
      />
      <div className="relative">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted">{body}</p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <BookNowButton>{bookLabel}</BookNowButton>
          <ButtonAnchor href={telHref} aria-label={PHONE_ARIA} variant="secondary">
            Call {site.phone}
          </ButtonAnchor>
        </div>

        <TrustLine className="mt-8" />

        {note ? (
          <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-muted">
            {note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <>
      {/* Hero banner: a glossy exterior behind the heading, on a dark scrim. */}
      <section className="relative overflow-hidden border-b border-hairline">
        <Image
          src={packagesHeroImage.src}
          alt=""
          aria-hidden="true"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Scrims: darken overall, then deepen the bottom where the text sits. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-base via-base/80 to-base/55"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-base/30" />
        <Container className="relative py-20 sm:py-28">
          <Eyebrow>Packages</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-5xl">
            Our Detailing Packages
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-chrome drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
            From an essential refresh to a full showroom reset — pick the level
            that fits. We come to you across Riverside &amp; San Diego County.
          </p>
          <TrustLine className="mt-6 !justify-start" />
        </Container>
      </section>

      <Section className="!pb-0">
        <ol className="space-y-8">
          {tiers.map((tier, index) => (
            <li key={tier.slug}>
              {/* Staggered so the ladder cascades in one card after another. */}
              <Reveal delay={index * 90}>
                <TierCard tier={tier} rank={index + 1} />
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Mid-page CTA: catches readers who've scanned the ladder and stalled. */}
      <Section>
        <Reveal>
          <CtaBand
            heading="Not sure which package? We'll help you choose."
            body="Tell us your vehicle and what you're after — we'll recommend the right level and give you a straight quote. No pressure."
            bookLabel="Book Now"
          />
        </Reveal>
      </Section>

      {/* Ceramic coating — its own section with a glossy photo. */}
      <Section className="!pt-0">
        <Reveal>
          <div className="group relative overflow-hidden rounded-xl border border-hairline bg-surface shadow-card">
            <div className="relative h-44 w-full overflow-hidden sm:h-52 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2">
              <Image
                src={packageImage(ceramicCoating.slug).src}
                alt=""
                aria-hidden="true"
                fill
                loading="lazy"
                quality={85}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/45 to-transparent lg:bg-gradient-to-r lg:from-surface lg:via-surface/85 lg:to-surface/25" />
            </div>

            <div className="relative z-10 p-6 sm:p-8 lg:w-[58%]">
              <Eyebrow>Protection</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {ceramicCoating.name}
              </h2>
              <p className="mt-1.5 text-base text-chrome">{ceramicCoating.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {ceramicCoating.intro}
              </p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {ceramicCoating.levels.map((level) => (
                  <li key={level.name}>
                    <div className="h-full rounded-xl border border-hairline bg-charcoal/60 p-4">
                      <h3 className="font-display text-sm font-bold text-ink">
                        {level.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted">
                        {level.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <CtaRow label="Book Ceramic Coating" />

              <Link
                href={`/services/${ceramicCoating.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition-colors hover:text-royal"
              >
                Learn more about {ceramicCoating.name}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Bottom CTA band. The sentinel sits at its top so the floating mobile
          bar retires once this band (with its own buttons) is on screen. */}
      <Section className="!pt-0">
        <PackagesCtaSentinel />
        <Reveal>
          <CtaBand
            heading="Ready to book?"
            body="Tell us your vehicle and what you're after — we'll recommend the right package and come to you."
            note={quoteNote}
          />
        </Reveal>
      </Section>

      <PackagesMobileCta sentinelId={PACKAGES_CTA_SENTINEL} />
    </>
  );
}
