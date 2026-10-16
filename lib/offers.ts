/**
 * Current offers, rendered on /offers and mirrored into Offer schema there.
 *
 * Pricing is quote-based, so no offer states a price or a dollar amount. The
 * only fixed figure is the long-standing 10% military discount.
 *
 * Never tie an offer to leaving a review. Google's policy prohibits
 * incentivized reviews, and it can remove reviews obtained that way.
 */

export type OfferCta = "call" | "text" | "book";

export type Offer = {
  /** Anchor id on /offers, and the fragment in the schema URL. */
  id: string;
  title: string;
  /** Short line above the title. */
  tag: string;
  icon: string;
  description: string;
  /** Optional qualifying detail, shown in a muted panel under the copy. */
  note?: string;
  /** Related page, when there is one. */
  link?: { href: string; label: string };
  /** Primary call label, when the default "Call" is not specific enough. */
  callLabel?: string;
  ctas: OfferCta[];
  /** Service the offer applies to, for Offer.itemOffered in schema. */
  service: string;
};

export const offers: Offer[] = [
  {
    id: "first-time",
    title: "First-Time Customer Offer",
    tag: "New customers",
    icon: "sparkle",
    description:
      "New to Royal Rinse? Your first detail comes at a first-time rate. Ask about it when you call, text, or book, and we apply it to your quote.",
    ctas: ["call", "text", "book"],
    service: "Mobile auto detailing",
  },
  {
    id: "military",
    title: "10% Military Discount",
    tag: "Active duty and veterans",
    icon: "shield",
    description:
      "Active-duty and veteran military save 10% on our detailing services. Mention it when you book or call. Thank you for your service.",
    ctas: ["call", "text", "book"],
    service: "Mobile auto detailing",
  },
  {
    id: "maintenance-plan",
    title: "Maintenance Plan Starter",
    tag: "Recurring plans",
    icon: "calendar",
    description:
      "Start a weekly, bi-weekly, or monthly maintenance plan and your first month is discounted. A plan is the easiest way to keep your car consistently clean, on a schedule you never have to think about.",
    link: { href: "/services/maintenance-plans", label: "How maintenance plans work" },
    ctas: ["call", "text", "book"],
    service: "Maintenance plan",
  },
  {
    id: "ceramic-bundle",
    title: "Ceramic Coating Bundle",
    tag: "Multi-year coatings",
    icon: "diamond",
    description:
      "Book a multi-year ceramic coating and a maintenance wash after the install is on us, so your coating gets its first wash done right.",
    note: "Applies to our Level 1, 2, and 3 multi-year coatings. The 1-Year Ceramic Wax Polish is not included.",
    link: { href: "/services/ceramic-coating", label: "Ceramic coating levels" },
    ctas: ["call", "text", "book"],
    service: "Ceramic coating",
  },
  {
    id: "referral",
    title: "Referral Credit: You Both Get $25",
    tag: "Share Royal Rinse",
    icon: "check",
    description:
      "Refer a friend and you both get $25: $25 off their first detail, and $25 toward your next one. Send them our referral page, and have them mention your name when they book.",
    note: "Credits apply after your friend's first completed service. No expiration gimmicks.",
    link: { href: "/referral", label: "Share the $25 offer" },
    ctas: ["call", "text", "book"],
    service: "Mobile auto detailing",
  },
  {
    id: "gift-cards",
    title: "Gift Cards",
    tag: "Give a detail",
    icon: "sparkle",
    description:
      "Give a Royal Rinse gift card for any amount. It applies toward any service, from a maintenance wash to a ceramic coating, and we come to them.",
    note: "No expiration. Call, text, or email with the amount and the recipient's name.",
    link: { href: "/gift-cards", label: "How gift cards work" },
    ctas: ["call", "text"],
    service: "Mobile auto detailing gift card",
  },
  {
    id: "fleet",
    title: "Fleet and Commercial Pricing",
    tag: "Businesses",
    icon: "car",
    description:
      "Volume rates for businesses with multiple vehicles, from company cars to work vans. We service Sprinter vans and work vehicles, and we come to your lot or office so your vehicles stay on the job.",
    callLabel: "Call for a fleet quote",
    ctas: ["call", "text"],
    service: "Fleet and commercial vehicle detailing",
  },
];

/** The fine print under the offer grid. */
export const offerTerms = [
  "Offers are subject to change.",
  "Mention an offer at the time of booking so we can apply it.",
  "Offers cannot be combined unless stated.",
  "Discounts and credits apply to the quoted service price.",
];
