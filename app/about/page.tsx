import type { Metadata } from "next";
import { about, site } from "@/lib/content";
import {
  BracketLink,
  Container,
  Label,
  PageHeader,
  Plate,
  Section,
  SectionHead,
  SpecRow,
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

              <div className="mt-12">
                <SectionHead
                  sectionRef="§ 1"
                  label="Selected work"
                  note={`${about.wins.length} entries`}
                />
                <div className="border-b border-line">
                  {about.wins.map((win, i) => (
                    <SpecRow
                      key={win.slice(0, 30)}
                      sectionRef={String(i + 1).padStart(2, "0")}
                      title={win}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <BracketLink href="/contact">Get in touch</BracketLink>
                <BracketLink href="/newsletter" variant="outline">
                  Read the newsletter
                </BracketLink>
              </div>
            </div>

            <aside>
              <Plate
                src={site.portrait}
                alt={`Portrait of ${site.name}`}
                caption="Fig. 1 — R. Wells"
              />

              <div className="mt-9">
                <Label className="border-b-2 border-rule pb-2 text-ink">
                  Track record
                </Label>
                <div className="mt-1">
                  {about.timeline.map((entry) => (
                    <div
                      key={`${entry.period}-${entry.org}`}
                      className="border-b border-line py-4"
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
