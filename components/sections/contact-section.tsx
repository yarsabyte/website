import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { services } from "@/data/services";
import { socialLinks } from "@/data/socials";

const contactOptions = [
  {
    label: "Website",
    detail: "Design and development for a polished web presence.",
    href: "mailto:hello@sajilostudio.com?subject=Website%20Project",
  },
  {
    label: "Branding",
    detail: "Identity, visuals, and launch-ready brand direction.",
    href: "mailto:hello@sajilostudio.com?subject=Branding%20Project",
  },
  {
    label: "Content",
    detail: "Posters, short-form videos, and campaign assets.",
    href: "mailto:hello@sajilostudio.com?subject=Content%20Project",
  },
  {
    label: "Launch",
    detail: "A full digital setup from web to business profiles.",
    href: "mailto:hello@sajilostudio.com?subject=Digital%20Launch",
  },
];

function AccentDot() {
  return (
    <span
      className="inline-block size-4 shrink-0 bg-accent [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]"
      aria-hidden="true"
    />
  );
}

function ContactOption({
  label,
  detail,
  href,
}: {
  label: string;
  detail: string;
  href: string;
}) {
  return (
    <a href={href} className="accent-sweep-link group">
      <span className="relative z-10 flex items-center gap-3">
        <AccentDot />
        <span>{label}</span>
      </span>
      <span className="relative z-10 max-w-xs text-sm leading-6 text-foreground/54 transition group-hover:text-foreground/82">
        {detail}
      </span>
    </a>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden bg-background px-6 py-24 lg:min-h-[calc(100vh-1.5rem)] lg:px-16 lg:py-9"
    >
      <div className="grid items-start gap-8 lg:grid-cols-[14rem_1fr_14rem]">
        <div aria-hidden="true" />
        <h2 className="font-tunnels-bold text-[clamp(4rem,8.5vw,9rem)] uppercase leading-none tracking-normal text-accent">
          Let&apos;s Talk
        </h2>
        <div className="hidden w-20 lg:block" aria-hidden="true" />
      </div>

      <div className="my-14 flex items-center gap-2 text-foreground/80">
        <span className="size-3 rounded-full border border-foreground/80" />
        <span className="h-px flex-1 bg-foreground/70" />
        <span className="size-3 rounded-full border border-foreground/80" />
      </div>

      <div className="mb-14 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {contactOptions.map((option) => (
          <ContactOption key={option.label} {...option} />
        ))}
      </div>

      <div className="grid gap-14 lg:grid-cols-[0.72fr_0.9fr_0.9fr] lg:gap-20">
        <div className="flex flex-col gap-20">
          <div>
            <p className="flex items-center gap-4 font-tunnels-bold text-[clamp(4.5rem,8vw,8.5rem)] uppercase leading-none text-foreground">
              Studio
              <AccentDot />
            </p>
            <p className="mt-12 max-w-xs text-lg font-medium uppercase leading-7 text-foreground/86">
              Kathmandu, Nepal
              <br />
              Remote-first digital studio
            </p>
          </div>

          <form
            className="max-w-lg"
            action="mailto:hello@sajilostudio.com"
            method="post"
          >
            <label
              htmlFor="newsletter"
              className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90"
            >
              Newsletter
            </label>
            <div className="mt-9 flex items-end gap-6 border-b border-foreground/80 pb-5">
              <input
                id="newsletter"
                name="email"
                type="email"
                placeholder="Your Email"
                className="min-w-0 flex-1 bg-transparent text-lg text-foreground placeholder:text-foreground/86 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Submit email"
                className="grid size-10 place-items-center text-foreground transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <ArrowRight className="size-8" />
              </button>
            </div>
          </form>
        </div>

        <div>
          <ul className="space-y-3 text-lg font-semibold uppercase leading-tight text-foreground/92">
            {services.slice(0, 6).map((service) => (
              <li key={service.title}>{service.title}</li>
            ))}
            <li>Launch Support</li>
          </ul>

        </div>

        <div className="flex flex-col justify-between gap-16">
          <div className="space-y-14 lg:pt-36">
            <Link
              href="#services"
              className="flex items-center justify-end gap-4 font-tunnels-bold text-[clamp(4.5rem,7vw,8rem)] uppercase leading-none text-foreground transition hover:text-accent"
            >
              Services
              <AccentDot />
            </Link>
            <Link
              href="#work"
              className="flex items-center justify-start gap-4 font-tunnels-bold text-[clamp(4.5rem,7vw,8rem)] uppercase leading-none text-foreground transition hover:text-accent"
            >
              Work
              <AccentDot />
            </Link>
          </div>

          <div className="flex flex-col gap-6 text-sm text-foreground/86 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy;2026 Sajilo Studio</p>
            <div className="flex flex-wrap gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
