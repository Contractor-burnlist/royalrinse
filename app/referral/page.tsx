import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, ChevronDown, Truck, UserRound } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { BookNowButton } from "@/components/BookNowButton";
import { Reveal } from "@/components/Reveal";
import { ReviewPlatformsBadge } from "@/components/ReviewPlatforms";
import { ButtonAnchor, Container } from "@/components/ui";
import { allGalleryImages } from "@/lib/gallery";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { site, smsHref, telHref } from "@/lib/site";
import { absoluteUrl } from "@/lib/url";
import { ReferralShare } from "./ReferralShare";
import styles from "./referral.module.css";

const PAGE_URL = absoluteUrl("/referral");

/**
 * This page is sent by text, so the share card matters most: the title reads
 * as the offer and the image is a 1200x630 crop of the cream Ferrari
 * (public/og/referral-ferrari.jpg), not the generic site card.
 */
export const metadata: Metadata = buildMetadata({
  title: "$25 Off Your First Mobile Detail | Royal Rinse Menifee",
  description:
    "A friend sent you $25 off your first Royal Rinse mobile detail. We come to you in Menifee, Temecula, Murrieta, Riverside, and San Diego. Mention them when you book.",
  path: "/referral",
  image: absoluteUrl("/og/referral-ferrari.jpg"),
});

const photo = (file: string) => allGalleryImages.find((image) => image.src.endsWith(file));

// Both 3840x5120: wide enough to run full-bleed at 2x without upscaling.
const heroPhoto = photo("ferrari-hero-2.jpeg");
const bandPhoto = photo("ferrari-hero-3.jpeg");

const steps = [
  {
    n: "01",
    Icon: CalendarCheck,
    title: "Book online, or call or text us.",
    body: `Book Now takes about a minute, or reach us any day at ${site.phone}.`,
  },
  {
    n: "02",
    Icon: UserRound,
    title: "Tell us who referred you.",
    body: "Mention your friend's name when you book so they get credit too.",
  },
  {
    n: "03",
    Icon: Truck,
    title: "We come to you. $25 comes off your first detail.",
    body: "Our self-contained rig arrives at your home or office with its own water and power.",
  },
];

const finePrint = [
  "Mention your referrer's name when you book to receive $25 off.",
  "Valid on a first-time service for new customers.",
  "The referring customer receives a $25 credit after the referred service is complete.",
  "Credits apply to future service, not redeemable for cash.",
  "Cannot be combined with other offers unless stated.",
  "Royal Rinse reserves the right to modify or end the program.",
];

const shareMessage = `You've got to try Royal Rinse Mobile Detailing. Here's $25 off your first detail: ${PAGE_URL}`;

const goldEyebrow = "text-xs font-semibold uppercase tracking-[0.32em] text-[var(--gold-text)]";

