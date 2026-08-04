import type { Metadata } from "next";
import { about, site } from "@/lib/content";
import {
  BracketLink,
  Container,
  Label,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: about.metaDescription,
};

/**
 * Present tense first, history compressed, personal note last.
 *
 * The previous version opened with a chronological career walk and hung a
 * six-entry timeline in the sidebar, which buried what Ryan actually does now.
 * The old roles are still here, reduced to a company list.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        sectionRef="02"
        label="About"
        title={about.heading}
        lede={about.lede}
      />

      <Section top="tight" bottom="tight">
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
            </aside>
          </div>
        </Container>
      </Section>

      {/* Where I have worked ------------------------------------------- */}
      <Section top="tight" bottom="tight">
        <Container>
          <SectionHead
            sectionRef="01"
            label={about.companies.heading}
            note={`${about.companies.items.length} entries`}
          />
          <ul className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {about.companies.items.map((c) => (
              <li key={c.name}>
                <p className="type-heading text-lg">{c.name}</p>
                <Label className="mt-1.5 text-tertiary">{c.note}</Label>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Outside of ops ------------------------------------------------- */}
      <Section top="tight">
        <Container>
          <SectionHead sectionRef="02" label={about.personal.heading} />
          <p className="max-w-2xl text-base leading-relaxed text-ink sm:text-lg">
            {about.personal.body}
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            <BracketLink href="/contact">Get in touch</BracketLink>
            <BracketLink href="/guides" variant="outline">
              Browse the guides
            </BracketLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
