/**
 * All visible site copy in English and Hindi.
 * Add a key here → reference it everywhere via useLang().t.key
 */

export interface Translations {
  // ── Navigation ──────────────────────────────────────────────────────────
  navHome: string;
  navManufacturing: string;
  navCollections: string;
  navHowToOrder: string;
  navContact: string;
  navBecomePartner: string;

  // ── Hero ─────────────────────────────────────────────────────────────────
  heroTagline: string;
  heroCta1: string;
  heroCta2: string;
  heroScroll: string;

  // ── Standard (M4U Standard) ───────────────────────────────────────────────
  standardEyebrow: string;
  standardLine1: string;
  standardLine2: string;

  // ── Stats ──────────────────────────────────────────────────────────────
  statSqFt: string;
  statGarments: string;
  statQuality: string;
  statFabricHouses: string;

  // ── Collection Grid ────────────────────────────────────────────────────
  collectionsEyebrow: string;
  collectionsHeading1: string;
  collectionsHeading2: string;
  collectionsViewBtn: string;
  collectionsExploreBtn: string;

  // ── Factory Gallery ────────────────────────────────────────────────────
  factoryEyebrow: string;
  factoryHeading1: string;
  factoryHeading2: string;

  // ── Campaign Gallery ───────────────────────────────────────────────────
  campaignEyebrow: string;
  campaignHeading1: string;
  campaignHeading2: string;

  // ── Why Grid ──────────────────────────────────────────────────────────
  whyEyebrow: string;
  whyHeading1: string;
  whyHeading2: string;

  // ── Why Cards ─────────────────────────────────────────────────────────
  why1Title: string;
  why1Body: string;
  why2Title: string;
  why2Body: string;
  why3Title: string;
  why3Body: string;
  why4Title: string;
  why4Body: string;
  why5Title: string;
  why5Body: string;
  why6Title: string;
  why6Body: string;
  why7Title: string;
  why7Body: string;

  // ── CTA Band (home) ────────────────────────────────────────────────────
  homeCtaEyebrow: string;
  homeCtaHeading1: string;
  homeCtaHeading2: string;
  homeCtaBody: string;
  homeCtaBtn: string;

  // ── About page ─────────────────────────────────────────────────────────
  aboutPageEyebrow: string;
  aboutPageHeading1: string;
  aboutPageHeading2: string;

  aboutStoryEyebrow: string;
  aboutStoryHeading: string;
  aboutStoryBody: string;

  aboutTimelineEyebrow: string;
  aboutTimelineHeading1: string;
  aboutTimelineHeading2: string;

  // Timeline entries
  timeline1Period: string;
  timeline1Title: string;
  timeline1Body: string;
  timeline2Period: string;
  timeline2Title: string;
  timeline2Body: string;
  timeline3Period: string;
  timeline3Title: string;
  timeline3Body: string;
  timeline4Period: string;
  timeline4Title: string;
  timeline4Body: string;

  aboutProcessEyebrow: string;
  aboutProcessHeading1: string;
  aboutProcessHeading2: string;

  // Process steps
  process1Title: string;
  process1Tag: string;
  process1Body: string;
  process2Title: string;
  process2Tag: string;
  process2Body: string;
  process3Title: string;
  process3Tag: string;
  process3Body: string;
  process4Title: string;
  process4Tag: string;
  process4Body: string;
  process5Title: string;
  process5Tag: string;
  process5Body: string;
  process6Title: string;
  process6Tag: string;
  process6Body: string;
  process7Title: string;
  process7Tag: string;
  process7Body: string;

  aboutCtaHeading1: string;
  aboutCtaHeading2: string;
  aboutCtaBody: string;
  aboutCtaBtn: string;

  // ── Collections page ───────────────────────────────────────────────────
  collectionsPageEyebrow: string;
  collectionsPageHeading1: string;
  collectionsPageHeading2: string;
  collectionsPageLead: string;
  collectionsFilterAll: string;
  collectionsCtaHeading1: string;
  collectionsCtaHeading2: string;
  collectionsCtaBody: string;
  collectionsCtaBtn: string;

  // ── How to Order page ──────────────────────────────────────────────────
  orderPageEyebrow: string;
  orderPageHeading1: string;
  orderPageHeading2: string;
  orderPageLead: string;

  // Order steps
  order1Title: string;
  order1Body: string;
  order2Title: string;
  order2Body: string;
  order3Title: string;
  order3Body: string;
  order4Title: string;
  order4Body: string;
  order5Title: string;
  order5Body: string;
  order6Title: string;
  order6Body: string;
  order7Title: string;
  order7Body: string;
  order8Title: string;
  order8Body: string;

  // FAQ
  faqEyebrow: string;
  faqHeading1: string;
  faqHeading2: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;
  faq4Q: string;
  faq4A: string;
  faq5Q: string;
  faq5A: string;
  faq6Q: string;
  faq6A: string;

