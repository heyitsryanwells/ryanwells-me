import type { Metadata } from "next";
import { stack, toolCategories } from "@/lib/content";
import { Container, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tools",
  description: "Some of my favorite tools from our GTM tech stack.",
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
        lede="Some of my favorite tools from our GTM tech stack."
      />

      <Section top="tight">
        <Container>

          {/*
            Nine category blocks at one or three columns. Both counts divide
            nine, so the last row always fills; a two-wide step would leave a
            short row and a hole in the corner. Ryan's order does the rest of
            the work: the six single-tool categories take the first two rows,
            which lands the three larger ones together on the last.

            Three columns start at md. On a phone they would leave each mark
            under 100px, and half the wordmarks are wider than that.
          */}
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-3 md:gap-y-16 lg:gap-x-14">
            {toolCategories.map((group) => (
              <section key={group.category}>
                {/*
                  The category is the only accent in the block. Everything
                  under it stays in ink, which keeps nine amber headings
                  reading as structure on a page that normally spends the
                  accent once.

                  Two lines are reserved from md up, the widths where the
                  longer names wrap. Without the reserve, a wrapped heading
                  drops its own marks half a line below the two beside it.
                */}
                <h2 className="type-heading text-lg text-accent md:min-h-[2.1em] lg:text-xl">
                  {group.category}
                </h2>
                {/*
                  Two tool columns once a block is wide enough for the widest
                  mark. Wispr Flow measures 147px at this height, and a split
                  block below xl comes in under that, which would scale the
                  mark down off the shared baseline. Both multi-tool counts
                  are even, so the split leaves no stray entry.
                */}
                <ul
                  className={`mt-5 grid gap-6 ${
                    group.tools.length > 1 ? "xl:grid-cols-2 xl:gap-x-8" : ""
                  }`}
                >
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
                            level with the rest of the column.
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
                          <span className="type-heading text-base transition-colors group-hover:text-accent">
                            {tool.name}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
