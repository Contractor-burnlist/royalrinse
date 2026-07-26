import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/lib/faq";
import { PHONE_ARIA, site, telHref } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { QuoteCta } from "@/components/QuoteCta";
import { Container, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = buildMetadata({
  title: "Mobile Detailing FAQ | Royal Rinse — Riverside & San Diego",
  description:
    "Answers about Royal Rinse mobile auto detailing — costs, ceramic coating, service area, how long a detail takes, licensing, and our 10% military discount.",
  path: "/faq",
});

/** FAQPage structured data so answer engines can surface these directly. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Straight answers about mobile auto detailing with Royal Rinse across
            Riverside &amp; San Diego County. Still have a question?{" "}
            <a
              href={telHref}
              aria-label={PHONE_ARIA}
              className="font-semibold text-royal transition-colors hover:text-chrome"
            >
              Call {site.phone}
            </a>
            .
          </p>
        </Container>
      </div>

      <Section>
        <dl className="mx-auto max-w-3xl divide-y divide-hairline">
          {faqs.map((faq) => (
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

        <p className="mx-auto mt-10 max-w-3xl text-sm text-muted">
          Looking for something specific? See our{" "}
          <Link href="/services" className="font-semibold text-royal hover:text-chrome">
            services
          </Link>
          ,{" "}
          <Link href="/packages" className="font-semibold text-royal hover:text-chrome">
            packages
          </Link>
          , or the{" "}
          <Link href="/service-area" className="font-semibold text-royal hover:text-chrome">
            areas we serve
          </Link>
          .
        </p>
      </Section>

      <QuoteCta />
    </>
  );
}
