import type { Metadata } from "next";
import { interiorGallery } from "@/lib/gallery";
import { GallerySubPage } from "@/components/GallerySubPage";

export const metadata: Metadata = {
  title: "Interior Detailing Gallery | Royal Rinse — Southern California",
  description:
    "Interior mobile auto detailing photos from Royal Rinse — seats, dashboards, and cabins detailed on site across Southern California.",
};

export default function InteriorGalleryPage() {
  return (
    <GallerySubPage
      eyebrow="Gallery"
      title="Interior detailing"
      intro="Seats, dashboards, consoles, and carpets — brought back to showroom condition."
      images={interiorGallery}
      otherHref="/gallery/exterior"
      otherLabel="Exterior gallery"
    />
  );
}
