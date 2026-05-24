"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  type Variants,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { navLinks } from "@/data/nav";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";

const menuEase = [0.22, 1, 0.36, 1] as const;

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: "-4%",
    transition: { duration: 0.22, ease: menuEase },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: menuEase },
  },
};

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 12);
  });

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
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,box-shadow] duration-300",
        isScrolled
          ? "border-b border-white/12 bg-[#050712]/88 shadow-[0_16px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
          : "border-b border-white/[0.06] bg-[#050712]/18 backdrop-blur-md",
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label="Sajilo Studio home"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan via-electric to-violet text-sm font-black text-[#03040a] shadow-[0_0_28px_rgba(79,140,255,0.42)]">
            <span className="absolute inset-px rounded-full bg-white/20 opacity-0 transition group-hover:opacity-100" />
            <span className="relative">SS</span>
          </span>
          <span className="truncate text-sm font-semibold uppercase tracking-[0.18em] text-white">
            Sajilo Studio
          </span>
        </Link>

        <nav
          className="hidden items-center rounded-full border border-white/10 bg-white/[0.035] px-2 py-1.5 backdrop-blur-xl lg:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-4 py-2 text-sm font-medium text-white/64 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
            >
              <span>{link.label}</span>
              <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan via-electric to-violet transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <PremiumButton href="#contact" className="hidden h-11 px-5 md:inline-flex">
            Start a Project
          </PremiumButton>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close mobile navigation" : "Open mobile navigation"}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="grid size-11 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-white transition hover:border-cyan/50 hover:bg-white/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan lg:hidden"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-navigation"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-x-3 top-[5.25rem] z-40 overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#070913]/96 shadow-[0_30px_90px_rgba(0,0,0,0.48)] backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex min-h-[calc(100vh-6.5rem)] flex-col justify-between p-6" aria-label="Mobile navigation">
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.04, duration: 0.32 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center justify-between rounded-2xl border border-transparent px-2 py-4 text-4xl font-black uppercase leading-none text-white transition hover:border-white/10 hover:bg-white/[0.05] sm:text-5xl"
                  >
                    {link.label}
                    <span className="size-2 rounded-full bg-cyan opacity-0 shadow-[0_0_24px_rgba(100,233,255,0.9)] transition group-hover:opacity-100" />
                  </motion.a>
                ))}
              </div>

              <div className="space-y-5 border-t border-white/10 pt-6">
                <p className="max-w-sm text-sm leading-6 text-white/58">
                  Websites, portfolios, posters, reels, branding, and digital setup for
                  Nepali businesses ready to look serious online.
                </p>
                <PremiumButton
                  href="#contact"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start a Project
                </PremiumButton>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
