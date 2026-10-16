import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarHeart, Car, ListChecks, Truck } from "lucide-react";
import { Gold } from "@/components/Gold";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ButtonAnchor, Container, Eyebrow, Section } from "@/components/ui";
import { allGalleryImages } from "@/lib/gallery";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { mailHref, site, smsHref, telHref } from "@/lib/site";
import theme from "../site-theme.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Car Detailing Gift Card in Menifee & Temecula | Royal Rinse",
  description:
    "Give a car detailing gift card in Menifee and Temecula. Royal Rinse gift cards work for any service, any amount, with no expiration, and we come to them.",
  path: "/gift-cards",
});

const photo = (file: string) => allGalleryImages.find((image) => image.src.endsWith(file));

// 3840x5120: wide enough to run full-bleed without upscaling.
const heroPhoto = photo("ferrari-hero-3.jpeg");

/**
 * Gift cards are arranged by phone, text, or email. There is no checkout or
 * automated gift card system on this site, by design.
 */
const giftMailHref = `${mailHref}?subject=${encodeURIComponent("Gift card request")}&body=${encodeURIComponent(
  "Hi Royal Rinse, I would like a gift card.\n\nAmount:\nRecipient's name:\n",
)}`;

const reasons = [
  {
    Icon: Car,
    title: "Any vehicle, any service",
    body: "From a maintenance wash to a full ceramic coating, on a car, truck, SUV, or RV.",
  },
  {
    Icon: ListChecks,
    title: "They choose",
    body: "They pick the service they want, and we quote it when they book.",
  },
  {
    Icon: Truck,
    title: "A gift, not an errand",
    body: "We come to them at home or at work, so there is nowhere to drive and nothing to wait for.",
  },
  {
    Icon: CalendarHeart,
    title: "Right for any occasion",
    body: "Car enthusiasts, new car owners, holidays, birthdays, Father's Day, and thank-you gifts.",
  },
];

const steps = [
  { n: "01", title: "Call or text us with the amount you want." },
  { n: "02", title: "We send you a gift card to give." },
  { n: "03", title: "They book their detail and the card applies to their service." },
];

const amountGuide = [
  {
    title: "A maintenance wash",
    body: "A smaller amount covers a fresh hand wash and wipe-down, a nice treat for a car that is already in good shape.",
  },
  {
    title: "A full detail",
    body: "A larger amount covers a full interior and exterior detail from one of our packages.",
  },
  {
    title: "Toward a ceramic coating",
    body: "Any amount can go toward a ceramic coating, with the recipient covering the rest of their quote.",
  },
];

const finePrint = [
  "Gift cards are issued for a set dollar amount and apply toward any service.",
  "No expiration.",
  "Not redeemable for cash.",
  "Service availability subject to our service area.",
  "Royal Rinse reserves the right to modify the program.",
];

const takeaways = [
  "Royal Rinse sells gift cards for mobile auto detailing in Menifee, Temecula, and across Riverside County and San Diego County.",
  "A gift card can be issued for any amount and applies toward any service.",
  "Gift cards do not expire.",
  "To buy one, call, text, or email with the amount and the recipient's name.",
];

