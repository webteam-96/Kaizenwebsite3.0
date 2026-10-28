/* =====================================================================
   Kaizen Infotech — card image pipeline (zero dependencies)

   For every Figma illustration this produces two images that share one
   identical 4:3 frame, so they can be stacked and crossfaded without
   any jump:
     assets/cards/<key>.png       clear version — background knocked out
                                  to transparent, auto-framed, resized
     assets/cards/<key>-dots.svg  rest version — the same artwork
                                  re-rendered as a pixel/dot grid
                                  (same language as the icon dots)

   Run from this folder:   node build-images.js
   Tune the look in CONFIG below, then re-run.
   ===================================================================== */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ART = [
  { key: "software", file: "illustration-software.png" },
  { key: "web", file: "illustration-web.png" },
  { key: "marketing", file: "illustration-marketing.png" },
  { key: "hardware", file: "illustration-hardware.png" },
];

const CONFIG = {
  frame: { w: 720, h: 540, margin: 0.07 }, // output size (4:3) + breathing room around the art
  bgCut: 0.07,        // coverage below this (the off-white box) becomes fully transparent
  paletteSize: 6,     // brand colours the dots are snapped to
  paletteSolid: 0.3,  // min coverage for a dot-centre pixel to shape the palette
  paletteMinShare: 0.03, // colours used by fewer dots than this are merged away
  halftone: {
    pitchRatio: 1.45, // rest grid = 1.45 × the art's own dot spacing (same relative coarseness for every card)
    minPitch: 9,
    maxPitch: 17,     // art that is already chunky (software) stays legible
    inkMin: 0.03,     // a cell needs this much REAL (unblurred) ink — blur spill alone never makes a dot
    dot: 0.34,        // dot radius as a fraction of pitch (diameter ≈ 0.68 — gaps stay open)
    blur: 3,          // melts the art's own dot pattern before sampling (avoids moiré)
    phaseStep: 2,     // grid-offset search step, px
    normPct: 0.92,    // per-illustration normalisation percentile
    lo: 0.3,          // "strong" coverage: always a dot (seeds a stroke)
    weak: 0.13,       // "weak" coverage: a dot only if connected to a stroke
    solid: 0.8,       // at/above this a cell is solid and never thinned
    dominance: 1.25,  // how much stronger a neighbour must be to thin a cell
  },
};

/* ------------------------------------------------------------------ PNG */
function decodePNG(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("not a PNG");
  let off = 8, w, h, depth, type, interlace;
  const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const tag = buf.toString("ascii", off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (tag === "IHDR") {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4);
      depth = data[8]; type = data[9]; interlace = data[12];
    } else if (tag === "IDAT") idat.push(data);
    else if (tag === "IEND") break;
    off += 12 + len;
  }
  if (depth !== 8 || (type !== 2 && type !== 6) || interlace !== 0)
    throw new Error(`unsupported PNG: depth ${depth}, colour type ${type}, interlace ${interlace}`);
  const bpp = type === 6 ? 4 : 3, stride = w * bpp;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const px = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const ft = raw[y * (stride + 1)], src = y * (stride + 1) + 1, cur = y * stride, prev = cur - stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? px[cur + x - bpp] : 0;
      const b = y > 0 ? px[prev + x] : 0;
      const c = x >= bpp && y > 0 ? px[prev + x - bpp] : 0;
      let p = 0;
      if (ft === 1) p = a;
      else if (ft === 2) p = b;
      else if (ft === 3) p = (a + b) >> 1;
      else if (ft === 4) {
        const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c);
        p = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      } else if (ft !== 0) throw new Error(`bad PNG filter ${ft}`);
      px[cur + x] = (raw[src + x] + p) & 255;
    }
  }
  return { w, h, bpp, px };
}

