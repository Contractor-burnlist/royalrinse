import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ceramicCoating, quoteNote, tiers } from "@/lib/services";
import { serviceImage } from "@/lib/serviceImages";
import { PHONE_ARIA, site, telHref } from "@/lib/site";
import { BookNowButton } from "@/components/BookNowButton";
import { Reveal } from "@/components/Reveal";
import { ButtonAnchor, Card, Container, Eyebrow, Icon, Section } from "@/components/ui";

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

function CtaRow({ label }: { label: string }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <BookNowButton>{label}</BookNowButton>
      <ButtonAnchor href={telHref} aria-label={PHONE_ARIA} variant="secondary">
        Call {site.phone}
      </ButtonAnchor>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <>
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Packages</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Our Detailing Packages
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            From an essential refresh to a full showroom reset — pick the level that
            fits. We come to you across Riverside &amp; San Diego County.
          </p>
        </Container>
      </div>

      <Section className="!pb-0">
        <ol className="space-y-8">
          {tiers.map((tier, index) => {
            const rank = index + 1;
            const isTop = rank === tiers.length;

            return (
              <li key={tier.slug}>
                <Reveal>
                <Card
                  className={`relative overflow-hidden ${
                    isTop ? "border-royal/50 shadow-glow" : ""
                  }`}
                >
                  {/* Photo bleeds in from the right, fading into the card. */}
                  <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
                    <Image
                      src={serviceImage(tier.slug).src}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/40" />
                  </div>

                  <div className="relative p-2 sm:p-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
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
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                      {tier.intro}
                    </p>

                    <div className="mt-8 grid gap-8 lg:grid-cols-2">
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-chrome">
                          What&rsquo;s included
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                          {tier.includes.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3 text-sm leading-relaxed text-muted"
                            >
                              <Icon
                                name="check"
                                className="mt-0.5 h-4 w-4 shrink-0 text-royal"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-6">
                        {tier.variants ? (
                          <div>
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
                          <p className="text-xs leading-relaxed text-muted">
                            {tier.addOnNote}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <CtaRow label="Book This Package" />

                    <Link
                      href={`/services/${tier.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition-colors hover:text-royal"
                    >
                      Learn more about {tier.name}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </Card>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section>
        <div className="border-t border-hairline pt-16">
          <Eyebrow>Protection</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {ceramicCoating.name}
          </h2>
          <p className="mt-1.5 text-base text-chrome">{ceramicCoating.tagline}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            {ceramicCoating.intro}
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {ceramicCoating.levels.map((level) => (
              <li key={level.name}>
                <Card className="h-full">
                  <h3 className="font-display text-base font-bold text-ink">
                    {level.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{level.desc}</p>
                </Card>
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
      </Section>

      <Section className="!pt-0">
        <div className="relative overflow-hidden rounded-xl border border-hairline bg-surface px-6 py-14 text-center shadow-card sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-royal/25 blur-3xl"
          />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Not sure which to pick?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted">
              Tell us your vehicle and what you&rsquo;re after — we&rsquo;ll recommend the
              right package.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <BookNowButton />
              <ButtonAnchor href={telHref} aria-label={PHONE_ARIA} variant="secondary">
                Call {site.phone}
              </ButtonAnchor>
            </div>

            <p className="mx-auto mt-8 max-w-md text-xs leading-relaxed text-muted">
              {quoteNote}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
