import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceDetail, serviceDetails } from "@/lib/services";
import { QuoteCta } from "@/components/QuoteCta";
import { Card, Container, Eyebrow, Icon, Section } from "@/components/ui";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return serviceDetails.map((detail) => ({ slug: detail.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const detail = getServiceDetail(params.slug);
  if (!detail) return {};

  return {
    title: `${detail.name} | Royal Rinse — Mobile Auto Detailing`,
    description: `${detail.tagline} ${detail.intro}`.slice(0, 155),
  };
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const detail = getServiceDetail(params.slug);
  if (!detail) notFound();

  return (
    <>
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Service</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {detail.name}
          </h1>
          <p className="mt-3 text-lg text-chrome">{detail.tagline}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            {detail.intro}
          </p>

          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
          >
            <span aria-hidden="true">←</span>
            All services
          </Link>
        </Container>
      </div>

      <Section className="!pb-0">
        <div className="grid gap-12 lg:grid-cols-2">
          {detail.includes ? (
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                What&rsquo;s included
              </h2>
              <ul className="mt-6 space-y-3">
                {detail.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-royal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="space-y-10">
            {detail.variants ? (
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Available as
                </h2>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {detail.variants.map((variant) => (
                    <li
                      key={variant}
                      className="inline-flex rounded-xl border border-hairline bg-surface px-4 py-2 text-sm font-medium text-chrome"
                    >
                      {variant}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {detail.levels ? (
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Coating levels
                </h2>
                <ul className="mt-6 space-y-4">
                  {detail.levels.map((level) => (
                    <li key={level.name}>
                      <Card>
                        <h3 className="font-display text-base font-bold text-ink">
                          {level.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {level.desc}
                        </p>
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {detail.addOnNote ? (
              <p className="rounded-xl border border-hairline bg-surface px-5 py-4 text-sm text-chrome">
                {detail.addOnNote}{" "}
                <Link
                  href="/services#add-ons"
                  className="font-semibold text-royal transition-colors hover:text-chrome"
                >
                  See all add-ons
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </Section>

      <QuoteCta heading={`Ready to book the ${detail.name} service?`} />
    </>
  );
}
