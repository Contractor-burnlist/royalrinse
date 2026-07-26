/** @type {import('next').NextConfig} */
const nextConfig = {
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
