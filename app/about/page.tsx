import Image from "next/image";
import type { Metadata } from "next";
import { about, site } from "@/lib/content";
import {
  ArrowRight,
  ButtonLink,
  Card,
  Container,
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
      <PageHeader eyebrow="About" title={about.heading} lede={about.lede} />

      <Section top="tight">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
            <div className="max-w-2xl">
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mb-6 text-lg leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}

              <h2 className="font-display mt-14 mb-6 text-2xl text-ink">
                Things I&apos;ve shipped
              </h2>
              <ul className="space-y-4">
                {about.wins.map((win) => (
                  <li key={win.slice(0, 40)} className="flex gap-4">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span className="text-base leading-relaxed text-muted">
                      {win}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-14 flex flex-wrap gap-4">
                <ButtonLink href="/contact" variant="primary">
                  Get in touch
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/newsletter" variant="ghost">
                  Read the newsletter
                </ButtonLink>
              </div>
            </div>

            <aside className="lg:pt-2">
              <div className="overflow-hidden rounded-card border border-line bg-surface">
                <Image
                  src={site.portrait}
                  alt={`Portrait of ${site.name}`}
                  width={640}
                  height={640}
                  className="h-full w-full object-cover"
                />
              </div>

              <Card className="mt-5">
                <p className="font-eyebrow mb-4 text-[0.65rem] text-muted">
                  Track record
                </p>
                <ul className="space-y-5">
                  {about.timeline.map((entry) => (
                    <li key={`${entry.period}-${entry.org}`}>
                      <p className="font-eyebrow text-[0.6rem] text-accent">
                        {entry.period}
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-ink">
                        {entry.role}
                      </p>
                      <p className="text-sm text-muted">{entry.org}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {entry.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
