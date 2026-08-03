import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Vertical rhythm is set here rather than passed in via className. A
 * responsive utility like `sm:py-28` always beats a plain `pt-12` from a
 * caller, so spacing has to be a prop to stay predictable.
 */
const sectionTop = {
  default: "pt-20 sm:pt-28",
  tight: "pt-10 sm:pt-14",
  none: "pt-0",
} as const;

const sectionBottom = {
  default: "pb-20 sm:pb-28",
  tight: "pb-10 sm:pb-14",
  none: "pb-0",
} as const;

export function Section({
  children,
  className = "",
  bordered = false,
  id,
  top = "default",
  bottom = "default",
}: {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  id?: string;
  top?: keyof typeof sectionTop;
  bottom?: keyof typeof sectionBottom;
}) {
  return (
    <section
      id={id}
      className={`${sectionTop[top]} ${sectionBottom[bottom]} ${
        bordered ? "border-t border-line" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-eyebrow mb-4 text-xs text-accent">{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`mb-14 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 text-lg leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-on-accent hover:brightness-110 border border-transparent",
  secondary:
    "bg-accent-2 text-on-accent-2 hover:brightness-110 border border-transparent",
  ghost:
    "bg-transparent text-ink border border-line hover:border-accent hover:text-accent",
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-card px-6 py-3 text-sm font-semibold transition-all duration-150";

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = `${buttonBase} ${buttonStyles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Card({
  children,
  className = "",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={`rounded-card border border-line bg-surface p-7 transition-all duration-200 ${
        interactive
          ? "hover:-translate-y-1 hover:border-accent/60 hover:bg-raised"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="font-eyebrow inline-block rounded-card border border-line bg-raised px-2.5 py-1 text-[0.65rem] text-muted">
      {children}
    </span>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 ${className}`}
    >
      <path
        d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <Container>
      <div className="max-w-3xl pt-20 pb-4 sm:pt-28">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            {lede}
          </p>
        ) : null}
      </div>
    </Container>
  );
}
