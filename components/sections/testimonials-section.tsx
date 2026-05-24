import { testimonials } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function TestimonialsSection() {
  return (
    <section className="border-b border-white/10 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Client signal"
            title="Built for founders who want the internet to finally match the ambition."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {testimonials.map((item, index) => (
            <Reveal key={item.author} delay={index * 0.06}>
              <figure className="min-h-72 rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                <blockquote className="text-2xl font-medium leading-snug text-white">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-10">
                  <p className="font-semibold text-lime-200">{item.author}</p>
                  <p className="mt-1 text-sm text-white/48">{item.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
