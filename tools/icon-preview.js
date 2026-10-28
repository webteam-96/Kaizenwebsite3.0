/* Preview tool for the icon elements (dev only).

   node tools/icon-preview.js <outDir> [name ...]
       → icons.png  one column per icon: rest + hover at real tile size
         (50px icon on its light tile), then rest + hover zoomed 3×.

   Icons live in illustrations/icons/<name>.js (96×96 frame). */
const fs = require("fs");
const path = require("path");
const IMG = require("../build-images.js");
const IL = require("../illus.js");

const hexRGB = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const [outDir, ...names] = process.argv.slice(2);
if (!outDir) { console.error("usage: node tools/icon-preview.js <outDir> [name ...]"); process.exit(1); }
const dir = path.join(__dirname, "..", "illustrations", "icons");
const keys = names.length ? names : fs.readdirSync(dir).filter((f) => f.endsWith(".js") && !f.startsWith("_")).map((f) => f.slice(0, -3));

const TILE = 74, ZOOM = 288, GAP = 12, COLW = ZOOM + GAP;
const W = keys.length * COLW + GAP, H = GAP + TILE + GAP + 2 * (ZOOM + GAP);
const px = Buffer.alloc(W * H * 4, 0);
for (let i = 0; i < W * H; i++) px.set([236, 240, 244, 255], i * 4);
const blend = (x, y, rgb, a) => {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || y < 0 || x >= W || y >= H || a <= 0) return;
  const o = (y * W + x) * 4;
  for (let c = 0; c < 3; c++) px[o + c] = Math.round(px[o + c] * (1 - a) + rgb[c] * a);
};
const rect = (x, y, w, h, rgb) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) blend(i, j, rgb, 1); };
const disc = (cx, cy, r, rgb) => {
  for (let y = Math.floor(cy - r - 1); y <= Math.ceil(cy + r + 1); y++)
    for (let x = Math.floor(cx - r - 1); x <= Math.ceil(cx + r + 1); x++) {
      let cov = r + 0.5 - Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      cov = cov < 0 ? 0 : cov > 1 ? 1 : cov;
      if (cov) blend(x, y, rgb, cov);
    }
};
function draw(def, layer, s, ox, oy) {
  for (const g of def.groups) {
    if (!IL.inLayer(g, layer)) continue;
    const rgb = hexRGB(IL.COLORS[g.color]);
    for (const p of g.prims) {
      const pts = IL.densify(p);
      if (layer === "rest") for (const [x, y] of IL.walk(pts, def.pitch)) disc(ox + x * s, oy + y * s, (def.dot / 2) * s, rgb);
      else for (const [x, y] of IL.walk(pts, 0.5)) disc(ox + x * s, oy + y * s, (def.thick / 2) * s, rgb);
    }
  }
}

keys.forEach((k, i) => {
  const def = IL.loadIllus(`icons/${k}`), X = GAP + i * COLW, s = 50 / 96;
  // real size: two 74px light-blue tiles (rest | hover), 50px icon centred
  for (const [j, layer] of [[0, "rest"], [1, "hover"]]) {
    const tx = X + j * (TILE + GAP);
    rect(tx, GAP, TILE, TILE, [224, 241, 255]);
    draw(def, layer, s, tx + 12, GAP + 12);
  }
  // zoomed 3×
  for (const [j, layer] of [[0, "rest"], [1, "hover"]]) {
    const Y = GAP + TILE + GAP + j * (ZOOM + GAP);
    rect(X, Y, ZOOM, ZOOM, [255, 255, 255]);
    draw(def, layer, ZOOM / 96, X, Y);
  }
});
fs.mkdirSync(outDir, { recursive: true });
const file = path.join(outDir, `icons${names.length ? "-" + names.join("-") : ""}.png`);
fs.writeFileSync(file, IMG.encodePNG(W, H, px));
console.log("wrote", file, `(${keys.length} icons)`);
