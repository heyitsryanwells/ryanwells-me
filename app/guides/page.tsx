import type { Metadata } from "next";
import { guideFormats, guides, guidesIndex } from "@/lib/guides";
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
        label="Guides"
        title="Templates and playbooks"
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
          <div>
            {guides.map((guide) => (
              <SpecRow
                key={guide.ref}
                sectionRef={guide.ref}
                title={guide.title}
                body={guide.dek}
                meta={`${guideFormats[guide.format].emoji} ${guideFormats[guide.format].label}`}
                href={`/guides/${guide.slug}`}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
