import { CheckCircle2 } from "lucide-react";

import { aboutIntro, aboutPillars } from "@/data/about";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section id="about" className="section-spacing border-b border-foreground/10 bg-background/20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -left-48 top-1/4 size-96 rounded-full bg-accent/3 blur-[120px] pointer-events-none" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.68fr] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow={aboutIntro.eyebrow}
              title={
                <>
                  A modern digital partner for Nepali businesses ready to{" "}
                  <GradientText>look professional online.</GradientText>
                </>
              }
              description={aboutIntro.description}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="studio-card group relative overflow-hidden rounded-[2rem] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(98,176,255,0.04)]">
              {/* Internal glow overlay */}
              <div className="absolute -right-8 -top-8 size-24 rounded-full bg-sky/5 blur-2xl transition-opacity duration-500 group-hover:bg-sky/8" />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">
                What we combine
              </p>
              <p className="mt-4 text-xl font-bold leading-snug text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
                Design, development, content, and setup support under one practical
                studio workflow.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {aboutPillars.map((pillar, index) => (
            <Reveal key={pillar} delay={index * 0.08}>
              <div className="studio-card group flex min-h-44 gap-4 rounded-[2rem] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-sky/20 hover:shadow-[0_15px_40px_rgba(98,176,255,0.03)]">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-sky shadow-[0_0_10px_rgba(98,176,255,0.15)] transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                <p className="text-sm leading-7 text-foreground/60 transition-colors duration-300 group-hover:text-foreground/80">{pillar}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

