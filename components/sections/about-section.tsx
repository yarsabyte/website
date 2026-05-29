"use client";

import Link from "next/link";

import { aboutIntro } from "@/data/about";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-transparent px-6 py-24 lg:min-h-[calc(100vh-1.5rem)] lg:px-16 lg:pb-9 lg:pt-28"
    >
      <div className="grid min-h-[calc(100vh-12rem)] gap-12 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[6rem_16rem_1fr_2rem] lg:gap-8">
        <div className="hidden lg:block" aria-hidden="true" />
        <div className="flex items-start gap-3 pt-1">
          <span className="mt-1.5 grid size-4 place-items-center rounded-full border border-foreground/20">
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90">
            {aboutIntro.eyebrow}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <p className="max-w-xs text-xl font-semibold uppercase leading-tight text-foreground sm:text-2xl lg:text-[1.28rem]">
            Yarsa Byte builds practical digital presence for local businesses,
            creators, and teams ready to look credible online.
          </p>

          <div>
            <h2 className="max-w-5xl text-[clamp(2.75rem,3.8vw,4.7rem)] font-normal uppercase leading-[0.92] tracking-normal text-foreground 2xl:text-[clamp(4.75rem,5.1vw,6.1rem)]">
              Delivering innovative design and development with impactful digital
              campaigns that move brands forward.
            </h2>
          </div>
        </div>

        <div className="hidden lg:block" aria-hidden="true" />
      </div>

      <nav
        className="mt-16 flex flex-wrap gap-24 pl-0 text-sm font-semibold uppercase tracking-[0.14em] text-foreground lg:ml-[calc(6rem+16rem+5rem)] lg:mt-0"
        aria-label="About section links"
      >
 
      </nav>
    </section>
  );
}
