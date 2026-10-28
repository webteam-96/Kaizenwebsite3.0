/* Shared helpers for the icon elements (96×96 frame).
   Icon elements follow the same standard as the card elements —
   multi-colour, dotted at rest, thick lines drawing in on hover — scaled
   down for icon tiles. Every icon uses the same dot, pitch and line weight. */
const FRAME = { w: 96, h: 96 };

function icon(key, groups) {
  return { key, frame: FRAME, dot: 7, pitch: 10, thick: 5.5, groups };
}

const P = (cx, cy, rx, ry, a) => [+(cx + rx * Math.cos((a * Math.PI) / 180)).toFixed(2), +(cy + ry * Math.sin((a * Math.PI) / 180)).toFixed(2)];

// Elliptical arc as a polyline (a0 → a1 in degrees, 0 = right, 90 = down).
function ell(cx, cy, rx, ry, a0 = 0, a1 = 360, n = 48) {
  const pts = [];
  for (let i = 0; i <= n; i++) pts.push(P(cx, cy, rx, ry, a0 + ((a1 - a0) * i) / n));
  return ["poly", pts];
}

// Gear outline: `teeth` flat-topped teeth between radius r0 (root) and r1 (tip).
function gear(cx, cy, r0, r1, teeth = 8) {
  const pts = [], step = 360 / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step - 90;
    pts.push(P(cx, cy, r0, r0, a - step * 0.3), P(cx, cy, r1, r1, a - step * 0.17), P(cx, cy, r1, r1, a + step * 0.17), P(cx, cy, r0, r0, a + step * 0.3));
    for (let k = 1; k < 4; k++) pts.push(P(cx, cy, r0, r0, a + step * 0.3 + (step * 0.4 * k) / 4));
  }
  return ["polygon", pts];
}

module.exports = { FRAME, icon, ell, gear };
