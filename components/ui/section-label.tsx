import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-amber shadow-[0_0_16px_rgba(255,189,107,0.8)]" />
      {children}
    </p>
  );
}
