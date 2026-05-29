"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sectionStyle = {
  "--partnership-progress": "0%",
} as CSSProperties;

const awards = [
  {
    title: "Website of the week",
    detail:
      "Focused landing pages with contact paths, trust cues, and fast delivery.",
    tone: "bg-accent text-background",
    top: "24%",
    left: "5%",
    rotate: "-11deg",
    parallax: 48,
    zIndex: 20,
  },
  {
    title: "Design award",
    detail:
      "Reusable visual systems for brands that need to look credible online.",
    tone: "bg-sky text-background",
    top: "10%",
    left: "64%",
    rotate: "13deg",
    parallax: 72,
    zIndex: 22,
  },
  {
    title: "Innovation award",
    detail:
      "Launch assets, posters, and motion-led campaigns with a clear handoff.",
    tone: "bg-blue text-foreground",
    top: "4%",
    left: "36%",
    rotate: "-5deg",
    parallax: 96,
    zIndex: 18,
  },
  {
    title: "Digital setup",
    detail:
      "Domains, email, analytics, and practical guidance after the launch.",
    tone: "bg-navy text-foreground",
    top: "34%",
    left: "60%",
    rotate: "17deg",
    parallax: 56,
    zIndex: 20,
  },
] as const;

const awardLetters = [
  { char: "a", layer: "back" as const },
  { char: "w", layer: "back" as const },
  { char: "a", layer: "front" as const },
  { char: "r", layer: "front" as const },
  { char: "d", layer: "back" as const },
  { char: "s", layer: "back" as const },
];

function DotLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-4 place-items-center rounded-full border border-foreground/20">
        <span className="size-1.5 rounded-full bg-accent" />
      </span>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90">
        {children}
      </p>
    </div>
  );
}

function MiniMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block size-3 bg-accent [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]",
        className,
      )}
      aria-hidden="true"
    />
  );
}

function AwardPoster({
  award,
  index,
  className,
}: {
  award: (typeof awards)[number];
  index: number;
  className?: string;
}) {
  return (
    <article
      data-award-poster
      data-parallax={award.parallax}
      className={cn(
        "pointer-events-none aspect-[0.72] w-56 origin-center p-5 shadow-[0_28px_80px_rgba(0,0,0,0.26)] sm:w-64 lg:absolute lg:w-60 xl:w-64",
        award.tone,
        className,
      )}
      style={
        {
          top: award.top,
          left: award.left,
          zIndex: award.zIndex,
          rotate: award.rotate,
        } as CSSProperties
      }
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] opacity-75">
        Yarsa Byte / Awards 0{index + 1}
      </p>
      <h3 className="mt-8 max-w-[9ch] text-3xl font-black uppercase leading-[0.9] sm:text-4xl lg:text-4xl">
        {award.title}
      </h3>
      <p className="mt-5 text-xs font-semibold leading-5 opacity-80 lg:text-xs">
        {award.detail}
      </p>
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-black uppercase">
        <span>Butwal</span>
        <span>2026</span>
      </div>
    </article>
  );
}

function AwardLetter({ letter }: { letter: (typeof awardLetters)[number] }) {
  return (
    <span
      data-award-letter
      className={cn(
        "font-display relative inline-block text-[clamp(5.7rem,21vw,21rem)] uppercase leading-[0.72]",
        letter.layer === "front"
          ? "z-30 text-foreground/[0.105]"
          : "z-10 text-foreground/[0.075]",
      )}
    >
      {letter.char}
    </span>
  );
}

function getViewportHeight(scroller: HTMLElement | null) {
  return scroller?.clientHeight ?? window.innerHeight;
}

