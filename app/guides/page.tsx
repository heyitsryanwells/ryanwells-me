import type { Metadata } from "next";
import { guides, guidesIndex } from "@/lib/guides";
import {
  Container,
  PageHeader,
  Section,
  SectionHead,
  SpecRow,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Write-ups from revenue systems built and kept running in production.",
};

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        sectionRef="03"
        label="Guides"
        title="Templates and playbooks"
        lede={guidesIndex.lede}
      />

      <Section top="tight">
        <Container>
          <SectionHead
            sectionRef="01"
            label="Index"
            note={`${guides.length} ${guides.length === 1 ? "entry" : "entries"}`}
          />
          <div>
            {guides.map((guide) => (
              <SpecRow
                key={guide.ref}
                sectionRef={guide.ref}
                title={guide.title}
                body={guide.dek}
                meta={guide.format}
                href={`/guides/${guide.slug}`}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
