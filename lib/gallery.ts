/**
 * Gallery data.
 *
 * Alt text is deliberately generic — no make or model. It exists for screen
 * readers and SEO, and is never rendered on screen. Intrinsic width/height are
 * the real file dimensions; they drive the masonry layout and prevent layout
 * shift.
 *
 * RESOLUTION: the original set is all phone shots, 900x1600 or 576x1024 (one
 * landscape 1024x683) — nothing over 1600px on its long edge. On a retina
 * display a full-width surface needs ~2880px of source width, so those upscale
 * 3-5x full-bleed and look soft. Layouts are sized to stay at or under the
 * source resolution.
 *
 * The 2024 additions are the exception and are genuinely large:
 *   ferrari-hero-2 / ferrari-hero-3 / tesla-1 .... 3840x5120
 *   tesla-2 ...................................... 2921x2958
 *   royal-truck-1 / royal-truck-tire-1 ........... 2268x4032
 * Any of those can carry a full-bleed background without upscaling.
 *
 * ferrari-hero is NOT one of them — it is 1024x768, a compressed landscape
 * copy roughly a twentieth the file size of its siblings. It is used as the
 * lead carousel TILE (~312px wide, 624px retina) which it covers comfortably.
 * Do not promote it to a full-width background; it would upscale ~3x and blur.
 * If a Ferrari background is wanted, use ferrari-hero-2 or -3.
 */

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type FeatureVehicle = {
  id: string;
  /** Internal grouping reference only — never rendered. */
  label: string;
  exterior: GalleryImage[];
  interior: GalleryImage[];
};

const AREA = "Riverside & San Diego County";

/**
 * ORDER MATTERS. This array is the head of allGalleryImages, which is both the
 * /gallery masonry order and the hero carousel slide order. vehicle-4 sits
 * first so ferrari-hero.jpeg is slide 0 — the lead tile, and the one the hero
 * renders with priority.
 */
export const featureVehicles: FeatureVehicle[] = [
  {
    id: "vehicle-4",
    label: "Vehicle 4",
    exterior: [
      {
        src: "/royal-feature/ferrari-hero.jpeg",
        alt: `Mobile car detailing in ${AREA} — sports car with a mirror-gloss paint finish after a full exterior detail`,
        width: 1024,
        height: 768,
      },
      {
        src: "/royal-feature/ferrari-hero-2.jpeg",
        alt: `Mobile car detailing in ${AREA} — sports car detailed on site, paintwork polished to a deep reflective shine`,
        width: 3840,
        height: 5120,
      },
      {
        src: "/royal-feature/ferrari-hero-3.jpeg",
        alt: `Exterior car detailing in ${AREA} — sports car with cleaned wheels and gloss-finished bodywork`,
        width: 3840,
        height: 5120,
      },
    ],
    interior: [],
  },
  {
    id: "vehicle-5",
    label: "Vehicle 5",
    exterior: [
      {
        src: "/royal-feature/tesla-2.jpeg",
        alt: `Mobile car detailing in ${AREA} — electric SUV with a streak-free gloss finish, detailed on the customer's street`,
        width: 2921,
        height: 2958,
      },
    ],
    interior: [
      {
        src: "/royal-feature/tesla-1.jpeg",
        alt: `Interior car detailing in ${AREA} — electric SUV cabin with cleaned white leather seats, dashboard, and door sill`,
        width: 3840,
        height: 5120,
      },
    ],
  },
  {
    id: "vehicle-1",
    label: "Vehicle 1",
    exterior: [
      {
        src: "/royal-feature/vehicle-1-ext-1.jpg",
        alt: `Mobile car detailing in ${AREA} — sports car with a polished gloss finish, detailed in a residential driveway`,
        width: 576,
        height: 1024,
      },
      {
        src: "/royal-feature/vehicle-1-ext-2.jpg",
        alt: `Mobile car detailing in ${AREA} — freshly detailed sports car beside the Royal Rinse mobile detailing van`,
        width: 576,
        height: 1024,
      },
    ],
    interior: [],
  },
  {
    id: "vehicle-2",
    label: "Vehicle 2",
    exterior: [
      {
        src: "/royal-feature/vehicle-2-ext-1.jpg",
        alt: `Exterior car detailing in ${AREA} — sports car with a deep gloss finish after a full exterior detail`,
        width: 900,
        height: 1600,
      },
      {
        src: "/royal-feature/vehicle-2-ext-2.jpg",
        alt: `Mobile auto detailing in ${AREA} — sports car detailed on site with the Royal Rinse van in the background`,
        width: 900,
        height: 1600,
      },
      {
        src: "/royal-feature/vehicle-2-ext-3.jpg",
        alt: `Wheel and paint detailing in ${AREA} — close-up of a cleaned wheel and reflective paintwork`,
        width: 900,
        height: 1600,
      },
    ],
    interior: [
      {
        src: "/royal-feature/vehicle-2-int-1.jpg",
        alt: `Interior car detailing in ${AREA} — cleaned cabin with detailed seats, dashboard, and door sill`,
        width: 900,
        height: 1600,
      },
    ],
  },
  {
    id: "vehicle-3",
    label: "Vehicle 3",
    exterior: [],
    interior: [
      {
        src: "/royal-feature/vehicle-3-int-1.jpg",
        alt: `Interior car detailing in ${AREA} — cleaned cabin with two-tone leather seats, steering wheel, and centre console`,
        width: 1024,
        height: 683,
      },
    ],
  },
];

