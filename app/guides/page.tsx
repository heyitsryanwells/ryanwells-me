import Link from "next/link";
import type { Metadata } from "next";
import { guides, newsletter } from "@/lib/content";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  ArrowRight,
  Card,
  Container,
  PageHeader,
  Section,
  Tag,
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
        eyebrow="Guides"
        title="Templates and playbooks"
        lede="Every guide here comes out of a system I actually built and had to defend. Take what's useful."
      />

      <Section top="tight">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {guides.map((guide) => (
              <Link key={guide.title} href={guide.href} className="group">
                <Card interactive className="flex h-full flex-col">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <span className="text-3xl" aria-hidden="true">
                      {guide.emoji}
                    </span>
                    <Tag>{guide.format}</Tag>
                  </div>
                  <h2 className="font-display text-2xl leading-snug text-ink transition-colors group-hover:text-accent">
                    {guide.title}
                  </h2>
                  <p className="mt-3.5 flex-1 text-sm leading-relaxed text-muted">
                    {guide.dek}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Get the guide
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section bordered>
        <Container>
          <div className="rounded-card border border-line bg-surface px-8 py-12 sm:px-14">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 className="font-display text-2xl text-ink sm:text-3xl">
                  New guides land in the newsletter first
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {newsletter.pitch}
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
