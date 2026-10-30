/* Line-art element for the "oms" product (Organisation Management System) — an original design in the
   same visual language as the Figma illustrations (see illustrations/event.js, illustrations/mobile.js).
   720×540 frame. See illus.js for the primitive format.
   A navy DASHBOARD WINDOW is the hero (double bezel at rest, cut corners, light title band with three
   window-control dots, a sidebar of module items, three module tiles for CRM / HR / Finance, and a rising
   bar chart); a blue ORG CHART (a boxed lead with two people under it, joined by connector lines) stands
   behind it top-right for the organisation; a red CHAT BUBBLE (solid fill, three typing dots cut out as
   holes, dark-red tail) sits in front of its bottom-right corner for internal messaging; confetti top-left
   and bottom-right. Content spans x 120–630, y 30–450, in line with the event and mobile elements.
   Strokes sit on a 15px lattice (pitch 15), so REST dots line up in rows; "rest" groups rebuild dense /
   filled areas as dot rows, "hover" groups close the clean thick-line icon. Where the window passes behind
   the bubble, rest dots stop one empty 15px step short and hover strokes stop ~20px short of its outline. */
module.exports = {
  key: "oms",
  dot: 11,     // REST dot diameter (frame px) — same as software for a cohesive row
  pitch: 15,   // REST dot spacing along each stroke (frame px)
  groups: [
    // window: outer ring, top edge / right side / bottom edge (navy; right + bottom stop short of the bubble)
    { color: "navy", prims: [
      ["line", 135, 165, 435.5, 165],
      ["line", 450, 180, 450, 300.5],
      ["line", 135, 435, 390.5, 435],
    ] },
    // window: outer ring, left side dots (blue)
    { color: "blue", only: "rest", prims: [
      ["line", 120, 180, 120, 420.5],
    ] },
    // window: left side with cut corners (line state)
    { color: "blue", only: "hover", prims: [
      ["poly", [[135, 435], [120, 420], [120, 180], [135, 165]]],
    ] },
    // window: cut corner top-right + edges running on toward the bubble (line state)
    { color: "navy", only: "hover", prims: [
      ["line", 435, 165, 450, 180],
      ["line", 450, 300, 450, 310],
      ["line", 390, 435, 400, 435],
    ] },
    // window: inner ring (blue part)
    { color: "blue", only: "rest", prims: [
      ["line", 135, 225, 135, 420.5],
    ] },
    // window: inner ring (navy part)
    { color: "navy", only: "rest", prims: [
      ["line", 150, 420, 390.5, 420],
      ["line", 435, 225, 435, 300.5],
    ] },
    // window: title band rows (light address bar)
    { color: "light", only: "rest", prims: [
      ["line", 240, 180, 420.5, 180],
      ["line", 240, 195, 420.5, 195],
    ] },
    // window: title band (line state)
    { color: "light", only: "hover", prims: [
      ["line", 243, 187.5, 417, 187.5],
    ] },
    // window: control dots (rest)
    { color: "red", only: "rest", prims: [["dot", 157.5, 187.5]] },
    { color: "light", only: "rest", prims: [["dot", 180, 187.5]] },
    { color: "blue", only: "rest", prims: [["dot", 202.5, 187.5]] },
    // window: control dots (line state)
    { color: "red", only: "hover", prims: [["circle", 157.5, 187.5, 3.5]] },
    { color: "light", only: "hover", prims: [["circle", 180, 187.5, 3.5]] },
    { color: "blue", only: "hover", prims: [["circle", 202.5, 187.5, 3.5]] },
    // window: title separator dots
    { color: "navy", only: "rest", prims: [
      ["line", 135, 210, 435.5, 210],
    ] },
    // window: title separator
    { color: "navy", only: "hover", prims: [
      ["line", 120, 210, 450, 210],
    ] },
    // sidebar: divider dots
    { color: "navy", only: "rest", prims: [
      ["line", 210, 225, 210, 405.5],
    ] },
    // sidebar: divider
    { color: "navy", only: "hover", prims: [
      ["line", 210, 210, 210, 420],
    ] },
    // sidebar: active module item (blue)
    { color: "blue", prims: [
      ["line", 165, 240, 180.5, 240],
    ] },
    // sidebar: module items (light)
    { color: "light", prims: [
      ["line", 165, 270, 180.5, 270],
      ["line", 165, 300, 180.5, 300],
      ["line", 165, 330, 180.5, 330],
      ["line", 165, 360, 180.5, 360],
    ] },
    // tiles: CRM (blue), HR (light), Finance (navy) — 3×3 dot blocks
    { color: "blue", only: "rest", prims: [
      ["line", 240, 240, 270.5, 240],
      ["line", 240, 255, 270.5, 255],
      ["line", 240, 270, 270.5, 270],
    ] },
    { color: "light", only: "rest", prims: [
      ["line", 300, 240, 330.5, 240],
      ["line", 300, 255, 330.5, 255],
      ["line", 300, 270, 330.5, 270],
    ] },
    { color: "navy", only: "rest", prims: [
      ["line", 360, 240, 390.5, 240],
      ["line", 360, 255, 390.5, 255],
      ["line", 360, 270, 390.5, 270],
    ] },
    // tiles (line state)
    { color: "blue", only: "hover", prims: [["rect", 240, 240, 30, 30, 6]] },
    { color: "light", only: "hover", prims: [["rect", 300, 240, 30, 30, 6]] },
    { color: "navy", only: "hover", prims: [["rect", 360, 240, 30, 30, 6]] },
    // chart: rising bars (light / blue alternating)
    { color: "light", prims: [
      ["line", 240, 375, 240, 359.5],
      ["line", 300, 375, 300, 329.5],
      ["line", 360, 375, 360, 299.5],
    ] },
    { color: "blue", prims: [
      ["line", 270, 375, 270, 344.5],
      ["line", 330, 375, 330, 314.5],
    ] },
    // chart: baseline
    { color: "navy", only: "rest", prims: [
      ["line", 225, 390, 375.5, 390],
    ] },
    { color: "navy", only: "hover", prims: [
      ["line", 228, 390, 375, 390],
    ] },
    // org chart: lead box (dots, corners dropped)
    { color: "blue", only: "rest", prims: [
      ["line", 525, 30, 585.5, 30],
      ["line", 525, 120, 585.5, 120],
      ["line", 510, 45, 510, 105.5],
      ["line", 600, 45, 600, 105.5],
    ] },
    // org chart: lead box (line state)
    { color: "blue", only: "hover", prims: [
      ["rect", 510, 30, 90, 90, 14],
    ] },
    // org chart: lead person (dots)
    { color: "navy", only: "rest", prims: [
      ["dot", 555, 60],
      ["line", 540, 90, 570.5, 90],
    ] },
    // org chart: lead person (line state)
    { color: "navy", only: "hover", prims: [
      ["circle", 555, 60, 4],
      ["arc", 555, 97.5, 15, 180, 360],
    ] },
    // org chart: connectors (dots)
    { color: "blue", only: "rest", prims: [
      ["dot", 555, 135],
      ["line", 495, 150, 615.5, 150],
      ["dot", 495, 165],
      ["dot", 615, 165],
    ] },
    // org chart: connectors (line state)
    { color: "blue", only: "hover", prims: [
      ["line", 555, 120, 555, 150],
      ["line", 495, 150, 615, 150],
      ["line", 495, 150, 495, 175],
      ["line", 615, 150, 615, 175],
    ] },
    // org chart: team heads
    { color: "navy", only: "rest", prims: [
      ["dot", 495, 195],
      ["dot", 615, 195],
    ] },
    { color: "navy", only: "hover", prims: [
      ["circle", 495, 195, 4],
      ["circle", 615, 195, 4],
    ] },
    // org chart: team shoulders (dots)
    { color: "blue", only: "rest", prims: [
      ["line", 480, 225, 510.5, 225],
      ["dot", 480, 240],
      ["dot", 510, 240],
    ] },
    { color: "light", only: "rest", prims: [
      ["line", 600, 225, 630.5, 225],
      ["dot", 600, 240],
      ["dot", 630, 240],
    ] },
    // org chart: team shoulders (line state)
    { color: "blue", only: "hover", prims: [
      ["arc", 495, 240, 15, 180, 360],
    ] },
    { color: "light", only: "hover", prims: [
      ["arc", 615, 240, 15, 180, 360],
    ] },
    // bubble: red pixel rows — solid fill with three typing dots cut out as holes on row 375
    { color: "red", only: "rest", prims: [
      ["line", 435, 330, 585.5, 330],
      ["line", 420, 345, 600.5, 345],
      ["line", 420, 360, 600.5, 360],
      ["line", 420, 375, 450.5, 375],
      ["line", 480, 375, 495.5, 375],
      ["line", 525, 375, 540.5, 375],
      ["line", 570, 375, 600.5, 375],
      ["line", 420, 390, 600.5, 390],
      ["line", 420, 405, 600.5, 405],
    ] },
    // bubble: dark red bottom row + tail
    { color: "darkred", only: "rest", prims: [
      ["line", 420, 420, 585.5, 420],
      ["line", 420, 435, 435.5, 435],
      ["dot", 420, 450],
    ] },
    // bubble: outline (line state)
    { color: "red", only: "hover", prims: [
      ["line", 450, 420, 585, 420],
      ["arc", 585, 405, 15, 0, 90],
      ["line", 600, 345, 600, 405],
      ["arc", 585, 345, 15, -90, 0],
      ["line", 435, 330, 585, 330],
      ["arc", 435, 345, 15, 180, 270],
      ["line", 420, 345, 420, 420],
    ] },
    // bubble: tail (line state)
    { color: "darkred", only: "hover", prims: [
      ["poly", [[420, 420], [420, 450], [450, 420]]],
    ] },
    // bubble: typing dots (line state) — traces the holes in the rest fill
    { color: "red", only: "hover", prims: [
      ["circle", 465, 375, 5],
      ["circle", 510, 375, 5],
      ["circle", 555, 375, 5],
    ] },
    // confetti: red
    { color: "red", prims: [
      ["dot", 108, 110],
      ["dot", 72, 140],
      ["dot", 611, 472],
      ["dot", 548, 508],
    ] },
    // confetti: dark red
    { color: "darkred", prims: [
      ["dot", 112, 70],
      ["dot", 158, 118],
      ["dot", 660, 460],
      ["dot", 590, 502],
    ] },
    // confetti: blue
    { color: "blue", prims: [
      ["dot", 158, 50],
      ["dot", 184, 92],
      ["dot", 88, 96],
      ["dot", 636, 488],
      ["dot", 572, 478],
      ["dot", 522, 496],
    ] },
    // confetti: light
    { color: "light", prims: [
      ["dot", 136, 76],
      ["dot", 100, 146],
      ["dot", 614, 500],
    ] },
  ],
};
