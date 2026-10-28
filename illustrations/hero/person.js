/* Hero element: a team member — profile ring, portrait (head + shoulders),
   a role badge with a small glyph, and name/position plate lines.
   720×540 frame, illus.js primitive format. person(badge, ring) → definition.
   badge: "chart" | "code" | "pen" | "check";  ring: colour of the profile ring. */
const CX = 360, CY = 225, R = 165;
const BX = 486, BY = 340, BR = 44; // role badge on the ring, lower right

const GLYPHS = {
  chart: [["line", BX - 18, BY + 18, BX - 18, BY + 2], ["line", BX, BY + 18, BX, BY - 10], ["line", BX + 18, BY + 18, BX + 18, BY - 20]],
  code: [["poly", [[BX - 10, BY - 15], [BX - 26, BY], [BX - 10, BY + 15]]], ["poly", [[BX + 10, BY - 15], [BX + 26, BY], [BX + 10, BY + 15]]], ["line", BX + 5, BY - 17, BX - 5, BY + 17]],
  pen: [["polygon", [[BX - 20, BY + 21], [BX - 16, BY + 6], [BX + 12, BY - 22], [BX + 21, BY - 13], [BX - 7, BY + 15]]], ["line", BX + 4, BY - 14, BX + 13, BY - 5]],
  check: [["poly", [[BX - 21, BY + 1], [BX - 7, BY + 15], [BX + 21, BY - 15]]]],
};

module.exports = function person(badge = "chart", ring = "light") {
  return {
    key: `person-${badge}`,
    dot: 11,
    pitch: 15,
    groups: [
      { color: ring, prims: [["circle", CX, CY, R]] },
      { color: "navy", prims: [
        ["circle", CX, CY - 42, 56],                                   // head
        ["bez", [CX - 117, CY + 117], [CX - 104, CY + 52], [CX - 58, CY + 32], [CX, CY + 32]], // shoulders
        ["bez", [CX, CY + 32], [CX + 58, CY + 32], [CX + 104, CY + 52], [CX + 117, CY + 117]],
      ] },
      { color: "red", prims: [["circle", BX, BY, BR]] },                // role badge
      { color: "navy", prims: GLYPHS[badge] },
      { color: "blue", prims: [["rect", CX - 120, 420, 240, 34, 17]] },  // name plate
      { color: "light", prims: [["line", CX - 75, 492, CX + 75, 492]] }, // position line
      { color: "red", prims: [["dot", 130, 90], ["dot", 152, 70], ["dot", 600, 470], ["dot", 622, 448]] },
      { color: "blue", prims: [["dot", 112, 118], ["dot", 586, 494]] },
    ],
  };
};
