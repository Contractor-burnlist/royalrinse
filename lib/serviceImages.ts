import { allGalleryImages, type GalleryImage } from "@/lib/gallery";

const byFile = (name: string): GalleryImage | undefined =>
  allGalleryImages.find((image) => image.src.endsWith(name));

const FALLBACK = allGalleryImages[0];

/**
 * Presentation-only: which photo backs each service card. Purely visual — the
 * services data itself is untouched.
 *
 * ONE DISTINCT VEHICLE PER CARD. The photo pool contains eight vehicles; the
 * six cards below each use a different one, so nothing repeats:
 *
 *   bronze          Ram 1500          black pickup, exterior     (900px)
 *   silver          classic Chevy     red/white, exterior        (900px)
 *   gold            Mercedes S-Class  cream leather, interior    (900px)
 *   platinum        Porsche Cayenne   tan leather, interior      (900px)
 *   diamond         Porsche 718       mint green, exterior       (900px)
 *   ceramic-coating Ferrari Roma      white, exterior            (576px)
 *
 * All but the Ferrari are 900px sources, so at ~346px card width they render
 * downscaled and sharp. The Ferrari is a 576px file (~1.2x) — a mild, barely
 * visible softness, and it's the only vehicle left that reads as "premium
 * gloss" for the ceramic card.
 *
 * The two 576px F-150 truck shots back maintenance/RV, which aren't part of
 * the six homepage cards.
 */
export const serviceCardImages: Record<string, GalleryImage> = {
  bronze: byFile("exterior-4.jpg") ?? FALLBACK,
  silver: byFile("exterior-1.jpg") ?? FALLBACK,
  gold: byFile("benz-interior.jpeg") ?? FALLBACK,
  platinum: byFile("porsche-interiors-2.jpeg") ?? FALLBACK,
  diamond: byFile("vehicle-2-ext-1.jpg") ?? FALLBACK,
  "ceramic-coating": byFile("vehicle-1-ext-1.jpg") ?? FALLBACK,

  // Not homepage cards — the lifted F-150 shots suit these.
  "maintenance-plans": byFile("exterior-2.jpg") ?? FALLBACK,
  "rv-detailing": byFile("exterior-3.jpg") ?? FALLBACK,
};

export function serviceImage(slug: string): GalleryImage {
  return serviceCardImages[slug] ?? FALLBACK;
}
