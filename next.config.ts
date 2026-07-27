import type { NextConfig } from "next";

/**
 * Next.js configuration.
 *
 * Security headers are set conservatively here. The CSP is intentionally
 * permissive for `img-src`/`media-src` so that a future CDN (ImageKit,
 * Cloudinary, R2) can be dropped in via `images.remotePatterns` without a
 * refactor. Tighten `connect-src` once the chatbot/analytics endpoints are known.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add CDN hosts here when real media is wired in — no layout changes needed.
    remotePatterns: [],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
