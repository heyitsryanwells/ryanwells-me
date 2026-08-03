import Link from "next/link";
import type { ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Spec Sheet primitives.

   There is no Card. Structure comes from rules and a shared column grid, so
   nothing here should ever grow a border radius, a drop shadow, or a hover
   lift. Refs (1.0, 2.0, A, B) carry the hierarchy that a card border used to.
--------------------------------------------------------------------------- */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

const sectionTop = {
  default: "pt-16 sm:pt-24",
  tight: "pt-8 sm:pt-12",
  none: "pt-0",
} as const;

const sectionBottom = {
  default: "pb-16 sm:pb-24",
  tight: "pb-8 sm:pb-12",
  none: "pb-0",
} as const;

export function Section({
  children,
  className = "",
  id,
  top = "default",
  bottom = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  top?: keyof typeof sectionTop;
  bottom?: keyof typeof sectionBottom;
}) {
  return (
    <section
      id={id}
      className={`${sectionTop[top]} ${sectionBottom[bottom]} ${className}`}
    >
      {children}
    </section>
  );
}

/** Monospace label. Every piece of metadata on the site uses this. */
export function Label({
  children,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "h2" | "div";
}) {
  return <Tag className={`type-label ${className}`}>{children}</Tag>;
}

/** The 2px rule that opens a document section. */
export function RuleHeavy({ className = "" }: { className?: string }) {
  return <div className={`rule-heavy ${className}`} aria-hidden="true" />;
}

/**
 * Section opener: heavy rule, then a mono ref and label on one line, then the
 * condensed title. Replaces the eyebrow-over-centered-heading pattern.
 */
export function SectionHead({
  sectionRef,
  label,
  title,
  note,
}: {
  sectionRef?: string;
  label: string;
  title?: string;
  note?: string;
}) {
  return (
    <div className="mb-8 sm:mb-10">
      <RuleHeavy />
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-2.5">
        <Label className="text-ink">
          {sectionRef ? (
            <span className="text-accent">{sectionRef}&nbsp;&nbsp;</span>
          ) : null}
          {label}
        </Label>
        {note ? <Label className="text-faint">{note}</Label> : null}
      </div>
      {title ? (
        <h2 className="type-heading mt-5 max-w-3xl text-3xl sm:text-4xl">
          {title}
        </h2>
      ) : null}
    </div>
  );
}

/**
 * A numbered row in a spec table. Ref sits in its own column so every row
 * aligns down the page, the way a real reference document reads.
 */
export function SpecRow({
  sectionRef,
  title,
  body,
  meta,
  href,
}: {
  sectionRef: string;
  title: string;
  body?: string;
  meta?: string;
  href?: string;
}) {
  const inner = (
    <div className="grid grid-cols-[3.25rem_1fr] gap-x-4 py-5 sm:grid-cols-[5rem_1fr_auto] sm:gap-x-8 sm:py-6">
      <span className="type-ref pt-0.5 text-xs text-accent">
        {sectionRef}
      </span>
      <div className="min-w-0">
        <h3 className="type-heading text-lg sm:text-xl">{title}</h3>
        {body ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {body}
          </p>
        ) : null}
        {meta ? (
          <Label className="mt-3 text-faint sm:hidden">{meta}</Label>
        ) : null}
      </div>
      {meta ? (
        <Label className="hidden self-start pt-1 text-faint sm:block">
          {meta}
        </Label>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group block border-t border-line transition-colors hover:bg-panel"
      >
        <div className="group-hover:[&_h3]:text-accent">{inner}</div>
      </Link>
    );
  }

  return <div className="border-t border-line">{inner}</div>;
}

/** Label/value pairs. Used for the hero data block and any inline spec. */
export function SpecList({
  items,
  className = "",
}: {
  items: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <dl className={className}>
      {items.map((item) => (
        <div
          key={item.label}
          className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-line py-2.5 sm:grid-cols-[7rem_1fr]"
        >
          <dt className="type-label text-faint">{item.label}</dt>
          <dd className="text-sm text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Primary call to action. Bracketed rather than arrowed. */
export function BracketLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const styles =
    variant === "solid"
      ? "bg-accent text-on-accent hover:bg-ink"
      : "border border-rule text-ink hover:bg-ink hover:text-paper";

  const classes = `type-label inline-block px-5 py-3 transition-colors ${styles} ${className}`;
  const external = href.startsWith("http") || href.startsWith("mailto:");

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Inline text link, rendered with the bracket marks from globals.css. */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = `type-label bracket-link inline-block text-ink transition-colors hover:text-accent ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Photographic plate: hard edges, flattened image, mono figure caption. */
export function Plate({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="plate border border-rule bg-panel">
        <img
          src={src}
          alt={alt}
          width={1100}
          height={1100}
          className="block h-full w-full object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="type-label mt-2 text-faint">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** Document-style page opener used on every interior page. */
export function PageHeader({
  sectionRef,
  label,
  title,
  lede,
}: {
  sectionRef?: string;
  label: string;
  title: string;
  lede?: string;
}) {
  return (
    <Container>
      <div className="pt-10 sm:pt-14">
        <RuleHeavy />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-2.5">
          <Label className="text-ink">
            {sectionRef ? (
              <span className="text-accent">{sectionRef}&nbsp;&nbsp;</span>
            ) : null}
            {label}
          </Label>
        </div>
        <h1 className="type-display mt-6 max-w-4xl text-5xl sm:text-7xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {lede}
          </p>
        ) : null}
      </div>
    </Container>
  );
}
