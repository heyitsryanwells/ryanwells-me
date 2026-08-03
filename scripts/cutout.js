/**
 * Regenerate the hero/about portrait from a raw headshot.
 *
 *   node scripts/cutout.js <source-image> [output-name]
 *   node scripts/cutout.js ~/Downloads/headshot.png portrait-cutout-v2.webp
 *
 * Chroma-keys a flat studio background, despills the edge, fades the bottom so
 * the subject dissolves into the page, and writes a 1100px WebP with alpha
 * into public/.
 *
 * Give the output a NEW filename whenever the photo changes: assets are served
 * with max-age=14400 and cached again at Cloudflare's edge, so overwriting in
 * place leaves visitors on the stale image for hours. Then point
 * `site.portrait` in lib/content.ts at the new name.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = process.argv[2];
const OUT_NAME = process.argv[3] || "portrait-cutout.webp";

if (!SRC) {
  console.error("usage: node scripts/cutout.js <source-image> [output-name]");
  process.exit(1);
}

const OUT = path.join(__dirname, "..", "public", OUT_NAME);

const SIZE = 1100;
const INNER = 46; // at or below this RGB distance from the backdrop: transparent
const OUTER = 96; // at or above: opaque. Between the two we ramp.
const FADE_FROM = 0.82; // start the bottom fade at this fraction of height

(async () => {
  // Sample a corner to learn the backdrop colour rather than hardcoding it.
  const probe = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  const BG = [probe.data[0], probe.data[1], probe.data[2]];
  console.log("backdrop sampled from top-left:", BG);

  const { data, info } = await sharp(SRC)
    .resize(SIZE, SIZE, { fit: "cover" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels: c } = info;
  const out = Buffer.from(data);

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
    // shows up as a coloured rim on hair. Pull the dominant backdrop channel
    // back toward the others in proportion to transparency.
    if (a > 0 && a < 255 && b > Math.max(r, g)) {
      const spill = (1 - a / 255) * (b - Math.max(r, g));
      out[i + 2] = Math.max(0, Math.round(b - spill));
    }

    out[i + 3] = a;
  }

  // Bottom fade, so the subject does not end on a ruler-straight line where
  // the source frame cut them off.
  const fadeStart = Math.round(h * FADE_FROM);
  for (let y = fadeStart; y < h; y++) {
    const t = (y - fadeStart) / (h - fadeStart);
    const k = 1 - t * t * (3 - 2 * t); // smoothstep
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * c + 3;
      out[i] = Math.round(out[i] * k);
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality: 86, alphaQuality: 90 })
    .toFile(OUT);

  // Verify rather than assume: the subject must survive the key.
  const v = await sharp(OUT).raw().toBuffer({ resolveWithObject: true });
  let clear = 0;
  let centreOpaque = 0;
  let centreTotal = 0;
  for (let y = 0; y < v.info.height; y++) {
    for (let x = 0; x < v.info.width; x++) {
      const a = v.data[(y * v.info.width + x) * 4 + 3];
      if (a < 10) clear++;
      if (x > w * 0.35 && x < w * 0.65 && y > h * 0.3 && y < h * 0.75) {
        centreTotal++;
        if (a > 128) centreOpaque++;
      }
    }
  }
  const pct = (n, d) => ((100 * n) / d).toFixed(1) + "%";
  console.log("wrote", OUT, (fs.statSync(OUT).size / 1024).toFixed(1) + "KB");
  console.log("transparent:", pct(clear, w * h));
  console.log(
    "subject coverage through centre:",
    pct(centreOpaque, centreTotal),
    "(want >90%)",
  );
  if (centreOpaque / centreTotal < 0.9) {
    console.error("WARNING: the subject may have been keyed away. Raise INNER.");
    process.exit(1);
  }
})();
