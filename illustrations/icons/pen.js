/* Icon element "pen" — 96×96 frame, see _shapes.js and illus.js. */
const { icon } = require("./_shapes");
module.exports = icon("pen", [
  { color: "navy", prims: [["polygon", [[64, 12], [84, 32], [36, 80], [14, 84], [18, 62]]]] },
  { color: "blue", prims: [["line", 54, 22, 74, 42]] },
  { color: "red", prims: [["line", 18, 62, 36, 80]] },
  { color: "light", prims: [["line", 52, 88, 86, 88]] },
]);
