import type { CollectionPiece, CollectionFilter } from "@/types";

export const collectionFilters: { key: CollectionFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "kurtis", label: "Kurtis" },
  { key: "coord", label: "Co-ord Sets" },
  { key: "suits", label: "Premium Suits" },
  { key: "cotton", label: "Cotton" },
  { key: "prints", label: "Daily Wear Prints" },
  { key: "anarkali", label: "Fancy Anarkali" },
  { key: "party", label: "Party Wear" },
  { key: "daily", label: "Daily Wear" },
];

/**
 * The real product portfolio. Every piece has a real `src`.
 *
 * "Daily Wear Prints" and "Fancy Anarkali" are NOT separate photo sets on
 * disk — they replaced "Rayon" and "Chanderi & Crepe" (which never had
 * matching photos) as requested, but the photos provided for them turned
 * out to be the same garments already in the "cotton" and "premium-suits"
 * folders (confirmed by file comparison). Rather than store duplicate
 * copies of the same photo under two folders, the existing cotton pieces
 * are tagged with an added "prints" category, and the existing Kiara
 * 114/115/117 premium-suit pieces are tagged with an added "anarkali"
 * category — so both filters show real, correct results with a single
 * copy of each file. The 3 photos that were genuinely new (Saheli 870,
 * Satrangi 323, Satrangi 335) were added to public/images/collections/cotton/.
 */
