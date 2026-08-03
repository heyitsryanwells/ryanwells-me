"use client";

import { useState } from "react";
import { newsletter } from "@/lib/content";

/**
 * Drop your Beehiiv / Kit / Substack embed URL into `newsletter.formAction`
 * in lib/content.ts and this posts straight to the provider. Until then it
 * runs in demo mode so the layout is reviewable.
 */
export function NewsletterForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");
  const live = Boolean(newsletter.formAction);

  if (state === "done") {
    return (
      <p className={`type-label border border-rule bg-panel px-4 py-3.5 text-ink ${className}`}>
        Received. Connect a provider to make this real.
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
      className={`flex w-full border border-rule bg-panel ${className}`}
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
        className="type-label min-w-0 flex-1 bg-transparent px-4 py-3.5 text-ink placeholder:text-faint focus:outline-none"
      />
      <button
        type="submit"
        className="type-label shrink-0 bg-accent px-5 py-3.5 text-on-accent transition-colors hover:bg-ink"
      >
        {newsletter.ctaLabel}
      </button>
    </form>
  );
}
