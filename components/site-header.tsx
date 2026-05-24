"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FullscreenMenu } from "@/components/fullscreen-menu";
import { MenuIcon } from "@/components/menu-icon";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[90]">
        <Container className="flex h-[4.5rem] items-center justify-between">
          <Link
            href="/"
            className="pointer-events-auto flex items-center gap-3"
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
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-controls="site-menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="pointer-events-auto grid size-14 place-items-center text-foreground transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <MenuIcon open={isMenuOpen} stroke={isMenuOpen ? "#1D2145" : "currentColor"} />
          </button>
        </Container>
      </header>

      <FullscreenMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
