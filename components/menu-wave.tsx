"use client";

import { motion } from "framer-motion";

const waveEase = [0.76, 0, 0.24, 1] as const;

/**
 * Wavy top edge of the navy panel — two peaks, three troughs (Buzzworthy-style).
 * viewBox height 120; wave crest sits in upper portion of this SVG.
 */
const WAVE_PATH =
  "M0,68 C200,108 380,12 580,58 C780,104 980,18 1180,52 C1300,72 1380,38 1440,54 L1440,120 L0,120 Z";

export function MenuWave() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[79] flex flex-col justify-end will-change-transform"
      initial={{ y: "-100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.95, ease: waveEase }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full shrink-0 text-[#1D2145]"
        style={{ height: "clamp(4rem, 12vw, 7.5rem)" }}
      >
        <motion.path
          d={WAVE_PATH}
          fill="currentColor"
          initial={{ d: "M0,40 C360,40 720,40 1080,40 1440,40 L1440,120 L0,120 Z" }}
          animate={{ d: WAVE_PATH }}
          transition={{ duration: 0.95, ease: waveEase }}
        />
      </svg>
      <div className="min-h-[36vh] w-full bg-[#1D2145] sm:min-h-[40vh]" />
    </motion.div>
  );
}
