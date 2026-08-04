import type { Metadata } from "next";
import { contact, site } from "@/lib/content";
import {
  BracketLink,
  Container,
  Label,
  PageHeader,
  Section,
  SectionHead,
  SpecList,
  SpecRow,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.lede,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        sectionRef="05"
        label="Contact"
        title={contact.heading}
        lede={contact.lede}
      />

      <Section top="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
            <div className="max-w-2xl">
              <SectionHead
                sectionRef="01"
                label="Reasons to write"
                note={`${contact.reasons.length} entries`}
              />
              <div>
                {contact.reasons.map((reason) => (
                  <SpecRow
                    key={reason.ref}
                    sectionRef={reason.ref}
                    title={reason.title}
                    body={reason.body}
                  />
                ))}
              </div>

              <div className="mt-10">
                <BracketLink href={`mailto:${site.email}`}>
                  {site.email}
                </BracketLink>
              </div>
            </div>

            <aside>
              <Label className="pb-2 text-ink">
                Details
              </Label>
              <SpecList
                className="mt-1"
                items={[
                  { label: "Email", value: site.email },
                  { label: "Reply", value: "Usually within a few days" },
                ]}
              />

              <Label className="mt-9 block pb-2 text-ink">
                Elsewhere
              </Label>
              <ul className="mt-1">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={
                        social.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel="noreferrer"
                      className="type-label block py-3 text-muted transition-colors hover:text-accent"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
