/**
 * Chatbot knowledge base.
 *
 * Used as the deterministic offline fallback (when NVIDIA_API_KEY is not
 * configured) and as the grounding context injected into the system prompt
 * for the NVIDIA NIM-backed assistant (see content/chatbot-prompt.ts), so
 * the concierge's facts never drift between the two modes.
 */

export interface KbEntry {
  keywords: string[];
  answer: string;
}

export const knowledgeBase: KbEntry[] = [
  { keywords: ["order", "buy", "purchase", "start"], answer: 'Ordering is simple: submit an inquiry, our sales team contacts you within one business day, you receive the latest catalog with wholesale pricing, choose your collections, and we manufacture, pack and dispatch. See the "How to Order" page for the full journey.' },
  { keywords: ["moq", "minimum", "quantity"], answer: "MOQs are set per catalog — typically full size-set catalogs. Exact quantities are shared along with pricing once your business is verified. Our team will suggest the right starting order for your store size." },
  { keywords: ["catalog", "catalogue", "lookbook", "latest"], answer: "Our latest catalogs cover designer kurtis, co-ord sets and premium suit sets across cotton, rayon, crepe and Chanderi. Submit an inquiry on the Contact page and we'll share the current lookbook with wholesale pricing." },
  { keywords: ["price", "pricing", "rate", "wholesale", "cost", "margin"], answer: "We offer manufacturer-direct wholesale pricing with healthy retail margins. Price lists are shared privately with verified businesses along with the catalog — request one via the Contact page." },
  { keywords: ["ship", "delivery", "dispatch", "transport", "export"], answer: "We dispatch pan-India through trusted transport and courier partners, with tracking shared on every order. Export documentation is supported for international buyers." },
  { keywords: ["hour", "time", "open", "timing", "business hours"], answer: "Our sales team is available Monday to Saturday, 10:00 AM – 7:00 PM IST. Inquiries submitted anytime receive a response within one business day." },
  { keywords: ["visit", "factory", "tour", "see"], answer: "Yes — factory visits in Ahmedabad are welcome by appointment for serious wholesale buyers. Mention it in your inquiry and we'll arrange a convenient time." },
  { keywords: ["gst", "invoice", "tax", "bill"], answer: "All orders are billed with proper GST invoices. Please keep your GSTIN handy when ordering; we can guide first-time buyers on documentation." },
  { keywords: ["fabric", "cotton", "rayon", "crepe", "chanderi", "material", "quality"], answer: "We work in premium cotton, rayon, crepe and Chanderi. Every fabric lot is tested for shrinkage, colorfastness and hand-feel, and every garment passes a three-stage quality check." },
  { keywords: ["contact", "phone", "whatsapp", "email", "address", "where"], answer: "You can reach us via the inquiry form on the Contact page, WhatsApp, or a direct call. We're based in Ahmedabad, Gujarat — India's textile heartland." },
  { keywords: ["retail", "consumer", "single piece", "one piece"], answer: "M4U is a wholesale manufacturer — we supply businesses only (retailers, boutiques, wholesalers, distributors, online sellers and exporters), not individual retail customers." },
];

/**
 * Keywords that signal the visitor wants a human, not the assistant.
 * Used both by the offline fallback matcher (app/api/chat/route.ts) and
 * indirectly mirrored in the AI system prompt's handoff protocol, so the
 * behaviour is consistent whether or not NVIDIA_API_KEY is configured.
 */
export const handoffKeywords = [
  "human",
  "agent",
  "representative",
  "real person",
  "real human",
  "talk to someone",
  "speak to someone",
  "speak with someone",
  "talk to a person",
  "manager",
  "executive",
  "sales team",
  "call me",
  "call back",
  "whatsapp me",
  "connect me",
];

export const chatSuggestions = [
  "How do I order?",
  "MOQ?",
  "Latest catalog?",
  "Wholesale pricing?",
  "Shipping?",
  "Business hours?",
  "Factory visit?",
  "Talk to a human",
];

export const chatGreeting =
  "Namaste — welcome to M4U. I'm your wholesale concierge. Ask me about ordering, MOQs, catalogs or shipping.";

export const chatFallback =
  "I'd love to help with that. I can answer about ordering, MOQ, catalogs, wholesale pricing, shipping, GST, business hours and factory visits — or reach our team directly via the Contact page.";
