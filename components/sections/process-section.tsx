import { processIntro, processSteps } from "@/data/process";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="section-spacing border-b border-white/10 bg-[linear-gradient(180deg,rgba(79,140,255,0.12),rgba(4,5,10,0.98))]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={processIntro.eyebrow}
            title={
              <>
                A clear path from rough idea to polished{" "}
                <GradientText>digital presence.</GradientText>
              </>
            }
            description={processIntro.description}
          />
        </Reveal>

        <div className="relative mt-14 grid gap-5 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-cyan/0 via-cyan/30 to-violet/0 lg:block" />
          {processSteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.06}>
              <article className="studio-card relative min-h-80 rounded-3xl p-7 text-white">
                <span className="grid size-12 place-items-center rounded-full border border-cyan/28 bg-cyan/10 text-sm font-black text-cyan shadow-[0_0_40px_rgba(100,233,255,0.16)]">
                  {item.step}
                </span>
                <h3 className="mt-20 text-3xl font-black uppercase leading-none">
                  {item.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-white/62">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
