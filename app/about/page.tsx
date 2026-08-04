import type { Metadata } from "next";
import { about, site } from "@/lib/content";
import { SatelliteDrift } from "@/components/space-backdrop";
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
 * Present tense first, timeline in the sidebar, personal note last.
 *
 * The header and body sit inside a starfield with a satellite crossing it,
 * echoing the home page. Both are ornament: aria-hidden, behind the content,
 * and stopped under prefers-reduced-motion.
 */
export default function AboutPage() {
  return (
    <>
      <div className="starfield relative overflow-hidden">
        <SatelliteDrift top="14%" />

        <div className="relative z-10">
          <PageHeader
            sectionRef="02"
            label="About"
            title={about.heading}
            subtitle={site.name}
            lede={about.lede}
          />

          <Section top="tight" bottom="tight">
            <Container>
              <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
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

                  <div className="mt-10">
                    <Label className="text-ink">Track record</Label>
                    <div className="mt-2">
                      {about.timeline.map((entry) => (
                        <div
                          key={`${entry.period}-${entry.org}`}
                          className="py-4"
                        >
                          <Label className="text-accent">{entry.period}</Label>
                          <p className="type-heading mt-2 text-base">
                            {entry.role}
                          </p>
                          <Label className="mt-1 text-tertiary">
                            {entry.org}
                          </Label>
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
        </div>
      </div>

      {/* Outside of ops ------------------------------------------------- */}
      <Section top="tight">
        <Container>
          <SectionHead sectionRef="01" label={about.personal.heading} />
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
