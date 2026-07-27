"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/hooks";
import type { ReactNode } from "react";

type Variant = "solid" | "light" | "gold" | "outline" | "quiet";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  /** Show a trailing arrow that slides on hover. */
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
}

interface LinkProps extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
}

interface ButtonProps extends BaseProps {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit";
}

type Props = LinkProps | ButtonProps;

const variantClass: Record<Variant, string> = {
  solid: "btn solid",
  light: "btn light",
  gold: "btn gold-b",
  outline: "btn",
  quiet: "btn-quiet",
};

/**
 * The single CTA primitive. Renders as a Next Link when `href` is provided,
 * otherwise a button. Carries the approved hover fill / underline treatments
 * and the (subtle, fine-pointer-only) magnetic pull.
 */
export function Button(props: Props) {
  const {
    children,
    variant = "outline",
    arrow = false,
    magnetic = false,
    className,
  } = props;

  const magneticRef = useMagnetic<HTMLAnchorElement & HTMLButtonElement>();
  const classes = cn(variantClass[variant], className);

  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="arr" size={16} aria-hidden />}
    </>
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          ref={magnetic ? magneticRef : undefined}
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        ref={magnetic ? magneticRef : undefined}
        href={props.href}
        className={classes}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={magnetic ? magneticRef : undefined}
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {inner}
    </button>
  );
}
