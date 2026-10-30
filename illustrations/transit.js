/* Line-art element for the "transit" card (Automated Fare Collection System) — an original design in the
   same visual language as the Figma illustrations (see illustrations/software.js, event.js, mobile.js).
   720×540 frame. See illus.js for the primitive format.
   An entry FARE GATE is the navy hero: two tall cabinets (double bezel at rest, light top bands, cut
   corners) with light flap barriers meeting in the aisle; the left cabinet shows a blue "go" arrow, the
   right one a blue QR scanner (corner brackets) with a red scan line. A blue ROPEWAY CABLE CAR (light window band split by
   a navy mullion, double floor) hangs from a diagonal cable by a navy grip behind it (top-right); a red PHONE (double bezel at rest) showing a QR ticket — navy
   finder squares, dark-red data modules — sits in front of the right cabinet (bottom-right), ready to be
   scanned; confetti top-left and bottom-right.
   Content spans x 105–660, y 30–450, in line with the event and mobile elements.
   Strokes sit on a 15px lattice (pitch 15), so REST dots line up in rows; "rest" groups rebuild filled
   areas as dot rows, "hover" groups close the clean thick-line icon. Where the right cabinet passes behind
   the phone, rest dots stop one empty step short and hover strokes stop ~20px short of the phone. */
