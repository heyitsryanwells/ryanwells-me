/**
 * Build the circular avatar used on the About page.
 *
 *   node scripts/avatar.js <source-image> [output-name]
 *
 * Square-crops the source, masks it to a circle, and writes a transparent
 * WebP into public/. Deliberately the photographic headshot rather than the
 * pixel portrait, so About reads differently from the hero.
 *
 * Give the output a NEW filename when the photo changes: assets are served
 * with max-age=14400 and cached again at Cloudflare's edge.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = process.argv[2];
const OUT_NAME = process.argv[3] || "avatar-round.webp";
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
  await sharp(SRC)
    .resize(SIZE, SIZE, { fit: "cover", position: "top" })
    .composite([{ input: circle, blend: "dest-in" }])
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(OUT);

  // Verify the mask actually applied: a circle inscribed in a square leaves
  // about 21.5% of the canvas transparent, and the corners must be clear.
  const { data, info } = await sharp(OUT).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  const { width: w, height: h, channels: c } = info;
  let clear = 0;
  for (let i = 3; i < data.length; i += c) if (data[i] < 20) clear++;
  const cornerAlpha = data[3];
  const centreAlpha = data[((h / 2) * w + w / 2) * c + 3];

  console.log("wrote", OUT, (fs.statSync(OUT).size / 1024).toFixed(1) + "KB");
  console.log(
    "transparent:",
    ((100 * clear) / (w * h)).toFixed(1) + "%",
    "(expect ~21.5%)",
  );
  console.log("corner alpha:", cornerAlpha, "(expect 0)");
  console.log("centre alpha:", centreAlpha, "(expect 255)");

  if (cornerAlpha > 20 || centreAlpha < 200) {
    console.error("WARNING: circular mask did not apply as expected.");
    process.exit(1);
  }
})();
