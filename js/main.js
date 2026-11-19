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
          '<a href="mailto:mayuresh.joshi@kaizeninfotech.com">mayuresh.joshi@kaizeninfotech.com</a>.';
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

/* ---- Careers: application pop-up ----
   Every [data-apply] button/link opens the form; its value preselects the
   role. The form posts (multipart) to the OMS careers API at {api}/apply,
   guarded by the OMS image captcha from {api}/captcha. Each captcha code
   works once, so a fresh one is fetched after every attempt.
   No <dialog> support → the mailto links keep working as before.          */
(function () {
  "use strict";
  var dlg = document.getElementById("apply");
  if (!dlg || typeof dlg.showModal !== "function") return;

  var API = dlg.getAttribute("data-api");
  // OMS allows cross-site calls only from the live domain, so local previews go through serve.js
  if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) API = "/oms-careers";
  var EMAIL = dlg.getAttribute("data-email");
  var MAX_BYTES = 5242880, RESUME_EXT = /\.(pdf|docx?)$/i;

  var form = dlg.querySelector("[data-apply-form]");
  var done = dlg.querySelector(".apply__done");
  var status = form.querySelector(".apply__status"), submit = form.querySelector(".apply__submit");
  var file = form.elements.resume, drop = form.querySelector(".drop"), dropText = form.querySelector("[data-drop-text]");
  var capImg = form.querySelector("[data-captcha-img]"), capNew = form.querySelector("[data-captcha-new]");
  var capBox = form.querySelector(".captcha");
  var mailLink = '<a href="mailto:' + EMAIL + '">' + EMAIL + "</a>";
  var tried = false;

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function say(el, html) { el.innerHTML = html || ""; el.hidden = !html; }

  /* captcha */
  var capReq = 0;
  function loadCaptcha() {
    var id = ++capReq;
    capBox.classList.add("is-loading");
    form.elements.captchaToken.value = "";
    form.elements.captchaAnswer.value = "";
    return fetch(API + "/captcha", { headers: { Accept: "application/json" }, cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (id !== capReq) return;
        if (!j || !j.success || !j.data) throw new Error("captcha");
        capImg.src = j.data.image;
        capImg.hidden = false;
        form.elements.captchaToken.value = j.data.token;
      })
      .catch(function () {
        if (id !== capReq) return;
        capImg.hidden = true;
        setError("captchaAnswer", "We couldn’t load the verification code. Press the refresh button to try again.");
      })
      .then(function () { if (id === capReq) capBox.classList.remove("is-loading"); });
  }
  capNew.addEventListener("click", function () {
    setError("captchaAnswer", "");
    loadCaptcha().then(function () { form.elements.captchaAnswer.focus(); });
  });

  /* validation */
  var CHECKS = {
    fullName: function (v) { return v ? "" : "Please enter your full name."; },
    email: function (v) { return !v ? "Please enter your email address." : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address."; },
    phoneE164: function (v) { return !v ? "Please enter your phone number." : /^\+?[0-9]{6,15}$/.test(v.replace(/[\s()-]/g, "")) ? "" : "Enter a valid phone number, e.g. +91 98765 43210."; },
    location: function (v) { return v ? "" : "Please enter your current city and country."; },
    position: function (v) { return v ? "" : "Please choose the role you are applying for."; },
    resume: function () {
      var f = file.files[0];
      return !f ? "Please attach your resume." : !RESUME_EXT.test(f.name) ? "Upload a PDF, DOC or DOCX file." : f.size > MAX_BYTES ? "Your resume must be 5 MB or smaller." : "";
    },
    captchaAnswer: function (v) { return v ? "" : "Please type the code shown in the image."; },
  };
  function setError(name, msg) {
    var el = form.elements[name], field = el.closest(".field"), err = field.querySelector(".field__err");
    field.classList.toggle("is-invalid", !!msg);
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    err.id = err.id || "ap-err-" + name;
    var desc = (el.getAttribute("aria-describedby") || "").split(" ").filter(function (d) { return d && d !== err.id; });
    if (msg) desc.push(err.id);
    if (desc.length) el.setAttribute("aria-describedby", desc.join(" ")); else el.removeAttribute("aria-describedby");
    say(err, msg ? esc(msg) : "");
    return !msg;
  }
  function check(name) {
    var el = form.elements[name];
    return setError(name, CHECKS[name](el.type === "file" ? "" : el.value.trim()));
  }
  Object.keys(CHECKS).forEach(function (name) {
    var el = form.elements[name];
    el.addEventListener(el.tagName === "SELECT" || el.type === "file" ? "change" : "blur", function () { if (tried || el.value) check(name); });
    el.addEventListener("input", function () { if (tried) check(name); });
  });

  /* resume picker: show the chosen file; accept drag and drop */
  function showFile() {
    var f = file.files[0];
    drop.classList.toggle("has-file", !!f);
    dropText.innerHTML = f
      ? "<strong>" + esc(f.name) + "</strong> · " + (f.size / 1048576).toFixed(f.size < 104858 ? 2 : 1) + " MB · <u>change</u>"
      : "<strong>Choose a file</strong> or drag it here";
  }
  file.addEventListener("change", showFile);
  ["dragenter", "dragover"].forEach(function (t) { drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.add("is-over"); }); });
  ["dragleave", "drop"].forEach(function (t) { drop.addEventListener(t, function () { drop.classList.remove("is-over"); }); });
  drop.addEventListener("drop", function (e) {
    e.preventDefault();
    if (!e.dataTransfer || !e.dataTransfer.files.length) return;
    try { file.files = e.dataTransfer.files; } catch (_) { return; }
    file.dispatchEvent(new Event("change"));
  });

  /* open / close */
  function reset() {
    form.reset(); showFile(); tried = false;
    Object.keys(CHECKS).forEach(function (n) { setError(n, ""); });
    form.hidden = false; done.hidden = true;
  }
  function open(role) {
    if (!done.hidden) reset();
    say(status, "");
    var sel = form.elements.position;
    if (role) {
      var match = Array.prototype.filter.call(sel.options, function (o) { return o.value.toLowerCase() === role.toLowerCase(); })[0];
      sel.value = match ? match.value : "General Application";
    }
    dlg.showModal();
    form.elements.fullName.focus();
    loadCaptcha();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-apply]");
    if (!t) return;
    e.preventDefault();
    open(t.getAttribute("data-apply"));
  });
  dlg.addEventListener("click", function (e) {
    if (e.target === dlg || (e.target.closest && e.target.closest("[data-apply-close]"))) dlg.close();
  });

  /* submit */
  function busy(on) {
    submit.disabled = on;
    form.setAttribute("aria-busy", on ? "true" : "false");
    submit.textContent = on ? "Sending…" : "Submit Application";
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    tried = true;
    say(status, "");
    var bad = Object.keys(CHECKS).filter(function (n) { return !check(n); });
    if (bad.length) { form.elements[bad[0]].focus(); return; }
    var v = function (n) { return form.elements[n].value.trim(); };
    var fd = new FormData();
    fd.append("fullName", v("fullName"));
    fd.append("email", v("email"));
    fd.append("phoneE164", v("phoneE164").replace(/[\s()-]/g, ""));
    fd.append("position", v("position"));
    fd.append("currentLocation", v("location"));
    fd.append("resume", file.files[0], file.files[0].name);
    fd.append("honeypot", form.elements.honeypot.value);
    fd.append("captchaToken", form.elements.captchaToken.value);
    fd.append("captchaAnswer", v("captchaAnswer"));
    busy(true);
    fetch(API + "/apply", { method: "POST", body: fd })
      .then(function (r) { return r.status === 429 ? { success: false, error: { code: "careers_rate_limited", message: "Too many tries. Please try again in a little while." } } : r.json(); })
      .then(function (j) {
        if (j && j.success) {
          form.hidden = true; done.hidden = false;
          done.querySelector(".apply__title").focus();
          return;
        }
        var err = (j && j.error) || {};
        if (err.code === "careers_invalid_resume") { setError("resume", err.message || CHECKS.resume()); file.focus(); return; }
        if (/captcha/i.test(err.code || "")) { setError("captchaAnswer", err.message || "That code didn’t match. Please try the new code."); form.elements.captchaAnswer.focus(); return; }
        say(status, esc(err.message || "Something went wrong.") + " If it keeps happening, email your resume to " + mailLink + ".");
      })
      .catch(function () {
        say(status, "We couldn’t send your application. Please check your connection and try again, or email your resume to " + mailLink + ".");
      })
      .then(function () { busy(false); if (done.hidden) loadCaptcha(); }); // each code works once
  });
})();

