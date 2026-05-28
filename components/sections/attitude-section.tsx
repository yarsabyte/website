"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { attitudeCards } from "@/data/attitude";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sectionStyle = {
  "--attitude-fill": "0%",
} as CSSProperties;

export function AttitudeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const section = sectionRef.current;
      const track = trackRef.current;
      const scroller = document.querySelector<HTMLElement>(".site-frame");

      if (!section || !track || !scroller) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const scrollAmount = () =>
          Math.max(0, track.scrollWidth - scroller.clientWidth + 160);

        const animation = gsap.to(track, {
          x: () => -scrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scroller,
            start: "top top",
            end: () => `+=${Math.max(1200, scrollAmount() + window.innerHeight * 0.65)}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const fill = Math.sin(self.progress * Math.PI) * 100;
              section.style.setProperty("--attitude-fill", `${fill}%`);
            },
            onLeave: () => {
              section.style.setProperty("--attitude-fill", "0%");
            },
            onLeaveBack: () => {
              section.style.setProperty("--attitude-fill", "0%");
            },
          },
        });

        return () => {
          animation.scrollTrigger?.kill();
          animation.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="attitude"
      style={sectionStyle}
      className="relative overflow-hidden bg-background px-5 py-20 text-foreground lg:min-h-[calc(100vh-1.5rem)] lg:px-16 lg:py-0"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden" aria-hidden="true">
        <h2 className="font-display select-none whitespace-nowrap text-[clamp(7rem,21vw,28rem)] uppercase leading-none text-foreground/[0.055]">
          attitude
        </h2>
        <h2
          className="font-display absolute select-none whitespace-nowrap text-[clamp(7rem,21vw,28rem)] uppercase leading-none text-accent"
          style={{ clipPath: "inset(0 calc(100% - var(--attitude-fill)) 0 0)" }}
        >
          attitude
        </h2>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[34rem] w-full max-w-[98rem] flex-col justify-center lg:min-h-[calc(100vh-1.5rem)]">
        <div className="mb-10 flex items-center gap-3 lg:absolute lg:left-0 lg:top-14 lg:mb-0">
          <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90">
            Attitude
          </p>
        </div>

        <div className="-mx-5 overflow-x-auto px-5 pb-4 scrollbar-none lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
          <div
            ref={trackRef}
            className="flex w-max gap-5 will-change-transform lg:gap-8"
          >
            {attitudeCards.map((card, index) => (
              <article
                key={card.title}
                className="relative min-h-[25rem] w-[min(82vw,25rem)] shrink-0 rounded-2xl border border-foreground/10 bg-[color-mix(in_srgb,var(--background)_86%,var(--foreground)_6%)] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur sm:w-[27rem] lg:min-h-[30rem] lg:w-[34rem] lg:p-10"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
                    <span className="size-1.5 rounded-full bg-accent" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/88">
                    {card.rule}
                  </p>
                </div>

                <h3 className="font-display mt-8 text-[clamp(3.1rem,6vw,5.8rem)] uppercase leading-[0.86] text-foreground">
                  {card.title}
                </h3>

                <p className="mt-16 max-w-md text-base font-semibold leading-7 text-foreground/62 lg:mt-20 lg:text-lg lg:leading-8">
                  {card.description}
                </p>

                <span
                  className="font-display absolute bottom-6 right-8 text-7xl leading-none text-accent/10"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
