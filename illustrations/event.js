/* Line-art element for the "event" card in What We Do (Event Registration & Management) — an
   original design in the same visual language as the Figma illustrations (see illustrations/software.js).
   720×540 frame. See illus.js for the primitive format.
   A wall CALENDAR is the navy hero (binder rings, light header band, a grid of 2×2-dot date cells that
   become small outlined squares in hover, one circled red event date); a blue-outlined CLIPBOARD CHECKLIST
   with red ticks and a cut top-right corner sits behind it (top-right) for management; a red EVENT TICKET
   (deep side notches, perforated dark-red stub, a star cut out of the rest fill as a hole and drawn as an
   outline in hover) sits in front of it (bottom-right) for registration; confetti top-left and bottom-right.
   "rest" groups rebuild the double-row bezel and the solid filled ticket as dot rows; "hover" groups draw
   the clean thick-line icon. */
module.exports = {
  key: "event",
  dot: 11,     // REST dot diameter (frame px) — same as software for a cohesive row
  pitch: 15,   // REST dot spacing along each stroke (frame px)
  groups: [
    // calendar: outer ring, top edge (blue part)
    { color: "blue", prims: [
      ["line", 135, 160, 180.5, 160],
    ] },
    // calendar: outer ring, top edge / right side / bottom edge (navy)
    { color: "navy", prims: [
      ["line", 195, 160, 435.5, 160],
      ["line", 450, 175, 450, 310.5],
      ["line", 135, 430, 375.5, 430],
    ] },
    // calendar: outer ring, left side dots
    { color: "blue", only: "rest", prims: [
      ["line", 120, 175, 120, 415.5],
    ] },
    // calendar: left side with cut corners (line state)
    { color: "blue", only: "hover", prims: [
      ["poly", [[135, 430], [120, 415], [120, 175], [135, 160]]],
      ["line", 180, 160, 187.5, 160],
    ] },
    // calendar: top-edge join + cut corner top-right (line state)
    { color: "navy", only: "hover", prims: [
      ["line", 187.5, 160, 195, 160],
      ["line", 435, 160, 450, 175],
    ] },
    // calendar: inner ring (blue part)
    { color: "blue", only: "rest", prims: [
      ["line", 135, 220, 135, 415.5],
    ] },
    // calendar: inner ring (navy part)
    { color: "navy", only: "rest", prims: [
      ["line", 150, 415, 375.5, 415],
      ["line", 435, 220, 435, 310.5],
    ] },
    // calendar: header band rows (light)
    { color: "light", only: "rest", prims: [
      ["line", 135, 175, 180.5, 175],
      ["line", 225, 175, 345.5, 175],
      ["line", 390, 175, 435.5, 175],
      ["line", 135, 190, 435.5, 190],
    ] },
    // calendar: header band (line state)
    { color: "light", only: "hover", prims: [
      ["line", 138, 182.5, 432, 182.5],
    ] },
    // calendar: header separator dots
    { color: "navy", only: "rest", prims: [
      ["line", 135, 205, 435.5, 205],
    ] },
    // calendar: header separator
    { color: "navy", only: "hover", prims: [
      ["line", 120, 205, 450, 205],
    ] },
    // calendar: binder rings (two dot columns each)
    { color: "navy", only: "rest", prims: [
      ["line", 195, 130, 195, 175.5],
      ["line", 210, 130, 210, 175.5],
      ["line", 360, 130, 360, 175.5],
      ["line", 375, 130, 375, 175.5],
    ] },
    // calendar: binder rings (line state)
    { color: "navy", only: "hover", prims: [
      ["rect", 194, 123, 17, 37, 8.5],
      ["rect", 359, 123, 17, 37, 8.5],
    ] },
    // calendar: date cells (navy) — 2×2 dots
    { color: "navy", only: "rest", prims: [
      ["line", 165, 235, 180.5, 235],
      ["line", 165, 250, 180.5, 250],
      ["line", 210, 235, 225.5, 235],
      ["line", 210, 250, 225.5, 250],
      ["line", 255, 235, 270.5, 235],
      ["line", 255, 250, 270.5, 250],
      ["line", 345, 235, 360.5, 235],
      ["line", 345, 250, 360.5, 250],
      ["line", 165, 280, 180.5, 280],
      ["line", 165, 295, 180.5, 295],
      ["line", 210, 280, 225.5, 280],
      ["line", 210, 295, 225.5, 295],
      ["line", 300, 280, 315.5, 280],
      ["line", 300, 295, 315.5, 295],
      ["line", 345, 280, 360.5, 280],
      ["line", 345, 295, 360.5, 295],
      ["line", 210, 325, 225.5, 325],
      ["line", 210, 340, 225.5, 340],
      ["line", 255, 325, 270.5, 325],
      ["line", 255, 340, 270.5, 340],
      ["line", 300, 325, 315.5, 325],
      ["line", 300, 340, 315.5, 340],
      ["line", 345, 325, 360.5, 325],
      ["line", 345, 340, 360.5, 340],
      ["line", 165, 370, 180.5, 370],
      ["line", 165, 385, 180.5, 385],
      ["line", 210, 370, 225.5, 370],
      ["line", 210, 385, 225.5, 385],
      ["line", 255, 370, 270.5, 370],
      ["line", 255, 385, 270.5, 385],
      ["line", 300, 370, 315.5, 370],
      ["line", 300, 385, 315.5, 385],
      ["line", 345, 370, 360.5, 370],
      ["line", 345, 385, 360.5, 385],
    ] },
    // calendar: date cells (navy) — line state: small outlined squares (like the mobile app tiles)
    // that cover the same area as the 2×2 rest dots
    { color: "navy", only: "hover", prims: [
      ["rect", 163.5, 233.5, 18, 18, 4],
      ["rect", 208.5, 233.5, 18, 18, 4],
      ["rect", 253.5, 233.5, 18, 18, 4],
      ["rect", 343.5, 233.5, 18, 18, 4],
      ["rect", 163.5, 278.5, 18, 18, 4],
      ["rect", 208.5, 278.5, 18, 18, 4],
      ["rect", 298.5, 278.5, 18, 18, 4],
      ["rect", 343.5, 278.5, 18, 18, 4],
      ["rect", 208.5, 323.5, 18, 18, 4],
      ["rect", 253.5, 323.5, 18, 18, 4],
      ["rect", 298.5, 323.5, 18, 18, 4],
      ["rect", 343.5, 323.5, 18, 18, 4],
      ["rect", 163.5, 368.5, 18, 18, 4],
      ["rect", 208.5, 368.5, 18, 18, 4],
      ["rect", 253.5, 368.5, 18, 18, 4],
      ["rect", 298.5, 368.5, 18, 18, 4],
      ["rect", 343.5, 368.5, 18, 18, 4],
    ] },
    // calendar: date cells (blue) — 2×2 dots
    { color: "blue", only: "rest", prims: [
      ["line", 300, 235, 315.5, 235],
      ["line", 300, 250, 315.5, 250],
      ["line", 165, 325, 180.5, 325],
      ["line", 165, 340, 180.5, 340],
    ] },
    // calendar: date cells (blue) — line state
    { color: "blue", only: "hover", prims: [
      ["rect", 298.5, 233.5, 18, 18, 4],
      ["rect", 163.5, 323.5, 18, 18, 4],
    ] },
    // calendar: date cells (light) — 2×2 dots
    { color: "light", only: "rest", prims: [
      ["line", 390, 235, 405.5, 235],
      ["line", 390, 250, 405.5, 250],
      ["line", 390, 280, 405.5, 280],
      ["line", 390, 295, 405.5, 295],
    ] },
    // calendar: date cells (light) — line state
    { color: "light", only: "hover", prims: [
      ["rect", 388.5, 233.5, 18, 18, 4],
      ["rect", 388.5, 278.5, 18, 18, 4],
    ] },
    // calendar: event date (red) — one centre dot, so the ring around it stays a clear target
    { color: "red", only: "rest", prims: [
      ["dot", 262.5, 287.5],
    ] },
    // calendar: event date (red) — line state: one bullseye centre inside the ring, the only solid
    // mark on the calendar, so the event date stands out from the outlined cells
    { color: "red", only: "hover", prims: [
      ["circle", 262.5, 287.5, 3.5],
    ] },
    // calendar: event date ring (dots)
    { color: "darkred", only: "rest", prims: [
      ["circle", 262.5, 287.5, 23.87],
    ] },
    // calendar: event date ring (line state)
    { color: "darkred", only: "hover", prims: [
      ["circle", 262.5, 287.5, 21],
    ] },
    // clipboard: outline
    { color: "blue", prims: [
      ["line", 435, 70, 480.5, 70],
      ["line", 570, 70, 615.5, 70],
      ["line", 630, 85, 630, 265.5],
      ["line", 480, 280, 615.5, 280],
    ] },
    // clipboard: left side dots
    { color: "blue", only: "rest", prims: [
      ["line", 420, 85, 420, 130.5],
    ] },
    // clipboard: left side + corners (line state) — cut corner top-right, like the software
    // window and the mobile code panel in the same spot; the rest dots already step diagonally there
    { color: "blue", only: "hover", prims: [
      ["poly", [[420, 137], [420, 82]]],
      ["arc", 432, 82, 12, 180, 270],
      ["line", 432, 70, 480, 70],
      ["poly", [[570, 70], [615, 70], [630, 85], [630, 268]]],
      ["arc", 618, 268, 12, 0, 90],
      ["line", 618, 280, 480, 280],
    ] },
    // clipboard: clip dots
    { color: "navy", only: "rest", prims: [
      ["line", 510, 40, 540.5, 40],
      ["line", 495, 55, 555.5, 55],
      ["line", 495, 70, 555.5, 70],
    ] },
    // clipboard: clip (line state)
    { color: "navy", only: "hover", prims: [
      ["rect", 495, 40, 60, 30, 8],
      ["line", 480, 70, 495, 70],
      ["line", 555, 70, 570, 70],
    ] },
    // clipboard: check marks (dots)
    { color: "red", only: "rest", prims: [
      ["dot", 480, 115],
      ["dot", 495, 130],
      ["dot", 510, 115],
      ["dot", 525, 100],
      ["dot", 480, 175],
      ["dot", 495, 190],
      ["dot", 510, 175],
      ["dot", 525, 160],
      ["dot", 480, 235],
      ["dot", 495, 250],
      ["dot", 510, 235],
      ["dot", 525, 220],
    ] },
    // clipboard: check marks (line state)
    { color: "red", only: "hover", prims: [
      ["poly", [[480, 115], [495, 130], [525, 100]]],
      ["poly", [[480, 175], [495, 190], [525, 160]]],
      ["poly", [[480, 235], [495, 250], [525, 220]]],
    ] },
    // clipboard: item lines (navy)
    { color: "navy", only: "rest", prims: [
      ["line", 555, 115, 570.5, 115],
      ["line", 555, 235, 585.5, 235],
    ] },
    // clipboard: item lines (light)
    { color: "light", only: "rest", prims: [
      ["line", 585, 115, 600.5, 115],
      ["line", 555, 175, 585.5, 175],
    ] },
    // clipboard: item lines (darkred)
    { color: "darkred", only: "rest", prims: [
      ["dot", 600, 175],
    ] },
    // clipboard: item lines (line state, navy)
    { color: "navy", only: "hover", prims: [
      ["line", 555, 115, 572, 115],
      ["line", 555, 235, 587, 235],
    ] },
    // clipboard: item lines (line state, light)
    { color: "light", only: "hover", prims: [
      ["line", 583, 115, 600, 115],
      ["line", 555, 175, 585, 175],
    ] },
    // clipboard: item lines (line state, darkred)
    { color: "darkred", only: "hover", prims: [
      ["line", 593, 175, 600, 175],
    ] },
    // ticket: red pixel rows (main part) — solid fill with a pixel STAR cut out as a hole round
    // (495,392) (tip 370, arms 465–525 at 385, body 480–510 at 400, legs 480 / 510 at 415), like the
    // software gear's hub hole; notch 2 dots deep across rows 370–415 on the left
    { color: "red", only: "rest", prims: [
      ["line", 420, 340, 555.5, 340],
      ["line", 405, 355, 555.5, 355],
      ["line", 435, 370, 480.5, 370],
      ["line", 510, 370, 555.5, 370],
      ["line", 435, 385, 450.5, 385],
      ["line", 540, 385, 555.5, 385],
      ["line", 435, 400, 465.5, 400],
      ["line", 525, 400, 555.5, 400],
      ["line", 435, 415, 465.5, 415],
      ["dot", 495, 415],
      ["line", 525, 415, 555.5, 415],
      ["line", 405, 430, 555.5, 430],
      ["line", 420, 445, 555.5, 445],
    ] },
    // ticket: perforation column — outer edge continuous, inner dots alternate as a tear line
    { color: "darkred", only: "rest", prims: [
      ["dot", 570, 340],
      ["dot", 570, 370],
      ["dot", 570, 415],
      ["dot", 570, 445],
    ] },
    // ticket: dark red pixel rows (stub) — notch 2 dots deep across rows 370–415 on the right
    { color: "darkred", only: "rest", prims: [
      ["line", 585, 340, 615.5, 340],
      ["line", 585, 355, 630.5, 355],
      ["line", 585, 370, 600.5, 370],
      ["line", 585, 385, 600.5, 385],
      ["line", 585, 400, 600.5, 400],
      ["line", 585, 415, 600.5, 415],
      ["line", 585, 430, 630.5, 430],
      ["line", 585, 445, 615.5, 445],
    ] },
    // ticket: outline main part (line state) — notch radius 25 to match the deeper rest notch
    { color: "red", only: "hover", prims: [
      ["poly", [[570, 340], [413, 340]]],
      ["arc", 413, 348, 8, 270, 180],
      ["line", 405, 348, 405, 367.5],
      ["arc", 405, 392.5, 25, -90, 90],
      ["line", 405, 417.5, 405, 437],
      ["arc", 413, 437, 8, 180, 90],
      ["line", 413, 445, 570, 445],
    ] },
    // ticket: outline stub (line state)
    { color: "darkred", only: "hover", prims: [
      ["line", 570, 340, 622, 340],
      ["arc", 622, 348, 8, 270, 360],
      ["line", 630, 348, 630, 367.5],
      ["arc", 630, 392.5, 25, 270, 90],
      ["line", 630, 417.5, 630, 437],
      ["arc", 622, 437, 8, 0, 90],
      ["line", 622, 445, 570, 445],
    ] },
    // ticket: perforation (line state)
    { color: "darkred", only: "hover", prims: [
      ["line", 570, 355, 570, 365],
      ["line", 570, 387.5, 570, 397.5],
      ["line", 570, 420, 570, 430],
    ] },
    // ticket: star (line state) — traces the star-shaped hole in the rest fill
    { color: "red", only: "hover", prims: [
      ["polygon", [[495, 366], [501.76, 384.7], [521.63, 385.35], [505.94, 397.55], [511.46, 416.65], [495, 405.5], [478.54, 416.65], [484.06, 397.55], [468.37, 385.35], [488.24, 384.7]]],
    ] },
    // confetti: red
    { color: "red", prims: [
      ["dot", 108, 110],
      ["dot", 72, 130],
      ["dot", 596, 472],
      ["dot", 560, 514],
    ] },
    // confetti: dark red
    { color: "darkred", prims: [
      ["dot", 112, 70],
      ["dot", 152, 94],
      ["dot", 658, 468],
      ["dot", 590, 502],
    ] },
    // confetti: blue
    { color: "blue", prims: [
      ["dot", 158, 50],
      ["dot", 178, 96],
      ["dot", 90, 96],
      ["dot", 628, 470],
      ["dot", 565, 488],
      ["dot", 540, 502],
    ] },
    // confetti: light
    { color: "light", prims: [
      ["dot", 134, 72],
      ["dot", 98, 138],
      ["dot", 612, 488],
    ] },
  ],
};
