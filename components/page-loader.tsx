"use client";

import { useEffect, useState, type ReactNode } from "react";

import { LoadingScreen } from "@/components/loading-screen";

const MIN_LOAD_MS = 2200;

type PageLoaderProps = {
  children: ReactNode;
};

export function PageLoader({ children }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const shouldShowContent = isExiting || !isLoading;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const reducedMotionTimer = window.setTimeout(() => setIsLoading(false), 0);
      return () => window.clearTimeout(reducedMotionTimer);
    }

    let cancelled = false;

    const minDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MIN_LOAD_MS);
    });

    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState !== "loading") {
        resolve();
        return;
      }

      window.addEventListener("load", () => resolve(), { once: true });
    });

    void Promise.all([minDelay, pageReady]).then(() => {
      if (cancelled) {
        return;
      }

      setIsExiting(true);
      window.setTimeout(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      }, 720);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {isLoading ? <LoadingScreen isExiting={isExiting} /> : null}
      <div
        className={
          shouldShowContent
            ? "visible opacity-100 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            : "invisible translate-y-8 scale-[0.985] opacity-0"
        }
        aria-hidden={!shouldShowContent}
      >
        {shouldShowContent ? children : null}
      </div>
    </>
  );
}
