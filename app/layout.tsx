import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Noto_Sans_Devanagari } from "next/font/google";
import "@/styles/globals.css";

import { Navbar, Footer } from "@/components/layout";
import { Loader, ProgressBar, Chatbot, BackgroundAudio } from "@/components/shared";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";

/**
 * Fonts are self-hosted via next/font (no layout shift, no external request).
 * They expose CSS variables that styles/tokens.css consumes, so the design
 * system stays the single source of truth for typography.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const notoDeva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-hi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.legalName} — Luxury Women's Ethnic Wear Manufacturing, ${siteConfig.city}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.legalName}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.legalName,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.legalName,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

/** Organization JSON-LD for rich results. Extend with logo/sameAs at launch. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  url: siteConfig.url,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.city,
    addressRegion: siteConfig.region,
    addressCountry: siteConfig.country,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${notoDeva.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Loader />
        <ProgressBar />
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
          <BackgroundAudio />
        </Providers>
      </body>
    </html>
  );
}