module.exports = {
  key: "transit",
  dot: 11,     // REST dot diameter (frame px) — same as the other What We Do elements
  pitch: 15,   // REST dot spacing along each stroke (frame px)
  groups: [
    // cable: diagonal haul rope (dots stop either side of the grip)
    { color: "blue", only: "rest", prims: [
      ["line", 345, 30, 555.5, 72],
      ["line", 585, 78, 660.5, 93],
    ] },
    // cable (line state)
    { color: "blue", only: "hover", prims: [
      ["line", 345, 30, 660, 93],
    ] },
    // cable car: grip + roof mount (dots)
    { color: "navy", only: "rest", prims: [
      ["dot", 570, 75],
      ["line", 555, 90, 585.5, 90],
    ] },
    // cable car: grip, hanger + roof mount (line state)
    { color: "navy", only: "hover", prims: [
      ["circle", 570, 75, 4],
      ["line", 570, 79, 570, 90],
      ["line", 553, 90, 587, 90],
    ] },
    // cable car: cabin outline (dots; corners cut)
    { color: "blue", only: "rest", prims: [
      ["line", 525, 105, 615.5, 105],
      ["line", 630, 120, 630, 210.5],
      ["line", 525, 225, 615.5, 225],
      ["line", 510, 120, 510, 210.5],
    ] },
    // cable car: cabin floor (second row)
    { color: "blue", only: "rest", prims: [
      ["line", 525, 210, 615.5, 210],
    ] },
    // cable car: cabin outline + floor (line state)
    { color: "blue", only: "hover", prims: [
      ["rect", 510, 105, 120, 120, 15],
      ["line", 513, 207, 627, 207],
    ] },
    // cable car: window band (light rows, split by a navy mullion)
    { color: "light", only: "rest", prims: [
      ["line", 525, 135, 555.5, 135],
      ["line", 525, 150, 555.5, 150],
      ["line", 585, 135, 615.5, 135],
      ["line", 585, 150, 615.5, 150],
      ["line", 525, 165, 555.5, 165],
      ["line", 585, 165, 615.5, 165],
    ] },
    { color: "navy", only: "rest", prims: [
      ["dot", 570, 135],
      ["dot", 570, 150],
      ["dot", 570, 165],
    ] },
    // cable car: windows (line state)
    { color: "light", only: "hover", prims: [
      ["rect", 523, 130, 37, 40, 5],
      ["rect", 580, 130, 37, 40, 5],
    ] },
    // left cabinet: outline (dots; corners cut)
    { color: "navy", only: "rest", prims: [
      ["line", 120, 165, 210.5, 165],
      ["line", 225, 180, 225, 420.5],
      ["line", 120, 435, 210.5, 435],
      ["line", 105, 180, 105, 420.5],
    ] },
    // left cabinet: outline (line state)
    { color: "navy", only: "hover", prims: [
      ["polygon", [[120, 165], [210, 165], [225, 180], [225, 420], [210, 435], [120, 435], [105, 420], [105, 180]]],
    ] },
    // right cabinet: outline (dots; right side and bottom stop one empty step clear of the phone)
    { color: "navy", only: "rest", prims: [
      ["line", 360, 165, 450.5, 165],
      ["line", 465, 180, 465, 240.5],
      ["line", 360, 435, 435.5, 435],
      ["line", 345, 180, 345, 420.5],
    ] },
    // right cabinet: outline (line state; stops ~20px clear of the phone)
    { color: "navy", only: "hover", prims: [
      ["poly", [[465, 250], [465, 180], [450, 165], [360, 165], [345, 180], [345, 420], [360, 435], [445, 435]]],
    ] },
    // cabinets: inner ring (double bezel, blue like the calendar's left side in event.js)
    { color: "blue", only: "rest", prims: [
      ["line", 120, 225, 120, 420.5],
      ["line", 135, 420, 195.5, 420],
      ["line", 210, 225, 210, 420.5],
      ["line", 360, 225, 360, 420.5],
      ["line", 375, 420, 435.5, 420],
      ["line", 450, 225, 450, 240.5],
    ] },
    // cabinets: top band rows (light)
    { color: "light", only: "rest", prims: [
      ["line", 120, 180, 210.5, 180],
      ["line", 120, 195, 210.5, 195],
      ["line", 360, 180, 450.5, 180],
      ["line", 360, 195, 450.5, 195],
    ] },
    // cabinets: top band (line state)
    { color: "light", only: "hover", prims: [
      ["line", 123, 187.5, 207, 187.5],
      ["line", 363, 187.5, 447, 187.5],
    ] },
    // cabinets: band separators (dots)
    { color: "navy", only: "rest", prims: [
      ["line", 120, 210, 210.5, 210],
      ["line", 360, 210, 450.5, 210],
    ] },
    // cabinets: band separators (line state)
    { color: "navy", only: "hover", prims: [
      ["line", 105, 210, 225, 210],
      ["line", 345, 210, 465, 210],
    ] },
    // cabinets: ticket / token slots
    { color: "navy", prims: [
      ["line", 150, 375, 180.5, 375],
      ["line", 390, 375, 420.5, 375],
    ] },
    // left cabinet: "go" arrow (dots)
    { color: "blue", only: "rest", prims: [
      ["line", 135, 270, 180.5, 270],
      ["dot", 150, 240],
      ["dot", 165, 255],
      ["dot", 165, 285],
      ["dot", 150, 300],
    ] },
    // left cabinet: "go" arrow (line state)
    { color: "blue", only: "hover", prims: [
      ["line", 135, 270, 180, 270],
      ["poly", [[150, 239], [181, 270], [150, 301]]],
    ] },
    // right cabinet: QR scanner corner brackets (dots)
    { color: "blue", only: "rest", prims: [
      ["dot", 375, 255], ["dot", 390, 255], ["dot", 375, 270],
      ["dot", 420, 255], ["dot", 435, 255], ["dot", 435, 270],
      ["dot", 375, 300], ["dot", 375, 315], ["dot", 390, 315],
      ["dot", 435, 300], ["dot", 435, 315], ["dot", 420, 315],
    ] },
    // right cabinet: QR scanner corner brackets (line state)
    { color: "blue", only: "hover", prims: [
      ["poly", [[375, 272], [375, 255], [392, 255]]],
      ["poly", [[418, 255], [435, 255], [435, 272]]],
      ["poly", [[375, 298], [375, 315], [392, 315]]],
      ["poly", [[418, 315], [435, 315], [435, 298]]],
    ] },
    // right cabinet: scan line
    { color: "red", only: "rest", prims: [
      ["line", 375, 285, 435.5, 285],
    ] },
    { color: "red", only: "hover", prims: [
      ["line", 368, 285, 442, 285],
    ] },
    // flaps: barrier fill rows (light) — left and right flaps meet across one empty step
    { color: "light", only: "rest", prims: [
      ["line", 240, 285, 255.5, 285],
      ["line", 240, 300, 270.5, 300],
      ["line", 240, 315, 270.5, 315],
      ["line", 240, 330, 255.5, 330],
      ["line", 315, 285, 330.5, 285],
      ["line", 300, 300, 330.5, 300],
      ["line", 300, 315, 330.5, 315],
      ["line", 315, 330, 330.5, 330],
    ] },
    // flaps (line state) — rounded tips towards the aisle
    { color: "light", only: "hover", prims: [
      ["line", 228, 285.5, 257, 285.5],
      ["arc", 257, 307.5, 22, -90, 90],
      ["line", 257, 329.5, 228, 329.5],
      ["line", 342, 285.5, 313, 285.5],
      ["arc", 313, 307.5, 22, 270, 90],
      ["line", 313, 329.5, 342, 329.5],
    ] },
    // phone: outer ring (dots; corners cut)
    { color: "red", only: "rest", prims: [
      ["line", 480, 270, 600.5, 270],
      ["line", 615, 285, 615, 435.5],
      ["line", 480, 450, 600.5, 450],
      ["line", 465, 285, 465, 435.5],
    ] },
    // phone: inner ring (double bezel; speaker and home indicator gaps in dark red)
    { color: "red", only: "rest", prims: [
      ["line", 480, 285, 510.5, 285],
      ["line", 570, 285, 600.5, 285],
      ["line", 480, 300, 480, 420.5],
      ["line", 600, 300, 600, 420.5],
      ["line", 480, 435, 510.5, 435],
      ["line", 570, 435, 600.5, 435],
    ] },
    { color: "darkred", only: "rest", prims: [
      ["line", 525, 285, 555.5, 285],
      ["line", 525, 435, 555.5, 435],
    ] },
    // phone: outline, speaker + home indicator (line state)
    { color: "red", only: "hover", prims: [
      ["rect", 465, 270, 150, 180, 18],
    ] },
    { color: "darkred", only: "hover", prims: [
      ["line", 525, 289, 555, 289],
      ["line", 525, 431, 555, 431],
    ] },
    // phone: "ticket valid" line under the code
    { color: "darkred", prims: [
      ["line", 510, 405, 570.5, 405],
    ] },
    // QR: finder patterns (2×2 dots)
    { color: "navy", only: "rest", prims: [
      ["line", 510, 315, 525.5, 315],
      ["line", 510, 330, 525.5, 330],
      ["line", 555, 315, 570.5, 315],
      ["line", 555, 330, 570.5, 330],
      ["line", 510, 360, 525.5, 360],
      ["line", 510, 375, 525.5, 375],
    ] },
    // QR: finder patterns (line state)
    { color: "navy", only: "hover", prims: [
      ["rect", 508.5, 313.5, 18, 18, 4],
      ["rect", 553.5, 313.5, 18, 18, 4],
      ["rect", 508.5, 358.5, 18, 18, 4],
    ] },
    // QR: data modules (dots)
    { color: "darkred", only: "rest", prims: [
      ["dot", 540, 345], ["dot", 570, 345], ["dot", 555, 360], ["dot", 540, 375], ["dot", 570, 375],
    ] },
    // QR: data modules (line state)
    { color: "darkred", only: "hover", prims: [
      ["circle", 540, 345, 3.5], ["circle", 570, 345, 3.5], ["circle", 555, 360, 3.5],
      ["circle", 540, 375, 3.5], ["circle", 570, 375, 3.5],
    ] },
    // confetti: red
    { color: "red", prims: [
      ["dot", 108, 110],
      ["dot", 72, 130],
      ["dot", 646, 472],
      ["dot", 612, 504],
    ] },
    // confetti: dark red
    { color: "darkred", prims: [
      ["dot", 152, 64],
      ["dot", 186, 112],
      ["dot", 664, 430],
      ["dot", 584, 488],
    ] },
    // confetti: blue
    { color: "blue", prims: [
      ["dot", 214, 70],
      ["dot", 140, 134],
      ["dot", 90, 92],
      ["dot", 650, 446],
      ["dot", 636, 500],
    ] },
    // confetti: light
    { color: "light", prims: [
      ["dot", 130, 88],
      ["dot", 98, 150],
      ["dot", 668, 470],
    ] },
  ],
};
