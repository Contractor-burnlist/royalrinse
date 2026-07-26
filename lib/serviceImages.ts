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

/**
 * Photos for the /packages page — kept SEPARATE from serviceCardImages so the
 * homepage cards above are untouched.
 *
 * DISTINCT VEHICLE PER SLOT, no repeats across the hero and all six sections.
 * Chosen to spread across the fleet and to keep every image sharp at the slot
 * it renders into:
 *
 *   hero            Tesla (white SUV)     glossy exterior banner   (2921px)
 *   bronze          lifted pickup         exterior                 (900px)
 *   silver          Mercedes S-Class      cream leather interior   (900px)
 *   gold            classic + chrome      glossy exterior          (900px)
 *   platinum        Porsche Cayenne       tan leather interior     (900px)
 *   diamond         Ferrari (cream)       flagship exterior        (3840px)
 *   ceramic-coating Porsche 718           mint-green exterior      (900px)
 *
 * The hero and Diamond render widest, so they take the two large sources
 * (Tesla 2921px, Ferrari 3840px) — sharp full-bleed with no upscaling. The
 * 900px cards sit behind a gradient as ~670px-wide side images, well inside
 * their native width. No 576px source is used here; all stay crisp.
 */
export const packageCardImages: Record<string, GalleryImage> = {
  bronze: byFile("exterior-4.jpg") ?? FALLBACK,
  silver: byFile("benz-interior.jpeg") ?? FALLBACK,
  gold: byFile("exterior-1.jpg") ?? FALLBACK,
  platinum: byFile("porsche-interiors-2.jpeg") ?? FALLBACK,
  diamond: byFile("ferrari-hero-2.jpeg") ?? FALLBACK,
  "ceramic-coating": byFile("vehicle-2-ext-1.jpg") ?? FALLBACK,
};

/** Glossy exterior banner behind the /packages page heading. */
export const packagesHeroImage: GalleryImage =
  byFile("tesla-2.jpeg") ?? FALLBACK;

export function packageImage(slug: string): GalleryImage {
  return packageCardImages[slug] ?? FALLBACK;
}