export const collectionPieces: CollectionPiece[] = [
  { label: "Saheli 866", tone: "rose", size: "h-m", categories: ["cotton", "kurtis", "daily", "prints"], caption: "Saheli 866 — Cotton", src: "/images/collections/cotton/saheli-866.jpg" },
  { label: "Saheli 870", tone: "gold-t", size: "h-l", categories: ["cotton", "kurtis", "daily", "prints"], caption: "Saheli 870 — Cotton", src: "/images/collections/cotton/saheli-870.jpg" },
  { label: "Saheli 934", tone: "sage", size: "h-t", categories: ["cotton", "kurtis", "daily", "prints"], caption: "Saheli 934 — Cotton", src: "/images/collections/cotton/saheli-934.jpg" },
  { label: "Saheli 936", tone: "dark", size: "h-m", categories: ["cotton", "kurtis", "daily", "prints"], caption: "Saheli 936 — Cotton", src: "/images/collections/cotton/saheli-936.jpg" },
  { label: "Satrangi 323", tone: "default", size: "h-l", categories: ["cotton", "kurtis", "daily", "prints"], caption: "Satrangi 323 — Cotton", src: "/images/collections/cotton/satrangi-323.jpg" },
  { label: "Satrangi 327", tone: "rose", size: "h-t", categories: ["cotton", "kurtis", "daily", "prints"], caption: "Satrangi 327 — Cotton", src: "/images/collections/cotton/satrangi-327.jpg" },
  { label: "Satrangi 335", tone: "gold-t", size: "h-m", categories: ["cotton", "kurtis", "daily", "prints"], caption: "Satrangi 335 — Cotton", src: "/images/collections/cotton/satrangi-335.jpg" },
  { label: "Satrangi 338", tone: "sage", size: "h-l", categories: ["cotton", "kurtis", "daily", "prints"], caption: "Satrangi 338 — Cotton", src: "/images/collections/cotton/satrangi-338.jpg" },
  { label: "Co-ord Set 01", tone: "dark", size: "h-t", categories: ["coord"], caption: "Co-ord Set 01", src: "/images/collections/cord-set/cord-set-01.jpg" },
  { label: "Co-ord Set 02", tone: "default", size: "h-m", categories: ["coord"], caption: "Co-ord Set 02", src: "/images/collections/cord-set/cord-set-02.jpg" },
  { label: "Co-ord Set 03", tone: "rose", size: "h-l", categories: ["coord"], caption: "Co-ord Set 03", src: "/images/collections/cord-set/cord-set-03.jpg" },
  { label: "Co-ord Set 04", tone: "gold-t", size: "h-t", categories: ["coord"], caption: "Co-ord Set 04", src: "/images/collections/cord-set/cord-set-04.jpg" },
  { label: "Co-ord Set 05", tone: "sage", size: "h-m", categories: ["coord"], caption: "Co-ord Set 05", src: "/images/collections/cord-set/cord-set-05.jpg" },
  { label: "Kiara 101", tone: "dark", size: "h-l", categories: ["daily", "kurtis"], caption: "Kiara 101 — Daily Wear", src: "/images/collections/daily-wear/kiara-101.jpg" },
  { label: "Kiara 135", tone: "default", size: "h-t", categories: ["daily", "kurtis"], caption: "Kiara 135 — Daily Wear", src: "/images/collections/daily-wear/kiara-135.jpg" },
  { label: "Kiara 150", tone: "rose", size: "h-m", categories: ["daily", "kurtis"], caption: "Kiara 150 — Daily Wear", src: "/images/collections/daily-wear/kiara-150.jpg" },
  { label: "Kiara 98", tone: "gold-t", size: "h-l", categories: ["daily", "kurtis"], caption: "Kiara 98 — Daily Wear", src: "/images/collections/daily-wear/kiara-98.jpg" },
  { label: "Navya 783", tone: "sage", size: "h-t", categories: ["daily", "kurtis"], caption: "Navya 783 — Daily Wear", src: "/images/collections/daily-wear/navya-783.jpg" },
  { label: "Navya 797", tone: "dark", size: "h-m", categories: ["daily", "kurtis"], caption: "Navya 797 — Daily Wear", src: "/images/collections/daily-wear/navya-797.jpg" },
  { label: "Navya 824", tone: "default", size: "h-l", categories: ["daily", "kurtis"], caption: "Navya 824 — Daily Wear", src: "/images/collections/daily-wear/navya-824.jpg" },
  { label: "Navya 847", tone: "rose", size: "h-t", categories: ["daily", "kurtis"], caption: "Navya 847 — Daily Wear", src: "/images/collections/daily-wear/navya-847.jpg" },
  { label: "Navya 855", tone: "gold-t", size: "h-m", categories: ["daily", "kurtis"], caption: "Navya 855 — Daily Wear", src: "/images/collections/daily-wear/navya-855.jpg" },
  { label: "Kiara 114", tone: "sage", size: "h-l", categories: ["suits", "party", "anarkali"], caption: "Kiara 114 — Premium Suit", src: "/images/collections/premium-suits/kiara-114.jpg" },
  { label: "Kiara 115", tone: "dark", size: "h-t", categories: ["suits", "party", "anarkali"], caption: "Kiara 115 — Premium Suit", src: "/images/collections/premium-suits/kiara-115.jpg" },
  { label: "Kiara 117", tone: "default", size: "h-m", categories: ["suits", "party", "anarkali"], caption: "Kiara 117 — Premium Suit", src: "/images/collections/premium-suits/kiara-117.jpg" },
  { label: "Noor 728", tone: "rose", size: "h-l", categories: ["suits", "party"], caption: "Noor 728 — Premium Suit", src: "/images/collections/premium-suits/noor-728.jpg" },
  { label: "Noor 729", tone: "gold-t", size: "h-t", categories: ["suits", "party"], caption: "Noor 729 — Premium Suit", src: "/images/collections/premium-suits/noor-729.jpg" },
  { label: "Noor 780", tone: "sage", size: "h-m", categories: ["suits", "party"], caption: "Noor 780 — Premium Suit", src: "/images/collections/premium-suits/noor-780.jpg" },
  { label: "Noor 799", tone: "dark", size: "h-l", categories: ["suits", "party"], caption: "Noor 799 — Premium Suit", src: "/images/collections/premium-suits/noor-799.jpg" },
  { label: "Noor 803", tone: "default", size: "h-t", categories: ["suits", "party"], caption: "Noor 803 — Premium Suit", src: "/images/collections/premium-suits/noor-803.jpg" },
  { label: "Taj 203", tone: "rose", size: "h-m", categories: ["suits", "party"], caption: "Taj 203 — Premium Suit", src: "/images/collections/premium-suits/taj-203.jpg" },
  { label: "Taj 209", tone: "gold-t", size: "h-l", categories: ["suits", "party"], caption: "Taj 209 — Premium Suit", src: "/images/collections/premium-suits/taj-209.jpg" },
  { label: "Taj 218", tone: "sage", size: "h-t", categories: ["suits", "party"], caption: "Taj 218 — Premium Suit", src: "/images/collections/premium-suits/taj-218.jpg" },
  { label: "Taj 222", tone: "dark", size: "h-m", categories: ["suits", "party"], caption: "Taj 222 — Premium Suit", src: "/images/collections/premium-suits/taj-222.jpg" },
];
