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

const toolCount = toolCategories.reduce(
  (total, group) => total + group.tools.length,
  0,
);

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
          <SectionHead
            sectionRef="01"
            label="Index"
            note={`${toolCategories.length} categories, ${toolCount} tools`}
          />

          {/*
            One row per category, on the same ref / label / content columns the
            spec rows elsewhere use. Six of the nine categories hold a single
            tool, which the old four-wide grid rendered as one mark and three
            empty cells. As rows they cost a line each.

            The table only assembles at lg. Below that the four columns leave
            the marks about 90px of room, so the row stacks instead.
          */}
          <div>
            {toolCategories.map((group) => (
              <div
                key={group.ref}
                className="grid grid-cols-[3.25rem_1fr] gap-x-4 py-6 lg:grid-cols-[5rem_16rem_1fr] lg:gap-x-8 lg:py-7"
              >
                <span className="type-ref pt-1 text-xs text-accent">
                  {group.ref}/
                </span>
                <Label className="pt-1 text-ink">{group.category}</Label>
                {/*
                  auto-fill sizes the columns, so the marks keep a 7.5rem floor
                  at every width. Every category resolves to the same column
                  width, which lines the entries up vertically from row to row.
                */}
                <ul className="col-start-2 mt-5 grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-x-6 gap-y-6 lg:col-start-3 lg:mt-0 lg:grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] lg:gap-x-8">
                  {group.tools.map((tool) => {
                    const logo = markFor(tool.name);
                    return (
                      <li key={tool.name}>
                        <a
                          href={tool.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex flex-col gap-3"
                        >
                          {/*
                            Fixed slot, so marks of different proportions share
                            a baseline and an entry without one keeps its name
                            level with the rest of the row.
                          */}
                          <span className="flex h-6 items-end">
                            {logo ? (
                              <img
                                src={logo}
                                alt=""
                                aria-hidden="true"
                                className="logo-mark max-h-6 w-auto max-w-full object-contain"
                              />
                            ) : null}
                          </span>
                          <span className="type-heading text-base transition-colors group-hover:text-accent lg:text-lg">
                            {tool.name}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <Label className="mt-12 block text-faint">
            End of list &nbsp;&middot;&nbsp; No paid placements
          </Label>
        </Container>
      </Section>
    </>
  );
}
