import "server-only";
/**
 * SINGLE SOURCE OF TRUTH for the internal /ops Booking Checker.
 *
 * These are INTERNAL prices. Only app/ops may import from lib/ops: no public
 * page may import this file or render these numbers.
 *
 * Every rule, price, city, drive time and tech lives in this file. Change a
 * number here and the checker, the job note, the map and the tests all follow.
 * Nothing in this file may be copied into another file.
 *
 * SERVER ONLY. The browser gets this data from the password-protected
 * /ops/api/data route, never from the JS bundle. The "server-only" import
 * makes the build fail if a client component ever imports this file.
 */
import type { AddOn, LatLng, Package, RulesData, Tech } from "./engine";

/** Max drive (minutes) for jobs under the price limit. */
export const DRIVE_LIMIT_MIN = 30;
/** Jobs at or above this total (dollars) can go any distance. */
export const PRICE_LIMIT = 175;

/* ------------------------------------------------------------------------ */
/* Cities                                                                   */
/* ------------------------------------------------------------------------ */

/** Order matters: it is the row and column order of DRIVE_MATRIX. */
export const CITY_NAMES = [
  "Riverside",
  "Corona",
  "Moreno Valley",
  "San Bernardino",
  "Redlands",
  "Perris",
  "Menifee",
  "Lake Elsinore",
  "Hemet",
  "Wildomar",
  "Murrieta",
  "Temecula",
  "Fallbrook",
  "San Marcos",
  "Escondido",
  "San Diego coast",
] as const;

export type CityName = (typeof CITY_NAMES)[number];

export const CITY_COORDS: Record<CityName, LatLng> = {
  Riverside: [33.9533, -117.3962],
  Corona: [33.8753, -117.5664],
  "Moreno Valley": [33.9425, -117.2297],
  "San Bernardino": [34.1083, -117.2898],
  Redlands: [34.0556, -117.1825],
  Perris: [33.7825, -117.2286],
  Menifee: [33.6971, -117.185],
  "Lake Elsinore": [33.6681, -117.3273],
  Hemet: [33.7476, -116.972],
  Wildomar: [33.5989, -117.28],
  Murrieta: [33.5539, -117.2139],
  Temecula: [33.4936, -117.1484],
  Fallbrook: [33.3764, -117.2511],
  "San Marcos": [33.1434, -117.1661],
  Escondido: [33.1192, -117.0864],
  "San Diego coast": [32.86, -117.25],
};

/** Map only: cities whose name goes on the left of the dot so it does not cover a neighbor. */
export const MAP_LABEL_LEFT: CityName[] = ["Corona", "Lake Elsinore", "Wildomar", "Fallbrook"];

/** Customer areas that use a listed city's drive times. */
export const CITY_ALIASES: Record<string, CityName> = {
  "Jurupa Valley": "Riverside",
  Eastvale: "Riverside",
  Norco: "Corona",
  "Canyon Lake": "Menifee",
  Winchester: "Menifee",
  "French Valley": "Murrieta",
  Vista: "San Marcos",
  "La Jolla": "San Diego coast",
  "Del Mar": "San Diego coast",
  "Carmel Valley": "San Diego coast",
  "Rancho Santa Fe": "San Diego coast",
  "Pacific Beach": "San Diego coast",
};

/**
 * Drive time in minutes. Each row is a start city; the columns follow
 * CITY_NAMES. These are fixed numbers: never recalculate them or call a
 * routing API.
 */