export default function ReferralPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={breadcrumbJsonLd([{ name: "Referral Offer", path: "/referral" }])} />

      {/* 1. Hero: full-bleed, tucked under the transparent header (96 / 128px). */}
      <section className="relative -mt-24 flex min-h-[100svh] items-end overflow-hidden sm:-mt-32">
        {heroPhoto ? (
          <Image
            src={heroPhoto.src}
            alt="Cream Ferrari with a deep gloss finish after a Royal Rinse mobile detail at a Southern California home"
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover object-[62%_58%]"
          />
        ) : null}
        {/* Directional scrim: darkest bottom-left, where the type sits. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,19,22,0.94)_0%,rgba(17,19,22,0.82)_38%,rgba(17,19,22,0.35)_75%,rgba(17,19,22,0.25)_100%)]"
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
            down further to keep the metallic $25 above contrast minimums. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(17,19,22,0.6)] sm:bg-[rgba(17,19,22,0.5)] xl:hidden"
        />

        <Container className="relative z-10 pb-28 pt-[160px] sm:pb-32 sm:pt-[200px]">
          <div className="max-w-3xl">
            <p className={`${goldEyebrow} ${styles.rise}`}>A Friend Sent You This</p>
            <h1 className="mt-5 font-display font-bold tracking-tight">
              <span
                className={`${styles.metal} ${styles.hero25} text-[7.25rem] leading-[0.85] tracking-[-0.04em] sm:text-[11rem] lg:text-[13.5rem]`}
              >
                $25
              </span>
              <span
                className={`mt-3 block text-4xl leading-none text-[#f2f4f6] sm:text-6xl ${styles.rise}`}
              >
                Off Your First Detail.
              </span>
            </h1>
            {/* Not animated: text that starts at opacity 0 is not an LCP
                candidate, and the full-bleed photo is ignored as a background,
                so this line is what LCP measures. */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#dfe3e8] sm:text-xl">
              Mobile auto detailing that comes to you across Menifee, Temecula, Murrieta,
              Riverside, and San Diego. Mention your friend&rsquo;s name when you book and
              $25 comes off.
            </p>
            <div className={`mt-9 flex flex-col gap-3 sm:flex-row ${styles.riseLate}`}>
              <BookNowButton variant="ghost" className={styles.goldButton} />
              <a href={telHref} className={styles.pill}>
                Call {site.phone}
              </a>
            </div>
          </div>
        </Container>

        <a
          href="#how-it-works"
          className={`${styles.focusRing} absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-[#c3c8ce] transition-colors hover:text-white`}
          aria-label="Scroll to how it works"
        >
          <ChevronDown aria-hidden="true" className={`h-6 w-6 ${styles.bob}`} />
        </a>
      </section>

      {/* 2. How it works */}
      <section id="how-it-works" className="scroll-mt-28 py-24 sm:py-32">
        <Container>
          <Reveal className="max-w-2xl">
            <p className={goldEyebrow}>How it works</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-metal sm:text-5xl">
              Three steps. $25 off.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map(({ n, Icon, title, body }, i) => (
              <Reveal as="li" key={n} delay={i * 140}>
                <div className={styles.plate}>
                  <div className="flex items-start justify-between">
                    <span className={`${styles.numeral} ${styles.metal} font-display`} aria-hidden="true">
                      {n}
                    </span>
                    <Icon aria-hidden="true" className="mt-2 h-7 w-7 text-[var(--gold-text)]" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold leading-snug text-[#f2f4f6]">
                    <span className="sr-only">Step {i + 1}: </span>
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#c9ced4]">{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          {/* Social proof: the site's review badge, each logo linking to its
              own profile. */}
          <Reveal className="mt-16 flex justify-center sm:mt-20">
            <ReviewPlatformsBadge className="text-chrome" />
          </Reveal>
        </Container>
      </section>

      {/* 3. Share, for existing customers */}
      <section id="share" className="scroll-mt-28 pb-24 sm:pb-32">
        <Container>
          <div className="relative mx-auto max-w-4xl">
            <div aria-hidden="true" className={styles.glow} />
            <div className={`${styles.generator} px-5 py-10 sm:px-12 sm:py-14`}>
              <div className="text-center">
                <p className={goldEyebrow}>Share the offer</p>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-metal sm:text-5xl">
                  Already a customer? Send this to a friend.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#c9ced4]">
                  When your friend books their first detail, you get a $25 credit toward
                  your next one.
                </p>
              </div>
              <div className="mt-10">
                <ReferralShare url={PAGE_URL} message={shareMessage} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Payoff band */}
      <section className="relative isolate flex min-h-[60vh] items-center overflow-hidden sm:min-h-[70vh]">
        {bandPhoto ? (
          <div aria-hidden="true" className={styles.bandMedia}>
            <Image
              src={bandPhoto.src}
              alt=""
              fill
              quality={85}
              sizes="100vw"
              className="object-cover object-[50%_55%]"
            />
          </div>
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,22,0.9)_0%,rgba(17,19,22,0.8)_45%,rgba(17,19,22,0.92)_100%)]"
        />
        <Container className="relative z-10 py-24 text-center">
          <Reveal>
            <div className={`${styles.goldRule} mx-auto`} />
            <p className="mx-auto mt-8 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-[#f4f6f8] sm:text-5xl">
              Good work spreads on its own.{" "}
              {/* Solid gold, not the metallic sweep: over a photo the sweep's
                  bronze band would dip below contrast minimums. */}
              <span className="text-[var(--gold-text)]">We just make it worth your while.</span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 5. Fine print */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c3c8ce]">
              Fine print
            </h2>
            <ul className="mt-5 grid gap-x-10 gap-y-2.5 text-sm leading-relaxed text-[#b9bfc6] sm:grid-cols-2">
              {finePrint.map((term) => (
                <li key={term} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[#b9bfc6]">
              See every current deal on our{" "}
              <Link
                href="/offers"
                className="font-semibold text-[var(--gold-text)] underline-offset-4 hover:underline"
              >
                offers page
              </Link>
              . Royal Rinse Mobile Detailing is based in Menifee, California, and comes to you
              across Menifee, Temecula, Murrieta, Riverside, and San Diego.
            </p>
          </div>
        </Container>
      </section>

      {/* 6. Closing CTA */}
      <section className={styles.closing}>
        <Container className="py-20 text-center sm:py-28">
          <p className={goldEyebrow}>$25 off your first detail</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-metal sm:text-6xl">
            Ready to book?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#c9ced4]">
            Mention your friend&rsquo;s name when you book. Questions first? We&rsquo;re a
            call or text away.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonAnchor href={telHref}>Call {site.phone}</ButtonAnchor>
            <ButtonAnchor href={smsHref} variant="secondary">
              Text us
            </ButtonAnchor>
            <BookNowButton variant="secondary" />
          </div>
        </Container>
      </section>
    </div>
  );
}
