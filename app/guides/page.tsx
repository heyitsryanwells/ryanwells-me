import type { Metadata } from "next";
import { guides } from "@/lib/content";
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
    "Templates, playbooks, and field guides for building revenue systems that hold up in production.",
};

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        sectionRef="03"
        label="Guides"
        title="Templates and playbooks"
        lede="Every guide here comes out of a system I actually built and had to defend. Take what's useful."
      />

      <Section top="tight">
        <Container>
          <SectionHead
            sectionRef="§ 1"
            label="Index"
            note={`${guides.length} entries`}
          />
          <div className="border-b border-line">
            {guides.map((guide) => (
              <SpecRow
                key={guide.ref}
                sectionRef={guide.ref}
                title={guide.title}
                body={guide.dek}
                meta={guide.format}
                href={guide.href}
              />
            ))}
          </div>
        </Container>
      </Section>

    </>
  );
}