// prettier-ignore
export const DRIVE_MATRIX: Record<CityName, readonly number[]> = {
  Riverside:         [0, 20, 20, 20, 25, 30, 40, 40, 55, 50, 50, 55, 75, 85, 85, 120],
  Corona:            [20, 0, 35, 35, 40, 40, 45, 30, 65, 40, 40, 50, 65, 80, 75, 110],
  "Moreno Valley":   [20, 35, 0, 25, 30, 25, 35, 40, 40, 50, 45, 50, 65, 80, 80, 115],
  "San Bernardino":  [20, 35, 25, 0, 20, 35, 45, 55, 55, 60, 60, 60, 80, 95, 90, 125],
  Redlands:          [25, 40, 30, 20, 0, 40, 50, 60, 45, 65, 65, 65, 85, 100, 95, 130],
  Perris:            [30, 40, 25, 35, 40, 0, 15, 20, 30, 30, 30, 30, 50, 65, 60, 95],
  Menifee:           [40, 45, 35, 45, 50, 15, 0, 20, 30, 25, 20, 25, 40, 55, 55, 90],
  "Lake Elsinore":   [40, 30, 40, 55, 60, 20, 20, 0, 40, 15, 20, 25, 40, 55, 55, 90],
  Hemet:             [55, 65, 40, 55, 45, 30, 30, 40, 0, 45, 40, 40, 60, 70, 70, 105],
  Wildomar:          [50, 40, 50, 60, 65, 30, 25, 15, 45, 0, 15, 20, 35, 50, 50, 85],
  Murrieta:          [50, 40, 45, 60, 65, 30, 20, 20, 40, 15, 0, 15, 30, 45, 45, 80],
  Temecula:          [55, 50, 50, 60, 65, 30, 25, 25, 40, 20, 15, 0, 25, 40, 35, 70],
  Fallbrook:         [75, 65, 65, 80, 85, 50, 40, 40, 60, 35, 30, 25, 0, 35, 35, 70],
  "San Marcos":      [85, 80, 80, 95, 100, 65, 55, 55, 70, 50, 45, 40, 35, 0, 10, 45],
  Escondido:         [85, 75, 80, 90, 95, 60, 55, 55, 70, 50, 45, 35, 35, 10, 0, 40],
  "San Diego coast": [120, 110, 115, 125, 130, 95, 90, 90, 105, 85, 80, 70, 70, 45, 40, 0],
};

/* ------------------------------------------------------------------------ */
/* Techs                                                                    */
/* ------------------------------------------------------------------------ */

export const TECHS: Tech[] = [
  {
    id: "andre",
    name: "Andre",
    homeCity: "Riverside",
    coverage: [{ center: CITY_COORDS.Riverside, radiusMiles: 22.5 }],
  },
  {
    id: "luna",
    name: "Luna",
    homeCity: "Temecula",
    coverage: [
      { center: CITY_COORDS.Temecula, radiusMiles: 22.5 },
      // Extends her zone south to San Marcos and Escondido.
      { center: [33.17, -117.12], radiusMiles: 7 },
    ],
  },
  {
    id: "kevin",
    name: "Kevin",
    homeCity: null,
    askTim: "Ask Tim before giving Kevin a job.",
    coverage: [],
  },
];

/* ------------------------------------------------------------------------ */
/* Packages                                                                 */
/* ------------------------------------------------------------------------ */

export const PACKAGE_GROUPS = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum and Diamond",
  "Other",
] as const;

