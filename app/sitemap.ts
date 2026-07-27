import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Dynamic sitemap. Covers all approved routes from the routing table (§12).
 * Priority values reflect the user journey: home → collections → order → contact.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/collections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/how-to-order`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
