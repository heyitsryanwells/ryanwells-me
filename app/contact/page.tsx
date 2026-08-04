import type { Metadata } from "next";
import { contact } from "@/lib/content";
import { Container, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.metaDescription,
};

/**
 * The whole page is a title, a line, and two links.
 *
 * Everything here is sized up from the site's usual scale. The rest of the
 * site is dense on purpose, but a page with three elements on it reads as
 * unfinished at that size, so the links carry display type and the brackets
 * do the pointing.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader sectionRef="05" label="Contact" title={contact.heading} />

      <Section top="tight">
        <Container>
          <p className="max-w-2xl text-xl leading-relaxed text-ink sm:text-2xl">
            {contact.intro}
          </p>

          <ul className="mt-12 space-y-7 sm:mt-14 sm:space-y-8">
            {contact.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="bracket-link type-heading inline-block text-3xl text-ink transition-colors hover:text-accent sm:text-4xl"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
