import Link from "next/link";
import { nav, site } from "@/lib/content";
import { Container, Label } from "./ui";

export function Footer() {
  return (
    <footer className="mt-8 border-t-2 border-rule">
      <Container>
        <div className="grid gap-10 py-10 sm:grid-cols-[1fr_auto_auto] sm:gap-16">
          <div className="max-w-xs">
            <Link
              href="/"
              className="type-display text-2xl transition-colors hover:text-accent"
            >
              {site.monogram}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {site.name}. {site.role}. Writing about the systems underneath
              go-to-market.
            </p>
          </div>

          <div>
            <Label className="mb-3 text-faint">Contents</Label>
            <ul className="space-y-1.5">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="type-label text-muted transition-colors hover:text-accent"
                  >
                    <span className="text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    &nbsp;&nbsp;{item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Label className="mb-3 text-faint">Elsewhere</Label>
            <ul className="space-y-1.5">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="type-label text-muted transition-colors hover:text-accent"
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

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line py-4">
          <Label className="text-faint">
            &copy; {new Date().getFullYear()} {site.name}
          </Label>
          <Label className="text-faint">
            {site.domain} &nbsp;&middot;&nbsp; {site.rev}
          </Label>
        </div>
      </Container>
    </footer>
  );
}
