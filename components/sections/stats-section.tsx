import { stats } from "@/data/stats";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function StatsSection() {
  return (
    <section className="border-b border-white/10 py-10">
      <Container>
        <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 md:grid-cols-4">
          {stats.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.04}>
              <div className="min-h-44 bg-[#070913]/90 p-5">
                <p className="text-3xl font-black uppercase leading-none text-white">
                  {item.value}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
                  {item.label}
                </p>
                <p className="mt-4 text-sm leading-6 text-white/52">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
