"use client";

import { cn } from "@/lib/utils";

type MenuIconProps = {
  open?: boolean;
  className?: string;
  stroke?: string;
};

function Hexagon({ cx, cy, stroke }: { cx: number; cy: number; stroke: string }) {
  return (
    <polygon
      points={`${cx},${cy - 4} ${cx + 3.5},${cy - 2} ${cx + 3.5},${cy + 2} ${cx},${cy + 4} ${cx - 3.5},${cy + 2} ${cx - 3.5},${cy - 2}`}
      fill="none"
      stroke={stroke}
      strokeWidth="1"
      strokeLinejoin="round"
    />
  );
}

export function MenuIcon({ open = false, className, stroke = "currentColor" }: MenuIconProps) {
  if (open) {
    return (
      <svg
        viewBox="0 0 40 24"
        className={cn("h-6 w-10", className)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="8" cy="12" r="3.5" stroke={stroke} strokeWidth="1" />
        <line x1="14" y1="12" x2="26" y2="12" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
        <circle cx="32" cy="12" r="3.5" stroke={stroke} strokeWidth="1" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 40 56"
      className={cn("h-14 w-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="10" y1="10" x2="10" y2="46" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <Hexagon cx={10} cy={6} stroke={stroke} />

      <line x1="20" y1="18" x2="20" y2="38" stroke={stroke} strokeWidth="1" strokeLinecap="round" />

      <line x1="30" y1="10" x2="30" y2="46" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <Hexagon cx={30} cy={50} stroke={stroke} />
    </svg>
  );
}
