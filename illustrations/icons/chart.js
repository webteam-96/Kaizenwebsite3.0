/* Icon element "chart" — 96×96 frame, see _shapes.js and illus.js. */
const { icon } = require("./_shapes");
module.exports = icon("chart", [
  { color: "navy", prims: [["poly", [[12, 10], [12, 84], [86, 84]]]] },
  { color: "darkred", prims: [["dot", 70, 12]] },
  { color: "blue", prims: [["rect", 24, 56, 12, 28]] },
  { color: "light", prims: [["rect", 44, 42, 12, 42]] },
  { color: "red", prims: [["rect", 64, 26, 12, 58]] },
]);
