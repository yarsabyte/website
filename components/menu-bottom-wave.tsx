"use client";

import { motion, type Variants } from "framer-motion";

const WAVE_PATH =
  "M0,68 C200,108 380,12 580,58 C780,104 980,18 1180,52 C1300,72 1380,38 1440,54 L1440,120 L0,120 Z";

const panelEase = [0.76, 0, 0.24, 1] as const;

export const menuBottomWaveVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { delay: 0.22, duration: 0.65, ease: panelEase },
  },
  exit: {
    y: "100%",
    transition: { duration: 0.45, ease: panelEase },
  },
};

/** Static dark footer with wavy top edge (revealed after menu expands) */
export function MenuBottomWave() {
  return (
    <motion.div
      variants={menuBottomWaveVariants}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex flex-col justify-end"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full shrink-0 text-background"
        style={{ height: "clamp(3.5rem, 10vw, 6rem)" }}
      >
        <path d={WAVE_PATH} fill="currentColor" />
      </svg>
      <div className="min-h-[32vh] w-full bg-background sm:min-h-[36vh]" />
    </motion.div>
  );
}
