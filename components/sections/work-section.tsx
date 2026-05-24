import { ArrowUpRight } from "lucide-react";

import { projects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function WorkSection() {
  return (
    <section id="work" className="section-spacing border-b border-white/10">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Selected direction"
              title="Bold systems for websites, launches, and social presence."
            />
          </Reveal>

          <div className="space-y-4">
            {projects.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.06}>
                <article className="animated-border studio-card group grid gap-6 rounded-3xl p-5 transition hover:-translate-y-1 md:grid-cols-[190px_1fr_auto] md:items-center">
                  <div className={`aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br ${project.accent}`} />
                  <div>
                    <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-white/44">
                      <span>{project.type}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{project.name}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-white/58">
                      {project.summary}
                    </p>
                  </div>
                  <div className="grid size-12 place-items-center rounded-full border border-white/12 text-white transition group-hover:border-cyan group-hover:bg-cyan group-hover:text-[#03040a]">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
