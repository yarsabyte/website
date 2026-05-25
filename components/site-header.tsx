"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { FullscreenMenu } from "@/components/fullscreen-menu";
import { MenuIcon } from "@/components/menu-icon";
import { heroTaglines } from "@/data/hero";
import { Container } from "@/components/ui/container";

type MenuOrigin = { x: number; y: number };

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState<MenuOrigin | null>(null);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const updateMenuOrigin = useCallback(() => {
    const button = menuButtonRef.current;
    if (!button) {
      return;
    }

    const rect = button.getBoundingClientRect();
    setMenuOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    updateMenuOrigin();
    window.addEventListener("resize", updateMenuOrigin);

    return () => window.removeEventListener("resize", updateMenuOrigin);
  }, [isMenuOpen, updateMenuOrigin]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTaglineIndex((current) => (current + 1) % heroTaglines.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      updateMenuOrigin();
    }
    setIsMenuOpen((current) => !current);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[90] lg:left-3 lg:right-3 lg:top-3">
        <Container className="grid h-24 grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 pt-5 sm:h-[4.5rem] sm:items-center sm:pt-0">
          <Link
            href="/"
            className="pointer-events-auto flex min-w-0 items-center gap-3 justify-self-start"
            aria-label="Sajilo Studio home"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/logo.svg"
              alt=""
              width={36}
              height={36}
              className="size-14 shrink-0 sm:size-9"
              priority
            />
            <span className="hidden truncate text-xs font-semibold uppercase tracking-[0.22em] text-foreground sm:block">
              Sajilo Studio
            </span>
          </Link>

          <p className="flex min-w-0 flex-col items-center justify-start gap-2 text-center text-[0.68rem] font-medium uppercase tracking-[0.16em] text-foreground sm:flex-row sm:justify-center sm:gap-2.5 sm:text-[0.58rem] sm:tracking-[0.22em] sm:text-foreground/80 lg:text-[0.62rem]">
            <span className="rounded-md bg-foreground px-4 py-2 text-[0.68rem] font-black leading-none tracking-[0.08em] text-[#14183a] sm:bg-transparent sm:p-0 sm:text-[0.58rem] sm:font-medium sm:tracking-[0.22em] sm:text-foreground/80 lg:text-[0.62rem]">
              We
            </span>
            <span
              className="hidden size-1.5 shrink-0 rounded-full bg-accent sm:inline-block"
              aria-hidden="true"
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={heroTaglines[taglineIndex]}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="inline-block max-w-[13rem] truncate sm:max-w-[11rem] lg:max-w-none"
              >
                {heroTaglines[taglineIndex]}
              </motion.span>
            </AnimatePresence>
          </p>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-controls="site-menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className="pointer-events-auto grid size-14 place-items-center justify-self-end text-foreground transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:size-14"
          >
            <MenuIcon open={isMenuOpen} stroke={isMenuOpen ? "#1D2145" : "currentColor"} />
          </button>
        </Container>
      </header>

      <FullscreenMenu
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        origin={menuOrigin}
      />
    </>
  );
}
