"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Pencil } from "lucide-react";

import { HeroSphere } from "@/components/hero-sphere";
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
        className="studio-container relative flex min-h-[calc(100vh-4.5rem)] flex-col justify-center py-10 lg:py-16"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-6">
          <motion.div
            className="order-2 flex justify-center lg:order-1 lg:justify-start"
            variants={fadeUp}
          >
            <HeroSphere />
          </motion.div>

          <div className="order-1 lg:order-2">
            <h1 className="font-display uppercase leading-[0.86] text-foreground">
              <motion.span
                className="block text-[clamp(3.4rem,11vw,7.5rem)] font-black tracking-[-0.02em]"
                variants={fadeUp}
              >
                Creative{" "}
                <span className="text-accent">Sajilo</span>
              </motion.span>
              <motion.span
                className="block text-right text-[clamp(3.4rem,11vw,7.5rem)] font-black tracking-[-0.02em]"
                variants={fadeUp}
              >
                Studio
              </motion.span>
            </h1>

            <motion.div variants={fadeUp}>
              <Link
                href={heroLatestProject.href}
                className="group mt-8 inline-flex items-center gap-4 border border-foreground/12 bg-foreground/[0.03] px-5 py-3 transition hover:border-foreground/22 hover:bg-foreground/[0.06]"
              >
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-foreground/50">
                  {heroLatestProject.label}
                </span>
                <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-foreground">
                  {heroLatestProject.title}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          </div>
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

      <motion.p
        className="absolute bottom-8 right-6 hidden max-w-xs text-right text-[0.58rem] font-medium uppercase leading-[1.9] tracking-[0.18em] text-foreground/42 lg:block xl:right-10 xl:max-w-sm xl:text-[0.62rem]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.85 }}
      >
        {heroMission}
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
