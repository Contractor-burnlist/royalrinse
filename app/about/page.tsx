import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { site, telHref } from "@/lib/site";
import { allGalleryImages } from "@/lib/gallery";
import { BookNowButton } from "@/components/BookNowButton";
import { MilitaryDiscountBadge } from "@/components/MilitaryDiscountBadge";
import { ButtonAnchor, Card, Container, Eyebrow, Icon, Section } from "@/components/ui";
import { Gold } from "@/components/Gold";
import { Reveal } from "@/components/Reveal";
import theme from "../site-theme.module.css";
import timeline from "./timeline.module.css";

export const metadata: Metadata = buildMetadata({
  title: "About Royal Rinse: Mobile Detailing, Riverside & SD",
  description:
    "Royal Rinse is a licensed, insured mobile auto detailing company based in Menifee, serving Temecula and all of Riverside & San Diego County. Our story and standard.",
  path: "/about",
});

const whyRoyalRinse = [
  {
    icon: "car",
    title: "We come to you",
    description:
      "Home or office, your driveway becomes the detail bay. Our rig arrives fully self-contained: water, power, everything. So a professional detail costs you nothing but the walk to your window.",
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
      "Pro-grade equipment and premium chemistry, chosen for how they perform, not how they market. From ceramic spray waxes to multi-year coatings, we know what each finish needs.",
  },
  {
    icon: "check",
    title: "Licensed, insured & bonded",
    description:
      `Registered with the California DLSE under licence ${site.licenseNumber}. Your vehicle and your property are covered from the moment we arrive.`,
  },
];

/**
 * A real photo from the gallery, used as the story section's image.
 *
 * The blue classic coupe, shot in a driveway with the rig alongside it — which
 * is the story this section tells: the whole shop arrives at your house. It
 * also sets up "a weekend classic with original chrome" further down the page.
 *
 * It is a 576px source in a column that renders ~496px wide, so it stretches
 * ~1.7x on a retina display. That is the smallest stretch of any slot outside
 * the homepage hero, but it IS a stretch — the frame below is sized to the
 * column, not the viewport, to keep it as contained as possible.
 */
const storyImage =
  allGalleryImages.find((image) => image.src.includes("corvette-c2-3")) ??
  allGalleryImages[0];

