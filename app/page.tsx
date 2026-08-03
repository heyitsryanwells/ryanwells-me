import {
  expertise,
  guides,
  hero,
  proofBar,
  site,
} from "@/lib/content";
import {
  BracketLink,
  Container,
  Label,
  Section,
  SectionHead,
  SpecRow,
  TextLink,
} from "@/components/ui";

export default function Home() {
  const featured = guides.filter((g) => g.featured);

  return (
    <>
      {/* Hero ---------------------------------------------------------------
          Deliberately looser than the rest of the site: no opening rule, no
          spec table, no figure caption. The document structure starts at § 1.
      --------------------------------------------------------------------- */}
      <Section top="default" bottom="tight">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <h1 className="type-display is-mixed text-[3.25rem] sm:text-[4.5rem] lg:text-[5.5rem]">
                {hero.greeting}{" "}
                <span className="text-accent">{hero.firstName}</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                {hero.intro}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <BracketLink href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                </BracketLink>
                <BracketLink href={hero.secondaryCta.href} variant="outline">
                  {hero.secondaryCta.label}
                </BracketLink>
              </div>
            </div>

            {/* Tilted and unframed so the hero reads softer than the plates
                used on interior pages. */}
            <div className="mx-auto w-full max-w-sm lg:max-w-none">
              <div className="plate rotate-[2deg] transition-transform duration-500 ease-out hover:rotate-0">
                <img
                  src={site.portrait}
                  alt={hero.portraitAlt}
                  width={1100}
                  height={1100}
                  className="block h-full w-full object-cover"
                />
              </div>
            </div>
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

      {/* Guides index -------------------------------------------------------- */}
      <Section top="tight">
        <Container>
          <SectionHead
            sectionRef="§ 2"
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

    </>
  );
}
