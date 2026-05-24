"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";

import { HeroCanvasShell } from "@/components/hero/hero-canvas-shell";
import { HeroGrain } from "@/components/hero/hero-grain";
import { heroLatestProject, heroMission } from "@/data/hero";

const ease = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

const heroDisplay =
  "font-tunnels-bold text-[clamp(3.5rem,15.2vw,14.65rem)] uppercase leading-[0.8] tracking-[-0.02em]";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#1D2145] pt-[4.5rem]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_44%,rgba(0,126,255,0.16),transparent_48%)]"
        aria-hidden="true"
      />
      <HeroGrain />
      <HeroCanvasShell />

      <div className="studio-container relative z-10 flex min-h-[calc(100vh-4.5rem)] flex-col pb-24">
        <div className="relative z-20 ml-auto w-full lg:max-w-[88%]">
          <motion.h1
            className="pointer-events-none relative z-20 pt-6 text-right lg:pt-10"
            aria-label="Sajilo Studio"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.span
              className={`relative z-20 block text-accent ${heroDisplay}`}
              variants={fade}
            >
              Sajilo
            </motion.span>
            <motion.span
              className={`relative z-20 block text-[#EEEEF2] ${heroDisplay}`}
              variants={fade}
            >
              Studio
            </motion.span>
          </motion.h1>

          <motion.div
            className="pointer-events-auto relative z-10 mt-10 flex justify-end sm:mt-12 lg:mt-14"
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Link
              href={heroLatestProject.href}
              className="group flex w-fit max-w-full items-center gap-4 border border-foreground/14 bg-[#1D2145] px-5 py-3 transition hover:border-foreground/25"
            >
              <span className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-foreground/50">
                {heroLatestProject.label}
              </span>
              <span
                className="h-px w-16 shrink-0 bg-foreground/28 transition group-hover:w-20 group-hover:bg-foreground/40 sm:w-28 lg:w-40"
                aria-hidden="true"
              />
              <span
                className="hidden text-foreground/50 sm:inline"
                aria-hidden="true"
              >
                →
              </span>
              <span className="truncate text-xs font-bold uppercase tracking-[0.12em] text-foreground sm:text-sm">
                {heroLatestProject.title}
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.p
          className="absolute bottom-[22%] left-4 z-10 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-foreground/55 sm:left-8 lg:left-[6%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          aria-hidden="true"
        >
          [ Scroll ]
        </motion.p>

        <motion.p
          className="relative z-10 mt-auto hidden max-w-md self-end text-right text-[0.58rem] font-medium uppercase leading-[1.9] tracking-[0.18em] text-foreground/45 lg:block lg:text-[0.62rem]"
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.35 }}
        >
          {heroMission}
        </motion.p>
      </div>

      <motion.a
        href="#contact"
        className="fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-accent text-foreground shadow-none transition hover:scale-105 lg:bottom-8 lg:right-8 lg:size-14"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        aria-label="Start a project"
      >
        <Pencil className="size-5 lg:size-6" />
      </motion.a>
    </section>
  );
}
