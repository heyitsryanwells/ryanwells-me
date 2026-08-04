import type { Metadata } from "next";
import { stack, toolCategories } from "@/lib/content";
import { Container, Label, PageHeader, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tools",
  description: "The software I actually run a revenue operation on.",
};

/** Marks live on `stack`, so they are looked up rather than duplicated here. */
const markFor = (name: string) =>
  stack.items.find((i) => i.name === name && "logo" in i && i.logo)?.logo;

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        sectionRef="04"
        label="Stack"
        title="Tools I use"
        lede="No affiliate links and no rankings. This is what I actually run a revenue operation on, day to day."
      />

      <Section top="tight">
        <Container>
          {toolCategories.map((group) => (
            <div key={group.ref} className="mb-16 last:mb-0">
              <SectionHead
                sectionRef={group.ref}
                label={group.category}
                note={`${group.tools.length} entries`}
              />
              <ul className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {group.tools.map((tool) => {
                  const logo = markFor(tool.name);
                  return (
                    <li key={tool.name}>
                      <a
                        href={tool.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col gap-4"
                      >
                        {logo ? (
                          <img
                            src={logo}
                            alt=""
                            aria-hidden="true"
                            className="logo-mark h-7 w-auto max-w-[9rem] self-start object-contain"
                          />
                        ) : null}
                        <span className="type-heading text-lg transition-colors group-hover:text-accent">
                          {tool.name}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <Label className="mt-12 block text-faint">
            End of list &nbsp;&middot;&nbsp; No paid placements
          </Label>
        </Container>
      </Section>
    </>
  );
}