export const exteriorGallery: GalleryImage[] = [
  {
    src: "/royal-exterior/exterior-1.jpg",
    alt: `Exterior car detailing in ${AREA} — classic car with polished chrome trim and a mirror-gloss paint finish`,
    width: 900,
    height: 1600,
  },
  {
    src: "/royal-exterior/exterior-2.jpg",
    alt: `Exterior truck detailing in ${AREA} — lifted pickup truck with off-road wheels, detailed in a driveway`,
    width: 576,
    height: 1024,
  },
  {
    src: "/royal-exterior/exterior-3.jpg",
    alt: `Exterior truck detailing in ${AREA} — lifted pickup truck with a roof light bar after a full exterior detail`,
    width: 576,
    height: 1024,
  },
  {
    src: "/royal-exterior/exterior-4.jpg",
    alt: `Exterior truck detailing in ${AREA} — pickup truck with a deep gloss finish and polished chrome grille`,
    width: 900,
    height: 1600,
  },
  {
    src: "/royal-feature/royal-truck-1.jpeg",
    alt: `Mobile detailing in ${AREA} — the Royal Rinse mobile detailing truck, washed and detailed`,
    width: 2268,
    height: 4032,
  },
  {
    src: "/royal-feature/royal-truck-tire-1.jpeg",
    alt: `Wheel and tire detailing in ${AREA} — close-up of a cleaned truck wheel with dressed tire sidewall`,
    width: 2268,
    height: 4032,
  },
];

/**
 * Photos in public/royal-interior/. Feeds interiorGallery, which feeds
 * allGalleryImages — so anything added here shows up on /gallery,
 * /gallery/interior and in the homepage hero carousel automatically.
 */
