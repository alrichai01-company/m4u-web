"use client";

import { LightboxProvider, PageTracker } from "@/components/shared";
import { LanguageProvider } from "@/context/lang";
import type { ReactNode } from "react";

/**
 * Client provider boundary. Keeps the root layout a Server Component while the
 * app-wide lightbox context lives on the client. Add future client providers
 * (analytics, theme) here so pages don't each re-establish them.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LightboxProvider>
        <PageTracker />
        {children}
      </LightboxProvider>
    </LanguageProvider>
  );
}
