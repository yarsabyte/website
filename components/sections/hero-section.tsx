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

const mobileHeroDisplay =
  "font-tunnels-bold text-[clamp(3.55rem,15vw,4.6rem)] uppercase leading-[0.86]";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background pt-24 sm:min-h-screen sm:pt-[4.5rem]">
      <div
        className="pointer-events-none absolute inset-0 bg-background"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_46%,rgba(238,238,242,0.045)_0%,rgba(238,238,242,0.02)_28%,transparent_58%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_20%_48%,rgba(238,238,242,0.035)_0%,rgba(238,238,242,0.01)_40%,transparent_72%)]"
        aria-hidden="true"
      />
      <HeroGrain />
      <HeroCanvasShell />

      <div className="studio-container relative z-10 flex min-h-[calc(100svh-6rem)] flex-col pb-28 sm:min-h-[calc(100vh-4.5rem)] sm:pb-24">
        <div className="relative z-20 flex flex-1 flex-col pt-[48vh] sm:block sm:pt-0 lg:ml-auto lg:w-full lg:max-w-[88%]">
          <motion.h1
            className="pointer-events-none relative z-20 block sm:hidden"
            aria-label="Creative Web Studio"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            <motion.span
              className={`block text-center text-[#EEEEF2] ${mobileHeroDisplay}`}
              variants={fade}
            >
              Creative
            </motion.span>
            <span className="flex items-baseline justify-between gap-3">
              <motion.span
                className={`inline-block text-accent ${mobileHeroDisplay}`}
                variants={fade}
              >
                Web
              </motion.span>
              <motion.span
                className={`inline-block text-[#EEEEF2] ${mobileHeroDisplay}`}
                variants={fade}
              >
                Studio
              </motion.span>
            </span>
          </motion.h1>

          <motion.h1
            className="pointer-events-none relative z-20 hidden pt-6 text-right sm:block lg:pt-10"
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
            className="pointer-events-auto relative z-10 mt-10 flex justify-start sm:mt-12 sm:justify-end lg:mt-14"
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Link
              href={heroLatestProject.href}
              className="group flex min-h-20 w-full max-w-full items-center justify-between gap-4 rounded-md border border-foreground/14 bg-background px-8 py-4 transition hover:border-foreground/25 sm:min-h-0 sm:w-fit sm:justify-start sm:rounded-none sm:px-5 sm:py-3"
            >
              <span className="shrink-0 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-foreground sm:text-[0.62rem] sm:tracking-[0.28em] sm:text-foreground/50">
                {heroLatestProject.label}
              </span>
              <span
                className="h-px w-7 shrink-0 bg-foreground/28 transition group-hover:w-10 group-hover:bg-foreground/40 sm:w-28 lg:w-40"
                aria-hidden="true"
              />
              <span
                className="text-foreground/50 sm:inline"
                aria-hidden="true"
              >
                -&gt;
              </span>
              <span className="hidden truncate text-xs font-bold uppercase tracking-[0.12em] text-foreground sm:inline sm:text-sm">
                {heroLatestProject.title}
              </span>
            </Link>
          </motion.div>
        </div>

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
        className="fixed bottom-4 right-5 z-40 grid size-[4.75rem] place-items-center rounded-full bg-accent text-foreground shadow-none transition hover:scale-105 sm:bottom-6 sm:right-6 sm:size-12 lg:bottom-8 lg:right-8 lg:size-14"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        aria-label="Start a project"
      >
        <Pencil className="size-7 sm:size-5 lg:size-6" />
      </motion.a>
    </section>
  );
}
