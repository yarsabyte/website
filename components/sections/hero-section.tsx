"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Pencil } from "lucide-react";

import { HeroCanvasShell } from "@/components/hero/hero-canvas-shell";
import { HeroGrain } from "@/components/hero/hero-grain";
import { heroLatestProject, heroMission } from "@/data/hero";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

const heroWord =
  "text-[clamp(3rem,11.5vw,12.5rem)] font-bold leading-[0.82] tracking-[-0.02em]";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#1D2145] pt-[4.5rem]">
      <HeroGrain />
      <HeroCanvasShell />

      <motion.div
        className="studio-container relative z-10 flex min-h-[calc(100vh-4.5rem)] flex-col pb-28"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <h1
          className="pointer-events-none relative z-10 font-tunnels-bold uppercase text-[#EEEEF2]"
          aria-label="Creative Sajilo Studio"
        >
          <motion.span className={cn("block", heroWord)} variants={fadeUp}>
            Creative
          </motion.span>
          <motion.span
            className={cn("block w-fit -mt-[0.06em] text-accent", heroWord)}
            variants={fadeUp}
          >
            Sajilo
          </motion.span>
          <motion.span
            className={cn("mt-1 block text-right", heroWord)}
            variants={fadeUp}
          >
            Studio.
          </motion.span>
        </h1>

        <div className="relative mt-auto flex flex-col gap-10 pt-10 lg:pt-16">
          <motion.div
            variants={fadeUp}
            className="pointer-events-auto flex justify-center lg:justify-end"
          >
            <Link
              href={heroLatestProject.href}
              className="group inline-flex max-w-full items-center gap-3 border border-foreground/14 bg-foreground/[0.02] px-4 py-2.5 transition hover:border-foreground/28 hover:bg-foreground/[0.05] sm:gap-5 sm:px-6 sm:py-3"
            >
              <span className="shrink-0 text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-foreground/45 sm:text-[0.62rem]">
                {heroLatestProject.label}
              </span>
              <span
                className="hidden h-px w-8 bg-foreground/25 sm:block lg:w-14"
                aria-hidden="true"
              />
              <ArrowRight
                className="size-4 shrink-0 text-foreground/70 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
              <span className="truncate text-xs font-bold uppercase tracking-[0.14em] text-foreground sm:text-sm">
                {heroLatestProject.title}
              </span>
            </Link>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="pointer-events-none max-w-sm self-center text-center text-[0.58rem] font-medium uppercase leading-[1.85] tracking-[0.18em] text-foreground/42 sm:text-[0.62rem] lg:max-w-xs lg:self-end lg:text-right"
          >
            {heroMission}
          </motion.p>
        </div>
      </motion.div>

      <motion.p
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-foreground/50 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        aria-hidden="true"
      >
        [ Scroll ]
      </motion.p>

      <motion.a
        href="#contact"
        className="fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-accent text-foreground transition hover:scale-105 lg:bottom-8 lg:right-8 lg:size-14"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.95, duration: 0.45, type: "spring", stiffness: 260, damping: 20 }}
        aria-label="Start a project"
      >
        <Pencil className="size-5 lg:size-6" />
      </motion.a>
    </section>
  );
}
