import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/section-label";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] text-white text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/62 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
