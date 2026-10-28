/* Icon element "pin" — 96×96 frame, see _shapes.js and illus.js. */
const { icon } = require("./_shapes");
module.exports = icon("pin", [
  { color: "navy", prims: [["bez", [48, 82], [32, 64], [20, 52], [20, 38]], ["arc", 48, 38, 28, 180, 360], ["bez", [76, 38], [76, 52], [64, 64], [48, 82]]] },
  { color: "red", prims: [["circle", 48, 38, 10]] },
  { color: "light", prims: [["line", 34, 90, 62, 90]] },
]);
