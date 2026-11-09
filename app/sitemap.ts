import type { MetadataRoute } from "next";
import { MARKETING_SITEMAP_PATHS } from "@/lib/marketing-sitemap";
import { absoluteSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return MARKETING_SITEMAP_PATHS.map(({ path, priority }) => ({
    url: absoluteSiteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
  }));
}