const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(tag, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(tag, "ascii"), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
// RGBA8 → PNG, per-row adaptive filter (min sum of abs deltas)
function encodePNG(w, h, rgba) {
  const stride = w * 4, raw = Buffer.alloc(h * (stride + 1));
  const cand = Array.from({ length: 5 }, () => Buffer.alloc(stride));
  for (let y = 0; y < h; y++) {
    const cur = rgba.subarray(y * stride, (y + 1) * stride);
    const prev = y ? rgba.subarray((y - 1) * stride, y * stride) : null;
    let best = 0, bestSum = Infinity;
    for (let f = 0; f < 5; f++) {
      const out = cand[f]; let sum = 0;
      for (let x = 0; x < stride; x++) {
        const a = x >= 4 ? cur[x - 4] : 0, b = prev ? prev[x] : 0, c = prev && x >= 4 ? prev[x - 4] : 0;
        let p = 0;
        if (f === 1) p = a;
        else if (f === 2) p = b;
        else if (f === 3) p = (a + b) >> 1;
        else if (f === 4) {
          const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c);
          p = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
        }
        const v = (cur[x] - p) & 255;
        out[x] = v; sum += v < 128 ? v : 256 - v;
      }
      if (sum < bestSum) { bestSum = sum; best = f; }
    }
    raw[y * (stride + 1)] = best;
    cand[best].copy(raw, y * (stride + 1) + 1);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* -------------------------------------------------------- pixel buffers
   Images are held as premultiplied float RGBA: rgb = ink colour × alpha
   (0–255 scale), a = coverage 0–1. Premultiplied keeps resampling and
   blurring free of dark fringes.                                          */

// "Colour to alpha" against white: the artwork is coloured ink on a
// near-white sheet, so alpha = (255 − min)/255 and premul rgb = c − min.
function toInk({ w, h, bpp, px }, bgCut) {
  const d = new Float32Array(w * h * 4);
  for (let i = 0, j = 0; i < w * h; i++, j += bpp) {
    const r = px[j], g = px[j + 1], b = px[j + 2], srcA = bpp === 4 ? px[j + 3] / 255 : 1;
    const m = Math.min(r, g, b), a = (255 - m) / 255;
    if (a <= bgCut) continue; // off-white background → transparent
    // ramp only the faint band just above the cut; real ink keeps its exact alpha/colour
    const a2 = a >= 2 * bgCut ? a : (a - bgCut) * 2, k = (a2 / a) * srcA, o = i * 4;
    d[o] = (r - m) * k; d[o + 1] = (g - m) * k; d[o + 2] = (b - m) * k; d[o + 3] = a2 * srcA;
  }
  return { w, h, d };
}

function contentBox({ w, h, d }, thr = 0.3) {
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (d[(y * w + x) * 4 + 3] > thr) {
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
  return { x0, y0, x1: x1 + 1, y1: y1 + 1 };
}

// Smallest frame of the target aspect that holds the art + margin, centred on it.
// It may extend past the source edges — that area is simply transparent.
function frameFor(box, { w: FW, h: FH, margin }) {
  let fw = (box.x1 - box.x0) * (1 + 2 * margin), fh = (box.y1 - box.y0) * (1 + 2 * margin);
  if (fw / fh > FW / FH) fh = fw * (FH / FW); else fw = fh * (FW / FH);
  const cx = (box.x0 + box.x1) / 2, cy = (box.y0 + box.y1) / 2;
  return { x: cx - fw / 2, y: cy - fh / 2, w: fw, h: fh };
}

// Exact area-average weights: output i covers source [start + i·s, start + (i+1)·s).
function axisWeights(start, span, n, srcLen) {
  const s = span / n, all = [];
  for (let i = 0; i < n; i++) {
    const a = start + i * s, b = a + s, ws = [];
    for (let k = Math.floor(a); k < Math.ceil(b); k++) {
      if (k < 0 || k >= srcLen) continue; // outside source = transparent
      const ov = Math.min(b, k + 1) - Math.max(a, k);
      if (ov > 0) ws.push(k, ov / s);
    }
    all.push(ws);
  }
  return all;
}

function resample(img, f, W, H) {
  const wx = axisWeights(f.x, f.w, W, img.w), wy = axisWeights(f.y, f.h, H, img.h);
  const tmp = new Float32Array(img.h * W * 4), src = img.d;
  for (let y = 0; y < img.h; y++) {
    const row = y * img.w * 4, trow = y * W * 4;
    for (let i = 0; i < W; i++) {
      const ws = wx[i]; let r = 0, g = 0, b = 0, a = 0;
      for (let t = 0; t < ws.length; t += 2) {
        const o = row + ws[t] * 4, wt = ws[t + 1];
        r += src[o] * wt; g += src[o + 1] * wt; b += src[o + 2] * wt; a += src[o + 3] * wt;
      }
      const o = trow + i * 4; tmp[o] = r; tmp[o + 1] = g; tmp[o + 2] = b; tmp[o + 3] = a;
    }
  }
  const d = new Float32Array(W * H * 4);
  for (let j = 0; j < H; j++) {
    const ws = wy[j];
    for (let i = 0; i < W; i++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let t = 0; t < ws.length; t += 2) {
        const o = (ws[t] * W + i) * 4, wt = ws[t + 1];
        r += tmp[o] * wt; g += tmp[o + 1] * wt; b += tmp[o + 2] * wt; a += tmp[o + 3] * wt;
      }
      const o = (j * W + i) * 4; d[o] = r; d[o + 1] = g; d[o + 2] = b; d[o + 3] = a;
    }
  }
  return { w: W, h: H, d };
}

// 3-pass separable box blur ≈ Gaussian. Does not modify the input.
function blur(img, r, passes = 3) {
  const { w, h } = img, n = 2 * r + 1;
  let src = Float32Array.from(img.d), dst = new Float32Array(src.length);
  for (let p = 0; p < passes; p++) {
    for (let y = 0; y < h; y++)
      for (let c = 0; c < 4; c++) {
        let acc = 0;
        for (let x = -r; x <= r; x++) if (x >= 0 && x < w) acc += src[(y * w + x) * 4 + c];
        for (let x = 0; x < w; x++) {
          dst[(y * w + x) * 4 + c] = acc / n;
          if (x - r >= 0) acc -= src[(y * w + x - r) * 4 + c];
          if (x + r + 1 < w) acc += src[(y * w + x + r + 1) * 4 + c];
        }
      }
    [src, dst] = [dst, src];
    for (let x = 0; x < w; x++)
      for (let c = 0; c < 4; c++) {
        let acc = 0;
        for (let y = -r; y <= r; y++) if (y >= 0 && y < h) acc += src[(y * w + x) * 4 + c];
        for (let y = 0; y < h; y++) {
          dst[(y * w + x) * 4 + c] = acc / n;
          if (y - r >= 0) acc -= src[((y - r) * w + x) * 4 + c];
          if (y + r + 1 < h) acc += src[((y + r + 1) * w + x) * 4 + c];
        }
      }
    [src, dst] = [dst, src];
  }
  return { w, h, d: src };
}

function toRGBA8({ w, h, d }) {
  const px = Buffer.alloc(w * h * 4), q = (v) => (v < 0 ? 0 : v > 255 ? 255 : Math.round(v));
  for (let i = 0; i < w * h; i++) {
    const o = i * 4, a = d[o + 3];
    if (a * 255 < 0.5) continue;
    px[o] = q(d[o] / a); px[o + 1] = q(d[o + 1] / a); px[o + 2] = q(d[o + 2] / a); px[o + 3] = q(a * 255);
  }
  return px;
}

/* --------------------------------------------------------------- palette
   k-means over the ink colours of solidly covered pixels, shared by all
   illustrations so every card's dots use the same brand colours.          */
const dist2 = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2;
function nearest(pal, c) {
  let bi = 0, bd = Infinity;
  for (let i = 0; i < pal.length; i++) { const dd = dist2(pal[i], c); if (dd < bd) { bd = dd; bi = i; } }
  return bi;
}
// Palette samples: the CENTRE pixels of the artwork's dots (local coverage
// peaks), taken at FULL source resolution. There every dot's centre is fully
// covered, so each sample is the dot's true colour — light blue stays light
// blue, and small red dots stay red instead of reading pink (as their
// partly-covered centres do once downscaled). Anti-aliased rims are excluded.
// Colours are taken as they appear on white. Appends to `out`.
function paletteSamples({ w, h, d }, minA, out, stride = 4) {
  let n = 0;
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      const o = (y * w + x) * 4, a = d[o + 3];
      if (a < minA) continue;
      let peak = true;
      for (let dy = -1; dy <= 1 && peak; dy++)
        for (let dx = -1; dx <= 1; dx++)
          if ((dx || dy) && d[((y + dy) * w + x + dx) * 4 + 3] > a) { peak = false; break; }
      if (peak && n++ % stride === 0) out.push([d[o] + 255 * (1 - a), d[o + 1] + 255 * (1 - a), d[o + 2] + 255 * (1 - a)]);
    }
  return out;
}

function buildPalette(S, k) {
  // deterministic farthest-point initialisation
  const C = [S.reduce((m, s) => [m[0] + s[0] / S.length, m[1] + s[1] / S.length, m[2] + s[2] / S.length], [0, 0, 0])];
  while (C.length < k) {
    let best = S[0], bd = -1;
    for (const s of S) { let m = Infinity; for (const c of C) m = Math.min(m, dist2(s, c)); if (m > bd) { bd = m; best = s; } }
    C.push(best.slice());
  }
  for (let it = 0; it < 25; it++) {
    const acc = C.map(() => [0, 0, 0, 0]);
    for (const s of S) { const t = acc[nearest(C, s)]; t[0] += s[0]; t[1] += s[1]; t[2] += s[2]; t[3]++; }
    acc.forEach((t, i) => { if (t[3]) C[i] = [t[0] / t[3], t[1] / t[3], t[2] / t[3]]; });
  }
  return C.map((c) => c.map(Math.round));
}
const hex = (c) => "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");

