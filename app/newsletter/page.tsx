import Link from "next/link";
import type { Metadata } from "next";
import { formatDate, newsletter, newsletterIssues } from "@/lib/content";
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
  title: "Newsletter",
  description: newsletter.pitch,
};

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        eyebrow={newsletter.cadence}
        title={newsletter.name}
        lede={newsletter.pitch}
      />

      <Container>
        <div className="max-w-md pb-4">
          <NewsletterForm />
          <p className="mt-4 text-xs text-muted">{newsletter.disclaimer}</p>
        </div>
      </Container>

      <Section top="tight">
        <Container>
          <h2 className="font-eyebrow mb-8 text-xs text-muted">
            Every issue
          </h2>

          <div className="border-t border-line">
            {newsletterIssues.map((issue) => (
              <Link
                key={issue.title}
                href={issue.href}
                className="group block border-b border-line py-8 transition-colors hover:bg-surface"
              >
                <div className="grid gap-4 lg:grid-cols-[9rem_1fr_auto] lg:items-baseline lg:gap-8">
                  <span className="text-sm text-muted">
                    {formatDate(issue.date)}
                  </span>
                  <div>
                    <div className="mb-3 lg:hidden">
                      <Tag>{issue.tag}</Tag>
                    </div>
                    <h3 className="font-display text-xl leading-snug text-ink transition-colors group-hover:text-accent sm:text-2xl">
                      {issue.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted">
                      {issue.dek}
                    </p>
                  </div>
                  <div className="hidden lg:block">
                    <Tag>{issue.tag}</Tag>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Card className="mt-14">
            <h2 className="font-display text-xl text-ink">
              What you get
            </h2>
            <ul className="mt-5 space-y-3.5">
              {[
                "A real system I built or broke, with the reasoning behind the decisions.",
                "Queries, field specs, and report definitions you can lift directly.",
                "The failure modes I hit, so you can skip that part.",
              ].map((line) => (
                <li key={line.slice(0, 30)} className="flex gap-4">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-muted">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 max-w-md">
              <NewsletterForm />
            </div>
          </Card>
        </Container>
      </Section>

      <Section bordered>
        <Container>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
          >
            Browse the guides
            <ArrowRight />
          </Link>
        </Container>
      </Section>
    </>
  );
}
