/* Icon element "code" — 96×96 frame, see _shapes.js and illus.js. */
const { icon } = require("./_shapes");
module.exports = icon("code", [
  { color: "navy", prims: [["rect", 10, 16, 76, 64, 7], ["line", 10, 30, 86, 30]] },
  { color: "red", prims: [["dot", 19, 23], ["poly", [[38, 42], [27, 54], [38, 66]]]] },
  { color: "blue", prims: [["dot", 28, 23], ["poly", [[58, 42], [69, 54], [58, 66]]]] },
  { color: "light", prims: [["dot", 37, 23], ["line", 53, 40, 43, 68]] },
]);
