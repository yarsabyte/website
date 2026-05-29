"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { ArrowUpRight, BadgeCheck, PenLine } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sectionStyle = {
  "--partnership-progress": "0%",
} as CSSProperties;

const partnerCards = [
  { label: "Website", title: "Conversion-ready pages" },
  { label: "Portfolio", title: "Personal presence systems" },
  { label: "Brand", title: "Identity and visual kits" },
  { label: "Content", title: "Posters, reels, and launch assets" },
  { label: "Setup", title: "Domains, email, and analytics" },
  { label: "Support", title: "Clear guidance after launch" },
];

const proofCards = [
  {
    title: "Website of the week",
    detail: "Focused landing pages with contact paths, trust cues, and fast delivery.",
    tone: "bg-accent text-background",
    rotate: "-9deg",
    x: "10%",
    y: "8%",
  },
  {
    title: "Brand presence kit",
    detail: "Reusable visual direction for social posts, banners, and campaign graphics.",
    tone: "bg-blue text-foreground",
    rotate: "12deg",
    x: "52%",
    y: "3%",
  },
  {
    title: "Launch support",
    detail: "Clean setup for email, forms, publishing, and the handoff details.",
    tone: "bg-sky text-background",
    rotate: "-4deg",
    x: "34%",
    y: "44%",
  },
];

const promiseCards = [
  "We keep scope clear, so every decision has a business reason.",
  "We communicate early, especially when the better path changes the plan.",
  "We build handoff-ready assets your team can actually keep using.",
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

function ProofPoster({
  card,
  index,
}: {
  card: (typeof proofCards)[number];
  index: number;
}) {
  return (
    <article
      data-partnership-poster
      className={cn(
        "absolute aspect-[0.72] w-44 origin-center p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:w-56 lg:w-64",
        card.tone,
      )}
      style={
        {
          left: card.x,
          top: card.y,
          "--poster-rotate": card.rotate,
        } as CSSProperties
      }
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] opacity-72">
        Yarsa Byte / Proof 0{index + 1}
      </p>
      <h3 className="mt-8 max-w-[9ch] text-3xl font-black uppercase leading-[0.9] sm:text-4xl">
        {card.title}
      </h3>
      <p className="mt-5 text-xs font-semibold leading-5 opacity-78">
        {card.detail}
      </p>
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-black uppercase">
        <span>Butwal</span>
        <span>2026</span>
      </div>
    </article>
  );
}

