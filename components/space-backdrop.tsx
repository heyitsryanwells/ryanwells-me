/**
 * Decorative space layer behind the hero: a pixel moon and a few shooting
 * stars, sitting on top of the CSS starfield.
 *
 * Everything here is aria-hidden and pointer-events-none. It is ornament, and
 * it stays quiet on purpose: the moon runs at low opacity and the shooting
 * stars fire on long, staggered delays so the page is still most of the time.
 * Both stop entirely under prefers-reduced-motion.
 */

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
