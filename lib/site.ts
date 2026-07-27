/** Single source of truth for business facts, nav, and shared copy. */

/** Human-readable number. */
export const PHONE_DISPLAY = "(951) 338-9117";
/** E.164 dial link — digits only, no formatting. */
export const PHONE_TEL = "tel:+19513389117";
/** For aria-labels on icon/button call CTAs. */
export const PHONE_ARIA = `Call Royal Rinse at ${PHONE_DISPLAY}`;

/**
 * Verified Google Business Profile ("Royal Rinse Mobile Detailing", Menifee).
 * Used for the Reviews link, JSON-LD hasMap/sameAs, and the embedded map.
 */
export const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/kDNSHnjyaMqw2bLN7";
export const GOOGLE_MAPS_URL = GOOGLE_REVIEWS_URL;
export const GOOGLE_PLACE_ID = "ChIJxSthpHbyb4ARU2gL9HM7-4Y";
/**
 * Embeddable map (no API key). Uses the ?output=embed form keyed on the
 * business name + home city, which reliably centres on the Google Business
 * Profile pin. Swap for a Maps Embed API URL if a key is ever added.
 */
export const GOOGLE_MAP_EMBED_URL =
  "https://www.google.com/maps?q=Royal+Rinse+Mobile+Detailing,+Menifee,+CA&output=embed";

/** Price band for schema. "$$" = mid/premium — no exact prices published. */
export const PRICE_RANGE = "$$";

/**
 * Google aggregate rating for the LocalBusiness schema.
 *
 * Real Google Business Profile figures: 5.0 stars across 30+ reviews. Schema
 * needs a concrete number, so reviewCount uses 30 as a floor; on-page copy
 * shows "30+" via REVIEW_COUNT_DISPLAY.
 */
export const AGGREGATE_RATING: {
  ratingValue: number;
  reviewCount: number;
} | null = { ratingValue: 5.0, reviewCount: 30 };

/** On-page display strings for the Google rating (schema uses AGGREGATE_RATING). */
export const REVIEW_RATING_DISPLAY = "5.0";
export const REVIEW_COUNT_DISPLAY = "30+";

/** The counties served. The generic region line, used in many places. */
export const SERVICE_AREA_LINE = "Riverside & San Diego County";
/**
 * Priority-market phrasing — leads with our home base (Menifee) and Temecula,
 * then the wider region. Use this for the highest-visibility geo copy (hero
 * eyebrow, service-area teaser, footer) so the site emphasizes where we most
 * want to rank, without deleting the broader region.
 */
export const SERVICE_AREA_SHORT =
  "Serving Menifee, Temecula & all of Riverside & San Diego County";
export const SERVICE_AREA_PRIORITY =
  "Menifee, Temecula & all of Riverside & San Diego County";
/** Counties as separate entities, for JSON-LD areaServed. */
export const SERVICE_AREA_COUNTIES = [
  "Riverside County, CA",
  "San Diego County, CA",
];

export const site = {
  /** Display brand used in visible UI. */
  name: "Royal Rinse",
  /**
   * Exact registered / Google Business Profile name. Use this for NAP and all
   * structured data so the site matches the GBP verbatim.
   */
  legalName: "Royal Rinse Mobile Detailing",
  tagline: "Mobile Auto Detailing: We Come To You",
  phone: PHONE_DISPLAY,
  email: "office@royalrinsemobile.com",
  license: "Licensed, Insured & Bonded: CA DLSE CW-LR-1001298512",
  licenseNumber: "CW-LR-1001298512",
  // Open 7 days. Single entry — every day is the same, so listing each day
  // would just be noise.
  hours: [{ days: "Open 7 Days", time: "8:00 AM - 8:00 PM" }],
} as const;

/** Machine-readable hours for JSON-LD. 24-hour time, all seven days. */
export const OPENING_HOURS = {
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  opens: "08:00",
  closes: "20:00",
} as const;

export const telHref = PHONE_TEL;
export const mailHref = `mailto:${site.email}`;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Service Area", href: "/service-area" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

// Services live in lib/services.ts — the pricebook is the source of truth.

// Cities live in lib/serviceAreas.ts — that list is the source of truth.

export const steps = [
  {
    number: "01",
    title: "Book online or call",
    description: "Pick a time that works for you. Tell us the vehicle and the service. We handle the rest.",
  },
  {
    number: "02",
    title: "We come to your home or office",
    description: "Our mobile rig arrives fully self-contained. No dropoff, no waiting room, no lost afternoon.",
  },
  {
    number: "03",
    title: "Showroom finish, no hassle",
    description: "You get back a car that looks like it just rolled off the lot, without ever leaving your driveway.",
  },
] as const;

export const valueProps = [
  {
    title: "Total convenience",
    description: "We come to you. Your car gets detailed while you work, relax, or run the day as usual.",
  },
  {
    title: "Professional products",
    description: "Pro-grade equipment and premium products chosen for real results, not shelf appeal.",
  },
  {
    title: "Obsessive attention to detail",
    description: "Every vent, seam, and panel gets the same care. The finish is in the parts most people skip.",
  },
  {
    title: "Licensed, insured & bonded",
    description: site.license,
  },
] as const;

/** The three credentials, spelled out. Used on /about and the homepage. */
export const credentials = [
  {
    title: "Licensed",
    icon: "shield",
    description: `Registered with the California DLSE under license ${site.licenseNumber}. Not a side hustle: a properly registered business.`,
  },
  {
    title: "Insured",
    icon: "check",
    description:
      "Fully insured, so your vehicle and your property are covered from the moment we arrive until the moment we leave.",
  },
  {
    title: "Bonded",
    icon: "diamond",
    description:
      "Bonded for your protection. If something ever goes wrong, you are financially protected: you are not left carrying the risk.",
  },
] as const;

// Reviews live in lib/reviews.ts — real customer text, verbatim.
