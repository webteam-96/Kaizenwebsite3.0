/* Line-art element for the "marketing" card ("Digital Marketing Services") — traced from its Figma
   illustration assets/cards/marketing.png (720×540 frame). See illus.js for the primitive format.
   A laptop whose screen shows a megaphone (red rear housing + handle, navy cone, tilted mouth with a
   blue rim, red / navy / light sound lines), six icon circles joined to it by connector lines —
   thumbs-up, mail, play, bar chart, search and target-with-arrow — and confetti. The picture is drawn
   with ~7px dots, so every part is retraced on the shared 15px rhythm; "rest" groups rebuild the
   dotted rows (screen bezel, base stack, envelope, small icons), "hover" groups draw the clean
   thick-line icon. The six icon circles keep the picture's centres but are drawn ~16% larger (ring
   radii = a whole number of 15px dot steps), so their icons stay legible on the 15px rhythm; at rest
   the badge icons are re-gridded (leaning thumb, 9-dot play triangle, larger off-centre lens,
   two-ring target) and the sound lines are 3-dot dashes set one dot step clear of the mouth. */
module.exports = {
  key: "marketing",
  dot: 11,     // REST dot diameter (frame px) — shared by every card element
  pitch: 15,   // REST dot spacing along each stroke (frame px)
  groups: [
    // laptop screen: dot rows (top row broken where the megaphone mouth crosses it), rounded corners
    { color: "navy", only: "rest", prims: [
      ["line", 243, 217, 378, 217],
      ["line", 423, 217, 483, 217],
      ["line", 225.5, 231, 225.5, 381],
      ["line", 500.5, 231, 500.5, 381],
      ["line", 243, 395, 483, 395],
      ["dot", 229.8, 218.33],
      ["dot", 496.2, 218.33],
      ["dot", 229.8, 393.67],
      ["dot", 496.2, 393.67],
    ] },
    // laptop screen: rounded outline, open where the megaphone mouth crosses the top edge
    { color: "navy", only: "hover", prims: [
      ["poly", [[382, 217], [234.5, 217], [232.17, 217.31], [230, 218.21], [228.14, 219.64], [226.71, 221.5], [225.81, 223.67], [225.5, 226], [225.5, 386], [225.81, 388.33], [226.71, 390.5], [228.14, 392.36], [230, 393.79], [232.17, 394.69], [234.5, 395], [491.5, 395], [493.83, 394.69], [496, 393.79], [497.86, 392.36], [499.29, 390.5], [500.19, 388.33], [500.5, 386], [500.5, 226], [500.19, 223.67], [499.29, 221.5], [497.86, 219.64], [496, 218.21], [493.83, 217.31], [491.5, 217], [410.15, 217]]],
    ] },
    // laptop base: deck top row, trackpad notch + slanted deck sides, front edge and bottom rows
    { color: "navy", only: "rest", prims: [
      ["line", 220, 408, 505, 408],
      ["dot", 208.88, 421],
      ["dot", 516.38, 421],
      ["line", 332.75, 421, 392.75, 421],
      ["line", 197.75, 434, 527.75, 434],
      ["line", 205.25, 446, 520.25, 446],
    ] },
    // laptop base: deck trapezoid, front lip with rounded bottom corners, trackpad notch
    { color: "navy", only: "hover", prims: [
      ["polygon", [[220, 408], [505, 408], [527.75, 434], [197.75, 434]]],
      ["poly", [[197.75, 434], [198.4, 439.4], [201.4, 443.8], [206.5, 446], [519, 446], [524.1, 443.8], [527.1, 439.4], [527.75, 434]]],
      ["line", 332.75, 421, 392.75, 421],
    ] },
    // megaphone: mouth (tilted ellipse, open behind the blue rim)
    { color: "navy", only: "hover", prims: [
      ["poly", [[426.73, 291.07], [427.15, 296.16], [427.48, 301.11], [427.71, 305.91], [427.84, 310.51], [427.89, 314.89], [427.83, 319.03], [427.68, 322.89], [427.43, 326.45], [427.09, 329.68], [426.66, 332.57], [426.14, 335.1], [425.53, 337.25], [424.84, 339], [424.08, 340.35], [423.24, 341.29], [422.34, 341.8], [421.38, 341.89], [420.36, 341.56], [419.3, 340.81], [418.19, 339.64], [417.05, 338.06], [415.89, 336.08], [414.7, 333.71], [413.51, 330.98], [412.31, 327.89], [411.12, 324.47], [409.94, 320.73], [408.77, 316.71], [407.64, 312.43], [406.54, 307.92], [405.48, 303.2], [404.47, 298.32], [403.52, 293.28], [402.63, 288.14], [401.8, 282.93], [401.05, 277.67], [400.37, 272.41], [399.78, 267.17], [399.27, 261.99], [398.85, 256.91], [398.53, 251.95], [398.29, 247.15], [398.16, 242.55], [398.11, 238.16], [398.17, 234.02], [398.32, 230.16], [398.57, 226.59], [398.91, 223.36], [399.34, 220.46], [399.86, 217.93], [400.46, 215.78], [401.15, 214.02], [401.91, 212.66], [402.75, 211.72], [403.65, 211.2], [404.61, 211.11], [405.62, 211.43], [406.69, 212.18], [407.79, 213.35], [408.93, 214.92], [410.1, 216.9], [411.28, 219.26], [412.48, 221.99], [413.67, 225.07], [414.87, 228.49], [416.05, 232.22], [417.21, 236.23], [418.35, 240.51], [419.45, 245.02], [420.51, 249.73], [421.51, 254.62], [422.47, 259.65]]],
    ] },
    // megaphone: mouth dots
    { color: "navy", only: "rest", prims: [
      ["poly", [[427.21, 297.05], [427.48, 301.11], [427.71, 305.91], [427.84, 310.51], [427.89, 314.89], [427.83, 319.03], [427.68, 322.89], [427.43, 326.45], [427.09, 329.68], [426.66, 332.57], [426.14, 335.1], [425.53, 337.25], [424.84, 339], [424.08, 340.35], [423.24, 341.29], [422.34, 341.8], [421.38, 341.89], [420.36, 341.56], [419.3, 340.81], [418.19, 339.64], [417.05, 338.06], [415.89, 336.08], [414.7, 333.71], [413.51, 330.98], [412.31, 327.89], [411.12, 324.47], [409.94, 320.73], [408.77, 316.71], [407.64, 312.43], [406.54, 307.92], [405.48, 303.2], [404.47, 298.32], [403.52, 293.28], [402.63, 288.14], [401.8, 282.93], [401.05, 277.67], [400.37, 272.41], [399.78, 267.17], [399.27, 261.99], [398.85, 256.91], [398.53, 251.95], [398.29, 247.15], [398.16, 242.55], [398.11, 238.16], [398.17, 234.02], [398.32, 230.16], [398.57, 226.59], [398.91, 223.36], [399.34, 220.46], [399.86, 217.93], [400.46, 215.78], [401.15, 214.02], [401.91, 212.66], [402.75, 211.72], [403.65, 211.2], [404.61, 211.11], [405.62, 211.43], [406.69, 212.18], [407.79, 213.35], [408.93, 214.92], [410.1, 216.9], [411.28, 219.26], [412.48, 221.99], [413.67, 225.07], [414.87, 228.49], [416.05, 232.22], [417.21, 236.23], [418.35, 240.51], [419.45, 245.02], [420.51, 249.73], [421.34, 253.76]]],
    ] },
    // megaphone: rim inside the mouth (sampled #0052df on average, its inner side #0039be — blue)
    { color: "blue", prims: [
      ["polygon", [[422, 261], [423.76, 261.28], [425.44, 262.1], [427, 263.44], [428.36, 265.25], [429.48, 267.44], [430.31, 269.95], [430.83, 272.67], [431, 275.5], [430.83, 278.33], [430.31, 281.05], [429.48, 283.56], [428.36, 285.75], [427, 287.56], [425.44, 288.9], [423.76, 289.72], [422, 290], [420.24, 289.72], [418.56, 288.9], [417, 287.56], [415.64, 285.75], [414.52, 283.56], [413.69, 281.05], [413.17, 278.33], [413, 275.5], [413.17, 272.67], [413.69, 269.95], [414.52, 267.44], [415.64, 265.25], [417, 263.44], [418.56, 262.1], [420.24, 261.28]]],
    ] },
    // megaphone: cone
    { color: "navy", only: "hover", prims: [
      ["poly", [[399.09, 222.04], [314.5, 267.4], [322.5, 322], [354, 322], [386, 328.5], [414.81, 333.94]]],
    ] },
    // megaphone: cone dots (the back edge's two middle dots are blue in the picture)
    { color: "navy", only: "rest", prims: [
      ["line", 314.5, 267.4, 380.62, 231.93],
      ["dot", 316.67, 282.24],
      ["poly", [[327.31, 322], [354, 322], [386, 328.5], [403.02, 331.72]]],
    ] },
    { color: "blue", only: "rest", prims: [
      ["dot", 318.85, 297.08],
      ["dot", 321.03, 311.92],
    ] },
    // megaphone: red rear housing
    { color: "red", only: "hover", prims: [
      ["poly", [[314.5, 267.4], [277, 273.6], [270.6, 276.9], [266.6, 283.2], [265, 291], [265, 304], [265.8, 313], [268.4, 320.2], [273, 325.2], [280, 327.6], [322.5, 322]]],
    ] },
    // megaphone: red rear housing dots
    { color: "red", only: "rest", prims: [
      ["poly", [[299.7, 269.85], [277, 273.6], [270.6, 276.9], [266.6, 283.2], [265, 291], [265, 304], [265.8, 313], [268.4, 320.2], [273, 325.2], [280, 327.6], [310.6, 323.57]]],
    ] },
    // megaphone: handle
    { color: "red", only: "hover", prims: [
      ["poly", [[287, 327.5], [302, 373.5], [306.5, 378.5], [320.5, 378.5], [325.5, 374.5], [310.5, 328.5]]],
    ] },
    // megaphone: handle dots
    { color: "red", only: "rest", prims: [
      ["poly", [[291.03, 339.86], [302, 373.5], [306.5, 378.5], [320.5, 378.5], [325.5, 374.5], [314.22, 339.91]]],
    ] },
    // megaphone: light rim at the rear
    { color: "light", prims: [
      ["arc", 291, 304, 40, 158.5, 201.5],
    ] },
    // sound lines (as in the picture): red
    { color: "red", only: "hover", prims: [
      ["line", 440.78, 253.79, 463.22, 233.81],
      ["line", 447.88, 295.43, 476.32, 305.17],
    ] },
    // sound lines: navy
    { color: "navy", only: "hover", prims: [
      ["line", 446.62, 273.84, 476.18, 268.46],
    ] },
    // sound lines: light
    { color: "light", only: "hover", prims: [
      ["line", 441.93, 321.05, 461.57, 334.85],
    ] },
    // sound line dots: the same four rays, each a 3-dot dash (41px) starting one dot step clear of the
    // mouth and rim and ending clear of the top row and right bezel, so they don't knot together
    { color: "red", only: "rest", prims: [
      ["line", 446, 256, 469.02, 236.69],
      ["line", 449, 296, 477.24, 306.28],
    ] },
    { color: "navy", only: "rest", prims: [
      ["line", 452, 276, 481.76, 271.81],
    ] },
    { color: "light", only: "rest", prims: [
      ["line", 446, 322, 469.68, 340.5],
    ] },
    // ---- icon circles: the picture's centres, radii ~16% larger and set to a whole number of dot
    // steps (thumbs / target 22, mail 23, play / chart / search 21), every rest ring starting on the
    // point where its connector leaves it
    // thumbs-up circle
    { color: "light", only: "hover", prims: [
      ["circle", 218.4, 139, 52.52],
    ] },
    // thumbs-up circle dots
    { color: "light", only: "rest", prims: [
      ["arc", 218.4, 139, 52.52, 41.36, 401.26],
    ] },
    // thumbs-up: cuff + hand (the picture's outline, x1.15)
    { color: "navy", only: "hover", prims: [
      ["poly", [[206.14, 128.95], [190.62, 128.95], [190.62, 165.75], [206.14, 165.75]]],
      ["poly", [[206.14, 165.75], [206.14, 128.95], [210.74, 128.95], [214.19, 116.3], [217.06, 104.8], [221.09, 100.78], [226.84, 100.78], [230.87, 104.8], [230.87, 115.15], [227.99, 128.95], [246.97, 128.95], [252.14, 133.55], [251.56, 140.45], [245.81, 160], [240.06, 165.75], [206.14, 165.75]]],
    ] },
    // thumbs-up dots: cuff (two dot columns), bottom row, rounded fingers side, finger top, and a
    // raised thumb with a flat two-dot tip, following the outline (the old 2x2 loop read as a padlock)
    { color: "navy", only: "rest", prims: [
      ["dot", 190.6, 129],
      ["dot", 190.6, 147.4],
      ["dot", 190.6, 165.75],
      ["dot", 206.1, 129],
      ["dot", 206.1, 147.4],
      ["dot", 206.1, 165.75],
      ["dot", 220.7, 165.75],
      ["dot", 235.4, 165.75],
      ["dot", 246.4, 158],
      ["dot", 250.4, 144],
      ["dot", 249.4, 130],
      ["dot", 236.4, 130],
      ["dot", 212.4, 117],
      ["dot", 216.4, 104],
      ["dot", 229.4, 105],
      ["dot", 228.4, 119],
    ] },
    // mail circle
    { color: "navy", only: "hover", prims: [
      ["circle", 360.2, 84.2, 54.91],
    ] },
    // mail circle dots
    { color: "navy", only: "rest", prims: [
      ["arc", 360.2, 84.2, 54.91, 90, 449.9],
    ] },
    // envelope (x1.1): top corners, flap V (carries the top edge so the V stays readable), side dots,
    // bottom row
    { color: "red", only: "rest", prims: [
      ["dot", 327, 64.13],
      ["dot", 343.5, 76.23],
      ["dot", 360, 88.33],
      ["dot", 376.5, 76.23],
      ["dot", 393, 64.13],
      ["dot", 327, 84.75],
      ["dot", 393, 84.75],
      ["dot", 327, 105.38],
      ["dot", 343.5, 105.38],
      ["dot", 360, 105.38],
      ["dot", 376.5, 105.38],
      ["dot", 393, 105.38],
    ] },
    // envelope: outline + flap
    { color: "red", only: "hover", prims: [
      ["rect", 327, 64.13, 66, 41.25, 3.3],
      ["poly", [[328.65, 65.78], [360, 88.33], [391.35, 65.78]]],
    ] },
    // play circle
    { color: "red", only: "hover", prims: [
      ["circle", 507.2, 129.2, 50.13],
    ] },
    // play circle dots
    { color: "red", only: "rest", prims: [
      ["arc", 507.2, 129.2, 50.13, 120.25, 480.15],
    ] },
    // play triangle: equilateral, 45px sides (3 dot steps, so the 9 rest dots sit on its corners),
    // centroid 2px right of the circle centre
    { color: "red", prims: [
      ["polygon", [[496.2, 106.7], [535.17, 129.2], [496.2, 151.7]]],
    ] },
    // bar-chart circle
    { color: "light", only: "hover", prims: [
      ["circle", 574.3, 252.3, 50.13],
    ] },
    // bar-chart circle dots
    { color: "light", only: "rest", prims: [
      ["arc", 574.3, 252.3, 50.13, 162.35, 522.25],
    ] },
    // bar chart: blue bars (2 and 3 dots)
    { color: "blue", prims: [
      ["line", 553.5, 277, 553.5, 262],
      ["line", 572, 277, 572, 247],
    ] },
    // bar chart: red bar (4 dots)
    { color: "red", prims: [
      ["line", 590.5, 277, 590.5, 232],
    ] },
    // search circle
    { color: "navy", only: "hover", prims: [
      ["circle", 576.6, 373.2, 50.13],
    ] },
    // search circle dots
    { color: "navy", only: "rest", prims: [
      ["arc", 576.6, 373.2, 50.13, -159.3, 200.6],
    ] },
    // search: lens (r 21.5 = 9 dot steps), set up-left of the circle centre so it never reads as a
    // second bullseye
    { color: "navy", only: "hover", prims: [
      ["circle", 566.7, 363.3, 21.49],
    ] },
    // search: lens dots (the first one sits where the handle leaves the lens)
    { color: "navy", only: "rest", prims: [
      ["arc", 566.7, 363.3, 21.49, 45, 404.9],
    ] },
    // search: handle (two dots beyond the lens dot at 45 degrees, so the short thick bar reads)
    { color: "light", only: "rest", prims: [
      ["dot", 591.8, 388.4],
      ["dot", 600.99, 397.59],
    ] },
    // search: handle
    { color: "light", only: "hover", prims: [
      ["line", 581.9, 378.5, 600.99, 397.59],
    ] },
    // target rings (the outer ring opens at -45 degrees where the arrow fletching sits on it, as in the picture)
    { color: "red", only: "hover", prims: [
      ["arc", 146.2, 302, 52.52, -21, 291],
      ["circle", 146.2, 302, 30.41],
      ["circle", 146.2, 302, 13.82],
    ] },
    // target ring dots: outer ring (19 steps, gap centred on -45 degrees for the fletching) and one
    // inner ring (8 steps) round the bullseye; three rings 19px apart merged into a solid disc at rest
    { color: "red", only: "rest", prims: [
      ["arc", 146.2, 302, 52.52, -16.36, 278.25],
      ["arc", 146.2, 302, 19.1, -45, 314.9],
    ] },
    // target: bullseye
    { color: "light", prims: [
      ["dot", 146.2, 302],
    ] },
    // target: arrow shaft dot between the rings + fletching (corner on the shaft at r 44, vanes up / right)
    { color: "red", only: "rest", prims: [
      ["dot", 168.62, 279.58],
      ["dot", 177.52, 270.68],
      ["dot", 177.52, 255.68],
      ["dot", 192.52, 270.68],
    ] },
    // target: arrow shaft from the bullseye along -45 degrees + fletching chevron sitting on the outer ring
    { color: "red", only: "hover", prims: [
      ["line", 151.5, 296.7, 177.52, 270.68],
      ["poly", [[177.52, 255.68], [177.52, 270.68], [192.52, 270.68]]],
    ] },
    // connector: thumbs-up
    { color: "light", only: "hover", prims: [
      ["line", 257.82, 173.7, 295.09, 217],
    ] },
    // connector: thumbs-up dots
    { color: "light", only: "rest", prims: [
      ["line", 267.6, 185.07, 277.42, 196.47],
    ] },
    // connector: mail
    { color: "navy", only: "hover", prims: [
      ["line", 360.2, 139.11, 360.2, 217],
    ] },
    // connector: mail dots
    { color: "navy", only: "rest", prims: [
      ["line", 360.2, 154.11, 360.2, 199.11],
    ] },
    // connector: play (radial; meets the screen's top edge at x 456, clear of the megaphone mouth)
    { color: "red", only: "hover", prims: [
      ["line", 481.95, 172.51, 456, 217],
    ] },
    // connector: play dots
    { color: "red", only: "rest", prims: [
      ["line", 474.39, 185.47, 466.81, 198.47],
    ] },
    // connector: chart
    { color: "light", only: "hover", prims: [
      ["line", 500.5, 267.5, 526.53, 267.5],
    ] },
    // connector: chart dot
    { color: "light", only: "rest", prims: [
      ["dot", 513.5, 267.5],
    ] },
    // connector: search
    { color: "navy", only: "hover", prims: [
      ["line", 500.5, 343.32, 529.7, 355.48],
    ] },
    // connector: search dot
    { color: "navy", only: "rest", prims: [
      ["dot", 515.1, 349.4],
    ] },
    // connector: target
    { color: "red", only: "hover", prims: [
      ["line", 198.72, 302, 225.5, 302],
    ] },
    // connector: target dot
    { color: "red", only: "rest", prims: [
      ["dot", 212.1, 302],
    ] },
    // confetti: red
    { color: "red", prims: [
      ["dot", 148, 37],
      ["dot", 148, 104.8],
      ["dot", 580.4, 445.6],
      ["dot", 580.3, 485.2],
    ] },
    // confetti: navy
    { color: "navy", prims: [
      ["dot", 122.5, 84.6],
      ["dot", 600.5, 503.1],
    ] },
    // confetti: blue
    { color: "blue", prims: [
      ["dot", 116, 125],
      ["dot", 609.7, 463.9],
      ["dot", 559.6, 465.3],
    ] },
    // confetti: light
    { color: "light", prims: [
      ["dot", 180.7, 57.3],
      ["dot", 160.5, 77.4],
      ["dot", 539, 492.5],
    ] },
  ],
};
