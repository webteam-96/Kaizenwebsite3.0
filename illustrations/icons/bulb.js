/* Icon element "bulb" — 96×96 frame, see _shapes.js and illus.js. */
const { icon } = require("./_shapes");
module.exports = icon("bulb", [
  { color: "navy", prims: [["arc", 48, 40, 24, 135, 405], ["line", 31, 57, 38, 68], ["line", 65, 57, 58, 68], ["line", 38, 68, 58, 68]] },
  { color: "blue", prims: [["line", 39, 76, 57, 76], ["line", 42, 84, 54, 84]] },
  { color: "red", prims: [["poly", [[39, 50], [44, 40], [48, 50], [52, 40], [57, 50]]]] },
  { color: "light", prims: [["line", 16, 12, 22, 18], ["line", 80, 12, 74, 18], ["line", 6, 40, 14, 40], ["line", 90, 40, 82, 40]] },
]);
