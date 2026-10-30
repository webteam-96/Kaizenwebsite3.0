/* Line-art element for the "restaurant" card (Restaurant Chain Management Software — POS billing,
   inventory, kitchen display, delivery orders and a live owner's dashboard: "Every outlet. One screen.")
   — an original design in the same visual language as the Figma illustrations (see illustrations/event.js).
   720×540 frame. See illus.js for the primitive format.
   A navy POS TERMINAL on a stand is the hero (double bezel at rest, blue left edge, light header band with a
   red "live" dot); its screen shows a bill (navy item lines, light prices, a dashed rule and a red / dark-red
   total) next to a small sales bar chart (light / blue / navy bars on a baseline). A blue OUTLET STOREFRONT
   (navy fascia, blue / light striped awning with a scalloped edge, window, door) sits behind it (top-right),
   and a red serving CLOCHE on a dark-red platter (a shine cut out of the rest fill, drawn as an arc in hover)
   sits in front of its bottom-right corner; confetti top-left and bottom-right.
   Strokes sit on the same 15px lattice as event.js (x ≡ 0, y ≡ 10 mod 15), so REST dots line up in rows;
   "rest" groups rebuild the bezel and the filled areas as dot rows, "hover" groups close the thick-line icon.
   Where the terminal passes behind the cloche, rest dots stop one empty step short of the cloche's dots and
   hover strokes stop ~20px short of its outline. */
