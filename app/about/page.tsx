import type { Metadata } from "next";
import { about, site } from "@/lib/content";
import { RocketLaunch, SatelliteDrift } from "@/components/space-backdrop";
import {
  BracketLink,
  Container,
  Label,
  PageHeaderBody,
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
        {/* Below the body copy. Higher up it crossed the portrait and the
            display type. */}
        <SatelliteDrift top="76%" />
        {/* The satellite sits low, so the rocket carries the top of the page.
            Both pass behind the text. */}
        <RocketLaunch />

        <div className="relative z-10">
          <Section top="none" bottom="tight">
            <Container>
              {/* The header sits inside the left column rather than above the
                  grid, so the sidebar starts level with it. That lifts the
                  portrait and the whole timeline by the height of the header
                  and takes a few hundred pixels off the page. */}
              <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
                <div>
                  <PageHeaderBody
                    sectionRef="02"
                    label="About"
                    title={about.heading}
                    subtitle={site.name}
                    lede={about.lede}
                  />

                  <div className="mt-10 max-w-2xl">
                    {about.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="mb-5 text-base leading-relaxed text-ink sm:text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Outside of ops sits in this column rather than in its own
                      band below the grid. The timeline runs 427px past the end
                      of the copy, and this is what fills that. */}
                  <div className="mt-14 max-w-2xl">
                    <SectionHead
                      sectionRef="01"
                      label={about.personal.heading}
                    />
                    <p className="text-base leading-relaxed text-ink sm:text-lg">
                      {about.personal.body}
                    </p>
                  </div>
                </div>

                {/* Matches PageHeaderBody's own top padding so the portrait
                    and the "About" label share a baseline. */}
                <aside className="pt-10 sm:pt-14">
                  {/* Circular photographic crop rather than the hero's pixel
                      plate, so the two pages do not lead with the same image.
                      Backdrop is keyed out of the asset; .avatar-disc supplies
                      the fill and the amber halo. */}
                  <img
                    src={site.avatar}
                    alt={`Portrait of ${site.name}`}
                    width={640}
                    height={640}
                    className="avatar-disc mx-auto block h-auto w-full max-w-[16rem] lg:mx-0"
                  />

                  <div className="mt-12">
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

      {/* Closing actions. Kept out of the grid so they read as the end of the
          page, and so the mobile order stays copy, timeline, then what to do
          next. */}
      <Section top="tight">
        <Container>
          <div className="flex flex-wrap gap-3">
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
