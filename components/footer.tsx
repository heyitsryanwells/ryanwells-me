import Link from "next/link";
import { nav, site } from "@/lib/content";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container>
        <div className="flex flex-col gap-10 py-14 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-display text-xl text-ink transition-colors hover:text-accent"
            >
              {site.monogram}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.name}. {site.role}. Writing about the systems underneath
              go-to-market.
            </p>
          </div>

          <div className="flex gap-14">
            <div>
              <p className="font-eyebrow mb-4 text-[0.65rem] text-muted">
                Pages
              </p>
              <ul className="space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-eyebrow mb-4 text-[0.65rem] text-muted">
                Elsewhere
              </p>
              <ul className="space-y-2.5">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                      target={
                        social.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel="noreferrer"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-line py-6">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {site.name}. {site.domain}
          </p>
        </div>
      </Container>
    </footer>
  );
}
