"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

import { stats } from "@/data/stats";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function parseStatValue(val: string) {
  const match = val.match(/^(\d+)(%?)$/);
  if (match) {
    return {
      isNumeric: true,
      numericValue: parseInt(match[1], 10),
      suffix: match[2] || "",
    };
  }
  return {
    isNumeric: false,
    numericValue: 0,
    suffix: val,
  };
}

function StatCounter({ value }: { value: string }) {
  const { isNumeric, numericValue, suffix } = parseStatValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !isNumeric || !isInView) return;

    if (reduceMotion) {
      node.textContent = `${numericValue}${suffix}`;
      return;
    }

    const start = 0;
    const end = numericValue;
    const duration = 1400;
    const startTime = performance.now();
    let frame = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * (end - start) + start);

      node.textContent = `${current}${suffix}`;

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [isInView, isNumeric, numericValue, reduceMotion, suffix]);

  if (!isNumeric) {
    return <span className="gradient-text">{value}</span>;
  }

  return (
    <span ref={ref} className="gradient-text">
      0{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="border-b border-foreground/10 py-16 bg-background/50">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08}>
              <div className="studio-card group relative min-h-48 overflow-hidden rounded-[2rem] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(98,176,255,0.06)]">
                {/* Decorative background glow on hover */}
                <div className="absolute -right-12 -top-12 size-32 rounded-full bg-sky/5 blur-3xl transition-opacity duration-500 group-hover:bg-sky/10" />

                <p className="font-display text-5xl font-black tracking-tight leading-none">
                  <StatCounter value={item.value} />
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-sky/90">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60 transition-colors duration-300 group-hover:text-foreground/80">
                  {item.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
