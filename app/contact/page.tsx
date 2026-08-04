import type { Metadata } from "next";
import { contact } from "@/lib/content";
import { Container, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.metaDescription,
};

/**
 * A title, two lines, and two links.
 *
 * The links sit at the body scale the rest of the site uses, on one row. An
 * earlier pass ran them at display size stacked down the page, which read as
 * a landing page rather than as the last page of this one.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader label="Contact" title={contact.heading} />

      <Section top="tight">
        <Container>
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-ink sm:text-xl">
              {contact.intro}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {contact.note}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              {contact.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="bracket-link type-heading text-lg text-ink transition-colors hover:text-accent sm:text-xl"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