export function PartnershipSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const scroller = document.querySelector<HTMLElement>(".site-frame");

      if (!section || !scroller) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const revealItems = gsap.utils.toArray<HTMLElement>(
        "[data-partnership-reveal]",
      );
      const cardItems = gsap.utils.toArray<HTMLElement>(
        "[data-partnership-card]",
      );
      const posters = gsap.utils.toArray<HTMLElement>(
        "[data-partnership-poster]",
      );

      if (reduceMotion) {
        gsap.set([...revealItems, ...cardItems, ...posters], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
        });
        section.style.setProperty("--partnership-progress", "100%");
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.set(revealItems, { autoAlpha: 0, y: 42 });
        gsap.set(cardItems, { autoAlpha: 0, y: 88, scale: 0.96 });
        gsap.set(posters, {
          autoAlpha: 0,
          y: 120,
          rotate: (index, target) =>
            Number.parseFloat(
              getComputedStyle(target).getPropertyValue("--poster-rotate"),
            ) || 0,
          scale: 0.9,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scroller,
            start: "top top",
            end: "+=4400",
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            onUpdate: (self) => {
              section.style.setProperty(
                "--partnership-progress",
                `${self.progress * 100}%`,
              );
            },
          },
        });

        timeline
          .to(
            revealItems,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.18,
              ease: "power2.out",
            },
            0,
          )
          .to(
            "[data-partnership-intro]",
            { y: -120, autoAlpha: 0.22, duration: 0.28, ease: "power2.inOut" },
            0.22,
          )
          .to(
            cardItems,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              stagger: 0.055,
              duration: 0.28,
              ease: "power3.out",
            },
            0.18,
          )
          .to(
            "[data-partnership-grid]",
            { y: -92, autoAlpha: 0.3, duration: 0.24, ease: "power2.inOut" },
            0.48,
          )
          .to(
            "[data-partnership-awards]",
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" },
            0.44,
          )
          .to(
            posters,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              stagger: 0.08,
              duration: 0.3,
              ease: "power3.out",
            },
            0.48,
          )
          .to(
            posters,
            {
              y: (index) => [-90, 60, -50][index] ?? -40,
              x: (index) => [80, -110, 30][index] ?? 40,
              rotate: (index) => [-17, 8, 5][index] ?? 0,
              duration: 0.34,
              ease: "none",
            },
            0.68,
          )
          .to(
            "[data-partnership-awards]",
            { y: -82, autoAlpha: 0.2, duration: 0.22, ease: "power2.inOut" },
            0.76,
          )
          .to(
            "[data-partnership-promise]",
            { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" },
            0.78,
          );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="partnership"
      style={sectionStyle}
      className="relative overflow-hidden bg-background px-5 py-20 text-foreground sm:px-8 lg:min-h-[calc(100vh-1.5rem)] lg:px-16 lg:py-0"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden="true"
      >
        <div className="service-grid-surface absolute inset-0" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-5 bottom-5 hidden items-center text-foreground/78 lg:flex"
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

      <div className="relative z-10 mx-auto flex w-full max-w-[104rem] flex-col gap-16 lg:h-[calc(100vh-1.5rem)] lg:justify-center lg:gap-0">
        <div
          data-partnership-intro
          className="grid gap-10 lg:absolute lg:inset-x-0 lg:top-16 lg:grid-cols-[0.42fr_0.58fr] lg:items-start"
        >
          <div data-partnership-reveal className="space-y-24 lg:pt-4">
            <DotLabel>True partnership</DotLabel>
            <p className="max-w-md text-base font-semibold leading-7 text-foreground/62 sm:text-lg sm:leading-8">
              We build with open communication, practical scope, and a shared
              expectation that every launch should feel useful after the first
              impression.
            </p>
          </div>

          <h2
            data-partnership-reveal
            className="max-w-[10ch] text-[clamp(4.2rem,9.6vw,11rem)] font-black uppercase leading-[0.86] text-foreground"
          >
            Join the Yarsa Byte family
            <MiniMark className="ml-[0.08em] translate-y-[-0.18em]" />
          </h2>
        </div>

        <div
          data-partnership-grid
          className="grid gap-5 lg:absolute lg:inset-x-0 lg:bottom-20 lg:grid-cols-3 xl:grid-cols-6"
        >
          {partnerCards.map((card, index) => (
            <article
              key={card.label}
              data-partnership-card
              className="group flex min-h-44 flex-col justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.045] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.16)] transition hover:border-accent/50 hover:bg-foreground/[0.07] lg:min-h-56"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-foreground/48">
                0{index + 1} / {card.label}
              </p>
              <h3 className="font-display max-w-[12ch] text-3xl uppercase leading-none text-foreground">
                {card.title}
              </h3>
            </article>
          ))}
        </div>

        <div
          data-partnership-awards
          className="relative min-h-[42rem] opacity-100 lg:absolute lg:inset-0 lg:opacity-0"
        >
          <p
            className="font-display pointer-events-none absolute bottom-0 left-0 select-none text-[clamp(8rem,24vw,24rem)] uppercase leading-none text-foreground/[0.055]"
            aria-hidden="true"
          >
            Proof
          </p>

          <div className="relative mx-auto h-[38rem] max-w-[74rem] lg:h-full">
            {proofCards.map((card, index) => (
              <ProofPoster key={card.title} card={card} index={index} />
            ))}
          </div>
        </div>

        <div
          data-partnership-promise
          className="grid gap-12 opacity-100 lg:absolute lg:inset-x-0 lg:top-16 lg:grid-cols-[0.42fr_0.58fr] lg:opacity-0"
        >
          <div>
            <div className="flex flex-wrap gap-5">
              {[
                { icon: "WEB", label: "x 2" },
                { icon: "BR", label: "x 2" },
                { icon: "GO", label: "x 1" },
              ].map((item) => (
                <div
                  key={item.icon}
                  className="grid size-32 place-items-center rounded-full bg-foreground/[0.055] text-center sm:size-40"
                >
                  <div>
                    <p className="font-display text-4xl uppercase leading-none text-foreground">
                      {item.icon}
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/76">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex items-center gap-4">
              <DotLabel>Promise</DotLabel>
              <span className="grid size-16 place-items-center rounded-full bg-accent text-background">
                <ArrowUpRight className="size-6" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div>
            <h2 className="max-w-[11ch] text-[clamp(4rem,8.5vw,10rem)] font-black uppercase leading-[0.86] text-foreground">
              We keep our promise
              <MiniMark className="ml-[0.08em] translate-y-[-0.18em]" />
            </h2>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {promiseCards.map((card, index) => (
                <article
                  key={card}
                  className="min-h-44 rounded-2xl border border-foreground/10 bg-foreground/[0.045] p-6"
                >
                  <BadgeCheck className="size-6 text-accent" aria-hidden="true" />
                  <p className="mt-8 text-sm font-semibold leading-6 text-foreground/68">
                    {card}
                  </p>
                  <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-foreground/42">
                    Promise 0{index + 1}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <a
          href="mailto:yarsabyte@gmail.com?subject=Let%27s%20Build%20Together"
          className="absolute bottom-14 right-2 z-20 hidden size-20 place-items-center rounded-full bg-accent text-background shadow-[0_20px_70px_rgba(0,0,0,0.24)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:grid"
          aria-label="Start a project with Yarsa Byte"
        >
          <PenLine className="size-8" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
