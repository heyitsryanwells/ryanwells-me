import Image from "next/image";
import Link from "next/link";
import {
  expertise,
  formatDate,
  guides,
  hero,
  newsletter,
  newsletterIssues,
  proofBar,
  site,
} from "@/lib/content";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  ArrowRight,
  ButtonLink,
  Card,
  Container,
  Section,
  SectionHeading,
  Tag,
} from "@/components/ui";

export default function Home() {
  const featured = guides.filter((g) => g.featured);

  return (
    <>
      {/* Hero ------------------------------------------------------------ */}
      <Section top="tight">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <h1 className="font-display text-[2.75rem] leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
                {hero.greeting}{" "}
                <span className="text-accent">{hero.firstName}</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                {hero.intro}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href={hero.primaryCta.href} variant="primary">
                  {hero.primaryCta.label}
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href={hero.secondaryCta.href} variant="ghost">
                  {hero.secondaryCta.label}
                </ButtonLink>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div
                className="absolute -bottom-4 -right-4 h-full w-full rounded-card border border-accent/50"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-card border border-line bg-surface">
                <Image
                  src={site.portrait}
                  alt={hero.portraitAlt}
                  width={900}
                  height={900}
                  sizes="(min-width: 1024px) 34rem, 24rem"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Proof bar ------------------------------------------------------- */}
      <Section bordered top="tight" bottom="tight">
        <Container>
          <p className="font-eyebrow mb-7 text-center text-[0.65rem] text-muted">
            {proofBar.heading}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {proofBar.items.map((item) => (
              <li
                key={item}
                className="font-display text-lg text-muted transition-colors hover:text-ink sm:text-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Expertise ------------------------------------------------------- */}
      <Section bordered>
        <Container>
          <SectionHeading
            eyebrow="Expertise"
            title={expertise.heading}
            subtitle={expertise.subheading}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.areas.map((area, i) => (
              <Card key={area.title} interactive className="flex flex-col">
                <span className="font-eyebrow mb-5 block text-[0.65rem] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl leading-snug text-ink">
                  {area.title}
                </h3>
                <p className="mt-3.5 text-sm leading-relaxed text-muted">
                  {area.body}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Recent newsletters ---------------------------------------------- */}
      <Section bordered>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Newsletter"
              title="Recent issues"
              subtitle={newsletter.pitch}
            />
            <Link
              href="/newsletter"
              className="mb-14 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
            >
              All issues
              <ArrowRight />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {newsletterIssues.map((issue) => (
              <Link key={issue.title} href={issue.href} className="group">
                <Card interactive className="flex h-full flex-col">
                  <div className="mb-5 flex items-center gap-3">
                    <Tag>{issue.tag}</Tag>
                    <span className="text-xs text-muted">
                      {formatDate(issue.date)}
                    </span>
                  </div>
                  <h3 className="font-display text-xl leading-snug text-ink transition-colors group-hover:text-accent">
                    {issue.title}
                  </h3>
                  <p className="mt-3.5 flex-1 text-sm leading-relaxed text-muted">
                    {issue.dek}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Read
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured guides -------------------------------------------------- */}
      <Section bordered>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Guides"
              title="Templates and playbooks"
              subtitle="The documents I wish someone had handed me before I rebuilt these systems the hard way."
            />
            <Link
              href="/guides"
              className="mb-14 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
            >
              All guides
              <ArrowRight />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featured.map((guide) => (
              <Link key={guide.title} href={guide.href} className="group">
                <Card interactive className="flex h-full flex-col">
                  <span className="mb-5 block text-3xl" aria-hidden="true">
                    {guide.emoji}
                  </span>
                  <h3 className="font-display text-xl leading-snug text-ink transition-colors group-hover:text-accent">
                    {guide.title}
                  </h3>
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

      {/* Capture ---------------------------------------------------------- */}
      <Section bordered>
        <Container>
          <div className="rounded-card border border-line bg-surface px-8 py-14 text-center sm:px-14">
            <p className="font-eyebrow mb-4 text-xs text-accent">
              {newsletter.cadence}
            </p>
            <h2 className="font-display mx-auto max-w-2xl text-3xl leading-tight text-ink sm:text-4xl">
              {newsletter.name}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
              {newsletter.socialProof}
            </p>
            <div className="mx-auto mt-9 flex max-w-md justify-center">
              <NewsletterForm compact />
            </div>
            <p className="mt-4 text-xs text-muted">{newsletter.disclaimer}</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
