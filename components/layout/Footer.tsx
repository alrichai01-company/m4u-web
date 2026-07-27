"use client";

import Link from "next/link";
import { footerLinks, siteConfig } from "@/config/site";
import { useLang } from "@/context/lang";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLang();

  const navItems = [
    { label: t.navHome, href: "/" },
    { label: t.navManufacturing, href: "/about" },
    { label: t.navCollections, href: "/collections" },
    { label: t.navHowToOrder, href: "/how-to-order" },
    { label: t.navContact, href: "/contact" },
  ];

  return (
    <footer>
      <div className="wrap">
        <div className="top">
          <div>
            <Link href="/" className="logo brand-line">
              {siteConfig.name} <em>Makhija Trendz</em>
            </Link>
            <p style={{ marginTop: "1.4rem", fontSize: "0.9rem", maxWidth: "32ch" }}>
              {t.footerTagline}
            </p>
          </div>

          <div>
            <h4>{t.footerExplore}</h4>
            <ul>
              {navItems.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t.footerConnect}</h4>
            <ul>
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bottom">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span>
              © {year} {siteConfig.legalName}. {t.footerRights}
            </span>
            <span style={{ opacity: 0.6, fontSize: "0.85em", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Designed and Developed by Alrich AI
            </span>
          </div>
          <span className="it serif" style={{ color: "var(--gold)" }}>
            {t.footerCrafted}
          </span>
        </div>
      </div>
    </footer>
  );
}
