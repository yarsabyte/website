"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

import { stats } from "@/data/stats";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionLabel } from "@/components/ui/section-label";

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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_20%,rgba(100,233,255,0.2),transparent_28%),radial-gradient(circle_at_74%_12%,rgba(155,107,255,0.22),transparent_32%),linear-gradient(180deg,rgba(4,5,10,0.12),#04050a_82%)]" />
      <div className="absolute bottom-0 left-1/2 -z-10 h-px w-[88vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />

      <Container className="grid min-h-[calc(100vh-7rem)] items-end gap-12 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:pb-14">
        <div className="pb-4">
          <div data-hero-fade>
            <SectionLabel>Digital presence for next Nepali businesses</SectionLabel>
          </div>

          <h1 className="mt-7 max-w-5xl overflow-hidden text-6xl font-black uppercase leading-[0.82] text-white text-balance sm:text-7xl lg:text-8xl xl:text-9xl">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                Premium
              </span>
            </span>{" "}
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                <GradientText>digital</GradientText>
              </span>
            </span>{" "}
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
              <PremiumButton href="#contact">Build my presence</PremiumButton>
              <PremiumButton href="#work" variant="ghost" showIcon={false}>
                <Play className="size-4 fill-white" aria-hidden="true" />
                See work
              </PremiumButton>
            </div>
          </div>
        </div>

        <motion.div
          data-hero-fade
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="animated-border studio-card relative min-h-[440px] overflow-hidden rounded-[2rem] p-px shadow-2xl shadow-black"
        >
          <div className="relative flex h-full min-h-[438px] flex-col justify-between rounded-[calc(2rem-1px)] bg-[#070913]/88 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">
                Launch board
              </span>
              <span className="rounded-full bg-amber px-3 py-1 text-xs font-black text-[#03040a]">
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
                  className="h-14 rounded-full border border-white/10 bg-white/[0.07] px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                  <div className="flex h-full items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white">{item}</span>
                    <span className="text-xs text-cyan">Ready</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
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