/* ---- Home "Our Work": project index, driven by scroll ----
   Wide screens: the index pins under the header and the page scroll walks
   through the projects one by one (highlighted row + stage photo, counter,
   progress bar), then lets go. Screens too short to pin, phones, and
   reduced motion: the project nearest the middle of the screen is
   highlighted instead. Keyboard focus jumps to that project too. */
(function () {
  "use strict";
  var wrap = document.querySelector("[data-work-scroll]");
  var box = document.querySelector("[data-work-index]");
  if (!wrap || !box) return;
  var rows = Array.prototype.slice.call(box.querySelectorAll(".wi"));
  var slides = Array.prototype.slice.call(box.querySelectorAll(".ws__slide"));
  var now = box.querySelector("[data-ws-now]"), barBox = box.querySelector(".ws__bar");
  var header = document.querySelector(".site-header");
  var wide = window.matchMedia("(min-width: 961px)");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var n = rows.length, current = 0, pinned = false, step = 0, pinTop = 0, ticking = false;

  function show(i) {
    if (i === current) return;
    rows[current].classList.remove("is-active");
    rows[i].classList.add("is-active");
    slides.forEach(function (s) { s.classList.remove("is-prev"); });
    slides[current].classList.remove("is-active");
    slides[current].classList.add("is-prev");
    slides[i].classList.add("is-active");
    now.textContent = String(i + 1).padStart(2, "0");
    now.classList.remove("is-tick");
    void now.offsetWidth; // restart the tick animation
    now.classList.add("is-tick");
    current = i;
  }

  function layout() {
    pinned = false;
    wrap.style.height = "";
    box.classList.remove("is-pinned");
    box.style.top = "";
    if (reduce || !wide.matches) return update();
    var hh = header ? header.offsetHeight : 0, avail = window.innerHeight - hh, h = box.offsetHeight;
    if (h + 32 > avail) return update(); // too short to pin: follow the middle of the screen
    step = Math.max(200, Math.round(window.innerHeight * 0.42)); // scroll distance per project
    pinTop = hh + Math.round((avail - h) / 2);
    wrap.style.height = h + (n - 1) * step + "px";
    box.style.top = pinTop + "px";
    box.classList.add("is-pinned");
    pinned = true;
    update();
  }

  function update() {
    ticking = false;
    var p;
    if (pinned) {
      p = Math.min(n - 1, Math.max(0, (pinTop - wrap.getBoundingClientRect().top) / step));
      show(Math.min(n - 1, Math.round(p)));
      barBox.style.setProperty("--ws-p", ((p + 1) / n) * 100 + "%");
      return;
    }
    var mid = window.innerHeight * 0.5, best = 0, dist = Infinity;
    rows.forEach(function (row, i) {
      var r = row.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - mid);
      if (d < dist) { dist = d; best = i; }
    });
    show(best);
    barBox.style.setProperty("--ws-p", ((best + 1) / n) * 100 + "%");
  }

  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  var rt;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(layout, 150); });
  // keyboard: tabbing onto a project scrolls to its step, so scroll and highlight agree
  rows.forEach(function (row, i) {
    row.addEventListener("focusin", function () {
      if (!pinned) return show(i);
      var y = window.scrollY + wrap.getBoundingClientRect().top - pinTop + i * step;
      window.scrollTo({ top: y, behavior: "auto" });
    });
  });
  layout();
  window.addEventListener("load", layout); // photos and fonts can change the height
})();