module.exports = {
  key: "restaurant",
  dot: 11,     // REST dot diameter (frame px) — same as event / mobile for a cohesive row
  pitch: 15,   // REST dot spacing along each stroke (frame px)
  groups: [
    // ---------------------------------------------------------------- storefront (behind, top-right)
    // fascia above the awning
    { color: "navy", prims: [
      ["line", 435, 55, 615.5, 55],
    ] },
    // awning: blue stripes (three dot columns × two rows each) + a scallop dot under each stripe
    { color: "blue", only: "rest", prims: [
      ["line", 420, 70, 450.5, 70], ["line", 420, 85, 450.5, 85], ["dot", 435, 100],
      ["line", 510, 70, 540.5, 70], ["line", 510, 85, 540.5, 85], ["dot", 525, 100],
      ["line", 600, 70, 630.5, 70], ["line", 600, 85, 630.5, 85], ["dot", 615, 100],
    ] },
    // awning: light stripes
    { color: "light", only: "rest", prims: [
      ["line", 465, 70, 495.5, 70], ["line", 465, 85, 495.5, 85], ["dot", 480, 100],
      ["line", 555, 70, 585.5, 70], ["line", 555, 85, 585.5, 85], ["dot", 570, 100],
    ] },
    // awning (line state): outline with a scalloped bottom edge, stripe dividers
    { color: "blue", only: "hover", prims: [
      ["poly", [[412.5, 85], [412.5, 70], [637.5, 70], [637.5, 85]]],
      ["arc", 435, 85, 22.5, 180, 0], ["arc", 480, 85, 22.5, 180, 0], ["arc", 525, 85, 22.5, 180, 0],
      ["arc", 570, 85, 22.5, 180, 0], ["arc", 615, 85, 22.5, 180, 0],
      ["line", 457.5, 70, 457.5, 85], ["line", 502.5, 70, 502.5, 85],
      ["line", 547.5, 70, 547.5, 85], ["line", 592.5, 70, 592.5, 85],
    ] },
    // store walls + bottom edge (dots; the left wall disappears behind the terminal)
    { color: "blue", only: "rest", prims: [
      ["line", 435, 115, 435, 130.5],
      ["line", 615, 115, 615, 265.5],
      ["line", 480, 280, 600.5, 280],
    ] },
    // store walls + bottom edge (line state; rounded bottom-right corner, like the event clipboard)
    { color: "blue", only: "hover", prims: [
      ["line", 435, 114, 435, 137],
      ["line", 615, 114, 615, 268],
      ["arc", 603, 268, 12, 0, 90],
      ["line", 603, 280, 480, 280],
    ] },
    // store window (light pane, 2×3 dots)
    { color: "light", only: "rest", prims: [
      ["line", 480, 160, 495.5, 160],
      ["line", 480, 175, 495.5, 175],
      ["line", 480, 190, 495.5, 190],
    ] },
    // store window (line state)
    { color: "light", only: "hover", prims: [
      ["rect", 478.5, 158.5, 18, 33, 4],
    ] },
    // store door (navy frame, dots)
    { color: "navy", only: "rest", prims: [
      ["line", 540, 160, 585.5, 160],
      ["line", 540, 175, 540, 265.5],
      ["line", 585, 175, 585, 265.5],
    ] },
    // store door (line state)
    { color: "navy", only: "hover", prims: [
      ["poly", [[540, 273], [540, 168], [548, 160], [577, 160], [585, 168], [585, 273]]],
    ] },
    // store door handle
    { color: "red", only: "rest", prims: [
      ["dot", 570, 220],
    ] },
    { color: "red", only: "hover", prims: [
      ["circle", 570, 220, 3.5],
    ] },

    // ---------------------------------------------------------------- POS terminal (hero)
    // outer ring, top edge (blue part)
    { color: "blue", prims: [
      ["line", 135, 160, 180.5, 160],
    ] },
    // outer ring, top edge / right side / bottom edge (navy; right + bottom stop short of the cloche)
    { color: "navy", prims: [
      ["line", 195, 160, 435.5, 160],
      ["line", 450, 175, 450, 340.5],
    ] },
    // outer ring, bottom edge dots (stop one empty step clear of the cloche)
    { color: "navy", only: "rest", prims: [
      ["line", 135, 400, 405.5, 400],
    ] },
    // outer ring, bottom edge (line state; stops ~20px clear of the cloche outline)
    { color: "navy", only: "hover", prims: [
      ["line", 135, 400, 393, 400],
    ] },
    // outer ring, left side dots
    { color: "blue", only: "rest", prims: [
      ["line", 120, 175, 120, 385.5],
    ] },
    // left side with cut corners (line state)
    { color: "blue", only: "hover", prims: [
      ["poly", [[135, 400], [120, 385], [120, 175], [135, 160]]],
      ["line", 180, 160, 187.5, 160],
    ] },
    // top-edge join + cut corner top-right (line state)
    { color: "navy", only: "hover", prims: [
      ["line", 187.5, 160, 195, 160],
      ["line", 435, 160, 450, 175],
    ] },
    // inner ring (blue part)
    { color: "blue", only: "rest", prims: [
      ["line", 135, 175, 135, 385.5],
    ] },
    // inner ring (navy part)
    { color: "navy", only: "rest", prims: [
      ["line", 150, 385, 405.5, 385],
      ["line", 435, 175, 435, 355.5],
    ] },
    // header band (light dots) + "live" dot
    { color: "light", only: "rest", prims: [
      ["line", 150, 175, 420.5, 175],
      ["line", 150, 190, 375.5, 190],
    ] },
    { color: "red", only: "rest", prims: [
      ["dot", 420, 190],
    ] },
    // header band (line state)
    { color: "light", only: "hover", prims: [
      ["line", 138, 182.5, 372, 182.5],
    ] },
    { color: "red", only: "hover", prims: [
      ["circle", 420, 184, 4],
    ] },
    // header separator
    { color: "navy", only: "rest", prims: [
      ["line", 150, 205, 420.5, 205],
    ] },
    { color: "navy", only: "hover", prims: [
      ["line", 120, 205, 450, 205],
    ] },
    // bill: item lines (navy)
    { color: "navy", prims: [
      ["line", 150, 235, 195.5, 235],
      ["line", 150, 265, 180.5, 265],
      ["line", 150, 295, 210.5, 295],
    ] },
    // bill: prices (light)
    { color: "light", prims: [
      ["line", 240, 235, 255.5, 235],
      ["line", 240, 265, 255.5, 265],
      ["line", 225, 295, 255.5, 295],
    ] },
    // bill: dashed rule above the total
    { color: "blue", only: "rest", prims: [
      ["dot", 150, 325], ["dot", 180, 325], ["dot", 210, 325], ["dot", 240, 325],
    ] },
    { color: "blue", only: "hover", prims: [
      ["line", 147, 325, 160, 325], ["line", 177, 325, 190, 325],
      ["line", 207, 325, 220, 325], ["line", 237, 325, 250, 325],
    ] },
    // bill: total (red label, dark-red amount)
    { color: "red", prims: [
      ["line", 150, 355, 165.5, 355],
    ] },
    { color: "darkred", prims: [
      ["line", 210, 355, 255.5, 355],
    ] },
    // chart: bars as 2-dot-wide columns (light, blue, navy — rising)
    { color: "light", only: "rest", prims: [
      ["line", 300, 310, 300, 340.5], ["line", 315, 310, 315, 340.5],
    ] },
    { color: "blue", only: "rest", prims: [
      ["line", 345, 280, 345, 340.5], ["line", 360, 280, 360, 340.5],
    ] },
    { color: "navy", only: "rest", prims: [
      ["line", 390, 235, 390, 340.5], ["line", 405, 235, 405, 340.5],
    ] },
    // chart: bars (line state) — outlined, covering the same area as the rest dots
    { color: "light", only: "hover", prims: [
      ["rect", 298.5, 308.5, 18, 33, 4],
    ] },
    { color: "blue", only: "hover", prims: [
      ["rect", 343.5, 278.5, 18, 63, 4],
    ] },
    { color: "navy", only: "hover", prims: [
      ["rect", 388.5, 233.5, 18, 108, 4],
    ] },
    // chart: baseline
    { color: "navy", prims: [
      ["line", 285, 355, 420.5, 355],
    ] },
    // stand: neck + base (dots)
    { color: "navy", only: "rest", prims: [
      ["line", 270, 415, 300.5, 415],
      ["line", 270, 430, 300.5, 430],
      ["line", 210, 445, 360.5, 445],
    ] },
    // stand (line state)
    { color: "navy", only: "hover", prims: [
      ["line", 270, 400, 270, 445],
      ["line", 300, 400, 300, 445],
      ["line", 210, 445, 360, 445],
    ] },

    // ---------------------------------------------------------------- cloche (front, bottom-right)
    // dome: red pixel rows (half-ellipse centred on 510,430; a shine cut out at 480,370 / 465,385)
    { color: "red", only: "rest", prims: [
      ["line", 480, 355, 540.5, 355],
      ["dot", 450, 370],
      ["line", 465, 370, 465.5, 370],
      ["line", 495, 370, 570.5, 370],
      ["dot", 435, 385],
      ["line", 450, 385, 450.5, 385],
      ["line", 480, 385, 585.5, 385],
      ["line", 435, 400, 585.5, 400],
      ["line", 420, 415, 600.5, 415],
    ] },
    // dome outline + shine (line state)
    { color: "red", only: "hover", prims: [
      ["bez", [413, 430], [413, 385.8], [456.4, 350], [510, 350]],
      ["bez", [510, 350], [563.6, 350], [607, 385.8], [607, 430]],
      ["bez", [452, 400], [455, 386], [464, 375], [478, 368]],
    ] },
    // knob + platter (dots)
    { color: "darkred", only: "rest", prims: [
      ["dot", 510, 340],
      ["line", 390, 430, 630.5, 430],
      ["line", 405, 445, 615.5, 445],
    ] },
    // knob + platter (line state)
    { color: "darkred", only: "hover", prims: [
      ["rect", 502, 333, 16, 14, 6],
      ["polygon", [[390, 430], [630, 430], [615, 445], [405, 445]]],
    ] },

    // ---------------------------------------------------------------- confetti
    { color: "red", prims: [
      ["dot", 108, 110],
      ["dot", 72, 130],
      ["dot", 646, 472],
      ["dot", 560, 514],
    ] },
    { color: "darkred", prims: [
      ["dot", 112, 70],
      ["dot", 152, 94],
      ["dot", 668, 440],
      ["dot", 600, 500],
    ] },
    { color: "blue", prims: [
      ["dot", 158, 50],
      ["dot", 178, 100],
      ["dot", 90, 96],
      ["dot", 638, 498],
      ["dot", 575, 480],
      ["dot", 540, 500],
    ] },
    { color: "light", prims: [
      ["dot", 134, 72],
      ["dot", 98, 138],
      ["dot", 620, 478],
    ] },
  ],
};
