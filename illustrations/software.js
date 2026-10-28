/* Line-art element for the "software" card illustration — traced from assets/cards/software.png
   (720×540 frame). See illus.js for the primitive format.
   Monitor with "</>" on screen, a document window behind it (top-right), a gear in front of it
   (bottom-right) and confetti. Strokes sit on the centres of the picture's dot rows (pitch 15), so
   the REST dots land on the picture's dots; "rest" groups rebuild the dense (two-dot / filled)
   areas, "hover" groups close the clean thick-line icon. */
module.exports = {
  key: "software",
  dot: 11,     // REST dot diameter (frame px)
  pitch: 15,   // REST dot spacing along each stroke (frame px)
  groups: [
    // monitor: outer ring, top edge (blue part)
    { color: "blue", prims: [
      ["line", 157.15, 160.6, 247.65, 160.6],
    ] },
    // monitor: outer ring, top edge / right side / bottom edge (navy)
    { color: "navy", prims: [
      ["line", 260.9, 160.6, 456.4, 160.6],
      ["line", 470.1, 174.5, 470.1, 265],
      ["line", 156.5, 395.7, 412, 395.7],
    ] },
    // monitor: outer ring, left side dots
    { color: "blue", only: "rest", prims: [
      ["line", 142.7, 174.65, 142.7, 280.15],
      ["line", 142.6, 292.25, 142.6, 382.75],
    ] },
    // monitor: left side, cut corners, top-edge join (blue)
    { color: "blue", only: "hover", prims: [
      ["poly", [[156.5, 395.7], [142.7, 381.5], [142.7, 175.9], [157.15, 160.6]]],
      ["line", 247.65, 160.6, 254.6, 160.6],
    ] },
    // monitor: top-edge join + cut corner top-right (navy)
    { color: "navy", only: "hover", prims: [
      ["line", 254.6, 160.6, 260.9, 160.6],
      ["line", 456.4, 160.6, 470.1, 174.5],
    ] },
    // monitor: chin line dots
    { color: "navy", only: "rest", prims: [
      ["line", 156.75, 352.2, 382.25, 352.2],
    ] },
    // monitor: chin line
    { color: "navy", only: "hover", prims: [
      ["line", 142.7, 352.2, 381.3, 352.2],
    ] },
    // monitor: inner ring (blue part)
    { color: "blue", only: "rest", prims: [
      ["line", 157.2, 175.8, 217.7, 175.8],
      ["line", 157.6, 189.65, 157.6, 265.15],
      ["line", 157.6, 277.95, 157.6, 338.45],
    ] },
    // monitor: inner ring (navy part)
    { color: "navy", only: "rest", prims: [
      ["line", 230.95, 175.8, 456.45, 175.8],
      ["line", 455.2, 189.3, 455.2, 264.8],
    ] },
    // monitor: light band rows
    { color: "light", only: "rest", prims: [
      ["line", 156.7, 366.8, 382.2, 366.8],
      ["line", 156.55, 381.2, 397.05, 381.2],
    ] },
    // monitor: light band (line state)
    { color: "light", only: "hover", prims: [
      ["line", 160, 374, 388.6, 374],
    ] },
    // stand: base (top and bottom rows)
    { color: "navy", prims: [
      ["line", 246.45, 439.2, 366.95, 439.2],
      ["line", 216.4, 453.8, 396.9, 453.8],
    ] },
    // stand: neck block (two full rows of dots)
    { color: "navy", only: "rest", prims: [
      ["line", 276.5, 410.2, 337, 410.2],
      ["line", 276.5, 424.6, 337, 424.6],
    ] },
    // stand: neck sides
    { color: "navy", only: "hover", prims: [
      ["line", 276.9, 395.7, 276.9, 439.2],
      ["line", 336.6, 395.7, 336.6, 439.2],
    ] },
    // stand: base slanted ends
    { color: "navy", only: "hover", prims: [
      ["line", 246.45, 439.2, 216.4, 453.8],
      ["line", 366.95, 439.2, 396.9, 453.8],
    ] },
    // code: "<" and ">" pixels (the </> sits on a tighter ~13px grid than the pitch, so its dots are placed singly)
    { color: "red", only: "rest", prims: [
      ["dot", 236.1, 222.6],
      ["dot", 249.1, 222.6],
      ["dot", 223, 236.1],
      ["dot", 236.2, 236],
      ["dot", 209.7, 250],
      ["dot", 223.1, 249.9],
      ["dot", 196.6, 263.9],
      ["dot", 209.8, 263.9],
      ["dot", 209.7, 277.7],
      ["dot", 223.1, 277.7],
      ["dot", 223, 291.2],
      ["dot", 236.2, 291.2],
      ["dot", 236.1, 304.9],
      ["dot", 249.1, 304.8],
      ["dot", 356.6, 221.7],
      ["dot", 369.4, 221.7],
      ["dot", 368.3, 235.8],
      ["dot", 381.8, 235.8],
      ["dot", 381.6, 249.7],
      ["dot", 395, 249.9],
      ["dot", 394.8, 263.8],
      ["dot", 407.7, 263.8],
      ["dot", 381.5, 277.4],
      ["dot", 395, 277.5],
      ["dot", 367.8, 291.1],
      ["dot", 381.6, 291.1],
      ["dot", 354.6, 305.3],
      ["dot", 368, 305.2],
    ] },
    // code: "/" pixels
    { color: "navy", only: "rest", prims: [
      ["dot", 328.1, 209.1],
      ["dot", 314.9, 222.6],
      ["dot", 328.1, 222.5],
      ["dot", 314.8, 236],
      ["dot", 302, 249.8],
      ["dot", 314.9, 249.6],
      ["dot", 301.9, 263.9],
      ["dot", 289.3, 277.8],
      ["dot", 302.1, 277.6],
      ["dot", 289.4, 291.2],
      ["dot", 276.6, 305.1],
      ["dot", 289.5, 304.9],
      ["dot", 276.5, 318.5],
    ] },
    // code: "/" odd pixel (blue)
    { color: "blue", only: "rest", prims: [
      ["dot", 328.1, 235.9],
    ] },
    // code: "/" odd pixel (light)
    { color: "light", only: "rest", prims: [
      ["dot", 302, 236.1],
    ] },
    // code: "<" ">" strokes
    { color: "red", only: "hover", prims: [
      ["poly", [[242.6, 222.6], [203.2, 263.9], [242.6, 304.85]]],
      ["poly", [[363, 221.7], [401.25, 263.8], [361.3, 305.25]]],
    ] },
    // code: "/" stroke
    { color: "navy", only: "hover", prims: [
      ["line", 328.1, 209.1, 276.5, 318.5],
    ] },
    // window: outline
    { color: "blue", prims: [
      ["line", 427.9, 144.25, 427.9, 53.75],
      ["line", 428.1, 38.5, 608.6, 38.5],
      ["line", 623.9, 231.6, 503.4, 231.6],
    ] },
    // window: right side dots
    { color: "blue", only: "rest", prims: [
      ["line", 624, 53.75, 624, 144.25],
      ["line", 624, 158.1, 624, 218.6],
    ] },
    // window: right side
    { color: "blue", only: "hover", prims: [
      ["line", 624, 53.8, 624, 231.6],
    ] },
    // window: top bar second row
    { color: "blue", only: "rest", prims: [
      ["line", 443.3, 53.8, 608.8, 53.8],
    ] },
    // window: top-left corner + cut corner top-right
    { color: "blue", only: "hover", prims: [
      ["line", 427.9, 53.75, 428.1, 38.5],
      ["line", 608.6, 38.5, 624, 53.8],
    ] },
    // window: margin line
    { color: "blue", only: "rest", prims: [
      ["line", 461.3, 87.15, 461.3, 132.65],
    ] },
    // window: margin line end
    { color: "light", only: "rest", prims: [
      ["dot", 461.3, 147.9],
    ] },
    // window: margin line (line state)
    { color: "blue", only: "hover", prims: [
      ["line", 461.3, 87, 461.3, 147.9],
    ] },
    // window text: red
    { color: "red", only: "rest", prims: [
      ["line", 487.85, 87.1, 503.35, 87.1],
      ["line", 487.65, 102.2, 518.15, 102.2],
      ["line", 488, 132.8, 503.5, 132.8],
      ["line", 503.05, 178.5, 518.55, 178.5],
      ["line", 503.15, 193.7, 533.65, 193.7],
    ] },
    // window text: dark red
    { color: "darkred", only: "rest", prims: [
      ["line", 517.2, 87.1, 532.7, 87.1],
      ["dot", 532.2, 102.2],
      ["line", 517.8, 132.8, 548.3, 132.8],
      ["dot", 503.2, 147.8],
      ["line", 547.65, 147.8, 563.15, 147.8],
      ["line", 533.1, 178.5, 548.6, 178.5],
      ["dot", 548.3, 193.7],
    ] },
    // window text: light
    { color: "light", only: "rest", prims: [
      ["line", 546.8, 102.2, 592.3, 102.2],
      ["dot", 488.2, 147.9],
    ] },
    // window text: navy
    { color: "navy", only: "rest", prims: [
      ["dot", 562.6, 132.8],
      ["line", 517.85, 147.9, 533.35, 147.9],
      ["line", 562.6, 193.7, 593.1, 193.7],
    ] },
    // window text: blue
    { color: "blue", only: "rest", prims: [
      ["line", 577.05, 147.9, 592.55, 147.9],
    ] },
    // window text lines: red
    { color: "red", only: "hover", prims: [
      ["line", 488.2, 87.1, 510.3, 87.1],
      ["line", 488.2, 102.2, 524.9, 102.2],
      ["line", 488.2, 132.8, 510.7, 132.8],
      ["line", 503.4, 178.5, 525.75, 178.5],
      ["line", 503.4, 193.7, 540.85, 193.7],
    ] },
    // window text lines: dark red (colour runs shorter than ~10px are merged into their neighbour,
    // so every hover line has at most 3 colours and no end-cap stubs)
    { color: "darkred", only: "hover", prims: [
      ["line", 510.3, 87.1, 532.3, 87.1],
      ["line", 524.9, 102.2, 539.85, 102.2],
      ["line", 510.7, 132.8, 562.6, 132.8],
      ["line", 488.2, 147.8, 510.65, 147.8],
      ["line", 540.55, 147.8, 570.15, 147.8],
      ["line", 525.75, 178.5, 548.4, 178.5],
      ["line", 540.85, 193.7, 555.65, 193.7],
    ] },
    // window text lines: light
    { color: "light", only: "hover", prims: [
      ["line", 539.85, 102.2, 591.6, 102.2],
    ] },
    // window text lines: navy
    { color: "navy", only: "hover", prims: [
      ["line", 510.65, 147.8, 540.55, 147.8],
      ["line", 555.65, 193.7, 592.7, 193.7],
    ] },
    // window text lines: blue
    { color: "blue", only: "hover", prims: [
      ["line", 570.15, 147.8, 592.1, 147.8],
    ] },
    // gear: red pixel rows (left side of the gear)
    { color: "red", only: "rest", prims: [
      ["line", 454.85, 276, 470.35, 276],
      ["line", 440.05, 290.7, 470.55, 290.6],
      ["line", 425.15, 305.6, 455.65, 305.6],
      ["line", 440.1, 320.6, 455.6, 320.6],
      ["line", 410.43, 337.43, 440.87, 335.57],
      ["line", 410.47, 351.92, 440.93, 350.48],
      ["line", 410.46, 366.52, 440.94, 365.38],
      ["dot", 440.4, 380.3],
      ["line", 425.3, 395.71, 440.8, 395.19],
      ["line", 425.35, 410.1, 440.85, 410.1],
    ] },
    // gear: dark red pixel rows (row y 350 includes the odd tan pixel by the hole, 470,350)
    { color: "darkred", only: "rest", prims: [
      ["line", 503.1, 260.8, 518.6, 260.8],
      ["line", 501.5, 275.7, 517, 275.8],
      ["dot", 548.1, 275.7],
      ["line", 485.8, 290.5, 516.3, 290.5],
      ["line", 531.85, 290.5, 577.35, 290.7],
      ["line", 470.6, 305.6, 516.1, 305.6],
      ["line", 531.35, 305.6, 591.85, 305.6],
      ["line", 470.05, 320.5, 485.55, 320.5],
      ["line", 531.75, 320.5, 577.25, 320.5],
      ["line", 454.85, 335.4, 470.35, 335.4],
      ["line", 546.3, 335.39, 606.8, 335.81],
      ["line", 454.95, 350.4, 470.45, 350.5],
      ["line", 546.35, 350.4, 606.85, 350.4],
      ["line", 454.9, 365.3, 470.4, 365.3],
      ["line", 546.3, 365.2, 606.8, 365.3],
      ["line", 455, 380.1, 485.5, 380.1],
      ["line", 531.85, 380, 577.35, 380.1],
      ["line", 455.3, 395, 500.8, 394.8],
      ["line", 516.05, 394.8, 591.55, 394.9],
      ["line", 455.4, 410, 500.9, 409.8],
      ["line", 516.4, 409.8, 576.9, 409.7],
      ["line", 440, 424.4, 470.5, 424.4],
      ["line", 486.85, 424.1, 517.35, 424.2],
      ["line", 547.3, 424.1, 562.8, 424.1],
      ["dot", 455.1, 438.8],
      ["line", 486.95, 437.9, 517.45, 437.9],
    ] },
    // gear outline (line state): left side red, like the picture. The picture's dotted gear is 14 columns
    // wide by 13 rows tall, so the outline is about 9% wider than tall: the side tooth tips land on the
    // outermost dot columns (x 410.5 / 606.9) and the top and bottom tips land on the dot rows (260.5 / 440.3)
    { color: "red", only: "hover", prims: [
      ["poly", [[433.2,408.42], [428.46,404.08], [441.2,385.34], [437.06,377.57], [434,369.4], [410.51,364.4], [410.51,336.4], [434,331.4], [437.06,323.23], [441.2,315.46], [428.46,296.72], [450.08,276.92], [470.55,288.59], [479.03,284.8]]],
    ] },
    // gear outline (line state): dark red, plus the hole
    { color: "darkred", only: "hover", prims: [
      ["poly", [[479.03,284.8], [487.95,281.99], [493.41,260.48], [523.99,260.48], [529.45,281.99], [538.37,284.8], [546.85,288.59], [567.32,276.92], [588.94,296.72], [576.2,315.46], [580.34,323.23], [583.4,331.4], [606.89,336.4], [606.89,364.4], [583.4,369.4], [580.34,377.57], [576.2,385.34], [588.94,404.08], [567.32,423.88], [546.85,412.21], [538.37,416], [529.45,418.81], [523.99,440.32], [493.41,440.32], [487.95,418.81], [479.03,416], [470.55,412.21], [450.08,423.88], [433.2,408.42]]],
      ["circle", 508.7, 350.4, 38],
    ] },
    // confetti: red
    { color: "red", prims: [
      ["dot", 121.9, 115.9],
      ["dot", 80.6, 137.6],
      ["dot", 578.5, 463.9],
      ["dot", 562.6, 501.9],
    ] },
    // confetti: dark red
    { color: "darkred", prims: [
      ["dot", 121.7, 73.3],
      ["dot", 160.2, 99],
      ["dot", 639.6, 449.6],
      ["dot", 596.3, 485],
    ] },
    // confetti: blue
    { color: "blue", prims: [
      ["dot", 164.9, 49.5],
      ["dot", 186.1, 99.1],
      ["dot", 101, 102.9],
      ["dot", 612.4, 449.6],
      ["dot", 559.1, 475.4],
      ["dot", 537.2, 489.2],
    ] },
    // confetti: light
    { color: "light", prims: [
      ["dot", 141.9, 73.3],
      ["dot", 110.4, 137.7],
      ["dot", 604.7, 468.8],
    ] },
  ],
};
