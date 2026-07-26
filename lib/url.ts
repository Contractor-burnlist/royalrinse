/**
 * Absolute site URL, for anywhere a full URL is required rather than a path:
 * og:image, canonical links, and JSON-LD @id / image fields. Search engines
 * and social scrapers resolve those from their own origin, so a bare "/path"
 * is either ignored or resolved wrong.
 *
 * The production domain is the default so canonicals and OG URLs are correct
 * even without any env var set. Override with NEXT_PUBLIC_SITE_URL (e.g. a
 * preview or a local run) when you need a different origin.
 */
export const PRODUCTION_URL = "https://www.royalrinsemobile.com";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL
).replace(/\/$/, "");

/** Joins a root-relative path onto siteUrl. Pass "/blog/x", get a full URL. */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