export const PACKAGES: Package[] = [
  // Bronze
  { id: "bronze-sedan-inside", name: "Bronze Sedan, inside only", price: 95, group: "Bronze" },
  { id: "bronze-sedan-outside", name: "Bronze Sedan, outside only", price: 95, group: "Bronze" },
  { id: "bronze-sedan-full", name: "Bronze Sedan Full Detail", price: 149, group: "Bronze" },
  { id: "bronze-suv-inside", name: "Bronze SUV / Truck, inside only", price: 110, group: "Bronze" },
  { id: "bronze-truck-outside", name: "Bronze Truck, outside only", price: 110, group: "Bronze" },
  { id: "bronze-truck-full", name: "Bronze Truck Full Detail", price: 175, group: "Bronze" },
  // Silver
  { id: "silver-sedan", name: "Silver Sedan", price: 175, group: "Silver" },
  { id: "silver-suv", name: "Silver SUV / Truck", price: 225, group: "Silver" },
  // Gold
  { id: "gold-sedan", name: "Gold Sedan", price: 225, group: "Gold" },
  { id: "gold-suv", name: "Gold SUV / Truck", price: 275, group: "Gold" },
  { id: "gold-sedan-inside", name: "Gold Sedan, inside only", price: 199, group: "Gold" },
  { id: "gold-sedan-outside", name: "Gold Sedan, outside only", price: 175, group: "Gold" },
  { id: "gold-truck-inside", name: "Gold Truck, inside only", price: 225, group: "Gold" },
  { id: "gold-truck-outside", name: "Gold Truck, outside only", price: 190, group: "Gold" },
  // Platinum and Diamond
  { id: "platinum-ext-sedan", name: "Platinum Exterior Sedan", price: 225, group: "Platinum and Diamond" },
  { id: "platinum-ext-truck", name: "Platinum Exterior Truck / SUV", price: 250, group: "Platinum and Diamond" },
  { id: "platinum-int-sedan", name: "Platinum Interior Sedan / Mid SUV", price: 275, group: "Platinum and Diamond" },
  { id: "platinum-int-truck", name: "Platinum Interior Truck / Oversized", price: 290, group: "Platinum and Diamond" },
  { id: "platinum-full-sedan", name: "Platinum Full Detail Sedan / SUV", price: 325, group: "Platinum and Diamond" },
  { id: "platinum-full-truck", name: "Platinum Full Detail Truck / Oversized", price: 375, group: "Platinum and Diamond" },
  { id: "diamond-full", name: "Diamond Full Detail / Oversized SUV", price: 450, group: "Platinum and Diamond" },
  // Other
  { id: "express-wash", name: "Express Maintenance Wash", price: 85, group: "Other" },
  {
    id: "ceramic",
    name: "Ceramic coating (any level)",
    // Treated as $249 or more, so it always passes the price limit.
    price: 249,
    priceFrom: true,
    group: "Other",
    note: "Ceramic jobs: confirm details with Tim.",
  },
  { id: "rv", name: "RV detailing", price: null, group: "Other", askTim: "RV jobs: ask Tim." },
];

/* ------------------------------------------------------------------------ */
/* Add-ons                                                                  */
/* ------------------------------------------------------------------------ */

export const ADD_ONS: AddOn[] = [
  { id: "pet-hair", name: "Pet Hair Removal", price: 40 },
  { id: "steam", name: "Steam Cleaning", price: 50 },
  { id: "shampoo", name: "Heated Shampoo Extraction", price: 100 },
  { id: "steam-shampoo", name: "Steam Upholstery & Heated Shampoo", price: 125 },
  { id: "engine-bay", name: "Engine Bay Cleaning", price: 55 },
  { id: "headlights", name: "Headlight Restoration", price: 99 },
  { id: "ozone", name: "Ozone Treatment", price: 65 },
  { id: "sap", name: "Sap Removal", price: 50 },
  { id: "trim", name: "Trim Conditioning Coat", price: 40 },
];

/* ------------------------------------------------------------------------ */
/* Bronze to Silver upsell                                                  */
/* ------------------------------------------------------------------------ */

/** Bronze package id -> the Silver package to offer. */
export const BRONZE_TO_SILVER: Record<string, string> = {
  "bronze-sedan-inside": "silver-sedan",
  "bronze-sedan-outside": "silver-sedan",
  "bronze-sedan-full": "silver-sedan",
  "bronze-suv-inside": "silver-suv",
  "bronze-truck-outside": "silver-suv",
  "bronze-truck-full": "silver-suv",
};

/* ------------------------------------------------------------------------ */
/* Everything above, in the shape the engine and /ops/api/data use          */
/* ------------------------------------------------------------------------ */

export const RULES: RulesData = {
  driveLimitMin: DRIVE_LIMIT_MIN,
  priceLimit: PRICE_LIMIT,
  cityNames: [...CITY_NAMES],
  cityCoords: CITY_COORDS,
  cityAliases: CITY_ALIASES,
  mapLabelLeft: MAP_LABEL_LEFT,
  driveMatrix: Object.fromEntries(CITY_NAMES.map((c) => [c, [...DRIVE_MATRIX[c]]])),
  techs: TECHS,
  packageGroups: [...PACKAGE_GROUPS],
  packages: PACKAGES,
  addOns: ADD_ONS,
  bronzeToSilver: BRONZE_TO_SILVER,
};
