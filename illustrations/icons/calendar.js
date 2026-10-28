/* Icon element "calendar" — 96×96 frame, see _shapes.js and illus.js. */
const { icon } = require("./_shapes");
module.exports = icon("calendar", [
  { color: "navy", prims: [["rect", 10, 18, 76, 68, 7], ["line", 10, 36, 86, 36]] },
  { color: "red", prims: [["line", 30, 8, 30, 26], ["line", 66, 8, 66, 26], ["circle", 64, 70, 8]] },
  { color: "blue", prims: [["dot", 28, 52], ["dot", 46, 52], ["dot", 64, 52], ["dot", 28, 70]] },
  { color: "light", prims: [["dot", 46, 70]] },
]);
