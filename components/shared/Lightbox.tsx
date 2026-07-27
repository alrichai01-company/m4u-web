"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { phClass, PlaceholderInner } from "@/components/ui";
import type { MediaTone } from "@/types";

export interface LightboxItem {
  caption: string;
  tone: MediaTone;
  /** Real image path. Falls back to the placeholder when omitted. */
  src?: string;
}

interface LightboxContextValue {
  /** Open the lightbox at a given item within an ordered set. */
  open: (items: LightboxItem[], index: number) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

/**
 * Provides a single app-wide lightbox. Galleries register their ordered items
 * on open, enabling prev/next across a set. Keyboard (Esc / arrows) and
 * scroll-lock are handled here so individual galleries stay declarative.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((next: LightboxItem[], i: number) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setItems(next);
    setIndex(i);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length],
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Move focus into the dialog on open; return it to the trigger on close.
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Tab") {
        // Trap focus within the dialog's three buttons (close, prev, next).
        const dialog = document.getElementById("lightbox");
        const focusable = dialog?.querySelectorAll<HTMLElement>("button");
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, prev, next]);

  const value = useMemo(() => ({ open }), [open]);
  const current = items[index];

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <div
        id="lightbox"
        role="dialog"
        aria-label="Image viewer"
        aria-modal="true"
        className={isOpen ? "open" : undefined}
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "lightbox") close();
        }}
      >
        <button
          ref={closeButtonRef}
          className="x"
          aria-label="Close"
          onClick={close}
        >
          ×
        </button>
        <button
          className="navb prev"
          aria-label="Previous"
          onClick={prev}
        >
          ←
        </button>
        <div className="frame">
          <figure className={phClass(current?.tone ?? "dark")}>
            <PlaceholderInner
              tag="Replace with full-resolution media"
              src={current?.src}
              alt={current?.caption}
              sizes="90vw"
              zoom={false}
            />
          </figure>
          <span className="cap">{current?.caption}</span>
        </div>
        <button className="navb next" aria-label="Next" onClick={next}>
          →
        </button>
      </div>
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return ctx;
}
