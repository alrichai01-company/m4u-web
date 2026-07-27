/**
 * Shared domain types.
 *
 * These describe the *content* the site renders, deliberately decoupled from
 * how it looks. When the Phase-4 CMS arrives, it can populate these same shapes
 * from the database and no component needs to change.
 */

/** Placeholder tone variants, matching the approved `.ph` background classes. */
export type MediaTone = "default" | "dark" | "rose" | "sage" | "gold-t";

/**
 * A media slot. Today it renders a styled placeholder; later it can carry a
 * real image or video src without any layout change (see components/shared/Media).
 */
export interface MediaItem {
  /** Placeholder label / eventual alt text. */
  label: string;
  tone?: MediaTone;
  /** Optional override for the placeholder tag text (defaults to label). */
  tag?: string;
  /** Future: real asset source. */
  src?: string;
  /** Future: distinguishes image vs video vs 360. */
  kind?: "image" | "video" | "360";
  /** Caption shown on hover in galleries. */
  caption?: string;
}

/** Factory bento item — carries its grid-area class. */
export interface FactoryMediaItem extends MediaItem {
  area: "a" | "b" | "c" | "d" | "e" | "f";
}

/** Campaign gallery item — carries its span + optional vertical offset. */
export interface CampaignMediaItem extends MediaItem {
  span: "w5" | "w7";
  off?: boolean;
}

export interface Stat {
  /** Numeric target the counter animates to. */
  value: number;
  /** Suffix rendered in gold after the number, e.g. "+", "K+", "%". */
  suffix?: string;
  label: string;
}

export interface CollectionCard {
  title: string;
  /** Filter key this card deep-links to on the collections page. */
  filter: CollectionFilter;
  tone?: MediaTone;
  /** Real image path (e.g. "/images/..."). Falls back to the placeholder when omitted. */
  src?: string;
  alt?: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  body: string;
}

export interface ProcessStep {
  title: string;
  body: string;
  tone?: MediaTone;
  /** Placeholder tag text for the media slot. */
  tag?: string;
  /** Real image path. Falls back to the placeholder when omitted. */
  src?: string;
}

export interface WhyCard {
  index: string;
  title: string;
  body: string;
}

export interface OrderStep {
  title: string;
  body: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/** Collection filter keys used by the masonry gallery. */
export type CollectionFilter =
  | "all"
  | "kurtis"
  | "coord"
  | "suits"
  | "cotton"
  | "prints"
  | "anarkali"
  | "party"
  | "daily";

export interface CollectionPiece {
  label: string;
  tone: MediaTone;
  /** Height class for masonry rhythm. */
  size: "h-t" | "h-m" | "h-l";
  /** Categories this piece belongs to (space-separated in DOM). */
  categories: CollectionFilter[];
  caption: string;
  /** Real image path. Falls back to the placeholder when omitted. */
  src?: string;
}
