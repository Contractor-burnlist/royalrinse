import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/url";

/**
 * Everything is open to every crawler. The AI crawlers are also named
 * explicitly, so the intent is unambiguous: we WANT AI search engines reading
 * and citing this site. Do not add Disallow rules for them.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
