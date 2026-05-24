import { processSteps } from "@/data/process";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProcessSection() {
  return (
    <section id="process" className="section-spacing border-b border-white/10 bg-[#eef7ff] text-[#03040a]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title={<span className="text-black">Clear steps. Less confusion. Better launch energy.</span>}
            description="A premium result should still feel simple to commission, review, and launch."
            className="[&_h2]:text-black [&_p]:text-black/62"
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {processSteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.06}>
              <article className="min-h-80 rounded-3xl border border-black/10 bg-black p-7 text-white">
                <span className="text-sm font-black text-cyan">{item.step}</span>
                <h3 className="mt-20 text-3xl font-semibold">{item.title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/62">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
