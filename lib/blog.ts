/**
 * Blog data.
 *
 * ADDING A POST
 * -------------
 * Append an object to `posts` below. Nothing else needs touching: the index,
 * the static routes, the sitemap of params, reading time and the JSON-LD are
 * all derived from this array.
 *
 *   1. `slug` becomes the URL (/blog/your-slug) — kebab-case, never changes
 *      once published, because changing it breaks every inbound link.
 *   2. `date` is ISO yyyy-mm-dd. The index sorts newest first.
 *   3. `coverImage` is looked up from lib/gallery.ts by filename, so a post
 *      can never point at an image the site doesn't ship. Prefer a source
 *      2000px+ on the long edge — the cover renders wide and a phone-res
 *      photo will visibly upscale. See the RESOLUTION note in lib/gallery.ts.
 *   4. `body` is a block array, not HTML. That keeps the markup in one
 *      reviewed component (components/BlogBody.tsx) instead of scattered
 *      through content, and means no dangerouslySetInnerHTML anywhere.
 *
 * Inline syntax, supported inside `p`, `ul` items, `callout` and table cells:
 *   **bold**            → <strong>
 *   [label](/path)      → an internal link (next/link). Use root-relative
 *                         paths so cross-post and /packages links stay
 *                         client-routed; the parser only accepts "/…" hrefs.
 * That is the whole inline grammar — every addition is a parser to maintain.
 */

import { allGalleryImages, type GalleryImage } from "@/lib/gallery";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  /** Pulled out of the flow in a bordered panel — use sparingly, 1–2 a post. */
  | { type: "callout"; text: string }
  /**
   * A comparison table. `headers` labels the columns; every row must have the
   * same length as `headers`. Cells accept inline syntax. Renders inside a
   * horizontally scrollable frame, so a wide table never overflows the page.
   */
  | { type: "table"; headers: string[]; rows: string[][] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO yyyy-mm-dd. */
  date: string;
  author: string;
  coverImage?: GalleryImage;
  body: BlogBlock[];
};

/**
 * Cover images come from the gallery so there is exactly one place that owns
 * image paths and intrinsic dimensions. Returns undefined rather than throwing
 * if a filename is wrong — a post without a cover still renders fine.
 */
const cover = (file: string): GalleryImage | undefined =>
  allGalleryImages.find((image) => image.src.endsWith(file));

