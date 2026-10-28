/* =====================================================================
   Kaizen Infotech — line-art illustration elements (zero dependencies)

   An illustration is plain geometry (lines, arcs, curves, dots) drawn in
   the same 720×540 frame as the card images, so it sits exactly where the
   picture did. Every illustration renders twice, like the icon standard:
     .illus__dots  REST  — dotted strokes: the pixelated look
     .illus__line  HOVER — thick solid strokes that draw themselves in

   Geometry lives in illustrations/<key>.js:
     module.exports = { key, dot, pitch, thick?, frame?, groups: [{ color, only?, prims: [...] }] }
   frame: { w, h } — defaults to the 720×540 card frame; icon elements
          (illustrations/icons/<name>.js) use a 96×96 frame.
   color: navy | blue | light | red | darkred
   only:  "rest"  — drawn only in the dotted rest state (e.g. extra rows that
                    rebuild a dense dotted fill such as a solid gear or bezel)
          "hover" — drawn only in the thick-line hover state
          omitted — drawn in both
   prims (frame px, y down; angles in degrees, 0 = right, 90 = down):
     ["line", x1, y1, x2, y2]
     ["poly", [[x, y], ...]]            open polyline
     ["polygon", [[x, y], ...]]         closed
     ["rect", x, y, w, h, r?]           outline, optional corner radius
     ["circle", cx, cy, r]
     ["arc", cx, cy, r, a0, a1]         from a0 to a1 (a1 > a0 = clockwise)
     ["bez", [x0, y0], [c1x, c1y], [c2x, c2y], [x1, y1]]   cubic curve
     ["dot", x, y]                      a single dot (confetti)
   ===================================================================== */

const COLORS = {
  navy: "#01117b",
  blue: "#013bbb",
  light: "#3581f1",
  red: "#d70213",
  darkred: "#a70107",
};
const FRAME = { w: 720, h: 540 };
const rad = (a) => (a * Math.PI) / 180;
const n2 = (v) => +(+v).toFixed(2);

/* ------------------------------------------------------------ SVG paths
   Everything becomes a <path>, so pathLength works on every element and
   each stroke can "draw in" at the same speed regardless of its length. */
function pathD(p) {
  const t = p[0];
  if (t === "line") return `M${n2(p[1])} ${n2(p[2])}L${n2(p[3])} ${n2(p[4])}`;
  if (t === "poly" || t === "polygon")
    return "M" + p[1].map(([x, y]) => `${n2(x)} ${n2(y)}`).join("L") + (t === "polygon" ? "Z" : "");
  if (t === "rect") {
    const [, x, y, w, h, r = 0] = p;
    if (!r) return `M${n2(x)} ${n2(y)}H${n2(x + w)}V${n2(y + h)}H${n2(x)}Z`;
    return (
      `M${n2(x + r)} ${n2(y)}H${n2(x + w - r)}A${r} ${r} 0 0 1 ${n2(x + w)} ${n2(y + r)}` +
      `V${n2(y + h - r)}A${r} ${r} 0 0 1 ${n2(x + w - r)} ${n2(y + h)}` +
      `H${n2(x + r)}A${r} ${r} 0 0 1 ${n2(x)} ${n2(y + h - r)}` +
      `V${n2(y + r)}A${r} ${r} 0 0 1 ${n2(x + r)} ${n2(y)}Z`
    );
  }
  if (t === "circle") {
    const [, cx, cy, r] = p;
    return `M${n2(cx + r)} ${n2(cy)}A${r} ${r} 0 1 1 ${n2(cx - r)} ${n2(cy)}A${r} ${r} 0 1 1 ${n2(cx + r)} ${n2(cy)}Z`;
  }
  if (t === "arc") {
    const [, cx, cy, r, a0, a1] = p;
    if (Math.abs(a1 - a0) >= 360) throw new Error("arc spans 360° — use circle");
    const x0 = cx + r * Math.cos(rad(a0)), y0 = cy + r * Math.sin(rad(a0));
    const x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
    return `M${n2(x0)} ${n2(y0)}A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 1 : 0} ${n2(x1)} ${n2(y1)}`;
  }
  if (t === "bez") {
    const [, a, b, c, d] = p;
    return `M${n2(a[0])} ${n2(a[1])}C${n2(b[0])} ${n2(b[1])} ${n2(c[0])} ${n2(c[1])} ${n2(d[0])} ${n2(d[1])}`;
  }
  if (t === "dot") return `M${n2(p[1])} ${n2(p[2])}h0.01`;
  throw new Error(`unknown primitive "${t}"`);
}

