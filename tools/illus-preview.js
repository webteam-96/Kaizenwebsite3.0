/* Preview / tracing tool for the line-art illustrations (dev only).

   node tools/illus-preview.js <key> <outDir>
       → <key>-sheet.png  2×2: source | rest (dots) / hover (thick) | overlay
       → <key>-grid.png   source with a labelled coordinate grid (every 20, labels every 100)
   node tools/illus-preview.js <key> <outDir> crop <x> <y> <w> <h>
       → <key>-crop-<x>-<y>.png  zoomed source + thin geometry overlay, grid every 10 (labels every 50)

   <key> = software | hardware | marketing (illustrations/<key>.js; source assets/cards/<key>.png) */
const fs = require("fs");
const path = require("path");
const IMG = require("../build-images.js");
const IL = require("../illus.js");

const ROOT = path.join(__dirname, "..");
const hexRGB = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

/* ---------------------------------------------------------------- canvas */
function canvas(W, H, bg = [255, 255, 255]) {
  const px = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) { px[i * 4] = bg[0]; px[i * 4 + 1] = bg[1]; px[i * 4 + 2] = bg[2]; px[i * 4 + 3] = 255; }
  const blend = (x, y, rgb, a) => {
    if (x < 0 || y < 0 || x >= W || y >= H || a <= 0) return;
    const o = (y * W + x) * 4;
    for (let c = 0; c < 3; c++) px[o + c] = Math.round(px[o + c] * (1 - a) + rgb[c] * a);
  };
  return {
    W, H, px, blend,
    disc(cx, cy, r, rgb, alpha = 1) { // antialiased filled circle
      for (let y = Math.floor(cy - r - 1); y <= Math.ceil(cy + r + 1); y++)
        for (let x = Math.floor(cx - r - 1); x <= Math.ceil(cx + r + 1); x++) {
          let cov = r + 0.5 - Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
          cov = cov < 0 ? 0 : cov > 1 ? 1 : cov;
          if (cov) blend(x, y, rgb, cov * alpha);
        }
    },
    rect(x, y, w, h, rgb, a = 1) { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) blend(i, j, rgb, a); },
    save(file) { fs.writeFileSync(file, IMG.encodePNG(W, H, px)); },
  };
}

// 3×5 bitmap digits for grid labels
const FONT = {
  0: "111101101101111", 1: "010110010010111", 2: "111001111100111", 3: "111001111001111", 4: "101101111001001",
  5: "111100111001111", 6: "111100111101111", 7: "111001001001001", 8: "111101111101111", 9: "111101111001111",
};
function text(cv, str, x, y, s = 2, rgb = [40, 40, 40]) {
  [...String(str)].forEach((ch, k) => {
    const g = FONT[ch]; if (!g) return;
    for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === "1") cv.rect(x + (k * 4 + i) * s, y + j * s, s, s, rgb);
  });
}

/* ---------------------------------------------------------------- source */
// Returns null for original designs that have no source picture.
function source(key) {
  const file = path.join(ROOT, "assets", "cards", `${key}.png`);
  if (!fs.existsSync(file)) return null;
  const p = IMG.decodePNG(fs.readFileSync(file));
  const d = new Float32Array(p.w * p.h * 4);
  for (let i = 0; i < p.w * p.h; i++) {
    const a = p.px[i * 4 + 3] / 255;
    d[i * 4] = p.px[i * 4] * a; d[i * 4 + 1] = p.px[i * 4 + 1] * a; d[i * 4 + 2] = p.px[i * 4 + 2] * a; d[i * 4 + 3] = a;
  }
  return { w: p.w, h: p.h, d };
}
// draw a region of the (premultiplied) source onto a canvas at a scale, faded
function blitSource(cv, src, { sx = 0, sy = 0, sw = src.w, sh = src.h, scale = 1, ox = 0, oy = 0, fade = 1 }) {
  const W = Math.round(sw * scale), H = Math.round(sh * scale);
  const r = IMG.resample(src, { x: sx, y: sy, w: sw, h: sh }, W, H);
  for (let j = 0; j < H; j++)
    for (let i = 0; i < W; i++) {
      const o = (j * W + i) * 4, a = r.d[o + 3] * fade;
      if (a <= 0) continue;
      const rgb = [0, 1, 2].map((c) => r.d[o + c] / r.d[o + 3]);
      cv.blend(ox + i, oy + j, rgb, a);
    }
}

/* -------------------------------------------------------------- geometry */
function strokes(def, layer, fn) { // fn(points, rgb) for every primitive in a layer ("rest" | "hover" | "all")
  for (const g of def.groups) {
    if (layer !== "all" && !IL.inLayer(g, layer)) continue;
    const rgb = hexRGB(IL.COLORS[g.color]);
    for (const p of g.prims) fn(IL.densify(p), rgb, p);
  }
}
function drawRest(cv, def, s, ox = 0, oy = 0) {
  strokes(def, "rest", (pts, rgb) => { for (const [x, y] of IL.walk(pts, def.pitch)) cv.disc(ox + x * s, oy + y * s, (def.dot / 2) * s, rgb); });
}
function drawSolid(cv, def, s, width, ox = 0, oy = 0, alpha = 1, layer = "hover") {
  strokes(def, layer, (pts, rgb) => { for (const [x, y] of IL.walk(pts, 0.6)) cv.disc(ox + x * s, oy + y * s, (width / 2) * s, rgb, alpha); });
}

