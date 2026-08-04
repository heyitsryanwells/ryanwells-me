/**
 * Pixel icons for the capability cards.
 *
 * All drawn from axis-aligned unit rects on a 16x16 grid, same construction as
 * the moon and the satellite, so they stay hard-edged at any size and match
 * the rest of the artwork. They inherit currentColor.
 */
import type { ReactNode } from "react";

function Glyph({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/**
 * Schema tree: a parent object with related children.
 *
 * Three stacked bars would have been simpler, but at 28px that is a hamburger
 * menu, not a data model.
 */
export const IconArchitecture = ({ className = "" }: { className?: string }) => (
  <Glyph className={className}>
    <path d="M6 1h4v4H6zM7 5h2v2H7zM2 7h12v2H2zM2 9h2v2H2zM12 9h2v2h-2zM1 11h4v4H1zM11 11h4v4h-4z" />
  </Glyph>
);

/** Ascending bars: deal desk and reporting. */
export const IconReporting = ({ className = "" }: { className?: string }) => (
  <Glyph className={className}>
    <path d="M2 9h3v5H2zM6 4h3v10H6zM10 7h3v7h-3z" />
  </Glyph>
);

/**
 * Chip: automation and agents running in the stack.
 *
 * The earlier version wired two nodes to a third, but 4-unit nodes joined by a
 * 1-unit connector collapse into a single bar at icon size.
 */
export const IconAutomation = ({ className = "" }: { className?: string }) => (
  <Glyph className={className}>
    <path d="M4 4h8v8H4zM5 1h2v3H5zM9 1h2v3H9zM5 12h2v3H5zM9 12h2v3H9zM1 5h3v2H1zM1 9h3v2H1zM12 5h3v2h-3zM12 9h3v2h-3z" />
  </Glyph>
);

/** Funnel: filtering and enrichment. */
export const IconDataQuality = ({ className = "" }: { className?: string }) => (
  <Glyph className={className}>
    <path d="M2 2h12v2H2zM4 5h8v2H4zM6 8h4v2H6zM7 11h2v3H7z" />
  </Glyph>
);

/** Chevrons: stages moving forward. */
export const IconPipeline = ({ className = "" }: { className?: string }) => (
  <Glyph className={className}>
    <path d="M2 3h2v2H2zM4 5h2v2H4zM6 7h2v2H6zM4 9h2v2H4zM2 11h2v2H2zM8 3h2v2H8zM10 5h2v2h-2zM12 7h2v2h-2zM10 9h2v2h-2zM8 11h2v2H8z" />
  </Glyph>
);

/** Lock: access and governance. */
export const IconGovernance = ({ className = "" }: { className?: string }) => (
  <Glyph className={className}>
    <path d="M6 2h4v1H6zM5 3h1v3H5zM10 3h1v3h-1zM3 6h10v8H3z" />
    <path d="M7 9h2v3H7z" fill="var(--paper)" />
  </Glyph>
);

/** Speech bubble: support and CX operations. */
export const IconSupport = ({ className = "" }: { className?: string }) => (
  <Glyph className={className}>
    <path d="M2 2h12v9H2zM5 11h4v1H5zM5 12h3v1H5zM5 13h2v1H5z" />
    <path d="M4 4h8v1H4zM4 6h8v1H4zM4 8h5v1H4z" fill="var(--paper)" />
  </Glyph>
);

/** Four tiles: the tool stack, and the vendors behind it. */
export const IconStack = ({ className = "" }: { className?: string }) => (
  <Glyph className={className}>
    <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" />
  </Glyph>
);

export const capabilityIcons = {
  architecture: IconArchitecture,
  reporting: IconReporting,
  automation: IconAutomation,
  dataQuality: IconDataQuality,
  pipeline: IconPipeline,
  governance: IconGovernance,
  support: IconSupport,
  stack: IconStack,
} as const;

export type CapabilityIcon = keyof typeof capabilityIcons;
