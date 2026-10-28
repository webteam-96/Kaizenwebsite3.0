/* Line-art element for the "web" card (Enterprise Web Portals & Websites) — traced from its Figma
   illustration assets/cards/web.png (720×540 frame). See illus.js for the primitive format.
   A navy monitor showing a BROWSER WINDOW (double-row bezel with cut corners, title bar with three window
   buttons and a long address bar, separator line), an image block (light: frame, filled mountains and a
   sun ring), six text lines to its right, three content panels along the bottom (red / blue / light
   frames with short lines), the navy stand (neck block + base); a GLOBE behind the monitor top-right
   (outer circle, meridian, two latitudes, equator); a red SHIELD with a blue USER (head + shoulders) in
   front of the monitor's lower-right corner; confetti top-left and bottom-right.
   The picture is drawn with finer dots (~9.5px) than the shared card rhythm, so its shapes are traced on
   the 15px pitch: dense two-dot bezels and filled areas are rebuilt with extra "rest" rows ~15px apart,
   and "hover" groups give the clean thick-line icon. Parts behind another part (globe behind the monitor,
   monitor behind the shield) stop where the picture's do, measured in dot steps: one empty step short of it,
   or tight against it where the picture runs right up to it (the bezel's outer bottom row, the inner right
   column, the globe's lower latitude).
   PLACEMENT: the whole element (confetti included) sits 20px higher than the picture — element y = picture
   y − 20 — so its body (globe top to stand base, y 42–450) lines up with the other Services elements
   (centred at y ~241–248, bases at ~445–454) instead of riding 20px low in the card. Only the position
   moves; every part keeps the picture's shape, size and spacing. */
