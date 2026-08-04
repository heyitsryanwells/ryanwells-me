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

/**
 * Pixel rocket, drawn climbing to the upper right.
 *
 * The body is a staircase of 2-wide, 1-up steps, which is the classic pixel
 * diagonal and works out to 26.57 degrees. `.rocket-launch` flies it on
 * exactly that slope, one unit up for every two across, so the artwork angle
 * and the flight path agree on every viewport. Rotating a horizontal rocket
 * with CSS would have been easier and would have put soft antialiased edges
 * on artwork whose whole point is that it has none.
 */
function PixelRocket({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 28 15" className={className} style={style} aria-hidden="true">
      {/* Exhaust. Amber, so the one warm thing in the backdrop is the colour
          the site uses everywhere else to mean "look here". Kept to two chunky
          blocks: a long faded plume turns muddy brown against the page and
          stops reading as fire. */}
      <g fill="var(--accent)">
        <path d="M2 5h4v5H2z" />
        <path d="M0 6h2v3H0z" opacity="0.8" />
      </g>

      {/* Barrel. 15x7 keeps it a cylinder; squarer than about 2:1 and it stops
          reading as a body at all. */}
      <path d="M6 4h15v7H6z" fill="currentColor" />

      <g fill="var(--accent)">
        {/* Nose, stepping 7-5-3-1 so it seats on the barrel as a cone instead
            of spiking out of it. The tip is 2 units long rather than 1: at
            72px a single unit is 2.7px and dissolves, leaving the apex furry. */}
        <path d="M21 4h1v7h-1zM22 5h2v5h-2zM24 6h2v3h-2zM26 7h2v1h-2z" />
        {/* Fins, swept back off the tail, mirrored about the barrel. */}
        <path d="M11 3h2v1h-2zM9 2h2v2H9zM7 1h2v3H7zM5 0h2v4H5z" />
        <path d="M11 11h2v1h-2zM9 11h2v2H9zM7 11h2v3H7zM5 11h2v4H5z" />
      </g>

      {/* Porthole, punched back to the page colour like the satellite's array
          lines. 4x3 rather than 3x3: the smaller square shrank to 8px at
          render size, and it is the single clearest "this is a vehicle" cue. */}
      <rect x="15" y="6" width="4" height="3" fill="var(--paper)" opacity="0.6" />
    </svg>
  );
}

/**
 * Flies bottom-left to top-right across whatever container it is dropped into.
 *
 * The start height is derived from the distance travelled rather than set as a
 * percentage of the container: at a fixed 2:1 slope, starting half the travel
 * distance down the box is what lands it in the top-right corner, and it holds
 * at any width. Long duration with the pass packed into the first 45%, so
 * there is a long quiet stretch between launches rather than a rocket
 * permanently on screen next to the satellite.
 */
export function RocketLaunch() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="rocket-launch absolute">
        <PixelRocket className="rocket-launch__art w-16 text-muted sm:w-24" />
      </div>
    </div>
  );
}
