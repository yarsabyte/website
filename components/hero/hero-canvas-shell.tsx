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

export function HeroCanvasShell() {
  return (
    <div
      className="pointer-events-auto absolute z-[2] left-[-2%] top-[26%] h-[min(38vh,17rem)] w-[min(52vw,16rem)] sm:left-0 sm:top-[24%] sm:h-[min(42vh,19rem)] sm:w-[min(44vw,18rem)] lg:top-[20%] lg:h-[min(46vh,22rem)] lg:w-[min(32vw,20rem)]"
      aria-hidden="true"
    >
      <HeroCanvas />
    </div>
  );
}
