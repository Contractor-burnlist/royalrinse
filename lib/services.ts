export type Tier = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  includes: string[];
  variants?: string[]; // service variations within the tier
  addOnNote?: string;
};

export const tiers: Tier[] = [
  {
    slug: "bronze",
    name: "Bronze",
    tagline: "Essential clean to keep your car sharp.",
    intro:
      "Our entry package covers the fundamentals — a thorough clean inside, outside, or both, done right.",
    includes: [
      "Thorough vacuuming of all interior surfaces, including carpets",
      "Complete wipe-down of plastics and leather to remove dust and buildup",
      "Streak-free cleaning of all interior glass",
      "Wheel and tire cleaning to remove brake dust and grime",
      "Gentle hand wash using paint-safe methods",
      "Air dry to prevent water spots, finished with tire shine",
    ],
    variants: ["Interior Only", "Exterior Only", "Full Detail (interior + exterior)"],
  },
  {
    slug: "silver",
    name: "Silver",
    tagline: "A complete interior and exterior refresh with added protection.",
    intro:
      "Our Silver package delivers a full interior and exterior clean, finished with a ceramic spray wax for added gloss and paint protection.",
    includes: [
      "Interior cleaning and conditioning",
      "Crystal-clear glass, inside and out",
      "Hand wash with wheel and tire treatment",
      "Detailed trim and door jambs",
      "Ceramic spray wax for added gloss and paint protection",
    ],
    variants: ["Sedan", "SUV & Truck"],
    addOnNote: "Steam cleaning and shampooing available as add-ons.",
  },
  {
    slug: "gold",
    name: "Gold",
    tagline: "A complete detail with upgraded shine and longer-lasting protection.",
    intro:
      "Our Gold package delivers a full interior and exterior clean with an upgraded ceramic spray wax (up to 4 months) for added shine and protection, keeping your vehicle glossy and well-maintained.",
    includes: [
      "Interior cleaning and conditioning, including leather",
      "Streak-free glass",
      "Hand wash with wheel and tire care",
      "Upgraded ceramic spray wax — up to 4 months of protection",
      "Trim and door jamb detailing",
      "UV protection applied to exterior plastic trim",
    ],
    variants: [
      "Sedan (Interior / Exterior / Full)",
      "SUV & Truck (Interior / Exterior / Full)",
    ],
    addOnNote: "Steam cleaning and shampooing available as add-ons.",
  },
  {
    slug: "platinum",
    name: "Platinum",
    tagline: "Premium detailing with decontamination and lasting protection.",
    intro:
      "Our Platinum line brings professional-grade decontamination and protection. Choose an exterior detail, a deep interior, or the complete full detail.",
    includes: [
      "Deep wash with iron removal and clay treatment",
      "Ceramic sealant — up to 6 months of protection",
      "Wheels, tires, trim, and glass cleaned",
      "Steam cleaning and extraction (interior)",
      "Full vacuum and detailing",
      "Leather and trim conditioning",
    ],
    variants: ["Exterior Detail", "Interior Detail", "Full Detail"],
    addOnNote: "Ozone odor treatment available as an add-on.",
  },
  {
    slug: "diamond",
    name: "Diamond",
    tagline: "Our top-tier detail — a dealership-level reset.",
    intro:
      "The Diamond full detail is our most complete service: deep interior restoration paired with full exterior decontamination and a 1-year ceramic sealant for long-lasting protection.",
    includes: [
      "Deep interior cleaning with steam, shampoo, and extraction",
      "Complete vacuum and detailing",
      "Leather, trim, and mat conditioning",
      "Full exterior wash with iron and clay decontamination",
      "Wheels and tires cleaned and dressed",
      "Exterior glass cleaning",
      "1-year ceramic sealant for long-lasting protection",
    ],
  },
];

export type CeramicLevel = { name: string; desc: string };

