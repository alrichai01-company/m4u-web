import type { TimelineEntry, ProcessStep } from "@/types";

export const aboutIntro = {
  eyebrow: "Our Story",
  heading:
    "Makhija Trendz began with a simple conviction: Indian ethnic wear deserves manufacturing as refined as its design.",
  body: "M4U is the result — a premium production house in Ahmedabad, rooted in one of India's great textile cities, where fabric selection, design, embroidery, stitching and quality control live under one roof, run to a standard our retail partners can build a business on.",
} as const;

export const timeline: TimelineEntry[] = [
  {
    period: "The Beginning",
    title: "A workshop with a point of view",
    body: "M4U starts as a focused kurti unit, supplying a handful of Ahmedabad boutiques who kept coming back.",
  },
  {
    period: "Expansion",
    title: "10,000+ sq. ft. of manufacturing",
    body: "Demand from wholesalers takes the house into a full-scale facility — dedicated cutting, stitching and finishing floors.",
  },
  {
    period: "The Collections Era",
    title: "From garments to catalogs",
    body: "Seasonal, retail-ready collections across kurtis, co-ords and suit sets — designed to sell through, not just sell in.",
  },
  {
    period: "Today",
    title: "Partners across India & beyond",
    body: "Boutiques, distributors, online sellers and export buyers rely on M4U for consistency at scale.",
  },
];

/** Process cards lead with the human act, not the station. */
export const process: ProcessStep[] = [
  { title: "Fabric Selection", tag: "Fabric Sourcing", tone: "default", body: "Mills are audited, swatches tested for shrinkage, colorfastness and hand-feel before approval.", src: "/images/company/fabric-sourcing.jpg" },
  { title: "Design Philosophy", tag: "Design Studio", tone: "rose", body: "Trend research meets retail data — every silhouette is designed to move off the rack.", src: "/images/company/design-room.jpg" },
  { title: "Precision Cutting", tag: "Cutting by Hand", tone: "dark", body: "Layered cutting with strict lay planning for consistent sizing across the full run.", src: "/images/company/fabric-cutting.jpg" },
  { title: "Embroidery & Detail", tag: "Embroidery", tone: "gold-t", body: "In-house embellishment keeps detail work aligned to the original design intent.", src: "/images/company/embroidery.jpg" },
  { title: "Stitching", tag: "Hands on the Machine", tone: "sage", body: "Skilled operators on modern machines, with inline checks at every station.", src: "/images/company/stitching-line.jpg" },
  { title: "Quality Control", tag: "Quality Control", tone: "default", body: "Three-stage inspection — cutting, stitching, finishing — before a piece is packed.", src: "/images/company/quality-check.jpg" },
  { title: "Finishing & Packing", tag: "Packing", tone: "rose", body: "Pressed, tagged and packed to arrive at your store retail-ready.", src: "/images/company/packaging.jpg" },
];
