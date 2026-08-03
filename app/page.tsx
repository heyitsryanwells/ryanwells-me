import {
  expertise,
  formatDateShort,
  guides,
  hero,
  newsletter,
  newsletterIssues,
  proofBar,
  site,
} from "@/lib/content";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  BracketLink,
  Container,
  Label,
  Plate,
  RuleHeavy,
  Section,
  SectionHead,
  SpecList,
  SpecRow,
  TextLink,
} from "@/components/ui";

export default function Home() {
  const featured = guides.filter((g) => g.featured);

  return (
    <>
      {/* Masthead ---------------------------------------------------------- */}
      <Section top="tight" bottom="tight">
        <Container>
          <RuleHeavy />
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 pt-2.5">
            <Label className="text-accent">{hero.role}</Label>
            <Label className="text-faint">{site.location}</Label>
          </div>

          <h1 className="type-display mt-5 text-[3.5rem] leading-[0.88] sm:text-[7rem] lg:text-[9rem]">
            {hero.name}
          </h1>

          <div className="mt-10 grid gap-10 border-t-2 border-rule pt-8 lg:grid-cols-[1fr_22rem] lg:gap-16">
            <div>
              <p className="max-w-2xl text-lg leading-relaxed text-ink sm:text-xl">
                {hero.intro}
              </p>

              <SpecList items={hero.specs} className="mt-9 max-w-xl" />

              <div className="mt-9 flex flex-wrap gap-3">
                <BracketLink href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                </BracketLink>
                <BracketLink href={hero.secondaryCta.href} variant="outline">
                  {hero.secondaryCta.label}
                </BracketLink>
              </div>
            </div>

            <Plate
              src={site.portrait}
              alt={`Portrait of ${site.name}`}
              caption={hero.plateCaption}
            />
          </div>
        </Container>
      </Section>

      {/* Systems strip ------------------------------------------------------ */}
      <Section top="none" bottom="none">
        <Container>
          <div className="flex flex-col gap-2 border-t border-line py-3 sm:flex-row sm:items-baseline sm:gap-8">
            <Label className="shrink-0 text-faint">{proofBar.heading}</Label>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              {proofBar.items.map((item, i) => (
                <Label key={item} className="text-muted">
                  {i > 0 ? (
                    <span className="mr-4 text-line" aria-hidden="true">
                      /
                    </span>
                  ) : null}
                  {item}
                </Label>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Areas of work ------------------------------------------------------ */}
      <Section top="default">
        <Container>
          <SectionHead
            sectionRef="§ 1"
            label="Capability index"
            title={expertise.heading}
            note={`${expertise.areas.length} entries`}
          />
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted">
            {expertise.subheading}
          </p>
          <div className="border-b border-line">
            {expertise.areas.map((area) => (
              <SpecRow
                key={area.ref}
                sectionRef={area.ref}
                title={area.title}
                body={area.body}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter index --------------------------------------------------- */}
      <Section top="tight">
        <Container>
          <SectionHead
            sectionRef="§ 2"
            label="Newsletter"
            title={newsletter.name}
            note={newsletter.cadence}
          />
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted">
            {newsletter.pitch}
          </p>
          <div className="border-b border-line">
            {newsletterIssues.map((issue) => (
              <SpecRow
                key={issue.no}
                sectionRef={issue.no}
                title={issue.title}
                body={issue.dek}
                meta={formatDateShort(issue.date)}
                href={issue.href}
              />
            ))}
          </div>
          <div className="mt-6">
            <TextLink href="/newsletter">All issues</TextLink>
          </div>
        </Container>
      </Section>

      {/* Guides index -------------------------------------------------------- */}
      <Section top="tight">
        <Container>
          <SectionHead
            sectionRef="§ 3"
            label="Guides"
            title="Templates and playbooks"
            note={`${guides.length} available`}
          />
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted">
            The documents I wish someone had handed me before I rebuilt these
            systems the hard way.
          </p>
          <div className="border-b border-line">
            {featured.map((guide) => (
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
          <div className="mt-6">
            <TextLink href="/guides">All guides</TextLink>
          </div>
        </Container>
      </Section>

      {/* Subscribe ----------------------------------------------------------- */}
      <Section top="tight">
        <Container>
          <div className="border-2 border-rule bg-panel p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end lg:gap-16">
              <div>
                <Label className="text-accent">{newsletter.cadence}</Label>
                <h2 className="type-heading mt-3 text-3xl sm:text-4xl">
                  {newsletter.name}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                  {newsletter.socialProof}
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