export const ceramicCoating = {
  slug: "ceramic-coating",
  name: "Ceramic Coating",
  tagline: "Long-lasting gloss, protection, and a hydrophobic finish.",
  intro:
    "Professional ceramic coating with full exterior prep — wash, iron and clay decontamination, and water spot removal — for a deep, high-gloss, easy-to-maintain finish that protects against UV and the elements.",
  levels: [
    {
      name: "1-Year Ceramic Wax Polish",
      desc: "Machine-applied ceramic wax with full decontamination and trim restoration for up to 12 months of high-gloss, hydrophobic protection.",
    },
    {
      name: "Level 1 — Multi-Year Coating (3–5 yr)",
      desc: "Full exterior prep with a durable 3–5 year coating application. Paint correction available as an add-on.",
    },
    {
      name: "Level 2 — 5-Year Coating + Paint Correction",
      desc: "Includes expert paint correction to remove imperfections, plus a durable 5-year coating for lasting gloss and protection.",
    },
    {
      name: "Level 3 — Coating + 2-Step Paint Correction",
      desc: "Our most thorough finish: a comprehensive 2-step paint correction with long-lasting, high-gloss ceramic protection.",
    },
  ] as CeramicLevel[],
};

export type AddOn = { name: string; desc: string };

export const addOns: AddOn[] = [
  {
    name: "Steam Cleaning",
    desc: "High-temperature steam to deep clean and sanitize interior surfaces.",
  },
  {
    name: "Heated Shampoo Extraction",
    desc: "Removes stubborn stains and allergens from seats and carpets.",
  },
  {
    name: "Steam & Heated Shampoo",
    desc: "Combined deep clean that revitalizes fabrics and sanitizes the interior.",
  },
  {
    name: "Ozone Odor Treatment",
    desc: "Safely eliminates smoke, pet, and food odors from the vehicle.",
  },
  {
    name: "Pet Hair Removal",
    desc: "Thorough removal of stubborn pet hair from seats, carpets, and upholstery.",
  },
  {
    name: "Engine Bay Cleaning",
    desc: "Removes dirt and grease from the engine bay; helps spot leaks early.",
  },
  {
    name: "Headlight Restoration",
    desc: "Restores clarity and brightness for safer night driving.",
  },
  {
    name: "Trim Coating",
    desc: "Restores faded trim with a rich shine and UV protection.",
  },
  {
    name: "Trim Conditioning (4–6 mo)",
    desc: "Revitalizes and protects trim for 4–6 months.",
  },
  {
    name: "Glass Coating",
    desc: "Hydrophobic layer for better rain visibility and easier cleaning.",
  },
  {
    name: "Rim Coating",
    desc: "Durable layer that resists brake dust and road grime.",
  },
  {
    name: "Sap Removal",
    desc: "Safely removes tree sap to protect paint and finish.",
  },
];

export const maintenancePlan = {
  slug: "maintenance-plans",
  name: "Maintenance Plans",
  tagline: "Recurring upkeep to keep your car consistently clean.",
  intro:
    "A routine service to keep your vehicle clean and protected. Available on weekly, bi-weekly, and monthly schedules.",
  includes: [
    "Hand wash with wax protection",
    "Wheels and tires cleaned and dressed",
    "Interior vacuum with light wipe-down and conditioning",
    "Door jamb and glass cleaning",
  ],
};

export const rvDetailing = {
  slug: "rv-detailing",
  name: "RV Detailing",
  tagline: "Professional exterior care for RVs.",
  intro:
    "Safe, high-quality exterior cleaning tailored for RVs, with ceramic protection and interior cleaning available.",
  includes: [
    "Foam wash and roof cleaning",
    "Hand wash with spot-free rinse",
    "Full dry with tire shine",
    "Exterior glass cleaned",
    "6-month ceramic protection available",
    "Interior cleaning available",
  ],
};

/** Everything that has its own /services/[slug] page. */
export type ServiceDetail = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  includes?: string[];
  variants?: string[];
  levels?: CeramicLevel[];
  addOnNote?: string;
};

export const serviceDetails: ServiceDetail[] = [
  ...tiers,
  ceramicCoating,
  maintenancePlan,
  rvDetailing,
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((detail) => detail.slug === slug);
}

/** Shown on every service page instead of a price. */
export const quoteNote =
  "Contact us for a custom quote — pricing depends on your vehicle's size and condition.";
