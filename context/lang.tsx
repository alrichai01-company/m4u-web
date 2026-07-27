"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Translations } from "@/content/translations";
import { en, hi } from "@/content/translations";

export type Lang = "en" | "hi";

interface LangContextValue {
  lang: Lang;
  t: Translations;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "m4u-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Hydrate from localStorage once on the client.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "hi" || saved === "en") {
      setLang(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  function toggle() {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "hi" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
      return next;
    });
  }

  const t = lang === "hi" ? hi : en;

  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within <LanguageProvider>");
  return ctx;
}
