import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-lime-200",
        className,
      )}
    >
      {children}
    </p>
  );
}
