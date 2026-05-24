"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";

import { heroTaglines } from "@/data/hero";
import { navLinks } from "@/data/nav";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";

function MenuIcon({ className }: { className?: string }) {
  const bars = [
    { height: "h-5", delay: 0 },
    { height: "h-7", delay: 0.05 },
    { height: "h-4", delay: 0.1 },
  ];

  return (
    <span className={cn("flex items-end gap-[5px]", className)} aria-hidden="true">
      {bars.map((bar) => (
        <span key={bar.height} className="flex flex-col items-center gap-1">
          <span className={cn("w-px bg-current", bar.height)} />
          <span className="size-1 rounded-full bg-current" />
        </span>
      ))}
    </span>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 12);
  });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTaglineIndex((current) => (current + 1) % heroTaglines.length);
    }, 3200);

    return () => window.clearInterval(interval);
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-300",
        isScrolled
          ? "border-b border-foreground/10 bg-[#14183a]/92 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 justify-self-start"
          aria-label="Sajilo Studio home"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/logo.svg"
            alt=""
            width={36}
            height={36}
            className="size-9 shrink-0"
            priority
          />
          <span className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-foreground sm:text-xs">
            Sajilo Studio
          </span>
        </Link>

        <p className="hidden max-w-[14rem] text-center text-[0.58rem] font-medium uppercase leading-snug tracking-[0.2em] text-foreground/72 md:block lg:max-w-none lg:text-[0.62rem]">
          <AnimatePresence mode="wait">
            <motion.span
              key={heroTaglines[taglineIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="inline-block"
            >
              {heroTaglines[taglineIndex]}
            </motion.span>
          </AnimatePresence>
        </p>

        <div className="flex items-center justify-self-end gap-3">
          <PremiumButton href="#contact" className="hidden h-10 px-4 text-xs md:inline-flex">
            Start a Project
          </PremiumButton>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="grid size-11 place-items-center text-foreground transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:hidden"
          >
            <MenuIcon />
          </button>
          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/62 transition hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 top-0 z-40 bg-[#14183a] pt-[4.5rem] lg:hidden"
          >
            <nav className="flex h-[calc(100vh-4.5rem)] flex-col justify-between p-6" aria-label="Mobile navigation">
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + index * 0.05 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-4xl font-display uppercase leading-none text-foreground"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <PremiumButton
                href="#contact"
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Start a Project
              </PremiumButton>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
