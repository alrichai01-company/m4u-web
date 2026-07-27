import { z } from "zod";

/**
 * Wholesale inquiry schema — the single source of truth for both client-side
 * (React Hook Form) and server-side (/api/inquiry) validation, so the two can
 * never drift apart.
 *
 * All business-facing fields are required per the M4U onboarding requirements.
 * `gstin` is validated to the standard 15-character GSTIN format so the
 * "Fetch Details" lookup only fires on a well-formed number.
 */

/** Standard Indian GSTIN: 15 chars — 2 state digits, 10-char PAN, 3 more. */
export const GSTIN_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export const businessCategories = [
  "Retail",
  "Wholesale",
  "Malls",
  "Corporate",
] as const;

export const inquirySchema = z.object({
  // 1 — Business details
  businessCategory: z.enum(businessCategories, {
    message: "Please select your business category.",
  }),

  // 2 — GST number
  gstin: z
    .string()
    .trim()
    .toUpperCase()
    .regex(GSTIN_REGEX, "Please enter a valid 15-character GSTIN."),

  // 3 — Aadhaar / PAN
  aadhaarPan: z
    .string()
    .trim()
    .min(10, "Please enter your Aadhaar or PAN number."),

  // 4 — Address
  address: z.string().trim().min(4, "Please enter your address."),
  city: z.string().trim().min(2, "Please enter your city."),
  state: z.string().trim().min(2, "Please enter your state."),
  pinCode: z
    .string()
    .trim()
    .regex(/^[0-9]{6}$/, "Please enter a valid 6-digit PIN code."),

  // 5 — Contact person
  contactName: z.string().trim().min(2, "Please enter the contact person's name."),

  // 6 — Mobile number(s): mobile1 required, mobile2 optional
  mobile1: z
    .string()
    .trim()
    .min(7, "Please enter a valid mobile number.")
    .max(20, "That number looks too long."),
  mobile2: z
    .string()
    .trim()
    .max(20, "That number looks too long.")
    .optional()
    .or(z.literal("")),

  // 7 — Email
  email: z.string().trim().email("Please enter a valid email address."),

  // 8 — Agency / Adat name
  agencyName: z.string().trim().min(2, "Please enter the agency / adat name."),

  // 9 — Agency / Adat contact person name & number
  agencyContactName: z
    .string()
    .trim()
    .min(2, "Please enter the agency contact person's name."),
  agencyContactNumber: z
    .string()
    .trim()
    .min(7, "Please enter a valid agency contact number.")
    .max(20, "That number looks too long."),

  // Optional free-text message
  message: z.string().max(2000).optional().or(z.literal("")),

  // Consent
  agree: z.literal(true, {
    message: "Please agree to the Terms & Conditions to continue.",
  }),

  /** Honeypot — must stay empty. Hidden from real users; bots fill it. */
  website: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
