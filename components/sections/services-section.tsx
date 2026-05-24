"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

import {
  serviceHighlights,
  services,
  servicesIntro,
} from "@/data/services";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { SectionHeading } from "@/components/ui/section-heading";

type Service = (typeof services)[number];

const cardEase = [0.22, 1, 0.36, 1] as const;

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const Icon = service.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        duration: 0.72,
        delay: index * 0.06,
        ease: cardEase,
      }}
      className={cn(
        "group/service relative",
        service.featured ? "lg:col-span-2 lg:row-span-2" : "",
      )}
    >
      <a
        ref={cardRef}
        href="#contact"
        className={cn(
          "animated-border studio-card relative flex h-full min-h-80 flex-col overflow-hidden rounded-[1.75rem] p-px transition duration-300 will-change-transform",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky",
        )}
        onPointerMove={(event) => {
          const target = cardRef.current;
          if (!target || window.matchMedia("(pointer: coarse)").matches) {
            return;
          }

          const rect = target.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const moveX = (x - rect.width / 2) * 0.035;
          const moveY = (y - rect.height / 2) * 0.035;

          target.style.setProperty("--service-glow-x", `${x}px`);
          target.style.setProperty("--service-glow-y", `${y}px`);
          target.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        }}
        onPointerLeave={() => {
          const target = cardRef.current;
          if (!target) {
            return;
          }

          target.style.transform = "translate3d(0, 0, 0)";
        }}
      >
        <div
          className={cn(
            "relative flex h-full flex-col rounded-[calc(1.75rem-1px)] bg-background/88 p-6",
            service.featured ? "sm:p-8" : "",
          )}
        >
          <div className="flex items-start justify-between gap-5">
            <div
              className={cn(
                "grid size-13 place-items-center rounded-2xl bg-accent text-foreground transition duration-300 group-hover/service:scale-105 group-hover/service:rotate-3",
              )}
            >
              <Icon className="size-6" aria-hidden="true" />
            </div>
            <span className="rounded-full border border-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/42">
              0{index + 1}
            </span>
          </div>

          <div className={cn("mt-12", service.featured ? "lg:mt-24" : "")}>
            <h3
              className={cn(
                "max-w-xl font-black uppercase leading-[0.95] text-foreground text-balance",
                service.featured ? "text-4xl sm:text-5xl" : "text-2xl",
              )}
            >
              {service.title}
            </h3>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-foreground/62">
              {service.description}
            </p>
          </div>

          <div className="mt-auto pt-10">
            <p className="max-w-xl text-sm leading-6 text-sky/86">
              {service.outcome}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-foreground">
              Explore service
              <ArrowUpRight
                className="size-4 transition group-hover/service:translate-x-0.5 group-hover/service:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="section-spacing relative overflow-hidden border-b border-foreground/10"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_0.55fr] lg:items-end">
          <SectionHeading
            eyebrow={servicesIntro.eyebrow}
            title={
              <>
                Digital services that make Nepali businesses{" "}
                <GradientText>look credible fast.</GradientText>
              </>
            }
            description={servicesIntro.description}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.7, ease: cardEase }}
            className="grid gap-2 rounded-[1.5rem] border border-foreground/10 bg-foreground/[0.035] p-3"
          >
            {serviceHighlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-foreground/68"
              >
                <span className="grid size-6 place-items-center rounded-full bg-sky/12 text-sky">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {highlight}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-14 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
