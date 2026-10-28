/* Icon element "database" — 96×96 frame, see _shapes.js and illus.js. */
const { icon, ell } = require("./_shapes");
module.exports = icon("database", [
  { color: "navy", prims: [ell(48, 20, 30, 10), ["line", 18, 20, 18, 76], ["line", 78, 20, 78, 76], ell(48, 76, 30, 10, 0, 180)] },
  { color: "blue", prims: [ell(48, 39, 30, 10, 0, 180)] },
  { color: "red", prims: [ell(48, 58, 30, 10, 0, 180)] },
]);
