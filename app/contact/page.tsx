import type { Metadata } from "next";
import { contact, site } from "@/lib/content";
import {
  ArrowRight,
  ButtonLink,
  Card,
  Container,
  PageHeader,
  Section,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.lede,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={contact.heading}
        lede={contact.lede}
      />

      <Section top="tight">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
            <div className="max-w-2xl">
              <div className="space-y-5">
                {contact.reasons.map((reason) => (
                  <Card key={reason.title}>
                    <h2 className="font-display text-lg text-ink">
                      {reason.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {reason.body}
                    </p>
                  </Card>
                ))}
              </div>

              <div className="mt-12">
                <ButtonLink href={`mailto:${site.email}`} variant="primary">
                  {site.email}
                  <ArrowRight />
                </ButtonLink>
              </div>
            </div>

            <aside>
              <Card>
                <p className="font-eyebrow mb-5 text-[0.65rem] text-muted">
                  Find me elsewhere
                </p>
                <ul className="space-y-3.5">
                  {site.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target={
                          social.href.startsWith("mailto:")
                            ? undefined
                            : "_blank"
                        }
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                      >
                        {social.label}
                        <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 border-t border-line pt-5 text-xs leading-relaxed text-muted">
                  Based in {site.location}. I answer email faster than anything
                  else.
                </p>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
