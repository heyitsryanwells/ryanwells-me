"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/content";
import { Container } from "./ui";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className="font-display text-xl text-ink transition-colors hover:text-accent"
            aria-label={`${site.name}, home`}
            onClick={() => setOpen(false)}
          >
            {site.monogram}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-eyebrow text-xs transition-colors ${
                    active ? "text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-ink transition-transform duration-200 ${
                  open ? "top-2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-2 block h-0.5 w-6 bg-ink transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-ink transition-transform duration-200 ${
                  open ? "top-2 -rotate-45" : "top-4"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-surface lg:hidden"
        >
          <Container>
            <ul className="flex flex-col py-3">
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`font-eyebrow block py-3 text-xs ${
                        active ? "text-accent" : "text-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
