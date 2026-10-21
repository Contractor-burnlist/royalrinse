const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy. Everything defaults to this site only; the two
 * outside parties we use are allowlisted by name and nothing else can run:
 *
 * - Housecall Pro: the booking widget script (online-booking.housecallpro.com,
 *   loaded on demand, see lib/hcp.ts) and the booking iframe it opens, which
 *   /book also embeds (book.housecallpro.com).
 * - Google Maps: the embedded map on /contact (www.google.com), iframe only.
 * - CARTO: map tile images for the internal /ops page (*.basemaps.cartocdn.com),
 *   images only. No public page loads them.
 *
 * Fonts are self-hosted by next/font and images are local, so neither needs an
 * outside host. 'unsafe-inline' stays on script-src because Next.js inlines
 * its hydration data; a script from any host not listed here is still blocked.
 * Adding analytics, a pixel or a chat widget later means adding its host here.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://online-booking.housecallpro.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.basemaps.cartocdn.com",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "frame-src https://*.housecallpro.com https://www.google.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Vercel already sends HSTS on the production domain; set it here too so it
  // is explicit and travels with the code.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    // Nothing on the site uses these. `payment` is left open to the booking
    // iframe, which takes card details inside Housecall Pro's own page.
    value: [
      "accelerometer=()",
      "autoplay=()",
      "bluetooth=()",
      "browsing-topics=()",
      "camera=()",
      "display-capture=()",
      "geolocation=()",
      "gyroscope=()",
      "hid=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      'payment=(self "https://book.housecallpro.com")',
      "serial=()",
      "usb=()",
      "xr-spatial-tracking=()",
    ].join(", "),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // The /gallery/exterior and /gallery/interior sub-pages were consolidated
  // into the single filtered /gallery. Redirect the old URLs so any external
  // links or bookmarks land on the gallery instead of 404-ing.
  async redirects() {
    return [
      { source: "/gallery/exterior", destination: "/gallery", permanent: true },
      { source: "/gallery/interior", destination: "/gallery", permanent: true },
    ];
  },
};

export default nextConfig;
