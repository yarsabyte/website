import Link from "next/link";

import { navLinks } from "@/data/nav";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/72 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Sajilo Studio home">
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-cyan via-electric to-violet text-sm font-black text-[#03040a] shadow-[0_0_28px_rgba(79,140,255,0.42)]">
            SS
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
            Sajilo Studio
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/62 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <PremiumButton href="#contact" className="hidden h-10 px-4 sm:inline-flex">
          Start
        </PremiumButton>
      </Container>
    </header>
  );
}