/* ------------------------------------------------------------------ main */
const [key, outDir, mode, ...rest] = process.argv.slice(2);
if (!key || !outDir) { console.error("usage: node tools/illus-preview.js <key> <outDir> [crop x y w h]\n       node tools/illus-preview.js row <outDir> <key> <key> <key>"); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });

if (key === "row") {
  // What We Do row at real card size: rest on top, hover below
  const keys = [mode, ...rest].filter(Boolean), s = 0.5, TW = 360, TH = 270, GAP = 14;
  const W = keys.length * TW + (keys.length + 1) * GAP, H = 2 * TH + 3 * GAP, cv = canvas(W, H, [226, 232, 238]);
  keys.forEach((k, i) => {
    const d = IL.loadIllus(k), X = GAP + i * (TW + GAP);
    cv.rect(X, GAP, TW, TH, [255, 255, 255]); drawRest(cv, d, s, X, GAP);
    cv.rect(X, 2 * GAP + TH, TW, TH, [255, 255, 255]); drawSolid(cv, d, s, d.thick || IL.THICK, X, 2 * GAP + TH);
  });
  const file = path.join(outDir, `row-${keys.join("-")}.png`);
  cv.save(file); console.log("wrote", file);
  process.exit(0);
}

const def = IL.loadIllus(key), src = source(key);
const thick = def.thick || IL.THICK;
const ref = src || source("software"); // style reference for original designs

if (mode === "crop") {
  const [x, y, w, h] = rest.map(Number);
  const s = Math.min(6, 900 / w), M = 34, W = Math.round(w * s) + M, H = Math.round(h * s) + M;
  const cv = canvas(W, H);
  if (src) blitSource(cv, src, { sx: x, sy: y, sw: w, sh: h, scale: s, ox: M, oy: M, fade: 0.55 });
  for (let gx = Math.ceil(x / 10) * 10; gx <= x + w; gx += 10) {
    const X = M + Math.round((gx - x) * s);
    for (let j = M; j < H; j++) cv.blend(X, j, [0, 0, 0], gx % 50 ? 0.08 : 0.3);
    if (gx % 50 === 0) text(cv, gx, X - 6, 6);
  }
  for (let gy = Math.ceil(y / 10) * 10; gy <= y + h; gy += 10) {
    const Y = M + Math.round((gy - y) * s);
    for (let i = M; i < W; i++) cv.blend(i, Y, [0, 0, 0], gy % 50 ? 0.08 : 0.3);
    if (gy % 50 === 0) text(cv, gy, 2, Y - 4);
  }
  drawSolid(cv, def, s, 1.6 / s + 0.4, M - x * s, M - y * s, 0.9, "all"); // thin overlay of all geometry
  const file = path.join(outDir, `${key}-crop-${x}-${y}.png`);
  cv.save(file); console.log("wrote", file);
} else {
  // labelled grid over the source (or over your geometry, for original designs)
  const M = 30, g = canvas(720 + M, 540 + M);
  if (src) blitSource(g, src, { ox: M, oy: M });
  else drawSolid(g, def, 1, 2.2, M, M, 0.9, "all");
  for (let v = 0; v <= 720; v += 20) { for (let j = M; j < 540 + M; j++) g.blend(M + v, j, [0, 0, 0], v % 100 ? 0.07 : 0.3); if (v % 100 === 0) text(g, v, M + v - 5, 8); }
  for (let v = 0; v <= 540; v += 20) { for (let i = M; i < 720 + M; i++) g.blend(i, M + v, [0, 0, 0], v % 100 ? 0.07 : 0.3); if (v % 100 === 0) text(g, v, 2, M + v - 4); }
  g.save(path.join(outDir, `${key}-grid.png`));

  // 2×2 sheet at 0.75 scale: source (or STYLE REFERENCE = software picture) | rest / hover | overlay
  const s = 0.75, TW = 540, TH = 405, GAP = 12, W = TW * 2 + GAP * 3, H = TH * 2 + GAP * 3;
  const cv = canvas(W, H, [226, 232, 238]);
  const tile = (c, r) => { const X = GAP + c * (TW + GAP), Y = GAP + r * (TH + GAP); cv.rect(X, Y, TW, TH, [255, 255, 255]); return [X, Y]; };
  let [X, Y] = tile(0, 0); blitSource(cv, ref, { scale: s, ox: X, oy: Y });
  [X, Y] = tile(1, 0); drawRest(cv, def, s, X, Y);
  [X, Y] = tile(0, 1); drawSolid(cv, def, s, thick, X, Y);
  [X, Y] = tile(1, 1); if (src) blitSource(cv, src, { scale: s, ox: X, oy: Y, fade: 0.35 }); drawSolid(cv, def, s, 2.2, X, Y, 0.95, "all");
  cv.save(path.join(outDir, `${key}-sheet.png`));
  let prims = 0; for (const gr of def.groups) prims += gr.prims.length;
  console.log(`wrote ${key}-sheet.png + ${key}-grid.png (${def.groups.length} colour groups, ${prims} primitives)`);
}
