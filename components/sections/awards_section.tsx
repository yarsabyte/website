"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const revealEase = [0.22, 1, 0.36, 1] as const;

const awards = [
  {
    label: "Recognition",
    title: "Website of the week",
    detail:
      "Focused landing pages with contact paths, trust cues, and fast delivery.",
    location: "Butwal",
    year: "2026",
  },
  {
    label: "Recognition",
    title: "Design award",
    detail:
      "Reusable visual systems for brands that need to look credible online.",
    location: "Butwal",
    year: "2026",
  },
  {
    label: "Recognition",
    title: "Innovation award",
    detail:
      "Launch assets, posters, and motion-led campaigns with a clear handoff.",
    location: "Butwal",
    year: "2026",
  },
  {
    label: "Recognition",
    title: "Digital setup",
    detail: "Domains, email, analytics, and practical guidance after the launch.",
    location: "Butwal",
    year: "2026",
  },
] as const;

function MiniMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block size-3 bg-accent [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]",
        className,
      )}
      aria-hidden="true"
    />
  );
}

export function AwardsSection() {
  const [staggerDirection, setStaggerDirection] = useState<1 | -1>(1);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>(".site-frame");
    const target: HTMLElement | Window = scroller ?? window;
    let lastScrollTop = scroller?.scrollTop ?? window.scrollY;

    const onScroll = () => {
      const currentScrollTop = scroller?.scrollTop ?? window.scrollY;
      if (currentScrollTop === lastScrollTop) {
        return;
      }

      setStaggerDirection(currentScrollTop < lastScrollTop ? -1 : 1);
      lastScrollTop = currentScrollTop;
    };

    target.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      target.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="awards"
      className="relative min-h-screen overflow-hidden bg-transparent px-6 py-24 text-foreground lg:min-h-[calc(100vh-1.5rem)] lg:px-16 lg:py-16"
    >
      <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-[90rem] flex-col lg:min-h-[calc(100vh-5rem)]">
        <div className="hidden min-h-[36vh] lg:block" aria-hidden="true" />

        <div className="hidden items-center px-[8%] lg:flex" aria-hidden="true">
          <span className="size-3.5 rounded-full border border-foreground/90" />
          <span className="h-px flex-1 bg-foreground/80" />
          <span className="size-3.5 rounded-full border border-foreground/90" />
        </div>

        <div className="flex flex-col gap-12 pb-10 pt-10 lg:gap-16 lg:pb-0 lg:pt-6">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.72, ease: revealEase }}
            className="lg:pt-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
                <span className="size-1.5 rounded-full bg-accent" />
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90">
                Awards spotlight
              </p>
            </div>

            <h2 className="mt-14 max-w-[35rem] text-[clamp(4.4rem,7vw,11rem)] font-normal uppercase leading-[0.9] tracking-normal text-foreground">
              Awards
              <br />
              Recognition
              <span className="ml-4 inline-block size-3 translate-y-[-0.3em] rounded-sm bg-accent sm:size-4" />
            </h2>
            <p className="mt-8 max-w-md text-base leading-7 text-foreground/68">
              Recognized for clear direction, thoughtful systems, and delivery
              that feels polished long after launch day.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: {},
              show: (direction: 1 | -1) => ({
                transition: {
                  staggerChildren: 0.12,
                  staggerDirection: direction,
                },
              }),
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3, margin: "-10% 0px" }}
            className="grid gap-5 lg:grid-cols-2 lg:gap-6"
            custom={staggerDirection}
          >
            {awards.map((award, index) => (
              <motion.article
                key={award.title}
                variants={{
                  hidden: { opacity: 0, y: 26, scale: 0.96 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.55, ease: revealEase },
                  },
                }}
                className="brand-preview-surface relative overflow-hidden rounded-2xl border border-foreground/10 shadow-[0_22px_70px_rgba(0,0,0,0.18)]"
              >
                <div className="relative z-10 flex min-h-[18rem] flex-col justify-between p-6 sm:min-h-[20rem] sm:p-8">
                  <div className="flex items-center justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/68">
                    <span>{award.label}</span>
                    <span>{award.year}</span>
                  </div>

                  <div className="py-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      {award.location}
                    </p>
                    <h3 className="mt-3 max-w-xl text-3xl font-normal uppercase leading-[0.95] text-foreground sm:text-4xl">
                      {award.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-sm leading-6 text-foreground/72">
                      {award.detail}
                    </p>
                  </div>

                  <span className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-foreground/60">
                    0{index + 1}
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
