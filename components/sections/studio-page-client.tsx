"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  studioCrew,
  studioPrinciples,
  studioStats,
  studioTimeline,
} from "@/data/studio-pages";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";

const ease = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease },
  },
};

function SplitWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          initial={{ opacity: 0, y: "0.65em", rotateX: -55 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.68, delay: 0.08 + index * 0.045, ease }}
        >
          {word}
          {index === text.split(" ").length - 1 ? null : "\u00a0"}
        </motion.span>
      ))}
    </>
  );
}

function HexGlyph({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block bg-accent [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)] ${className}`}
      aria-hidden="true"
    />
  );
}

function StudioOrbital() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[28rem]"
      initial={{ opacity: 0, scale: 0.86, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-foreground/12"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 26, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[10%] rounded-full border border-dashed border-accent/36"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-[22%] grid place-items-center rounded-full border border-foreground/10 bg-foreground/[0.045] backdrop-blur">
        <Image
          src="/logo.svg"
          alt=""
          width={132}
          height={132}
          className="h-24 w-24 object-contain"
          priority
        />
      </div>
      {["Design", "Build", "Motion", "Launch"].map((label, index) => (
        <motion.span
          key={label}
          className="absolute grid h-16 w-28 place-items-center rounded-full border border-foreground/10 bg-background/86 text-xs font-black uppercase tracking-[0.16em] text-foreground shadow-[0_16px_50px_rgba(0,0,0,0.22)]"
          style={{
            left: index % 2 === 0 ? "0%" : "auto",
            right: index % 2 === 0 ? "auto" : "0%",
            top: index < 2 ? "11%" : "auto",
            bottom: index < 2 ? "auto" : "11%",
          }}
          animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 3.5, delay: index * 0.25, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {label}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function StudioPageClient() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden">
      <section className="relative min-h-dvh overflow-hidden border-b border-foreground/10 pt-28">
        <div className="service-grid-surface absolute inset-0 opacity-25" aria-hidden="true" />
        <motion.div
          className="absolute left-[-10%] top-24 h-14 w-[140%] -rotate-2 border-y border-foreground/10 bg-accent text-background"
          animate={reduceMotion ? undefined : { x: ["0%", "-10%"] }}
          transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          <div className="flex h-full items-center gap-8 whitespace-nowrap text-xl font-black uppercase">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index}>Yarsa Byte Studio / Strategy / Motion / Launch</span>
            ))}
          </div>
        </motion.div>

        <Container className="relative z-10 grid min-h-[calc(100dvh-7rem)] content-end gap-12 pb-12 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg"
            >
              A small digital studio mixing useful strategy, expressive motion,
              and clean development for businesses that need to look trusted fast.
            </motion.p>

            <h1 className="mt-8 max-w-[14ch] text-[clamp(3.2rem,10.8vw,10.5rem)] font-black uppercase leading-[0.84] text-foreground">
              <SplitWords text="Minds mettle magic" />
              <HexGlyph className="ml-[0.08em] size-[0.16em] min-h-4 min-w-4 translate-y-[-0.04em]" />
            </h1>

            <div className="mt-9 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {studioStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + index * 0.06, ease }}
                  className="border border-foreground/10 bg-foreground/[0.035] p-4"
                >
                  <p className="font-display text-3xl uppercase leading-none text-accent">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase leading-5 tracking-[0.14em] text-foreground/58">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <a
              href="#studio-story"
              className="mt-10 inline-flex size-14 items-center justify-center rounded-full border border-foreground/12 bg-foreground/[0.05] text-foreground transition hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label="Jump to studio story"
            >
              <ArrowDown className="size-5" aria-hidden="true" />
            </a>
          </div>

          <StudioOrbital />
        </Container>
      </section>

      <section id="studio-story" className="section-spacing relative border-b border-foreground/10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <motion.div
              variants={rise}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-12% 0px" }}
              className="sticky top-24"
            >
              <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
                Creative Studio
              </p>
              <h2 className="mt-5 text-[clamp(2.8rem,6vw,6.5rem)] font-black uppercase leading-[0.86] text-foreground">
                Useful work with a pulse.
              </h2>
            </motion.div>

            <div className="grid gap-5">
              {studioPrinciples.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, x: 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.62, delay: index * 0.06, ease }}
                  className="group relative overflow-hidden border border-foreground/10 bg-foreground/[0.035] p-6 transition hover:border-accent/55 hover:bg-foreground/[0.06] sm:p-8"
                >
                  <div className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-accent transition duration-500 group-hover:scale-y-100" />
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-display text-3xl uppercase leading-none text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/64">
                        {item.text}
                      </p>
                    </div>
                    <span className="font-display text-5xl text-foreground/10">0{index + 1}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-foreground/10 py-10">
        <motion.div
          className="flex w-max gap-8 whitespace-nowrap text-[clamp(2.5rem,7vw,8rem)] font-black uppercase leading-none text-foreground/14"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          {[...studioCrew, ...studioCrew, ...studioCrew].map((member, index) => (
            <span key={`${member.initials}-${index}`} className="inline-flex items-center gap-6">
              <Sparkles className="size-8 text-accent/50" />
              {member.name}
            </span>
          ))}
        </motion.div>
      </section>

      <section className="section-spacing border-b border-foreground/10">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-sky">
                The team shape
              </p>
              <h2 className="mt-4 text-[clamp(2.8rem,6vw,6rem)] font-black uppercase leading-[0.88]">
                One studio, many hands.
              </h2>
            </div>
            <PremiumButton href="/contact">Start with us</PremiumButton>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {studioCrew.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 30, rotate: -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                whileHover={{ y: -10, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.58, delay: index * 0.05, ease }}
                className="group min-h-[22rem] overflow-hidden border border-foreground/10 bg-foreground/[0.035] p-5"
              >
                <div className="grid aspect-square place-items-center overflow-hidden bg-accent text-background">
                  <motion.span
                    className="font-display text-[clamp(3.5rem,7vw,6.4rem)] leading-none"
                    animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                    transition={reduceMotion ? undefined : { duration: 3.2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {member.initials}
                  </motion.span>
                </div>
                <h3 className="mt-6 font-display text-3xl uppercase leading-none text-foreground">
                  {member.name}
                </h3>
                <p className="mt-3 text-sm font-semibold uppercase leading-6 tracking-[0.12em] text-foreground/54">
                  {member.role}
                </p>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing border-b border-foreground/10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
                Manifesto
              </p>
              <h2 className="mt-5 text-[clamp(2.8rem,6vw,6.2rem)] font-black uppercase leading-[0.86]">
                Create, learn, launch, repeat.
              </h2>
            </div>

            <div className="grid gap-4">
              {studioTimeline.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.56, delay: index * 0.05, ease }}
                  className="grid gap-4 border border-foreground/10 bg-foreground/[0.035] p-5 sm:grid-cols-[7rem_1fr]"
                >
                  <div className="font-display text-6xl leading-none text-accent">{item.year}</div>
                  <div>
                    <h3 className="font-display text-3xl uppercase leading-none">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-8 text-foreground/64">
                      {item.text}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-sky">
                Recent proof
              </p>
              <h2 className="mt-4 text-[clamp(2.8rem,6vw,6.5rem)] font-black uppercase leading-[0.86]">
                Latest and greatest.
              </h2>
            </div>
            <div className="grid gap-3">
              {projects.slice(0, 2).map((project) => (
                <Link
                  key={project.href}
                  href="/work"
                  className="group flex min-h-24 items-center justify-between gap-5 border border-foreground/10 bg-foreground/[0.035] p-4 transition hover:border-accent/55 hover:bg-accent hover:text-background"
                >
                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.18em] text-current/55">
                      {project.category}
                    </span>
                    <span className="mt-2 block font-display text-2xl uppercase leading-none">
                      {project.title}
                    </span>
                  </span>
                  <ArrowUpRight className="size-6 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
