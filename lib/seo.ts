/**
 * Central SEO helpers: one metadata builder every page uses (so canonical +
 * Open Graph + Twitter are consistent and never duplicated), and the site-wide
 * LocalBusiness / Organization / WebSite JSON-LD graph.
 */

import type { Metadata } from "next";
import {
  AGGREGATE_RATING,
  GOOGLE_MAPS_URL,
  GOOGLE_PLACE_ID,
  OPENING_HOURS,
  PHONE_TEL,
  PRICE_RANGE,
  SERVICE_AREA_LINE,
  site,
} from "@/lib/site";
import { cities } from "@/lib/serviceAreas";
import { absoluteUrl, PRODUCTION_URL, siteUrl } from "@/lib/url";

/** E.164 phone for schema (tel: constant carries the same digits). */
const PHONE_E164 = PHONE_TEL.replace("tel:", "");

/** Logo + a default social image, both absolute. */
export const LOGO_URL = absoluteUrl("/royal-logo.jpeg");

/**
 * Build page metadata. Pass a root-relative `path` and you get a self-canonical
 * page with Open Graph + Twitter filled in. Omit `image` to inherit the
 * site-wide OG card (app/opengraph-image.tsx); pass one for a page-specific
 * share image (e.g. a blog cover).
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
  const images = image ? [{ url: image }] : undefined;

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
      ...(images ? { images } : {}),
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}

/**
 * Site-wide JSON-LD graph: the AutoDetailing local business (a Service-Area
 * business — no public storefront address), plus Organization and WebSite
 * nodes. Emitted once in the root layout; other pages reference @id where
 * useful.
 */
export function siteJsonLd() {
  const businessId = `${siteUrl}/#business`;

  const business: Record<string, unknown> = {
    "@type": ["AutoDetailing", "LocalBusiness"],
    "@id": businessId,
    name: site.legalName,
    url: siteUrl,
    telephone: PHONE_E164,
    email: `mailto:${site.email}`,
    image: LOGO_URL,
    logo: LOGO_URL,
    priceRange: PRICE_RANGE,
    description: `Premium mobile auto detailing serving ${SERVICE_AREA_LINE}. Licensed, insured, and bonded. We come to your home or office.`,
    // Service-area business: no public storefront, so region only (no street).
    address: {
      "@type": "PostalAddress",
      addressRegion: "CA",
      addressCountry: "US",
    },
    // Order signals emphasis: priority markets first (Menifee, Temecula,
    // Riverside County, San Diego city + county), then every remaining city.
    areaServed: [
      { "@type": "City", name: "Menifee, CA" },
      { "@type": "City", name: "Temecula, CA" },
      { "@type": "AdministrativeArea", name: "Riverside County, CA" },
      { "@type": "City", name: "San Diego, CA" },
      { "@type": "AdministrativeArea", name: "San Diego County, CA" },
      ...cities
        .filter((city) => !["menifee", "temecula", "san-diego"].includes(city.slug))
        .map((city) => ({ "@type": "City", name: `${city.name}, CA` })),
    ],
    hasMap: GOOGLE_MAPS_URL,
    sameAs: [GOOGLE_MAPS_URL],
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
        "@id": `${siteUrl}/#organization`,
        name: site.legalName,
        url: siteUrl,
        logo: LOGO_URL,
        sameAs: [GOOGLE_MAPS_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.legalName,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

export { PRODUCTION_URL };
