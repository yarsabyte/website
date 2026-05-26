"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { FullscreenMenu } from "@/components/fullscreen-menu";
import { MenuIcon } from "@/components/menu-icon";
import { Container } from "@/components/ui/container";

type MenuOrigin = { x: number; y: number };

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState<MenuOrigin | null>(null);
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

          <nav
            className="pointer-events-auto hidden min-w-0 items-center justify-center gap-16 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-foreground/90 sm:flex"
            aria-label="Primary navigation"
          >
            <Link
              href="#about"
              className="border-b border-foreground pb-2.5 transition hover:border-accent hover:text-accent"
            >
              About us
            </Link>
            <Link
              href="#work"
              className="border-b border-foreground pb-2.5 transition hover:border-accent hover:text-accent"
            >
              Work
            </Link>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-controls="site-menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className="pointer-events-auto grid size-14 place-items-center justify-self-end text-foreground transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:size-14"
          >
            <MenuIcon open={isMenuOpen} stroke={isMenuOpen ? "#1E1E1E" : "currentColor"} />
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
