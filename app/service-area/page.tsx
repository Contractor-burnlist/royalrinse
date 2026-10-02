import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { allGalleryImages } from "@/lib/gallery";
import { citiesInCounty, counties } from "@/lib/serviceAreas";
import { QuoteCta } from "@/components/QuoteCta";
import { Container, Eyebrow, Icon, Section } from "@/components/ui";

export const metadata: Metadata = buildMetadata({
  title: "Service Area: Riverside & San Diego County | Royal Rinse",
  description:
    "Royal Rinse brings mobile auto detailing to Menifee, Temecula, Murrieta, Riverside, San Diego, La Jolla, Escondido and beyond across both counties. We come to you.",
  path: "/service-area",
});

/**
 * The car in a customer's driveway with the stocked van open behind it — the
 * "we come to you" claim, shown. It is a 768px source, so the frame is a fixed
 * 320px (640 device pixels on retina): under native width, never upscaled.
 */
const rigImage = allGalleryImages.find((image) =>
  image.src.endsWith("mobile-rig-1.jpeg"),
);

export default function ServiceAreaPage() {
  return (
    <>
      <div className="rule-chrome-b metal-inset">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
            <div>
              <Eyebrow>Service area</Eyebrow>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-metal sm:text-5xl">
                Serving Riverside &amp; San Diego County, We Come To You
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                Our mobile rig is fully self-contained, so we detail your vehicle right
                where it sits, at your home or your office. No drop-off, no waiting room.
              </p>
            </div>

            {rigImage ? (
              <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl edge-chrome shadow-2xl">
                <Image
                  src={rigImage.src}
                  alt={rigImage.alt}
                  fill
                  priority
                  quality={85}
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        </Container>
      </div>

      <Section>
        <div className="grid gap-14 sm:grid-cols-2">
          {counties.map((county) => (
            <div key={county}>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                {county} County
              </h2>
              <ul className="mt-6 space-y-1">
                {citiesInCounty(county).map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/service-area/${city.slug}`}
                      className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
                    >
                      {city.name}
                      <span
                        aria-hidden="true"
                        className="text-chrome-bright opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-14 flex items-center gap-2 text-sm text-muted">
          <Icon name="check" className="h-4 w-4 shrink-0 text-chrome" />
          Don&rsquo;t see your city? Give us a call. If you&rsquo;re nearby, we can
          usually get to you.
        </p>
      </Section>

      <QuoteCta heading="Ready to book?" />
    </>
  );
}
