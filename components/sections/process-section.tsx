"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { processIntro, processSteps } from "@/data/process";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          "[data-timeline-desktop]",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 66%",
              end: "45% 55%",
              scrub: 0.6,
            },
          }
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          "[data-timeline-mobile]",
          { scaleY: 0, transformOrigin: "center top" },
          {
            scaleY: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 72%",
              end: "bottom 88%",
              scrub: 0.6,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="process"
      className="section-spacing border-b border-foreground/10 bg-background"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={processIntro.eyebrow}
            title={
              <>
                A clear path from rough idea to polished{" "}
                <GradientText>digital presence.</GradientText>
              </>
            }
            description={processIntro.description}
          />
        </Reveal>

        <div className="relative mt-16 grid gap-8 lg:grid-cols-4 lg:gap-6">
          {/* Vertical connecting line on mobile, horizontal on desktop */}
          <div 
            data-timeline-mobile
            className="absolute left-10 top-10 bottom-10 w-[2px] bg-sky/40 lg:hidden" 
            aria-hidden="true"
          />
          <div 
            data-timeline-desktop
            className="absolute left-10 right-10 top-[3.25rem] h-[2px] bg-sky/40 hidden lg:block" 
            aria-hidden="true"
          />

          {processSteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.1}>
              <article className="studio-card group relative min-h-[22rem] rounded-[2rem] p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(123,160,91,0.08)] pl-20 lg:pl-7">
                {/* Decorative background hover glow */}
                <div className="absolute -right-12 -top-12 size-36 rounded-full bg-blue/5 blur-3xl transition-opacity duration-500 group-hover:bg-blue/8" />

                {/* Number Badge */}
                <div className="absolute left-4 top-7 lg:relative lg:left-0 lg:top-0 z-10 flex size-12 shrink-0 items-center justify-center">
                  <span className="grid size-12 place-items-center rounded-full border border-sky/30 bg-background text-sm font-black text-sky shadow-[0_0_20px_rgba(123,160,91,0.16)] transition-all duration-500 group-hover:border-sky group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(123,160,91,0.32)]">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-8 lg:mt-14 text-2xl font-black uppercase tracking-wide text-foreground transition-colors duration-300 group-hover:gradient-text">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/60 transition-colors duration-300 group-hover:text-foreground/85">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
