"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SectionHeader, phClass, PlaceholderInner, Button } from "@/components/ui";
import { homeCollections } from "@/content/home";
import { useReducedMotion } from "@/hooks";
import { useLang } from "@/context/lang";

/**
 * Infinite 60fps right-to-left product marquee featuring the home collection categories.
 * Accelerates/decelerates smoothly on hover, with cards that enlarge on mouseover.
 */
export function CollectionGrid() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const xPos = useRef(0);
  const halfWidth = useRef(0);
  const currentSpeed = useRef(0.87);
  const targetSpeed = useRef(0.87);
  const reduced = useReducedMotion();
  const { t } = useLang();

  // Duplicate items 4 times total (so 2 identical halves of 12 items = 24 items) to guarantee a seamless half-width loop wider than any screen
  const marqueePieces = [...homeCollections, ...homeCollections, ...homeCollections, ...homeCollections];

  useEffect(() => {
    if (reduced) return;

    const checkWidth = () => {
      if (trackRef.current) {
        halfWidth.current = trackRef.current.scrollWidth / 2;
      }
    };

    // Check immediately and after images/layout settle
    checkWidth();
    const timer1 = setTimeout(checkWidth, 150);
    const timer2 = setTimeout(checkWidth, 600);
    window.addEventListener("resize", checkWidth);

    let animationFrameId: number;
    const animate = () => {
      if (trackRef.current && halfWidth.current > 0) {
        // Smooth deceleration/acceleration interpolation
        currentSpeed.current += (targetSpeed.current - currentSpeed.current) * 0.08;
        xPos.current -= currentSpeed.current;

        // Wrap around seamlessly when first half finishes scrolling
        if (Math.abs(xPos.current) >= halfWidth.current) {
          xPos.current += halfWidth.current;
        }

        trackRef.current.style.transform = `translate3d(${xPos.current}px, 0, 0)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", checkWidth);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reduced]);

  return (
    <section className="section" id="collections">
      <div className="wrap">
        <SectionHeader eyebrow={t.collectionsEyebrow}>
          {t.collectionsHeading1}
          <br />
          <span className="it">{t.collectionsHeading2}</span>
        </SectionHeader>
      </div>

      <div
        ref={viewportRef}
        className="marquee-viewport"
        onMouseEnter={() => (targetSpeed.current = 0.15)}
        onMouseLeave={() => (targetSpeed.current = 0.87)}
      >
        <div ref={trackRef} className="marquee-track">
          {marqueePieces.map((piece, idx) => (
            <Link
              key={`${piece.title}-${idx}`}
              href={`/collections?filter=${piece.filter}`}
              className={phClass(piece.tone, "marquee-card")}
            >
              <PlaceholderInner tag={`Collection — ${piece.title}`} src={piece.src} alt={piece.alt ?? piece.title} />
              <div className="info">
                <h3>{piece.title}</h3>
                <span className="m">{t.collectionsViewBtn}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div style={{ marginTop: "var(--rhythm)", display: "flex", justifyContent: "center" }}>
          <Button href="/collections" variant="gold" arrow magnetic>
            {t.collectionsExploreBtn}
          </Button>
        </div>
      </div>
    </section>
  );
}
