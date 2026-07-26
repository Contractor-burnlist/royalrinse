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
 * Inline **bold** is supported inside `p` and `ul` items. There is no other
 * inline syntax on purpose — every additional one is a parser to maintain.
 */

import { allGalleryImages, type GalleryImage } from "@/lib/gallery";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  /** Pulled out of the flow in a bordered panel — use sparingly, 1–2 a post. */
  | { type: "callout"; text: string };

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
    title: "What Is Ceramic Coating? Why It's Worth It — and How Long It Lasts",
    excerpt:
      "Ceramic coating bonds to your paint instead of sitting on top of it — which is why it lasts years, not weeks. What it does, and who it's worth it for.",
    date: "2026-07-24",
    author: "Royal Rinse",
    // 3840x5120 — the only Ferrari shot large enough to run wide without
    // upscaling, and deep gloss is exactly what this article is about.
    coverImage: cover("ferrari-hero-2.jpeg"),
    body: [
      {
        type: "p",
        text: "Ceramic coating is the service we get asked about more than any other — and the one surrounded by the most noise. Between the marketing claims and the forum arguments, it's easy to lose track of what a coating actually does, and whether it makes sense for your car. So here's a straight explanation, without the hype.",
      },

      { type: "h2", text: "What ceramic coating actually is" },
      {
        type: "p",
        text: "A ceramic coating is a liquid polymer — usually silica-based — applied by hand to your paint. As it cures it forms a **chemical bond with the clear coat** rather than resting on the surface, creating a hard, transparent, semi-permanent layer that becomes part of the car.",
      },
      {
        type: "p",
        text: "That bond is what separates a coating from everything before it. Wax and most sealants sit **on top** of the clear coat as a sacrificial film, and every wash, rainstorm and hot week wears that film down until it's gone. A cured coating doesn't wash away — it has to be abraded or chemically stripped to remove.",
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
          "**Deep gloss and clarity.** A coating adds visual depth — the wet, reflective look that makes dark paint read as liquid.",
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
        text: "All three make a car look better on the day they're applied. The difference is how long that day lasts.",
      },
      {
        type: "h3",
        text: "Carnauba wax",
      },
      {
        type: "p",
        text: "Beautiful warmth and depth, especially on darker paint, and inexpensive. But it's natural and breaks down under heat and detergents — realistically **a few weeks to a couple of months**.",
      },
      { type: "h3", text: "Paint sealant" },
      {
        type: "p",
        text: "A synthetic step up: more durable and more resistant to heat and chemicals, typically holding for **several months** depending on conditions and washing.",
      },
      { type: "h3", text: "Ceramic coating" },
      {
        type: "p",
        text: "A different category. Because it bonds rather than sits, a quality professionally applied coating is measured in **years, depending on the coating level and how the car is maintained** — not weeks. That range is conditional: a garaged weekend car with proper maintenance washes holds up far longer than a daily driver run through automatic brushes.",
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
        text: "A thorough wash, then decontamination — an iron remover to dissolve embedded brake dust a wash can't lift, and a clay treatment to pull bonded contaminants from the surface. The paint has to be surgically clean or the coating won't bond evenly.",
      },
      { type: "h3", text: "2. Paint correction" },
      {
        type: "p",
        text: "This is where the finish is made. Machine polishing removes the swirls, haze and light scratches that dull reflections. Depending on the paint's condition that's either a single-stage polish or a full two-step correction — a cutting stage, then a refining stage to restore clarity.",
      },
      { type: "h3", text: "3. Application and cure" },
      {
        type: "p",
        text: "The coating goes on panel by panel, leveled at the right moment, in controlled conditions, then needs time to cure. The car stays dry through the initial cure, and the first few weeks are when good washing habits matter most.",
      },
      {
        type: "callout",
        text: "A coating rushed onto uncorrected paint locks in every flaw. The prep is not an upsell — it's the service.",
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
        text: "We offer ceramic protection at several levels, matched to the car and how long you plan to keep it — starting with a **1-Year Ceramic Wax Polish** (machine-applied, with full decontamination and trim restoration) and moving up through our multi-year coatings.",
      },
      {
        type: "ul",
        items: [
          "**Level 1 — Multi-Year Coating.** Full exterior prep and a durable 3–5 year coating, with paint correction available as an add-on.",
          "**Level 2 — Coating + Paint Correction.** Expert paint correction to remove imperfections, finished with a durable 5-year coating.",
          "**Level 3 — Coating + 2-Step Paint Correction.** Our most thorough finish: a comprehensive two-step correction paired with long-lasting, high-gloss ceramic protection.",
        ],
      },
      {
        type: "p",
        text: "All of it is mobile. Our rig arrives self-contained with its own water and power, so paint correction and ceramic coating happen in your driveway — in Menifee, Temecula, or anywhere else across Riverside & San Diego County. No drop-off, no week without your car.",
      },
      {
        type: "p",
        text: "Because prep is most of the work, ceramic coating is quoted once we know the vehicle's size and the condition of the paint. Call or book online and we'll talk through which level actually makes sense for your car — including telling you if you don't need the top one.",
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
  return post.body
    .flatMap((block) => (block.type === "ul" ? block.items : [block.text]))
    .join(" ")
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
