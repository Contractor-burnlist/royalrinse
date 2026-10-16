import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  CalendarClock,
  Car,
  CarTaxiFront,
  Caravan,
  Check,
  Clock,
  Droplets,
  HardHat,
  House,
  Route,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { Gold } from "@/components/Gold";
import { JsonLd } from "@/components/JsonLd";
import { PhotoBand } from "@/components/PhotoBand";
import { Reveal } from "@/components/Reveal";
import { ButtonAnchor, Container, Eyebrow, Section } from "@/components/ui";
import { allGalleryImages } from "@/lib/gallery";
import { featuredCities } from "@/lib/serviceAreas";
import { AREA_SERVED, PROVIDER_REF, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { site, smsHref, telHref } from "@/lib/site";
import { absoluteUrl } from "@/lib/url";
import theme from "../site-theme.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Fleet Vehicle Detailing in Riverside County | Royal Rinse",
  description:
    "Fleet vehicle detailing in Riverside County: work vans, company cars, and trucks detailed on site at your lot in Menifee, Temecula, Murrieta, and San Diego.",
  path: "/fleet",
});

const photo = (file: string) => allGalleryImages.find((image) => image.src.endsWith(file));

// 2268x4032: wide enough to run full-bleed without upscaling. The Sprinter
// shots are 576px phone photos, so they go in the photo band, which frames
// them at their native size instead of stretching them.
const heroPhoto = photo("royal-truck-1.jpeg");
const vanPhoto = photo("sprinter-van-1.jpeg");

const reasons = [
  {
    Icon: Clock,
    title: "Zero downtime",
    body: "We come to your lot or job site, so your vehicles stay in service while they get cleaned.",
  },
  {
    Icon: Route,
    title: "No shuttling",
    body: "Nobody loses half a day driving vehicles to a shop and back.",
  },
  {
    Icon: Sparkles,
    title: "Consistent presentation",
    body: "Clean vehicles are rolling advertising for your business, every day they are on the road.",
  },
  {
    Icon: CalendarClock,
    title: "Scheduled service",
    body: "Set a recurring cadence once and stop thinking about it.",
  },
  {
    Icon: Droplets,
    title: "Self-contained rig",
    body: "We bring our own water and power, including deionized water for a spot-free finish.",
  },
];

const segments = [
  { Icon: Truck, label: "Work vans and service fleets" },
  { Icon: Car, label: "Company cars" },
  { Icon: HardHat, label: "Contractor trucks" },
  { Icon: Building2, label: "Real estate and sales fleets" },
  { Icon: Store, label: "Dealership lots" },
  { Icon: CarTaxiFront, label: "Rideshare and delivery drivers" },
  { Icon: Caravan, label: "RVs and oversized vehicles" },
  { Icon: House, label: "Property management and HOA vehicles" },
];

const serviceIncludes: { text: string; href?: string; linkText?: string }[] = [
  {
    text: "Recurring maintenance washing on a weekly, bi-weekly, or monthly schedule.",
    href: "/services/maintenance-plans",
    linkText: "How maintenance plans work",
  },
  {
    text: "Full interior and exterior detailing.",
    href: "/packages",
    linkText: "Compare detailing packages",
  },
  {
    text: "Ceramic coating for vehicles you want protected long term.",
    href: "/services/ceramic-coating",
    linkText: "About ceramic coating",
  },
  { text: "One point of contact, one invoice." },
  {
    text: "Flexible scheduling. We work seven days a week, 8:00 AM to 8:00 PM, so visits can be booked early in the day or into the evening around your hours.",
  },
];

const takeaways = [
  "Royal Rinse details fleet and commercial vehicles on site, at your lot, office, or job site.",
  "Vehicles stay in service: nobody drives them to a shop and back.",
  "Fleet service can be a recurring weekly, bi-weekly, or monthly wash, full details, or ceramic coating.",
  "Fleet pricing is quoted per fleet, based on vehicle count, vehicle size, and service level.",
  "We serve Menifee, Temecula, Murrieta, Riverside, San Diego, and the surrounding areas of Riverside County and San Diego County.",
];

