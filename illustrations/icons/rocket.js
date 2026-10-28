/* Icon element "rocket" — 96×96 frame, see _shapes.js and illus.js. */
const { icon } = require("./_shapes");
module.exports = icon("rocket", [
  { color: "navy", prims: [["bez", [48, 6], [66, 20], [68, 44], [60, 66]], ["line", 60, 66, 36, 66], ["bez", [36, 66], [28, 44], [30, 20], [48, 6]]] },
  { color: "light", prims: [["circle", 48, 32, 7]] },
  { color: "blue", prims: [["poly", [[34, 50], [22, 64], [22, 76], [36, 68]]], ["poly", [[62, 50], [74, 64], [74, 76], [60, 68]]]] },
  { color: "red", prims: [["poly", [[40, 72], [48, 90], [56, 72]]]] },
]);
