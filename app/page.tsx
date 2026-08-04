import {
  expertise,
  guides,
  hero,
  site,
} from "@/lib/content";
import { capabilityIcons } from "@/components/icons";
import { SpaceBackdrop } from "@/components/space-backdrop";
import { StackMarquee } from "@/components/stack-marquee";
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
          spec table. The numbered document structure starts at 01/.

          Fills the viewport so the portrait is all that shows until you
          scroll. The subtracted height is the sticky nav, 3.5rem/4rem, which
          now carries no border. svh rather than vh, so mobile browser chrome
          does not push the section past the fold.
      --------------------------------------------------------------------- */}
      <div className="flex min-h-[calc(100svh-3.5rem)] flex-col sm:min-h-[calc(100svh-4rem)]">
        <Section
          top="none"
          bottom="none"
          className="starfield flex flex-1 items-center py-6 sm:py-12"
        >
          <SpaceBackdrop />
          <Container className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_30rem] lg:gap-20">
            <div>
              <h1 className="type-display is-mixed text-[3.25rem] sm:text-[4.5rem] lg:text-[6rem]">
                {hero.greeting}{" "}
                <span className="text-accent">{hero.firstName}</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl lg:max-w-2xl">
                {hero.intro.before}
                <span className="text-accent">{hero.intro.emphasis}</span>
                {hero.intro.after}
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

            {/* The portrait's sky is the same colour as the page, so the top of
                the plate dissolves while the moon and subject stay lifted by
                the shadow. Tilted, straightening on hover. */}
            <div className="mx-auto w-full max-w-[15rem] sm:max-w-sm lg:max-w-none">
              <div className="plate-lift rotate-[2deg] transition-transform duration-500 ease-out hover:rotate-0">
                <img
                  src={site.portrait}
                  alt={hero.portraitAlt}
                  width={1100}
                  height={1100}
                  className="block h-auto w-full"
                />
              </div>
            </div>
          </div>
        </Container>
        </Section>

        {/* Stack strip: black band closing out the first screen. */}
        <StackMarquee />
      </div>

      {/* Areas of work ------------------------------------------------------ */}
      <Section id="areas" top="default">
        <Container>
          <SectionHead
            sectionRef="01"
            label="Capability index"
            title={expertise.heading}
            note={`${expertise.areas.length} entries`}
          />
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted">
            {expertise.subheading}
          </p>

          {/* Panels rather than conventional cards: flat fill, square corners,
              hairline border. The gap is 1px so neighbouring borders collapse
              into a single shared line and the grid reads as one block. */}
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {expertise.areas.map((area) => {
              const Icon = capabilityIcons[area.icon];
              return (
                <div
                  key={area.ref}
                  className="group bg-paper p-7 transition-colors duration-200 hover:bg-panel sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7 text-accent" />
                    <span className="type-ref text-faint">{area.ref}/</span>
                  </div>
                  <h3 className="type-heading mt-6 text-lg text-ink sm:text-xl">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {area.body}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Guides index -------------------------------------------------------- */}
      <Section top="tight">
        <Container>
          <SectionHead
            sectionRef="02"
            label="Guides"
            title="Templates and playbooks"
            note={`${guides.length} available`}
          />
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted">
            The documents I wish someone had handed me before I rebuilt these
            systems the hard way.
          </p>
          <div>
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
