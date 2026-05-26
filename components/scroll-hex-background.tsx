"use client";

import { useEffect } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollHexBackground() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const frame = document.querySelector<HTMLElement>(".site-frame");

    if (!frame || reduceMotion) {
      return;
    }

    let idleTimer = 0;
    let animationFrame = 0;
    let latestScroll = frame.scrollTop || window.scrollY;

    const setPatternState = () => {
      const offset = latestScroll * 1.45;

      frame.style.setProperty("--hex-offset-y", `${offset}px`);
      frame.style.setProperty("--hex-offset-x", `${offset * 0.34}px`);
      frame.style.setProperty("--hex-opacity", "0.55");

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        frame.style.setProperty("--hex-opacity", "0");
      }, 560);
    };

    const schedulePatternState = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        setPatternState();
      });
    };

    const onScroll = () => {
      latestScroll = frame.scrollTop || window.scrollY;
      schedulePatternState();
    };

    const onScrollInput = () => {
      latestScroll = frame.scrollTop || window.scrollY;
      schedulePatternState();
    };

    frame.addEventListener("scroll", onScroll, { passive: true });
    frame.addEventListener("wheel", onScrollInput, { passive: true });
    frame.addEventListener("touchmove", onScrollInput, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScrollInput, { passive: true });
    window.addEventListener("touchmove", onScrollInput, { passive: true });

    return () => {
      frame.removeEventListener("scroll", onScroll);
      frame.removeEventListener("wheel", onScrollInput);
      frame.removeEventListener("touchmove", onScrollInput);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScrollInput);
      window.removeEventListener("touchmove", onScrollInput);
      window.clearTimeout(idleTimer);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      frame.style.removeProperty("--hex-opacity");
      frame.style.removeProperty("--hex-offset-y");
      frame.style.removeProperty("--hex-offset-x");
    };
  }, [reduceMotion]);

  return <div className="scroll-hex-background" aria-hidden="true" />;
}
