import Link from "next/link";
import { footer, nav, site } from "@/lib/content";
import { Container, Label } from "./ui";

export function Footer() {
  const linkedIn = site.socials.find((s) => s.label === "LinkedIn");

  return (
    <footer className="mt-16">
      <Container>
        <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <Label className="flex items-center gap-2 text-muted">
            <span>
              <span className="text-accent">{footer.noteEmphasis}</span>{" "}
              {footer.noteRest}
            </span>
            {/* Real Tennessee mark, background-removed and trimmed from the
                source artwork. Kept in its own orange rather than tinted to
                the accent: it is a trademark, not a UI element. */}
            <img
              src="/power-t.webp"
              alt="Tennessee"
              width={160}
              height={160}
              className="h-[1.15rem] w-[1.15rem] shrink-0"
            />
          </Label>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {nav
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="type-label text-muted transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              {linkedIn ? (
                <li>
                  <a
                    href={linkedIn.href}
                    target="_blank"
                    rel="noreferrer"
                    className="type-label text-muted transition-colors hover:text-accent"
                  >
                    {linkedIn.label}
                  </a>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
