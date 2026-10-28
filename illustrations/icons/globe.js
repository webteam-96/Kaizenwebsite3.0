/* Icon element "globe" — 96×96 frame, see _shapes.js and illus.js. */
const { icon, ell } = require("./_shapes");
module.exports = icon("globe", [
  { color: "navy", prims: [["circle", 48, 48, 36]] },
  { color: "blue", prims: [ell(48, 48, 15, 36, -90, 270)] },
  { color: "red", prims: [["line", 12, 48, 84, 48]] },
  { color: "light", prims: [["line", 19, 30, 77, 30], ["line", 19, 66, 77, 66]] },
]);
