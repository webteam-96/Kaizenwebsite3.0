/* Icon element "mail" — 96×96 frame, see _shapes.js and illus.js. */
const { icon } = require("./_shapes");
module.exports = icon("mail", [
  { color: "navy", prims: [["rect", 10, 20, 76, 56, 7]] },
  { color: "red", prims: [["poly", [[14, 26], [48, 52], [82, 26]]]] },
  { color: "light", prims: [["line", 16, 70, 38, 50], ["line", 80, 70, 58, 50]] },
]);
