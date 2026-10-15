import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeDollarSign, Camera, ChevronDown, PenLine, Send } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { BookNowButton } from "@/components/BookNowButton";
import { Reveal } from "@/components/Reveal";
import { ButtonAnchor, Container } from "@/components/ui";
import { allGalleryImages } from "@/lib/gallery";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { site, smsHref, telHref } from "@/lib/site";
import { ReferralGenerator } from "./ReferralGenerator";
import styles from "./referral.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Refer a Friend and You Both Get $25 | Royal Rinse Menifee",
  description:
    "Refer a friend to Royal Rinse mobile detailing in Menifee, Temecula, and Murrieta. They get $25 off their first detail and you get $25 toward your next one.",
  path: "/referral",
});

const photo = (file: string) => allGalleryImages.find((image) => image.src.endsWith(file));

// Both 3840x5120: wide enough to run full-bleed at 2x without upscaling.
const heroPhoto = photo("ferrari-hero-2.jpeg");
const bandPhoto = photo("ferrari-hero-3.jpeg");

const steps = [
  {
    n: "01",
    Icon: PenLine,
    title: "Enter your name, get your code.",
    body: "Your code is generated right here on the page. Nothing to sign up for.",
  },
  {
    n: "02",
    Icon: Send,
    title: "Send it to a friend. They book and save $25.",
    body: "Copy it, text it, or email it. They mention the code when they book.",
  },
  {
    n: "03",
    Icon: BadgeDollarSign,
    title: "Their detail is done, your $25 credit lands.",
    body: "Once their first service is complete, $25 goes toward your next detail.",
  },
];

const finePrint = [
  "Your friend must mention the code when booking.",
  "Both credits apply after the referred customer's first completed service.",
  "One $25 credit per new customer referred.",
  "Credits apply to future service, not redeemable for cash.",
  "Cannot be combined with other offers unless stated.",
  "Royal Rinse reserves the right to modify or end the program.",
];

const goldEyebrow = "text-xs font-semibold uppercase tracking-[0.32em] text-[var(--gold-text)]";

export default function ReferralPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={breadcrumbJsonLd([{ name: "Referral Program", path: "/referral" }])} />

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
            <p className={`${goldEyebrow} ${styles.rise}`}>Referral Program</p>
            <h1 className="mt-5 font-display font-bold tracking-tight">
              <span
                className={`block text-4xl leading-none text-[#f2f4f6] sm:text-6xl ${styles.rise}`}
              >
                You Both Get
              </span>
              <span
                className={`${styles.metal} ${styles.hero25} mt-1 text-[7.25rem] leading-[0.85] tracking-[-0.04em] sm:text-[11rem] lg:text-[13.5rem]`}
              >
                $25.
              </span>
            </h1>
            {/* Not animated: text that starts at opacity 0 is not an LCP
                candidate, and the full-bleed photo is ignored as a background,
                so this line is what LCP measures. */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#dfe3e8] sm:text-xl">
              Share your code. Your friend gets $25 off their first detail. You get $25
              toward your next one.
            </p>
            <div className={`mt-9 ${styles.riseLate}`}>
              <a href="#get-your-code" className={styles.goldButton}>
                Get my code
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
              Three steps. Two credits.
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
        </Container>
      </section>

      {/* 3. The generator, then 4. the save-your-code callout */}
      <section id="get-your-code" className="scroll-mt-28 pb-24 sm:pb-32">
        <Container>
          <div className="relative mx-auto max-w-4xl">
            <div aria-hidden="true" className={styles.glow} />
            <div className={`${styles.generator} px-5 py-10 sm:px-12 sm:py-14`}>
              <div className="text-center">
                <p className={goldEyebrow}>Your code</p>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-metal sm:text-5xl">
                  Get your referral code
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#c9ced4]">
                  Enter your name and we&rsquo;ll make your code right here. Nothing is sent
                  anywhere.
                </p>
              </div>
              <div className="mt-10">
                <ReferralGenerator />
              </div>
            </div>

            <div className={`${styles.callout} mt-8 flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-7`}>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgba(217,180,74,0.18)] text-[var(--gold-text)]">
                <Camera aria-hidden="true" className="h-7 w-7" strokeWidth={1.7} />
              </span>
              <p className="text-base leading-relaxed text-[#f2f4f6] sm:text-lg">
                <strong className="font-bold text-[var(--gold-text)]">
                  Screenshot this or write it down.
                </strong>{" "}
                We don&rsquo;t email it. Your friend needs this code when they book, and
                it&rsquo;s how we know to credit you.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Payoff band */}
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

      {/* 6. Fine print */}
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

      {/* 7. Closing CTA */}
      <section className={styles.closing}>
        <Container className="py-20 text-center sm:py-28">
          <p className={goldEyebrow}>$25 for you, $25 for them</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-metal sm:text-6xl">
            Ready to share?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#c9ced4]">
            Questions about the program, or ready to book your own detail? We&rsquo;re a
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
