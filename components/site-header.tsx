import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { navLinks } from "@/data/site";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/72 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Sajilo Studio home">
          <span className="grid size-9 place-items-center rounded-full bg-lime-300 text-sm font-black text-black">
            SS
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
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
        <a
          href="#contact"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black transition hover:bg-lime-300"
        >
          Start
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </Container>
    </header>
  );
}
