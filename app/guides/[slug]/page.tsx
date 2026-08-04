import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guideFormats, guides, type Block } from "@/lib/guides";
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

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <>
      <PageHeader
        sectionRef={guide.ref}
        label="Guide"
        title={guide.title}
        lede={guide.dek}
      />

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

          <div className="mt-12 max-w-2xl">
            {guide.sections.map((section, i) => (
              <section key={section.heading} className="mb-14">
                <Label className="mb-4 text-ink">
                  <span className="text-accent">
                    {String(i + 1).padStart(2, "0")}/&nbsp;&nbsp;
                  </span>
                  {section.heading}
                </Label>
                <Blocks blocks={section.blocks} />
              </section>
            ))}
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
