import type { Metadata } from "next";
import { contact, site } from "@/lib/content";
import { ContactForm } from "@/components/contact-form";
import {
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

/**
 * Page shell stays a server component. The only thing that ships as client
 * code is <ContactForm />, which owns all of the state and the post.
 *
 * The address itself is gone from the page. What used to be a mailto CTA
 * printing hellofromryanwells@gmail.com in 20px type is now the form, and the
 * only remaining route to the inbox is the "Email" row in Elsewhere, which
 * renders a label and keeps the address in the href.
 */
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
                label={contact.form.label}
                note={contact.form.note}
              />
              <ContactForm />

              <div className="mt-16">
                <SectionHead
                  sectionRef="02"
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
              </div>
            </div>

            <aside>
              <Label className="pb-2 text-ink">
                Details
              </Label>
              <SpecList
                className="mt-1"
                items={[
                  { label: "Reply", value: "Usually within a few days" },
                  { label: "Based in", value: "Knoxville, Tennessee" },
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