module.exports = {
  key: "web",
  dot: 11,     // REST dot diameter (frame px) — shared by every card element
  pitch: 15,   // REST dot spacing along each stroke (frame px)
  groups: [
    // monitor: double bezel, top rows (outer row has cut corners, second row spans both outer columns)
    { color: "navy", only: "rest", prims: [ ["line", 133, 109, 493.5, 109], ["line", 118, 124, 508.5, 124] ] },
    // monitor: double bezel, left columns
    { color: "navy", only: "rest", prims: [ ["line", 118, 139, 118, 379.5], ["line", 133, 139, 133, 364.5] ] },
    // monitor: double bezel, right columns — stop short of the shield (outer one a row earlier, like the picture)
    { color: "navy", only: "rest", prims: [ ["line", 508, 139, 508, 244.5], ["line", 493, 139, 493, 259.5] ] },
    // monitor: double bezel, bottom rows — like the picture, the inner row stops one empty step short of the
    // shield and the outer row runs right up to its slant
    { color: "navy", only: "rest", prims: [ ["line", 133, 379, 433.5, 379], ["line", 133, 394, 463.5, 394] ] },
    // monitor: outline (line state) — cut corners, open at the lower right where the shield sits in front
    { color: "navy", only: "hover", prims: [
      ["poly", [[508, 256], [508, 124], [493, 109], [133, 109], [118, 124], [118, 379], [133, 394], [463, 394]]],
    ] },
    // browser: window button (dark red)
    { color: "darkred", only: "rest", prims: [ ["dot", 155, 145] ] },
    // browser: window buttons (blue, light)
    { color: "blue", only: "rest", prims: [ ["dot", 180, 145] ] },
    { color: "light", only: "rest", prims: [ ["dot", 205, 145] ] },
    // browser: window buttons (line state) — small solid discs
    { color: "darkred", only: "hover", prims: [ ["circle", 155, 145, 2.5] ] },
    { color: "blue", only: "hover", prims: [ ["circle", 180, 145, 2.5] ] },
    { color: "light", only: "hover", prims: [ ["circle", 205, 145, 2.5] ] },
    // browser: address bar — a dot row sitting a little below the button centres, like the picture's
    // (its row is at the bottom of the buttons' 2×2 dot clusters), one pitch above the separator
    { color: "blue", prims: [ ["line", 238, 149, 478.5, 149] ] },
    // browser: separator under the title bar
    { color: "navy", prims: [ ["line", 148, 164, 478.5, 164] ] },
    // image block: frame dots
    { color: "light", only: "rest", prims: [
      ["line", 148, 184, 313.5, 184],
      ["line", 148, 199, 148, 259.5],
      ["line", 313, 199, 313, 259.5],
      ["line", 148, 274, 313.5, 274],
    ] },
    // image block: mountains, filled like the picture — big peak (193), small hill (238), valley, right peak (283),
    // full ground row
    { color: "light", only: "rest", prims: [
      ["dot", 193, 214],
      ["line", 178, 229, 208.5, 229],
      ["dot", 238, 229],
      ["dot", 283, 229],
      ["line", 163, 244, 253.5, 244],
      ["line", 283, 244, 298.5, 244],
      ["line", 163, 259, 298.5, 259],
    ] },
    // image block: sun (a ring of five dots)
    { color: "light", only: "rest", prims: [ ["circle", 268, 210, 11.96] ] },
    // image block: frame, mountain ridge and sun (line state)
    { color: "light", only: "hover", prims: [
      ["rect", 148, 184, 165, 90],
      ["poly", [[148, 259], [193, 214], [223, 244], [238, 229], [260.5, 251.5], [283, 229], [313, 259]]],
      ["circle", 268, 210, 11],
    ] },
    // text lines (short navy, long red, short light, long blue, short navy, long dark red)
    { color: "navy", prims: [ ["line", 340, 190, 400.5, 190], ["line", 340, 254, 400.5, 254] ] },
    { color: "red", prims: [ ["line", 340, 205, 460.5, 205] ] },
    { color: "light", prims: [ ["line", 340, 222, 400.5, 222] ] },
    { color: "blue", prims: [ ["line", 340, 237, 460.5, 237] ] },
    { color: "darkred", prims: [ ["line", 340, 269, 460.5, 269] ] },
    // content panel 1: red frame + red line (each panel's three / four short lines in the picture become two on
    // the 15px pitch, so the panel still reads as a frame with lines)
    { color: "red", prims: [ ["rect", 148, 297, 75, 60], ["line", 163, 334.5, 193.5, 334.5] ] },
    // content panel 1: two-colour line (dots)
    { color: "darkred", only: "rest", prims: [ ["line", 163, 319.5, 178.5, 319.5] ] },
    { color: "red", only: "rest", prims: [ ["line", 193, 319.5, 208.5, 319.5] ] },
    // content panel 1: two-colour line (line state)
    { color: "darkred", only: "hover", prims: [ ["line", 163, 319.5, 185.5, 319.5] ] },
    { color: "red", only: "hover", prims: [ ["line", 185.5, 319.5, 208.5, 319.5] ] },
    // content panel 2: blue frame + lines
    { color: "blue", prims: [
      ["rect", 253, 297, 75, 60],
      ["line", 268, 319.5, 313.5, 319.5],
      ["line", 268, 334.5, 298.5, 334.5],
    ] },
    // content panel 3: light frame + lines
    { color: "light", prims: [
      ["rect", 358, 297, 75, 60],
      ["line", 373, 319.5, 418.5, 319.5],
      ["line", 373, 334.5, 410, 334.5],
    ] },
    // stand: base (top and bottom rows) — the stand's rows sit 14px apart so the base lands where the picture's
    // does (its rows at ~457 / ~466, i.e. 437 / 446 after the 20px lift)
    { color: "navy", prims: [ ["line", 230.5, 436, 396, 436], ["line", 215.5, 450, 411, 450] ] },
    // stand: neck block (two full rows of dots)
    { color: "navy", only: "rest", prims: [ ["line", 275.5, 408, 351, 408], ["line", 275.5, 422, 351, 422] ] },
    // stand: neck sides + base slanted ends (line state)
    { color: "navy", only: "hover", prims: [
      ["line", 275.5, 394, 275.5, 436],
      ["line", 350.5, 394, 350.5, 436],
      ["line", 230.5, 436, 215.5, 450],
      ["line", 395.5, 436, 410.5, 450],
    ] },
    // globe (behind the monitor): outer circle dots, one every 9° so the latitude and equator ends land on dots —
    // blue where it comes out from behind the monitor (upper left) and round the upper-right latitude end, navy elsewhere
    { color: "blue", only: "rest", prims: [
      ["arc", 518, 137.5, 95.7, 207, 234.3],
      ["arc", 518, 137.5, 95.7, 315, 324.3],
    ] },
    { color: "navy", only: "rest", prims: [
      ["arc", 518, 137.5, 95.7, 243, 306.3],
      ["arc", 518, 137.5, 95.7, 333, 441.3],
    ] },
    // globe: outer circle (line state)
    { color: "blue", only: "hover", prims: [
      ["arc", 518, 137.5, 95.7, 207, 238.5],
      ["arc", 518, 137.5, 95.7, 310.5, 328.5],
    ] },
    { color: "navy", only: "hover", prims: [
      ["arc", 518, 137.5, 95.7, 238.5, 310.5],
      ["arc", 518, 137.5, 95.7, 328.5, 444],
    ] },
    // globe: upper latitude dots — placed singly, evenly between its ends on the circle and its crossings with
    // the meridian (one shared dot per crossing)
    { color: "blue", only: "rest", prims: [
      ["dot", 467.06, 78.1],
      ["dot", 485.29, 82.42],
      ["dot", 501.59, 84.35],
      ["dot", 518, 84.96],
      ["dot", 534.41, 84.35],
      ["dot", 550.71, 82.42],
      ["dot", 568.94, 78.1],
    ] },
    // globe: meridian dots — right half from the top of the circle to its bottom; left half down to one dot below
    // the upper latitude (further down it is behind the monitor)
    { color: "blue", only: "rest", prims: [
      ["dot", 481.97, 95.95],
      ["dot", 545.46, 67.92],
      ["dot", 537.91, 54.5],
      ["dot", 554.03, 95.95],
      ["dot", 556.27, 109.7],
      ["dot", 557.57, 123.57],
      ["dot", 558, 137.5],
      ["dot", 557.57, 151.43],
      ["dot", 556.27, 165.3],
      ["dot", 554.03, 179.05],
      ["dot", 545.46, 207.08],
      ["dot", 537.91, 220.5],
      ["dot", 490.54, 67.92],
      ["dot", 498.09, 54.5],
    ] },
    // globe: equator and lower latitude dots (their left parts are behind the monitor)
    { color: "blue", only: "rest", prims: [
      ["dot", 571.92, 137.5],
      ["dot", 585.85, 137.5],
      ["dot", 599.78, 137.5],
      ["dot", 543, 137.5],
      ["dot", 528, 137.5],
      ["dot", 520.8, 190.06],
      ["dot", 550.71, 192.58],
      ["dot", 568.94, 196.9],
      ["dot", 535.82, 190.77],
    ] },
    // globe: meridian, latitudes and equator (line state) — the left half disappears behind the monitor
    { color: "blue", only: "hover", prims: [
      ["bez", [518, 41.8], [540.09, 41.8], [558, 84.64], [558, 137.5]],
      ["bez", [558, 137.5], [558, 179.47], [546.71, 215.12], [531, 228.03]],
      ["bez", [518, 41.8], [502.79, 41.8], [489.57, 62.1], [482.8, 92]],
      ["bez", [450.33, 69.83], [476, 90], [560, 90], [585.67, 69.83]],
      ["bez", [523, 190.1], [548.7, 190.67], [573.62, 195.7], [585.67, 205.17]],
      ["line", 523, 137.5, 613.7, 137.5],
    ] },
    // shield (in front of the monitor): dots placed evenly between apex, corners, side ends and tip
    { color: "red", only: "rest", prims: [
      ["dot", 518, 269],
      ["dot", 504.85, 272.94],
      ["dot", 492.47, 278.97],
      ["dot", 480.2, 285.23],
      ["dot", 467.49, 290.53],
      ["dot", 454, 293],
      ["dot", 454, 309.25],
      ["dot", 454, 325.5],
      ["dot", 454, 341.75],
      ["dot", 454, 358],
      ["dot", 460.13, 370.1],
      ["dot", 468.66, 380.78],
      ["dot", 477.89, 390.86],
      ["dot", 487.52, 400.57],
      ["dot", 497.43, 409.99],
      ["dot", 507.58, 419.15],
      ["dot", 531.15, 272.94],
      ["dot", 543.53, 278.97],
      ["dot", 555.8, 285.23],
      ["dot", 568.51, 290.53],
      ["dot", 582, 293],
      ["dot", 582, 309.25],
      ["dot", 582, 325.5],
      ["dot", 582, 341.75],
      ["dot", 582, 358],
      ["dot", 575.87, 370.1],
      ["dot", 567.34, 380.78],
      ["dot", 558.11, 390.86],
      ["dot", 548.48, 400.57],
      ["dot", 538.57, 409.99],
      ["dot", 528.42, 419.15],
      ["dot", 518, 428],
    ] },
    // shield: outline (line state) — two mirrored halves from the apex to the tip
    { color: "red", only: "hover", prims: [
      ["poly", [
        [518, 269], [512.4, 270.16], [506.45, 272.26], [500.21, 275.07], [493.74, 278.31], [487.13, 281.75],
        [480.42, 285.13], [473.68, 288.19], [466.99, 290.7], [460.41, 292.38], [454, 293], [454, 358],
        [455.68, 362.88], [459.31, 368.93], [464.55, 375.89], [471.06, 383.5], [478.5, 391.5], [486.54, 399.62],
        [494.85, 407.59], [503.09, 415.15], [510.92, 422.04], [518, 428],
      ]],
      ["poly", [
        [518, 269], [523.6, 270.16], [529.55, 272.26], [535.79, 275.07], [542.26, 278.31], [548.88, 281.75],
        [555.58, 285.13], [562.32, 288.19], [569.01, 290.7], [575.59, 292.38], [582, 293], [582, 358],
        [580.32, 362.88], [576.69, 368.93], [571.45, 375.89], [564.94, 383.5], [557.5, 391.5], [549.46, 399.62],
        [541.15, 407.59], [532.91, 415.15], [525.08, 422.04], [518, 428],
      ]],
    ] },
    // user: head (two half rings, so the dots sit in flat pairs top and bottom like the picture)
    { color: "blue", prims: [ ["arc", 518, 329, 19.1, 22.5, 202.5], ["arc", 518, 329, 19.1, 202.5, 382.5] ] },
    // user: shoulders (dots)
    { color: "blue", only: "rest", prims: [ ["arc", 518, 377, 33, 180, 232.2], ["arc", 518, 377, 33, 360, 307.8] ] },
    // user: shoulders (line state) — end clear of the head
    { color: "blue", only: "hover", prims: [ ["arc", 518, 377, 33, 180, 226], ["arc", 518, 377, 33, 360, 314] ] },
    // confetti: red
    { color: "red", prims: [
      ["dot", 152.5, 17.3],
      ["dot", 99.5, 49.1],
      ["dot", 620.9, 444.8],
      ["dot", 586.8, 450.1],
    ] },
    // confetti: dark red
    { color: "darkred", prims: [ ["dot", 578.4, 482.8] ] },
    // confetti: navy
    { color: "navy", prims: [ ["dot", 131.2, 58.1], ["dot", 566.1, 435.2] ] },
    // confetti: blue
    { color: "blue", prims: [
      ["dot", 171.9, 52.8],
      ["dot", 159, 81.8],
      ["dot", 604.8, 419.1],
      ["dot", 609.9, 472.1],
    ] },
    // confetti: light
    { color: "light", prims: [ ["dot", 114.4, 85.2], ["dot", 554, 463.7] ] },
  ],
};