export const royalInteriorGallery: GalleryImage[] = [
  {
    src: "/royal-interior/benz-interior.jpeg",
    alt: `Interior car detailing in ${AREA} — luxury sedan cabin with cleaned cream leather seats, dashboard, and wood trim`,
    width: 900,
    height: 1600,
  },
  {
    src: "/royal-interior/classic-interior.jpeg",
    alt: `Interior car detailing in ${AREA} — classic car cabin with red and white upholstery, cleaned dashboard and steering wheel`,
    width: 900,
    height: 1600,
  },
  {
    src: "/royal-interior/classic-interior-2.jpeg",
    alt: `Interior car detailing in ${AREA} — classic car rear bench seat and carpets after a full interior clean`,
    width: 900,
    height: 1600,
  },
  {
    src: "/royal-interior/porsche-interiors.jpeg",
    alt: `Interior car detailing in ${AREA} — SUV cabin with cleaned tan leather seats, centre console, and floor mats`,
    width: 900,
    height: 1600,
  },
  {
    src: "/royal-interior/porsche-interiors-2.jpeg",
    alt: `Interior car detailing in ${AREA} — detailed SUV dashboard, vents, and front seats in tan leather`,
    width: 900,
    height: 1600,
  },
  {
    src: "/royal-interior/porsche-interiors-3.jpeg",
    alt: `Interior car detailing in ${AREA} — SUV rear seats and footwells cleaned and conditioned`,
    width: 900,
    height: 1600,
  },
];

/**
 * The interior page shows the royal-interior folder first, then falls back on
 * the interior shots already captured in the feature set, so the page is never
 * blank while royal-interior is still empty.
 */
export const interiorGallery: GalleryImage[] = [
  ...royalInteriorGallery,
  ...featureVehicles.flatMap((vehicle) => vehicle.interior),
];

/** Every photo on the site, de-duplicated by src. Powers the main /gallery. */
export const allGalleryImages: GalleryImage[] = Array.from(
  new Map(
    [
      ...featureVehicles.flatMap((vehicle) => [
        ...vehicle.exterior,
        ...vehicle.interior,
      ]),
      ...exteriorGallery,
      ...interiorGallery,
    ].map((image) => [image.src, image]),
  ).values(),
);

/**
 * ============================================================
 *  HERO ROTATION — a view over allGalleryImages, not a new set.
 * ============================================================
 * The hero shows several tiles at once (3 on desktop), so unlike the /gallery
 * masonry it is sensitive to what sits NEXT TO what. Two adjustments, both
 * about the Ferrari set — three shots of the same cream car taken minutes
 * apart in the same driveway.
 *
 * Nothing here removes a photo from the SITE. /gallery renders
 * allGalleryImages, so anything dropped below is still on /gallery.
 */

/**
 * ferrari-hero.jpeg and ferrari-hero-2.jpeg are the same front-three-quarter
 * framing of the same car against the same villa — side by side in a row they
 * read as a stutter rather than two pieces of work. -2 is the keeper: more
 * head-on, and 3840x5120 against the other's 1024x768.
 *
 * ANY surface that shows several photos at once should filter with
 * isNearDuplicate() — the hero row and the homepage "Recent work" masonry both
 * do. /gallery deliberately does not: it renders allGalleryImages, one photo
 * per tile with no pairing implied, so the extra angle is welcome there.
 */
const NEAR_DUPLICATE_SRCS = new Set(["/royal-feature/ferrari-hero.jpeg"]);

export const isNearDuplicate = (src: string) => NEAR_DUPLICATE_SRCS.has(src);

/**
 * With the near-duplicate gone, the two SURVIVING Ferraris (-2 and -3) would
 * still be slides 0 and 1 — the same car twice in one glance. -3 is a clearly
 * different shot (door open, mountain vista) so it earns its place; it is
 * just pushed far enough down that it can never share a viewport with -2.
 * Any gap of 3+ does it, since desktop shows at most 3 tiles.
 */
const HERO_DEFERRED = "/royal-feature/ferrari-hero-3.jpeg";
const HERO_DEFERRED_TO = 6;

export const heroSlides: GalleryImage[] = (() => {
  const pool = allGalleryImages.filter((image) => !isNearDuplicate(image.src));
  const from = pool.findIndex((image) => image.src === HERO_DEFERRED);
  if (from === -1) return pool;
  const [moved] = pool.splice(from, 1);
  pool.splice(Math.min(HERO_DEFERRED_TO, pool.length), 0, moved);
  return pool;
})();
