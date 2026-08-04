"use client";

import { useEffect, useState } from "react";

/**
 * Sticky category index for a long scrolling page.
 *
 * Anchor links do the actual jumping, so this works with JavaScript off. The
 * only thing the client code adds is knowing which section you are currently
 * in, which an anchor cannot tell you.
 *
 * rootMargin pins the trigger line near the top of the viewport instead of the
 * middle, so a heading counts as current once it reaches the top rather than
 * when it happens to be centred. The last section on a page is usually shorter
 * than the viewport and would otherwise never win.
 */
export function SectionNav({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Categories">
      <ul>
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "true" : undefined}
                className={`type-label block py-2 transition-colors ${
                  current ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
