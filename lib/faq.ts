/**
 * FAQ content — plain, factual answers. Rendered on /faq (with FAQPage JSON-LD)
 * and, in part, on the homepage, so the key facts are extractable as text by
 * search engines and AI answer engines rather than locked in images or buttons.
 *
 * No invented prices: detailing is quoted per vehicle.
 */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Do you come to me?",
    answer:
      "Yes. Royal Rinse is a fully mobile auto detailing service. We come to your home or office. Our rig is completely self-contained (it carries its own water and power), so we detail your vehicle right where it's parked. No drop-off, no waiting room, no lost afternoon.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We're based in Menifee and serve Temecula, Murrieta, and all of Riverside & San Diego County, including Riverside, San Diego, La Jolla, and Escondido. Because we're local to Menifee, our response times and scheduling are fastest across Menifee, Temecula, and Murrieta. If you're nearby and don't see your city listed, give us a call. We can usually reach you.",
  },
  {
    question: "Are you located in Menifee?",
    answer:
      "Yes. Royal Rinse Mobile Detailing is based in Menifee, CA. Being locally based means the fastest response times and easiest scheduling for Menifee, Temecula, and Murrieta, while we still cover all of Riverside & San Diego County. We're fully mobile, so wherever you are, we come to your home or office.",
  },
  {
    question: "How much does mobile car detailing cost in Temecula or Menifee?",
    answer:
      "Pricing is quote-based because it depends on your vehicle's size and condition and the service level. A maintenance wash, a full interior-and-exterior detail, and a multi-year ceramic coating are very different jobs. Call (951) 338-9117 or book online for a fast, honest quote on your specific vehicle. We never post one-size-fits-all prices that would overcharge some cars.",
  },
  {
    question: "What is ceramic coating, and is it worth it?",
    answer:
      "Ceramic coating is a liquid polymer that chemically bonds to your paint's clear coat, forming a durable, semi-permanent layer, unlike wax, which sits on top and washes away in weeks. It adds deep gloss, sheds water, and protects against UV, oxidation, and contaminants. A quality professional coating lasts years with proper care, so it's often worth it for owners who keep their cars long-term, want to protect resale value, or are tired of frequent waxing.",
  },
  {
    question: "How long does a detail take?",
    answer:
      "It depends on the service and the vehicle's condition. A maintenance wash is relatively quick, a full interior-and-exterior detail takes several hours, and a ceramic coating is a multi-stage job (decontamination, often paint correction, application, and cure) that can take most of a day. We'll give you a realistic time estimate when we quote your vehicle.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Royal Rinse Mobile Detailing is licensed, insured, and bonded, registered with the California DLSE under license CW-LR-1001298512. Your vehicle and your property are covered from the moment we arrive until the moment we leave.",
  },
  {
    question: "Do you offer a military discount?",
    answer:
      "Yes. We offer a 10% discount for active-duty and veteran military as a thank-you for your service. Mention it when you book or call (951) 338-9117.",
  },
  {
    question: "How do I book?",
    answer:
      "Book online in a couple of minutes through our booking page, or call (951) 338-9117. Tell us your vehicle and the service you're after and we'll handle the rest. Then we come to you.",
  },
];
