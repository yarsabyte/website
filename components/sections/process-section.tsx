import { processSteps } from "@/data/process";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProcessSection() {
  return (
    <section
      id="packages"
      className="section-spacing border-b border-white/10 bg-[linear-gradient(180deg,rgba(79,140,255,0.12),rgba(4,5,10,0.98))]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="Clear steps. Less confusion. Better launch energy."
            description="A premium result should still feel simple to commission, review, and launch."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {processSteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.06}>
              <article className="studio-card min-h-80 rounded-3xl p-7 text-white">
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
