/**
 * Legal copy. Template text — must be reviewed by a legal advisor for the
 * client's jurisdiction before publishing.
 */

export const privacyPolicy = {
  updated: "July 2026",
  intro:
    'M4U by Makhija Trendz ("we", "our") respects the privacy of every visitor and business partner. This policy explains what we collect and how we use it.',
  sections: [
    {
      heading: "Information we collect",
      body: "When you submit an inquiry, we collect the details you provide: name, mobile number, email, company name, location, business type and message.",
    },
    {
      heading: "How we use it",
      list: [
        "To respond to wholesale inquiries and share catalogs and pricing.",
        "To manage orders, invoicing and dispatch.",
        "To share new collection updates, where you have agreed to receive them.",
      ],
    },
    {
      heading: "What we don't do",
      body: "We do not sell or rent your information. Details are shared only with logistics and payment partners as needed to fulfil your order.",
    },
    {
      heading: "Data security",
      body: "We take reasonable technical and organisational measures to protect the information you share with us.",
    },
    {
      heading: "Your rights",
      body: "You may request access to, correction of, or deletion of your information at any time by contacting us through the details on our Contact page.",
    },
  ],
} as const;

export const termsAndConditions = {
  updated: "July 2026",
  sections: [
    {
      heading: "Wholesale only",
      body: "M4U supplies verified businesses only. We do not sell to retail consumers through this website. Pricing, MOQs and catalogs are shared after business verification.",
    },
    {
      heading: "Orders & payment",
      list: [
        "Orders are confirmed against a proforma invoice.",
        "Payment terms are communicated at the time of order confirmation.",
        "All invoices are raised with applicable GST.",
      ],
    },
    {
      heading: "Shipping & risk",
      body: "Goods are dispatched through agreed logistics partners. Freight terms and transfer of risk are stated on the invoice.",
    },
    {
      heading: "Returns",
      body: "Manufacturing defects reported within the stated inspection window will be resolved by replacement or credit as per our wholesale policy.",
    },
    {
      heading: "Intellectual property",
      body: "All designs, imagery and catalogs remain the property of Makhija Trendz and may be used by partners solely to market genuine M4U products.",
    },
  ],
} as const;