export const posts: BlogPost[] = [
  {
    slug: "what-is-ceramic-coating",
    title: "What Is Ceramic Coating? Why It's Worth It, and How Long It Lasts",
    excerpt:
      "Ceramic coating bonds to your paint instead of sitting on top of it, which is why it lasts years, not weeks. What it does, and who it's worth it for.",
    date: "2026-07-24",
    author: "Royal Rinse",
    // 3840x5120 — the only Ferrari shot large enough to run wide without
    // upscaling, and deep gloss is exactly what this article is about.
    coverImage: cover("ferrari-hero-2.jpeg"),
    body: [
      {
        type: "p",
        text: "Ceramic coating is the service we get asked about most, and the one surrounded by the most noise. It's easy to lose track of what a coating actually does, and whether it makes sense for your car. So here's a straight explanation, without the hype.",
      },

      { type: "h2", text: "What ceramic coating actually is" },
      {
        type: "p",
        text: "A ceramic coating is a liquid polymer, usually silica-based, applied by hand to your paint. As it cures it forms a **chemical bond with the clear coat** rather than resting on the surface, creating a hard, transparent, semi-permanent layer that becomes part of the car.",
      },
      {
        type: "p",
        text: "That bond is what separates a coating from everything before it. Wax and most sealants sit **on top** of the clear coat as a sacrificial film, and every wash, rainstorm and hot week wears that film down until it's gone. A cured coating doesn't wash away. It has to be abraded or chemically stripped to remove.",
      },
      {
        type: "callout",
        text: "The short version: wax is something you put on your paint. A ceramic coating becomes part of it.",
      },

      { type: "h2", text: "What a ceramic coating does for your car" },
      {
        type: "p",
        text: "A quality coating does several jobs at once, and most are about what doesn't happen to your paint over the next few years.",
      },
      {
        type: "ul",
        items: [
          "**Deep gloss and clarity.** A coating adds visual depth: the wet, reflective look that makes dark paint read as liquid.",
          "**Hydrophobic behavior.** Water pulls into tight beads and sheets off the panels, carrying a good deal of loose dirt with it.",
          "**UV and oxidation resistance.** Southern California sun is relentless, and UV exposure is a common reason older paint fades and looks tired. A coating is a barrier against it.",
          "**Resistance to contaminants.** Road grime, bug splatter, bird droppings and tree sap bond far less easily, and light chemical etching is less likely to reach the clear coat.",
          "**Genuinely easier washing.** The benefit owners notice most: dirt doesn't grip, so washes are faster, need less agitation, and put fewer swirls into the paint.",
        ],
      },
      {
        type: "p",
        text: "A coating is not armor, though. It won't stop a rock chip or a deep scratch, and it doesn't make the car self-cleaning. Anyone promising that is selling something.",
      },

      { type: "h2", text: "Ceramic coating vs. wax vs. sealant" },
      {
        type: "p",
        text: "All three make a car look better on the day they're applied; the difference is how long that day lasts. (For the full breakdown, see [ceramic coating vs. wax vs. sealant](/blog/ceramic-coating-vs-wax).)",
      },
      {
        type: "h3",
        text: "Carnauba wax",
      },
      {
        type: "p",
        text: "Beautiful warmth and depth, especially on darker paint, and inexpensive. But it's natural and breaks down under heat and detergents, realistically **a few weeks to a couple of months**.",
      },
      { type: "h3", text: "Paint sealant" },
      {
        type: "p",
        text: "A synthetic step up: more durable and more resistant to heat and chemicals, typically holding for **several months** depending on conditions and washing.",
      },
      { type: "h3", text: "Ceramic coating" },
      {
        type: "p",
        text: "A different category. Because it bonds rather than sits, a quality professionally applied coating is measured in **years, depending on the coating level and how the car is maintained**, not weeks. A garaged weekend car with proper washes holds up far longer than a daily driver run through automatic brushes.",
      },

      { type: "h2", text: "Why it's a premium service: the prep is the real work" },
      {
        type: "p",
        text: "Here's the part most people don't expect: **applying the coating is the fastest step.** What determines whether it looks incredible or disappointing happens before the bottle is opened.",
      },
      {
        type: "p",
        text: "A coating is optically clear, and it locks in whatever is underneath. Seal a car with swirl marks, water spots and embedded contamination and you've preserved all of it for years. That's why the process is prep-heavy.",
      },
      { type: "h3", text: "1. Wash and decontamination" },
      {
        type: "p",
        text: "A thorough wash, then decontamination: an iron remover to dissolve embedded brake dust a wash can't lift, and a clay treatment to pull bonded contaminants from the surface. The paint has to be surgically clean or the coating won't bond evenly.",
      },
      { type: "h3", text: "2. Paint correction" },
      {
        type: "p",
        text: "This is where the finish is made. Machine polishing removes the swirls, haze and light scratches that dull reflections. Depending on the paint's condition that's either a single-stage polish or a full two-step correction: a cutting stage, then a refining stage to restore clarity.",
      },
      { type: "h3", text: "3. Application and cure" },
      {
        type: "p",
        text: "The coating goes on panel by panel, leveled at the right moment, in controlled conditions, then needs time to cure. The car stays dry through the initial cure, and the first few weeks are when good washing habits matter most.",
      },
      {
        type: "callout",
        text: "A coating rushed onto uncorrected paint locks in every flaw. The prep is not an upsell. It's the service.",
      },

      { type: "h2", text: "Is ceramic coating worth it?" },
      {
        type: "p",
        text: "Honestly, it depends on the car and the owner. It makes the most sense if you recognize yourself here:",
      },
      {
        type: "ul",
        items: [
          "**You keep your cars.** The longer you own it, the more years you get out of the coating.",
          "**You care about resale.** Paint protected from years of UV and contamination presents far better at trade-in time.",
          "**You're tired of the wax cycle.** If you've been re-waxing a few times a year, a coating buys those weekends back.",
          "**It's a premium or enthusiast vehicle.** The depth a corrected-and-coated finish delivers is hard to match any other way.",
          "**It lives outside.** No garage means constant sun and fallout, which is exactly what a coating defends against.",
        ],
      },
      {
        type: "p",
        text: "If you lease a commuter for two years and run it through a tunnel wash, a good sealant may serve you fine. We'd rather say that than sell you something you don't need.",
      },

      { type: "h2", text: "How Royal Rinse does ceramic coating" },
      {
        type: "p",
        text: "We offer ceramic protection at several levels, matched to the car and how long you plan to keep it, starting with a **1-Year Ceramic Wax Polish** (machine-applied, with full decontamination and trim restoration) and moving up through our multi-year coatings.",
      },
      {
        type: "ul",
        items: [
          "**Level 1: Multi-Year Coating.** Full exterior prep and a durable 3-5 year coating, with paint correction available as an add-on.",
          "**Level 2: Coating + Paint Correction.** Expert paint correction to remove imperfections, finished with a durable 5-year coating.",
          "**Level 3: Coating + 2-Step Paint Correction.** Our most thorough finish: a comprehensive two-step correction paired with long-lasting, high-gloss ceramic protection.",
        ],
      },
      {
        type: "p",
        text: "All of it is mobile. Our rig arrives self-contained with its own water and power, so the work happens in your driveway, in [Menifee](/service-area/menifee), [Temecula](/service-area/temecula), or anywhere across Riverside & San Diego County.",
      },
      {
        type: "p",
        text: "Because prep is most of the work, ceramic coating is quoted once we know the vehicle's size and the condition of the paint. See how it fits alongside our other tiers on the [packages page](/packages), then call or book online and we'll talk through which level makes sense for your car, including telling you if you don't need the top one.",
      },
    ],
  },

  {
    slug: "ceramic-coating-vs-wax",
    title:
      "Ceramic Coating vs. Wax vs. Sealant: Which Paint Protection Is Right for You?",
    excerpt:
      "Wax, sealant, or ceramic coating? They protect your paint in very different ways, at very different price points. Here's how to pick the one that fits your car and how you actually use it.",
    date: "2026-08-07",
    author: "Royal Rinse",
    // 2921x2958 — glossy white exterior, large enough to run wide unscaled.
    coverImage: cover("tesla-2.jpeg"),
    body: [
      {
        type: "p",
        text: "Every car leaves the factory with a clear coat protecting the color beneath it, but the clear coat itself needs protecting from sun, water, and road fallout. Wax, sealant, and ceramic coating are the three ways to do that. They're often lumped together, but they're genuinely different products with different lifespans and different price tags.",
      },
      {
        type: "callout",
        text: "The quick answer: **wax** is cheap and easy but lasts weeks. **Sealant** is synthetic and lasts a few months. **Ceramic coating** bonds to the paint and lasts years: more protection and more gloss, for a higher upfront cost. Match the effort to how long you keep the car and how much you enjoy washing it.",
      },

      { type: "h2", text: "Wax: warm, cheap, and short-lived" },
      {
        type: "p",
        text: "Wax, traditional carnauba or a synthetic blend, lays a thin sacrificial layer on top of your clear coat. It's the most affordable option and the easiest to apply yourself, and carnauba in particular gives paint a warm, deep glow that many enthusiasts love, especially on darker colors.",
      },
      {
        type: "p",
        text: "The trade-off is longevity. Wax breaks down under heat, sunlight, and car-wash detergents, so realistically you're looking at **a few weeks to a couple of months** before it's worn away and needs reapplying. In the Inland Empire and North County sun, that's the short end of the range.",
      },
      {
        type: "ul",
        items: [
          "**Pros:** inexpensive, easy to apply, beautiful warm shine.",
          "**Cons:** wears off in weeks, needs frequent reapplication, thinnest protection.",
        ],
      },

      { type: "h2", text: "Sealant: the synthetic middle ground" },
      {
        type: "p",
        text: "Paint sealants are engineered synthetics. Think of them as the more durable, more consistent cousin of wax. They bond to the surface a little more tenaciously and shrug off heat and detergents better, which is why a sealant typically holds for **several months** rather than weeks.",
      },
      {
        type: "p",
        text: "The look is usually a touch cooler and glassier than carnauba's warmth, a matter of taste. Sealant is a sensible pick if you want meaningfully longer protection than wax without stepping up to the cost and prep of a coating.",
      },
      {
        type: "ul",
        items: [
          "**Pros:** lasts months, more heat- and chemical-resistant than wax, still DIY-friendly.",
          "**Cons:** shorter-lived than ceramic, protection is moderate, gloss is good but not coating-level.",
        ],
      },

      { type: "h2", text: "Ceramic coating: bonded, and built to last" },
      {
        type: "p",
        text: "A ceramic coating is a liquid polymer that chemically bonds with the clear coat instead of resting on top of it. That bond is why it doesn't simply wash away. A quality professional coating is measured in **years, with proper care**, not weeks or months. It also delivers the deepest gloss and the strongest hydrophobic, UV, and contaminant protection of the three.",
      },
      {
        type: "p",
        text: "The catch is that it's a bigger commitment. A coating locks in whatever is underneath it, so it demands real prep, decontamination and usually paint correction, and a higher upfront cost. If you want the full picture, we wrote a dedicated explainer on [what ceramic coating is and how long it lasts](/blog/what-is-ceramic-coating).",
      },
      {
        type: "ul",
        items: [
          "**Pros:** lasts years, strongest protection and gloss, easiest to keep clean day to day.",
          "**Cons:** highest upfront cost, requires proper prep and cure time, a professional job.",
        ],
      },

      { type: "h2", text: "Side by side" },
      {
        type: "table",
        headers: ["", "Wax", "Sealant", "Ceramic coating"],
        rows: [
          ["Durability", "Weeks", "Months", "Years, with care"],
          ["Upfront cost", "Lowest", "Moderate", "Highest"],
          ["Protection", "Light", "Moderate", "Strongest"],
          ["Gloss", "Warm", "Glassy", "Deepest"],
          ["Maintenance", "Reapply often", "Occasional", "Easy washes"],
          [
            "Best for",
            "Show shine on a budget",
            "Longer protection, still DIY",
            "Long-term, hands-off protection",
          ],
        ],
      },

      { type: "h2", text: "How to choose" },
      {
        type: "p",
        text: "There's no single right answer: the best protection is the one that matches how you actually use your car. A few honest questions usually settle it:",
      },
      {
        type: "ul",
        items: [
          "**How long will you keep the car?** Keeping it for years tips the value toward a coating; flipping it in a year or two makes wax or sealant reasonable.",
          "**How do you feel about washing and waxing?** If re-waxing every month sounds like a chore, a coating buys that time back.",
          "**What's the vehicle worth to you?** On a premium or enthusiast car, the depth and protection of a coating are hard to match.",
          "**What's your budget today?** Wax and sealant cost less now; a coating costs more now and less over the years you own the car.",
        ],
      },
      {
        type: "p",
        text: "For a lot of drivers the honest answer is a mix over time: a sealant to stay protected now, a coating when the budget and the plan for the car line up. There's no wrong starting point.",
      },

      { type: "h2", text: "Where Royal Rinse fits in" },
      {
        type: "p",
        text: "We offer the whole range, so you're never forced into more than your car needs: from a machine-applied ceramic wax polish up through multi-year Level 1-3 ceramic coatings with paint-correction tiers. You can compare them on our [packages page](/packages).",
      },
      {
        type: "p",
        text: "And all of it is mobile. Our rig arrives self-contained with its own water and power, so whichever level you choose is applied right in your driveway across Riverside & San Diego County: [Menifee](/service-area/menifee), [Temecula](/service-area/temecula), Murrieta and beyond. Not sure which is right? Call or book online and we'll give you a straight recommendation for your vehicle.",
      },
    ],
  },

  {
    slug: "mobile-detailing-cost-temecula-menifee",
    title: "How Much Does Mobile Car Detailing Cost in Temecula & Menifee?",
    excerpt:
      "Detailing prices vary for real reasons: vehicle size, condition, and how deep the service goes. Here's what actually drives the cost of mobile detailing in the Temecula and Menifee area.",
    date: "2026-08-21",
    author: "Royal Rinse",
    // 2268x4032 — the Royal Rinse mobile rig; on-theme for a mobile-cost post.
    coverImage: cover("royal-truck-1.jpeg"),
    body: [
      {
        type: "p",
        text: "\"How much does it cost?\" is the first thing most people want to know, and the honest answer is that it depends, for reasons that actually matter. Detailing isn't one fixed service, so a good detailer quotes based on your specific vehicle and what it needs. Here's what goes into that number so you can budget with your eyes open.",
      },

      { type: "h2", text: "What affects the price of a detail" },
      {
        type: "p",
        text: "Four things move the needle more than anything else:",
      },
      {
        type: "ul",
        items: [
          "**Vehicle size.** A two-seat coupe and a three-row SUV or lifted truck are not the same job: more panels, more glass, more interior square footage, more time.",
          "**Condition.** A well-kept car that's maintained regularly takes far less work than one with months of baked-on grime, heavy pet hair, or neglected interior stains.",
          "**Service level.** A maintenance wash, a full interior-and-exterior detail, and a multi-year ceramic coating are worlds apart in labor and materials.",
          "**Interior, exterior, or both.** Booking just the exterior or just the interior costs less than a full detail that does both, but both together is where a car really transforms.",
          "**Add-ons.** Extras like pet-hair removal, ozone odor treatment, engine-bay cleaning, or headlight restoration each add time and cost.",
        ],
      },
      {
        type: "callout",
        text: "This is why reputable detailers quote rather than post a single flat price. An accurate number depends on your vehicle's size and condition, and quoting blind would mean overcharging some cars and rushing others.",
      },

      { type: "h2", text: "Service tiers, and why they scale" },
      {
        type: "p",
        text: "You don't need exact figures to understand the ladder. Each step up adds labor, better materials, and more lasting results, which is what you're paying for.",
      },
      { type: "h3", text: "Maintenance wash" },
      {
        type: "p",
        text: "The entry point: a proper hand wash, wheels and tires, glass, and a quick interior tidy to keep an already-clean car sharp between bigger services. It's the least time and the lowest cost, and booked on a regular cadence it's what keeps a car out of the deep-clean price bracket in the first place.",
      },
      { type: "h3", text: "Full interior + exterior detail" },
      {
        type: "p",
        text: "The deep clean. Exterior decontamination and protection, plus interior shampoo and extraction, cleaned and conditioned surfaces, vents, seams, and door jambs, the parts most washes skip. It's the biggest single jump in results, and because it's the most labor and product, it sits higher on the scale. A larger or heavily soiled vehicle naturally lands toward the top of that range.",
      },
      { type: "h3", text: "Ceramic coating" },
      {
        type: "p",
        text: "The premium end, because the prep is the real work: decontamination and often paint correction before anything is applied, since a coating locks in whatever's underneath. In exchange you get protection measured in years. We explain the process in full in [what ceramic coating is and how long it lasts](/blog/what-is-ceramic-coating), and you can see every tier on our [packages page](/packages).",
      },

      { type: "h2", text: "Why mobile detailing is worth it here" },
      {
        type: "p",
        text: "Mobile detailing removes the hidden cost people forget to count: your time. There's no dropping the car across town and arranging a ride, no half-day in a waiting room, no rescheduling your afternoon around a shop's hours. We come to you, at home or the office in [Menifee](/service-area/menifee), [Temecula](/service-area/temecula), Murrieta, and across the region, with a fully self-contained rig that carries its own water and power, so all you do is hand over the keys.",
      },
      {
        type: "p",
        text: "The convenience doesn't cost you quality, either. The same professional products and process happen in your driveway that would happen in a shop. You just don't have to go anywhere. For a lot of local customers, that saved half-day is worth as much as the detail itself.",
      },

      { type: "h2", text: "What to look for in a detailer" },
      {
        type: "p",
        text: "Price matters, but the cheapest quote isn't a bargain if the work is rushed or your paint gets marred. Before you book, check that a detailer is:",
      },
      {
        type: "ul",
        items: [
          "**Licensed and insured**, so your vehicle and property are covered if something goes wrong.",
          "**Genuinely reviewed**: real, recent reviews from local customers, not a handful of vague five-stars.",
          "**Using proper products and process**: decontamination, safe wash technique, the right tools for each surface.",
          "**Transparent**: clear about what each service includes and why it's quoted the way it is.",
        ],
      },

      { type: "h2", text: "What Royal Rinse offers" },
      {
        type: "p",
        text: "Royal Rinse is fully licensed, insured, and bonded (CA DLSE CW-LR-1001298512), with tiered packages that scale from a maintenance wash to multi-year ceramic coatings, so you only pay for the level your car actually needs. Every job is quoted honestly, up front, with no surprise add-ons at the end. We also take **10% off for active and veteran military** as a thank-you for your service.",
      },
      {
        type: "p",
        text: "Everything is mobile across Riverside & San Diego County. For a custom quote on your vehicle, browse the [packages page](/packages), then call **(951) 338-9117** or book online. We'll give you an honest number for the car in your driveway, with no pressure and no obligation to book.",
      },
    ],
  },

  {
    slug: "luxury-exotic-car-detailing-temecula-menifee",
    title:
      "Luxury & Exotic Car Detailing in Temecula and Menifee: Why High-End Vehicles Demand Specialized Care",
    excerpt:
      "Luxury and exotic vehicles have delicate paint and high stakes. They need a specialist, not a wash tunnel. What that looks like in Menifee & Temecula.",
    date: "2026-09-04",
    author: "Royal Rinse",
    coverImage: cover("ferrari-hero-3.jpeg"),
    body: [
      {
        type: "p",
        text: "A luxury or exotic vehicle isn't just a more expensive version of an ordinary car. It's a different object, built with materials and finishes that reward careful hands and punish careless ones. Detailing one properly takes more than a bucket and a bay; it takes knowing how premium paint, leather, and trim actually behave.",
      },
      {
        type: "p",
        text: "Royal Rinse is a mobile detailing company based in Menifee that specializes in high-end automotive care across Temecula, Menifee, and all of Riverside & San Diego County. Here's why these vehicles demand a specialist, and what specialized care actually looks like.",
      },

      { type: "h2", text: "Why luxury and exotic vehicles need specialist care" },
      {
        type: "p",
        text: "The stakes are simply higher. On a six-figure car, a single wash-induced swirl or an etched water spot isn't a cosmetic annoyance. It's damage to an expensive, sometimes hard-to-match finish that can surface at resale. The very things that make these cars special are what make them unforgiving:",
      },
      {
        type: "ul",
        items: [
          "**Delicate paint and soft clear coats.** Many exotics use softer clear coats that swirl and scratch far more easily than a mass-market finish. The wrong wash mitt or an automatic tunnel can mar them in a single pass.",
          "**Special interior materials.** Alcantara, aniline and semi-aniline leathers, real wood, and brushed metal each need specific products and technique; a generic all-purpose cleaner can stain or dry them out.",
          "**Carbon fiber and satin or matte finishes.** Matte and satin paint must never be polished like gloss, and exposed carbon needs careful, non-abrasive handling.",
          "**Value and resale.** A preserved finish protects a serious investment; a botched detail can cost far more than it ever saved.",
        ],
      },
      {
        type: "callout",
        text: "On a high-end vehicle the margin for error is small and the cost of a mistake is large. That's exactly where a generic wash tunnel, or an untrained detailer, becomes a real risk.",
      },

      { type: "h2", text: "What specialized care actually looks like" },
      {
        type: "p",
        text: "Specialist detailing is defined less by products than by method and restraint. On a premium vehicle we lead with:",
      },
      {
        type: "ul",
        items: [
          "**Paint-safe hand washing.** A gentle, multi-bucket hand wash with the right media, never a brush tunnel, so the finish is cleaned without adding swirls.",
          "**Thorough decontamination.** Iron removal and a clay treatment lift bonded contaminants a wash can't, so nothing is dragged across the paint afterward.",
          "**Paint correction expertise.** Machine polishing to remove swirls and haze, matched to the paint's hardness, and the experience to judge how much correction a given finish can safely take.",
          "**Appropriate ceramic protection.** A [ceramic coating](/services/ceramic-coating) suited to premium paint, locking in the corrected finish and making future maintenance safer and easier.",
          "**Meticulous interior care.** The right cleaners and conditioners for each material, and an unhurried hand around stitching, screens, and trim.",
        ],
      },
      {
        type: "p",
        text: "None of this is about exotic products for their own sake. It's about matching technique to the vehicle in front of us. A daily driver and a low-mileage exotic both get patience and care, but the exotic forces choices a generic shop rarely considers: which pad won't overheat a soft clear coat, which cleaner is safe on aniline leather, which trim is best left untouched. It also means knowing when to do less: an aggressive polish that's fine on a hard economy-car clear coat can burn through a delicate one. On the right car, restraint is a skill.",
      },

      { type: "h2", text: "Our experience with high-end vehicles" },
      {
        type: "p",
        text: "We regularly care for luxury and exotic vehicles, cars like Porsche, Ferrari, Mercedes-Benz, and Tesla, throughout Menifee, Temecula, and the wider region. Our [gallery](/gallery) reflects that range: exotics detailed on site in customers' driveways, not staged in a studio.",
      },
      {
        type: "p",
        text: "Our reviews say the same. One customer had us ceramic-coat a luxury Mercedes-Benz Sprinter and called it a five-star job; others trusted us with a Porsche and with a Subaru BRZ whose delicate alcantara a previous detailer couldn't get right. That's the standard we bring to every high-end vehicle.",
      },

      { type: "h2", text: "The mobile advantage for luxury owners" },
      {
        type: "p",
        text: "For a high-value car, the safest place to be detailed is your own driveway. Mobile service removes the risks that come with dropping an exotic at a shop:",
      },
      {
        type: "ul",
        items: [
          "**No transport risk.** Your vehicle never rides a flatbed or fights traffic to reach us. We come to it.",
          "**No strangers driving it.** It isn't shuffled around a lot or test-driven; it stays where you can see it.",
          "**Discreet, on-site service.** We arrive with a fully self-contained rig, our own water and power, and work at your home or office on your schedule.",
        ],
      },
      {
        type: "p",
        text: "For owners in the gated communities and estates around [Temecula](/service-area/temecula) and [Menifee](/service-area/menifee), that discretion and convenience matter as much as the finish itself.",
      },

      { type: "h2", text: "Specialist care, based in Menifee" },
      {
        type: "p",
        text: "Royal Rinse is licensed, insured, and bonded, based in Menifee and serving Temecula and the luxury communities across Riverside & San Diego County. If your vehicle deserves more than a quick wash, see our [detailing packages](/packages) or read [what ceramic coating is and how long it lasts](/blog/what-is-ceramic-coating), then reach out for a straight recommendation. Call now for an instant quote, or book online, and we'll bring specialist care to your driveway.",
      },
    ],
  },

  {
    slug: "ceramic-coating-exotic-vehicles",
    title:
      "Protecting Exotic Paint: Ceramic Coating and Paint Correction for High-End Vehicles",
    excerpt:
      "On an exotic, the paint is expensive and unforgiving. How paint correction and ceramic coating protect premium finishes in Menifee, Temecula & San Diego.",
    date: "2026-09-18",
    author: "Royal Rinse",
    coverImage: cover("vehicle-2-ext-1.jpg"),
    body: [
      {
        type: "p",
        text: "On a high-end vehicle, the paint is one of the most expensive and least forgiving things you own. Protecting it isn't vanity. It's an investment decision. Two services do the heavy lifting: paint correction to restore the finish, and ceramic coating to defend it.",
      },
      {
        type: "p",
        text: "Royal Rinse specializes in paint protection for luxury and exotic vehicles across Menifee, Temecula, and Riverside & San Diego County. Here's how correction and coating work on premium paint, and why our climate makes them especially worthwhile.",
      },

      { type: "h2", text: "Why exotic and luxury paint is different" },
      {
        type: "p",
        text: "Premium cars often wear premium paint: multi-stage finishes with layered basecoats and tinted clears, or specialty finishes like satin and matte. They look extraordinary and behave differently from ordinary paint:",
      },
      {
        type: "ul",
        items: [
          "**Softer, more delicate clear coats** that swirl and scratch easily, so wash and polish technique matters more.",
          "**Satin and matte finishes** that must never be polished or coated like gloss. The wrong product permanently ruins the look.",
          "**High replacement cost.** Repainting an exotic to factory standard is expensive and can affect originality and value, which turns protection into a smart economic decision rather than an upsell.",
        ],
      },
      {
        type: "p",
        text: "There's also less margin to work with. Factory clear coat is only so thick, and specialty finishes can't be re-polished the way ordinary paint can. Once it's gone, it's gone, which is why protecting the finish you have is almost always cheaper and safer than trying to restore one that's been neglected.",
      },

      { type: "h2", text: "Paint correction on high-end vehicles" },
      {
        type: "p",
        text: "Paint correction is machine polishing that removes swirls, haze, and light scratches to restore clarity and depth. On a valuable finish the goal is to correct safely, removing defects without removing more clear coat than necessary.",
      },
      {
        type: "p",
        text: "This is where experience earns its keep. The more valuable and delicate the paint, the more it matters that whoever holds the polisher can read the finish and choose the right combination of pads and compounds. Correction is also what makes a coating worthwhile. A ceramic layer locks in whatever sits beneath it, so the finish should be corrected first.",
      },
      {
        type: "p",
        text: "Done well, correction is transformative: reflections sharpen, the color gains depth, and years of swirl marks simply disappear. Done carelessly, it thins the clear coat and creates problems only a repaint can fix. On an exotic, that gap between well and carelessly is the entire reason to choose a specialist rather than the cheapest quote.",
      },
      {
        type: "callout",
        text: "A coating applied over swirled paint just preserves the swirls. Correct first, then protect, in that order.",
      },

      { type: "h2", text: "Ceramic coating for exotics" },
      {
        type: "p",
        text: "A [ceramic coating](/services/ceramic-coating) is a liquid polymer that bonds to the clear coat, forming a durable, hydrophobic layer. On an exotic it delivers three things owners care about:",
      },
      {
        type: "ul",
        items: [
          "**Depth and gloss** that makes corrected premium paint look its absolute best.",
          "**Protection** from UV, oxidation, bird droppings, and light chemical etching.",
          "**Easier maintenance** between drives and events: dirt releases more easily, so upkeep washes stay gentle on the finish.",
        ],
      },
      {
        type: "p",
        text: "Practically, that adds up to a finish that stays show-ready longer and takes less risk to keep clean. For a car that's driven on weekends and stored the rest of the time, a coating means fewer contact washes and less chance of introducing fresh swirls between full details.",
      },
      { type: "h3", text: "The Southern California angle" },
      {
        type: "p",
        text: "Our climate punishes premium paint from both directions. Inland, the [Temecula](/service-area/temecula) and [Menifee](/service-area/menifee) heat brings relentless sun and UV that fade and oxidize unprotected finishes. Toward the coast, San Diego's salt air and marine layer invite water spotting and early corrosion. A quality ceramic coating addresses both: UV resistance for the inland sun and a salt- and moisture-shedding barrier for the coast.",
      },

      { type: "h2", text: "Choosing the right level" },
      {
        type: "p",
        text: "Not every vehicle needs the top tier, and we'll tell you when it doesn't. Our ceramic protection runs from a machine-applied 1-year ceramic wax polish up through multi-year Level 1-3 coatings, with paint correction built into the higher levels. The right choice depends on the paint's condition, how you drive and store the car, and how long you plan to keep it. Compare the options on our [packages page](/packages).",
      },
      {
        type: "p",
        text: "For a garage-kept exotic that sees occasional sun, a mid-tier coating is often plenty; for a car parked outside or driven hard, the longer-lived levels with full correction earn their place. Either way we walk you through the trade-offs and recommend only what your paint actually needs, never more.",
      },
      {
        type: "p",
        text: "New to coatings? Start with [what ceramic coating is and how long it lasts](/blog/what-is-ceramic-coating), and see why [high-end vehicles demand specialized care](/blog/luxury-exotic-car-detailing-temecula-menifee) in the first place.",
      },

      { type: "h2", text: "Protect the paint, we come to you" },
      {
        type: "p",
        text: "Royal Rinse brings specialist paint correction and ceramic coating to your driveway across Menifee, Temecula, and Riverside & San Diego County, licensed, insured, and fully mobile. Call now for an instant quote, or book online, and we'll recommend the right level of protection for your vehicle.",
      },
    ],
  },
  {
    slug: "deionized-water-detailing",
    title:
      "Deionized Water (DI): The Secret Behind a Truly Spot-Free, Flawless Finish",
    excerpt:
      "Deionized water (DI), 'spot-free water', is the pro-grade water most car owners have never heard of, and why it separates a good detail from a flawless one.",
    date: "2026-10-02",
    author: "Royal Rinse",
    // White Ferrari, glossy — a clean exterior that shows exactly the
    // spot-free, deep-gloss finish this article is about. Distinct from
    // every other post's cover.
    coverImage: cover("ferrari-exterior-1.jpeg"),
    body: [
      {
        type: "p",
        text: "Most people judge a detailer by the wax, the polish, or the shine on delivery day. But one of the biggest differences between a good detail and a truly flawless one comes down to something far less glamorous: the water. Professional detailers use **deionized water (DI)**, also known as \"spot-free water\", and once you understand what it does, you won't want your car washed with anything else.",
      },

      { type: "h2", text: "What deionized water (DI) is" },
      {
        type: "p",
        text: "Deionized water is ordinary water run through a deionization process that strips out the dissolved minerals, calcium, magnesium, sodium, and other impurities that everyday water carries. What's left is water so pure that when it dries, it leaves **nothing behind**. That's exactly why it's nicknamed \"spot-free water\": no minerals means no mineral spots on the paint.",
      },
      {
        type: "callout",
        text: "In plain terms: DI water is water with the minerals removed, so it dries clean instead of leaving spots. Royal Rinse uses deionized water in its detailing process.",
      },

      { type: "h2", text: "The problem with regular tap water" },
      {
        type: "p",
        text: "Tap water is full of dissolved minerals, what people call **\"hard water\"**, and Southern California's water is notably hard. That's a problem the moment water starts to dry on paint.",
      },
      {
        type: "p",
        text: "When droplets evaporate, and they evaporate fast in the Menifee, Temecula, and inland Riverside County sun, the water leaves but the minerals don't. They stay behind on the surface as **water spots**. And it's worse than cosmetic: left baking in the heat, those mineral deposits can begin to **etch into the clear coat and glass**. Hard-water etching is one of the more stubborn defects to correct later, sometimes needing machine polishing to remove. Dark paint shows it worst. Every spot stands out against a deep color.",
      },
      {
        type: "callout",
        text: "On a hot inland afternoon, spot-free water isn't a luxury. It's the difference between a finish that stays clean and one that's already freckled with mineral spots before the detailer has packed up.",
      },

      { type: "h2", text: "Why DI water is crucial to the process" },
      {
        type: "p",
        text: "Using DI water isn't just about the final rinse. It matters at **every stage**. When the wash and every rinse are done with deionized water, no new mineral contamination is being introduced onto the paint while it's being cleaned. You're never adding the very thing a good detail is trying to remove.",
      },
      {
        type: "p",
        text: "The payoff comes at the end. Panels given a final rinse with DI water **dry perfectly clean**, no spots, no streaks, no residue, which also means no chasing water marks around with a drying towel. That last point matters more than it sounds: aggressive towel-drying to beat spot formation is itself one of the most common ways swirls and marring get introduced. Clean water removes the need to fight the clock.",
      },

      { type: "h2", text: "How it makes the finished result better" },
      {
        type: "p",
        text: "On a finished vehicle, the difference is visible right away:",
      },
      {
        type: "ul",
        items: [
          "**Deeper gloss.** Paint reads noticeably deeper and clearer when it isn't hazed by a thin film of dried minerals.",
          "**Streak-free glass and chrome.** The surfaces that show spots first, windows, mirrors, brightwork, stay clean.",
          "**Protected prep work.** Freshly polished, corrected, or ceramic-coated surfaces aren't immediately marred by mineral deposits settling onto them.",
          "**A result that holds.** The finish still looks flawless an hour after we leave, instead of showing spots as the last droplets dry in the sun.",
        ],
      },
      {
        type: "p",
        text: "On luxury and exotic vehicles, and on dark colors especially, that difference is obvious. It's the gap between \"clean\" and \"flawless.\"",
      },

      { type: "h2", text: "The mobile detailing angle" },
      {
        type: "p",
        text: "Here's where it matters most for **mobile detailing**. A mobile detailer using straight hose water at your home is fighting hard water the entire time. Every rinse is depositing the exact minerals a quality detail is trying to avoid.",
      },
      {
        type: "p",
        text: "Royal Rinse uses **deionized water in its process**, bringing wash-bay-grade water quality straight to your driveway across [Menifee](/service-area/menifee), Temecula, and all of Riverside & San Diego County. You get the spot-free result of a professional facility without your vehicle ever leaving home.",
      },

      { type: "h2", text: "Pair it with protection" },
      {
        type: "p",
        text: "A spot-free wash and a [ceramic coating](/blog/what-is-ceramic-coating) work hand in hand. DI water gets the finish truly clean and free of mineral spots; a ceramic coating then locks in that gloss and makes the paint far easier to keep clean between washes, which is exactly what you want under the relentless SoCal sun. It's the same standard of care we bring to [luxury and exotic vehicles](/blog/luxury-exotic-car-detailing-temecula-menifee), where a flawless, spot-free finish isn't optional.",
      },

      { type: "h2", text: "See the spot-free difference" },
      {
        type: "p",
        text: "Royal Rinse is a licensed, insured mobile detailer based in Menifee, serving Temecula and all of Riverside & San Diego County, and we bring deionized, spot-free water to your driveway. Compare our [detailing packages](/packages), then call now for an instant quote or book online, and we'll leave your vehicle flawless, not freckled.",
      },
    ],
  },
];

/** Newest first. The index and any \"latest post\" surface should use this. */
export const sortedPosts: BlogPost[] = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Every word of body copy, for reading-time estimates. */
function wordCount(post: BlogPost): number {
  const textOf = (block: BlogBlock): string => {
    switch (block.type) {
      case "ul":
        return block.items.join(" ");
      case "table":
        return [...block.headers, ...block.rows.flat()].join(" ");
      default:
        return block.text;
    }
  };

  return post.body
    .map(textOf)
    .join(" ")
    .replace(/\*\*|\[|\]\([^)]*\)/g, " ") // drop inline markup before counting
    .split(/\s+/)
    .filter(Boolean).length;
}

/** Rounded up, floor of 1. 220 wpm is a common average for web prose. */
export function readingMinutes(post: BlogPost): number {
  return Math.max(1, Math.round(wordCount(post) / 220));
}

/**
 * Fixed to UTC so the server render and the client render can never disagree
 * about which day it is — a classic hydration mismatch on date-stamped pages.
 */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