/* ----------------------------------------------------------- dot spacing
   The Figma illustrations are themselves dot art, each drawn at its own dot
   size. Measuring the median distance between neighbouring source dots gives
   the art's native "resolution", so every rest grid can be made the SAME
   amount coarser than its own artwork: legible, yet always visibly sharper
   on hover.                                                                */
function dotSpacing({ w, h, d }) {
  const lab = new Int32Array(w * h), cx = [], cy = [];
  let next = 0;
  for (let s = 0; s < w * h; s++) {
    if (lab[s] || d[s * 4 + 3] <= 0.5) continue;
    lab[s] = ++next;
    const stack = [s];
    let n = 0, sx = 0, sy = 0;
    while (stack.length) {
      const q = stack.pop(), x = q % w, y = (q / w) | 0;
      n++; sx += x; sy += y;
      for (const r of [q - 1, q + 1, q - w, q + w]) {
        if (r < 0 || r >= w * h || lab[r] || d[r * 4 + 3] <= 0.5) continue;
        if ((r === q - 1 && x === 0) || (r === q + 1 && x === w - 1)) continue;
        lab[r] = next; stack.push(r);
      }
    }
    if (n >= 4 && n <= 250) { cx.push(sx / n); cy.push(sy / n); } // single dots only, not merged blobs
  }
  const nn = [];
  for (let i = 0; i < cx.length; i++) {
    let best = Infinity;
    for (let j = 0; j < cx.length; j++) if (i !== j) best = Math.min(best, (cx[i] - cx[j]) ** 2 + (cy[i] - cy[j]) ** 2);
    if (best < Infinity) nn.push(Math.sqrt(best));
  }
  nn.sort((a, b) => a - b);
  return { dots: cx.length, spacing: nn.length ? nn[nn.length >> 1] : 0 };
}

