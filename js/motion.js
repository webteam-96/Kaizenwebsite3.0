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
    [".card", "rise", true],
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
})();
