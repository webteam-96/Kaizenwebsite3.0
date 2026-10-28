/* Icon element "megaphone" — 96×96 frame, see _shapes.js and illus.js. */
const { icon, ell } = require("./_shapes");
module.exports = icon("megaphone", [
  { color: "navy", prims: [["polygon", [[24, 38], [58, 20], [58, 72], [24, 56]]]] },
  { color: "red", prims: [["poly", [[24, 38], [12, 38], [12, 56], [24, 56]]], ["poly", [[30, 58], [35, 82], [44, 82], [41, 63]]]] },
  { color: "light", prims: [ell(58, 46, 8, 26, -90, 90), ["line", 76, 60, 86, 68]] },
  { color: "blue", prims: [["line", 76, 32, 86, 24], ["line", 78, 46, 90, 46]] },
]);
