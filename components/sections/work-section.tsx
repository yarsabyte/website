"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { projects, projectsIntro } from "@/data/projects";

const revealEase = [0.22, 1, 0.36, 1] as const;

export function WorkSection() {
  const featured = projects[0];

  return (
    <section
      id="work"
      className="relative min-h-screen overflow-hidden bg-background px-6 py-24 lg:min-h-[calc(100vh-1.5rem)] lg:px-16 lg:pb-0 lg:pt-12"
    >
      <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-[90rem] flex-col lg:min-h-[calc(100vh-5rem)]">
        <div className="hidden min-h-[36vh] lg:block" aria-hidden="true" />

        <div
          className="hidden items-center px-[8%] lg:flex"
          aria-hidden="true"
        >
          <span className="size-3.5 rounded-full border border-foreground/90" />
          <span className="h-px flex-1 bg-foreground/80" />
          <span className="size-3.5 rounded-full border border-foreground/90" />
        </div>

        <div className="grid gap-10 pb-10 pt-10 lg:grid-cols-[0.46fr_0.54fr] lg:items-start lg:pb-0 lg:pt-6">
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
                {projectsIntro.eyebrow}
              </p>
            </div>

            <h2 className="mt-14 max-w-[35rem] text-[clamp(4.4rem,10vw,12rem)] font-normal uppercase leading-[0.9] tracking-normal text-foreground">
              Recent
              <br />
              Work
              <span className="ml-4 inline-block size-3 translate-y-[-0.3em] rounded-sm bg-accent sm:size-4" />
            </h2>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.82, delay: 0.08, ease: revealEase }}
            className="group relative overflow-hidden rounded-2xl bg-[#292d50] shadow-[0_22px_70px_rgba(7,9,28,0.16)]"
          >
            <a
              href="#contact"
              className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <div className="relative aspect-[1.62/1] min-h-[19rem] overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(10,13,35,0.92),rgba(33,37,68,0.38)_42%,rgba(214,47,73,0.42)),radial-gradient(circle_at_73%_32%,rgba(238,238,242,0.78),transparent_10rem),radial-gradient(circle_at_18%_72%,rgba(214,47,73,0.74),transparent_9rem)] transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-x-8 top-8 flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/72">
                  <span>{featured.category}</span>
                  <span>{featured.year}</span>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                    {featured.label}
                  </p>
                  <h3 className="mt-3 max-w-xl text-4xl font-normal uppercase leading-[0.95] text-foreground sm:text-6xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-6 text-foreground/74">
                    {featured.summary}
                  </p>
                </div>
                <span className="absolute bottom-8 right-8 grid size-12 place-items-center rounded-full bg-accent text-foreground transition group-hover:scale-105">
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </span>
              </div>
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
