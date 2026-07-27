import type { OrderStep, FaqEntry } from "@/types";

export const orderSteps: OrderStep[] = [
  { title: "Submit an inquiry", body: "Share your business details through our contact form, WhatsApp or a call." },
  { title: "Our sales team contacts you", body: "A dedicated contact reaches out within one business day to understand your market and range." },
  { title: "Receive the latest catalog", body: "Current lookbooks with fabrics, size sets and wholesale pricing." },
  { title: "Choose your collections", body: "Select designs and quantities; we advise on what's moving fastest at retail." },
  { title: "Place your wholesale order", body: "Order confirmed against our wholesale policy with a proforma invoice." },
  { title: "Manufacturing & packing", body: "Your order moves through cutting, stitching, QC and retail-ready packing." },
  { title: "Dispatch", body: "Shipped via trusted logistics partners with full tracking shared." },
  { title: "Delivery", body: "Your collection arrives — pressed, tagged and ready for the floor." },
];

export const faqs: FaqEntry[] = [
  { question: "What is the minimum order quantity (MOQ)?", answer: "MOQs are set per catalog, typically as full size-set catalogs. Exact quantities are shared with the catalog and pricing — our team will guide you to the right starting order for your store size." },
  { question: "How does catalog ordering work?", answer: "Collections are sold as complete catalogs with full size sets, ensuring you receive the range as designed. Mixed selections may be possible on certain lines — ask your sales contact." },
  { question: "What is your wholesale policy?", answer: "We supply verified businesses only — retailers, boutiques, wholesalers, distributors, online sellers and exporters. Pricing is manufacturer-direct and shared privately after verification." },
  { question: "How is shipping handled?", answer: "We dispatch pan-India through reputed transport and courier partners, and support export documentation for international buyers. Freight terms are confirmed on the proforma invoice." },
  { question: "Do you provide GST invoices?", answer: "Yes. All orders are billed with proper GST invoices. Please share your GSTIN at the time of ordering; we can also guide first-time buyers on documentation." },
  { question: "What support do partners receive?", answer: "Every partner gets a dedicated sales contact, early access to new catalogs, campaign imagery for marketing, and priority dispatch on repeat orders." },
];