/* -------------------------------------------------------------- halftone
   Uniform round dots on a grid — the icon dot language at image scale.
   1. Coverage per cell = mean of a lightly blurred copy (the blur melts the
      artwork's own dot pattern so it can't beat against the grid).
   2. Phase search: the grid is shifted to the offset that packs ink into
      the fewest cells, so straight edges land on one clean row of dots.
   3. Normalised per illustration, so thin-line and dense art both read.
   4. Ridge thinning: a halo cell — a stronger stroke on one side, background
      on the other — is dropped, giving 1-dot-thick strokes like the icons;
      hysteresis then keeps thin curves continuous. Solid areas are protected.
   5. A cell must contain real (unblurred) ink, so blur spill between two
      close strokes can never become a dot on blank paper.
   6. Each dot takes the dominant palette colour of its cell, voted in ink
      space so faint anti-aliased rims can't masquerade as a lighter colour. */
function halftone(sharp, pal, o) {
  const { w, h } = sharp, P = o.pitch;
  const soft = o.blur ? blur(sharp, o.blur) : sharp;
  const W1 = w + 1;
  const integral = (src) => {
    const I = new Float64Array(W1 * (h + 1));
    for (let y = 0; y < h; y++) {
      let row = 0;
      for (let x = 0; x < w; x++) { row += src[(y * w + x) * 4 + 3]; I[(y + 1) * W1 + x + 1] = I[y * W1 + x + 1] + row; }
    }
    return I;
  };
  const Isoft = integral(soft.d), Iink = integral(sharp.d);
  const box = (I, x0, y0, x1, y1) => I[y1 * W1 + x1] - I[y0 * W1 + x1] - I[y1 * W1 + x0] + I[y0 * W1 + x0];
  const gridAt = (dx, dy) => {
    const cols = [], rows = [];
    for (let x = dx - P; x < w; x += P) cols.push(x);
    for (let y = dy - P; y < h; y += P) rows.push(y);
    const cov = new Float64Array(cols.length * rows.length), ink = new Float64Array(cov.length);
    for (let j = 0; j < rows.length; j++)
      for (let i = 0; i < cols.length; i++) {
        const x0 = Math.max(0, cols[i]), x1 = Math.min(w, cols[i] + P), y0 = Math.max(0, rows[j]), y1 = Math.min(h, rows[j] + P);
        if (x1 <= x0 || y1 <= y0) continue;
        cov[j * cols.length + i] = box(Isoft, x0, y0, x1, y1) / (P * P);
        ink[j * cols.length + i] = box(Iink, x0, y0, x1, y1) / (P * P);
      }
    return { cols, rows, cov, ink };
  };
  let g = gridAt(0, 0), bestE = -1;
  for (let dy = 0; dy < P; dy += o.phaseStep)
    for (let dx = 0; dx < P; dx += o.phaseStep) {
      const t = gridAt(dx, dy); let e = 0;
      for (const v of t.cov) e += v * v;
      if (e > bestE) { bestE = e; g = t; }
    }
  const { cols, rows, cov, ink } = g, nc = cols.length, nr = rows.length;
  const at = (i, j) => (i < 0 || j < 0 || i >= nc || j >= nr ? 0 : cov[j * nc + i]);
  // palette in ink space (same colour-to-alpha as toInk) for colour voting
  const palInk = pal.map((c) => {
    const m = Math.min(...c), a = (255 - m) / 255;
    return a > 0 ? c.map((v) => (v - m) / a) : c.slice();
  });
  const sorted = Array.from(cov).filter((v) => v > 0.01).sort((a, b) => a - b);
  const norm = sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * o.normPct))] : 1;
  // Ridge thinning → candidate cells (solid cells are always kept)
  const DIRS = [[1, 0], [0, 1], [1, 1], [1, -1]];
  const cand = new Uint8Array(nc * nr); // 0 none, 1 weak, 2 strong
  for (let j = 0; j < nr; j++)
    for (let i = 0; i < nc; i++) {
      const c = at(i, j), v = c / norm;
      if (v < o.weak || ink[j * nc + i] < o.inkMin) continue; // too faint, or blur spill only
      if (v < o.solid) {
        // Drop a halo cell: a stronger stroke on one side and background on
        // the other. Brightness ripple ALONG a thin dotted curve has stroke on
        // both sides, so it is never mistaken for a halo and curves stay whole.
        const hi = c * o.dominance, bg = o.weak * norm;
        let drop = false;
        for (const [dx, dy] of DIRS) {
          const a = at(i + dx, j + dy), b = at(i - dx, j - dy);
          if ((a > hi && b < bg) || (b > hi && a < bg)) { drop = true; break; }
        }
        if (drop) continue;
      }
      cand[j * nc + i] = v >= o.lo ? 2 : 1;
    }
  // Hysteresis: weak cells survive only when 8-connected to a strong one, so
  // thin curves (globe, marketing circles) stay continuous; stray specks drop.
  const keep = new Uint8Array(nc * nr), stack = [];
  for (let q = 0; q < cand.length; q++) if (cand[q] === 2) { keep[q] = 1; stack.push(q); }
  while (stack.length) {
    const q = stack.pop(), i = q % nc, j = (q / nc) | 0;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const x = i + dx, y = j + dy;
        if (x < 0 || y < 0 || x >= nc || y >= nr) continue;
        const r = y * nc + x;
        if (cand[r] && !keep[r]) { keep[r] = 1; stack.push(r); }
      }
  }
  const dots = [];
  for (let j = 0; j < nr; j++)
    for (let i = 0; i < nc; i++) {
      if (!keep[j * nc + i]) continue;
      // dominant palette colour, voted in INK space: a pixel's un-premultiplied
      // ink is the same at its solid core and its faint rim, so rims vote for
      // the colour they really are (navy stays navy, not "light blue").
      const x0 = Math.max(0, cols[i]), x1 = Math.min(w, cols[i] + P), y0 = Math.max(0, rows[j]), y1 = Math.min(h, rows[j] + P);
      const votes = new Float64Array(pal.length);
      for (let y = y0; y < y1; y++)
        for (let x = x0; x < x1; x++) {
          const q = (y * w + x) * 4, a = sharp.d[q + 3];
          if (a < 0.2) continue;
          votes[nearest(palInk, [sharp.d[q] / a, sharp.d[q + 1] / a, sharp.d[q + 2] / a])] += a * a;
        }
      let ci = 0;
      for (let k = 1; k < votes.length; k++) if (votes[k] > votes[ci]) ci = k;
      if (!votes[ci]) continue;
      dots.push({ x: cols[i] + P / 2, y: rows[j] + P / 2, r: o.dot * P, c: ci });
    }
  return { w, h, dots, shape: "circle" };
}