function Hero() {
  return (
    <div className="metal-strong metal-edge-b">
      <Container className="py-16 sm:py-20">
        <Eyebrow>About</Eyebrow>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-metal sm:text-5xl">
          About <Gold>Royal Rinse</Gold>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-chrome">
          Southern California&rsquo;s premium detailers, and we come to you.
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
              Andre worked as a detail technician for another company. When they cut
              pay for the people actually doing the work, he decided he&rsquo;d rather
              bet on himself than keep building someone else&rsquo;s business.
            </p>
            <p>
              He took a loan from his grandfather to buy the first vehicle.
              Everything since has been built on what that bet made possible.
            </p>
            <p>
              The idea behind Royal Rinse is simple: dealership-quality detailing
              shouldn&rsquo;t require a dealership visit. No drop-off, no shuttle, no
              afternoon lost in a waiting room: just the standard of work you&rsquo;d
              expect from the best shop in town, delivered to wherever your car
              happens to be parked.
            </p>
            <p>
              It began in Menifee with a single detailer, a rig, and an unreasonable
              amount of care per vehicle. Word travelled the way it does in this business:
              one gleaming car in one driveway at a time. As demand grew, we partnered
              with skilled, like-minded detailers who hold the same standard, so we could
              expand from our Menifee home base across Temecula and all of Riverside &amp;
              San Diego County without ever thinning the quality that got us here.
            </p>
            <p>
              That&rsquo;s the whole model: convenience without compromise. A full
              professional setup arrives at your home or office, and the only thing you
              have to do is hand over the keys.
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl edge-chrome shadow-2xl">
          <Image
            src={storyImage.src}
            alt={storyImage.alt}
            fill
            loading="lazy"
            quality={85}
            /**
             * 504px is the real column: the 72rem container less its px-8
             * padding and the lg:gap-20 gutter, halved. The old 46vw hint
             * tracked the VIEWPORT, so on a wide screen it asked for ~880px of
             * image for a slot that never exceeds 504 — this asks for what the
             * slot actually is.
             */
            sizes="(max-width: 1024px) 92vw, 504px"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}

/** The one gallery photo with our own van in it, behind a customer's car. */
const rigImage = allGalleryImages.find((image) => image.src.endsWith("mobile-rig-1.jpeg"));

/**
 * Milestones. Facts only: the date and what happened. Add a line of body
 * copy to an entry only when there is a real detail to tell.
 */
const milestones = [
  { n: "01", month: "April", year: "2026", title: "The first van", photo: true },
  { n: "02", month: "August", year: "2026", title: "The second van", photo: false },
  { n: "03", month: "October", year: "2026", title: "The third van", photo: false },
];

function Timeline() {
  return (
    <Section className="!py-28 sm:!py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div aria-hidden="true" className={`${theme.goldRule} mx-auto w-24`} />
        <div className="mt-6">
          <Eyebrow>Our journey</Eyebrow>
        </div>
        <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-metal sm:text-5xl">
          From one van <Gold>to three</Gold>
        </h2>
      </Reveal>

      <div className={`${timeline.timeline} mx-auto mt-16 max-w-5xl sm:mt-20`}>
        <span aria-hidden="true" className={theme.pool} />
        <span aria-hidden="true" className={timeline.line} />
        <ol className={timeline.entries}>
          {milestones.map((m) => (
            <li key={m.n} className={timeline.entry}>
              <span aria-hidden="true" className={timeline.node} />
              <p className={`${timeline.date} font-display`}>
                <span className={timeline.number}>{m.n}</span>
                <span className={`${timeline.month} ${theme.gold}`}>{m.month}</span>
                <span className={timeline.year}>{m.year}</span>
              </p>
              <div className={`${timeline.card} metal-soft edge-chrome rounded-xl p-6 sm:p-7`}>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                  {m.title}
                </h3>
                {m.photo && rigImage ? (
                  <div className={theme.lit}>
                    <div className={`${timeline.photo} edge-chrome shadow-card`}>
                      <Image
                        src={rigImage.src}
                        alt="A customer's car detailed in their driveway, with the stocked Royal Rinse van parked behind it"
                        fill
                        loading="lazy"
                        quality={85}
                        // Capped at 300px, under the 768px source at 2x.
                        sizes="(min-width: 380px) 300px, 80vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function WhyRoyalRinse() {
  return (
    <div className="rule-chrome-y metal-inset">
      <Section className="!py-20 sm:!py-24">
        <Eyebrow>Why Royal Rinse</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          The care a car deserves, without the errand
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {whyRoyalRinse.map((prop) => (
            <Card key={prop.title} className="flex gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-chrome/10 text-chrome">
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
            and exotics that have never seen rain, and the standard doesn&rsquo;t move.
          </p>
          <p>
            That means honest work: no shortcuts on prep, no hiding swirls under a coat
            of gloss, no rushing the parts nobody photographs. Whether it&rsquo;s a
            maintenance wash to keep a car sharp between details, a full interior
            restoration, or a multi-year ceramic coating, the job gets the time it
            actually needs.
          </p>
          <p>
            We think that&rsquo;s what premium really means. Not a price tag, a
            standard you can see in the reflection.
          </p>
        </div>

        {/* Trust line */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-hairline pt-8">
          <span className="flex items-center gap-2 text-sm text-chrome">
            <Icon name="shield" className="h-4 w-4 shrink-0 text-chrome" />
            Licensed &amp; Insured
            <span className="font-mono text-[11px] text-muted">
              CA DLSE {site.licenseNumber}
            </span>
          </span>

          <MilitaryDiscountBadge size="sm" />

          <span className="flex items-center gap-2 text-sm text-chrome">
            <Icon name="sparkle" className="h-4 w-4 shrink-0 text-chrome" />
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
      <div className="relative overflow-hidden rounded-2xl metal-strong metal-dim metal-edge-t edge-chrome px-6 py-16 text-center shadow-card sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-chrome/5 blur-3xl"
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Ready for a showroom finish?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">
            Let&rsquo;s bring it to your driveway.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {/* Booking online is the preferred path, so it leads. */}
            <BookNowButton />
            <ButtonAnchor href={telHref} variant="secondary">
              Call {site.phone}
            </ButtonAnchor>
          </div>

          <p className="mt-8 text-sm text-muted">
            Serving Riverside &amp; San Diego County,{" "}
            <Link
              href="/service-area"
              className="font-semibold text-accent transition-colors hover:text-ink"
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
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <Hero />
      <OurStory />
      <Timeline />
      <WhyRoyalRinse />
      <OurStandard />
      <AboutCta />
    </>
  );
}
