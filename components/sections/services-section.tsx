import { services } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ServicesSection() {
  return (
    <section id="services" className="border-b border-white/10 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="A connected digital studio for the things local businesses need most."
            description="Each service is designed to work alone or as part of a full launch system."
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal
                key={service.title}
                delay={index * 0.04}
                className="min-h-72 bg-[#080808] p-7 transition hover:bg-[#10100d]"
              >
                <div className="mb-10 grid size-12 place-items-center rounded-2xl bg-lime-300 text-black">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{service.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
