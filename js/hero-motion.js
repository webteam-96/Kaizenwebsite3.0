/* Kaizen Infotech — hero motion graphics
   One cloud of coloured dots keeps re-forming into the page's elements:
     1. ASSEMBLE  dots fly in and form the element        (pixelated)
     2. CLEAR     dots tighten onto its lines; the crisp thick-line
                  drawing draws itself in                  (clear)
     3. DISPERSE  the drawing fades, dots burst into a scattered cloud
     → the next element assembles from that cloud … forever.
   Hover holds the current element clear and enlarges it; moving away
   resumes the flow. Pauses off-screen / in background tabs. Respects
   prefers-reduced-motion (gentle crossfade between clear drawings).

   Markup (from build.js):
     <div class="hero-motion" data-hero-motion>
       <div class="hero-motion__stage"><canvas></canvas></div>
       <p class="hero-motion__cap"><strong></strong><span></span></p>
       <script type="application/json">[elements]</script>
     </div>
   Elements use the illus.js primitive format. A photo element (ph: image
   path, a team member) is formed differently: the dots assemble into a
   halftone of the photo in the brand blues (dark areas dense, the white
   background left empty), then CLEAR fades the real photo in inside a
   circle while a ring draws itself around it.                            */
(function () {
  "use strict";
  var roots = document.querySelectorAll("[data-hero-motion]");
  if (!roots.length || !window.Path2D) return;

  var W = 720, H = 540, PAD = 34;
  var MIN_N = 1000, MAX_N = 1800, BAND = 22, CLEAR_W = 8; // dense, chunky dot bands like the reference
  var T_ASM = 1.3, T_PIX = 0.5, T_CLR = 0.7, T_HOLD = 1.4, T_DIS = 1.0;
  var A = T_ASM, B = A + T_PIX, C = B + T_CLR, D = C + T_HOLD, E = D + T_DIS;
  var RGB = { navy: [1, 17, 123], blue: [1, 59, 187], light: [53, 129, 241], red: [215, 2, 19], darkred: [167, 1, 7], rose: [228, 78, 92] };
  // each element colour scatters into its family, like the reference video
  var FAMILY = {
    navy: ["navy", "navy", "blue", "light"], blue: ["blue", "navy", "light", "blue"], light: ["light", "light", "blue", "navy"],
    red: ["red", "red", "darkred", "rose"], darkred: ["darkred", "red", "darkred", "rose"],
  };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- geometry (same primitives as illus.js) ---------------- */
  function rad(a) { return (a * Math.PI) / 180; }
  function arcPts(cx, cy, r, a0, a1) {
    var n = Math.max(2, Math.ceil((Math.abs(a1 - a0) * Math.PI * r) / 180 / 2)), pts = [];
    for (var i = 0; i <= n; i++) { var a = rad(a0 + ((a1 - a0) * i) / n); pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return pts;
  }
  function densify(p) {
    var t = p[0];
    if (t === "line") return [[p[1], p[2]], [p[3], p[4]]];
    if (t === "poly") return p[1];
    if (t === "polygon") return p[1].concat([p[1][0]]);
    if (t === "rect") {
      var x = p[1], y = p[2], w = p[3], h = p[4], r = p[5] || 0;
      if (!r) return [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];
      return [[x + r, y]].concat(arcPts(x + w - r, y + r, r, -90, 0), arcPts(x + w - r, y + h - r, r, 0, 90), arcPts(x + r, y + h - r, r, 90, 180), arcPts(x + r, y + r, r, 180, 270));
    }
    if (t === "circle") return arcPts(p[1], p[2], p[3], 0, 360);
    if (t === "arc") return arcPts(p[1], p[2], p[3], p[4], p[5]);
    if (t === "bez") {
      var a = p[1], b = p[2], c = p[3], d = p[4], out = [];
      for (var i = 0; i <= 48; i++) {
        var s = i / 48, u = 1 - s;
        out.push([u * u * u * a[0] + 3 * u * u * s * b[0] + 3 * u * s * s * c[0] + s * s * s * d[0], u * u * u * a[1] + 3 * u * u * s * b[1] + 3 * u * s * s * c[1] + s * s * s * d[1]]);
      }
      return out;
    }
    if (t === "dot") return [[p[1], p[2]]];
    return [];
  }
  function polyLen(pts) { var L = 0; for (var i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
  function toPath(pts, closed) {
    var p = new Path2D();
    p.moveTo(pts[0][0], pts[0][1]);
    if (pts.length === 1) p.lineTo(pts[0][0] + 0.01, pts[0][1]);
    for (var i = 1; i < pts.length; i++) p.lineTo(pts[i][0], pts[i][1]);
    if (closed) p.closePath();
    return p;
  }
  // small seeded RNG so every element always samples the same way
  function rng(seed) { return function () { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; var t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function pick(list, r) { return list[Math.floor(r() * list.length)]; }

  /* ------------- team photo → halftone dot targets + ring ------------- */
  var PHOTO_N = 2100, PH_R = 222, PH_SP = 8.2; // dot budget, portrait radius, dot pitch
  function preparePhoto(def, idx) {
    var cx = W / 2, cy = H / 2, ring = new Path2D();
    ring.arc(cx, cy, PH_R + 7, -Math.PI / 2, Math.PI * 1.5);
    return { photo: def.ph, img: null, cx: cx, cy: cy, R: PH_R, seed: idx * 7919 + 17, targets: [],
      strokes: [{ path: ring, len: 2 * Math.PI * (PH_R + 7), col: RGB.blue }], s: 1, ox: 0, oy: 0, t: def.t, sub: def.s };
  }
  // read the photo's brightness on a hex grid inside the circle: darker → deeper blue;
  // near-white (the backdrop) gets no dot, so the person's silhouette forms
  function samplePhoto(e, img, max) {
    var size = Math.round(2 * e.R), c = document.createElement("canvas");
    c.width = c.height = size;
    var g = c.getContext("2d");
    g.drawImage(img, 0, 0, size, size);
    var d = g.getImageData(0, 0, size, size).data, r = rng(e.seed), pts = [], lim = (e.R - 3) * (e.R - 3);
    for (var row = 0, y = PH_SP / 2; y < size; y += PH_SP * 0.866, row++) {
      for (var x = row % 2 ? PH_SP : PH_SP / 2; x < size; x += PH_SP) {
        var dx = x - e.R, dy = y - e.R;
        if (dx * dx + dy * dy > lim) continue;
        var i = ((y | 0) * size + (x | 0)) * 4, L = (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255;
        if (L > 0.86) continue;
        var col = L < 0.2 ? "navy" : L < 0.4 ? "blue" : L < 0.62 ? "light" : "rose";
        var px = e.cx - e.R + x, py = e.cy - e.R + y;
        pts.push({ cx: px, cy: py, x: px + (r() - 0.5) * 1.6, y: py + (r() - 0.5) * 1.6, col: RGB[col] });
      }
    }
    for (var j = pts.length - 1; j > 0; j--) { var q = Math.floor(r() * (j + 1)), tmp = pts[j]; pts[j] = pts[q]; pts[q] = tmp; }
    e.targets = pts.slice(0, max);
  }

  /* ------------- element → particle targets + clear strokes ------------- */
  function prepare(def, idx) {
    if (def.ph) return preparePhoto(def, idx);
    var s = Math.min((W - 2 * PAD) / def.f.w, (H - 2 * PAD) / def.f.h);
    var ox = (W - def.f.w * s) / 2, oy = (H - def.f.h * s) / 2, r = rng(idx * 7919 + 17);
    var lines = [], total = 0;
    def.g.forEach(function (g) {
      if (g.o === "hover") return;
      g.p.forEach(function (p) {
        var pts = densify(p).map(function (q) { return [ox + q[0] * s, oy + q[1] * s]; });
        var L = polyLen(pts); total += L;
        lines.push({ pts: pts, len: L, c: g.c, dot: p[0] === "dot" });
      });
    });
    var count = Math.max(MIN_N, Math.min(MAX_N, Math.round(total / 1.9)));
    var sp = Math.max(0.6, total / count), targets = [];
    lines.forEach(function (l) {
      var fam = FAMILY[l.c] || FAMILY.navy;
      if (l.dot) {
        for (var k = 0; k < 3; k++) targets.push({ cx: l.pts[0][0], cy: l.pts[0][1], x: l.pts[0][0] + (r() - 0.5) * 6, y: l.pts[0][1] + (r() - 0.5) * 6, col: RGB[pick(fam, r)] });
        return;
      }
      var carry = r() * sp, pts = l.pts;
      for (var i = 1; i < pts.length; i++) {
        var x0 = pts[i - 1][0], y0 = pts[i - 1][1], dx = pts[i][0] - x0, dy = pts[i][1] - y0, seg = Math.hypot(dx, dy);
        if (!seg) continue;
        var nx = -dy / seg, ny = dx / seg;
        for (var d = carry; d <= seg; d += sp) {
          var cx = x0 + (dx * d) / seg, cy = y0 + (dy * d) / seg, u = (r() - 0.5) * BAND, v = (r() - 0.5) * 2;
          targets.push({ cx: cx, cy: cy, x: cx + nx * u + (dx / seg) * v, y: cy + ny * u + (dy / seg) * v, col: RGB[pick(fam, r)] });
        }
        carry = d - seg;
      }
    });
    // shuffle so particles cross the stage instead of sliding in order
    for (var j = targets.length - 1; j > 0; j--) { var q = Math.floor(r() * (j + 1)), tmp = targets[j]; targets[j] = targets[q]; targets[q] = tmp; }

    var strokes = [];
    def.g.forEach(function (g) {
      if (g.o === "rest") return;
      g.p.forEach(function (p) {
        var pts = densify(p);
        if (!pts.length) return;
        var closed = p[0] === "polygon" || p[0] === "rect" || p[0] === "circle";
        strokes.push({ path: toPath(pts, closed), len: Math.max(0.01, polyLen(pts)), col: RGB[g.c] || RGB.navy });
      });
    });
    return { targets: targets, strokes: strokes, s: s, ox: ox, oy: oy, t: def.t, sub: def.s };
  }

  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }

  /* ------------------------------- one stage ------------------------------ */
  function Stage(root) {
    var json = root.querySelector("script[type='application/json']");
    var canvas = root.querySelector("canvas"), ctx = canvas.getContext("2d");
    var cap = root.querySelector(".hero-motion__cap");
    var capT = cap.querySelector("strong"), capS = cap.querySelector("span");
    var defs = JSON.parse(json.textContent);
    var els = defs.map(prepare);
    var N = 0; els.forEach(function (e) { N = Math.max(N, e.photo ? PHOTO_N : e.targets.length); });
    var R = rng(4242), ps = [];

    function cloud() {
      var a = R() * Math.PI * 2, rr = 0.5 + 0.55 * Math.sqrt(R());
      return [W / 2 + Math.cos(a) * 300 * rr + (R() - 0.5) * 30, H / 2 + Math.sin(a) * 222 * rr + (R() - 0.5) * 30];
    }
    for (var i = 0; i < N; i++) {
      var c0 = cloud();
      ps.push({ x: c0[0], y: c0[1], sx: c0[0], sy: c0[1], tx: c0[0], ty: c0[1], col: RGB.blue.slice(), c0: RGB.blue, c1: RGB.blue, a: 0, a0: 0, a1: 0,
        r: 2.3 + R() * 1.4, delay: R() * 0.32, dur: 0.68 + R() * 0.3, ph: R() * 6.28, tg: null });
    }

    var k = 0, lt = 0, phase = -1, held = false, visible = true, running = false, last = 0, dpr = 1, size = 1;

    function caption(on) {
      if (on) { capT.textContent = els[k].t; capS.textContent = els[k].sub || ""; }
      cap.classList.toggle("is-out", !on);
    }
    function retarget(kind) {
      var e = els[k];
      ps.forEach(function (p, i) {
        p.sx = p.x; p.sy = p.y; p.c0 = p.col.slice(); p.a0 = p.a;
        var t = i < e.targets.length ? e.targets[i] : null;
        if (kind === "asm") {
          p.tg = t;
          if (t) { p.tx = t.x; p.ty = t.y; p.c1 = t.col; p.a1 = 1; }
          else { p.tx = p.x + (R() - 0.5) * 40; p.ty = p.y + (R() - 0.5) * 40; p.c1 = p.col; p.a1 = 0; }
        } else if (kind === "clr") {
          if (p.tg) { p.tx = p.tg.cx; p.ty = p.tg.cy; } else { p.tx = p.x; p.ty = p.y; }
          p.c1 = p.col; p.a1 = p.tg && !e.photo ? 0.1 : 0; // a faint dot texture under the clear drawing (photos: dots give way to the photo)
        } else { // dis
          var c = cloud(); p.tx = c[0]; p.ty = c[1]; p.c1 = p.col; p.a1 = p.tg ? 1 : 0.55;
        }
      });
    }
    function enter(ph) {
      phase = ph;
      if (ph === 0) retarget("asm");
      if (ph === 2) { retarget("clr"); caption(true); }
      if (ph === 4) { retarget("dis"); caption(false); }
    }
    // team photos: load, then sample into dots; if that photo is already assembling, steer the dots to it
    els.forEach(function (e, i) {
      if (!e.photo) return;
      var im = new Image();
      im.onload = function () {
        try { samplePhoto(e, im, N); } catch (err) { return; } // unreadable image: the element shows as a ring only
        e.img = im;
        if (i === k && phase <= 1) retarget("asm");
      };
      im.src = e.photo;
    });

    function resize() {
      var rect = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      size = canvas.width / W;
    }

    function tween(p, from, len) {
      var q = ease(clamp01((lt - from - p.delay * len) / (len * p.dur)));
      p.x = p.sx + (p.tx - p.sx) * q; p.y = p.sy + (p.ty - p.sy) * q;
      p.a = p.a0 + (p.a1 - p.a0) * q;
      p.col[0] = p.c0[0] + (p.c1[0] - p.c0[0]) * q; p.col[1] = p.c0[1] + (p.c1[1] - p.c0[1]) * q; p.col[2] = p.c0[2] + (p.c1[2] - p.c0[2]) * q;
    }

    function draw() {
      var e = els[k], time = performance.now() / 1000;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // particles
      var from = phase <= 1 ? 0 : phase <= 3 ? B : D, len = phase <= 1 ? T_ASM : phase <= 3 ? T_CLR : T_DIS;
      var wob = phase === 1 || phase === 3 ? 0.9 : 0;
      ctx.setTransform(size, 0, 0, size, 0, 0);
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        tween(p, from, len);
        if (p.a < 0.02) continue;
        var x = p.x, y = p.y;
        if (wob) { x += Math.sin(time * 1.7 + p.ph) * wob; y += Math.cos(time * 1.3 + p.ph) * wob; }
        ctx.globalAlpha = p.a;
        ctx.fillStyle = "rgb(" + (p.col[0] | 0) + "," + (p.col[1] | 0) + "," + (p.col[2] | 0) + ")";
        ctx.beginPath(); ctx.arc(x, y, p.r, 0, 6.2832); ctx.fill();
      }
      // clear drawing: draws in during CLEAR, holds, fades as it disperses
      var draw = phase === 2 ? clamp01((lt - B) / T_CLR) : phase === 3 ? 1 : phase === 4 ? 1 : 0;
      var alpha = phase === 2 ? clamp01((lt - B) / (T_CLR * 0.6)) : phase === 3 ? 1 : phase === 4 ? 1 - clamp01((lt - D) / 0.35) : 0;
      if (alpha > 0.01) {
        if (e.img) { // photo: fades in inside the circle, settling from a slight zoom
          var z = 1 + 0.06 * (1 - ease(draw)), sz = 2 * e.R * z;
          ctx.setTransform(size, 0, 0, size, 0, 0);
          ctx.save();
          ctx.beginPath(); ctx.arc(e.cx, e.cy, e.R, 0, 6.2832); ctx.clip();
          ctx.globalAlpha = alpha;
          ctx.drawImage(e.img, e.cx - sz / 2, e.cy - sz / 2, sz, sz);
          ctx.restore();
        }
        ctx.setTransform(size * e.s, 0, 0, size * e.s, size * e.ox, size * e.oy);
        ctx.lineWidth = CLEAR_W / e.s; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.globalAlpha = alpha;
        var q = ease(draw);
        e.strokes.forEach(function (st) {
          ctx.strokeStyle = "rgb(" + st.col.join(",") + ")";
          ctx.setLineDash([st.len, st.len]); ctx.lineDashOffset = st.len * (1 - q);
          ctx.stroke(st.path);
        });
        ctx.setLineDash([]);
      }
      ctx.globalAlpha = 1;
    }

    // reduced motion: crossfade between clear drawings, no flying particles
    function drawStill(alpha) {
      var e = els[k];
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (e.img) {
        ctx.setTransform(size, 0, 0, size, 0, 0);
        ctx.save(); ctx.globalAlpha = alpha;
        ctx.beginPath(); ctx.arc(e.cx, e.cy, e.R, 0, 6.2832); ctx.clip();
        ctx.drawImage(e.img, e.cx - e.R, e.cy - e.R, 2 * e.R, 2 * e.R);
        ctx.restore();
      }
      ctx.setTransform(size * e.s, 0, 0, size * e.s, size * e.ox, size * e.oy);
      ctx.lineWidth = CLEAR_W / e.s; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.globalAlpha = alpha;
      e.strokes.forEach(function (st) { ctx.strokeStyle = "rgb(" + st.col.join(",") + ")"; ctx.stroke(st.path); });
      ctx.globalAlpha = 1;
    }

    function frame(now) {
      if (!running) return;
      var dt = Math.min(0.05, (now - last) / 1000 || 0); last = now;
      if (reduce) {
        lt += held ? 0 : dt;
        if (lt > 5) { lt = 0; k = (k + 1) % els.length; caption(true); }
        drawStill(Math.min(1, lt / 0.6, (5 - lt) / 0.6));
      } else {
        // hover: rush to the clear state and hold it
        var speed = held && lt < C ? 2.6 : 1;
        lt += dt * speed;
        if (held && phase <= 3 && lt > D - 0.01) lt = D - 0.01; // mid-disperse: hold the next element instead
        if (lt >= E) { lt -= E; k = (k + 1) % els.length; phase = -1; }
        var ph = lt < A ? 0 : lt < B ? 1 : lt < C ? 2 : lt < D ? 3 : 4;
        if (ph !== phase) { if (phase === -1 && ph > 0) enter(0); enter(ph); }
        draw();
      }
      requestAnimationFrame(frame);
    }
    function start() { if (running || !visible) return; running = true; last = performance.now(); requestAnimationFrame(frame); }
    function stop() { running = false; }

    resize();
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas); else window.addEventListener("resize", resize);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); else stop(); }).observe(root);
    }
    var stage = root.querySelector(".hero-motion__stage");
    function hold(on) { held = on; root.classList.toggle("is-held", on); }
    stage.addEventListener("pointerenter", function (ev) { if (ev.pointerType !== "touch") hold(true); });
    stage.addEventListener("pointerleave", function (ev) { if (ev.pointerType !== "touch") hold(false); });
    stage.addEventListener("click", function () { hold(!held); }); // touch: tap to hold / release
    if (reduce) caption(true); else enter(0);
    start();
  }

  roots.forEach(function (r) { try { Stage(r); } catch (e) { if (window.console) console.warn("hero-motion:", e); } });
})();
