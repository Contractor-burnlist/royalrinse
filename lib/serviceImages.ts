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

/**
 * Proof shots for services that were otherwise only described in text.
 *
 * ONE PHOTO PER SECTION, ONE SECTION PER PHOTO — the six below (plus the
 * mobile-rig shot on /service-area) each appear exactly once, on different
 * pages:
 *
 *   /services#add-ons            engine-bay-2    Engine Bay Cleaning add-on
 *   /packages add-ons section    engine-bay-1    same add-on, different engine
 *   /services/bronze             wheel-detail-1  wheel + tire clean, tire shine
 *   /services/maintenance-plans  wheel-detail-2  wheels cleaned and dressed
 *   /services/ceramic-coating    wheel-detail-3  coated wheels and paint
 *
 * All five are 2268x4032, so every slot they sit in is well under native
 * width — nothing upscales.
 */
export const addOnsPhoto: GalleryImage = byFile("engine-bay-2.jpeg") ?? FALLBACK;

export const packagesAddOnsPhoto: GalleryImage =
  byFile("engine-bay-1.jpeg") ?? FALLBACK;

/** Optional photo on a /services/[slug] page. Most slugs have none. */
const serviceDetailPhotos: Record<string, GalleryImage | undefined> = {
  bronze: byFile("wheel-detail-1.jpeg"),
  "maintenance-plans": byFile("wheel-detail-2.jpeg"),
  "ceramic-coating": byFile("wheel-detail-3.jpeg"),
};

export function serviceDetailPhoto(slug: string): GalleryImage | undefined {
  return serviceDetailPhotos[slug];
}

/**
 * Homepage add-ons showcase: the add-ons that have a photo, keyed by the
 * add-on's name in lib/services.ts. Anything not listed renders as text.
 */
const addOnPhotos: Record<string, GalleryImage | undefined> = {
  "Engine Bay Cleaning": byFile("engine-bay-1.jpeg"),
  "Rim Coating": byFile("wheel-detail-2.jpeg"),
};

export function addOnPhoto(name: string): GalleryImage | undefined {
  return addOnPhotos[name];
}
