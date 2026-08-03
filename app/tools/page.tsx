import type { Metadata } from "next";
import { toolCategories } from "@/lib/content";
import {
  Container,
  Label,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "The software I actually run a revenue operation on, and what each one is genuinely good for.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        sectionRef="05"
        label="Stack"
        title="Tools I use"
        lede="No affiliate links and no rankings. This is the stack I run day to day, plus an honest line on what each one earns its seat for."
      />

      <Section top="tight">
        <Container>
          {toolCategories.map((group) => (
            <div key={group.ref} className="mb-14 last:mb-0">
              <SectionHead
                sectionRef={`§ ${group.ref}`}
                label={group.category}
                note={`${group.tools.length} entries`}
              />
              <div>
                {group.tools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group block transition-colors hover:bg-panel"
                  >
                    <div className="grid grid-cols-1 gap-x-8 gap-y-1.5 py-5 sm:grid-cols-[13rem_1fr]">
                      <h3 className="type-heading text-lg transition-colors group-hover:text-accent">
                        {tool.name}
                      </h3>
                      <p className="max-w-2xl text-sm leading-relaxed text-muted">
                        {tool.note}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}

          <Label className="mt-10 block text-faint">
            End of list &nbsp;&middot;&nbsp; No paid placements
          </Label>
        </Container>
      </Section>
    </>
  );
}
