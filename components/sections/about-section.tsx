import { CheckCircle2 } from "lucide-react";

import { aboutIntro, aboutPillars } from "@/data/about";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section id="about" className="section-spacing border-b border-white/10">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.92fr_0.58fr] lg:items-end">
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
            <div className="studio-card rounded-[1.75rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                What we combine
              </p>
              <p className="mt-5 text-2xl font-semibold leading-snug text-white">
                Design, development, content, and setup support under one practical
                studio workflow.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {aboutPillars.map((pillar, index) => (
            <Reveal key={pillar} delay={index * 0.06}>
              <div className="studio-card flex min-h-40 gap-4 rounded-3xl p-5">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-cyan" aria-hidden="true" />
                <p className="text-sm leading-7 text-white/66">{pillar}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
