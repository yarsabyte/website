"use client";

import { useRef } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

import { stats } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-hero-line]", {
        yPercent: 110,
        rotate: 4,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
      });

      gsap.from("[data-hero-fade]", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.35,
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative isolate min-h-screen overflow-hidden border-b border-white/10 pt-28"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(245,245,220,0.12),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.12),#050505_78%)]" />

      <Container className="grid min-h-[calc(100vh-7rem)] items-end gap-12 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:pb-14">
        <div className="pb-4">
          <div data-hero-fade>
            <Eyebrow>Digital presence for next Nepali businesses</Eyebrow>
          </div>

          <h1 className="mt-7 max-w-5xl overflow-hidden text-6xl font-black uppercase leading-[0.82] text-white sm:text-7xl lg:text-8xl xl:text-9xl">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                Premium
              </span>
            </span>
            <span className="block overflow-hidden text-lime-300">
              <span data-hero-line className="block">
                digital
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                made sajilo.
              </span>
            </span>
          </h1>

          <div className="mt-8 grid gap-6 text-white/68 md:grid-cols-[1fr_auto] md:items-end">
            <p data-hero-fade className="max-w-xl text-lg leading-8">
              Sajilo Studio builds websites, portfolio systems, posters, video edits,
              reels, branding, and launch-ready digital setups for Nepali businesses
              that want to look sharp online.
            </p>
            <div data-hero-fade className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-lime-300 px-5 text-sm font-bold text-black transition hover:bg-white"
              >
                Build my presence
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#work"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/16 px-5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/[0.08]"
              >
                <Play className="size-4 fill-white" aria-hidden="true" />
                See work
              </a>
            </div>
          </div>
        </div>

        <motion.div
          data-hero-fade
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="relative min-h-[440px] overflow-hidden rounded-[2rem] border border-white/12 bg-[#111] p-5 shadow-2xl shadow-black"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(217,255,85,0.16),transparent_42%),linear-gradient(315deg,rgba(255,111,89,0.16),transparent_38%)]" />
          <div className="relative flex h-full min-h-[400px] flex-col justify-between rounded-[1.4rem] border border-white/10 bg-black/62 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">
                Launch board
              </span>
              <span className="rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-black">
                Live
              </span>
            </div>
            <div className="space-y-4">
              {["Website", "Brand Kit", "Poster Set", "Reels"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ width: "38%" }}
                  animate={{ width: `${88 - index * 12}%` }}
                  transition={{
                    duration: 1.1,
                    delay: 0.85 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-14 rounded-full border border-white/10 bg-white/[0.07] px-5"
                >
                  <div className="flex h-full items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white">{item}</span>
                    <span className="text-xs text-lime-200">Ready</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/[0.06] p-3">
                  <p className="text-2xl font-black text-white">{item.value}</p>
                  <p className="mt-1 text-xs leading-4 text-white/52">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
