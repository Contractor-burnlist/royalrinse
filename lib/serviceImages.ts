import {
  exteriorGallery,
  featureVehicles,
  interiorGallery,
  type GalleryImage,
} from "@/lib/gallery";

const exteriors = featureVehicles.flatMap((vehicle) => vehicle.exterior);

/**
 * Presentation-only: which photo backs each service card. Purely visual — the
 * services data itself is untouched. Interior-leaning tiers get cabin shots,
 * exterior/protection tiers get paint and wheel shots.
 */
export const serviceCardImages: Record<string, GalleryImage> = {
  bronze: exteriorGallery[1],
  silver: exteriorGallery[0],
  gold: exteriors[3] ?? exteriors[0],
  platinum: interiorGallery[0] ?? exteriors[0],
  diamond: exteriors[1] ?? exteriors[0],
  "ceramic-coating": exteriors[4] ?? exteriors[2],
  "maintenance-plans": exteriorGallery[3],
  "rv-detailing": exteriorGallery[2],
};

export function serviceImage(slug: string): GalleryImage {
  return serviceCardImages[slug] ?? exteriors[0];
}
