/**
 * Build the circular avatar used on the About page.
 *
 *   node scripts/avatar.js <source-image> [output-name]
 *
 * Square-crops the source, chroma-keys the flat studio backdrop to
 * transparent, masks the result to a circle, and writes a transparent WebP
 * into public/.
 *
 * The backdrop is keyed rather than kept so the disc colour lives in CSS
 * (`.avatar-disc`) instead of being baked into the pixels. That keeps it on a
 * token, and it means antialiased hair composites against whatever the disc
 * colour actually is rather than against a stale blue.
 *
 * Still the photographic headshot rather than the pixel portrait, and still a
 * circle, so About reads differently from the hero.
 *
 * Give the output a NEW filename when the photo changes: assets are served
 * with max-age=14400 and cached again at Cloudflare's edge.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = process.argv[2];
const OUT_NAME = process.argv[3] || "avatar-cutout.webp";
const SIZE = 640;

// Same ramp as scripts/cutout.js, which is proven on this backdrop.
const INNER = 46; // at or below this RGB distance from the backdrop: transparent
const OUTER = 96; // at or above: opaque. Between the two we ramp.

if (!SRC) {
  console.error("usage: node scripts/avatar.js <source-image> [output-name]");
  process.exit(1);
}

const OUT = path.join(__dirname, "..", "public", OUT_NAME);

const circle = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}" fill="#fff"/></svg>`,
);

(async () => {
  // Sample a corner to learn the backdrop colour rather than hardcoding it.
  const probe = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  const BG = [probe.data[0], probe.data[1], probe.data[2]];
  console.log("backdrop sampled from top-left:", BG);

  const { data, info } = await sharp(SRC)
    .resize(SIZE, SIZE, { fit: "cover", position: "top" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels: c } = info;
  const keyed = Buffer.from(data);

  for (let i = 0; i < data.length; i += c) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const d = Math.sqrt((r - BG[0]) ** 2 + (g - BG[1]) ** 2 + (b - BG[2]) ** 2);

    let a;
    if (d <= INNER) a = 0;
    else if (d >= OUTER) a = 255;
    else a = Math.round(((d - INNER) / (OUTER - INNER)) * 255);

    // Despill: partially transparent edge pixels carry backdrop colour, which
    // shows up as a blue rim on hair. Pull the dominant backdrop channel back
    // toward the others in proportion to transparency.
    if (a > 0 && a < 255 && b > Math.max(r, g)) {
      const spill = (1 - a / 255) * (b - Math.max(r, g));
      keyed[i + 2] = Math.max(0, Math.round(b - spill));
    }

    keyed[i + 3] = a;
  }

  await sharp(keyed, { raw: { width: w, height: h, channels: 4 } })
    .composite([{ input: circle, blend: "dest-in" }])
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(OUT);

  // Verify rather than assume. Three things have to be true at once: the
  // circle clipped the corners, the key cleared the backdrop inside the
  // circle, and the subject survived both.
  const { data: v, info: vi } = await sharp(OUT).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  const alphaAt = (x, y) => v[(y * vi.width + x) * 4 + 3];

  let clear = 0;
  for (let i = 3; i < v.length; i += 4) if (v[i] < 20) clear++;

  let centreOpaque = 0;
  let centreTotal = 0;
  for (let y = Math.round(h * 0.3); y < h * 0.75; y++) {
    for (let x = Math.round(w * 0.35); x < w * 0.65; x++) {
      centreTotal++;
      if (alphaAt(x, y) > 128) centreOpaque++;
    }
  }

  const corner = alphaAt(0, 0);
  // Inside the circle (258px from a 320px radius) but well clear of the
  // subject, so it should have been keyed away.
  const backdropInCircle = alphaAt(Math.round(w * 0.15), Math.round(h * 0.3));
  const pct = (n, d) => ((100 * n) / d).toFixed(1) + "%";

  console.log("wrote", OUT, (fs.statSync(OUT).size / 1024).toFixed(1) + "KB");
  console.log("transparent:", pct(clear, w * h));
  console.log("corner alpha:", corner, "(expect 0, outside the circle)");
  console.log("backdrop-inside-circle alpha:", backdropInCircle, "(expect 0)");
  console.log(
    "subject coverage through centre:",
    pct(centreOpaque, centreTotal),
    "(want >90%)",
  );

  if (corner > 20) {
    console.error("WARNING: circular mask did not apply.");
    process.exit(1);
  }
  if (backdropInCircle > 20) {
    console.error("WARNING: the backdrop was not keyed away. Raise INNER.");
    process.exit(1);
  }
  if (centreOpaque / centreTotal < 0.9) {
    console.error("WARNING: the subject may have been keyed away. Raise INNER.");
    process.exit(1);
  }
})();
