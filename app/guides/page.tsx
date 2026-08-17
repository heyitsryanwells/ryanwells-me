import type { Metadata } from "next";
import { guides, guidesIndex } from "@/lib/guides";
import { GuideGrid } from "@/components/guide-card";
import { Container, PageHeader, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Write-ups from revenue systems built and kept running in production.",
};

export default function GuidesPage() {
  return (
    <>
      {/* Titled for the formats that exist. Was "Templates and playbooks"
          until field notes arrived and made that a partial list. */}
      <PageHeader
        label="Guides"
        title="Playbooks, templates and field notes"
        lede={guidesIndex.lede}
      />

      <Section top="tight">
        <Container>
          {/* Label and count only. The rows below carry the page's one
              counter, and a ref here would have numbered a single section
              while claiming the same token. */}
          <SectionHead
            label="Index"
            note={`${guides.length} ${guides.length === 1 ? "entry" : "entries"}`}
          />
          <GuideGrid guides={guides} />
        </Container>
      </Section>
    </>
  );
}
