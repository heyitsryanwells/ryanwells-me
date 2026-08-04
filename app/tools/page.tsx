import type { Metadata } from "next";
import { stack, toolCategories } from "@/lib/content";
import { SectionNav } from "@/components/section-nav";
import { Container, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tools",
  description: "Some of my favorite tools from our GTM tech stack.",
};

/** Marks live on `stack`, so they are looked up rather than duplicated here. */
const markFor = (name: string) =>
  stack.items.find((i) => i.name === name && "logo" in i && i.logo)?.logo;

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Long-form stack page: a sticky category index on the left, sections
 * scrolling on the right.
 *
 * Built for the write-ups that are coming. Until a tool has a `note` it
 * renders as a mark and a name, so the page is honest about being a list
 * today and turns into a document one paragraph at a time.
 *
 * The earlier version put every category in an equal grid cell, which is what
 * made the balance feel wrong: six of the nine categories hold a single tool,
 * so those cells filled 8 to 32 percent of their width while the last row ran
 * to 104. A section is only as tall as its content, so that mismatch stops
 * mattering here.
 */
export default function ToolsPage() {
  const items = toolCategories.map((g) => ({
    id: slug(g.category),
    label: g.category,
  }));

  return (
    <>
      <PageHeader
        label="Stack"
        title="Tools I use"
        lede="Some of my favorite tools from our GTM tech stack."
      />

      <Section top="tight">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[13rem_1fr]">
            {/* Sticky below the 4rem nav, with a little air above it. */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <SectionNav items={items} />
            </div>

            <div>
              {toolCategories.map((group) => {
                /* A section with no write-ups yet is a heading and a mark, so
                   it gets tighter spacing. Otherwise the page reads as nine
                   near-empty bands until every note is written. The moment a
                   note lands the section opens up on its own. */
                const written = group.tools.some((t) => t.note);
                return (
                <section
                  key={group.category}
                  id={slug(group.category)}
                  /* Clears the sticky site nav when jumped to. */
                  className={`scroll-mt-24 border-t border-line first:border-t-0 first:pt-0 ${
                    written ? "py-10" : "py-6"
                  }`}
                >
                  <h2 className="type-heading text-xl text-accent sm:text-2xl">
                    {group.category}
                  </h2>

                  <div className={written ? "mt-7 space-y-9" : "mt-4 space-y-3"}>
                    {group.tools.map((tool) => {
                      const logo = markFor(tool.name);
                      return (
                        <div key={tool.name}>
                          <a
                            href={tool.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-4"
                          >
                            <span className="flex h-6 items-center">
                              {logo ? (
                                <img
                                  src={logo}
                                  alt=""
                                  aria-hidden="true"
                                  className="logo-mark max-h-6 w-auto object-contain"
                                />
                              ) : null}
                            </span>
                            <span className="type-label text-faint transition-colors group-hover:text-accent">
                              {tool.name}
                            </span>
                          </a>

                          {tool.note ? (
                            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink">
                              {tool.note}
                            </p>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </section>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
