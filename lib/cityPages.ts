/**
 * Hand-written content for the six showcase city pages.
 *
 * These exist because a templated "[City]" page with the name swapped in is
 * duplicate content — bad for local SEO and worse for the reader. Every field
 * below is written uniquely per city: a different subhead, a different lead
 * photo, different intro paragraphs referencing real local context, and a
 * different local angle on which services matter most there.
 *
 * Cities NOT listed here still render via the generic template in
 * app/service-area/[slug]/page.tsx, so nothing 404s — these six just get the
 * richer, unique treatment.
 *
 * coverFile is a filename in lib/gallery.ts; each city uses a DIFFERENT vehicle
 * so no two lead images repeat. The two widest-rendering covers (San Diego,
 * La Jolla) use the large 2921/3840px sources; the rest are 900px+ behind a
 * framed slot sized so nothing upscales.
 */

import { allGalleryImages, type GalleryImage } from "@/lib/gallery";

export type CityPage = {
  slug: string;
  /** Unique hero subhead — never the same sentence twice. */
  subhead: string;
  /** Filename in the gallery; distinct per city. */
  coverFile: string;
  /** 2–3 unique intro paragraphs. */
  intro: string[];
  /** The local angle: which services matter most here, and why. */
  angleHeading: string;
  angleBody: string;
  /** One-line framing above the services grid. */
  servicesIntro: string;
  /** The "we serve X and come to you" line in the CTA band. */
  ctaLine: string;
  /** Unique meta description with local keywords. */
  metaDescription: string;
};

