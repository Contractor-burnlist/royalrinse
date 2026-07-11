import { exteriorGallery, featureVehicles, type GalleryImage } from "@/lib/gallery";

const exteriors = featureVehicles.flatMap((vehicle) => vehicle.exterior);
const interiors = featureVehicles.flatMap((vehicle) => vehicle.interior);

const byFile = (name: string): GalleryImage | undefined =>
  [...exteriors, ...interiors, ...exteriorGallery].find((image) =>
    image.src.endsWith(name),
  );

const FALLBACK = exteriors[0];

/**
 * Presentation-only: which photo backs each service card. Purely visual — the
 * services data itself is untouched.
 *
 * Every card is pinned to a 900px-wide source. The 576px files (vehicle-1-*,
 * exterior-2, exterior-3) would render ~1.2x upscaled at card size, so they're
 * kept off the cards and appear only in the gallery, where the tiles are small
 * enough that it doesn't read as soft.
 */
export const serviceCardImages: Record<string, GalleryImage> = {
  bronze: byFile("exterior-1.jpg") ?? FALLBACK,
  silver: byFile("exterior-4.jpg") ?? FALLBACK,
  gold: byFile("vehicle-2-ext-3.jpg") ?? FALLBACK,
  platinum: byFile("vehicle-2-int-1.jpg") ?? FALLBACK,
  diamond: byFile("vehicle-2-ext-1.jpg") ?? FALLBACK,
  "ceramic-coating": byFile("vehicle-2-ext-2.jpg") ?? FALLBACK,
  "maintenance-plans": byFile("exterior-4.jpg") ?? FALLBACK,
  "rv-detailing": byFile("exterior-1.jpg") ?? FALLBACK,
};

export function serviceImage(slug: string): GalleryImage {
  return serviceCardImages[slug] ?? FALLBACK;
}
