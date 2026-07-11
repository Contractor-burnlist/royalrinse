/**
 * Single source of truth for business facts, nav, and shared copy.
 * [PHONE] and [EMAIL] are placeholder tokens — swap the two values below
 * and every link/label across the site updates.
 */

export const site = {
  name: "Royal Rinse",
  tagline: "Mobile Auto Detailing — We Come To You",
  phone: "[PHONE]",
  email: "[EMAIL]",
  license: "Licensed & Insured — CA DLSE CW-LR-1001298512",
  hours: [
    { days: "Mon – Fri", time: "7:00 AM – 6:00 PM" },
    { days: "Saturday", time: "8:00 AM – 5:00 PM" },
    { days: "Sunday", time: "By appointment" },
  ],
  // Prices are deliberately not listed — quote on request.
  price: "Call for quote",
} as const;

/** Becomes a working tel: link as soon as site.phone holds a real number. */
export const telHref = `tel:${site.phone}`;
export const mailHref = `mailto:${site.email}`;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Service Area", href: "/service-area" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
] as const;

export const services = [
  {
    name: "Express Wash",
    slug: "express-wash",
    icon: "droplet",
    description: "A fast, thorough hand wash that keeps your car sharp between full details.",
  },
  {
    name: "Interior Detail",
    slug: "interior-detail",
    icon: "seat",
    description: "Deep vacuum, steam, and conditioning for carpets, seats, and every panel.",
  },
  {
    name: "Exterior Detail",
    slug: "exterior-detail",
    icon: "car",
    description: "Decontamination, polish, and wax for a deep, reflective finish.",
  },
  {
    name: "Full Detail",
    slug: "full-detail",
    icon: "sparkle",
    description: "Inside and out, top to bottom — our most complete restoration service.",
  },
  {
    name: "Ceramic Coating",
    slug: "ceramic-coating",
    icon: "shield",
    description: "A durable protective layer that locks in gloss and repels water and grime.",
  },
  {
    name: "Paint Correction",
    slug: "paint-correction",
    icon: "polish",
    description: "Multi-stage machine polishing that removes swirls, scratches, and oxidation.",
  },
] as const;

export const serviceAreas = [
  { name: "La Jolla", slug: "la-jolla" },
  { name: "Del Mar", slug: "del-mar" },
  { name: "Carmel Valley", slug: "carmel-valley" },
  { name: "Pacific Beach", slug: "pacific-beach" },
  { name: "Rancho Santa Fe", slug: "rancho-santa-fe" },
] as const;

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
    title: "Licensed & fully insured",
    description: site.license,
  },
] as const;

export const testimonials = [
  {
    quote: "Placeholder review copy — replace with a real customer testimonial before launch.",
    author: "Customer Name",
    location: "San Diego, CA",
  },
  {
    quote: "Placeholder review copy — replace with a real customer testimonial before launch.",
    author: "Customer Name",
    location: "San Diego, CA",
  },
  {
    quote: "Placeholder review copy — replace with a real customer testimonial before launch.",
    author: "Customer Name",
    location: "San Diego, CA",
  },
] as const;
