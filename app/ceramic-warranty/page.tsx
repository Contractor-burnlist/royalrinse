import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  PHONE_ARIA,
  PHONE_SMS_ARIA,
  SERVICE_AREA_LINE,
  site,
  smsHref,
  telHref,
} from "@/lib/site";
import { BookNowButton } from "@/components/BookNowButton";
import {
  ButtonAnchor,
  Card,
  Container,
  Eyebrow,
  Icon,
  Section,
} from "@/components/ui";

export const metadata: Metadata = buildMetadata({
  title: "Ceramic Coating Warranty | Royal Rinse",
  description:
    "Our multi-year ceramic coatings are backed by the manufacturer's limited lifetime product warranty, plus a 1-year workmanship guarantee from Royal Rinse.",
  path: "/ceramic-warranty",
});

/**
 * Warranty FAQ. Kept on this page (not the site FAQ) and mirrored into
 * FAQPage structured data below so answer engines get the attribution right:
 * the lifetime warranty is the manufacturer's product warranty; the 1-year
 * workmanship warranty is ours.
 */
const warrantyFaqs = [
  {
    question: "Who provides the lifetime warranty?",
    answer:
      "The coating manufacturer provides the limited lifetime product warranty on the coating itself. Royal Rinse provides a separate 1-year workmanship warranty on the installation.",
  },
  {
    question: "How do I get the warranty details?",
    answer:
      "Warranty terms, conditions, and registration are set by the coating manufacturer. Ask us at booking and we will walk you through the coverage details for your coating level.",
  },
  {
    question: "Which coatings are covered by the product warranty?",
    answer:
      "The manufacturer's limited lifetime product warranty applies to our multi-year coating levels. The 1-Year Ceramic Wax Polish is not a multi-year coating and is not covered by that product warranty, though our 1-year workmanship warranty still covers its installation.",
  },
  {
    question: "What does the Royal Rinse workmanship warranty cover?",
    answer:
      "If the application shows a workmanship issue such as high spots, streaking, uneven coverage, or missed areas, we correct it at no charge within one year of the install.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: warrantyFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const aftercare = [
  "Give a fresh coating time to fully cure before its first wash. We will tell you how long for your specific coating.",
  "Wash with a pH-neutral shampoo and a gentle, two-bucket method, or let us handle it for you.",
  "Skip automatic brush car washes, which can mar any finish over time.",
  "Rinse off bird droppings, tree sap, and bug splatter promptly so they cannot etch the surface.",
  "A yearly maintenance service keeps the gloss and hydrophobic behavior performing at their best.",
];

/** A "who stands behind it" pill so attribution reads at a glance. */
function ProvidedBy({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-charcoal px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-chrome">
      {children}
    </span>
  );
}

export default function CeramicWarrantyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Ceramic Coating</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Ceramic Coating Warranty
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-chrome">
            Backed by the manufacturer&rsquo;s limited lifetime product warranty
            and our own 1-year workmanship guarantee.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Two separate protections cover a ceramic install, and they come from
            two different places. Here is exactly who stands behind what.
          </p>

          <Link
            href="/services/ceramic-coating"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
          >
            <span aria-hidden="true">←</span>
            Ceramic coating service
          </Link>
        </Container>
      </div>

      {/* Two-column attribution */}
      <Section className="!pb-0">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Manufacturer product warranty */}
          <Card className="flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal/15 text-royal">
                <Icon name="shield" className="h-5 w-5" />
              </span>
              <ProvidedBy>Provided by the coating manufacturer</ProvidedBy>
            </div>
            <h2 className="mt-5 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Manufacturer Product Warranty (Limited Lifetime)
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Our multi-year ceramic coatings are backed by the
              manufacturer&rsquo;s limited lifetime product warranty. It covers
              the coating product itself against premature failure, per the
              manufacturer&rsquo;s terms.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Warranty terms, conditions, and registration are set by the
              coating manufacturer. Ask us at booking and we will walk you
              through the coverage details for your coating level.
            </p>
            <p className="mt-4 rounded-xl border border-hairline bg-charcoal/60 px-4 py-3 text-xs leading-relaxed text-chrome">
              Applies to our multi-year coating levels. The 1-Year Ceramic Wax
              Polish is not a multi-year coating and is not covered by this
              product warranty.
            </p>
          </Card>

          {/* Royal Rinse workmanship warranty */}
          <Card className="flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal/15 text-royal">
                <Icon name="check" className="h-5 w-5" />
              </span>
              <ProvidedBy>Provided by Royal Rinse</ProvidedBy>
            </div>
            <h2 className="mt-5 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Royal Rinse Workmanship Warranty (1 Year)
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We stand behind our installation. On every ceramic install, if the
              application shows a workmanship issue such as high spots,
              streaking, uneven coverage, or missed areas, we correct it at no
              charge within one year.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              This is our own guarantee on the quality of the work, and it
              applies to all of our ceramic installs, including the 1-Year
              Ceramic Wax Polish.
            </p>
            <p className="mt-4 rounded-xl border border-hairline bg-charcoal/60 px-4 py-3 text-xs leading-relaxed text-chrome">
              Applies to every ceramic install we perform.
            </p>
          </Card>
        </div>
      </Section>

      {/* Maintenance note, kept separate from warranty terms */}
      <Section>
        <div className="rounded-xl border border-hairline bg-surface p-6 shadow-card sm:p-8">
          <Eyebrow>Keeping your coating its best</Eyebrow>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Manufacturer warranties typically require proper maintenance. Our
            annual ceramic maintenance service keeps your coating performing and
            helps you meet manufacturer care requirements. You can add it to any{" "}
            <Link
              href="/packages"
              className="font-semibold text-royal transition-colors hover:text-chrome"
            >
              detailing package
            </Link>{" "}
            or set up a recurring{" "}
            <Link
              href="/services/maintenance-plans"
              className="font-semibold text-royal transition-colors hover:text-chrome"
            >
              maintenance plan
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* Aftercare guidance */}
      <Section className="!pt-0">
        <div className="max-w-3xl">
          <Eyebrow>Aftercare</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            How to care for a fresh coating
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            This is general care guidance to help your finish last, not warranty
            legalese. Follow the manufacturer&rsquo;s specific instructions for
            your coating, and ask us anytime.
          </p>
          <ul className="mt-6 space-y-3">
            {aftercare.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-royal" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Warranty FAQ */}
      <Section className="!pt-0">
        <div className="max-w-3xl">
          <Eyebrow>Warranty FAQ</Eyebrow>
          <dl className="mt-6 divide-y divide-hairline">
            {warrantyFaqs.map((faq) => (
              <div key={faq.question} className="py-7 first:pt-0">
                <dt className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
                  {faq.question}
                </dt>
                <dd className="mt-3 text-base leading-relaxed text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 rounded-xl border border-hairline bg-surface px-5 py-4 text-sm leading-relaxed text-chrome">
            Questions or an issue with your coating? Call or text us and we will
            help, whether it is a workmanship fix or a manufacturer claim.
          </p>
        </div>
      </Section>

      {/* CTA band: Call / Book / Text */}
      <Section className="!pt-0">
        <div className="relative overflow-hidden rounded-xl border border-hairline bg-surface px-6 py-14 text-center shadow-card sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-royal/25 blur-3xl"
          />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Ready to protect your paint?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted">
              We bring ceramic coating to your driveway across {SERVICE_AREA_LINE}.
              Call, text, or book online and we will recommend the right level.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonAnchor href={telHref} aria-label={PHONE_ARIA}>
                Call {site.phone}
              </ButtonAnchor>
              <BookNowButton />
              <ButtonAnchor
                href={smsHref}
                aria-label={PHONE_SMS_ARIA}
                variant="secondary"
              >
                Text us
              </ButtonAnchor>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