function toSVG(ht, pal) {
  const f = (n) => +n.toFixed(1);
  const groups = pal.map(() => []);
  for (const d of ht.dots) groups[d.c].push(d);
  const body = groups
    .map((g, i) =>
      g.length
        ? `<g fill="${hex(pal[i])}">` +
          g.map((d) =>
            ht.shape === "square"
              ? `<rect x="${f(d.x - d.r)}" y="${f(d.y - d.r)}" width="${f(2 * d.r)}" height="${f(2 * d.r)}"/>`
              : `<circle cx="${f(d.x)}" cy="${f(d.y)}" r="${f(d.r)}"/>`
          ).join("") + `</g>`
        : ""
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ht.w} ${ht.h}" width="${ht.w}" height="${ht.h}">${body}</svg>\n`;
}

// Raster preview of a halftone (antialiased), over a solid background — for review only.
function rasterize(ht, pal, scale = 1, bg = [255, 255, 255]) {
  const W = Math.round(ht.w * scale), H = Math.round(ht.h * scale), px = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) { px[i * 4] = bg[0]; px[i * 4 + 1] = bg[1]; px[i * 4 + 2] = bg[2]; px[i * 4 + 3] = 255; }
  for (const d of ht.dots) {
    const cx = d.x * scale, cy = d.y * scale, r = d.r * scale, col = pal[d.c];
    for (let y = Math.max(0, Math.floor(cy - r - 1)); y < Math.min(H, Math.ceil(cy + r + 1)); y++)
      for (let x = Math.max(0, Math.floor(cx - r - 1)); x < Math.min(W, Math.ceil(cx + r + 1)); x++) {
        const dx = Math.abs(x + 0.5 - cx), dy = Math.abs(y + 0.5 - cy);
        let cov = ht.shape === "square" ? Math.min(r + 0.5 - dx, r + 0.5 - dy) : r + 0.5 - Math.hypot(dx, dy);
        cov = cov < 0 ? 0 : cov > 1 ? 1 : cov;
        if (!cov) continue;
        const o = (y * W + x) * 4;
        for (let c = 0; c < 3; c++) px[o + c] = Math.round(px[o + c] * (1 - cov) + col[c] * cov);
      }
  }
  return { w: W, h: H, px };
}

