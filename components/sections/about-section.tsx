"use client";

import Link from "next/link";

import { aboutIntro } from "@/data/about";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden border-b border-foreground/10 bg-background px-6 py-24 lg:min-h-[calc(100vh-1.5rem)] lg:px-16 lg:py-9"
    >
      <div className="grid min-h-[calc(100vh-12rem)] gap-12 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[8rem_22rem_1fr_6rem] lg:gap-8">
        <div aria-hidden="true" />

        <div className="flex items-start gap-3 pt-1">
          <span className="mt-1.5 grid size-4 place-items-center rounded-full border border-foreground/20">
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90">
            {aboutIntro.eyebrow}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[20rem_1fr]">
          <p className="max-w-xs text-xl font-semibold uppercase leading-tight text-foreground sm:text-2xl lg:text-[1.35rem]">
            Sajilo Studio builds practical digital presence for local businesses,
            creators, and teams ready to look credible online.
          </p>

          <div>
            <h2 className="max-w-5xl text-[clamp(3.2rem,7.2vw,7rem)] font-normal uppercase leading-[0.98] tracking-normal text-foreground">
              Delivering thoughtful design, development, and launch support with
              digital systems that move brands forward.
            </h2>
          </div>
        </div>

        <div aria-hidden="true" />
      </div>

      <nav
        className="mt-16 flex flex-wrap gap-12 pl-0 text-sm font-semibold uppercase tracking-[0.14em] text-foreground lg:ml-[calc(8rem+22rem+4rem)] lg:mt-0"
        aria-label="About section links"
      >
        <Link
          href="#about"
          className="border-b border-foreground pb-3 transition hover:border-accent hover:text-accent"
        >
          About us
        </Link>
        <Link
          href="#services"
          className="border-b border-foreground pb-3 transition hover:border-accent hover:text-accent"
        >
          Services
        </Link>
      </nav>
    </section>
  );
}
