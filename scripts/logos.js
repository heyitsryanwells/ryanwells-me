/**
 * Normalize the downloaded brand marks into one consistent set.
 *
 * The sources are a mix of real SVG, WebP-named-.svg and PNG-named-.svg, at
 * wildly different sizes, some with transparency and some on a solid白
 * background. Everything comes out as a trimmed transparent WebP at a uniform
 * height so the marquee can treat them identically.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = "/Users/ryan/Downloads";
const OUT = "/Users/ryan/projects/ryanwells-me/public/logos";

const MAP = [
  ["salesforce.svg", "salesforce"],
  ["hubspot-svgrepo-com.svg", "hubspot"],
  ["pylon.svg", "pylon"],
  ["gong.svg", "gong"],
  ["outreach.svg", "outreach"],
  ["claude.webp", "claude"],
  ["n8n.svg", "n8n"],
  ["wiza.svg", "wiza"],
  ["linear.svg", "linear"],
  ["granola.svg", "granola"],
  ["vector_logo.svg", "vector"],
  ["revenuehero.svg", "revenuehero"],
];

const H = 120; // 2x the ~60px display height

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const report = [];

  for (const [file, name] of MAP) {
    const p = path.join(SRC, file);
    if (!fs.existsSync(p)) {
      report.push({ name, status: "MISSING SOURCE" });
      continue;
    }

    // density only affects SVG input; harmless for raster.
    let img = sharp(p, { density: 900 });
    const meta = await img.metadata();

    // Measure transparency on the raw input.
    const probe = await sharp(p, { density: 900 })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let clear = 0;
    const px = probe.info.width * probe.info.height;
    for (let i = 3; i < probe.data.length; i += probe.info.channels) {
      if (probe.data[i] < 20) clear++;
    }
    const transparent = clear / px;

    let pipeline = sharp(p, { density: 900 }).ensureAlpha();

    // No usable alpha means the mark sits on a solid field. Key the corner
    // colour out rather than assuming it is white.
    let keyed = false;
    if (transparent < 0.02) {
      const c = probe.data;
      const bg = [c[0], c[1], c[2]];
      const { data, info } = await sharp(p, { density: 900 })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      const out = Buffer.from(data);
      for (let i = 0; i < data.length; i += info.channels) {
        const d = Math.sqrt(
          (data[i] - bg[0]) ** 2 +
            (data[i + 1] - bg[1]) ** 2 +
            (data[i + 2] - bg[2]) ** 2,
        );
        out[i + 3] = d < 40 ? 0 : d > 90 ? 255 : Math.round(((d - 40) / 50) * 255);
      }
      pipeline = sharp(out, {
        raw: { width: info.width, height: info.height, channels: 4 },
      });
      keyed = true;
    }

    const buf = await pipeline
      .trim({ threshold: 1 })
      .resize({ height: H, fit: "inside", withoutEnlargement: false })
      .webp({ quality: 95, alphaQuality: 100 })
      .toFile(path.join(OUT, `${name}.webp`));

    // Measure the result: mean luminance of opaque pixels tells us whether the
    // mark is dark (and would vanish on black without treatment).
    const r = await sharp(path.join(OUT, `${name}.webp`))
      .raw()
      .toBuffer({ resolveWithObject: true });
    let sum = 0,
      n = 0;
    for (let i = 0; i < r.data.length; i += r.info.channels) {
      const a = r.data[i + 3];
      if (a > 128) {
        sum += (r.data[i] + r.data[i + 1] + r.data[i + 2]) / 3;
        n++;
      }
    }
    report.push({
      name,
      src: `${meta.format} ${meta.width}x${meta.height}`,
      keyed,
      out: `${buf.width}x${buf.height}`,
      ratio: (buf.width / buf.height).toFixed(2),
      meanLum: n ? Math.round(sum / n) : 0,
      kb: (fs.statSync(path.join(OUT, `${name}.webp`)).size / 1024).toFixed(1),
    });
  }

  console.log(
    "name".padEnd(13),
    "source".padEnd(20),
    "keyed".padEnd(6),
    "out".padEnd(11),
    "ratio".padEnd(6),
    "lum".padEnd(5),
    "KB",
  );
  console.log("-".repeat(74));
  for (const r of report) {
    if (r.status) {
      console.log(r.name.padEnd(13), r.status);
      continue;
    }
    console.log(
      r.name.padEnd(13),
      r.src.padEnd(20),
      String(r.keyed).padEnd(6),
      r.out.padEnd(11),
      r.ratio.padEnd(6),
      String(r.meanLum).padEnd(5),
      r.kb,
    );
  }
  const dark = report.filter((r) => r.meanLum && r.meanLum < 90);
  console.log("");
  console.log(
    dark.length
      ? `DARK marks that would vanish on black: ${dark.map((d) => d.name + "(" + d.meanLum + ")").join(", ")}`
      : "no dark marks",
  );
})();
