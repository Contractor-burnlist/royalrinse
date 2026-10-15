/**
 * Central SEO helpers: one metadata builder every page uses (so canonical +
 * Open Graph + Twitter are consistent and never duplicated), and the site-wide
 * LocalBusiness / Organization / WebSite JSON-LD graph.
 */

import type { Metadata } from "next";
import {
  AGGREGATE_RATING,
  FACEBOOK_URL,
  GOOGLE_MAPS_URL,
  GOOGLE_PLACE_ID,
  OPENING_HOURS,
  PHONE_TEL,
  PRICE_RANGE,
  SERVICE_AREA_LINE,
  site,
} from "@/lib/site";
import { priorityCities, secondaryCities } from "@/lib/serviceAreas";
import { serviceDetails } from "@/lib/services";
import { absoluteUrl, PRODUCTION_URL, siteUrl } from "@/lib/url";

/** E.164 phone for schema (tel: constant carries the same digits). */
const PHONE_E164 = PHONE_TEL.replace("tel:", "");

/** Logo + a default social image, both absolute. */
export const LOGO_URL = absoluteUrl("/royal-logo.jpeg");

const BUSINESS_ID = `${siteUrl}/#business`;
const ORGANIZATION_ID = `${siteUrl}/#organization`;

/**
 * areaServed, in PRIORITY order: the five priority cities, then the two
 * counties, then every secondary city. Order signals emphasis.
 */
export const AREA_SERVED_PRIMARY = [
  ...priorityCities.map((city) => ({ "@type": "City", name: `${city.name}, CA` })),
  { "@type": "AdministrativeArea", name: "Riverside County, CA" },
  { "@type": "AdministrativeArea", name: "San Diego County, CA" },
];

export const AREA_SERVED = [
  ...AREA_SERVED_PRIMARY,
  ...secondaryCities.map((city) => ({ "@type": "City", name: `${city.name}, CA` })),
];

/** What the business is expert in, for entity resolution. */
const KNOWS_ABOUT = [
  "Mobile auto detailing",
  "Ceramic coating",
  "Paint correction",
  "Interior detailing",
  "Exotic car detailing",
  "Luxury car detailing",
  "Classic car care",
  "Deionized water washing",
];

/** Reference to the business node, for `provider` on Service schema. */
export const PROVIDER_REF = {
  "@type": "AutoWash",
  "@id": BUSINESS_ID,
  name: site.legalName,
};

/**
 * BreadcrumbList JSON-LD. Pass the trail BELOW the homepage; Home is added
 * first automatically.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Build page metadata. Pass a root-relative `path` and you get a self-canonical
 * page with Open Graph + Twitter filled in. Omit `image` to use the
 * site-wide card (app/opengraph-image.tsx, linked explicitly below); pass one
 * for a page-specific share image (e.g. a blog cover).
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const url = absoluteUrl(path);
  /**
   * A page-level `openGraph` object replaces the root one wholesale, so the
   * file-based card in app/opengraph-image.tsx is NOT inherited once a page
   * sets openGraph. Point at it explicitly when no page image is given.
   */
  const images = image
    ? [{ url: image }]
    : [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${site.legalName}, Mobile Auto Detailing, ${SERVICE_AREA_LINE}`,
        },
      ];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: site.legalName,
      locale: "en_US",
      images,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [absoluteUrl("/twitter-image")],
    },
  };
}

/**
 * Site-wide JSON-LD graph: the AutoWash local business (a Service-Area
 * business — no public storefront address), plus Organization and WebSite
 * nodes. Emitted once in the root layout; other pages reference @id where
 * useful.
 */
export function siteJsonLd() {
  const businessId = BUSINESS_ID;

  const business: Record<string, unknown> = {
    // "AutoDetailing" is not a schema.org type and fails validation.
    // AutoWash (AutomotiveBusiness > LocalBusiness) is the closest real one.
    "@type": ["AutoWash", "LocalBusiness"],
    "@id": businessId,
    name: site.legalName,
    url: siteUrl,
    telephone: PHONE_E164,
    email: site.email,
    image: LOGO_URL,
    logo: LOGO_URL,
    priceRange: PRICE_RANGE,
    description: `Royal Rinse Mobile Detailing is a mobile auto detailing company based in Menifee, California, serving Menifee, Temecula, Murrieta, Riverside, San Diego and the surrounding areas of ${SERVICE_AREA_LINE}. Licensed, insured, and bonded. We come to your home or office.`,
    slogan: site.tagline,
    knowsAbout: KNOWS_ABOUT,
    parentOrganization: { "@id": ORGANIZATION_ID },
    // Service-area business: no public storefront, so region only (no street).
    address: {
      "@type": "PostalAddress",
      addressLocality: "Menifee",
      addressRegion: "CA",
      addressCountry: "US",
    },
    // Priority order: the five priority cities, the two counties, then the
    // secondary cities. See AREA_SERVED above.
    areaServed: AREA_SERVED,
    hasMap: GOOGLE_MAPS_URL,
    sameAs: [GOOGLE_MAPS_URL, FACEBOOK_URL],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "CA DLSE license",
      value: site.licenseNumber,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...OPENING_HOURS.days],
        opens: OPENING_HOURS.opens,
        closes: OPENING_HOURS.closes,
      },
    ],
    // One Service per service page, each with its own areaServed.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mobile auto detailing services",
      itemListElement: serviceDetails.map((detail) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${absoluteUrl(`/services/${detail.slug}`)}#service`,
          name: detail.name,
          serviceType: detail.name,
          description: detail.intro,
          url: absoluteUrl(`/services/${detail.slug}`),
          areaServed: AREA_SERVED_PRIMARY,
          provider: { "@id": businessId },
        },
      })),
    },
    // Ties the profile to its Google Place for entity disambiguation.
    additionalProperty: {
      "@type": "PropertyValue",
      propertyID: "Google Place ID",
      value: GOOGLE_PLACE_ID,
    },
  };

  // Only publish a rating once the real GBP numbers are filled in.
  if (AGGREGATE_RATING) {
    business.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: AGGREGATE_RATING.ratingValue,
      reviewCount: AGGREGATE_RATING.reviewCount,
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      business,
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: site.legalName,
        alternateName: site.name,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: LOGO_URL,
          width: 1254,
          height: 1254,
        },
        image: LOGO_URL,
        email: site.email,
        telephone: PHONE_E164,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PHONE_E164,
          contactType: "customer service",
          areaServed: "US-CA",
          availableLanguage: "English",
        },
        sameAs: [GOOGLE_MAPS_URL, FACEBOOK_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.legalName,
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

export { PRODUCTION_URL };