export const cityPages: CityPage[] = [
  {
    slug: "temecula",
    subhead:
      "From Old Town to the Wine Country hills, we bring the detail bay to your driveway — and keep the valley's summer dust off your paint.",
    coverFile: "exterior-4.jpg",
    intro: [
      "Temecula lives outdoors. Between the vineyards out east, the weekend car meets around Old Town, and the long dry runs up and down the 15, vehicles here take a real beating from sun and the fine valley dust that most drive-through washes just push around.",
      "We detail across the whole valley — the gated streets of Redhawk and Morgan Hill Estates, the rural acreage out in De Luz, and the newer builds toward French Valley. It's truck-and-SUV country with a serious enthusiast streak, so one visit we're decontaminating a lifted diesel and the next we're paint-correcting a weekend sports car.",
      "Because we come to you, none of it costs you a Saturday. The rig arrives fully self-contained — water, power, everything — and your vehicle gets detailed right in its own driveway while you get on with the day.",
    ],
    angleHeading: "What Temecula paint needs most",
    angleBody:
      "The valley's heat-and-dust cycle is hard on two things: exterior finish and interior surfaces. Sun bakes unprotected paint while fine grit works into every seam and vent. That's why we lean on ceramic protection and thorough interior decontamination here — a ceramic-coated finish sheds dust and shrugs off UV, and a proper interior detail pulls the grit out of the cabin instead of smearing it around.",
    servicesIntro:
      "Every Royal Rinse package is available in Temecula, from a quick maintenance wash to a multi-year ceramic coating.",
    ctaLine:
      "We detail across Temecula — Old Town, Redhawk, De Luz, French Valley and everywhere between — and we come to you.",
    metaDescription:
      "Mobile auto detailing in Temecula, CA. Royal Rinse comes to your driveway in Old Town, Redhawk, De Luz and across Wine Country — ceramic coating, paint correction and interior detailing built for the valley's heat and dust.",
  },

  {
    slug: "menifee",
    subhead:
      "This is home base. Menifee is where Royal Rinse is rooted — which means faster response times and detailers who actually know your neighborhood.",
    coverFile: "royal-truck-1.jpeg",
    intro: [
      "Menifee is our backyard. Royal Rinse is rooted right here, so when you book you're not waiting on someone driving in from two counties over — you're getting a local crew that knows these streets, from the established parts of Sun City to the fast-growing developments around Audie Murphy Ranch and the 215 corridor.",
      "This is a family town, and it's growing fast: new builds, new driveways, and a lot of daily drivers, family SUVs, and work trucks that just need to stay sharp without the hassle of a shop visit. Being local means we can usually slot Menifee bookings in quickly and keep our schedule tight around town.",
      "We bring the entire setup to you — self-contained water and power — and detail your vehicle right in the driveway. No drop-off, no waiting room, no leaving the neighborhood.",
    ],
    angleHeading: "Why being local actually matters",
    angleBody:
      "Basing ourselves in Menifee isn't just a talking point — it changes the service. Short drive times mean quicker turnarounds and easier rescheduling, and knowing the area means we plan efficient routes around town. For a busy, growing community, our maintenance-focused packages are the most popular: regular washes and interior refreshes that keep a household's vehicles clean between the bigger, deeper details.",
    servicesIntro:
      "Every package we offer is available right here in Menifee — our home turf.",
    ctaLine:
      "Menifee is home base, so we're never far. Call and we'll usually get to you fast.",
    metaDescription:
      "Mobile auto detailing in Menifee, CA — Royal Rinse's home base. Fast local response across Sun City, Audie Murphy Ranch and the 215 corridor. We come to your driveway for washes, full details and ceramic coating.",
  },

  {
    slug: "riverside",
    subhead:
      "From the Mission Inn downtown to the commuter lanes of the 91, we detail the full range — daily drivers, classics, and everything between.",
    coverFile: "exterior-1.jpg",
    intro: [
      "Riverside is the big city of the Inland Empire, and it drives like one. Long commutes on the 91 and 60, tight parking around the historic Mission Inn, and a citywide mix of vehicles that runs from hard-working daily drivers to lovingly kept classics. That range is exactly what we're built for.",
      "Urban miles leave a mark — traffic film, brake dust, and in spring the notorious blanket of pollen that coats every car on the block. We detail across the city, from the leafy streets of the Wood Streets and Victoria to the newer stretches out toward Orangecrest, meeting cars where they live.",
      "Whether it's a commuter that needs the grime cut back or a classic that deserves careful, paint-safe hands, we bring the full shop to your driveway — no dropping the car somewhere across town and arranging a ride home.",
    ],
    angleHeading: "Detailing for a city that commutes",
    angleBody:
      "Two things define Riverside cars: miles and exposure. Commuter vehicles collect road film and brake dust fast, so a regular maintenance wash and a durable sealant go a long way here. And the city's older neighborhoods hide a lot of classics — for those, gentle paint-safe wash technique and interior restoration matter more than any single product. We tailor the work to the car in the driveway.",
    servicesIntro:
      "The full Royal Rinse lineup is available across Riverside, from a maintenance wash to full paint correction and ceramic coating.",
    ctaLine:
      "We cover all of Riverside — downtown, the Wood Streets, Orangecrest and beyond — and we come to you.",
    metaDescription:
      "Mobile auto detailing in Riverside, CA. Royal Rinse comes to you from the Mission Inn district to Orangecrest — maintenance washes, interior detailing, paint correction and ceramic coating for daily drivers and classics alike.",
  },

  {
    slug: "san-diego",
    subhead:
      "Coastal salt air and the marine layer are brutal on paint. We bring showroom-level protection to your door, from the beaches to the bays.",
    coverFile: "tesla-2.jpeg",
    intro: [
      "San Diego's climate is a gift for people and a challenge for paint. The same coastal air that makes the city so livable carries salt and moisture that quietly go to work on your finish, and the morning marine layer keeps cars damp long enough for spots and oxidation to take hold. Protecting a vehicle here is a different job than it is inland.",
      "We detail across the city and its neighborhoods — from the coastal communities near the water to the inland valleys — for a market that knows the difference between a car wash and a real detail. There's a wide range of vehicles here, and a lot of owners who fully intend to keep them looking their best for years.",
      "Our rig is completely self-contained, so we handle all of it in your driveway or your building's lot — no fighting coastal traffic to drop the car at a shop and wait around for it.",
    ],
    angleHeading: "Why coastal cars need ceramic",
    angleBody:
      "On the coast, protection isn't an optional add-on — it's the whole point. Salt air accelerates oxidation, and the marine layer's constant moisture invites water spotting and early corrosion on trim and paint. This is where ceramic coating earns its keep: a bonded, hydrophobic layer that sheds moisture, resists salt, and blocks the UV that fades unprotected finishes. For San Diego cars, we put paint decontamination and ceramic protection at the front of the conversation.",
    servicesIntro:
      "Every package is available across San Diego, and our ceramic coating tiers are especially popular with coastal owners.",
    ctaLine:
      "We serve San Diego from the coast to the inland valleys — and we come to you.",
    metaDescription:
      "Mobile auto detailing in San Diego, CA. Royal Rinse brings ceramic coating and paint protection built for coastal salt air and marine-layer moisture straight to your driveway — plus full interior and exterior detailing.",
  },

  {
    slug: "la-jolla",
    subhead:
      "Showroom-level care for showroom-level cars — discreet, meticulous mobile detailing that comes to your La Jolla driveway.",
    coverFile: "ferrari-hero-2.jpeg",
    intro: [
      "La Jolla sets a high bar, and the cars in its driveways tend to meet it. Exotics and luxury marques are ordinary sights here, and their owners expect a standard of care that matches the vehicle — nothing rushed, nothing generic. That's the standard we bring.",
      "The setting that makes La Jolla so beautiful is also the hardest on a finish. Perched right on the coast, cars here take the full force of salt air and reflected sun — exactly the combination that dulls unprotected paint and etches neglected trim. Protecting these vehicles properly takes the right products and an unhurried, careful hand.",
      "We come to you — quietly and self-contained — and detail the car at your home, whether that's above the Village, down by the Shores, or up in the Muirlands. No valet run to a shop, no handing your keys to a stranger across town.",
    ],
    angleHeading: "The standard exotic and luxury cars demand",
    angleBody:
      "On a high-value or enthusiast car the margin for error is zero, and the payoff for doing it right is enormous. That means proper multi-stage paint correction to bring back true depth, and a quality ceramic coating to lock that finish in against La Jolla's salt and sun. For discerning owners we focus on paint correction and long-term ceramic protection, with the meticulous, panel-by-panel attention these cars are built to deserve.",
    servicesIntro:
      "Our full range is available in La Jolla, with paint correction and multi-year ceramic coating the natural fit for the cars here.",
    ctaLine:
      "We detail throughout La Jolla — the Village, the Shores, the Muirlands — and we come to you.",
    metaDescription:
      "Mobile auto detailing in La Jolla, CA. Royal Rinse brings showroom-level paint correction and ceramic coating to your driveway — meticulous, discreet care for luxury and exotic vehicles in a demanding coastal climate.",
  },

  {
    slug: "escondido",
    subhead:
      "North County inland runs hot and dry. We bring dust-fighting interior details and lasting exterior protection to your Escondido driveway.",
    coverFile: "vehicle-2-ext-1.jpg",
    intro: [
      "Escondido sits inland in North County, and it feels it — hotter and drier than the coast, with long dusty summers that are tough on both paint and interiors. The vehicles match the terrain: plenty of trucks and family SUVs, a healthy crowd of enthusiast builds, and a growing city full of new drivers and new driveways.",
      "We detail across Escondido, from the older neighborhoods near Grand Avenue downtown to the newer developments spreading toward the hills. Inland heat bakes unprotected finishes and fine dust settles into every vent and seam, so the work here leans toward protection and deep interior cleaning.",
      "The whole setup comes to you — self-contained water and power — so your truck, SUV, or weekend project gets detailed right at home, without a trip across North County to a shop.",
    ],
    angleHeading: "Built for inland heat and dust",
    angleBody:
      "Escondido's climate asks two things of a detail: shield the paint from relentless sun, and get the dust out of the cabin for good. We answer with UV-resistant exterior protection — ceramic sealants and coatings that hold up to the heat — and thorough interior work with steam and extraction that lifts embedded grit instead of pushing it around. For the trucks and enthusiast builds common here, that combination keeps a vehicle sharp between details.",
    servicesIntro:
      "Every Royal Rinse package is available in Escondido, from maintenance washes to ceramic coating.",
    ctaLine:
      "We cover Escondido and North County inland — downtown to the outskirts — and we come to you.",
    metaDescription:
      "Mobile auto detailing in Escondido, CA. Royal Rinse comes to your North County driveway with heat-ready ceramic protection and deep interior detailing for trucks, SUVs and enthusiast builds.",
  },
];

export function getCityPage(slug: string): CityPage | undefined {
  return cityPages.find((page) => page.slug === slug);
}

/** Resolves a city page's cover to a real gallery image (with intrinsic dims). */
export function cityCover(page: CityPage): GalleryImage | undefined {
  return allGalleryImages.find((image) => image.src.endsWith(page.coverFile));
}
