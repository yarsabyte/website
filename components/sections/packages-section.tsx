import { Check, Sparkles } from "lucide-react";

import { packages, packagesIntro } from "@/data/packages";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { PremiumButton } from "@/components/ui/premium-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function PackagesSection() {
  return (
    <section
      id="packages"
      className="section-spacing relative overflow-hidden border-b border-foreground/10"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_48%_0%,color-mix(in_srgb,var(--sky)_16%,transparent),transparent_30rem),radial-gradient(circle_at_88%_18%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_24rem)]" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
          <SectionHeading
            eyebrow={packagesIntro.eyebrow}
            title={
              <>
                Choose the setup that matches your{" "}
                <GradientText>next stage.</GradientText>
              </>
            }
            description={packagesIntro.description}
          />

          <Reveal className="rounded-[1.5rem] border border-foreground/10 bg-foreground/[0.04] p-5">
            <div className="flex items-center gap-3 text-accent">
              <Sparkles className="size-5" aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-[0.18em]">
                Custom plans available
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-foreground/58">
              Custom plans available based on your business. We can mix website,
              posters, reels, branding, and setup support into one practical plan.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {packages.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.06} className="h-full">
              <article
                className={cn(
                  "relative flex h-full min-h-[34rem] flex-col overflow-hidden rounded-[1.75rem] p-px",
                  item.recommended
                    ? "animated-border shadow-[0_28px_90px_color-mix(in_srgb,var(--blue)_22%,transparent)] lg:-translate-y-4"
                    : "border border-foreground/10",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0",
                    item.recommended
                      ? "bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--sky)_28%,transparent),transparent_18rem)]"
                      : "bg-foreground/[0.025]",
                  )}
                />
                <div className="relative flex h-full flex-col rounded-[calc(1.75rem-1px)] bg-background/92 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p
                      className={cn(
                        "text-xs font-bold uppercase tracking-[0.2em]",
                        item.recommended ? "text-sky" : "text-foreground/42",
                      )}
                    >
                      {item.eyebrow}
                    </p>
                    {item.recommended ? (
                      <span className="rounded-full bg-sky px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-background">
                        Recommended
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-8 text-3xl font-black uppercase leading-none text-foreground text-balance">
                    {item.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-foreground/58">{item.bestFor}</p>

                  <div className="mt-8 border-y border-foreground/10 py-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/42">
                      {item.priceNote}
                    </p>
                    <p className="mt-2 text-4xl font-black text-foreground">{item.price}</p>
                  </div>

                  <ul className="mt-7 space-y-3">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-6 text-foreground/68">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sky/12 text-sky">
                          <Check className="size-3.5" aria-hidden="true" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <PremiumButton
                    href="#contact"
                    className={cn("mt-auto w-full", item.recommended ? "" : "button-ghost text-foreground")}
                    variant={item.recommended ? "primary" : "ghost"}
                  >
                    Choose Package
                  </PremiumButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-sm leading-7 text-foreground/52">
            Prices are placeholders and may change based on pages, content volume,
            revisions, and ongoing support needs.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
