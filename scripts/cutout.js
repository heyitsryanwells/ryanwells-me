// Chroma-key the flat navy studio background out of the headshot.
// Soft-edged matte + blue despill, so hair does not get a hard halo.
const sharp = require("sharp");

const SRC = "/Users/ryan/Downloads/new-headshot-darkblue.png";
const OUT =
  "/private/tmp/claude-501/-Users-ryan-projects--crm/67bb066f-bd55-4048-a253-2e908262c3c1/scratchpad/treatments/cutout-base.png";

const BG = [11, 47, 74];
const INNER = 46; // fully transparent at or below this distance
const OUTER = 96; // fully opaque at or above; between the two we ramp

(async () => {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.from(data);

  let keyed = 0;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const d = Math.sqrt(
      (r - BG[0]) ** 2 + (g - BG[1]) ** 2 + (b - BG[2]) ** 2,
    );

    let a;
    if (d <= INNER) a = 0;
    else if (d >= OUTER) a = 255;
    else a = Math.round(((d - INNER) / (OUTER - INNER)) * 255);

    // Despill: on partially transparent edge pixels the navy bleeds into the
    // subject, leaving a blue rim. Pull blue back toward the red/green level
    // in proportion to how transparent the pixel is.
    if (a > 0 && a < 255 && b > Math.max(r, g)) {
      const spill = (1 - a / 255) * (b - Math.max(r, g));
      out[i + 2] = Math.max(0, Math.round(b - spill));
    }

    out[i + 3] = a;
    if (a === 0) keyed++;
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .resize(1100, 1100, { fit: "cover" })
    .png()
    .toFile(OUT);

  // Verify the subject survived: alpha coverage in the centre column should be
  // high, and overall transparency should land near the 55% background share.
  const check = await sharp(OUT).raw().toBuffer({ resolveWithObject: true });
  const w = check.info.width;
  const h = check.info.height;
  let opaque = 0;
  let centreOpaque = 0;
  let centreTotal = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const a = check.data[(y * w + x) * 4 + 3];
      if (a > 128) opaque++;
      if (x > w * 0.35 && x < w * 0.65 && y > h * 0.3) {
        centreTotal++;
        if (a > 128) centreOpaque++;
      }
    }
  }
  console.log("wrote", OUT);
  console.log(
    "transparent:",
    (100 * (1 - opaque / (w * h))).toFixed(1) + "%",
    "(expect ~55%)",
  );
  console.log(
    "subject coverage in centre:",
    (100 * (centreOpaque / centreTotal)).toFixed(1) + "%",
    "(expect >90%)",
  );
})();
