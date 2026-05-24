import { Quote, ShieldCheck } from "lucide-react";

import { testimonials, testimonialsIntro } from "@/data/testimonials";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-spacing border-b border-foreground/10 bg-background/30">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={testimonialsIntro.eyebrow}
            title={
              <>
                Built to hold real client proof as Sajilo Studio{" "}
                <GradientText>grows.</GradientText>
              </>
            }
            description={testimonialsIntro.description}
          />
        </Reveal>

        {/* Transparency Alert Banner to build high trust */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-col sm:flex-row items-start gap-4 rounded-3xl border border-sky/12 bg-sky/[0.03] p-5 max-w-3xl">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky/10 text-sky shadow-[0_0_15px_rgba(98,176,255,0.1)]">
              <ShieldCheck className="size-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold tracking-wide text-foreground">
                Our Transparency Promise
              </p>
              <p className="text-xs leading-relaxed text-foreground/60">
                Sajilo Studio is a newly launched digital partner. We choose not to showcase fake reviews or fabricate client numbers. The cards below are interactive previews ready for real client quotes. Want to be one of our first partners? Let&apos;s start a project today.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item, index) => {
            const initials = item.author
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase();

            return (
              <Reveal key={item.author} delay={index * 0.12}>
                <figure className="studio-card group relative min-h-76 overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(214,47,73,0.04)]">
                  {/* Floating Quotation Mark Icon */}
                  <Quote 
                    className="absolute right-6 bottom-6 size-24 text-foreground/[0.02] transition-colors duration-500 group-hover:text-foreground/[0.04]" 
                    aria-hidden="true"
                  />
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                      {item.label}
                    </span>
                  </div>

                  <blockquote className="mt-6 text-xl font-medium leading-relaxed text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-8 flex items-center gap-4 border-t border-foreground/5 pt-6">
                    <div className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky/20 to-blue/20 border border-sky/30 text-xs font-black text-sky shadow-[0_0_20px_rgba(98,176,255,0.15)] transition-transform duration-500 group-hover:scale-105">
                      {initials}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground tracking-wide text-sm">{item.author}</p>
                      <p className="mt-0.5 text-xs text-foreground/45">{item.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

