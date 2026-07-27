import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: string;
  className?: string;
}

/** The gold uppercase label with a leading rule. A structural signpost. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}
