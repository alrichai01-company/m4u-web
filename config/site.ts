/**
 * Site configuration.
 *
 * Brand facts, navigation, and external channels in one place. Placeholders
 * flagged with TODO must be replaced before launch.
 */

export const siteConfig = {
  name: "M4U",
  legalName: "M4U by Makhija Trendz",
  tagline:
    "Luxury women's ethnic manufacturing — designed for India's finest retailers.",
  description:
    "M4U by Makhija Trendz — premium B2B manufacturer of designer kurtis, co-ord sets and suit sets. Wholesale partnerships for boutiques, retailers, distributors and exporters. Made in Ahmedabad.",
  // TODO: confirm real founding year with the client.
  since: "2016",
  city: "Ahmedabad",
  region: "Gujarat",
  country: "India",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://m4u.makhijatrendz.com",
} as const;

/**
 * The single source of truth for the business phone number.
 * `raw` = digits only with country code (for wa.me links).
 * `display` = human-readable (for on-screen text).
 * Everything below, plus the Hero and Chatbot, derives from these — change
 * the number here once and it updates everywhere.
 */
export const phoneNumber = {
  raw: "917073570900",
  display: "+91 70735 70900",
} as const;

/** External contact channels. */
export const channels = {
  whatsapp: `https://wa.me/${phoneNumber.raw}`,
  phone: `tel:+${phoneNumber.raw}`,
  instagram:
    "https://www.instagram.com/m4u.by.makhija?igsh=NjU3YTd1eHoyYzk4",
  // TODO: set the real inbox once Resend is wired.
  email: "hello@makhijatrendz.com",
  mapEmbed:
    "https://www.google.com/maps?q=Ahmedabad,Gujarat&output=embed",
} as const;

/** Primary navigation — drives both desktop nav and mobile menu. */
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Manufacturing", href: "/about" },
  { label: "Collections", href: "/collections" },
  { label: "How to Order", href: "/how-to-order" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  explore: navLinks,
  connect: [
    { label: "Instagram", href: channels.instagram, external: true },
    { label: "WhatsApp", href: channels.whatsapp, external: true },
    { label: "Privacy Policy", href: "/privacy-policy", external: false },
    { label: "Terms & Conditions", href: "/terms-and-conditions", external: false },
  ],
} as const;