const faqs = [
  {
    question: "Do you sell gift cards?",
    answer:
      "Yes. Royal Rinse Mobile Detailing sells gift cards for any amount. Call or text (951) 338-9117 or email office@royalrinsemobile.com and we will arrange one.",
  },
  {
    question: "Do gift cards expire?",
    answer: "No. Royal Rinse gift cards do not expire.",
  },
  {
    question: "Can a gift card be used toward ceramic coating?",
    answer:
      "Yes. A gift card applies toward any service, including ceramic coating. If the coating costs more than the card, the recipient covers the rest of their quote.",
  },
  {
    question: "How do I buy one?",
    answer:
      "Call or text (951) 338-9117, or email office@royalrinsemobile.com, with the amount you want and the recipient's name. We arrange the gift card and send it to you to give.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const link =
  "font-semibold text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-ink";

export default function GiftCardsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Gift Cards", path: "/gift-cards" }])} />
      <JsonLd data={faqSchema} />

      {/* 1. Hero: full-bleed photo tucked under the transparent header. */}
      <section className="relative -mt-24 flex min-h-[72svh] items-end overflow-hidden sm:-mt-32">
        {heroPhoto ? (
          <Image
            src={heroPhoto.src}
            alt="Cream Ferrari with a deep gloss finish after a Royal Rinse mobile detail"
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover object-[50%_55%]"
          />
        ) : null}
        {/* Directional scrim, as on /referral: darkest where the type sits. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,19,22,0.95)_0%,rgba(17,19,22,0.86)_42%,rgba(17,19,22,0.5)_75%,rgba(17,19,22,0.35)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[rgba(17,19,22,0.75)] to-transparent"
        />
        {/* Below xl the type sits over the car itself, so hold it down more. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(17,19,22,0.55)] sm:bg-[rgba(17,19,22,0.45)] xl:hidden"
        />
        {/* Drawn last, so the bottom always lands on the page surface color
            (no seam), whatever the overlays above it do. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(0deg,rgb(29,32,36)_0%,rgba(17,19,22,0.6)_40%,rgba(17,19,22,0)_70%)]"
        />

        <Container className="relative z-10 pb-16 pt-[150px] sm:pb-20 sm:pt-[190px]">
          <div className="max-w-3xl">
            <Eyebrow>Gift Cards</Eyebrow>
            <h1 className="mt-4 font-display text-[2.75rem] font-bold leading-[0.98] tracking-[-0.02em] text-[#f2f4f6] sm:text-6xl lg:text-7xl">
              Give a <Gold>showroom finish.</Gold>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#dfe3e8] sm:text-xl">
              A Royal Rinse gift card works for any service, from a maintenance
              wash to a full ceramic coating. We come to them.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonAnchor href="#request">Request a gift card</ButtonAnchor>
              <ButtonAnchor href={telHref} variant="secondary">
                Call {site.phone}
              </ButtonAnchor>
            </div>
          </div>
        </Container>
      </section>

      {/* Quotable answer + key takeaways */}
      <Section className="!pb-0 !pt-16 sm:!pt-20">
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ink sm:text-xl">
            Royal Rinse Mobile Detailing offers car detailing gift cards in
            Menifee, Temecula, and across Riverside County and San Diego County,
            for any amount and any service, with no expiration.
          </p>
          <section
            aria-labelledby="key-takeaways"
            className="metal-soft edge-chrome mt-8 rounded-xl p-6"
          >
            <h2
              id="key-takeaways"
              className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-chrome"
            >
              Key takeaways
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted sm:text-base">
              {takeaways.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Section>

      {/* 2. Why it makes a good gift */}
      <Section>
        <Reveal className="max-w-2xl">
          <Eyebrow>Why it works</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-metal sm:text-5xl">
            Why a detail makes a <Gold>great gift</Gold>
          </h2>
        </Reveal>
        <ul className="relative mt-12 grid gap-6 sm:grid-cols-2">
          <li aria-hidden="true" className="contents">
            <span className={theme.pool} />
          </li>
          {reasons.map(({ Icon, title, body }) => (
            <li key={title} className="metal-soft edge-chrome rounded-xl p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(217,180,74,0.12)]">
                <Icon aria-hidden="true" className="h-5 w-5 text-[var(--gold-text)]" strokeWidth={1.7} />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. How it works */}
      <div className="rule-chrome-y metal-inset">
        <Section className="!py-16 sm:!py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-metal sm:text-4xl">
                Three steps to give one
              </h2>
            </Reveal>
            <ol>
              {steps.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.n}
                  delay={i * 140}
                  className="rule-chrome-t grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-4 py-7 first:pt-0 first:before:hidden sm:grid-cols-[6.5rem_minmax(0,1fr)]"
                >
                  <span className={`${theme.gold} ${theme.numeral} font-display`} aria-hidden="true">
                    {step.n}
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                </Reveal>
              ))}
            </ol>
          </div>
        </Section>
      </div>

      {/* 4. Amount guidance, no prices */}
      <Section>
        <Reveal className="max-w-2xl">
          <Eyebrow>Choosing an amount</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-metal sm:text-5xl">
            Any amount works
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Every detail is quoted on the vehicle&rsquo;s size and condition, so
            there are no fixed denominations. Gift cards can be issued for any
            amount. As a rough guide:
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {amountGuide.map((item) => (
            <li key={item.title} className="surface-machined edge-chrome rounded-xl p-6">
              <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm leading-relaxed text-muted">
          Not sure? Browse our{" "}
          <Link href="/services" className={link}>
            detailing services
          </Link>{" "}
          and{" "}
          <Link href="/packages" className={link}>
            packages
          </Link>
          , or call and we will help you pick an amount.
        </p>
      </Section>

      {/* 5. Contact */}
      <Section id="request" className="!pt-0 scroll-mt-28">
        <div className="relative overflow-hidden rounded-xl metal-strong metal-dim metal-edge-t edge-chrome px-6 py-14 shadow-card sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Gift cards</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Request a <Gold>gift card</Gold>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-chrome">
              Call or text{" "}
              <a href={telHref} className={link}>
                {site.phone}
              </a>
              , or email{" "}
              <a href={giftMailHref} className={`${link} break-all`}>
                {site.email}
              </a>
              . Include the amount you would like and the recipient&rsquo;s name,
              and we will take care of the rest.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonAnchor href={telHref}>Call {site.phone}</ButtonAnchor>
              <ButtonAnchor href={smsHref} variant="secondary">
                Text us
              </ButtonAnchor>
              <ButtonAnchor href={giftMailHref} variant="secondary">
                Email us
              </ButtonAnchor>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. Fine print + FAQ */}
      <Section className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <div>
            <h2 className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-chrome">
              Fine print
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted">
              {finePrint.map((term) => (
                <li key={term} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              See every current deal on our{" "}
              <Link href="/offers" className={link}>
                offers page
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-metal sm:text-4xl">
              Gift card questions
            </h2>
            <div className="mt-6 divide-y divide-hairline border-y border-hairline">
              {faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-base font-bold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-lg [&::-webkit-details-marker]:hidden">
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
          </div>
        </div>
      </Section>
    </>
  );
}
