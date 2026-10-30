/* Kaizen Infotech — small vanilla interactions
   1. Mobile navigation toggle
   2. FAQ accordion
   3. Contact form (front-end only, no backend wired up)
   4. Pixelated photo thumbnails (Blog)                          */

(function () {
  "use strict";

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close the menu after tapping a link
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- FAQ accordion ---- */
  var faqButtons = document.querySelectorAll(".faq__q");
  faqButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq__item");
      var isOpen = item.classList.contains("is-open");
      // Close siblings for a clean single-open accordion
      var parent = item.parentElement;
      parent.querySelectorAll(".faq__item.is-open").forEach(function (open) {
        if (open !== item) {
          open.classList.remove("is-open");
          open.querySelector(".faq__q").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", !isOpen ? "true" : "false");
    });
  });

  /* ---- Contact form ----
     Not connected to a backend yet (see README). Until it is, we tell the
     visitor honestly and point them to email rather than pretending the
     message was sent.                                                    */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-note");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (note) {
        note.innerHTML =
          'Thanks! Online messages aren\'t switched on yet — please email us at ' +
          '<a href="mailto:promotion@kaizeninfotech.com">promotion@kaizeninfotech.com</a>.';
        note.hidden = false;
      }
    });
  }

  /* ---- Pixelated photo thumbnails ----
     For every [data-pixelate] frame, draw its photo onto a tiny canvas (one
     canvas pixel per block, cropped like object-fit: cover) and lay it over
     the photo, scaled up with hard edges. CSS fades it out on hover to reveal
     the clear photo. Works for any image the admin uploads — no build step.
     Block size comes from the frame's --pixel (CSS px), redrawn on resize.  */
  function pixelate(frame) {
    var img = frame.querySelector("img");
    if (!img) return;
    var canvas = document.createElement("canvas");
    canvas.className = "card__pixels";
    canvas.setAttribute("aria-hidden", "true");
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    function draw() {
      if (!img.naturalWidth) return;
      var w = frame.clientWidth, h = frame.clientHeight;
      if (!w || !h) return;
      var block = parseFloat(getComputedStyle(frame).getPropertyValue("--pixel")) || 7;
      var cols = Math.max(8, Math.round(w / block)), rows = Math.max(5, Math.round(h / block));
      // object-fit: cover crop of the source
      var s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      var sw = w / s, sh = h / s;
      var sx = (img.naturalWidth - sw) / 2, sy = (img.naturalHeight - sh) / 2;
      canvas.width = cols;
      canvas.height = rows;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high"; // average each block's colours
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      if (!canvas.parentNode) frame.appendChild(canvas);
    }
    if (img.complete) draw();
    img.addEventListener("load", draw);
    if ("ResizeObserver" in window) new ResizeObserver(draw).observe(frame);
    else window.addEventListener("resize", draw);
  }
  document.querySelectorAll("[data-pixelate]").forEach(pixelate);

  /* ---- Stats band: count each figure up once when it scrolls into view ----
     "3Mn+" → counts 0…3 and keeps the "Mn+" suffix. The final value is
     already in the HTML, so no-JS and reduced-motion visitors see it as is. */
  var nums = document.querySelectorAll("[data-count]");
  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (nums.length && !still && "IntersectionObserver" in window) {
    // Count one figure up (after an optional delay). While counting, the red
    // underline is hidden (.is-counting); when done it draws in (.is-counted).
    var countUp = function (el, delay) {
      var m = el.getAttribute("data-count").match(/^([0-9]+)(.*)$/);
      if (!m || el.classList.contains("is-counting")) return;
      var end = +m[1], suffix = m[2], t0 = null;
      el.classList.remove("is-counted");
      el.classList.add("is-counting");
      el.textContent = "0" + suffix;
      function tick(t) {
        if (t0 === null) t0 = t + (delay || 0);
        var p = Math.max(0, Math.min(1, (t - t0) / 1400)), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * e) + suffix;
        if (p < 1) return requestAnimationFrame(tick);
        el.classList.remove("is-counting");
        el.classList.add("is-counted");
      }
      requestAnimationFrame(tick);
    };
    var started = [];
    var startBand = function (band) {
      if (started.indexOf(band) > -1) return;
      started.push(band);
      band.querySelectorAll("[data-count]").forEach(function (el, i) { countUp(el, i * 150); }); // match the rise-in stagger
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { startBand(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    document.querySelectorAll(".stats").forEach(function (band) { io.observe(band); });

    // Micro-interactions per figure: cursor spotlight + click / tap replays the count
    document.querySelectorAll(".stats__item").forEach(function (item) {
      item.addEventListener("pointermove", function (e) {
        var r = item.getBoundingClientRect();
        item.style.setProperty("--mx", (e.clientX - r.left) + "px");
        item.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
      item.addEventListener("click", function () {
        var num = item.querySelector("[data-count]");
        if (!num) return;
        item.classList.remove("is-replay"); void item.offsetWidth; item.classList.add("is-replay");
        countUp(num, 0);
      });
      item.addEventListener("animationend", function () { item.classList.remove("is-replay"); });
    });
  }

  /* ---- Mark current year in footer ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
