"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Instagram, Phone } from "lucide-react";
import { Button, PlaceholderInner } from "@/components/ui";
import { useReducedMotion } from "@/hooks";
import { siteConfig, channels, phoneNumber } from "@/config/site";
import { useLang } from "@/context/lang";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [showPhone, setShowPhone] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });
      tl.from(".hero-mark", { yPercent: 110, duration: 1.2 })
        .from(".hero-kicker", { opacity: 0, y: 20, duration: 0.9 }, "-=0.9")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.9 }, "-=0.7")
        .from(".hero-btns > *", { opacity: 0, y: 20, duration: 0.9, stagger: 0.12 }, "-=0.6");
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      if (media.current) {
        media.current.style.transform = `translateY(${window.scrollY * 0.14}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <section id="hero" ref={root}>
      <div className="media" ref={media} aria-hidden="true">
        <figure className="ph dark">
          <PlaceholderInner
            tag="Hero — Campaign Film"
            videoSrc="/videos/hero.mp4"
            poster="/videos/hero-poster.jpg"
            objectPosition="top"
          />
        </figure>
        <div className="veil" />
      </div>

      <div className="content">
        <p className="kicker hero-kicker">
          {siteConfig.city} · Since {siteConfig.since}
        </p>
        <div className="hero-logo">
          <Image
            src="/images/m4u-logo.png"
            alt="M4U by Makhija Trendz"
            width={240}
            height={202}
            priority
          />
        </div>
        <h1>
          <span className="mask-line">
            <span className="hero-mark">{siteConfig.name}</span>
          </span>
        </h1>
        <p className="hero-sub">{t.heroTagline}</p>
        <div className="btns hero-btns">
          <Button href="/contact" variant="light" arrow magnetic>
            {t.heroCta1}
          </Button>
          <Button href="/collections" variant="quiet" arrow magnetic>
            {t.heroCta2}
          </Button>
        </div>

        <div className="hero-social" style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "1rem" }}>
          <a
            href={channels.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-btn"
            aria-label="Instagram — @m4u.by.makhija"
            title="Follow us on Instagram"
          >
            <Instagram size={18} />
          </a>

          <button
            type="button"
            onClick={() => setShowPhone(!showPhone)}
            className={`hero-social-btn ${showPhone ? "expanded" : ""}`}
            aria-label="M4U Phone Number"
            title="Click to view contact number"
          >
            <Phone size={18} style={showPhone ? { color: "var(--gold)" } : undefined} />
            {showPhone && <span>{phoneNumber.display}</span>}
          </button>
        </div>
      </div>

      <div id="scroll-cue">
        {t.heroScroll}
        <span className="ln">
          <i />
        </span>
      </div>
    </section>
  );
}

