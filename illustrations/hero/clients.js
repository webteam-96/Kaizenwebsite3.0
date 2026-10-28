/* Hero element: "companies we've worked with" — a wall of six logo tiles,
   each with a different abstract mark (placeholders for client logos).
   720×540 frame, illus.js primitive format. */
const TW = 168, TH = 118, GX = 28, GY = 46, X0 = (720 - (3 * TW + 2 * GX)) / 2, Y0 = 108;
const tile = (c, r) => [X0 + c * (TW + GX), Y0 + r * (TH + GY)];
const mid = (c, r) => { const [x, y] = tile(c, r); return [x + TW / 2, y + TH / 2]; };
const ring = ["navy", "blue", "light", "blue", "light", "navy"];

const marks = [
  ([x, y]) => [["circle", x, y, 30], ["circle", x, y, 10]],                                     // ring + dot
  ([x, y]) => [["polygon", [[x, y - 30], [x + 34, y + 26], [x - 34, y + 26]]]],                  // triangle
  ([x, y]) => [["rect", x - 34, y - 26, 40, 40, 6], ["rect", x - 6, y - 14, 40, 40, 6]],         // overlapping squares
  ([x, y]) => [["line", x - 32, y, x + 32, y], ["line", x, y - 32, x, y + 32], ["circle", x, y, 18]], // cross-in-circle
  ([x, y]) => [["bez", [x - 40, y + 6], [x - 20, y - 30], [x, y + 36], [x + 40, y - 8]], ["line", x - 40, y + 26, x + 40, y + 26]], // wave
  ([x, y]) => [["polygon", [0, 60, 120, 180, 240, 300].map((a) => [x + 32 * Math.cos((a * Math.PI) / 180), y + 32 * Math.sin((a * Math.PI) / 180)])]], // hexagon
];

const groups = [];
for (let i = 0; i < 6; i++) {
  const c = i % 3, r = Math.floor(i / 3), [x, y] = tile(c, r);
  groups.push({ color: ring[i], prims: [["rect", x, y, TW, TH, 16]] });
  groups.push({ color: i % 2 ? "red" : "darkred", prims: marks[i](mid(c, r)) });
}
groups.push({ color: "red", prims: [["dot", 62, 70], ["dot", 84, 52], ["dot", 656, 470]] });
groups.push({ color: "light", prims: [["dot", 46, 96], ["dot", 676, 448]] });

module.exports = { key: "clients", dot: 11, pitch: 15, groups };
