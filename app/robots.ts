import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

const DISALLOW = ["/api/", "/ops/", "/thank-you"];

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
] as const;

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  const defaultRule = {
    allow: "/" as const,
    disallow: DISALLOW,
  };

  return {
    rules: [
      { userAgent: "*", ...defaultRule },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        ...defaultRule,
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
