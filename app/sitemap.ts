import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { cities } from "@/lib/serviceAreas";
import { serviceDetails } from "@/lib/services";
import { absoluteUrl } from "@/lib/url";

/**
 * Every crawlable route, generated from the data so new services, cities, and
 * blog posts are covered automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/packages", priority: 0.9 },
    { path: "/ceramic-warranty", priority: 0.6 },
    { path: "/service-area", priority: 0.8 },
    { path: "/gallery", priority: 0.6 },
    { path: "/reviews", priority: 0.6 },
    { path: "/about", priority: 0.5 },
    { path: "/blog", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
    { path: "/book", priority: 0.7 },
  ];

  const dynamicPaths: { path: string; priority: number }[] = [
    ...serviceDetails.map((s) => ({ path: `/services/${s.slug}`, priority: 0.7 })),
    ...cities.map((c) => ({ path: `/service-area/${c.slug}`, priority: 0.7 })),
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.5 })),
  ];

  return [...staticPaths, ...dynamicPaths].map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  }));
}