  // Partner section
  partnerEyebrow: string;
  partnerHeading1: string;
  partnerHeading2: string;
  partner1Title: string;
  partner1Body: string;
  partner2Title: string;
  partner2Body: string;
  partner3Title: string;
  partner3Body: string;
  partner4Title: string;
  partner4Body: string;

  orderCtaHeading1: string;
  orderCtaHeading2: string;
  orderCtaBody: string;
  orderCtaBtn: string;

  // ── Contact page ───────────────────────────────────────────────────────
  contactPageEyebrow: string;
  contactPageHeading1: string;
  contactPageHeading2: string;
  contactFormHeading: string;
  contactVisitEyebrow: string;
  contactWhatsApp: string;
  contactCallUs: string;
  contactInstagram: string;

  // Contact form labels
  formBusinessDetails: string;
  formBusinessPlaceholder: string;
  formGstNumber: string;
  formGstPlaceholder: string;
  formGstFetch: string;
  formGstFetching: string;
  formGstSuccess: string;
  formAadhaarPan: string;
  formAadhaarPanPlaceholder: string;
  formAddress: string;
  formAddressPlaceholder: string;
  formCity: string;
  formCityPlaceholder: string;
  formState: string;
  formStatePlaceholder: string;
  formPin: string;
  formPinPlaceholder: string;
  formContactPerson: string;
  formContactPersonPlaceholder: string;
  formMobile1: string;
  formMobile2: string;
  formEmail: string;
  formEmailPlaceholder: string;
  formAgencyName: string;
  formAgencyNamePlaceholder: string;
  formAgencyContact: string;
  formAgencyContactPlaceholder: string;
  formAgencyNumber: string;
  formMessage: string;
  formMessagePlaceholder: string;
  formAgree: string;
  formTerms: string;
  formPrivacy: string;
  formTrustLine: string;
  formSendBtn: string;
  formSendingBtn: string;
  formSuccessNote: string;

  // ── Footer ────────────────────────────────────────────────────────────
  footerTagline: string;
  footerExplore: string;
  footerConnect: string;
  footerRights: string;
  footerCrafted: string;
}

