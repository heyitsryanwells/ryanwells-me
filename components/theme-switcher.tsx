"use client";

import { useEffect, useState } from "react";
import { themes, type ThemeId } from "@/lib/content";

const STORAGE_KEY = "rw-theme";

/**
 * Preview-only control for comparing the three visual directions.
 *
 * Once a direction is chosen:
 *   1. Set data-theme on <html> in app/layout.tsx to the winner.
 *   2. Delete this component, its import, and the no-flash script in layout.
 *   3. Delete the losing theme blocks in app/globals.css.
 */
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("terminal");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // The no-flash script in layout.tsx has already resolved ?theme= and
    // localStorage onto <html>. Read back from there so the label always
    // matches what is actually rendered.
    const applied = document.documentElement.getAttribute(
      "data-theme",
    ) as ThemeId | null;
    if (applied && themes.some((t) => t.id === applied)) {
      setTheme(applied);
    }
  }, []);

  function pick(id: ThemeId) {
    setTheme(id);
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem(STORAGE_KEY, id);
  }

  if (!mounted) return null;

  const current = themes.find((t) => t.id === theme);

  return (
    <div className="fixed bottom-5 right-5 z-50 print:hidden">
      {open ? (
        <div className="mb-3 w-64 rounded-card border border-line bg-surface p-2 shadow-2xl">
          <p className="font-eyebrow px-3 py-2 text-[0.6rem] text-muted">
            Preview direction
          </p>
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => pick(t.id)}
              className={`block w-full rounded-card px-3 py-2.5 text-left transition-colors ${
                t.id === theme ? "bg-raised" : "hover:bg-raised"
              }`}
            >
              <span
                className={`block text-sm font-semibold ${
                  t.id === theme ? "text-accent" : "text-ink"
                }`}
              >
                {t.label}
              </span>
              <span className="mt-0.5 block text-xs text-muted">{t.note}</span>
            </button>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-card border border-line bg-surface px-4 py-3 text-xs font-semibold text-ink shadow-2xl transition-colors hover:border-accent"
        aria-expanded={open}
      >
        <span
          className="h-3 w-3 rounded-full bg-accent"
          aria-hidden="true"
        />
        {current?.label ?? "Theme"}
      </button>
    </div>
  );
}