export function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const scroller = document.querySelector<HTMLElement>(".site-frame");
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const ctx = gsap.context(() => {
        const resetMotion = () => {
          gsap.set("[data-awards-stage]", { clearProps: "transform,opacity" });
          gsap.set("[data-award-poster]", { clearProps: "transform" });
          gsap.set("[data-partnership-intro]", {
            clearProps: "transform,opacity",
          });
          section.style.setProperty("--partnership-progress", "100%");
        };

        if (reduceMotion) {
          resetMotion();
          return;
        }

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          const intro = section.querySelector<HTMLElement>(
            "[data-partnership-intro]",
          );
          const stage = section.querySelector<HTMLElement>(
            "[data-awards-stage]",
          );

          if (!intro || !stage) {
            return;
          }

          const posters = gsap.utils.toArray<HTMLElement>(
            "[data-award-poster]",
            stage,
          );

          let timeline: gsap.core.Timeline | null = null;

          const buildTimeline = () => {
            timeline?.scrollTrigger?.kill();
            timeline?.kill();

            const riseDistance = getViewportHeight(scroller) * 0.78;

            gsap.set(intro, { y: 0, autoAlpha: 1 });
            gsap.set(stage, { y: riseDistance, autoAlpha: 1 });
            gsap.set(posters, (_index: number, target: HTMLElement) => ({
              y: Number(target.dataset.parallax) || 60,
            }));

            const scrollTriggerConfig: ScrollTrigger.Vars = {
              trigger: section,
              start: "top top",
              end: "+=1050",
              pin: true,
              scrub: 0.45,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                section.style.setProperty(
                  "--partnership-progress",
                  `${self.progress * 100}%`,
                );
              },
            };

            if (scroller) {
              scrollTriggerConfig.scroller = scroller;
            }

            timeline = gsap.timeline({
              scrollTrigger: scrollTriggerConfig,
            });

            timeline
              .to(
                intro,
                { y: -96, autoAlpha: 0, duration: 0.14, ease: "power2.in" },
                0,
              )
              .to(stage, { y: 0, duration: 0.68, ease: "none" }, 0)
              .to(
                posters,
                {
                  y: 0,
                  duration: 0.68,
                  stagger: 0.025,
                  ease: "none",
                },
                0,
              );

            ScrollTrigger.refresh();

            return timeline;
          };

          buildTimeline();

          const onLenisReady = () => {
            buildTimeline();
          };

          if (scroller?.dataset.lenisReady === "true") {
            requestAnimationFrame(onLenisReady);
          } else {
            window.addEventListener("lenis:ready", onLenisReady, {
              once: true,
            });
          }

          return () => {
            window.removeEventListener("lenis:ready", onLenisReady);
            timeline?.scrollTrigger?.kill();
            timeline?.kill();
          };
        });
      }, section);

      return () => {
        ctx.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="partnership"
      style={sectionStyle}
      className="relative bg-background px-5 py-20 text-foreground sm:px-8 lg:min-h-[calc(100vh-1.5rem)] lg:overflow-visible lg:px-16 lg:py-0"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden="true"
      >
        <div className="service-grid-surface absolute inset-0" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-5 bottom-5 z-40 hidden items-center text-foreground/78 lg:flex"
        aria-hidden="true"
      >
        <span className="size-3 rounded-full border border-current" />
        <span className="relative h-px flex-1 bg-foreground/18">
          <span
            className="absolute inset-y-0 left-0 bg-accent"
            style={{ width: "var(--partnership-progress)" }}
          />
        </span>
        <span className="size-3 rounded-full border border-current" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[104rem] flex-col gap-20 lg:h-[calc(100vh-1.5rem)] lg:gap-0">
        <div
          data-partnership-intro
          className="relative z-10 grid gap-10 lg:absolute lg:inset-x-0 lg:top-16 lg:grid-cols-[0.42fr_0.58fr] lg:items-start"
        >
          <div className="space-y-24 lg:pt-4">
            <DotLabel>True partnership</DotLabel>
            <p className="max-w-md text-base font-semibold leading-7 text-foreground/62 sm:text-lg sm:leading-8">
              We build with open communication, practical scope, and a shared
              expectation that every launch should feel useful after the first
              impression.
            </p>
          </div>

          <h2 className="max-w-[10ch] text-[clamp(4.2rem,9.6vw,11rem)] font-black uppercase leading-[0.86] text-foreground">
            Join the Yarsa Byte family
            <MiniMark className="ml-[0.08em] translate-y-[-0.18em]" />
          </h2>
        </div>

        <div
          data-awards-scene
          className="relative z-20 pb-16 lg:absolute lg:inset-0 lg:overflow-visible lg:pb-0"
        >
          <div className="grid gap-6 pt-48 sm:grid-cols-2 lg:hidden">
            <div
              className="font-display pointer-events-none col-span-full flex justify-center text-[clamp(4rem,18vw,8rem)] uppercase leading-[0.72] text-foreground/[0.08]"
              aria-hidden="true"
            >
              {awardLetters.map((letter, index) => (
                <span key={`mobile-${letter.char}-${index}`}>{letter.char}</span>
              ))}
            </div>
            {awards.map((award, index) => (
              <AwardPoster
                key={award.title}
                award={award}
                index={index}
                className="relative mx-auto"
              />
            ))}
          </div>

          <div
            data-awards-stage
            className="relative hidden h-full w-full items-end justify-center overflow-visible pb-6 will-change-transform lg:flex"
          >
            <div
              className="pointer-events-none absolute inset-x-0 bottom-6 z-0 flex justify-center"
              aria-hidden="true"
            >
              {awardLetters.map((letter, index) => (
                <span
                  key={`ghost-${letter.char}-${index}`}
                  className="font-display inline-block text-[clamp(5.7rem,21vw,21rem)] uppercase leading-[0.72] text-foreground/[0.045]"
                >
                  {letter.char}
                </span>
              ))}
            </div>

            <AwardLetter letter={awardLetters[0]} />
            <AwardLetter letter={awardLetters[1]} />

            <AwardPoster award={awards[0]} index={0} />

            <AwardLetter letter={awardLetters[2]} />
            <AwardLetter letter={awardLetters[3]} />

            <AwardPoster award={awards[1]} index={1} />
            <AwardPoster award={awards[2]} index={2} />

            <AwardLetter letter={awardLetters[4]} />
            <AwardLetter letter={awardLetters[5]} />

            <AwardPoster award={awards[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
