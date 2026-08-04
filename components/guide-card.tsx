import Link from "next/link";
import { guideFormats, type Guide } from "@/lib/guides";

/**
 * Guide cards.
 *
 * No refs and no dates. A catalog number tells a reader which guide was
 * written first, which says nothing about whether it is the one they need,
 * and the oldest entry starts looking stale the moment a second one appears.
 * Format is the only label, because that one helps you choose.
 *
 * Panels rather than floating cards, same as the capability grid: flat fill,
 * square corners, and a 1px gap so neighbouring borders collapse into one
 * shared line.
 */
export function GuideGrid({ guides }: { guides: Guide[] }) {
  const odd = guides.length % 2 === 1;

  return (
    <div className="grid gap-px bg-line sm:grid-cols-2">
      {guides.map((guide, i) => {
        const format = guideFormats[guide.format];
        // An odd count leaves an empty cell, and an empty cell here paints
        // the container's line colour as a solid slab. The last card takes
        // the full row instead.
        const spans = odd && i === guides.length - 1;

        return (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className={`group flex flex-col bg-paper p-7 transition-colors duration-200 hover:bg-panel sm:p-8 ${
              spans ? "sm:col-span-2" : ""
            }`}
          >
            <span className="type-label text-tertiary">
              {format.emoji} {format.label}
            </span>
            <h3 className="type-heading mt-5 text-xl text-ink transition-colors group-hover:text-accent sm:text-2xl">
              {guide.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {guide.dek}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
