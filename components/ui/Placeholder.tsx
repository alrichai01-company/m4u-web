import Image from "next/image";
import { cn } from "@/lib/cn";
import type { MediaTone } from "@/types";

const toneClass: Record<MediaTone, string> = {
  default: "",
  dark: "dark",
  rose: "rose",
  sage: "sage",
  "gold-t": "gold-t",
};

/** Returns the `ph`-family class string for a given tone + extras. */
export function phClass(tone: MediaTone = "default", extra?: string) {
  return cn("ph", toneClass[tone], extra);
}

interface PlaceholderInnerProps {
  tag: string;
  zoom?: boolean;
  /** Real image source. When present, renders an optimized <Image> in place of the gradient. */
  src?: string;
  /** Real video source. When present, renders an autoplay muted loop <video>. */
  videoSrc?: string;
  poster?: string;
  /** Alt text for real images (defaults to the tag). */
  alt?: string;
  /** next/image `sizes` hint for responsive loading. */
  sizes?: string;
  /**
   * CSS object-position for the fill layer, e.g. "top", "50% 20%".
   * Defaults to center. Use "top" when the subject (e.g. a model's head)
   * sits near the top of a portrait photo being cropped into a wider frame,
   * so the crop comes off the bottom instead of both edges.
   */
  objectPosition?: string;
}

/**
 * The inner content of a placeholder figure: the zoom layer and the centered
 * tag label. Gallery components compose their own <figure> (so they can add
 * figcaption, data-lb, onClick) and drop this inside. Swapping to real media
 * later means replacing these inner layers with <Image>/<video> — the figure
 * and its layout classes stay exactly the same.
 */
export function PlaceholderInner({
  tag,
  zoom = true,
  src,
  videoSrc,
  poster,
  alt,
  sizes = "(max-width: 860px) 100vw, 50vw",
  objectPosition,
}: PlaceholderInnerProps) {
  // Real video — layout classes on the parent figure stay unchanged.
  if (videoSrc) {
    return (
      <video
        className="zoom"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
        }}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source src={videoSrc} />
      </video>
    );
  }

  // Real image — wrapped in the zoom layer so the hover scale still applies.
  if (src) {
    return (
      <div className={zoom ? "zoom" : undefined} style={{ position: "absolute", inset: 0 }}>
        <Image
          src={src}
          alt={alt ?? tag}
          fill
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
          sizes={sizes}
        />
      </div>
    );
  }

  // Placeholder default (current state of the site).
  return (
    <>
      {zoom && <div className="zoom" aria-hidden="true" />}
      <span className="tag" aria-hidden="true">
        {tag}
      </span>
    </>
  );
}
