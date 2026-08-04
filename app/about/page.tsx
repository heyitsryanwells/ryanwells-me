import type { Metadata } from "next";
import { about, site } from "@/lib/content";
import {
  BracketLink,
  Container,
  Label,
  PageHeader,
  Section,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: about.lede,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        sectionRef="02"
        label="About"
        title={about.heading}
        lede={about.lede}
      />

      <Section top="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
            <div className="max-w-2xl">
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mb-5 text-base leading-relaxed text-ink sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-10 flex flex-wrap gap-3">
                <BracketLink href="/contact">Get in touch</BracketLink>
                <BracketLink href="/guides" variant="outline">
                  Browse the guides
                </BracketLink>
              </div>
            </div>

            <aside>
              {/* Circular photographic crop rather than the hero's pixel
                  plate, so the two pages do not lead with the same image. */}
              <img
                src={site.avatar}
                alt={`Portrait of ${site.name}`}
                width={640}
                height={640}
                className="mx-auto block h-auto w-full max-w-[16rem] lg:mx-0"
              />

              <div className="mt-9">
                <Label className="pb-2 text-ink">
                  Track record
                </Label>
                <div className="mt-1">
                  {about.timeline.map((entry) => (
                    <div
                      key={`${entry.period}-${entry.org}`}
                      className="py-4"
                    >
                      <Label className="text-accent">{entry.period}</Label>
                      <p className="type-heading mt-2 text-base">
                        {entry.role}
                      </p>
                      <Label className="mt-1 text-faint">{entry.org}</Label>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {entry.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
