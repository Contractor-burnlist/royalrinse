import type { Metadata } from "next";
import Link from "next/link";
import { exteriorGallery, featureVehicles, interiorGallery } from "@/lib/gallery";
import { LightboxGrid } from "@/components/Lightbox";
import { Container, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery | Royal Rinse — Mobile Auto Detailing Riverside & San Diego County",
  description:
    "Photos of recent mobile auto detailing work by Royal Rinse across Riverside & San Diego County — exterior paint, wheels, and interior detailing.",
};

const subGalleries = [
  {
    href: "/gallery/exterior",
    label: "Exterior",
    count: exteriorGallery.length,
  },
  {
    href: "/gallery/interior",
    label: "Interior",
    count: interiorGallery.length,
  },
];

export default function GalleryPage() {
  return (
    <>
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Gallery</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Our work
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Every car below was detailed on site — in a driveway, not a shop.
          </p>

          <nav className="mt-8 flex flex-wrap gap-3" aria-label="Gallery sections">
            {subGalleries.map((gallery) => (
              <Link
                key={gallery.href}
                href={gallery.href}
                className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-2 text-sm font-medium text-chrome transition-colors hover:border-royal hover:text-ink"
              >
                {gallery.label}
                <span className="text-xs text-muted">{gallery.count}</span>
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      <Section>
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Featured vehicles
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Each set below is a single vehicle, shown inside and out.
        </p>

        <div className="mt-14 space-y-16">
          {featureVehicles.map((vehicle) => {
            const images = [...vehicle.exterior, ...vehicle.interior];

            return (
              <article key={vehicle.id}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-hairline pb-4">
                  <h3 className="font-display text-xl font-bold text-ink">
                    {vehicle.label}
                  </h3>
                  <p className="text-sm text-muted">
                    {vehicle.exterior.length} exterior · {vehicle.interior.length}{" "}
                    interior
                  </p>
                </div>

                <LightboxGrid
                  images={images}
                  className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                />
              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}
