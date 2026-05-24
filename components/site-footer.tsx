import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { navLinks } from "@/data/nav";
import { services } from "@/data/services";
import { socialLinks } from "@/data/socials";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#03040a]">
      <Container className="section-spacing-tight">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Sajilo Studio home"
            >
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-cyan via-electric to-violet text-sm font-black text-[#03040a]">
                SS
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Sajilo Studio
              </span>
            </Link>
            <p className="mt-6 max-w-md text-base leading-7 text-white/58">
              Sajilo Studio is a simple, reliable digital partner for Nepali
              businesses that need websites, portfolios, posters, videos, branding,
              and launch-ready online setup.
            </p>
            <a
              href="mailto:hello@sajilostudio.com"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-cyan transition hover:text-white"
            >
              Start a Project
              <ArrowUpRight
                className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/46">
                Services
              </h2>
              <ul className="mt-5 space-y-3">
                {services.map((service) => (
                  <li key={service.title}>
                    <a
                      href="#services"
                      className="text-sm text-white/68 transition hover:text-cyan"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/46">
                Studio
              </h2>
              <ul className="mt-5 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/68 transition hover:text-cyan"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/46">
              Social
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/68 transition hover:border-cyan/50 hover:bg-white/[0.05] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="mt-8 text-3xl font-black uppercase leading-none text-white sm:text-4xl">
              Build local.
              <br />
              <GradientText>Look premium.</GradientText>
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © 2026 Sajilo Studio. All rights reserved.</p>
          <p>Kathmandu, Nepal · Digital studio for modern businesses.</p>
        </div>
      </Container>
    </footer>
  );
}
