/* Icon element "gear" — 96×96 frame, see _shapes.js and illus.js. */
const { icon, gear } = require("./_shapes");
module.exports = icon("gear", [
  { color: "red", prims: [gear(48, 48, 28, 38, 8)] },
  { color: "navy", prims: [["circle", 48, 48, 13]] },
  { color: "light", prims: [["dot", 48, 48]] },
]);
