import type {
  Stat,
  FactoryMediaItem,
  CollectionCard,
  CampaignMediaItem,
  WhyCard,
} from "@/types";

export const homeStats: Stat[] = [
  { value: 10000, suffix: "+", label: "Sq. ft. manufacturing" },
  { value: 250, suffix: "K+", label: "Garments dispatched" },
  { value: 100, suffix: "%", label: "In-house quality checked" },
  { value: 4, label: "Signature fabric houses" },
];

/**
 * Factory gallery — art-directed toward hands, detail and craft (not machines),
 * per the Phase-1 review. Grid-area classes (a–f) preserve the bento layout.
 */
export const factoryMedia: FactoryMediaItem[] = [
  { area: "a", tone: "dark", label: "Hands at the Cutting Table", tag: "Close-up — Hands, Cutting", caption: "Cut by Hand", src: "/images/company/karigar-cutting-detail.jpg" },
  { area: "b", tone: "default", label: "Embroidery in Progress", tag: "Detail — Needle & Thread", caption: "Embroidery", src: "/images/company/needle-thread-detail.jpg" },
  { area: "c", tone: "rose", label: "Fabric Drawn Through the Machine", tag: "Detail — Fabric in Hand", caption: "The Stitch", src: "/images/company/fabric-in-hand-detail.jpg" },
  { area: "d", tone: "sage", label: "Inspecting the Seam", tag: "Detail — Inspection", caption: "Checked by Eye", src: "/images/company/quality-check.jpg" },
  { area: "e", tone: "gold-t", label: "Pressing the Finished Piece", tag: "Detail — Finishing Touch", caption: "Finishing", src: "/images/company/finishing-touch-detail.jpg" },
  { area: "f", tone: "default", label: "Folding & Wrapping", tag: "Detail — Wrapped by Hand", caption: "Ready to Ship", src: "/images/company/packaging-detail.jpg" },
];

/**
 * Home collection cards. "Rayon Collection" and "Chanderi & Crepe" were
 * removed (no matching photos ever existed for them) and replaced with
 * "Daily Wear Prints" and "Fancy Anarkali" — all 6 cards now have a real
 * photo.
 */
export const homeCollections: CollectionCard[] = [
  { title: "Designer Kurtis", filter: "kurtis", tone: "rose", src: "/images/collections/daily-wear/kiara-135.jpg", alt: "Designer kurti, daily wear" },
  { title: "Premium Suit Sets", filter: "suits", tone: "gold-t", src: "/images/collections/premium-suits/noor-799.jpg", alt: "Premium embroidered suit set" },
  { title: "Co-ord Sets", filter: "coord", tone: "sage", src: "/images/collections/cord-set/cord-set-02.jpg", alt: "Co-ord set" },
  { title: "Cotton Collection", filter: "cotton", tone: "default", src: "/images/collections/cotton/saheli-934.jpg", alt: "Cotton kurti set" },
  { title: "Daily Wear Prints", filter: "prints", tone: "rose", src: "/images/collections/cotton/satrangi-323.jpg", alt: "Printed cotton daily-wear kurti" },
  { title: "Fancy Anarkali", filter: "anarkali", tone: "gold-t", src: "/images/collections/premium-suits/kiara-114.jpg", alt: "Fancy embroidered anarkali suit" },
];

export const campaignMedia: CampaignMediaItem[] = [
  { span: "w5", tone: "rose", label: "Campaign — Look 01", tag: "Editorial 01", src: "/images/collections/premium-suits/noor-780.jpg" },
  { span: "w7", tone: "dark", off: true, label: "Campaign — Look 02", tag: "Editorial 02", src: "/images/collections/cord-set/cord-set-01.jpg" },
  { span: "w7", tone: "gold-t", label: "Campaign — Look 03", tag: "Editorial 03", src: "/images/collections/daily-wear/kiara-101.jpg" },
  { span: "w5", tone: "sage", off: true, label: "Campaign — Look 04", tag: "Editorial 04", src: "/images/collections/cotton/satrangi-327.jpg" },
];

export const whyCards: WhyCard[] = [
  { index: "i.", title: "In-House Manufacturing", body: "Design to dispatch under one roof in Ahmedabad — full control at every stage, quality never outsourced." },
  { index: "ii.", title: "Latest Trends", body: "Fresh catalogs each season, designed around what sells at retail — stay ahead without the guesswork." },
  { index: "iii.", title: "Made Your Way", body: "As a wholesaler, bring us your design and we bring it to life. With an MOQ of 80–120 pieces, you get your exact vision — fabric, cut and finish — crafted exclusively for your label." },
  { index: "iv.", title: "Premium Fabrics", body: "Cotton, rayon, crepe and Chanderi — sourced, tested and approved before a single metre is cut." },
  { index: "v.", title: "Strict Quality Control", body: "Every garment inspected by hand at cutting, stitching and finishing stages." },
  { index: "vi.", title: "Wholesale Pricing", body: "Manufacturer-direct rates with margins built for your business." },
  { index: "vii.", title: "Fast Dispatch", body: "Streamlined packing lines keep your shelves stocked in season, not after it." },
];
