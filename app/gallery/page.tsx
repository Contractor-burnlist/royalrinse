import type { Metadata } from "next";
import { allGalleryImages } from "@/lib/gallery";
import { FilterableGallery } from "@/components/FilterableGallery";
import { QuoteCta } from "@/components/QuoteCta";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery | Royal Rinse — Mobile Auto Detailing Riverside & San Diego County",
  description:
    "Photos of recent mobile auto detailing work by Royal Rinse across Riverside & San Diego County — exotics, SUVs, trucks, and interior detailing. Filter by category.",
};

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
            Filter by category to see the work that&rsquo;s relevant to you.
          </p>
        </Container>
      </div>

      {/* Edge-to-edge: breaks out of the container for a fuller showcase. */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[110rem] px-3 sm:px-5">
          <FilterableGallery images={allGalleryImages} />
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
