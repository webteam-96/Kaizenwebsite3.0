/* Kaizen Infotech — scroll animations + micro-interactions (every page)

   1. Scroll reveal: containers animate in once as they enter the viewport.
      Elements are picked by selector (no markup changes needed); siblings
      in a grid/list get a staggered delay. Reveals use the CSS `translate`
      and `opacity` properties, so they never fight hover `transform`s.
   2. Scroll progress bar, header shadow on scroll, back-to-top button.
   3. Button ripple, card tilt toward the pointer, hero parallax.
   4. Form: invalid submit shakes and focuses the first empty field.

   No JS → nothing is hidden. prefers-reduced-motion → no animation at all. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches;
  var root = document.documentElement;

  /* ---------------------------------------------------------- 1. reveal */
  // [selector, variant, stagger siblings?]
  var TARGETS = [
    [".hero-motion, .hero__art", "zoom", false],
    [".breadcrumb, .eyebrow, .hero__title, .hero__text, .hero .btn-row, .page-hero .btn-row", "up", false],
    [".section-title, .cta__title, .cta__text, .cta .btn-row, .section-more", "up", false],
    [".lead, .prose", "up", false],
    [".clients li", "pop", true],
    [".stats__item", "up", true],
    [".work-showcase__intro, .work-showcase__all", "up", false],
    [".work-card", "wipe", true],
    [".case__media", "wipe", false],
    [".case__body > *", "up", true],
    [".card:not(.hscroll .card)", "rise", true], // the products scroller runs its own entrance (section 5)
    [".feature", "rise", true],
    [".step", "rise", true],
    [".tech__tile", "pop", true],
    [".row-card", "left", true],
    [".faq__item", "up", true],
    [".checklist li", "left", true],
    [".field, .contact-grid form > .btn, .info-list li", "up", true],
    [".footer__grid > *", "up", true],
    [".footer__bottom", "up", false],
  ];

  if (!reduce && "IntersectionObserver" in window) {
    var seen = [];
    TARGETS.forEach(function (t) {
      document.querySelectorAll(t[0]).forEach(function (el) {
        if (el.hasAttribute("data-reveal")) return;
        el.setAttribute("data-reveal", t[1]);
        if (t[2]) { // stagger by position among same-kind siblings
          var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.matches(t[0]); });
          el.style.setProperty("--reveal-delay", Math.min(sibs.indexOf(el), 8) * 90 + "ms");
        }
        seen.push(el);
      });
    });
    var reveal = function (el) {
      if (el.classList.contains("is-in") || !el.hasAttribute("data-reveal")) return;
      el.classList.add("is-in");
      io.unobserve(el);
        // once it has arrived, drop the reveal state so the element's own
        // hover transitions (lift, tilt, shift) apply again untouched
        var wait = (parseFloat(el.style.getPropertyValue("--reveal-delay")) || 0) + (el.getAttribute("data-reveal") === "wipe" ? 1500 : 800); // wipe + photo settle run longer
      setTimeout(function () { el.removeAttribute("data-reveal"); el.classList.remove("is-in"); el.style.removeProperty("--reveal-delay"); }, wait);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) reveal(en.target); });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    seen.forEach(function (el) { io.observe(el); });
    root.classList.add("has-reveal");
    // Safety net: anything on screen is revealed even if the observer misses it
    var sweep = function () {
      var h = window.innerHeight;
      seen.forEach(function (el) {
        if (el.classList.contains("is-in") || !el.hasAttribute("data-reveal")) return;
        var r = el.getBoundingClientRect();
        if (r.top < h * 0.94 && r.bottom > 0) reveal(el);
      });
    };
    window.addEventListener("scroll", function () { requestAnimationFrame(sweep); }, { passive: true });
    window.addEventListener("load", sweep);
    setTimeout(sweep, 600);
  }

  /* ----------------------- 2. progress bar, header state, back-to-top */
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);

  var top = document.createElement("button");
  top.className = "to-top";
  top.type = "button";
  top.setAttribute("aria-label", "Back to top");
  top.innerHTML = '<svg viewBox="0 0 44 44" aria-hidden="true"><circle class="to-top__track" cx="22" cy="22" r="20"/><circle class="to-top__ring" cx="22" cy="22" r="20" pathLength="1"/><path d="M15 25 L22 18 L29 25"/></svg>';
  top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  document.body.appendChild(top);

  var header = document.querySelector(".site-header");
  var heroArt = document.querySelector(".hero-motion__stage"); // inner stage: the outer .hero-motion carries the reveal
  var workFrames = Array.prototype.slice.call(document.querySelectorAll(".work-card__frame, .case__frame"));
  var ticking = false;
  function onScroll() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, y / max) : 0;
    bar.style.transform = "scaleX(" + p + ")";
    top.style.setProperty("--p", p);
    top.classList.toggle("is-shown", y > window.innerHeight * 0.6);
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (heroArt && !reduce && y < window.innerHeight * 1.2) heroArt.style.setProperty("--parallax", (y * 0.08).toFixed(1) + "px");
    // Our Work: photos drift slightly against the scroll inside their cards
    if (!reduce) workFrames.forEach(function (f) {
      var r = f.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var off = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight; // −1…1
      f.style.setProperty("--py", (off * -r.height * 0.06).toFixed(1) + "px");
    });
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ------------------------------------------------- 3. button ripple */
  document.addEventListener("pointerdown", function (e) {
    var btn = e.target.closest && e.target.closest(".btn");
    if (!btn || reduce) return;
    var r = btn.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2.2;
    var dot = document.createElement("span");
    dot.className = "ripple";
    dot.style.cssText = "width:" + s + "px;height:" + s + "px;left:" + (e.clientX - r.left - s / 2) + "px;top:" + (e.clientY - r.top - s / 2) + "px";
    btn.appendChild(dot);
    dot.addEventListener("animationend", function () { dot.remove(); });
  });

  /* -------------------------------- card tilt toward the pointer (mouse) */
  if (finePointer && !reduce) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", (x * 6).toFixed(2) + "deg");
        card.style.setProperty("--rx", (-y * 6).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () { card.style.removeProperty("--rx"); card.style.removeProperty("--ry"); });
    });
  }

  /* ---------- Work page case studies ---------- */
  document.querySelectorAll(".case").forEach(function (row) {
    var media = row.querySelector(".case__media");
    if (!media) return;
    // the "View" badge follows the cursor over the photo
    media.addEventListener("pointermove", function (e) {
      var r = media.getBoundingClientRect();
      media.style.setProperty("--vx", (e.clientX - r.left) + "px");
      media.style.setProperty("--vy", (e.clientY - r.top) + "px");
    });
  });

  /* --------------------------- 4. form: shake + focus first empty field */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function () {
      if (form.checkValidity()) return;
      var bad = form.querySelector(":invalid");
      if (!reduce) { form.classList.remove("is-shake"); void form.offsetWidth; form.classList.add("is-shake"); }
      if (bad) bad.focus();
    }, true);
    form.addEventListener("animationend", function () { form.classList.remove("is-shake"); });
  }
  /* ------------- 5. home "Our Products": scroll-driven horizontal row */
  // The section is made tall enough that scrolling down through it slides
  // the row from its first card to its last while the row stays pinned.
  // Position and card scale are eased toward their targets every frame,
  // so growing into the centre and shrinking out of it are equally smooth.
  document.querySelectorAll("[data-hscroll]").forEach(function (sec) {
    if (reduce) return; // keep the plain swipeable row
    var pin = sec.querySelector(".hscroll__pin");
    var viewport = sec.querySelector(".hscroll__viewport");
    var track = sec.querySelector(".hscroll__track");
    var cards = Array.prototype.slice.call(track.children);
    if (!pin || !cards.length) return;
    var MAX = 0.12; // centre card grows 12%

    var dots = document.createElement("div");
    dots.className = "hscroll__dots";
    dots.setAttribute("aria-hidden", "true");
    dots.innerHTML = cards.map(function () { return "<span></span>"; }).join("");
    viewport.after(dots);
    var dotEls = Array.prototype.slice.call(dots.children);

    var dist = 0, top = 0, cur = 0, target = 0, scales = cards.map(function () { return 1; });
    var pinned = false, running = false, step = 0;

    function layout() {
      var hh = header ? header.offsetHeight : 0;
      var avail = window.innerHeight - hh;
      sec.classList.remove("is-pinned");
      sec.style.height = "";
      sec.style.removeProperty("--hs-w");
      pin.style.cssText = "";
      // size the cards to the screen: grow them into ~60% of the spare height
      // (the rest stays as breathing room), or shrink them until the block fits
      var PAD = 24; // the pinned block's own top + bottom padding
      var w = cards[0].offsetWidth, slack = avail - PAD - pin.offsetHeight;
      var fitW = slack > 0
        ? Math.max(w, Math.min(360, window.innerWidth * 0.3, w + (slack * 0.6) / 0.75))
        : Math.max(Math.min(w, window.innerWidth > 760 ? 250 : 220), w + slack / 0.75 - 4); // card height ≈ 0.75 × width + body
      if (Math.abs(fitW - w) > 4) sec.style.setProperty("--hs-w", Math.round(fitW) + "px");
      // the larger ghost title must break onto the same lines as the bold one;
      // at a few widths it wraps one line more, so nudge the width a few px
      var lines = function (el) { return Math.round(el.offsetHeight / (parseFloat(getComputedStyle(el).fontSize) * 1.2)); };
      var ghostsOk = function () {
        return Array.prototype.every.call(sec.querySelectorAll(".card__titles"), function (t) {
          var g = t.querySelector(".card__ghost"), b = t.querySelector(".card__title");
          return !g || !b || lines(g) === lines(b);
        });
      };
      var base = cards[0].offsetWidth;
      for (var n = 1; n <= 16 && !ghostsOk(); n++) sec.style.setProperty("--hs-w", base + (n % 2 ? -1 : 1) * 2 * Math.ceil(n / 2) + "px");
      if (!ghostsOk()) sec.style.setProperty("--hs-w", base + "px");
      // On short screens the block is taller than the space under the header:
      // it then pins a little higher, so the heading tucks under the header
      // while the cards slide. Too short even for that → leave the swipe row.
      var need = pin.offsetHeight + PAD, over = Math.max(0, need - avail);
      pinned = over <= pin.firstElementChild.offsetHeight;
      if (!pinned) { track.style.transform = ""; cards.forEach(function (c) { c.style.scale = ""; c.classList.add("is-shown"); }); return; }
      sec.classList.add("is-pinned");
      viewport.scrollLeft = 0;
      var pinH = Math.max(avail, need);
      top = hh - over;
      pin.style.top = top + "px";
      pin.style.height = pinH + "px";
      var c0 = cards[0], cl = cards[cards.length - 1];
      step = cards.length > 1 ? cards[1].offsetLeft - c0.offsetLeft : 1;
      dist = Math.max(0, cl.offsetLeft - c0.offsetLeft); // first card centred → last card centred
      sec.style.height = pinH + dist + "px";
      measure();
      cur = target;
      render();
    }
    function measure() {
      var p = dist ? Math.min(1, Math.max(0, (top - sec.getBoundingClientRect().top) / dist)) : 0;
      target = -p * dist;
    }
    function render() {
      track.style.transform = "translate3d(" + cur.toFixed(2) + "px,0,0)";
      var mid = pin.clientWidth / 2, vw = pin.clientWidth, settled = true, best = 0, bestK = -1;
      cards.forEach(function (c, i) {
        var left = c.offsetLeft + cur, w = c.offsetWidth;
        var d = Math.abs(left + w / 2 - mid) / step; // 0 at centre, 1 one card away
        var k = Math.max(0, 1 - d);
        k = k * k * (3 - 2 * k); // smoothstep: eases in and out of the peak
        var s = 1 + MAX * k;
        scales[i] += (s - scales[i]) * 0.2;
        if (Math.abs(s - scales[i]) > 0.0005) settled = false; else scales[i] = s;
        c.style.scale = scales[i].toFixed(4);
        c.classList.toggle("is-center", k > 0.55);
        if (k > bestK) { bestK = k; best = i; }
        if (left < vw * 0.92 && left + w > vw * 0.08) c.classList.add("is-shown");
      });
      dotEls.forEach(function (dEl, i) { dEl.classList.toggle("is-on", i === best); });
      return settled;
    }
    function tick() {
      cur += (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.1) cur = target;
      var settled = render();
      if (cur !== target || !settled) requestAnimationFrame(tick); else running = false;
    }
    function wake() {
      if (!pinned) return;
      measure();
      if (!running) { running = true; requestAnimationFrame(tick); }
    }
    window.addEventListener("scroll", wake, { passive: true });
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(layout, 150); });
    window.addEventListener("load", layout);
    layout();

    // keyboard: tabbing to a card scrolls the page so that card is centred
    cards.forEach(function (c, i) {
      c.addEventListener("focus", function () {
        if (!pinned) return;
        var y = window.scrollY + sec.getBoundingClientRect().top - top + (cards.length > 1 ? dist * i / (cards.length - 1) : 0);
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  });
})();
