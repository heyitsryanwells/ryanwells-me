import Link from "next/link";
import { footer, nav, site } from "@/lib/content";
import { Container, Label } from "./ui";

export function Footer() {
  const linkedIn = site.socials.find((s) => s.label === "LinkedIn");

  return (
    <footer className="mt-8 border-t-2 border-rule">
      <Container>
        <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <Label className="text-muted">
            <span className="text-accent">{footer.noteEmphasis}</span>{" "}
            {footer.noteRest}
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