const faqs = [
  {
    question: "Do you service commercial fleets?",
    answer:
      "Yes. Royal Rinse Mobile Detailing services commercial fleets, including work vans, company cars, contractor trucks, dealership lots, and property management vehicles, on site at your location.",
  },
  {
    question: "How many vehicles can you do in a day?",
    answer:
      "It depends on the size of the vehicles, their condition, and the service level. A maintenance wash takes far less time than a full interior and exterior detail. We plan each visit around your vehicle count and schedule, and larger fleets can be spread across consecutive days or recurring visits.",
  },
  {
    question: "Do you come to our lot?",
    answer:
      "Yes. We come to your lot, office, or job site. Our rig is fully self-contained with its own water and power, so we just need access to the vehicles.",
  },
  {
    question: "Do you offer recurring fleet schedules?",
    answer:
      "Yes. Fleets can be set up on a weekly, bi-weekly, or monthly schedule so vehicles stay consistently clean without anyone having to book each visit.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Menifee, Temecula, Murrieta, Riverside, San Diego, and the surrounding areas of Riverside County and San Diego County. Royal Rinse is based in Menifee, California.",
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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${absoluteUrl("/fleet")}#service`,
  name: "Fleet and Commercial Vehicle Detailing",
  serviceType: "Fleet vehicle detailing",
  description:
    "Mobile fleet and commercial vehicle detailing on site: recurring maintenance washing, full interior and exterior detailing, and ceramic coating for work vans, company cars, trucks, and other business vehicles.",
  url: absoluteUrl("/fleet"),
  provider: PROVIDER_REF,
  areaServed: AREA_SERVED,
};

const link =
  "font-semibold text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-ink";

export default function FleetPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Fleet & Commercial", path: "/fleet" }])} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* 1. Hero: full-bleed photo tucked under the transparent header. */}
      <section className="relative -mt-24 flex min-h-[72svh] items-end overflow-hidden sm:-mt-32">
        {heroPhoto ? (
          <Image
            src={heroPhoto.src}
            alt="Work truck detailed on site in a residential driveway, with the Royal Rinse mobile rig parked behind it"
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover object-[52%_50%]"
          />
        ) : null}
        {/* Directional scrim, as on /referral: darkest where the type sits. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,19,22,0.95)_0%,rgba(17,19,22,0.86)_42%,rgba(17,19,22,0.5)_75%,rgba(17,19,22,0.35)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(0deg,rgb(29,32,36)_0%,rgba(17,19,22,0.6)_40%,rgba(17,19,22,0)_70%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[rgba(17,19,22,0.75)] to-transparent"
        />
        {/* Below xl the type sits over the truck itself, so hold it down more. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(17,19,22,0.55)] sm:bg-[rgba(17,19,22,0.45)] xl:hidden"
        />

        <Container className="relative z-10 pb-16 pt-[150px] sm:pb-20 sm:pt-[190px]">
          <div className="max-w-3xl">
            <Eyebrow>Fleet &amp; Commercial</Eyebrow>
            <h1 className="mt-4 font-display text-[2.75rem] font-bold leading-[0.98] tracking-[-0.02em] text-[#f2f4f6] sm:text-6xl lg:text-7xl">
              Your fleet, <Gold>detailed on site.</Gold>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#dfe3e8] sm:text-xl">
              We service multiple vehicles at your location across Menifee,
              Temecula, Murrieta, Riverside, and San Diego. No downtime, no
              shuttling vehicles to a shop.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {/* Fleet leads come in by phone, not as regular bookings. */}
              <ButtonAnchor href={telHref} aria-label={`Request a fleet quote, call ${site.phone}`}>
                Request a fleet quote
              </ButtonAnchor>
              <ButtonAnchor href={smsHref} variant="secondary">
                Text us
              </ButtonAnchor>
            </div>
          </div>
        </Container>
      </section>

      {/* Quotable answer + key takeaways */}
      <Section className="!pb-0 !pt-16 sm:!pt-20">
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ink sm:text-xl">
            Royal Rinse Mobile Detailing provides fleet vehicle detailing across
            Riverside County and San Diego County, cleaning work vans, company
            cars, and trucks on site at your lot or job site so they never leave
            service.
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

      {/* 2. Why mobile matters for fleets */}
      <Section>
        <Reveal className="max-w-2xl">
          <Eyebrow>Why mobile</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-metal sm:text-5xl">
            Why mobile detailing <Gold>works for fleets</Gold>
          </h2>
        </Reveal>
        <ul className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* 3. Who we serve */}
      <div className="rule-chrome-y metal-inset">
        <Section className="!py-16 sm:!py-20">
          <Reveal className="max-w-2xl">
            <Eyebrow>Who we serve</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-metal sm:text-4xl">
              Built for businesses with more than one vehicle
            </h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {segments.map(({ Icon, label }) => (
              <li
                key={label}
                className="surface-machined edge-chrome flex items-center gap-3 rounded-xl px-4 py-4"
              >
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--gold-text)]" strokeWidth={1.7} />
                <span className="text-sm font-semibold text-ink">{label}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* 4. What fleet service looks like */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>What you get</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-metal sm:text-5xl">
                What fleet service looks like
              </h2>
            </Reveal>
            <ul className="mt-10 space-y-6">
              {serviceIncludes.map((item) => (
                <li key={item.text} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(217,180,74,0.14)]">
                    <Check aria-hidden="true" className="h-4 w-4 text-[var(--gold-text)]" strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="text-base leading-relaxed text-chrome">{item.text}</p>
                    {item.href ? (
                      <Link href={item.href} className={`mt-1 inline-block text-sm ${link}`}>
                        {item.linkText}
                      </Link>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={140} className="lg:pt-24">
            <div className="metal-soft edge-chrome rounded-xl p-6 sm:p-8">
              <h3 className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-chrome">
                How fleet pricing works
              </h3>
              <p className="mt-4 text-base leading-relaxed text-chrome">
                Fleet pricing is quoted per fleet, based on vehicle count,
                vehicle size, and service level. Volume rates apply to
                businesses with multiple vehicles.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                See all of our{" "}
                <Link href="/services" className={link}>
                  detailing services
                </Link>{" "}
                for what each service level includes.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 5. Photo band */}
      {vanPhoto ? (
        <div className={theme.bandBlend}>
          <PhotoBand
            image={vanPhoto}
            headline="Keep your fleet sharp."
            sub="A clean van, truck, or company car is a good first impression for your business, every time it pulls up."
          />
        </div>
      ) : null}

      {/* 6. Contact */}
      <Section>
        <div className="relative overflow-hidden rounded-xl metal-strong metal-dim metal-edge-t edge-chrome px-6 py-14 shadow-card sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Fleet quote</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Tell us about <Gold>your fleet.</Gold>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-chrome">
              Let us know how many vehicles you have, what types they are, where
              they are parked, and how often you would like them cleaned. Call or
              text{" "}
              <a href={telHref} className={link}>
                {site.phone}
              </a>{" "}
              and we will put together a quote for your fleet.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonAnchor href={telHref}>Call {site.phone}</ButtonAnchor>
              <ButtonAnchor href={smsHref} variant="secondary">
                Text us
              </ButtonAnchor>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <Reveal>
            <Eyebrow>Fleet FAQ</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-metal sm:text-4xl">
              Common fleet questions
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Based in Menifee, we serve fleets across{" "}
              {featuredCities.map((city, i) => (
                <span key={city.slug}>
                  <Link href={`/service-area/${city.slug}`} className={link}>
                    {city.name}
                  </Link>
                  {i < featuredCities.length - 2 ? ", " : i === featuredCities.length - 2 ? ", and " : ""}
                </span>
              ))}
              . See our full{" "}
              <Link href="/service-area" className={link}>
                service area
              </Link>
              .
            </p>
          </Reveal>
          <div className="divide-y divide-hairline border-y border-hairline">
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
      </Section>
    </>
  );
}
