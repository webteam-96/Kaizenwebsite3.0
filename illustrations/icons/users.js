/* Icon element "users" — 96×96 frame, see _shapes.js and illus.js. */
const { icon } = require("./_shapes");
module.exports = icon("users", [
  { color: "light", prims: [["circle", 66, 30, 9], ["arc", 66, 66, 18, 215, 335]] },
  { color: "navy", prims: [["circle", 38, 34, 12], ["arc", 38, 80, 24, 180, 360]] },
  { color: "red", prims: [["dot", 84, 18]] },
]);
