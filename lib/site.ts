/**
 * Single source of truth for business facts, nav, and shared copy.
 * [EMAIL] is still a placeholder token — swap the value below and every
 * link/label across the site updates.
 */

/** Human-readable number. */
export const PHONE_DISPLAY = "(951) 338-9117";
/** E.164 dial link — digits only, no formatting. */
export const PHONE_TEL = "tel:+19513389117";
/** For aria-labels on icon/button call CTAs. */
export const PHONE_ARIA = `Call Royal Rinse at ${PHONE_DISPLAY}`;

/** The counties served. Change here to update every mention site-wide. */
export const SERVICE_AREA_LINE = "Riverside & San Diego County";
export const SERVICE_AREA_SHORT = "Serving Riverside & San Diego County";
/** Counties as separate entities, for JSON-LD areaServed. */
export const SERVICE_AREA_COUNTIES = [
  "Riverside County, CA",
  "San Diego County, CA",
];

export const site = {
  name: "Royal Rinse",
  tagline: "Mobile Auto Detailing — We Come To You",
  phone: PHONE_DISPLAY,
  email: "[EMAIL]",
  license: "Licensed, Insured & Bonded — CA DLSE CW-LR-1001298512",
  licenseNumber: "CW-LR-1001298512",
  hours: [
    { days: "Mon – Fri", time: "7:00 AM – 6:00 PM" },
    { days: "Saturday", time: "8:00 AM – 5:00 PM" },
    { days: "Sunday", time: "By appointment" },
  ],
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
] as const;

// Services live in lib/services.ts — the pricebook is the source of truth.

// Cities live in lib/serviceAreas.ts — that list is the source of truth.

export const steps = [
  {
    number: "01",
    title: "Book online or call",
    description: "Pick a time that works for you. Tell us the vehicle and the service — we handle the rest.",
  },
  {
    number: "02",
    title: "We come to your home or office",
    description: "Our mobile rig arrives fully self-contained. No dropoff, no waiting room, no lost afternoon.",
  },
  {
    number: "03",
    title: "Showroom finish, no hassle",
    description: "You get back a car that looks like it just rolled off the lot — without ever leaving your driveway.",
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
    description: `Registered with the California DLSE under license ${site.licenseNumber}. Not a side hustle — a properly registered business.`,
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
      "Bonded for your protection. If something ever goes wrong, you are financially protected — you are not left carrying the risk.",
  },
] as const;

// Reviews live in lib/reviews.ts — real customer text, verbatim.
