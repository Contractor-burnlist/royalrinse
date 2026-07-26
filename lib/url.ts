/**
 * Absolute site URL, for anywhere a full URL is required rather than a path:
 * og:image, canonical links, and JSON-LD @id / image fields. Search engines
 * and social scrapers resolve those from their own origin, so a bare "/path"
 * is either ignored or resolved wrong.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this to the real domain. Preferred.
 *   2. Vercel's production URL, available at build time on Vercel.
 *   3. localhost, so local dev and tests still work.
 *
 * Until (1) is set in the project's environment variables, deployed pages
 * fall back to the Vercel domain rather than the custom one.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** Joins a root-relative path onto siteUrl. Pass "/blog/x", get a full URL. */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
