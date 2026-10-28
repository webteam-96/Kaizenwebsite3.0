/* Line-art element for the "hardware" card (Blog / Engineering) — traced from its Figma illustration
   assets/cards/hardware.png (720×540 frame). See illus.js for the primitive format.
   A monitor (double-row bezel, neck, rounded base) showing a circuit chip with traces ending in round
   nodes, a gear behind the monitor (blue ring + red arc inside), a PC tower at the right (drive bays,
   three buttons, power ring), an open-end wrench crossed by a screwdriver over the lower right, and
   confetti. The picture's finer dot grid is re-traced on the shared 15px rhythm; "rest" groups rebuild
   its dense / double-row areas, "hover" groups draw the clean thick-line icon. */
module.exports = {
  key: "hardware",
  dot: 11,     // REST dot diameter (frame px) — shared by every card element
  pitch: 15,   // REST dot spacing along each stroke (frame px)
  groups: [
    // gear: tooth pixels — corners of every tooth + tip centre (its lower part is hidden behind the monitor)
    { color: "light", only: "rest", prims: [
      ["dot", 269.4, 175.5],
      ["dot", 267.5, 169.5],
      ["dot", 245.2, 165.3],
      ["dot", 244, 149.5],
      ["dot", 245.2, 133.7],
      ["dot", 267.5, 129.5],
      ["dot", 276.1, 108.9],
      ["dot", 263.3, 90.1],
      ["dot", 273.6, 78.1],
      ["dot", 285.6, 67.8],
      ["dot", 304.4, 80.6],
      ["dot", 325, 72],
      ["dot", 329.2, 49.7],
      ["dot", 345, 48.5],
      ["dot", 360.8, 49.7],
      ["dot", 365, 72],
      ["dot", 385.6, 80.6],
      ["dot", 404.4, 67.8],
      ["dot", 416.4, 78.1],
      ["dot", 426.7, 90.1],
      ["dot", 413.9, 108.9],
      ["dot", 422.5, 129.5],
      ["dot", 444.8, 133.7],
      ["dot", 446, 149.5],
      ["dot", 444.8, 165.3],
      ["dot", 422.5, 169.5],
      ["dot", 419.2, 179.5],
      ["dot", 425.5, 189.7],
      ["dot", 430.7, 201],
    ] },
    // gear: toothed outline (its lower part is hidden behind the monitor)
    { color: "light", only: "hover", prims: [
      ["poly", [[269.4, 175.5], [267.5, 169.5], [245.2, 165.3], [245.2, 133.7], [267.5, 129.5], [276.1, 108.9], [263.3, 90.1], [285.6, 67.8], [304.4, 80.6], [325, 72], [329.2, 49.7], [360.8, 49.7], [365, 72], [385.6, 80.6], [404.4, 67.8], [426.7, 90.1], [413.9, 108.9], [422.5, 129.5], [444.8, 133.7], [444.8, 165.3], [422.5, 169.5], [419.2, 179.5], [430.7, 201]]],
    ] },
    // gear: inner ring
    { color: "blue", prims: [
      ["arc", 345, 149.5, 56, 154.9, 385.1],
    ] },
    // gear: red arc inside the ring
    { color: "red", prims: [
      ["arc", 345, 149.5, 37.5, 155.5, 384.5],
    ] },
    // monitor: bezel, double rows of dots (right side and bottom stop where the wrench and screwdriver cover them)
    { color: "navy", only: "rest", prims: [
      ["line", 135.5, 185, 405.5, 185],
      ["line", 128, 192.5, 128, 372.5],
      ["line", 135.5, 380, 395.5, 380],
      ["line", 413, 192.5, 413, 252.5],
      ["line", 143, 200, 398, 200],
      ["line", 143, 215, 143, 350],
      ["line", 143, 365, 398, 365],
      ["line", 398, 215, 398, 260],
      ["dot", 398, 350],
    ] },
    // monitor: bezel outline + screen chin line
    { color: "navy", only: "hover", prims: [
      ["poly", [[413, 258], [413, 193], [405, 185], [136, 185], [128, 193], [128, 372], [136, 380], [396, 380]]],
      ["line", 128, 365, 398, 365],
      ["line", 398, 365, 398, 345],
    ] },
    // stand: neck pixels
    { color: "navy", only: "rest", prims: [
      ["dot", 241, 393],
      ["dot", 241, 405],
      ["dot", 290, 393],
      ["dot", 290, 405],
    ] },
    // stand: neck
    { color: "navy", only: "hover", prims: [
      ["line", 241, 380, 241, 416],
      ["line", 290, 380, 290, 416],
    ] },
    // stand: base rows
    { color: "navy", only: "rest", prims: [
      ["line", 205, 416, 325, 416],
      ["line", 205, 433, 325, 433],
      ["dot", 197, 424.5],
      ["dot", 333, 424.5],
    ] },
    // stand: base
    { color: "navy", only: "hover", prims: [
      ["rect", 197, 416, 136, 17, 8.5],
    ] },
    // chip: square
    { color: "red", only: "rest", prims: [
      ["line", 238, 260, 298, 260],
      ["line", 238, 308, 298, 308],
      ["line", 238, 276, 238, 292],
      ["line", 298, 276, 298, 292],
    ] },
    // chip: square
    { color: "red", only: "hover", prims: [
      ["rect", 238, 260, 60, 48],
    ] },
    // traces (red): node dots + trace pixels
    { color: "red", only: "rest", prims: [
      ["poly", [[223, 267], [210, 267], [210, 252], [204, 244], [197.6, 241.1]]],
      ["dot", 184, 233],
      ["poly", [[313, 295], [320, 295], [320, 309], [327.9, 313.3]]],
      ["dot", 348, 316],
    ] },
    // traces (red): node rings + traces
    { color: "red", only: "hover", prims: [
      ["circle", 184, 233, 7],
      ["poly", [[191, 238], [204, 244], [210, 252], [210, 267], [238, 267]]],
      ["circle", 348, 316, 7],
      ["poly", [[341, 316], [331, 315], [320, 309], [320, 295], [298, 295]]],
    ] },
    // traces (navy): node dots + trace pixels
    { color: "navy", only: "rest", prims: [
      ["poly", [[223, 281], [196, 281], [189, 275], [180.2, 275]]],
      ["dot", 168, 277],
      ["poly", [[313, 277], [343, 277]]],
      ["dot", 358, 277],
      ["poly", [[253, 245], [253, 245]]],
      ["dot", 253, 222],
      ["poly", [[283, 323], [283, 323]]],
      ["dot", 283, 346],
    ] },
    // traces (navy): node rings + traces
    { color: "navy", only: "hover", prims: [
      ["circle", 168, 277, 7],
      ["poly", [[175, 275], [189, 275], [196, 281], [238, 281]]],
      ["circle", 358, 277, 7],
      ["poly", [[351, 277], [298, 277]]],
      ["circle", 253, 222, 7],
      ["poly", [[253, 229], [253, 260]]],
      ["circle", 283, 346, 7],
      ["poly", [[283, 339], [283, 308]]],
    ] },
    // traces (light): node dots + trace pixels
    { color: "light", only: "rest", prims: [
      ["poly", [[223, 295], [210, 295], [210, 310], [197, 312], [193.2, 312.8]]],
      ["dot", 176, 316],
      ["poly", [[283, 245], [283, 245]]],
      ["dot", 283, 222],
    ] },
    // traces (light): node rings + traces
    { color: "light", only: "hover", prims: [
      ["circle", 176, 316, 7],
      ["poly", [[183, 315], [197, 312], [210, 310], [210, 295], [238, 295]]],
      ["circle", 283, 222, 7],
      ["poly", [[283, 229], [283, 260]]],
    ] },
    // traces (blue): node dots + trace pixels
    { color: "blue", only: "rest", prims: [
      ["poly", [[313, 253], [320, 253], [320, 245], [332, 237], [347.6, 237]]],
      ["dot", 358, 234],
      ["poly", [[253, 323], [253, 323]]],
      ["dot", 253, 343],
      ["dot", 268, 245],
      ["dot", 268, 323],
    ] },
    // traces (blue): node rings + traces
    { color: "blue", only: "hover", prims: [
      ["circle", 358, 234, 7],
      ["poly", [[351, 237], [332, 237], [320, 245], [320, 253], [298, 253]]],
      ["circle", 253, 343, 7],
      ["poly", [[253, 336], [253, 308]]],
      ["poly", [[268, 245], [268, 260]]],
      ["poly", [[268, 323], [268, 308]]],
    ] },
    // tower: case dots (left side and bottom hidden behind the wrench)
    { color: "navy", only: "rest", prims: [
      ["line", 477, 109, 567, 109],
      ["line", 465, 117, 465, 337],
      ["line", 579, 117, 579, 387],
      ["line", 571, 402, 556, 402],
    ] },
    // tower: case outline
    { color: "navy", only: "hover", prims: [
      ["poly", [[465, 340], [465, 118], [474, 109], [570, 109], [579, 118], [579, 393], [570, 402], [550, 402]]],
    ] },
    // tower: drive bays
    { color: "navy", prims: [
      ["rect", 478, 133, 90, 90],
      ["line", 478, 163, 568, 163],
      ["line", 478, 193, 568, 193],
    ] },
    // tower: buttons (blue)
    { color: "blue", only: "rest", prims: [
      ["dot", 505, 246.5],
    ] },
    // tower: buttons (red)
    { color: "red", only: "rest", prims: [
      ["dot", 522, 246.5],
    ] },
    // tower: buttons (light)
    { color: "light", only: "rest", prims: [
      ["dot", 539, 246.5],
    ] },
    // tower: buttons (blue)
    { color: "blue", only: "hover", prims: [
      ["circle", 505, 246.5, 4],
    ] },
    // tower: buttons (red)
    { color: "red", only: "hover", prims: [
      ["circle", 522, 246.5, 4],
    ] },
    // tower: buttons (light)
    { color: "light", only: "hover", prims: [
      ["circle", 539, 246.5, 4],
    ] },
    // tower: power ring
    { color: "blue", prims: [
      ["circle", 522, 288.5, 11.94],
    ] },
    // tower: power ring tick (its two tiny pale pixels would fill the 5-dot ring at rest, so hover only)
    { color: "light", only: "hover", prims: [
      ["line", 522, 284.5, 522, 290],
    ] },
    // wrench: lower head + handle
    { color: "navy", prims: [
      ["poly", [[482, 354], [490, 364], [503, 377], [516, 383], [531, 385], [539, 390], [544, 397], [546, 405], [544, 416], [531, 406], [525, 401], [518, 405], [511, 412], [507, 419], [513, 427], [522, 437], [507, 438], [499, 434], [493, 430], [489, 420], [488, 410], [483, 401], [473, 391], [460, 376]]],
    ] },
    // wrench: upper head + handle
    { color: "navy", prims: [
      ["poly", [[442, 357], [432, 346], [421, 337], [405, 337], [392, 331], [385, 320], [380, 305], [383, 292], [395, 301], [405, 310], [417, 301], [423, 295], [419, 287], [409, 277], [404, 273], [412, 268], [420, 267], [428, 268], [435, 274], [442, 280], [447, 288], [447, 301], [447, 312], [455, 322], [464, 335]]],
    ] },
    // screwdriver: handle
    { color: "red", prims: [
      ["polygon", [[361.3, 432], [359, 436.1], [359, 440.7], [361.3, 444.8], [376.2, 459.6], [380.2, 461.9], [384.9, 461.9], [388.9, 459.6], [446.9, 401.6], [449.2, 397.6], [449.2, 392.9], [446.9, 388.9], [432, 374.1], [428, 371.7], [423.3, 371.7], [419.3, 374.1]]],
    ] },
    // screwdriver: handle slot
    { color: "red", prims: [
      ["line", 422.5, 398.5, 380.1, 440.9],
    ] },
    // screwdriver: handle cap
    { color: "darkred", prims: [
      ["line", 427.1, 369.1, 451.8, 393.9],
    ] },
    // screwdriver: collar
    { color: "navy", only: "rest", prims: [
      ["dot", 440.5, 379.7],
    ] },
    // screwdriver: shaft
    { color: "blue", only: "rest", prims: [
      ["line", 434.9, 372.6, 490, 317.5],
      ["line", 444.8, 382.5, 499.9, 327.4],
      ["dot", 499.9, 317.5],
    ] },
    // screwdriver: shaft
    { color: "blue", only: "hover", prims: [
      ["poly", [[432.7, 374.8], [490, 317.5], [495, 315.4], [499.9, 317.5], [502, 322.4], [499.9, 327.4], [442.6, 384.7]]],
    ] },
    // confetti (red)
    { color: "red", prims: [
      ["dot", 133, 36.5],
      ["dot", 108.5, 68],
      ["dot", 569, 447],
      ["dot", 615, 452],
      ["dot", 572.5, 502.5],
    ] },
    // confetti (dark red)
    { color: "darkred", prims: [
      ["dot", 104.5, 132.5],
    ] },
    // confetti (navy)
    { color: "navy", prims: [
      ["dot", 167, 53.5],
      ["dot", 585, 468.5],
    ] },
    // confetti (blue)
    { color: "blue", prims: [
      ["dot", 126, 105.5],
      ["dot", 143, 144],
      ["dot", 605, 489.5],
    ] },
    // confetti (light)
    { color: "light", prims: [
      ["dot", 148, 80.5],
      ["dot", 179.5, 112.5],
      ["dot", 597.5, 422],
      ["dot", 545, 469],
    ] },
  ],
};
