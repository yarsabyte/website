import { ArrowRight } from "lucide-react";

import { services } from "@/data/services";
import { socialLinks } from "@/data/socials";
import { cn } from "@/lib/utils";

const serviceLinks = services.map((service) => ({
  label: service.title
    .replace("Website Design & Development", "Website Design")
    .replace("Poster & Graphic Design", "Poster Design")
    .replace("Branding & Digital Identity", "Brand Identity")
    .replace("Digital Setup", "Launch Setup")
    .toUpperCase(),
  href: `mailto:yarsabyte@gmail.com?subject=${encodeURIComponent(
    service.title,
  )}`,
}));

function SectionRule({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-0 text-foreground/72", className)}
      aria-hidden="true"
    >
      <span className="size-2.5 rounded-full border border-current" />
      <span className="h-px flex-1 bg-current" />
      <span className="size-2.5 rounded-full border border-current" />
    </div>
  );
}

function AccentMark() {
  return (
    <span
      className="ml-[0.08em] inline-block size-[0.16em] min-h-3 min-w-3 translate-y-[0.12em] bg-foreground transition duration-300 [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)] group-hover:bg-accent"
      aria-hidden="true"
    />
  );
}

function FooterWord({
  children,
  href,
  className,
}: {
  children: string;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-baseline font-helvetica-bold uppercase leading-[0.86] tracking-normal text-foreground transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className,
      )}
    >
      {children}
      <AccentMark />
    </a>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-[98svh] bg-background px-5 py-8 text-foreground sm:px-8 lg:px-20 lg:py-10"
    >
      <div className="relative mx-auto flex min-h-[calc(90svh-5rem)] max-w-[118rem] flex-col">
        <div className="grid shrink-0 grid-cols-[auto_1fr_auto] items-start gap-4">
          <div
            className="hidden w-16 justify-self-end pt-3 text-foreground/85 lg:block"
            aria-hidden="true"
          ></div>
          <a
            href="mailto:yarsabyte@gmail.com?subject=Let%27s%20Talk"
            className="group justify-self-center text-center font-helvetica-bold text-[clamp(3.2rem,8.4vw,7.6rem)] uppercase leading-[0.82] tracking-normal transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Let&apos;s Talk
            <AccentMark />
          </a>

          <div
            className="hidden w-16 justify-self-end pt-3 text-foreground/85 lg:block"
            aria-hidden="true"
          >
            
          </div>
        </div>


        <div className="grid flex-1 gap-8 py-10 lg:grid-cols-[0.38fr_0.24fr_0.38fr] lg:items-center lg:gap-10 lg:py-8">
          <div className="flex flex-col justify-center gap-8 lg:self-stretch">
            <FooterWord
              href="/studio"
              className="text-[clamp(3.6rem,6.4vw,7.4rem)]"
            >
              Studio
            </FooterWord>
            <a
              href="mailto:yarsabyte@gmail.com"
              className="max-w-xs text-sm font-semibold uppercase leading-6 text-foreground/84 transition hover:text-accent sm:text-base"
            >
              Butwal, Nepal
              <br />
	      yarsabyte@gmail.com
            </a>
          </div>

          <nav
            className="grid min-w-64 content-center gap-2 text-sm font-semibold uppercase leading-tight text-foreground/90 sm:text-base lg:pt-10"
            aria-label="Footer services"
          >
            {serviceLinks.map((service) => (
              <a
                key={service.label}
                href={service.href}
                className="whitespace-nowrap transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {service.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-6 lg:items-end lg:self-stretch lg:pt-24">
            <FooterWord
              href="mailto:yarsabyte@gmail.com?subject=Services"
              className="text-[clamp(3.6rem,6.4vw,7.4rem)] lg:text-right"
            >
              Services
            </FooterWord>
            <SectionRule className="w-full lg:mt-auto" />
          </div>
        </div>

        <div className="grid shrink-0 gap-7 lg:grid-cols-[0.38fr_0.24fr_0.38fr] lg:items-end lg:gap-10">
          <form
            action="mailto:yarsabyte@gmail.com"
            method="post"
            className="max-w-xl"
          >
            <label
              htmlFor="footer-email"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/90"
            >
              Newsletter
            </label>
            <div className="mt-6 flex items-end gap-6 border-b border-foreground/78 pb-3">
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="Your Email"
                className="min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-foreground/86 focus:outline-none sm:text-lg"
              />
              <button
                type="submit"
                aria-label="Submit email"
                className="grid size-9 place-items-center text-foreground transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <ArrowRight className="size-7" />
              </button>
            </div>
          </form>

          <div className="grid gap-5">
            <FooterWord href="/work" className="text-[clamp(3.6rem,6.4vw,7.4rem)]">
              Work
            </FooterWord>
            <p className="text-sm text-foreground/86">
              &copy;2026 Portfoo
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-foreground/86 lg:justify-end sm:text-base"
            aria-label="Social links"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