/* ---- Home "How We Work": steps light up on scroll ----
   Wide screens: the section pins under the header while a line fills
   along the path and each step lights up as the line reaches it, then
   the page carries on. Too short to pin / small screens: each step
   lights up as it reaches the lower middle of the screen.
   Reduced motion: every step is shown lit, nothing moves. */
(function () {
  "use strict";
  var sec = document.querySelector("[data-steps-scroll]");
  if (!sec) return;
  var track = sec.querySelector(".steps-scroll__track"), pin = sec.querySelector(".steps-scroll__pin");
  var list = sec.querySelector(".steps"), items = Array.prototype.slice.call(list.querySelectorAll(".step"));
  var header = document.querySelector(".site-header");
  var wide = window.matchMedia("(min-width: 961px)");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var n = items.length, pinned = false, dist = 0, top = 0, ticking = false;
  sec.classList.add("is-scrolly");

  function light(count, p) {
    items.forEach(function (it, i) {
      it.classList.toggle("is-on", i < count);
      it.classList.toggle("is-current", i === count - 1);
    });
    list.style.setProperty("--p", p.toFixed(4));
  }
  function layout() {
    pinned = false;
    track.style.height = "";
    pin.style.top = "";
    sec.classList.remove("is-pinned");
    if (wide.matches) {
      var hh = header ? header.offsetHeight : 0, avail = window.innerHeight - hh, h = pin.offsetHeight;
      if (h + 32 <= avail) {
        dist = Math.round(window.innerHeight * 0.3) * (n - 1); // scroll distance from first step to last
        top = hh + Math.round((avail - h) / 2);
        track.style.height = h + dist + "px";
        pin.style.top = top + "px";
        sec.classList.add("is-pinned");
        pinned = true;
      }
    }
    update();
  }
  function update() {
    ticking = false;
    if (pinned) {
      var p = Math.min(1, Math.max(0, (top - track.getBoundingClientRect().top) / dist));
      // step k lights when the line reaches it; the first is lit once the section is in place
      var count = track.getBoundingClientRect().top <= top + 1 ? Math.min(n, Math.floor(p * (n - 1) + 0.15) + 1) : 0; // lights just as the line arrives
      light(count, p);
      return;
    }
    var line = window.innerHeight * 0.72, count = 0;
    items.forEach(function (it, i) { if (it.getBoundingClientRect().top < line) count = i + 1; });
    light(count, n > 1 ? Math.max(0, count - 1) / (n - 1) : 1);
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  var rt;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(layout, 150); });
  layout();
  window.addEventListener("load", layout);
})();
