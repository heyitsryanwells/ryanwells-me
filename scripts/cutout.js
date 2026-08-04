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
const { keyBackdrop, countEnclosedHoles } = require("./lib/key-backdrop");

const SRC = process.argv[2];
const OUT_NAME = process.argv[3] || "portrait-cutout.webp";

if (!SRC) {
  console.error("usage: node scripts/cutout.js <source-image> [output-name]");
  process.exit(1);
}

const OUT = path.join(__dirname, "..", "public", OUT_NAME);

const SIZE = 1100;
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
  const out = keyBackdrop(Buffer.from(data), info, BG);

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
  // A hole surrounded by subject is what an eaten eye looks like. Coverage
  // alone will not catch it: two eyes are a rounding error against a face, so
  // the old check passed at 98% while the eyes were gone.
  const holes = countEnclosedHoles(v.data, v.info.width, v.info.height);

  const pct = (n, d) => ((100 * n) / d).toFixed(1) + "%";
  console.log("wrote", OUT, (fs.statSync(OUT).size / 1024).toFixed(1) + "KB");
  console.log("transparent:", pct(clear, w * h));
  console.log(
    "subject coverage through centre:",
    pct(centreOpaque, centreTotal),
    "(want >90%)",
  );
  console.log("enclosed transparent holes:", holes, "(want 0)");

  let bad = false;
  if (centreOpaque / centreTotal < 0.9) {
    console.error("FAIL: the subject may have been keyed away. Lower core.");
    bad = true;
  }
  if (holes > 0) {
    console.error("FAIL: transparent holes enclosed by the subject.");
    bad = true;
  }
  if (bad) process.exit(1);
})();
