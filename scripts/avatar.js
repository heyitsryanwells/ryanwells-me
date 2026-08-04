/**
 * Build the circular avatar used on the About page.
 *
 *   node scripts/avatar.js <source-image> [output-name]
 *
 * Square-crops the source, removes the flat studio backdrop, masks the result
 * to a circle, and writes a transparent WebP into public/.
 *
 * The backdrop is removed rather than kept so the disc colour lives in CSS
 * (`.avatar-disc`) instead of being baked into the pixels. That keeps it on a
 * token, and it means antialiased hair composites against whatever the disc
 * colour actually is.
 *
 * See scripts/lib/key-backdrop.js for why the backdrop is removed by
 * connectivity rather than by a colour threshold. Short version: a threshold
 * cannot tell a navy backdrop from blue eyes, and ate them.
 *
 * Give the output a NEW filename when the photo changes: assets are served
 * with max-age=14400 and cached again at Cloudflare's edge.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { keyBackdrop, countEnclosedHoles } = require("./lib/key-backdrop");

const SRC = process.argv[2];
const OUT_NAME = process.argv[3] || "avatar-cutout-v2.webp";
const SIZE = 640;

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

  const keyed = keyBackdrop(Buffer.from(data), info, BG);
  const { width: w, height: h } = info;

  await sharp(keyed, { raw: { width: w, height: h, channels: 4 } })
    .composite([{ input: circle, blend: "dest-in" }])
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(OUT);

  // ---- Verify --------------------------------------------------------------
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

  // The eye band specifically, since that is the thing that broke.
  let eyeSoft = 0;
  let eyeTotal = 0;
  for (let y = 255; y < 300; y++) {
    for (let x = 225; x < 415; x++) {
      eyeTotal++;
      if (alphaAt(x, y) < 250) eyeSoft++;
    }
  }

  const holes = countEnclosedHoles(v, vi.width, vi.height);
  const backdropInCircle = alphaAt(Math.round(w * 0.15), Math.round(h * 0.3));
  const corner = alphaAt(0, 0);
  const pct = (n, d) => ((100 * n) / d).toFixed(2) + "%";

  console.log("wrote", OUT, (fs.statSync(OUT).size / 1024).toFixed(1) + "KB");
  console.log("transparent:", pct(clear, w * h));
  console.log("corner alpha:", corner, "(expect 0, outside the circle)");
  console.log("backdrop-inside-circle alpha:", backdropInCircle, "(expect 0)");
  console.log("subject coverage through centre:", pct(centreOpaque, centreTotal));
  console.log("eye band not fully opaque:", pct(eyeSoft, eyeTotal), "(want 0%)");
  console.log("enclosed transparent holes:", holes, "(want 0)");

  let bad = false;
  if (corner > 20) {
    console.error("FAIL: circular mask did not apply.");
    bad = true;
  }
  if (backdropInCircle > 20) {
    console.error("FAIL: the backdrop was not removed. Raise core.");
    bad = true;
  }
  if (centreOpaque / centreTotal < 0.9) {
    console.error("FAIL: the subject was eaten. Lower core.");
    bad = true;
  }
  if (eyeSoft > 0) {
    console.error("FAIL: the eye band is not fully opaque.");
    bad = true;
  }
  if (holes > 0) {
    console.error("FAIL: transparent holes enclosed by the subject.");
    bad = true;
  }
  if (bad) process.exit(1);
})();