// Composite a premultiplied buffer over a solid background — for review only.
function flatten({ w, h, d }, bg = [255, 255, 255]) {
  const px = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const o = i * 4, a = d[o + 3];
    for (let c = 0; c < 3; c++) px[o + c] = Math.max(0, Math.min(255, Math.round(d[o + c] + bg[c] * (1 - a))));
    px[o + 3] = 255;
  }
  return { w, h, px };
}

/* ----------------------------------------------------------------- main */
function prepare(cfg = CONFIG) {
  const H = cfg.halftone;
  const samples = [];
  const framed = ART.map((art) => {
    const ink = toInk(decodePNG(fs.readFileSync(path.join(__dirname, "assets", art.file))), cfg.bgCut);
    paletteSamples(ink, cfg.paletteSolid, samples); // full-res, then the buffer is released
    const frame = frameFor(contentBox(ink), cfg.frame);
    const sharp = resample(ink, frame, cfg.frame.w, cfg.frame.h);
    const { spacing } = dotSpacing(sharp);
    // rest grid = same relative coarseness for every illustration (art.pitch overrides)
    const pitch = art.pitch || Math.min(H.maxPitch, Math.max(H.minPitch, Math.round(H.pitchRatio * spacing)));
    return { ...art, frame, sharp, spacing, pitch };
  });
  const full = buildPalette(samples, cfg.paletteSize);
  return { framed, pal: prunePalette(framed, full, H, cfg.paletteMinShare) };
}

