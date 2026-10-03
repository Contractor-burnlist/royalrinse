/**
 * FAQ content, written the way people phrase questions to search and AI
 * assistants. Rendered on /faq (with FAQPage JSON-LD) and, in part, on the
 * homepage.
 *
 * ANSWER FORMAT: the first sentence is the complete, direct answer and stands
 * on its own (answer engines usually quote the opening sentence). One or two
 * sentences of detail follow. Never bury the answer.
 *
 * No invented prices: detailing is quoted per vehicle.
 */

import { joinList, priorityCityList } from "@/lib/facts";
import { secondaryCities } from "@/lib/serviceAreas";
import { site } from "@/lib/site";

export type Faq = { question: string; answer: string };

const otherRiverside = joinList(
  secondaryCities.filter((city) => city.county === "Riverside").map((city) => city.name),
);
const otherSanDiego = joinList(
  secondaryCities.filter((city) => city.county === "San Diego").map((city) => city.name),
);

export const faqs: Faq[] = [
  {
    question: `Do you offer mobile detailing in ${priorityCityList}?`,
    answer: `Yes, Royal Rinse provides mobile auto detailing in ${priorityCityList}, California. We are based in Menifee, so scheduling is fastest in Menifee, Temecula, and Murrieta, and we come to your home or office in all five cities.`,
  },
  {
    question: "Do you come to my home or office?",
    answer:
      "Yes, Royal Rinse is fully mobile and details your vehicle at your home or office. Our rig is self-contained and carries its own water and power, so there is no drop-off and no waiting room.",
  },
  {
    question: "What areas of Riverside County and San Diego County do you serve?",
    answer: `We serve ${priorityCityList}, and the surrounding areas of Riverside County and San Diego County. That includes ${otherRiverside} in Riverside County, and ${otherSanDiego} in San Diego County. If you are nearby and do not see your city, call and we can usually reach you.`,
  },
  {
    question: "Where is Royal Rinse located?",
    answer:
      "Royal Rinse Mobile Detailing is based in Menifee, California. Being local means the fastest response times for Menifee, Temecula, and Murrieta, and because we are fully mobile we come to you anywhere in our Riverside County and San Diego County service area.",
  },
  {
    question: "How much does mobile detailing cost?",
    answer: `Mobile detailing at Royal Rinse is priced by quote, because the cost depends on your vehicle's size, its condition, and the service level. A maintenance wash, a full interior and exterior detail, and a multi-year ceramic coating are very different jobs. Call or text ${site.phone} or book online for an honest quote on your vehicle.`,
  },
  {
    question: "What is ceramic coating and how long does it last?",
    answer:
      "Ceramic coating is a liquid polymer that chemically bonds to your paint's clear coat and lasts years rather than the weeks a wax lasts. Our levels run from a 1-year ceramic wax polish to multi-year coatings rated for 3 to 5 years and 5 years, and real-world life depends on the level and how the car is maintained. Our coatings carry the manufacturer's limited lifetime product warranty plus our 1-year workmanship warranty.",
  },
  {
    question: "Do you detail exotic and classic cars?",
    answer:
      "Yes, Royal Rinse specializes in luxury, exotic, and classic vehicles, and regularly cares for cars such as Porsche, Ferrari, Corvette, Mercedes-Benz, and Tesla. Soft clear coats, single-stage paint, delicate trim, and original interiors get a gentler, slower approach, and the work happens in your own driveway.",
  },
  {
    question: "How long does a full detail take?",
    answer:
      "A full interior and exterior detail takes several hours, depending on the vehicle's size and condition. A maintenance wash is much quicker, and a ceramic coating is a multi-stage job (decontamination, often paint correction, application, and cure) that can take most of a day. We give you a realistic time estimate with your quote.",
  },
  {
    question: "Are you licensed and insured?",
    answer: `Yes, Royal Rinse Mobile Detailing is licensed, insured, and bonded, registered with the California DLSE under license ${site.licenseNumber}. Your vehicle and your property are covered from the moment we arrive until the moment we leave.`,
  },
  {
    question: "Do you offer a military discount?",
    answer: `Yes, Royal Rinse offers a 10% discount for active-duty and veteran military. Mention it when you book or call ${site.phone}.`,
  },
  {
    question: "Do you use deionized water?",
    answer:
      "Yes, Royal Rinse uses deionized water in its detailing process. Deionized water has the dissolved minerals removed, so it dries without leaving water spots, which matters with Southern California's hard water and hot sun.",
  },
  {
    question: "How do I book?",
    answer: `You can book online in a couple of minutes, or call or text ${site.phone}. Tell us your vehicle and the service you want, and we come to you.`,
  },
];
