"use client";

import dynamic from "next/dynamic";

import { CanvasLoader } from "@/components/three/CanvasLoader";

const HeroCanvas = dynamic(
  () =>
    import("@/components/three/HeroCanvas").then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => <CanvasLoader />,
  },
);

/** Buzzworthy-style blob: fixed left column, overlaps headline area */
export function HeroCanvasShell() {
  return (
    <div
      className="pointer-events-none absolute z-[2] left-0 top-[calc(4.5rem+6vh)] h-[min(52vh,26rem)] w-[min(58vw,24rem)] max-w-[26rem] sm:top-[calc(4.5rem+5vh)] lg:top-[calc(4.5rem+4vh)] lg:h-[min(56vh,28rem)] lg:w-[min(42vw,26rem)]"
      aria-hidden="true"
    >
      <div
        className="absolute left-[42%] top-[48%] h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(52,50,78,0.5)_0%,rgba(40,38,66,0.22)_38%,transparent_68%)] blur-2xl"
        aria-hidden="true"
      />
      <HeroCanvas />
    </div>
  );
}
