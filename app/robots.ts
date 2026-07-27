import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * robots.txt — allows all crawlers, points to the dynamic sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
