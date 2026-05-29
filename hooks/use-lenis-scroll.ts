"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/hooks/useReducedMotion";

export function useLenisScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (
      reduceMotion ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 767px)").matches
    ) {
      return;
    }

    const wrapper = document.querySelector<HTMLElement>(".site-frame");
    const content = document.querySelector<HTMLElement>(".site-frame-content");

    if (!wrapper || !content) {
      return;
    }

    const lenis = new Lenis({
      wrapper,
      content,
      lerp: 0.11,
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    lenis.on("scroll", ScrollTrigger.update);

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, [reduceMotion]);
}
