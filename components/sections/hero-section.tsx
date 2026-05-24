"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { heroHeadlineRows, heroRotatingWords, heroStats } from "@/data/hero";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionLabel } from "@/components/ui/section-label";

gsap.registerPlugin(useGSAP);

const ANIMATION_SPEED = 1;

function splitWord(word: string, isGradient = false) {
  return word.split("").map((character, index) => (
    <span
      key={`${word}-${character}-${index}`}
      data-hero-char
      className={isGradient ? "gradient-text inline-block will-change-transform" : "inline-block will-change-transform"}
      aria-hidden="true"
    >
      {character}
    </span>
  ));
}

export function HeroSection() {
  const scope = useRef<HTMLElement>(null);
  const rotatingWordRef = useRef<HTMLSpanElement>(null);
  const rotatingIndex = useRef(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set("[data-hero-char]", {
        yPercent: 116,
        opacity: 0,
        rotateX: -74,
        transformOrigin: "50% 100%",
      });
      gsap.set("[data-hero-fade]", { y: 26, opacity: 0 });
      gsap.set("[data-hero-shape]", { opacity: 0, scale: 0.72 });

      if (prefersReducedMotion) {
        gsap.set("[data-hero-char], [data-hero-fade], [data-hero-shape]", {
          yPercent: 0,
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
        });
        return () => mm.revert();
      }

      const entrance = gsap.timeline({ defaults: { ease: "power4.out" } });

      entrance
        .to("[data-hero-char]", {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.82 / ANIMATION_SPEED,
          stagger: {
            each: 0.014 / ANIMATION_SPEED,
            from: "start",
          },
        })
        .to(
          "[data-hero-fade]",
          {
            y: 0,
            opacity: 1,
            duration: 0.78 / ANIMATION_SPEED,
            stagger: 0.08 / ANIMATION_SPEED,
          },
          "-=0.35",
        )
        .to(
          "[data-hero-shape]",
          {
            opacity: 1,
            scale: 1,
            duration: 1 / ANIMATION_SPEED,
            stagger: 0.09 / ANIMATION_SPEED,
          },
          "-=0.9",
        );

      const wordTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.35 });
      const wordNode = rotatingWordRef.current;

      if (wordNode) {
        wordTimeline
          .to(wordNode, {
            yPercent: -105,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.42 / ANIMATION_SPEED,
            ease: "power3.in",
            delay: 1.8 / ANIMATION_SPEED,
            onComplete: () => {
              rotatingIndex.current = (rotatingIndex.current + 1) % heroRotatingWords.length;
              wordNode.textContent = heroRotatingWords[rotatingIndex.current];
              gsap.set(wordNode, { yPercent: 105 });
            },
          })
          .to(wordNode, {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.58 / ANIMATION_SPEED,
            ease: "power4.out",
          });
      }

      mm.add("(min-width: 768px)", () => {
        const floatTween = gsap.to("[data-hero-shape]", {
          y: "random(-24, 24)",
          x: "random(-18, 18)",
          rotate: "random(-10, 10)",
          duration: "random(4.5, 7)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.18,
        });

        const scanTween = gsap.to("[data-scanline]", {
          yPercent: 105,
          duration: 4.8,
          repeat: -1,
          ease: "none",
        });

        return () => {
          floatTween.kill();
          scanTween.kill();
        };
      });

      const section = scope.current;

      const handlePointerMove = (event: PointerEvent) => {
        if (!section) {
          return;
        }

        const rect = section.getBoundingClientRect();
        section.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
        section.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
      };

      section?.addEventListener("pointermove", handlePointerMove, { passive: true });

      return () => {
        entrance.kill();
        wordTimeline.kill();
        mm.revert();
        section?.removeEventListener("pointermove", handlePointerMove);
      };
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative isolate min-h-screen overflow-hidden border-b border-foreground/10 pt-28 [--spotlight-x:50%] [--spotlight-y:38%]"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_var(--spotlight-x)_var(--spotlight-y),color-mix(in_srgb,var(--sky)_18%,transparent),transparent_20rem),radial-gradient(circle_at_18%_20%,color-mix(in_srgb,var(--blue)_20%,transparent),transparent_26rem),radial-gradient(circle_at_82%_12%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_28rem),linear-gradient(180deg,color-mix(in_srgb,var(--navy)_18%,transparent),var(--background)_84%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--foreground)_6%,transparent)_1px,transparent_1px),linear-gradient(color-mix(in_srgb,var(--foreground)_4%,transparent)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35 [mask-image:radial-gradient(circle_at_50%_24%,var(--background),transparent_68%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-35">
        <div data-scanline className="h-32 w-full bg-gradient-to-b from-transparent via-sky/20 to-transparent" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--foreground)_14%,transparent)_0.8px,transparent_0.9px)] bg-[size:3px_3px] opacity-18" />
      <div className="absolute bottom-0 left-1/2 -z-10 h-px w-[88vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky/60 to-transparent" />

      <div
        data-hero-shape
        className="absolute right-[8%] top-32 -z-10 hidden h-28 w-28 rounded-[2rem] border border-sky/30 bg-sky/10 shadow-[0_0_80px_color-mix(in_srgb,var(--sky)_22%,transparent)] md:block"
      />
      <div
        data-hero-shape
        className="absolute bottom-36 right-[22%] -z-10 hidden h-36 w-20 rotate-12 rounded-full border border-blue/30 bg-blue/10 shadow-[0_0_90px_color-mix(in_srgb,var(--blue)_20%,transparent)] md:block"
      />
      <div
        data-hero-shape
        className="absolute left-[7%] top-[38%] -z-10 hidden h-16 w-44 -rotate-6 rounded-full border border-accent/30 bg-accent/10 shadow-[0_0_70px_color-mix(in_srgb,var(--accent)_16%,transparent)] lg:block"
      />
      <div
        data-hero-fade
        className="pointer-events-none absolute bottom-24 right-[7%] hidden h-64 w-44 items-center justify-center rounded-full border border-foreground/12 bg-foreground/[0.035] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_12%,transparent)] xl:flex"
        aria-hidden="true"
      >
        <div className="absolute inset-4 rounded-full border border-sky/20" />
        <div className="absolute inset-9 rounded-full border border-blue/20" />
        <div className="size-20 rounded-full bg-gradient-to-br from-sky via-blue to-accent shadow-[0_0_70px_color-mix(in_srgb,var(--blue)_36%,transparent)]" />
      </div>

      <Container className="flex min-h-[calc(100vh-7rem)] items-end pb-9 lg:pb-12">
        <div className="max-w-6xl pb-4">
          <div data-hero-fade>
            <SectionLabel>Premium digital presence for Nepal</SectionLabel>
          </div>

          <h1
            className="mt-6 max-w-6xl text-5xl font-black uppercase leading-[0.88] text-foreground text-balance sm:text-6xl lg:text-7xl xl:text-8xl"
            aria-label="We build digital presence that makes Nepali businesses look premium."
          >
            {heroHeadlineRows.map((row, rowIndex) => (
              <span key={row.join("-")} className="block overflow-hidden pb-1">
                {row.map((word, wordIndex) => {
                  const isGradient = word === "digital" || word === "premium.";

                  return (
                    <span key={`${word}-${rowIndex}-${wordIndex}`}>
                      <span
                        className="mr-[0.16em] inline-block overflow-hidden align-bottom"
                        aria-hidden="true"
                      >
                        <span
                          className="inline-block"
                        >
                          {splitWord(word, isGradient)}
                        </span>
                      </span>
                      {wordIndex < row.length - 1 ? " " : null}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <div data-hero-fade className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground/46">
              Now shaping
            </span>
            <span className="inline-flex h-12 min-w-40 items-center justify-center overflow-hidden rounded-full border border-foreground/12 bg-foreground/[0.06] px-5 text-lg font-black uppercase text-sky shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_8%,transparent)]">
              <span ref={rotatingWordRef} className="inline-block will-change-transform">
                {heroRotatingWords[0]}
              </span>
            </span>
          </div>

          <div className="mt-8 grid gap-7 text-foreground/68 md:grid-cols-[minmax(0,44rem)_auto] md:items-end">
            <p data-hero-fade className="max-w-2xl text-base leading-8 sm:text-lg">
              Sajilo Studio creates websites, visual content, portfolios, videos,
              and digital setups for businesses, creators, consultancies, and local
              brands.
            </p>
            <div data-hero-fade className="flex flex-wrap gap-3">
              <PremiumButton href="#contact">Start a Project</PremiumButton>
              <PremiumButton href="#work" variant="ghost">
                View Our Work
              </PremiumButton>
            </div>
          </div>

          <div
            data-hero-fade
            className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {heroStats.map((item) => (
              <div key={item.label} className="bg-background/78 p-4 sm:p-5">
                <p className="text-2xl font-black uppercase text-foreground">{item.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/46">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div
        data-hero-fade
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/42 sm:flex"
        aria-hidden="true"
      >
        <span>Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-foreground/14">
          <span className="absolute left-0 top-0 h-4 w-px animate-[scrollPulse_1.5s_ease-in-out_infinite] bg-sky" />
        </span>
      </div>
    </section>
  );
}
