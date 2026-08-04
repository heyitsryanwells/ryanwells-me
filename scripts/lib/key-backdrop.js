/**
 * Remove a flat studio backdrop from a portrait, by connectivity.
 *
 * Shared by scripts/cutout.js and scripts/avatar.js.
 *
 * ## Why connectivity and not a colour threshold
 *
 * The obvious approach, "make every pixel within some RGB distance of the
 * backdrop transparent", is wrong for a portrait, and wrong in a way that is
 * easy to ship without noticing. A dark navy backdrop is the same colour as
 * blue irises, pupils, eyebrow shadow and the shaded side of a collar. A
 * global colour test cannot tell "backdrop" from "a dark blue thing inside the
 * face", so it punches holes through the subject. It did exactly that on the
 * first version of the About avatar: it ate the eyes, and the coverage check
 * of the day still passed, because two eyes are a rounding error against the
 * area of a face.
 *
 * Connectivity separates them cleanly. The backdrop touches the edge of the
 * frame; the eyes do not. So flood from the border and remove only what is
 * reachable. Anything enclosed by the subject survives whatever colour it
 * happens to be, and the tolerance stops being a balancing act between
 * "removes the backdrop" and "keeps his eyes".
 */

/** Indices reachable from the frame edge, walking only where ok(index) holds. */
function floodFromBorder(w, h, ok) {
  const seen = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0;
  let tail = 0;

  const push = (i) => {
    if (!seen[i] && ok(i)) {
      seen[i] = 1;
      queue[tail++] = i;
    }
  };

  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + w - 1);
  }

  while (head < tail) {
    const i = queue[head++];
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) push(i - 1);
    if (x < w - 1) push(i + 1);
    if (y > 0) push(i - w);
    if (y < h - 1) push(i + w);
  }
  return seen;
}

/**
 * @param data   RGBA raw buffer, mutated in place and returned
 * @param info   { width, height, channels } from sharp
 * @param bg     [r,g,b] backdrop colour
 * @param opts   { core, edge, feather }
 *
 * core    distance at which a pixel is definitely backdrop and walkable.
 *         Only needs to cover compression noise on a flat backdrop.
 * edge    distance below which a pixel adjacent to removed backdrop is
 *         treated as a blend and gets a proportional alpha.
 * feather how far, in pixels, that soft edge may reach inward.
 */
function keyBackdrop(data, info, bg, opts = {}) {
  const { core = 30, edge = 100, feather = 4 } = opts;
  const { width: w, height: h, channels: c } = info;
  const px = w * h;

  const dist = new Float32Array(px);
  for (let p = 0; p < px; p++) {
    const i = p * c;
    dist[p] =
      (data[i] - bg[0]) ** 2 +
      (data[i + 1] - bg[1]) ** 2 +
      (data[i + 2] - bg[2]) ** 2;
  }
  const core2 = core * core;
  const edge2 = edge * edge;

  const removed = floodFromBorder(w, h, (p) => dist[p] <= core2);

  const alpha = new Uint8Array(px).fill(255);
  for (let p = 0; p < px; p++) if (removed[p]) alpha[p] = 0;

  // Feather inward from the removed region only. An edge pixel is part
  // subject, part backdrop, so its alpha is where it sits between the two.
  let frontier = removed;
  for (let step = 0; step < feather; step++) {
    const next = new Uint8Array(px);
    for (let p = 0; p < px; p++) {
      if (!frontier[p]) continue;
      const x = p % w;
      const y = (p / w) | 0;
      const neighbours = [
        x > 0 ? p - 1 : -1,
        x < w - 1 ? p + 1 : -1,
        y > 0 ? p - w : -1,
        y < h - 1 ? p + w : -1,
      ];
      for (const n of neighbours) {
        if (n < 0 || removed[n] || alpha[n] !== 255) continue;
        if (dist[n] >= edge2) continue;
        alpha[n] = Math.round(
          ((Math.sqrt(dist[n]) - core) / (edge - core)) * 255,
        );
        next[n] = 1;
      }
    }
    frontier = next;
  }

  // Despill: a half-transparent edge pixel carries backdrop colour, which
  // shows up as a coloured rim on hair. Pull the dominant backdrop channel
  // back toward the others in proportion to transparency.
  const dominant = bg.indexOf(Math.max(...bg));
  for (let p = 0; p < px; p++) {
    const i = p * c;
    const a = alpha[p];
    if (a > 0 && a < 255) {
      const v = [data[i], data[i + 1], data[i + 2]];
      const others = v.filter((_, k) => k !== dominant);
      const peak = Math.max(...others);
      if (v[dominant] > peak) {
        const spill = (1 - a / 255) * (v[dominant] - peak);
        data[i + dominant] = Math.max(0, Math.round(v[dominant] - spill));
      }
    }
    data[i + 3] = a;
  }

  return data;
}

/**
 * Count transparent pixels enclosed by opaque ones.
 *
 * This is the check the first version was missing. A hole in the middle of a
 * subject is what an eaten eye looks like, and it generalises: it will catch
 * teeth, glasses or a shirt logo on the next photo too.
 */
function countEnclosedHoles(rgba, w, h) {
  const isClear = (p) => rgba[p * 4 + 3] < 20;
  const reachable = floodFromBorder(w, h, isClear);
  let holes = 0;
  for (let p = 0; p < w * h; p++) if (isClear(p) && !reachable[p]) holes++;
  return holes;
}

module.exports = { keyBackdrop, floodFromBorder, countEnclosedHoles };
