import type { Metadata } from "next";
import Link from "next/link";
import { allGalleryImages, exteriorGallery, interiorGallery } from "@/lib/gallery";
import { LightboxGrid } from "@/components/Lightbox";
import { QuoteCta } from "@/components/QuoteCta";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery | Royal Rinse — Mobile Auto Detailing Riverside & San Diego County",
  description:
    "Photos of recent mobile auto detailing work by Royal Rinse across Riverside & San Diego County — exterior paint, wheels, and interior detailing.",
};

const subGalleries = [
  { href: "/gallery/exterior", label: "Exterior", count: exteriorGallery.length },
  { href: "/gallery/interior", label: "Interior", count: interiorGallery.length },
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
            Every vehicle below was detailed on site — in a driveway, not a shop.
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

      {/* Edge-to-edge: breaks out of the container for a fuller showcase. */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[110rem] px-3 sm:px-5">
          {/* Pure images — no captions, titles, or vehicle labels. */}
          <LightboxGrid
            images={allGalleryImages}
            variant="masonry"
            className="columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4"
            eagerCount={4}
          />
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