// Drop colours almost no dot ends up using (leftover edge-blend tints such as
// a pink between red and white); those dots re-snap to their nearest true colour.
function prunePalette(framed, pal, ht, minShare) {
  const use = new Array(pal.length).fill(0);
  let total = 0;
  for (const f of framed) for (const d of halftone(f.sharp, pal, { ...ht, pitch: f.pitch }).dots) { use[d.c]++; total++; }
  const kept = pal.filter((_, i) => use[i] / total >= minShare);
  return kept.length ? kept : pal; // never prune to nothing
}

function main() {
  const out = path.join(__dirname, "assets", "cards");
  fs.mkdirSync(out, { recursive: true });
  const { framed, pal } = prepare();
  console.log("palette:", pal.map(hex).join(" "));
  for (const f of framed) {
    const ht = halftone(f.sharp, pal, { ...CONFIG.halftone, pitch: f.pitch });
    const png = encodePNG(f.sharp.w, f.sharp.h, toRGBA8(f.sharp));
    const svg = toSVG(ht, pal);
    fs.writeFileSync(path.join(out, `${f.key}.png`), png);
    fs.writeFileSync(path.join(out, `${f.key}-dots.svg`), svg);
    console.log(
      `${f.key.padEnd(10)} art dots ${f.spacing.toFixed(1)}px → rest pitch ${f.pitch} | ` +
      `${f.key}.png ${(png.length / 1024).toFixed(0)}KB, ${f.key}-dots.svg ${(svg.length / 1024).toFixed(0)}KB (${ht.dots.length} dots)`
    );
  }
}

module.exports = { CONFIG, ART, decodePNG, encodePNG, toInk, contentBox, frameFor, resample, blur, toRGBA8, paletteSamples, buildPalette, dotSpacing, halftone, toSVG, rasterize, flatten, prepare, hex };
if (require.main === module) main();
