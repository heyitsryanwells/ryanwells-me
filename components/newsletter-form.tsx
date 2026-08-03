"use client";

import { useState } from "react";
import { newsletter } from "@/lib/content";

/**
 * Drop your Beehiiv / Kit / Substack embed URL into `newsletter.formAction`
 * in lib/content.ts and this posts straight to the provider. Until then it
 * runs in demo mode so the layout is reviewable.
 */
export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");
  const live = Boolean(newsletter.formAction);

  if (state === "done") {
    return (
      <p className="rounded-card border border-accent/40 bg-raised px-5 py-4 text-sm text-ink">
        Thanks. Once a provider is connected this is where the confirmation
        lands.
      </p>
    );
  }

  return (
    <form
      action={live ? newsletter.formAction : undefined}
      method={live ? "post" : undefined}
      onSubmit={
        live
          ? undefined
          : (e) => {
              e.preventDefault();
              setState("done");
            }
      }
      className={`flex w-full flex-col gap-3 sm:flex-row ${compact ? "" : "max-w-md"}`}
    >
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={newsletter.placeholder}
        className="min-w-0 flex-1 rounded-card border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-card bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-all hover:brightness-110"
      >
        {newsletter.ctaLabel}
      </button>
    </form>
  );
}