export const en: Translations = {
  // Navigation
  navHome: "Home",
  navManufacturing: "Manufacturing",
  navCollections: "Collections",
  navHowToOrder: "How to Order",
  navContact: "Contact",
  navBecomePartner: "Become a Partner",

  // Hero
  heroTagline: "Luxury women's ethnic manufacturing — designed for India's finest retailers.",
  heroCta1: "Become a Wholesale Partner",
  heroCta2: "Explore Collections",
  heroScroll: "Scroll",

  // Standard
  standardEyebrow: "The M4U Standard",
  standardLine1: "We don't manufacture garments.",
  standardLine2: "We create collections that sell.",

  // Stats
  statSqFt: "Sq. ft. manufacturing",
  statGarments: "Garments dispatched every month",
  statQuality: "In-house quality checked",
  statFabricHouses: "Signature fabric houses",

  // Collection Grid
  collectionsEyebrow: "Product Collections",
  collectionsHeading1: "Curated for the",
  collectionsHeading2: "discerning rack.",
  collectionsViewBtn: "View Collection →",
  collectionsExploreBtn: "Explore our Collection",

  // Factory Gallery
  factoryEyebrow: "Factory Experience",
  factoryHeading1: "Where every stitch",
  factoryHeading2: "is a decision.",

  // Campaign Gallery
  campaignEyebrow: "Model Campaign",
  campaignHeading1: "Every garment,",
  campaignHeading2: "photographed like couture.",

  // Why Grid
  whyEyebrow: "Why M4U Is the Best",
  whyHeading1: "Built on trust,",
  whyHeading2: "measured in repeat orders.",

  // Why Cards
  why1Title: "In-House Manufacturing",
  why1Body: "Design to dispatch under one roof in Ahmedabad — full control at every stage, quality never outsourced.",
  why2Title: "Latest Trends",
  why2Body: "Fresh catalogs each season, designed around what sells at retail — stay ahead without the guesswork.",
  why3Title: "Made Your Way",
  why3Body: "As a wholesaler, bring us your design and we bring it to life. With an MOQ of 80–120 pieces, you get your exact vision — fabric, cut and finish — crafted exclusively for your label.",
  why4Title: "Premium Fabrics",
  why4Body: "Cotton, rayon, crepe and Chanderi — sourced, tested and approved before a single metre is cut.",
  why5Title: "Strict Quality Control",
  why5Body: "Every garment inspected by hand at cutting, stitching and finishing stages.",
  why6Title: "Wholesale Pricing",
  why6Body: "Manufacturer-direct rates with margins built for your business.",
  why7Title: "Fast Dispatch",
  why7Body: "Streamlined packing lines keep your shelves stocked in season, not after it.",

  // CTA Band (home)
  homeCtaEyebrow: "Partnership",
  homeCtaHeading1: "Become our",
  homeCtaHeading2: "wholesale partner.",
  homeCtaBody: "Receive our latest catalog, wholesale price list and a dedicated sales contact within one business day.",
  homeCtaBtn: "Request Catalog",

  // About page
  aboutPageEyebrow: "About · Manufacturing",
  aboutPageHeading1: "The house",
  aboutPageHeading2: "behind the label.",
  aboutStoryEyebrow: "Our Story",
  aboutStoryHeading: "Makhija Trendz began with a simple conviction: Indian ethnic wear deserves manufacturing as refined as its design.",
  aboutStoryBody: "M4U is the result — a premium production house in Ahmedabad, rooted in one of India's great textile cities, where fabric selection, design, embroidery, stitching and quality control live under one roof, run to a standard our retail partners can build a business on.",
  aboutTimelineEyebrow: "The Journey",
  aboutTimelineHeading1: "Growth,",
  aboutTimelineHeading2: "stitched in stages.",

  timeline1Period: "The Beginning",
  timeline1Title: "A workshop with a point of view",
  timeline1Body: "M4U starts as a focused kurti unit, supplying a handful of Ahmedabad boutiques who kept coming back.",
  timeline2Period: "Expansion",
  timeline2Title: "10,000+ sq. ft. of manufacturing",
  timeline2Body: "Demand from wholesalers takes the house into a full-scale facility — dedicated cutting, stitching and finishing floors.",
  timeline3Period: "The Collections Era",
  timeline3Title: "From garments to catalogs",
  timeline3Body: "Seasonal, retail-ready collections across kurtis, co-ords and suit sets — designed to sell through, not just sell in.",
  timeline4Period: "Today",
  timeline4Title: "Partners across India & beyond",
  timeline4Body: "Boutiques, distributors, online sellers and export buyers rely on M4U for consistency at scale.",

  aboutProcessEyebrow: "The Process",
  aboutProcessHeading1: "Eight hands touch",
  aboutProcessHeading2: "every garment.",

  process1Title: "Fabric Selection",
  process1Tag: "Fabric Sourcing",
  process1Body: "Mills are audited, swatches tested for shrinkage, colorfastness and hand-feel before approval.",
  process2Title: "Design Philosophy",
  process2Tag: "Design Studio",
  process2Body: "Trend research meets retail data — every silhouette is designed to move off the rack.",
  process3Title: "Precision Cutting",
  process3Tag: "Cutting by Hand",
  process3Body: "Layered cutting with strict lay planning for consistent sizing across the full run.",
  process4Title: "Embroidery & Detail",
  process4Tag: "Embroidery",
  process4Body: "In-house embellishment keeps detail work aligned to the original design intent.",
  process5Title: "Stitching",
  process5Tag: "Hands on the Machine",
  process5Body: "Skilled operators on modern machines, with inline checks at every station.",
  process6Title: "Quality Control",
  process6Tag: "Quality Control",
  process6Body: "Three-stage inspection — cutting, stitching, finishing — before a piece is packed.",
  process7Title: "Finishing & Packing",
  process7Tag: "Packing",
  process7Body: "Pressed, tagged and packed to arrive at your store retail-ready.",

  aboutCtaHeading1: "See it",
  aboutCtaHeading2: "for yourself.",
  aboutCtaBody: "Factory visits are welcome by appointment for serious wholesale buyers.",
  aboutCtaBtn: "Plan a Factory Visit",

  // Collections page
  collectionsPageEyebrow: "Collections",
  collectionsPageHeading1: "The",
  collectionsPageHeading2: "portfolio.",
  collectionsPageLead: "A living archive of our catalogs. Filter by silhouette or fabric — every piece is available at wholesale.",
  collectionsFilterAll: "All",
  collectionsCtaHeading1: "The full catalog runs far deeper.",
  collectionsCtaHeading2: "Request it.",
  collectionsCtaBody: "Complete lookbooks with wholesale pricing are shared directly with verified business buyers.",
  collectionsCtaBtn: "Request Latest Catalog",

  // How to Order page
  orderPageEyebrow: "How to Order",
  orderPageHeading1: "From inquiry",
  orderPageHeading2: "to your shelf.",
  orderPageLead: "A simple, transparent wholesale process — most partners receive their first catalog within a day.",

  order1Title: "Submit an inquiry",
  order1Body: "Share your business details through our contact form, WhatsApp or a call.",
  order2Title: "Our sales team contacts you",
  order2Body: "A dedicated contact reaches out within one business day to understand your market and range.",
  order3Title: "Receive the latest catalog",
  order3Body: "Current lookbooks with fabrics, size sets and wholesale pricing.",
  order4Title: "Choose your collections",
  order4Body: "Select designs and quantities; we advise on what's moving fastest at retail.",
  order5Title: "Place your wholesale order",
  order5Body: "Order confirmed against our wholesale policy with a proforma invoice.",
  order6Title: "Manufacturing & packing",
  order6Body: "Your order moves through cutting, stitching, QC and retail-ready packing.",
  order7Title: "Dispatch",
  order7Body: "Shipped via trusted logistics partners with full tracking shared.",
  order8Title: "Delivery",
  order8Body: "Your collection arrives — pressed, tagged and ready for the floor.",

  faqEyebrow: "Questions, Answered",
  faqHeading1: "Frequently",
  faqHeading2: "asked.",
  faq1Q: "What is the minimum order quantity (MOQ)?",
  faq1A: "MOQs are set per catalog, typically as full size-set catalogs. Exact quantities are shared with the catalog and pricing — our team will guide you to the right starting order for your store size.",
  faq2Q: "How does catalog ordering work?",
  faq2A: "Collections are sold as complete catalogs with full size sets, ensuring you receive the range as designed. Mixed selections may be possible on certain lines — ask your sales contact.",
  faq3Q: "What is your wholesale policy?",
  faq3A: "We supply verified businesses only — retailers, boutiques, wholesalers, distributors, online sellers and exporters. Pricing is manufacturer-direct and shared privately after verification.",
  faq4Q: "How is shipping handled?",
  faq4A: "We dispatch pan-India through reputed transport and courier partners, and support export documentation for international buyers. Freight terms are confirmed on the proforma invoice.",
  faq5Q: "Do you provide GST invoices?",
  faq5A: "Yes. All orders are billed with proper GST invoices. Please share your GSTIN at the time of ordering; we can also guide first-time buyers on documentation.",
  faq6Q: "What support do partners receive?",
  faq6A: "Every partner gets a dedicated sales contact, early access to new catalogs, campaign imagery for marketing, and priority dispatch on repeat orders.",

  partnerEyebrow: "Become a Partner",
  partnerHeading1: "More than a supplier —",
  partnerHeading2: "a growth partner.",
  partner1Title: "Dedicated Sales Contact",
  partner1Body: "A single point of contact who knows your market, your store and your reorder cycle.",
  partner2Title: "Early Catalog Access",
  partner2Body: "Get the new season lookbook and pricing before it's open to the general trade.",
  partner3Title: "Campaign Imagery",
  partner3Body: "High-resolution editorial photos from every collection — ready for your social and storefront.",
  partner4Title: "Priority Dispatch",
  partner4Body: "Repeat partners move to the front of the packing queue — your shelves are never bare.",

  orderCtaHeading1: "Ready to",
  orderCtaHeading2: "begin?",
  orderCtaBody: "Start with a simple inquiry — the catalog does the convincing.",
  orderCtaBtn: "Become a Partner",

  // Contact page
  contactPageEyebrow: "Contact",
  contactPageHeading1: "Let's build",
  contactPageHeading2: "your next season.",
  contactFormHeading: "Wholesale inquiry",
  contactVisitEyebrow: "Visit Us",
  contactWhatsApp: "WhatsApp",
  contactCallUs: "Call Us",
  contactInstagram: "Instagram",

  // Contact form
  formBusinessDetails: "Business Details",
  formBusinessPlaceholder: "Select your business category…",
  formGstNumber: "GST Number",
  formGstPlaceholder: "15-character GSTIN",
  formGstFetch: "Fetch Details",
  formGstFetching: "Fetching…",
  formGstSuccess: "Details fetched. We've filled in what we could — please review and complete the rest.",
  formAadhaarPan: "Aadhaar / PAN Number",
  formAadhaarPanPlaceholder: "Aadhaar or PAN",
  formAddress: "Address",
  formAddressPlaceholder: "Street address",
  formCity: "City",
  formCityPlaceholder: "City",
  formState: "State",
  formStatePlaceholder: "State",
  formPin: "PIN Code",
  formPinPlaceholder: "6-digit PIN",
  formContactPerson: "Contact Person Name",
  formContactPersonPlaceholder: "Full name",
  formMobile1: "Mobile Number 1",
  formMobile2: "Mobile Number 2 (optional)",
  formEmail: "Email Address",
  formEmailPlaceholder: "you@business.com",
  formAgencyName: "Agency / Adat Name",
  formAgencyNamePlaceholder: "Agency or adat name",
  formAgencyContact: "Agency / Adat Contact Person",
  formAgencyContactPlaceholder: "Contact person name",
  formAgencyNumber: "Agency / Adat Contact Number",
  formMessage: "Message (optional)",
  formMessagePlaceholder: "Tell us about your business and the collections you're interested in.",
  formAgree: "I agree to the",
  formTerms: "Terms & Conditions",
  formPrivacy: "Privacy Policy",
  formTrustLine: "Verified businesses only · Response within one business day · No spam, ever.",
  formSendBtn: "Send Inquiry",
  formSendingBtn: "Sending…",
  formSuccessNote: "Thank you — your inquiry is noted. Our sales team will contact you within one business day.",

  // Footer
  footerTagline: "Premium women's ethnic wear manufacturing. Made in Ahmedabad, for India's finest retailers.",
  footerExplore: "Explore",
  footerConnect: "Connect",
  footerRights: "All rights reserved.",
  footerCrafted: "Crafted in Ahmedabad",
};

