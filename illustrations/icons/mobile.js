/* Icon element "mobile" — 96×96 frame, see _shapes.js and illus.js. */
const { icon } = require("./_shapes");
module.exports = icon("mobile", [
  { color: "navy", prims: [["rect", 28, 6, 40, 84, 9], ["line", 42, 80, 54, 80]] },
  { color: "light", prims: [["line", 42, 15, 54, 15], ["line", 38, 66, 52, 66]] },
  { color: "red", prims: [["circle", 48, 37, 9]] },
  { color: "blue", prims: [["line", 38, 56, 58, 56]] },
]);
