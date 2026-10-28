/* Icon element "shield" — 96×96 frame, see _shapes.js and illus.js. */
const { icon } = require("./_shapes");
module.exports = icon("shield", [
  { color: "navy", prims: [["poly", [[18, 46], [18, 22], [48, 9], [78, 22], [78, 46]]], ["bez", [78, 46], [78, 68], [64, 80], [48, 88]], ["bez", [48, 88], [32, 80], [18, 68], [18, 46]]] },
  { color: "light", prims: [["poly", [[30, 30], [48, 22], [66, 30]]]] },
  { color: "red", prims: [["poly", [[34, 50], [44, 60], [63, 40]]]] },
]);
