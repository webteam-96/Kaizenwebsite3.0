/* Line-art element for the "mobile" card in What We Do — an original design in
   the same visual language as the Figma illustrations (see illustrations/software.js).
   720×540 frame. See illus.js for the primitive format.
   Mobile App Development: a tall navy smartphone (the hero — double bezel at rest, speaker slot,
   side button, home indicator) whose screen shows an app UI (light header bar and a 3×3 grid of red / light / blue
   app icons); a blue-outlined code panel with a chunky two-dot "</>" and code lines, tucked behind it (top-right);
   a red filled build gear (round, 8 notched teeth, 12 dots across) in front of the phone's bottom-left corner,
   hiding the bottom-left app icon; confetti top-left and bottom-right.
   Content spans x 110–635, y 45–450 (centre ≈ 373,248), in line with the software and event elements.
   Strokes sit on a 15px lattice (pitch 15), so REST dots line up in rows like the Figma pictures;
   "rest" groups rebuild dense / filled areas, "hover" groups close the clean thick-line icon.
   Where the phone passes behind the gear, rest dots stop one empty 15px step short of the gear's dots and
   hover strokes stop ~20px short of its outline, like the monitor behind the gear in software.js. */
module.exports = {
  key: "mobile",
  dot: 11,     // REST dot diameter (frame px) — same as software for a cohesive row
  pitch: 15,   // REST dot spacing along each stroke (frame px)
  groups: [
    // code panel: top + bottom edges, right side (dots)
    { color: "blue", only: "rest", prims: [
      ["line", 455, 90, 620, 90],
      ["line", 635, 105, 635, 285],
      ["line", 635, 300, 455, 300],
    ] },
    // code panel: title bar second row
    { color: "blue", only: "rest", prims: [
      ["line", 455, 105, 620, 105],
    ] },
    // code panel: outline (top and bottom edges stop short of the phone, so the panel reads as behind it; cut corner top-right)
    { color: "blue", only: "hover", prims: [
      ["poly", [[455, 90], [620, 90], [635, 105], [635, 300], [455, 300]]],
    ] },
    // code: "<" and ">" pixels (two dots thick, tapered tips; the </> sits on a 13px column grid like software's)
    { color: "red", only: "rest", prims: [
      ["dot", 501, 150],
      ["dot", 488, 165],
      ["dot", 501, 165],
      ["dot", 475, 180],
      ["dot", 488, 180],
      ["dot", 488, 195],
      ["dot", 501, 195],
      ["dot", 501, 210],
      ["dot", 579, 150],
      ["dot", 579, 165],
      ["dot", 592, 165],
      ["dot", 592, 180],
      ["dot", 605, 180],
      ["dot", 579, 195],
      ["dot", 592, 195],
      ["dot", 579, 210],
    ] },
    // code: "/" pixels
    { color: "navy", only: "rest", prims: [
      ["dot", 553, 150],
      ["dot", 540, 165],
      ["dot", 553, 165],
      ["dot", 540, 180],
      ["dot", 527, 195],
      ["dot", 540, 195],
      ["dot", 527, 210],
    ] },
    // code: "<" ">" strokes
    { color: "red", only: "hover", prims: [
      ["poly", [[503, 150], [479, 180], [503, 210]]],
      ["poly", [[577, 150], [601, 180], [577, 210]]],
    ] },
    // code: "/" stroke
    { color: "navy", only: "hover", prims: [
      ["line", 553, 150, 527, 210],
    ] },
    // code lines: red
    { color: "red", prims: [
      ["line", 470, 240, 500, 240],
    ] },
    // code lines: light
    { color: "light", prims: [
      ["line", 530, 240, 605, 240],
    ] },
    // code lines: navy
    { color: "navy", prims: [
      ["line", 485, 270, 530, 270],
    ] },
    // code lines: darkred
    { color: "darkred", prims: [
      ["line", 560, 270, 605, 270],
    ] },
    // phone: outer ring, top edge + right edge
    { color: "navy", prims: [
      ["line", 230, 45, 410, 45],
      ["line", 440, 75, 440, 420],
    ] },
    // phone: outer ring, bottom edge dots (start one empty step clear of the gear)
    { color: "navy", only: "rest", prims: [
      ["line", 275, 450, 410, 450],
    ] },
    // phone: outer ring, left edge dots (stop one empty step above the gear's top tooth)
    { color: "navy", only: "rest", prims: [
      ["line", 200, 75, 200, 255],
    ] },
    // phone: rounded corners (two dots each; the bottom-left corner is behind the gear)
    { color: "navy", only: "rest", prims: [
      ["dot", 204.02, 60],
      ["dot", 215, 49.02],
      ["dot", 425, 49.02],
      ["dot", 435.98, 60],
      ["dot", 435.98, 435],
      ["dot", 425, 445.98],
    ] },
    // phone: left edge, bottom edge + rounded corners (line state; stops ~20px clear of the gear)
    { color: "navy", only: "hover", prims: [
      ["line", 200, 265, 200, 75],
      ["arc", 230, 75, 30, 180, 270],
      ["arc", 410, 75, 30, 270, 360],
      ["arc", 410, 420, 30, 0, 90],
      ["line", 410, 450, 260, 450],
    ] },
    // phone: inner ring (double bezel)
    { color: "navy", only: "rest", prims: [
      ["line", 230, 60, 410, 60],
      ["line", 290, 435, 410, 435],
      ["line", 215, 75, 215, 105],
      ["line", 215, 165, 215, 255],
      ["line", 425, 75, 425, 105],
      ["line", 425, 165, 425, 360],
      ["line", 425, 390, 425, 420],
    ] },
    // phone: screen top + bottom edges (dots)
    { color: "navy", only: "rest", prims: [
      ["line", 215, 120, 425, 120],
      ["line", 305, 375, 425, 375],
    ] },
    // phone: screen top + bottom edges
    { color: "navy", only: "hover", prims: [
      ["line", 200, 120, 440, 120],
      ["line", 295, 375, 440, 375],
    ] },
    // phone: speaker slot + home indicator
    { color: "navy", prims: [
      ["line", 290, 90, 350, 90],
      ["line", 290, 405, 350, 405],
    ] },
    // phone: side button (dots)
    { color: "navy", only: "rest", prims: [
      ["line", 185, 135, 185, 165],
    ] },
    // phone: side button
    { color: "navy", only: "hover", prims: [
      ["line", 189, 135, 189, 165],
    ] },
    // app: header bar rows (light band)
    { color: "light", only: "rest", prims: [
      ["line", 215, 135, 425, 135],
      ["line", 215, 150, 425, 150],
    ] },
    // app: header bar (line state)
    { color: "light", only: "hover", prims: [
      ["line", 220, 142.5, 420, 142.5],
    ] },
    // app: red tiles (3×3 dot blocks)
    { color: "red", only: "rest", prims: [
      ["line", 245, 180, 275, 180],
      ["line", 245, 195, 275, 195],
      ["line", 245, 210, 275, 210],
      ["line", 365, 240, 395, 240],
      ["line", 365, 255, 395, 255],
      ["line", 365, 270, 395, 270],
      ["line", 305, 300, 335, 300],
      ["line", 305, 315, 335, 315],
      ["line", 305, 330, 335, 330],
    ] },
    // app: red tiles
    { color: "red", only: "hover", prims: [
      ["rect", 245, 180, 30, 30, 6],
      ["rect", 365, 240, 30, 30, 6],
      ["rect", 305, 300, 30, 30, 6],
    ] },
    // app: light tiles (3×3 dot blocks)
    { color: "light", only: "rest", prims: [
      ["line", 305, 180, 335, 180],
      ["line", 305, 195, 335, 195],
      ["line", 305, 210, 335, 210],
      ["line", 245, 240, 275, 240],
      ["line", 245, 255, 275, 255],
      ["line", 245, 270, 275, 270],
      ["line", 365, 300, 395, 300],
      ["line", 365, 315, 395, 315],
      ["line", 365, 330, 395, 330],
    ] },
    // app: light tiles
    { color: "light", only: "hover", prims: [
      ["rect", 305, 180, 30, 30, 6],
      ["rect", 245, 240, 30, 30, 6],
      ["rect", 365, 300, 30, 30, 6],
    ] },
    // app: blue tiles (3×3 dot blocks; the bottom-left icon is hidden behind the gear)
    { color: "blue", only: "rest", prims: [
      ["line", 365, 180, 395, 180],
      ["line", 365, 195, 395, 195],
      ["line", 365, 210, 395, 210],
      ["line", 305, 240, 335, 240],
      ["line", 305, 255, 335, 255],
      ["line", 305, 270, 335, 270],
    ] },
    // app: blue tiles
    { color: "blue", only: "hover", prims: [
      ["rect", 365, 180, 30, 30, 6],
      ["rect", 305, 240, 30, 30, 6],
    ] },
    // gear: red pixel rows (left rim: left tooth + the two left diagonal teeth, like the software gear)
    { color: "red", only: "rest", prims: [
      ["line", 140, 300, 155, 300],
      ["line", 125, 315, 140, 315],
      ["line", 125, 330, 140, 330],
      ["dot", 140, 345],
      ["line", 110, 360, 140, 360],
      ["line", 110, 375, 140, 375],
      ["dot", 140, 390],
      ["line", 125, 405, 140, 405],
      ["line", 125, 420, 140, 420],
      ["line", 140, 435, 155, 435],
    ] },
    // gear: dark red pixel rows (12×12 dots: round body, 8 teeth with a notch between each, round hole)
    { color: "darkred", only: "rest", prims: [
      ["line", 185, 285, 200, 285],
      ["line", 185, 300, 200, 300],
      ["line", 230, 300, 245, 300],
      ["line", 155, 315, 260, 315],
      ["line", 155, 330, 260, 330],
      ["line", 155, 345, 170, 345],
      ["line", 215, 345, 245, 345],
      ["dot", 155, 360],
      ["line", 230, 360, 275, 360],
      ["dot", 155, 375],
      ["line", 230, 375, 275, 375],
      ["line", 155, 390, 170, 390],
      ["line", 215, 390, 245, 390],
      ["line", 155, 405, 260, 405],
      ["line", 155, 420, 260, 420],
      ["line", 185, 435, 200, 435],
      ["line", 230, 435, 245, 435],
      ["line", 185, 450, 200, 450],
    ] },
    // gear outline (line state): left side red, like the software gear; tooth tips land on the outermost dots
    { color: "red", only: "hover", prims: [
      ["poly", [[124.97, 416.64], [134.37, 398.76], [131.52, 392.76], [129.29, 386.5], [110, 380.5], [110, 354.5], [129.29, 348.5], [131.52, 342.24], [134.37, 336.24], [124.97, 318.36], [143.36, 299.97], [161.24, 309.37], [167.24, 306.52]]],
    ] },
    // gear outline (line state): dark red, plus the hole
    { color: "darkred", only: "hover", prims: [
      ["poly", [[167.24, 306.52], [173.5, 304.29], [179.5, 285], [205.5, 285], [211.5, 304.29], [217.76, 306.52], [223.76, 309.37], [241.64, 299.97], [260.03, 318.36], [250.63, 336.24], [253.48, 342.24], [255.71, 348.5], [275, 354.5], [275, 380.5], [255.71, 386.5], [253.48, 392.76], [250.63, 398.76], [260.03, 416.64], [241.64, 435.03], [223.76, 425.63], [217.76, 428.48], [211.5, 430.71], [205.5, 450], [179.5, 450], [173.5, 430.71], [167.24, 428.48], [161.24, 425.63], [143.36, 435.03], [124.97, 416.64]]],
      ["circle", 192.5, 367.5, 32],
    ] },
    // confetti: red
    { color: "red", prims: [
      ["dot", 105, 78],
      ["dot", 75, 150],
      ["dot", 623, 452],
      ["dot", 553, 466],
    ] },
    // confetti: darkred
    { color: "darkred", prims: [
      ["dot", 133, 62],
      ["dot", 83, 100],
      ["dot", 645, 426],
      ["dot", 601, 496],
    ] },
    // confetti: blue
    { color: "blue", prims: [
      ["dot", 165, 48],
      ["dot", 125, 104],
      ["dot", 143, 136],
      ["dot", 615, 418],
      ["dot", 579, 476],
      ["dot", 517, 478],
    ] },
    // confetti: light
    { color: "light", prims: [
      ["dot", 159, 88],
      ["dot", 99, 128],
      ["dot", 595, 438],
      ["dot", 537, 496],
    ] },
  ],
};
