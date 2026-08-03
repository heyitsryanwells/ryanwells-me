import type { Metadata } from "next";
import { toolCategories } from "@/lib/content";
import {
  ArrowRight,
  Card,
  Container,
  PageHeader,
  Section,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Tools I Use",
  description:
    "The software I actually run a revenue operation on, and what each one is genuinely good for.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stack"
        title="Tools I use"
        lede="No affiliate links and no rankings. This is the stack I run day to day, plus an honest line on what each one earns its seat for."
      />

      <Section top="tight">
        <Container>
          <div className="space-y-16">
            {toolCategories.map((group) => (
              <div key={group.category}>
                <h2 className="font-eyebrow mb-7 text-xs text-accent">
                  {group.category}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.tools.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group"
                    >
                      <Card interactive className="flex h-full flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-lg text-ink transition-colors group-hover:text-accent">
                            {tool.name}
                          </h3>
                          <ArrowRight className="mt-1 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {tool.note}
                        </p>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
