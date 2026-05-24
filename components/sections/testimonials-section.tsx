import { testimonials, testimonialsIntro } from "@/data/testimonials";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function TestimonialsSection() {
  return (
    <section className="section-spacing border-b border-foreground/10">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={testimonialsIntro.eyebrow}
            title={
              <>
                Built to hold real client proof as Sajilo Studio{" "}
                <GradientText>grows.</GradientText>
              </>
            }
            description={testimonialsIntro.description}
          />
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {testimonials.map((item, index) => (
            <Reveal key={item.author} delay={index * 0.06}>
              <figure className="studio-card min-h-72 rounded-3xl p-7">
                <p className="mb-8 inline-flex rounded-full border border-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {item.label}
                </p>
                <blockquote className="text-2xl font-medium leading-snug text-foreground">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-10">
                  <p className="font-semibold text-sky">{item.author}</p>
                  <p className="mt-1 text-sm text-foreground/48">{item.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
