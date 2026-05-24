import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function ContactSection() {
  return (
    <section id="contact" className="section-spacing-tight">
      <Container>
        <Reveal>
          <div className="grid gap-10 rounded-[2rem] bg-gradient-to-br from-sky via-blue to-accent p-7 text-background shadow-[0_30px_90px_color-mix(in_srgb,var(--blue)_28%,transparent)] sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em]">Start with Sajilo</p>
              <h2 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.9] text-balance sm:text-6xl lg:text-7xl">
                Ready to make your business look serious online?
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-md text-base leading-7 text-background/72">
                Bring your business name, offer, and a rough goal. We will help shape the
                website, visuals, content, and digital setup around it.
              </p>
              <a
                href="mailto:hello@sajilostudio.com"
                className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-background px-6 text-sm font-bold text-foreground transition hover:bg-navy"
              >
                hello@sajilostudio.com
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
