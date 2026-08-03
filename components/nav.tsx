"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/content";
import { Container } from "./ui";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-paper">
      <div>
        <Container>
          <div className="flex h-14 items-center justify-between sm:h-16">
            <Link
              href="/"
              className="logo-glow type-display text-2xl text-accent transition-colors hover:text-ink"
              aria-label={`${site.name}, home`}
              onClick={() => setOpen(false)}
            >
              {site.monogram}
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              {nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`type-label transition-colors ${
                    isActive(item.href)
                      ? "text-accent"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  <span className="text-tertiary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  &nbsp;&nbsp;{item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              className="type-label text-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </Container>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="bg-panel lg:hidden"
        >
          <Container>
            <ul>
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`type-label block py-3.5 ${
                      isActive(item.href) ? "text-accent" : "text-muted"
                    }`}
                  >
                    <span className="text-tertiary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    &nbsp;&nbsp;{item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
