"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Pencil } from "lucide-react";

import { heroLatestProject, heroMission } from "@/data/hero";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#14183a] pt-[4.5rem]">
      <motion.div
        className="studio-container relative flex min-h-[calc(100vh-4.5rem)] flex-col justify-center py-12 lg:py-16"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col gap-10">
          <h1 className="font-tunnels-bold uppercase text-[#EEEEF2]">
            <motion.span
              className="block"
              variants={fadeUp}
            >
              <span className="flex flex-wrap items-baseline justify-between gap-x-6">
                <span
                  className="text-[clamp(4.5rem,13vw,14.7rem)] leading-[0.8] tracking-[-0.02em]"
                >
                  Creative
                </span>
                <span
                  className="text-[clamp(4.5rem,13vw,14.7rem)] leading-[0.8] tracking-[-0.02em] text-accent"
                >
                  Sajilo
                </span>
              </span>
            </motion.span>
            <motion.span
              className="mt-2 block text-center text-[clamp(4.5rem,13vw,14.7rem)] leading-[0.8] tracking-[-0.02em]"
              variants={fadeUp}
            >
              Studio
            </motion.span>
          </h1>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 lg:justify-between">
            <Link
              href={heroLatestProject.href}
              className="group inline-flex items-center gap-4 border border-foreground/12 bg-foreground/[0.03] px-5 py-3 transition hover:border-foreground/22 hover:bg-foreground/[0.06]"
            >
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-foreground/50">
                {heroLatestProject.label}
              </span>
              <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-foreground">
                {heroLatestProject.title}
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </Link>

            <p className="max-w-xl text-center text-xs font-semibold uppercase leading-[1.9] tracking-[0.18em] text-foreground/55 lg:text-right">
              {heroMission}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.p
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-foreground/55 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        aria-hidden="true"
      >
        [ Scroll ]
      </motion.p>

      <motion.a
        href="#contact"
        className={cn(
          "fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-accent text-foreground transition hover:scale-105 lg:bottom-8 lg:right-8 lg:size-14",
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5, type: "spring", stiffness: 260, damping: 18 }}
        aria-label="Start a project"
      >
        <Pencil className="size-5 lg:size-6" />
      </motion.a>
    </section>
  );
}
