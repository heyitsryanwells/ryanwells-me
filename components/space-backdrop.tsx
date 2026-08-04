"use client";

/**
 * The pixel space kit: a moon, a satellite, and shooting stars, drawn over the
 * CSS starfield.
 *
 * Two things consume it. `SpaceBackdrop` and `SatelliteDrift` are dropped into
 * a section by a page, and scroll with it. `SiteSpace` is rendered once by the
 * root layout and gives every other route its own arrangement of the same
 * pieces; it needs the current route, which is why the module is a client one.
 *
 * Everything here is aria-hidden and pointer-events-none. It is ornament, and
 * it stays quiet on purpose: the artwork runs at low opacity and the shooting
 * stars fire on long, staggered delays so the page is still most of the time.
 * Everything animated stops entirely under prefers-reduced-motion.
 */

import { usePathname } from "next/navigation";

/**
 * Gibbous moon on a 16x16 grid. Generated as a disc minus an offset disc, so
 * the terminator is a real curve rather than a straight cut, then a few cells
 * carved out as craters. Drawn as unit rects so it stays hard-edged at any
 * size instead of resampling like a scaled bitmap.
 */
function PixelMoon({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const body =
    "M5 1h6v1H5zM7 2h6v1H7zM8 3h6v1H8zM9 4h5v1H9zM11 5h4v1h-4zM10 6h2v1h-2zM13 6h2v1h-2zM10 7h5v1h-5zM10 8h5v1h-5zM10 9h1v1h-1zM12 9h3v1h-3zM10 10h5v1h-5zM10 11h4v1h-4zM8 12h6v1H8zM7 13h6v1H7zM5 14h6v1H5z";
  return (
    <svg viewBox="0 0 16 16" className={className} style={style} aria-hidden="true">
      <path d={body} fill="currentColor" />
      {/* Craters, punched slightly darker than the face. */}
      <g fill="var(--paper)" opacity="0.55">
        <rect x="10" y="5" width="1" height="1" />
        <rect x="12" y="6" width="1" height="1" />
        <rect x="11" y="9" width="1" height="1" />
        <rect x="9" y="11" width="1" height="1" />
      </g>
    </svg>
  );
}

/** Staggered so they rarely overlap. Positions are in % of the hero box. */
const SHOOTERS = [
  { top: "26%", left: "2%", delay: "1s", duration: "13s" },
  { top: "62%", left: "10%", delay: "8s", duration: "17s" },
  { top: "12%", left: "34%", delay: "15s", duration: "21s" },
];

export function SpaceBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Positioned inline rather than with arbitrary Tailwind values: the
          generated stylesheet did not include left-[6%]/top-[10%], so the moon
          fell back to its static position at the left edge. */}
      <PixelMoon
        className="absolute w-12 text-muted opacity-30 sm:w-16 lg:w-20"
        style={{ left: "7%", top: "12%" }}
      />

      {SHOOTERS.map((s, i) => (
        <span
          key={i}
          className="shooting-star"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Pixel satellite: body, two solar arrays, a dish on a mast. Unit rects on a
 * 26x14 grid so it stays hard-edged at any size, same as the moon.
 */
function PixelSatellite({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 26 14" className={className} style={style} aria-hidden="true">
      <g fill="currentColor">
        {/* solar arrays */}
        <path d="M1 5h7v4H1z" />
        <path d="M18 5h7v4h-7z" />
        {/* booms */}
        <path d="M8 6h2v2H8zM16 6h2v2h-2z" />
        {/* body */}
        <path d="M10 4h6v6h-6z" />
        {/* mast and dish */}
        <path d="M12 2h2v2h-2zM11 0h4v1h-4z" />
      </g>
      {/* array cell lines, punched back to the page colour */}
      <g fill="var(--paper)" opacity="0.5">
        <rect x="3" y="5" width="1" height="4" />
        <rect x="5" y="5" width="1" height="4" />
        <rect x="20" y="5" width="1" height="4" />
        <rect x="22" y="5" width="1" height="4" />
      </g>
    </svg>
  );
}

/**
 * Drifts right to left across whatever container it is dropped into. Long
 * duration so it reads as a slow pass rather than something demanding
 * attention. Stops under prefers-reduced-motion.
 */
export function SatelliteDrift({ top = "18%" }: { top?: string }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <PixelSatellite
        className="satellite-drift absolute w-16 text-muted opacity-35 sm:w-20"
        style={{ top }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   The site-wide layer.
--------------------------------------------------------------------------- */

/**
 * Rows of a pixel moon at a given phase.
 *
 * The terminator is the projection of a great circle, so it is an ellipse
 * pinched toward the centre of the disc rather than the edge of a second
 * circle. `phase` runs -1 (full) through 0 (half) to 1 (new); positive values
 * light a crescent on the right, negative leave a gibbous. That is what gives
 * the crescent real tapering horns instead of a constant-width C.
 *
 * The lit part of a row is always one contiguous run, so a moon costs at most
 * 14 rects rather than 256 cells.
 */
const MOON_GRID = 16;

function moonRows(phase: number) {
  const centre = MOON_GRID / 2;
  const radius = centre - 0.5;
  const rows: { y: number; x: number; w: number }[] = [];

  for (let y = 0; y < MOON_GRID; y++) {
    const dy = y + 0.5 - centre;
    const half = Math.sqrt(radius * radius - dy * dy);
    // NaN outside the disc, 0 on the poles: neither draws a row.
    if (!(half > 0)) continue;

    // First and last cell on this row whose centre falls in the lit part.
    const first = Math.ceil(centre + phase * half - 0.5);
    const last = Math.floor(centre + half - 0.5);
    if (last < first) continue;

    rows.push({ y, x: first, w: last - first + 1 });
  }

  return rows;
}

function PixelMoonPhase({
  phase,
  className = "",
  style,
}: {
  phase: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox={`0 0 ${MOON_GRID} ${MOON_GRID}`}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g fill="currentColor">
        {moonRows(phase).map((row) => (
          <rect key={row.y} x={row.x} y={row.y} width={row.w} height="1" />
        ))}
      </g>
    </svg>
  );
}

type Shooter = { top: string; left: string; delay: string; duration: string };

type Scene = {
  moon?: {
    phase: number;
    top: string;
    left: string;
    /** Fluid so one value covers phone through desktop without breakpoints. */
    width: string;
    opacity: number;
  };
  satellite?: { top: string };
  shooters?: Shooter[];
};

/**
 * One arrangement per route.
 *
 * The moon is the through-line and it is never in the same phase twice, so the
 * pages read as one sky seen on different nights rather than as the hero
 * treatment stamped out five times. It sits right of the measure, opposite the
 * hero moon, and the shooting star that goes with it starts on the other side
 * so the two are never in the same corner.
 */
const SCENES: Record<string, Scene> = {
  "/guides": {
    moon: {
      phase: 0,
      top: "12%",
      left: "87%",
      width: "clamp(2.75rem, 5vw, 4rem)",
      opacity: 0.26,
    },
    shooters: [{ top: "58%", left: "5%", delay: "7s", duration: "24s" }],
  },

  "/tools": {
    // Instruments, so the hardware gets the page. The pass is 54s end to end.
    satellite: { top: "26%" },
    shooters: [{ top: "72%", left: "11%", delay: "13s", duration: "31s" }],
  },

  "/contact": {
    moon: {
      phase: 0.45,
      top: "21%",
      left: "85%",
      width: "clamp(2.5rem, 4.5vw, 3.5rem)",
      opacity: 0.24,
    },
    shooters: [{ top: "66%", left: "7%", delay: "4s", duration: "22s" }],
  },
};

/**
 * A guide is long-form reading, so it gets the quietest sky on the site: the
 * thinnest crescent, at two thirds the opacity of anywhere else, parked in the
 * margin beside the measure; and a single shooting star on a 41s cycle, which
 * is visible for about 3s of it.
 */
const GUIDE_SCENE: Scene = {
  moon: {
    phase: 0.62,
    top: "63%",
    left: "89%",
    width: "clamp(1.75rem, 3vw, 2.5rem)",
    opacity: 0.18,
  },
  shooters: [{ top: "15%", left: "68%", delay: "16s", duration: "41s" }],
};

/** Anything unrouted, 404 included. Field plus one pass, nothing else. */
const DEFAULT_SCENE: Scene = {
  shooters: [{ top: "34%", left: "16%", delay: "6s", duration: "27s" }],
};

function sceneFor(pathname: string): Scene | null {
  // trailingSlash is on, so routes arrive as "/tools/". Normalise before
  // matching so both forms hit the same entry.
  const path = pathname.replace(/\/+$/, "") || "/";

  // Home and About place their own ornaments inside the section they belong
  // to, at heights measured against that section, and those scroll away with
  // it. Adding a second set here would just be two moons.
  if (path === "/" || path === "/about") return null;

  if (path.startsWith("/guides/")) return GUIDE_SCENE;
  return SCENES[path] ?? DEFAULT_SCENE;
}

/**
 * The layer the root layout renders on every route: the starfield ground, plus
 * whatever ornament the route calls for.
 *
 * Fixed to the viewport, so the artwork holds still while the page scrolls
 * under it. See `.site-space` in globals.css for why.
 */
export function SiteSpace() {
  const scene = sceneFor(usePathname());

  return (
    <div className="site-space" aria-hidden="true">
      {scene?.moon ? (
        <PixelMoonPhase
          phase={scene.moon.phase}
          className="absolute text-muted"
          style={{
            top: scene.moon.top,
            left: scene.moon.left,
            width: scene.moon.width,
            opacity: scene.moon.opacity,
          }}
        />
      ) : null}

      {scene?.satellite ? (
        <PixelSatellite
          className="satellite-drift absolute text-muted"
          style={{
            top: scene.satellite.top,
            width: "clamp(3.5rem, 6vw, 5rem)",
            opacity: 0.3,
          }}
        />
      ) : null}

      {scene?.shooters?.map((s) => (
        <span
          key={`${s.top}-${s.left}`}
          className="shooting-star"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}
