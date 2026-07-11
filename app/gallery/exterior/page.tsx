import type { Metadata } from "next";
import { exteriorGallery } from "@/lib/gallery";
import { GallerySubPage } from "@/components/GallerySubPage";

export const metadata: Metadata = {
  title: "Exterior Detailing Gallery | Royal Rinse — Riverside & San Diego County",
  description:
    "Exterior mobile auto detailing photos from Royal Rinse — paint, wheels, and trim detailed on site across Riverside & San Diego County.",
};

export default function ExteriorGalleryPage() {
  return (
    <GallerySubPage
      eyebrow="Gallery"
      title="Exterior detailing"
      intro="Paint, wheels, glass, and trim — cleaned and finished in the driveway."
      images={exteriorGallery}
      otherHref="/gallery/interior"
      otherLabel="Interior gallery"
    />
  );
}
