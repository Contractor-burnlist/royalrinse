/**
 * Gallery data. Groupings below were determined by visually inspecting each
 * photo, not by filename — the source filenames were misleading (one shot
 * labelled "Porsche Interior 3" is a different car entirely).
 */

export type GalleryImage = { src: string; alt: string };

export type FeatureVehicle = {
  id: string;
  label: string;
  exterior: GalleryImage[];
  interior: GalleryImage[];
};

export const featureVehicles: FeatureVehicle[] = [
  {
    id: "vehicle-1",
    label: "Vehicle 1 — White Ferrari Roma",
    exterior: [
      {
        src: "/royal-feature/vehicle-1-ext-1.jpg",
        alt: "Exterior car detailing in San Diego — white Ferrari Roma with a polished gloss finish and black wheels, parked in a residential driveway",
      },
      {
        src: "/royal-feature/vehicle-1-ext-2.jpg",
        alt: "Mobile car detailing in San Diego — rear view of a white Ferrari Roma beside the Royal Rinse mobile detailing van",
      },
    ],
    interior: [],
  },
  {
    id: "vehicle-2",
    label: "Vehicle 2 — Mint Green Porsche 718 Spyder RS",
    exterior: [
      {
        src: "/royal-feature/vehicle-2-ext-1.jpg",
        alt: "Exterior car detailing in San Diego — mint green Porsche 718 Spyder RS with a carbon hood and gold-rimmed wheels, detailed in a driveway",
      },
      {
        src: "/royal-feature/vehicle-2-ext-2.jpg",
        alt: "Mobile auto detailing in San Diego — front view of a mint green Porsche 718 Spyder RS with the Royal Rinse van in the background",
      },
      {
        src: "/royal-feature/vehicle-2-ext-3.jpg",
        alt: "Wheel and paint detailing in San Diego — close-up of a mint green Porsche 718 Spyder RS showing a cleaned black wheel and reflective paintwork",
      },
    ],
    interior: [
      {
        src: "/royal-feature/vehicle-2-int-1.jpg",
        alt: "Interior car detailing in San Diego — Porsche 718 Spyder RS cabin with cleaned suede seats, dashboard, and door sill",
      },
    ],
  },
  {
    id: "vehicle-3",
    label: "Vehicle 3 — Porsche Panamera (interior only)",
    exterior: [],
    interior: [
      {
        src: "/royal-feature/vehicle-3-int-1.jpg",
        alt: "Interior car detailing in San Diego — Porsche Panamera cabin with a two-tone burgundy and cream leather interior, steering wheel, and centre console",
      },
    ],
  },
];

export const exteriorGallery: GalleryImage[] = [
  {
    src: "/royal-exterior/exterior-1.jpg",
    alt: "Exterior car detailing in San Diego — red classic Chevrolet with polished chrome trim and a mirror-gloss paint finish",
  },
  {
    src: "/royal-exterior/exterior-2.jpg",
    alt: "Exterior truck detailing in San Diego — lifted dark Ford F-150 with bronze off-road wheels, detailed in a driveway",
  },
  {
    src: "/royal-exterior/exterior-3.jpg",
    alt: "Exterior truck detailing in San Diego — lifted grey Ford F-150 with bronze wheels and a roof light bar",
  },
  {
    src: "/royal-exterior/exterior-4.jpg",
    alt: "Exterior truck detailing in San Diego — black Ram 1500 with a deep gloss finish and polished chrome grille",
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
