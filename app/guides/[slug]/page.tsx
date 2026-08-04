import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guideFormats, guides, type Block } from "@/lib/guides";
import { SectionNav } from "@/components/section-nav";
import { Container, Label, PageHeader, Section } from "@/components/ui";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.metaDescription };
}

function Blocks({ blocks }: { blocks: readonly Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p
              key={i}
              className="mb-5 text-base leading-relaxed text-ink sm:text-lg"
            >
              {block.text}
            </p>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="prose-list mb-6">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "quote") {
          return (
            <p
              key={i}
              className="type-heading my-8 max-w-2xl text-xl leading-snug text-accent sm:text-2xl"
            >
              {block.text}
            </p>
          );
        }
        return (
          <figure key={i} className="mb-6">
            <pre className="code-block">
              <code>{block.code}</code>
            </pre>
            {block.caption ? (
              <Label className="mt-2 text-faint">{block.caption}</Label>
            ) : null}
          </figure>
        );
      })}
    </>
  );
}

const sectionId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const navItems = guide.sections.map((section, i) => ({
    id: sectionId(section.heading),
    label: `${String(i + 1).padStart(2, "0")}  ${section.heading}`,
  }));

  return (
    <>
      {/* No ref on the header. It used to print the guide's catalog number,
          which landed a `01/` directly above the `01/` on the first section
          heading below: same token, same accent, two different counters. The
          document's own section numbers won that slot. */}
      <PageHeader label="Guide" title={guide.title} lede={guide.dek} />

      <Section top="tight" bottom="tight">
        <Container>
          {/* Metadata reads as a spec header, monospace like every other piece
              of structural data on the site. */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Label className="text-tertiary">
              {guideFormats[guide.format].emoji}{" "}
              {guideFormats[guide.format].label}
            </Label>
            <Label className="text-tertiary">{guide.published}</Label>
          </div>

          {/*
            Two columns. The measure stays at a readable 42rem, and the index
            fills the 688px of empty page that sat beside it. A ten-section
            piece runs thirteen screens, so a reader needs a way back to a
            section they have already passed.
          */}
          <div className="mt-12 grid gap-x-16 lg:grid-cols-[14rem_minmax(0,44rem)]">
            <div className="min-w-0 lg:col-start-2 lg:row-start-1">
              {guide.cover ? (
                <img
                  src={guide.cover.src}
                  alt={guide.cover.alt}
                  width={768}
                  height={768}
                  className="plate-lift mb-14 block aspect-square w-full max-w-[20rem] object-cover"
                />
              ) : null}

              {guide.sections.map((section, i) => (
                <section
                  key={section.heading}
                  id={sectionId(section.heading)}
                  className="mb-14 scroll-mt-24"
                >
                  <Label className="mb-4 text-ink">
                    {/* The one place a heading still carries a ref: ten
                        sections is long enough that the number marks progress
                        and gives a reader something to cite. */}
                    <span className="text-accent">
                      {String(i + 1).padStart(2, "0")}/&nbsp;&nbsp;
                    </span>
                    {section.heading}
                  </Label>
                  <Blocks blocks={section.blocks} />
                </section>
              ))}
            </div>

            {/* Index second in the DOM so a screen reader and a phone both get
                the article first. Ordered back to the left visually at lg. */}
            <div className="hidden lg:sticky lg:top-24 lg:col-start-1 lg:row-start-1 lg:block lg:self-start">
              <SectionNav items={navItems} />
            </div>
          </div>

          <div className="mt-4">
            <Link
              href="/guides"
              className="type-label text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              All guides
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
