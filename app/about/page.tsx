import type { Metadata } from "next";
import Link from "next/link";
import { credentials, site, steps, valueProps } from "@/lib/site";
import { allGalleryImages } from "@/lib/gallery";
import { QuoteCta } from "@/components/QuoteCta";
import { LightboxGrid } from "@/components/Lightbox";
import { Card, Container, Eyebrow, Icon, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "About | Royal Rinse — Licensed, Insured & Bonded Mobile Detailing",
  description:
    "Royal Rinse is a licensed, insured, and bonded mobile auto detailing service. We come to your home or office anywhere in Riverside & San Diego County.",
};

function Credentials() {
  return (
    <div className="border-y border-hairline bg-charcoal">
      <Section className="!py-20 sm:!py-24">
        <Eyebrow>Why it matters</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Licensed, insured &amp; bonded
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Anyone can buy a pressure washer and call themselves a detailer. Handing over
          your keys should take more than that. Here is what standing behind the work
          actually means.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {credentials.map((credential) => (
            <Card key={credential.title} className="flex flex-col">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal/15 text-royal">
                <Icon name={credential.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">
                {credential.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {credential.description}
              </p>
            </Card>
          ))}
        </div>

        <p className="mt-10 inline-flex flex-wrap items-center gap-2 rounded-xl border border-hairline bg-surface px-5 py-4 text-sm font-medium text-chrome">
          <Icon name="shield" className="h-4 w-4 shrink-0 text-royal" />
          {site.license}
        </p>
      </Section>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            The detail shop that comes to you
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Royal Rinse is a mobile auto detailing service built on one idea: getting your
            car properly detailed shouldn&rsquo;t cost you an afternoon. We bring the shop
            to your driveway — licensed, insured, and bonded — and leave with your car
            looking like it just rolled off the lot.
          </p>
        </Container>
      </div>

      <Credentials />

      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Fully self-contained, start to finish
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Our rig carries its own water and power, so we can detail your vehicle
              wherever it sits — your driveway, your office lot, anywhere you park. You
              don&rsquo;t need to hand over a hose, an outlet, or your Saturday.
            </p>

            <ol className="mt-8 space-y-5">
              {steps.map((step) => (
                <li key={step.number} className="flex gap-4">
                  <span className="font-display text-lg font-bold text-royal">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              The standard we hold
            </h2>

            <ul className="mt-8 space-y-4">
              {valueProps.map((prop) => (
                <li key={prop.title}>
                  <Card className="flex gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-royal/15 text-royal">
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <div className="border-y border-hairline bg-charcoal">
        <Section className="!py-20 sm:!py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Our work</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Recent details
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
            >
              View full gallery
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <LightboxGrid
            images={allGalleryImages.slice(0, 6)}
            variant="masonry"
            className="mt-12 columns-2 gap-4 lg:columns-3"
          />
        </Section>
      </div>

      <QuoteCta heading="Ready to see the difference?" />
    </>
  );
}
