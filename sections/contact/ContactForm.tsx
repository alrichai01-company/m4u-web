"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui";
import {
  inquirySchema,
  businessCategories,
  GSTIN_REGEX,
  type InquiryInput,
} from "@/lib/schemas/inquiry";
import { useLang } from "@/context/lang";

/**
 * Wholesale inquiry form.
 *
 * Validation runs against the shared Zod schema (lib/schemas/inquiry). A
 * "Fetch Details" button appears once a well-formed GSTIN is entered; clicking
 * it calls /api/gst and auto-fills whatever fields the provider returns,
 * leaving the rest for the user. Submits to /api/inquiry. A hidden honeypot
 * field catches naive bots.
 */
export function ContactForm() {
  const [note, setNote] = useState<string | null>(null);
  const [gstStatus, setGstStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");
  const [gstMessage, setGstMessage] = useState<string | null>(null);
  const { t } = useLang();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    mode: "onBlur",
  });

  // Watch the GSTIN so the "Fetch Details" button only shows once valid.
  const gstinValue = (watch("gstin") ?? "").toUpperCase();
  const gstinValid = GSTIN_REGEX.test(gstinValue.trim());

  async function fetchGstDetails() {
    setGstStatus("loading");
    setGstMessage(null);
    try {
      const res = await fetch(
        `/api/gst?gstin=${encodeURIComponent(gstinValue.trim())}`,
      );
      const payload = await res.json().catch(() => null);

      if (!res.ok || !payload?.details) {
        setGstStatus("error");
        setGstMessage(
          payload?.error ??
            "Could not fetch details. Please fill the form manually.",
        );
        return;
      }

      const d = payload.details as {
        legalName?: string;
        tradeName?: string;
        address?: string;
        city?: string;
        state?: string;
        pinCode?: string;
        businessCategory?: (typeof businessCategories)[number];
      };

      // Fill only the fields the provider actually returned. `shouldValidate`
      // clears any existing error on a field once it's populated.
      const fill = (field: keyof InquiryInput, value?: string) => {
        if (value) setValue(field, value, { shouldValidate: true });
      };

      fill("agencyName", d.tradeName || d.legalName);
      fill("address", d.address);
      fill("city", d.city);
      fill("state", d.state);
      fill("pinCode", d.pinCode);
      if (d.businessCategory) {
        setValue("businessCategory", d.businessCategory, {
          shouldValidate: true,
        });
      }

      setGstStatus("ok");
      setGstMessage(t.formGstSuccess);
    } catch {
      setGstStatus("error");
      setGstMessage(
        "Network error fetching details. Please fill the form manually.",
      );
    }
  }

  async function onSubmit(data: InquiryInput) {
    // Honeypot tripped — silently accept without doing anything.
    if (data.website) {
      setNote("Thank you — your inquiry is noted.");
      reset();
      return;
    }

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setNote(t.formSuccessNote);
        reset();
        setGstStatus("idle");
        setGstMessage(null);
      } else if (res.status === 429) {
        setNote("Too many requests. Please wait a moment and try again.");
      } else {
        const err = await res.json().catch(() => null);
        setNote(
          (err as { error?: string } | null)?.error ??
            "Something went wrong. Please try again or contact us directly.",
        );
      }
    } catch {
      setNote("Network error. Please check your connection and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* 1 — Business details */}
      <div className="field">
        <label htmlFor="f-category">{t.formBusinessDetails}</label>
        <select id="f-category" defaultValue="" {...register("businessCategory")}>
          <option value="" disabled>
            {t.formBusinessPlaceholder}
          </option>
          {businessCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.businessCategory && (
          <p className="err">{errors.businessCategory.message}</p>
        )}
      </div>

      {/* 2 — GST number + Fetch Details */}
      <div className="field">
        <label htmlFor="f-gstin">{t.formGstNumber}</label>
        <div className="gst-row">
          <input
            id="f-gstin"
            placeholder={t.formGstPlaceholder}
            autoCapitalize="characters"
            style={{ textTransform: "uppercase" }}
            {...register("gstin")}
          />
          {gstinValid && (
            <button
              type="button"
              className="gst-fetch-btn"
              onClick={fetchGstDetails}
              disabled={gstStatus === "loading"}
            >
              {gstStatus === "loading" ? t.formGstFetching : t.formGstFetch}
            </button>
          )}
        </div>
        {errors.gstin && <p className="err">{errors.gstin.message}</p>}
        {gstMessage && (
          <p className={gstStatus === "error" ? "err" : "gst-ok"}>{gstMessage}</p>
        )}
      </div>

      {/* 3 — Aadhaar / PAN */}
      <div className="field">
        <label htmlFor="f-aadhaarpan">{t.formAadhaarPan}</label>
        <input
          id="f-aadhaarpan"
          placeholder={t.formAadhaarPanPlaceholder}
          {...register("aadhaarPan")}
        />
        {errors.aadhaarPan && <p className="err">{errors.aadhaarPan.message}</p>}
      </div>

      {/* 4 — Address */}
      <div className="field">
        <label htmlFor="f-address">{t.formAddress}</label>
        <input id="f-address" placeholder={t.formAddressPlaceholder} {...register("address")} />
        {errors.address && <p className="err">{errors.address.message}</p>}
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="f-city">{t.formCity}</label>
          <input id="f-city" placeholder={t.formCityPlaceholder} {...register("city")} />
          {errors.city && <p className="err">{errors.city.message}</p>}
        </div>
        <div className="field">
          <label htmlFor="f-state">{t.formState}</label>
          <input id="f-state" placeholder={t.formStatePlaceholder} {...register("state")} />
          {errors.state && <p className="err">{errors.state.message}</p>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-pin">{t.formPin}</label>
        <input id="f-pin" placeholder={t.formPinPlaceholder} {...register("pinCode")} />
        {errors.pinCode && <p className="err">{errors.pinCode.message}</p>}
      </div>

      {/* 5 — Contact person + 6 — Mobile numbers */}
      <div className="row">
        <div className="field">
          <label htmlFor="f-contact">{t.formContactPerson}</label>
          <input id="f-contact" placeholder={t.formContactPersonPlaceholder} {...register("contactName")} />
          {errors.contactName && (
            <p className="err">{errors.contactName.message}</p>
          )}
        </div>
        <div className="field">
          <label htmlFor="f-mobile1">{t.formMobile1}</label>
          <input id="f-mobile1" type="tel" placeholder="+91" {...register("mobile1")} />
          {errors.mobile1 && <p className="err">{errors.mobile1.message}</p>}
        </div>
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="f-mobile2">{t.formMobile2}</label>
          <input id="f-mobile2" type="tel" placeholder="+91" {...register("mobile2")} />
          {errors.mobile2 && <p className="err">{errors.mobile2.message}</p>}
        </div>
        {/* 7 — Email */}
        <div className="field">
          <label htmlFor="f-email">{t.formEmail}</label>
          <input
            id="f-email"
            type="email"
            placeholder={t.formEmailPlaceholder}
            {...register("email")}
          />
          {errors.email && <p className="err">{errors.email.message}</p>}
        </div>
      </div>

      {/* 8 — Agency / Adat name */}
      <div className="field">
        <label htmlFor="f-agency">{t.formAgencyName}</label>
        <input id="f-agency" placeholder={t.formAgencyNamePlaceholder} {...register("agencyName")} />
        {errors.agencyName && <p className="err">{errors.agencyName.message}</p>}
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="f-agency-contact">{t.formAgencyContact}</label>
          <input
            id="f-agency-contact"
            placeholder={t.formAgencyContactPlaceholder}
            {...register("agencyContactName")}
          />
          {errors.agencyContactName && (
            <p className="err">{errors.agencyContactName.message}</p>
          )}
        </div>
        <div className="field">
          <label htmlFor="f-agency-number">{t.formAgencyNumber}</label>
          <input
            id="f-agency-number"
            type="tel"
            placeholder="+91"
            {...register("agencyContactNumber")}
          />
          {errors.agencyContactNumber && (
            <p className="err">{errors.agencyContactNumber.message}</p>
          )}
        </div>
      </div>

      {/* Optional message */}
      <div className="field">
        <label htmlFor="f-msg">{t.formMessage}</label>
        <textarea
          id="f-msg"
          placeholder={t.formMessagePlaceholder}
          {...register("message")}
        />
      </div>

      {/* Honeypot — visually hidden, off the tab order. Real users never fill it. */}
      <div aria-hidden style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="f-website">Website</label>
        <input id="f-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <label className="check">
        <input type="checkbox" {...register("agree")} />
        <span>
          {t.formAgree}{" "}
          <a href="/terms-and-conditions" className="gold">
            {t.formTerms}
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="gold">
            {t.formPrivacy}
          </a>
          .
        </span>
      </label>
      {errors.agree && <p className="err">{errors.agree.message}</p>}

      <p className="trust-line">{t.formTrustLine}</p>

      <Button type="submit" variant="solid" arrow magnetic>
        {isSubmitting ? t.formSendingBtn : t.formSendBtn}
      </Button>

      {note && (
        <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--gold)" }}>
          {note}
        </p>
      )}
    </form>
  );
}
