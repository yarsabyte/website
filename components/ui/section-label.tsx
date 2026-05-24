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
        "inline-flex items-center gap-2 rounded-full border border-foreground/12 bg-foreground/[0.045] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-accent shadow-[0_0_16px_color-mix(in_srgb,var(--accent)_80%,transparent)]" />
      {children}
    </p>
  );
}
