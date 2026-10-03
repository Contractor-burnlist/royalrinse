import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CERAMIC_WARRANTY_PATH,
  CERAMIC_WARRANTY_TRUST,
  getServiceDetail,
  serviceDetails,
} from "@/lib/services";
import { serviceDetailPhoto } from "@/lib/serviceImages";
import { SERVICE_AREA_LINE } from "@/lib/site";
import { AREA_SERVED_PRIMARY, breadcrumbJsonLd, buildMetadata, PROVIDER_REF } from "@/lib/seo";
import { absoluteUrl } from "@/lib/url";
import { QuoteCta } from "@/components/QuoteCta";
import { Card, Container, Eyebrow, Icon, Section } from "@/components/ui";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return serviceDetails.map((detail) => ({ slug: detail.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const detail = getServiceDetail(params.slug);
  if (!detail) return {};

  return buildMetadata({
    title: `${detail.name}, Mobile Detailing | Royal Rinse`,
    description: `${detail.name} in ${SERVICE_AREA_LINE}. ${detail.intro}`.slice(
      0,
      158,
    ),
    path: `/services/${detail.slug}`,
  });
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const detail = getServiceDetail(params.slug);
  if (!detail) notFound();

  // Only some services have a photo; the layout is unchanged for the rest.
  const photo = serviceDetailPhoto(detail.slug);
  const photoFigure = photo ? (
    <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl edge-chrome shadow-2xl">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        loading="lazy"
        quality={85}
        // Capped at max-w-sm (384px); narrower phones get the column width.
        sizes="(min-width: 432px) 384px, 92vw"
        className="object-cover"
      />
    </div>
  ) : null;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${detail.name}, Mobile Auto Detailing`,
    serviceType: detail.name,
    description: detail.intro,
    "@id": `${absoluteUrl(`/services/${detail.slug}`)}#service`,
    areaServed: AREA_SERVED_PRIMARY,
    url: absoluteUrl(`/services/${detail.slug}`),
    provider: PROVIDER_REF,
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }, { name: detail.name, path: `/services/${detail.slug}` }])} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="metal-strong metal-edge-b">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Service</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-metal sm:text-5xl">
            {detail.name}
          </h1>
          <p className="mt-3 text-lg text-chrome">{detail.tagline}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            {detail.intro}
          </p>

          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink"
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
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-chrome" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            // No "included" list (ceramic coating): the photo takes its column.
            photoFigure
          )}

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
                  className="font-semibold text-accent transition-colors hover:text-ink"
                >
                  See all add-ons
                </Link>
              </p>
            ) : null}

            {detail.includes ? photoFigure : null}
          </div>
        </div>

        {detail.slug === "ceramic-coating" ? (
          <p className="mt-12 rounded-xl border border-hairline bg-surface px-5 py-4 text-sm leading-relaxed text-chrome">
            <span className="font-semibold text-ink">Warranty:</span>{" "}
            {CERAMIC_WARRANTY_TRUST}{" "}
            <Link
              href={CERAMIC_WARRANTY_PATH}
              className="font-semibold text-accent transition-colors hover:text-ink"
            >
              See warranty details
            </Link>
          </p>
        ) : null}
      </Section>

      <QuoteCta heading={`Ready to book the ${detail.name} service?`} />
    </>
  );
}