/* ------------------------------------------------------- dense polylines
   The same shapes as point lists, traced in the SAME start point and
   direction as their SVG path, so previews place dots where the browser's
   dash pattern will.                                                     */
function arcPts(cx, cy, r, a0, a1, seg = 1.5) {
  const n = Math.max(2, Math.ceil((Math.abs(a1 - a0) * Math.PI * r) / 180 / seg));
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = rad(a0 + ((a1 - a0) * i) / n);
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}
function densify(p) {
  const t = p[0];
  if (t === "line") return [[p[1], p[2]], [p[3], p[4]]];
  if (t === "poly") return p[1];
  if (t === "polygon") return [...p[1], p[1][0]];
  if (t === "rect") {
    const [, x, y, w, h, r = 0] = p;
    if (!r) return [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];
    return [
      [x + r, y], ...arcPts(x + w - r, y + r, r, -90, 0),
      ...arcPts(x + w - r, y + h - r, r, 0, 90),
      ...arcPts(x + r, y + h - r, r, 90, 180),
      ...arcPts(x + r, y + r, r, 180, 270),
    ];
  }
  if (t === "circle") return arcPts(p[1], p[2], p[3], 0, 360);
  if (t === "arc") return arcPts(p[1], p[2], p[3], p[4], p[5]);
  if (t === "bez") {
    const [, a, b, c, d] = p, pts = [];
    for (let i = 0; i <= 64; i++) {
      const s = i / 64, u = 1 - s;
      pts.push([
        u * u * u * a[0] + 3 * u * u * s * b[0] + 3 * u * s * s * c[0] + s * s * s * d[0],
        u * u * u * a[1] + 3 * u * u * s * b[1] + 3 * u * s * s * c[1] + s * s * s * d[1],
      ]);
    }
    return pts;
  }
  if (t === "dot") return [[p[1], p[2]]];
  throw new Error(`unknown primitive "${t}"`);
}

// Points every `step` along a polyline, starting at its first point
// (mirrors stroke-dasharray "0.01 step" with round caps).
function walk(pts, step) {
  if (pts.length === 1) return [pts[0]];
  const out = [pts[0]];
  let carry = 0;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    const len = Math.hypot(x1 - x0, y1 - y0);
    let d = step - carry;
    while (d <= len) { out.push([x0 + ((x1 - x0) * d) / len, y0 + ((y1 - y0) * d) / len]); d += step; }
    carry = len - (d - step);
  }
  return out;
}

/* --------------------------------------------------------------- markup */
const THICK = 7; // default hover stroke width (frame px)
const inLayer = (g, layer) => !g.only || g.only === layer;

function illusSVG(def) {
  const frame = def.frame || FRAME; // icon elements use a small square frame
  const layer = (name, cls, extra) =>
    `<g class="${cls}">` +
    def.groups
      .filter((g) => inLayer(g, name))
      .map((g) => {
        if (!COLORS[g.color]) throw new Error(`${def.key}: unknown colour "${g.color}"`);
        return `<g stroke="${COLORS[g.color]}">` + g.prims.map((p) => `<path d="${pathD(p)}"${extra}/>`).join("") + `</g>`;
      })
      .join("") +
    `</g>`;
  return (
    `<svg class="illus" viewBox="0 0 ${frame.w} ${frame.h}" style="--dot:${def.dot}px;--pitch:${def.pitch}px;--thick:${def.thick || THICK}px" aria-hidden="true" focusable="false">` +
    layer("rest", "illus__dots", "") +
    layer("hover", "illus__line", ' pathLength="1"') +
    `</svg>`
  );
}

// Load one illustration definition (fresh each call so edits are picked up).
function loadIllus(key) {
  const file = require.resolve(`./illustrations/${key}.js`);
  delete require.cache[file];
  return require(file);
}

module.exports = { COLORS, FRAME, THICK, inLayer, pathD, densify, walk, illusSVG, loadIllus };
