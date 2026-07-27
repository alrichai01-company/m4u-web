"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/config/site";
import { useLang } from "@/context/lang";

/**
 * Fixed navigation.
 *
 * - Turns opaque with a hairline border after a short scroll.
 * - Renders white ("on-dark") over the home hero until scrolled.
 * - Highlights the active route.
 * - Collapses to a staggered full-screen menu under 1000px.
 * - EN | हि language toggle on both desktop and mobile.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const onDark = pathname === "/";
  const { lang, t, toggle } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  const navItems = [
    { label: t.navHome, href: "/" },
    { label: t.navManufacturing, href: "/about" },
    { label: t.navCollections, href: "/collections" },
    { label: t.navHowToOrder, href: "/how-to-order" },
    { label: t.navContact, href: "/contact" },
  ];

  return (
    <>
      <nav className={cn(onDark && "on-dark", scrolled && "scrolled")}>
        <div className="bar-in">
          <Link href="/" className="logo">
            {siteConfig.name} <em>Makhija Trendz</em>
          </Link>

          <div className="nav-links">
            {navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(pathname === link.href && "active")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-right">
            <button
              id="lang-toggle"
              className="lang-toggle"
              onClick={toggle}
              aria-label={lang === "en" ? "Switch to Hindi" : "Switch to English"}
              title={lang === "en" ? "हिन्दी में देखें" : "View in English"}
            >
              <span className={lang === "en" ? "active" : ""}>EN</span>
              <span className="sep">|</span>
              <span className={lang === "hi" ? "active" : ""}>हि</span>
            </button>

            <Link href="/how-to-order#partner" className="nav-cta">
              {t.navBecomePartner}
            </Link>

            <button
              id="burger"
              className={cn(menuOpen && "open")}
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <i />
              <i />
              <i />
            </button>
          </div>
        </div>
      </nav>

      <div id="mobile-menu" className={cn(menuOpen && "open")}>
        {navItems.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <Link href="/how-to-order#partner" className="gold it">
          {t.navBecomePartner}
        </Link>
        <button
          className="lang-toggle lang-toggle--mobile"
          onClick={toggle}
          aria-label={lang === "en" ? "Switch to Hindi" : "Switch to English"}
        >
          <span className={lang === "en" ? "active" : ""}>EN</span>
          <span className="sep">|</span>
          <span className={lang === "hi" ? "active" : ""}>हि</span>
        </button>
      </div>
    </>
  );
}
