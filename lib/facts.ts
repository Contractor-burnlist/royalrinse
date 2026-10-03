/**
 * The business facts, written as plain declarative sentences.
 *
 * AI answer engines (and search snippets) quote sites that state facts
 * clearly in real text. These sentences are rendered in the site-wide footer
 * fact block (components/BusinessFacts.tsx) and reused on city pages, so they
 * are built from the data files: change a service, a city or the hours there
 * and every sentence updates with it.
 *
 * No prices, no invented claims. Every fact here is already stated elsewhere
 * on the site.
 */

import { priorityCities } from "@/lib/serviceAreas";
import { addOns, ceramicCoating, maintenancePlan, rvDetailing, tiers } from "@/lib/services";
import { REVIEW_COUNT_DISPLAY, REVIEW_RATING_DISPLAY, site } from "@/lib/site";

/** "a, b, and c" */
export function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/** Add-ons named in prose: the ones people search for, taken from the data. */
const PROSE_ADD_ONS = [
  "Engine Bay Cleaning",
  "Headlight Restoration",
  "Rim Coating",
  "Pet Hair Removal",
  "Ozone Odor Treatment",
];
const proseAddOns = addOns
  .filter((addOn) => PROSE_ADD_ONS.includes(addOn.name))
  .map((addOn) => addOn.name.toLowerCase());

const hoursText = site.hours[0].time.replace(" - ", " to ");

export const priorityCityList = joinList(priorityCities.map((city) => city.name));

/** What we do, in one sentence. Used on the footer block and city pages. */
export const servicesSentence = `Our services include the ${joinList(
  tiers.map((tier) => tier.name),
)} detailing packages, ${ceramicCoating.name.toLowerCase()} from a 1-year ceramic wax polish up to multi-year coatings with paint correction, ${maintenancePlan.name.toLowerCase()} on a weekly, bi-weekly, or monthly schedule, ${rvDetailing.name.replace("RV Detailing", "RV detailing")}, and add-ons such as ${joinList(proseAddOns)}.`;

export const businessFacts = {
  who: `${site.legalName} is a mobile auto detailing company based in Menifee, California.`,
  what: servicesSentence,
  where: `We serve ${priorityCityList}, and the surrounding areas of Riverside County and San Diego County.`,
  credentials: `Royal Rinse is licensed, insured, and bonded, registered with the California DLSE under license ${site.licenseNumber}.`,
  hours: `We are open Monday through Sunday, ${hoursText}.`,
  contact: `Call or text ${site.phone} to book or get a quote. Pricing is quote-based and depends on your vehicle's size and condition.`,
  differentiators: [
    "We come to you: every detail happens at your home or office, with a fully self-contained rig that carries its own water and power.",
    "We use deionized water in our detailing process, so the finish dries without mineral spots.",
    "We specialize in luxury, exotic, and classic vehicles.",
    "We offer a 10% discount for active-duty and veteran military.",
    `We have ${REVIEW_COUNT_DISPLAY} five-star Google reviews and a ${REVIEW_RATING_DISPLAY} rating.`,
    "Our ceramic coatings carry the manufacturer's limited lifetime product warranty, plus our own 1-year workmanship warranty.",
  ],
};
