/**
 * Gallery data.
 *
 * Alt text is deliberately generic — no make or model. It exists for screen
 * readers and SEO, and is never rendered on screen. Intrinsic width/height are
 * the real file dimensions; they drive the masonry layout and prevent layout
 * shift.
 *
 * RESOLUTION CEILING: every source is a portrait phone shot, 900x1600 or
 * 576x1024 (one landscape 1024x683). Nothing exceeds 1600px on its long edge.
 * On a retina display a full-width surface needs ~2880px of source width, so
 * any full-bleed use upscales 3-5x and looks soft. Layouts here are sized to
 * stay at or under the source resolution. To go truly full-bleed and sharp,
 * the photos must be re-exported from the originals at 2560px+ wide.
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

export const featureVehicles: FeatureVehicle[] = [
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
];

/**
 * Photos dropped into public/royal-interior/. Empty until they're uploaded —
 * add an entry here per file and it appears on /gallery/interior automatically.
 */
export const royalInteriorGallery: GalleryImage[] = [];

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
