"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { phClass, PlaceholderInner } from "@/components/ui";
import { useLightbox, type LightboxItem } from "@/components/shared";
import { useReducedMotion } from "@/hooks";
import { collectionFilters, collectionPieces } from "@/content/collections";
import type { CollectionFilter } from "@/types";
import { cn } from "@/lib/cn";

/**
 * The portfolio archive. Filters cross-fade the masonry rather than hard-
 * toggling display, for a curated feel. Honours a `?filter=` deep-link from the
 * home collection cards. Every tile opens the shared lightbox.
 */
export function CollectionPortfolio() {
  const params = useSearchParams();
  const reduced = useReducedMotion();
  const [active, setActive] = useState<CollectionFilter>("all");
  const [fading, setFading] = useState(false);

  // Apply a deep-linked filter on mount / when the query changes.
  useEffect(() => {
    const f = params.get("filter") as CollectionFilter | null;
    if (f && collectionFilters.some((c) => c.key === f)) {
      setActive(f);
    }
  }, [params]);

  const { open } = useLightbox();
  const lbItems: LightboxItem[] = collectionPieces.map((p) => ({
    caption: p.caption,
    tone: p.tone,
    src: p.src,
  }));

  const isVisible = useMemo(
    () => (piece: (typeof collectionPieces)[number]) =>
      active === "all" || piece.categories.includes(active),
    [active],
  );

  function changeFilter(next: CollectionFilter) {
    if (next === active) return;
    if (reduced) {
      setActive(next);
      return;
    }
    setFading(true);
    window.setTimeout(() => {
      setActive(next);
      requestAnimationFrame(() => setFading(false));
    }, 280);
  }

  return (
    <section className="section" style={{ paddingTop: "2rem" }}>
      <div className="wrap">
        <div className="filters" role="tablist" aria-label="Filter collections">
          {collectionFilters.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={active === f.key}
              className={cn(active === f.key && "active")}
              onClick={() => changeFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="masonry">
          {collectionPieces.map((piece, i) => (
            <figure
              key={piece.label}
              className={phClass(
                piece.tone,
                cn(piece.size, fading && "fading", !isVisible(piece) && "hide"),
              )}
              onClick={() => open(lbItems, i)}
              role="button"
              tabIndex={0}
              aria-label={`View ${piece.label}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open(lbItems, i);
                }
              }}
            >
              <PlaceholderInner tag={piece.label} src={piece.src} alt={piece.caption} />
              <figcaption>{piece.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