export const hi: Translations = {
  // Navigation
  navHome: "होम",
  navManufacturing: "निर्माण",
  navCollections: "कलेक्शन",
  navHowToOrder: "ऑर्डर कैसे करें",
  navContact: "संपर्क",
  navBecomePartner: "पार्टनर बनें",

  // Hero
  heroTagline: "भारत की सर्वश्रेष्ठ रिटेलर्स के लिए — लक्जरी महिला एथनिक वियर निर्माण।",
  heroCta1: "बल्क पार्टनर बनें",
  heroCta2: "कलेक्शन देखें",
  heroScroll: "स्क्रॉल करें",

  // Standard
  standardEyebrow: "M4U का मानक",
  standardLine1: "हम केवल कपड़े नहीं बनाते।",
  standardLine2: "हम बिकने वाले कलेक्शन बनाते हैं।",

  // Stats
  statSqFt: "वर्ग फुट निर्माण",
  statGarments: "हर महीने परिधान भेजे गए",
  statQuality: "इन-हाउस क्वालिटी जाँच",
  statFabricHouses: "प्रीमियम फैब्रिक हाउस",

  // Collection Grid
  collectionsEyebrow: "उत्पाद कलेक्शन",
  collectionsHeading1: "विशेष रैक के लिए",
  collectionsHeading2: "चुना गया।",
  collectionsViewBtn: "कलेक्शन देखें →",
  collectionsExploreBtn: "हमारा कलेक्शन देखें",

  // Factory Gallery
  factoryEyebrow: "फैक्ट्री अनुभव",
  factoryHeading1: "जहाँ हर सिलाई",
  factoryHeading2: "एक निर्णय है।",

  // Campaign Gallery
  campaignEyebrow: "मॉडल कैम्पेन",
  campaignHeading1: "हर परिधान,",
  campaignHeading2: "हाई-फ़ैशन की तरह शूट किया गया।",

  // Why Grid
  whyEyebrow: "M4U क्यों सर्वश्रेष्ठ है",
  whyHeading1: "विश्वास पर बना,",
  whyHeading2: "दोबारा ऑर्डर में मापा गया।",

  // Why Cards
  why1Title: "इन-हाउस निर्माण",
  why1Body: "अहमदाबाद में एक ही छत के नीचे डिज़ाइन से डिस्पैच — हर चरण पर पूरा नियंत्रण, क्वालिटी कभी आउटसोर्स नहीं।",
  why2Title: "नवीनतम ट्रेंड",
  why2Body: "हर सीज़न ताज़ा कैटलॉग, रिटेल में बिकने वाले डिज़ाइन के आधार पर — बिना अनुमान लगाए आगे रहें।",
  why3Title: "आपकी मर्ज़ी से बना",
  why3Body: "बल्क विक्रेता के रूप में अपना डिज़ाइन लाएँ और हम उसे साकार करेंगे। 80–120 पीस के MOQ के साथ — फैब्रिक, कट और फिनिश — आपके लेबल के लिए विशेष रूप से बनाया गया।",
  why4Title: "प्रीमियम कपड़े",
  why4Body: "कॉटन, रेयान, क्रेप और चंदेरी — एक मीटर काटने से पहले सोर्स, टेस्ट और अनुमोदित।",
  why5Title: "कड़ी क्वालिटी जाँच",
  why5Body: "कटिंग, सिलाई और फिनिशिंग चरणों में हर परिधान की हाथ से जाँच।",
  why6Title: "बल्क मूल्य",
  why6Body: "निर्माता-प्रत्यक्ष दरें आपके व्यवसाय के लिए बने मार्जिन के साथ।",
  why7Title: "तेज़ डिस्पैच",
  why7Body: "सुव्यवस्थित पैकिंग लाइनें आपकी शेल्फ को सीज़न में भरी रखती हैं, बाद में नहीं।",

  // CTA Band (home)
  homeCtaEyebrow: "पार्टनरशिप",
  homeCtaHeading1: "हमारे",
  homeCtaHeading2: "बल्क पार्टनर बनें।",
  homeCtaBody: "एक कार्य दिवस के भीतर हमारा नवीनतम कैटलॉग, बल्क मूल्य सूची और समर्पित बिक्री संपर्क प्राप्त करें।",
  homeCtaBtn: "कैटलॉग मँगाएँ",

  // About page
  aboutPageEyebrow: "हमारे बारे में · निर्माण",
  aboutPageHeading1: "लेबल के पीछे",
  aboutPageHeading2: "का घर।",
  aboutStoryEyebrow: "हमारी कहानी",
  aboutStoryHeading: "मखीजा ट्रेंडज़ की शुरुआत एक सरल विश्वास से हुई: भारतीय एथनिक वियर उतना ही परिष्कृत निर्माण चाहता है जितना उसका डिज़ाइन।",
  aboutStoryBody: "M4U उसी का परिणाम है — अहमदाबाद में एक प्रीमियम प्रोडक्शन हाउस, भारत के महान वस्त्र शहरों में से एक में, जहाँ फैब्रिक चयन, डिज़ाइन, कढ़ाई, सिलाई और क्वालिटी कंट्रोल एक ही छत के नीचे हैं।",
  aboutTimelineEyebrow: "यात्रा",
  aboutTimelineHeading1: "विकास,",
  aboutTimelineHeading2: "चरणों में बुना गया।",

  timeline1Period: "शुरुआत",
  timeline1Title: "एक नज़रिए वाली वर्कशॉप",
  timeline1Body: "M4U एक केंद्रित कुर्ती यूनिट के रूप में शुरू हुआ, जो मुट्ठी भर अहमदाबाद बुटीक को सप्लाई करता था।",
  timeline2Period: "विस्तार",
  timeline2Title: "10,000+ वर्ग फुट का निर्माण",
  timeline2Body: "बल्क विक्रेताओं की माँग ने हाउस को पूर्ण-पैमाने की सुविधा में ले गई — समर्पित कटिंग, सिलाई और फिनिशिंग फ्लोर।",
  timeline3Period: "कलेक्शन का युग",
  timeline3Title: "परिधान से कैटलॉग तक",
  timeline3Body: "कुर्तियों, को-ऑर्ड्स और सूट सेट में मौसमी, रिटेल-तैयार कलेक्शन — बेचने के लिए डिज़ाइन किए गए।",
  timeline4Period: "आज",
  timeline4Title: "भारत और उससे परे पार्टनर",
  timeline4Body: "बुटीक, डिस्ट्रीब्यूटर, ऑनलाइन विक्रेता और निर्यात खरीदार स्केल पर स्थिरता के लिए M4U पर निर्भर हैं।",

  aboutProcessEyebrow: "प्रक्रिया",
  aboutProcessHeading1: "आठ हाथ छूते हैं",
  aboutProcessHeading2: "हर परिधान को।",

  process1Title: "फैब्रिक चयन",
  process1Tag: "फैब्रिक सोर्सिंग",
  process1Body: "अनुमोदन से पहले मिलों का ऑडिट, सिकुड़न, रंग की स्थायित्व और हाथ-अनुभव के लिए स्वैच परीक्षण।",
  process2Title: "डिज़ाइन दर्शन",
  process2Tag: "डिज़ाइन स्टूडियो",
  process2Body: "ट्रेंड रिसर्च रिटेल डेटा से मिलती है — हर सिल्हूट रैक से बिकने के लिए डिज़ाइन किया जाता है।",
  process3Title: "सटीक कटिंग",
  process3Tag: "हाथ से कटिंग",
  process3Body: "पूरी रन में एकसमान साइज़िंग के लिए सख्त ले-प्लानिंग के साथ लेयर्ड कटिंग।",
  process4Title: "कढ़ाई और विवरण",
  process4Tag: "कढ़ाई",
  process4Body: "इन-हाउस एम्बेलिशमेंट विवरण कार्य को मूल डिज़ाइन इरादे के अनुरूप रखता है।",
  process5Title: "सिलाई",
  process5Tag: "मशीन पर हाथ",
  process5Body: "आधुनिक मशीनों पर कुशल ऑपरेटर, हर स्टेशन पर इनलाइन जाँच के साथ।",
  process6Title: "क्वालिटी नियंत्रण",
  process6Tag: "क्वालिटी नियंत्रण",
  process6Body: "तीन-चरण निरीक्षण — कटिंग, सिलाई, फिनिशिंग — पैक होने से पहले।",
  process7Title: "फिनिशिंग और पैकिंग",
  process7Tag: "पैकिंग",
  process7Body: "प्रेस किया, टैग किया और पैक किया — आपके स्टोर में रिटेल-रेडी पहुँचने के लिए।",

  aboutCtaHeading1: "इसे खुद",
  aboutCtaHeading2: "देखें।",
  aboutCtaBody: "गंभीर बल्क खरीदारों के लिए अपॉइंटमेंट पर फैक्ट्री विज़िट का स्वागत है।",
  aboutCtaBtn: "फैक्ट्री विज़िट की योजना बनाएँ",

  // Collections page
  collectionsPageEyebrow: "कलेक्शन",
  collectionsPageHeading1: "",
  collectionsPageHeading2: "पोर्टफोलियो।",
  collectionsPageLead: "हमारे कैटलॉग का एक जीवंत संग्रह। सिल्हूट या फैब्रिक से फ़िल्टर करें — हर पीस बल्क में उपलब्ध है।",
  collectionsFilterAll: "सभी",
  collectionsCtaHeading1: "पूरा कैटलॉग और भी गहरा है।",
  collectionsCtaHeading2: "इसे माँगें।",
  collectionsCtaBody: "बल्क मूल्य के साथ पूर्ण लुकबुक सीधे सत्यापित व्यावसायिक खरीदारों के साथ साझा किए जाते हैं।",
  collectionsCtaBtn: "नवीनतम कैटलॉग माँगें",

  // How to Order page
  orderPageEyebrow: "ऑर्डर कैसे करें",
  orderPageHeading1: "पूछताछ से",
  orderPageHeading2: "आपकी शेल्फ तक।",
  orderPageLead: "एक सरल, पारदर्शी बल्क प्रक्रिया — अधिकांश पार्टनर एक दिन के भीतर अपना पहला कैटलॉग प्राप्त करते हैं।",

  order1Title: "पूछताछ सबमिट करें",
  order1Body: "हमारे संपर्क फॉर्म, WhatsApp या कॉल के माध्यम से अपने व्यवसाय का विवरण साझा करें।",
  order2Title: "हमारी सेल्स टीम आपसे संपर्क करती है",
  order2Body: "एक समर्पित संपर्क एक कार्य दिवस के भीतर आपके बाजार और रेंज को समझने के लिए संपर्क करता है।",
  order3Title: "नवीनतम कैटलॉग प्राप्त करें",
  order3Body: "फैब्रिक, साइज़ सेट और बल्क मूल्य के साथ वर्तमान लुकबुक।",
  order4Title: "अपने कलेक्शन चुनें",
  order4Body: "डिज़ाइन और मात्रा चुनें; हम सलाह देते हैं कि रिटेल पर सबसे तेज़ क्या बिक रहा है।",
  order5Title: "बल्क ऑर्डर दें",
  order5Body: "प्रोफार्मा इनवॉइस के साथ हमारी बल्क नीति के अनुसार ऑर्डर की पुष्टि।",
  order6Title: "निर्माण और पैकिंग",
  order6Body: "आपका ऑर्डर कटिंग, सिलाई, QC और रिटेल-रेडी पैकिंग से गुजरता है।",
  order7Title: "डिस्पैच",
  order7Body: "विश्वसनीय लॉजिस्टिक्स पार्टनर के माध्यम से शिप किया गया, पूर्ण ट्रैकिंग के साथ।",
  order8Title: "डिलीवरी",
  order8Body: "आपका कलेक्शन पहुँचता है — प्रेस किया, टैग किया और फ्लोर के लिए तैयार।",

  faqEyebrow: "सवालों के जवाब",
  faqHeading1: "अक्सर",
  faqHeading2: "पूछे जाने वाले।",
  faq1Q: "न्यूनतम ऑर्डर मात्रा (MOQ) क्या है?",
  faq1A: "MOQ प्रति कैटलॉग निर्धारित किए जाते हैं, आमतौर पर पूर्ण साइज़-सेट कैटलॉग के रूप में। सटीक मात्रा कैटलॉग और मूल्य के साथ साझा की जाती है — हमारी टीम आपके स्टोर के आकार के लिए सही शुरुआती ऑर्डर के लिए मार्गदर्शन करेगी।",
  faq2Q: "कैटलॉग ऑर्डरिंग कैसे काम करती है?",
  faq2A: "कलेक्शन पूर्ण कैटलॉग के रूप में पूर्ण साइज़ सेट के साथ बेचे जाते हैं। कुछ लाइनों पर मिश्रित चयन संभव हो सकता है — अपने सेल्स संपर्क से पूछें।",
  faq3Q: "आपकी बल्क नीति क्या है?",
  faq3A: "हम केवल सत्यापित व्यवसायों को सप्लाई करते हैं — रिटेलर, बुटीक, बल्क विक्रेता, डिस्ट्रीब्यूटर, ऑनलाइन विक्रेता और निर्यातक। मूल्य निर्माता-प्रत्यक्ष है और सत्यापन के बाद निजी तौर पर साझा किया जाता है।",
  faq4Q: "शिपिंग कैसे होती है?",
  faq4A: "हम प्रतिष्ठित ट्रांसपोर्ट और कूरियर पार्टनर के माध्यम से पैन-इंडिया डिस्पैच करते हैं। माल ढुलाई शर्तें प्रोफार्मा इनवॉइस पर पुष्टि की जाती हैं।",
  faq5Q: "क्या आप GST इनवॉइस प्रदान करते हैं?",
  faq5A: "हाँ। सभी ऑर्डर उचित GST इनवॉइस के साथ बिल किए जाते हैं। कृपया ऑर्डर के समय अपना GSTIN साझा करें।",
  faq6Q: "पार्टनर को क्या सहायता मिलती है?",
  faq6A: "हर पार्टनर को एक समर्पित सेल्स संपर्क, नए कैटलॉग तक प्रारंभिक पहुँच, मार्केटिंग के लिए कैम्पेन छवियाँ और दोहराए गए ऑर्डर पर प्राथमिकता डिस्पैच मिलती है।",

  partnerEyebrow: "पार्टनर बनें",
  partnerHeading1: "केवल एक सप्लायर से अधिक —",
  partnerHeading2: "एक विकास पार्टनर।",
  partner1Title: "समर्पित सेल्स संपर्क",
  partner1Body: "एकल संपर्क बिंदु जो आपके बाजार, आपके स्टोर और आपके रीऑर्डर चक्र को जानता है।",
  partner2Title: "प्रारंभिक कैटलॉग पहुँच",
  partner2Body: "नए सीज़न का लुकबुक और मूल्य सामान्य व्यापार के लिए खुलने से पहले प्राप्त करें।",
  partner3Title: "कैम्पेन छवियाँ",
  partner3Body: "हर कलेक्शन से उच्च-रिज़ॉल्यूशन संपादकीय फ़ोटो — आपके सोशल और स्टोरफ्रंट के लिए तैयार।",
  partner4Title: "प्राथमिकता डिस्पैच",
  partner4Body: "दोहराए गए पार्टनर पैकिंग कतार में आगे जाते हैं — आपकी शेल्फ कभी खाली नहीं।",

  orderCtaHeading1: "शुरू करने के लिए",
  orderCtaHeading2: "तैयार हैं?",
  orderCtaBody: "एक साधारण पूछताछ से शुरू करें — कैटलॉग खुद बोलता है।",
  orderCtaBtn: "पार्टनर बनें",

  // Contact page
  contactPageEyebrow: "संपर्क",
  contactPageHeading1: "आइए बनाएँ",
  contactPageHeading2: "आपका अगला सीज़न।",
  contactFormHeading: "बल्क पूछताछ",
  contactVisitEyebrow: "हमसे मिलें",
  contactWhatsApp: "WhatsApp",
  contactCallUs: "कॉल करें",
  contactInstagram: "Instagram",

  // Contact form
  formBusinessDetails: "व्यवसाय विवरण",
  formBusinessPlaceholder: "अपनी व्यवसाय श्रेणी चुनें…",
  formGstNumber: "GST नंबर",
  formGstPlaceholder: "15-अक्षर GSTIN",
  formGstFetch: "विवरण प्राप्त करें",
  formGstFetching: "प्राप्त कर रहे हैं…",
  formGstSuccess: "विवरण प्राप्त हो गए। हमने जो भर सका भर दिया है — कृपया समीक्षा करें और बाकी पूरा करें।",
  formAadhaarPan: "आधार / PAN नंबर",
  formAadhaarPanPlaceholder: "आधार या PAN",
  formAddress: "पता",
  formAddressPlaceholder: "सड़क का पता",
  formCity: "शहर",
  formCityPlaceholder: "शहर",
  formState: "राज्य",
  formStatePlaceholder: "राज्य",
  formPin: "PIN कोड",
  formPinPlaceholder: "6-अंकीय PIN",
  formContactPerson: "संपर्क व्यक्ति का नाम",
  formContactPersonPlaceholder: "पूरा नाम",
  formMobile1: "मोबाइल नंबर 1",
  formMobile2: "मोबाइल नंबर 2 (वैकल्पिक)",
  formEmail: "ईमेल पता",
  formEmailPlaceholder: "you@business.com",
  formAgencyName: "एजेंसी / अदत का नाम",
  formAgencyNamePlaceholder: "एजेंसी या अदत का नाम",
  formAgencyContact: "एजेंसी / अदत संपर्क व्यक्ति",
  formAgencyContactPlaceholder: "संपर्क व्यक्ति का नाम",
  formAgencyNumber: "एजेंसी / अदत संपर्क नंबर",
  formMessage: "संदेश (वैकल्पिक)",
  formMessagePlaceholder: "हमें अपने व्यवसाय और जिन कलेक्शन में आप रुचि रखते हैं उनके बारे में बताएँ।",
  formAgree: "मैं सहमत हूँ",
  formTerms: "नियम और शर्तें",
  formPrivacy: "गोपनीयता नीति",
  formTrustLine: "केवल सत्यापित व्यवसाय · एक कार्य दिवस में जवाब · कोई स्पैम नहीं।",
  formSendBtn: "पूछताछ भेजें",
  formSendingBtn: "भेज रहे हैं…",
  formSuccessNote: "धन्यवाद — आपकी पूछताछ नोट हो गई है। हमारी सेल्स टीम एक कार्य दिवस के भीतर आपसे संपर्क करेगी।",

  // Footer
  footerTagline: "प्रीमियम महिला एथनिक वियर निर्माण। अहमदाबाद में बना, भारत के सर्वश्रेष्ठ रिटेलर्स के लिए।",
  footerExplore: "देखें",
  footerConnect: "जुड़ें",
  footerRights: "सर्वाधिकार सुरक्षित।",
  footerCrafted: "अहमदाबाद में निर्मित",
};
