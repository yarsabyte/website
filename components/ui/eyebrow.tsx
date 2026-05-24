import type { ReactNode } from "react";

import { SectionLabel } from "@/components/ui/section-label";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return <SectionLabel className={className}>{children}</SectionLabel>;
}
