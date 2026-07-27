"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/config/site";

/**
 * The luxury loading sequence. The M4U logo fades up and a gold bar draws
 * across, then the whole thing hands off to the hero as one continuous
 * gesture. Shows once per browser session (sessionStorage) so navigation
 * never re-triggers it.
 */
export function Loader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Skip entirely if already shown this session.
    if (sessionStorage.getItem("m4u-loaded")) {
      setDone(true);
      setMounted(false);
      return;
    }

    const hold = reduced ? 0 : 2300;
    const t1 = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("m4u-loaded", "1");
    }, hold);
    // Remove from DOM after the fade-out completes.
    const t2 = setTimeout(() => setMounted(false), hold + 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  if (!mounted) return null;

  return (
    <div id="loader" className={cn(done && "done")} aria-hidden>
      <div className="lg-img">
        <Image
          src="/images/m4u-logo.png"
          alt="M4U by Makhija Trendz"
          width={260}
          height={219}
          priority
        />
      </div>
      <div className="bar">
        <i />
      </div>
      <div className="sub">By {siteConfig.legalName.replace("M4U by ", "")}</div>
    </div>
  );
}
