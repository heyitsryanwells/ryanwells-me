import type { Metadata } from "next";
import { guides, newsletter } from "@/lib/content";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  Container,
  Label,
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

      <Section top="tight">
        <Container>
          <div className="border-2 border-rule bg-panel p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end lg:gap-16">
              <div>
                <Label className="text-accent">Notification</Label>
                <h2 className="type-heading mt-3 text-2xl sm:text-3xl">
                  New guides land in the newsletter first
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                  {newsletter.pitch}
                </p>
              </div>
              <div>
                <NewsletterForm />
                <Label className="mt-2.5 text-faint">
                  {newsletter.disclaimer}
                </Label>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
