"use client";

import { useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { projects, projectsIntro } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionHeading } from "@/components/ui/section-heading";

type Project = (typeof projects)[number];

const revealEase = [0.22, 1, 0.36, 1] as const;

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[1.18/1] overflow-hidden rounded-[1.35rem] border border-foreground/10 bg-background">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-80 transition duration-700 group-hover/project:scale-110",
          project.accent,
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--foreground)_55%,transparent),transparent_10rem),linear-gradient(135deg,color-mix(in_srgb,var(--background)_0%,transparent),color-mix(in_srgb,var(--background)_64%,transparent))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--foreground)_14%,transparent)_1px,transparent_1px),linear-gradient(color-mix(in_srgb,var(--foreground)_12%,transparent)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--foreground)_22%,transparent)_0.8px,transparent_0.9px)] bg-[size:3px_3px] opacity-18" />

      {project.visual === "consultancy" ? (
        <div className="absolute inset-5 flex flex-col justify-between rounded-3xl border border-foreground/14 bg-background/34 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="h-3 w-28 rounded-full bg-foreground/70" />
            <div className="h-8 w-20 rounded-full bg-background/52" />
          </div>
          <div>
            <div className="h-14 w-4/5 rounded-2xl bg-foreground/78" />
            <div className="mt-3 h-3 w-2/3 rounded-full bg-foreground/40" />
            <div className="mt-2 h-3 w-1/2 rounded-full bg-foreground/30" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-16 rounded-2xl bg-background/42" />
            <div className="h-16 rounded-2xl bg-background/30" />
            <div className="h-16 rounded-2xl bg-background/42" />
          </div>
        </div>
      ) : null}

      {project.visual === "restaurant" ? (
        <div className="absolute inset-5 grid grid-cols-[0.82fr_1fr] gap-3">
          <div className="rounded-[1.4rem] border border-foreground/14 bg-background/36 p-3 backdrop-blur-sm">
            <div className="aspect-[4/5] rounded-2xl bg-foreground/75" />
            <div className="mt-3 h-3 w-3/4 rounded-full bg-foreground/44" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex-1 rounded-[1.4rem] border border-foreground/14 bg-background/32 p-3">
              <div className="h-8 w-20 rounded-full bg-foreground/64" />
              <div className="mt-12 h-4 w-28 rounded-full bg-foreground/44" />
            </div>
            <div className="h-24 rounded-[1.4rem] border border-foreground/14 bg-background/38" />
          </div>
        </div>
      ) : null}

      {project.visual === "portfolio" ? (
        <div className="absolute inset-5 rounded-[1.4rem] border border-foreground/14 bg-background/36 p-4 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="size-20 rounded-3xl bg-foreground/72" />
            <div className="flex-1 pt-2">
              <div className="h-5 w-3/4 rounded-full bg-foreground/66" />
              <div className="mt-3 h-3 w-1/2 rounded-full bg-foreground/36" />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="h-24 rounded-3xl bg-background/38" />
            <div className="h-24 rounded-3xl bg-background/28" />
          </div>
          <div className="mt-3 h-16 rounded-3xl bg-background/34" />
        </div>
      ) : null}

      {project.visual === "launch" ? (
        <div className="absolute inset-5 grid grid-cols-2 gap-3">
          <div className="rounded-[1.4rem] border border-foreground/14 bg-background/36 p-4 backdrop-blur-sm">
            <div className="h-4 w-20 rounded-full bg-foreground/64" />
            <div className="mt-14 h-20 rounded-3xl bg-foreground/70" />
          </div>
          <div className="space-y-3">
            <div className="h-24 rounded-[1.4rem] border border-foreground/14 bg-background/34" />
            <div className="h-24 rounded-[1.4rem] border border-foreground/14 bg-background/42" />
            <div className="h-14 rounded-full border border-foreground/14 bg-foreground/60" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const isFeatured = index === 0;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.78, delay: index * 0.07, ease: revealEase }}
      className={cn(
        "group/project animated-border studio-card relative overflow-hidden rounded-[1.75rem] p-px transition duration-300 will-change-transform",
        isFeatured ? "lg:col-span-2" : "",
      )}
      onPointerMove={(event) => {
        const target = cardRef.current;
        if (!target || window.matchMedia("(pointer: coarse)").matches) {
          return;
        }

        const rect = target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * -4;
        const rotateY = ((x - rect.width / 2) / rect.width) * 4;

        target.style.setProperty("--project-glow-x", `${x}px`);
        target.style.setProperty("--project-glow-y", `${y}px`);
        target.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      }}
      onPointerLeave={() => {
        const target = cardRef.current;
        if (!target) {
          return;
        }

        target.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--project-glow-x,50%)_var(--project-glow-y,20%),color-mix(in_srgb,var(--sky)_20%,transparent),transparent_18rem)] opacity-0 transition duration-300 group-hover/project:opacity-100" />
      <div className="relative grid h-full gap-6 rounded-[calc(1.75rem-1px)] bg-background/88 p-5 md:p-6 lg:grid-cols-[0.95fr_1fr]">
        <ProjectVisual project={project} />

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/44">
            <span className="rounded-full border border-foreground/10 px-3 py-1 text-sky">
              {project.label}
            </span>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>

          <h3
            className={cn(
              "mt-7 font-black uppercase leading-[0.94] text-foreground text-balance",
              isFeatured ? "text-4xl sm:text-5xl" : "text-3xl",
            )}
          >
            {project.title}
          </h3>
          <p className="mt-5 max-w-xl text-sm leading-7 text-foreground/62">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1 text-xs font-semibold text-foreground/58"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-9">
            <p className="text-sm leading-6 text-sky/86">{project.outcome}</p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-foreground transition group-hover/project:text-sky"
            >
              Build something like this
              <ArrowUpRight
                className="size-4 transition group-hover/project:translate-x-0.5 group-hover/project:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function WorkSection() {
  return (
    <section
      id="work"
      className="section-spacing relative overflow-hidden border-b border-foreground/10"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_30%_12%,color-mix(in_srgb,var(--blue)_16%,transparent),transparent_28rem),radial-gradient(circle_at_76%_30%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_24rem)]" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_0.55fr] lg:items-end">
          <SectionHeading
            eyebrow={projectsIntro.eyebrow}
            title={
              <>
                Sample directions for the kind of premium presence{" "}
                <GradientText>we build.</GradientText>
              </>
            }
            description={projectsIntro.description}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.7, ease: revealEase }}
            className="rounded-[1.5rem] border border-foreground/10 bg-foreground/[0.04] p-5"
          >
            <div className="flex items-center gap-3 text-sky">
              <Sparkles className="size-5" aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-[0.18em]">
                Replaceable showcase
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-foreground/58">
              Every card is structured so future screenshots, client names, and live links can
              drop in cleanly once real projects are ready.
            </p>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.72, ease: revealEase }}
          className="mt-6 grid gap-6 rounded-[1.75rem] border border-foreground/10 bg-foreground/[0.04] p-6 md:grid-cols-[1fr_auto] md:items-center"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky">
              Want your brand here next?
            </p>
            <h3 className="mt-3 text-3xl font-black uppercase leading-none text-foreground text-balance sm:text-4xl">
              Let us turn your next launch into a premium case study.
            </h3>
          </div>
          <PremiumButton href="#contact">Start a Project</PremiumButton>
        </motion.div>
      </Container>
    </section>
  );
}
