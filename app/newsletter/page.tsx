import type { Metadata } from "next";
import { formatDateShort, newsletter, newsletterIssues } from "@/lib/content";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  Container,
  Label,
  PageHeader,
  Section,
  SectionHead,
  SpecRow,
  TextLink,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Newsletter",
  description: newsletter.pitch,
};

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        sectionRef="04"
        label={newsletter.cadence}
        title={newsletter.name}
        lede={newsletter.pitch}
      />

      <Section top="tight" bottom="tight">
        <Container>
          <div className="max-w-md">
            <NewsletterForm />
            <Label className="mt-2.5 text-faint">{newsletter.disclaimer}</Label>
          </div>
        </Container>
      </Section>

      <Section top="tight">
        <Container>
          <SectionHead
            sectionRef="§ 1"
            label="Archive"
            note={`${newsletterIssues.length} issues`}
          />
          <div className="border-b border-line">
            {newsletterIssues.map((issue) => (
              <SpecRow
                key={issue.no}
                sectionRef={issue.no}
                title={issue.title}
                body={issue.dek}
                meta={`${formatDateShort(issue.date)} · ${issue.tag}`}
                href={issue.href}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section top="tight">
        <Container>
          <SectionHead sectionRef="§ 2" label="What you get" />
          <div className="border-b border-line">
            {newsletter.promises.map((line, i) => (
              <SpecRow
                key={line.slice(0, 30)}
                sectionRef={String(i + 1).padStart(2, "0")}
                title={line}
              />
            ))}
          </div>
          <div className="mt-8 max-w-md">
            <NewsletterForm />
          </div>
          <div className="mt-8">
            <TextLink href="/guides">Browse the guides</TextLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
