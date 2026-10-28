/* =====================================================================
   Kaizen Infotech — static site generator
   Writes plain HTML pages that share one <head>, header and footer.

   Run from this folder:   node build.js
   Then preview:           node serve.js   → http://localhost:8099

   Edit content/structure here, not in the generated .html files —
   they are overwritten on every build.
   ===================================================================== */
const fs = require("fs");
const IL = require("./illus.js"); // line-art illustration elements (What We Do)
const HERO = require("./hero.js"); // hero motion graphics: which elements each page shows
const path = require("path");

const OUT = __dirname;

/* ---------------------------------------------------------------------
   Placeholder copy (Lorem ipsum). Several variants so repeated slots
   don't all read the same sentence. Swap for real content later.
   --------------------------------------------------------------------- */
const L = {
  para:
    "Lorem ipsum dolor sit amet consectetur. Et ultrices laoreet mi curabitur amet eu elit posuere in. Morbi sit amet lorem gravida. Arcu facilisi sit eget vitae elit in. Velit aliquet interdum morbi ipsum quis laoreet parturient. Pellentesque et risus pulvinar neque sed diam amet euismod. Vitae fringilla habitant tellus neque at at laoreet nullam. Velit turpis neque orci adipiscing urna. Sodales tortor rhoncus massa velit convallis felis consequat turpis lacus.",
  para2:
    "Turpis massa massa turpis a duis eu nulla quisque ullamcorper. Urna et nunc eget integer ut velit et velit dignissim. Sed massa eget venenatis eget quis nisl sed. Ut enim egestas sit quis. Platea felis sed mollis at quam. Risus nunc sed ornare aliquet suspendisse.",
  tiny:
    "Lorem ipsum dolor sit amet consectetur. Aliquet amet fermentum viverra lacinia proin sit lobortis.",
};

// Short blurbs — feature cells, card descriptions, list rows
const SHORT = [
  "Lorem ipsum dolor sit amet consectetur. Aliquet amet fermentum viverra lacinia proin sit lobortis.",
  "Et ultrices laoreet mi curabitur amet eu elit posuere in. Morbi sit amet lorem gravida.",
  "Arcu facilisi sit eget vitae elit in. Velit aliquet interdum morbi ipsum quis laoreet.",
  "Pellentesque et risus pulvinar neque sed diam amet euismod. Vitae fringilla habitant tellus.",
  "Velit turpis neque orci adipiscing urna. Sodales tortor rhoncus massa velit convallis.",
  "Turpis massa turpis a duis eu nulla quisque. Urna et nunc eget integer ut velit.",
  "Sed massa eget venenatis eget quis nisl sed. Ut enim egestas sit quis platea felis.",
  "Risus nunc sed ornare aliquet suspendisse. Orci turpis euismod tellus volutpat ultricies.",
];

// Longer lines — "What We Deliver" items and FAQ answers
const LINES = [
  "Lorem ipsum dolor sit amet consectetur. Et ultrices laoreet mi curabitur amet eu elit posuere in. Morbi sit amet lorem gravida.",
  "Arcu facilisi sit eget vitae elit in. Velit aliquet interdum morbi ipsum quis laoreet parturient pellentesque et risus.",
  "Pulvinar neque sed diam amet euismod. Vitae fringilla habitant tellus neque at laoreet nullam velit turpis.",
  "Neque orci adipiscing urna sodales tortor rhoncus massa. Velit convallis felis consequat turpis lacus massa.",
  "Turpis a duis eu nulla quisque ullamcorper. Urna et nunc eget integer ut velit et velit dignissim sed massa.",
];

// Card bullet points
const BULLETS = [
  "Lorem ipsum dolor sit amet consectetur.",
  "Aliquet amet fermentum viverra lacinia.",
  "Proin sit lobortis fringilla orci turpis.",
  "Euismod tellus volutpat ultricies amet.",
];

const FAQ_Q = [
  "Lorem ipsum dolor sit amet consectetur — et ultrices laoreet mi curabitur amet eu elit posuere?",
  "Morbi sit amet lorem gravida arcu facilisi sit eget vitae elit in velit aliquet interdum?",
  "Pellentesque et risus pulvinar neque sed diam amet euismod vitae fringilla habitant?",
  "Velit turpis neque orci adipiscing urna sodales tortor rhoncus massa velit convallis?",
];

/* ---------------------------------------------------------------------
   Services — slug, title, ghost word, Figma illustration, icon
   --------------------------------------------------------------------- */
const services = [
  // illus = the line-art element (illustrations/<illus>.js) that depicts this service in What We Do
  { slug: "custom-software-development", title: "Custom Software Development", ghost: "Custom Software", img: "illustration-software.png", icon: "code", illus: "software" },
  { slug: "mobile-app-development", title: "Mobile App Development", ghost: "Mobile Apps", img: "illustration-hardware.png", icon: "mobile", illus: "mobile" },
  // card art differs from the hero so it never sits next to its twin (Enterprise Web Portals)
  { slug: "event-management", title: "Event Registration &amp; Management", ghost: "Event Systems", img: "illustration-web.png", art: "illustration-marketing.png", icon: "calendar", illus: "event" },
  { slug: "enterprise-web-portals", title: "Enterprise Web Portals &amp; Websites", ghost: "Web Portals", img: "illustration-web.png", icon: "globe", illus: "web" },
  { slug: "digital-marketing", title: "Digital Marketing Services", ghost: "Digital Marketing", img: "illustration-marketing.png", icon: "megaphone", illus: "marketing" },
];

const nav = [
  ["index.html", "Home", "home"],
  ["about.html", "About", "about"],
  ["services.html", "Services", "services"],
  ["work.html", "Work", "work"],
  ["blog.html", "Blog", "blog"],
  ["careers.html", "Careers", "careers"],
  ["contact.html", "Contact", "contact"],
];

const plain = (s) => s.replace(/&amp;/g, "&");

/* =====================================================================
   ICONS — hand-authored line art on a 48×48 grid.
   Geometry only: no stroke/fill attributes. The .picon component in
   css/style.css renders every icon the same way —
     rest  → pixelated dots (visible, legible)
     hover → one clean line that draws in
   Add an icon: add geometry here, then call picon("name").
   ===================================================================== */
const ICONS = {
  code: '<polyline points="19,18 11,24 19,30"/><polyline points="29,18 37,24 29,30"/><line x1="27" y1="15" x2="21" y2="33"/>',
  mobile: '<rect x="16" y="8" width="16" height="32" rx="3"/><line x1="21" y1="35" x2="27" y2="35"/><line x1="21" y1="12" x2="27" y2="12"/>',
  calendar: '<rect x="9" y="13" width="30" height="27" rx="3"/><line x1="9" y1="21" x2="39" y2="21"/><line x1="17" y1="9" x2="17" y2="16"/><line x1="31" y1="9" x2="31" y2="16"/><line x1="16" y1="28" x2="24" y2="28"/><line x1="16" y1="34" x2="32" y2="34"/>',
  globe: '<circle cx="24" cy="24" r="15"/><line x1="9" y1="24" x2="39" y2="24"/><ellipse cx="24" cy="24" rx="6" ry="15"/><path d="M13 15 H35"/><path d="M13 33 H35"/>',
  megaphone: '<path d="M11 21 L27 15 V33 L11 27 Z"/><path d="M11 21 H8 V27 H11"/><line x1="18" y1="30" x2="18" y2="37"/><line x1="31" y1="18" x2="35" y2="16"/><line x1="31" y1="24" x2="36" y2="24"/><line x1="31" y1="30" x2="35" y2="32"/>',
  chip: '<rect x="17" y="17" width="14" height="14" rx="1.5"/><rect x="22" y="22" width="4" height="4"/><line x1="20" y1="17" x2="20" y2="12"/><line x1="28" y1="17" x2="28" y2="12"/><line x1="20" y1="31" x2="20" y2="36"/><line x1="28" y1="31" x2="28" y2="36"/><line x1="17" y1="20" x2="12" y2="20"/><line x1="17" y1="28" x2="12" y2="28"/><line x1="31" y1="20" x2="36" y2="20"/><line x1="31" y1="28" x2="36" y2="28"/>',
  gear: '<circle cx="24" cy="24" r="11"/><circle cx="24" cy="24" r="5"/><line x1="35" y1="24" x2="39" y2="24"/><line x1="24" y1="35" x2="24" y2="39"/><line x1="13" y1="24" x2="9" y2="24"/><line x1="24" y1="13" x2="24" y2="9"/><line x1="31.8" y1="31.8" x2="34.6" y2="34.6"/><line x1="16.2" y1="31.8" x2="13.4" y2="34.6"/><line x1="16.2" y1="16.2" x2="13.4" y2="13.4"/><line x1="31.8" y1="16.2" x2="34.6" y2="13.4"/>',
  shield: '<path d="M24 8 L38 14 V24 C38 33 32 38 24 41 C16 38 10 33 10 24 V14 Z"/><polyline points="18,24 22,28 30,19"/>',
  chart: '<line x1="11" y1="37" x2="37" y2="37"/><line x1="11" y1="11" x2="11" y2="37"/><rect x="15" y="26" width="5" height="11"/><rect x="22" y="20" width="5" height="17"/><rect x="29" y="14" width="5" height="23"/>',
  cloud: '<path d="M17 33 A8 8 0 0 1 18 17 A10 10 0 0 1 35 21 A6 6 0 0 1 34 33 Z"/>',
  database: '<ellipse cx="24" cy="14" rx="12" ry="5"/><path d="M12 14 V34 A12 5 0 0 0 36 34 V14"/><path d="M12 24 A12 5 0 0 0 36 24"/>',
  rocket: '<path d="M24 8 C30 15 31 23 29 32 H19 C17 23 18 15 24 8 Z"/><circle cx="24" cy="20" r="3"/><path d="M19 29 L14 34 L19 32"/><path d="M29 29 L34 34 L29 32"/><path d="M21 32 L24 39 L27 32"/>',
  users: '<circle cx="19" cy="19" r="5"/><path d="M11 34 A8 8 0 0 1 27 34"/><circle cx="32" cy="20" r="4"/><path d="M29 30 A7 7 0 0 1 38 34"/>',
  bulb: '<path d="M24 8 A10 10 0 0 1 30 26 C29 28 28 29 28 31 H20 C20 29 19 28 18 26 A10 10 0 0 1 24 8 Z"/><line x1="21" y1="35" x2="27" y2="35"/><line x1="22" y1="39" x2="26" y2="39"/>',
  mail: '<rect x="8" y="13" width="32" height="22" rx="3"/><polyline points="9,15 24,26 39,15"/>',
  pin: '<path d="M24 41 C24 41 12 29.5 12 20 A12 12 0 0 1 36 20 C36 29.5 24 41 24 41 Z"/><circle cx="24" cy="20" r="4.5"/>',
  pen: '<path d="M31 9 L39 17 L18 38 L9 39 L10 30 Z"/><line x1="27" y1="13" x2="35" y2="21"/>',
  article: '<rect x="11" y="8" width="26" height="32" rx="3"/><line x1="16" y1="16" x2="32" y2="16"/><line x1="16" y1="22" x2="32" y2="22"/><line x1="16" y1="28" x2="27" y2="28"/>',
};

function iconDefs() {
  const symbols = Object.entries(ICONS)
    .map(([k, g]) => `<symbol id="ic-${k}" viewBox="0 0 48 48">${g}</symbol>`)
    .join("");
  return `  <svg class="picon-defs" aria-hidden="true" focusable="false"><defs>${symbols}</defs></svg>`;
}

// The one icon component. Same markup everywhere → same behaviour everywhere.
// Icons with a multi-colour element (illustrations/icons/<name>.js) render it —
// the same rest-dots / hover-lines standard as the card elements. Others fall
// back to the single-colour line icon above.
const hasIconElement = (name) => fs.existsSync(`${__dirname}/illustrations/icons/${name}.js`);
function picon(name) {
  if (hasIconElement(name)) return `<span class="picon picon--el" aria-hidden="true">${IL.illusSVG(IL.loadIllus(`icons/${name}`))}</span>`;
  if (!ICONS[name]) throw new Error(`Unknown icon "${name}"`);
  return `<span class="picon" aria-hidden="true"><svg viewBox="0 0 48 48"><use class="picon__dots" href="#ic-${name}"></use><use class="picon__line" href="#ic-${name}"></use></svg></span>`;
}

/* =====================================================================
   Shared chrome
   ===================================================================== */
function head(title, desc) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} | Kaizen Infotech Solutions</title>
  <meta name="description" content="${desc}" />
  <link rel="icon" href="assets/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
${iconDefs()}`;
}

function header(active) {
  const links = nav
    .map(
      ([href, label, key]) =>
        `        <li><a href="${href}"${key === active ? ' aria-current="page"' : ""}>${label}</a></li>`
    )
    .join("\n");
  return `  <header class="site-header">
    <div class="container nav">
      <a class="nav__logo" href="index.html" aria-label="Kaizen Infotech — home">
        <img src="assets/logo.png" alt="Kaizen Infotech Solutions" />
      </a>
      <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav__links" id="nav-links">
${links}
      </ul>
    </div>
  </header>`;
}

function footer() {
  return `  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__logo">
          <img src="assets/logo-footer.png" alt="Kaizen Infotech Solutions Pvt. Ltd." />
        </div>
        <div class="footer__col">
          <h4>COMPANY</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="work.html">Our Work</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4>SERVICES</h4>
          <ul>
            <li><a href="custom-software-development.html">Custom Software Development</a></li>
            <li><a href="mobile-app-development.html">Mobile App Development</a></li>
            <li><a href="event-management.html">Event Management Systems</a></li>
            <li><a href="enterprise-web-portals.html">Enterprise Web Portals</a></li>
            <li><a href="digital-marketing.html">Digital Marketing</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4>RESOURCES</h4>
          <ul>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="work.html">Case Studies</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4>GET IN TOUCH</h4>
          <ul>
            <li><a href="mailto:communication@kaizeninfotech.com">communication@kaizeninfotech.com</a></li>
            <li><a href="tel:+919372430855">+91 93724 30855</a></li>
            <li>Thane West, Thane,<br />Maharashtra 400604</li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© <span data-year>2026</span> Kaizen Infotech Solutions Pvt. Ltd. All rights reserved.</span>
        <span>Solve real business problems. Deliver measurable results.</span>
      </div>
    </div>
  </footer>
  <script src="js/main.js"></script>
  <script src="js/hero-motion.js"></script>
  <script src="js/motion.js"></script>
</body>
</html>`;
}

/* =====================================================================
   Sections (all existing components — no new designs)
   ===================================================================== */

// Hero motion graphic: canvas stage + caption + the page's elements as JSON.
function heroMotion(page, label) {
  const LT = String.fromCharCode(92) + "u003c"; // the JSON escape for "<" — never "</script>" inside the JSON
  const json = JSON.stringify(HERO.heroData(page)).split("<").join(LT);
  return `<div class="hero-motion" data-hero-motion>
        <div class="hero-motion__stage" role="img" aria-label="${label}"><canvas></canvas></div>
        <p class="hero-motion__cap is-out" aria-hidden="true"><strong></strong><span></span></p>
        <script type="application/json">${json}</script>
      </div>`;
}

// Centered page intro. `crumb` = [parentLabel, parentHref|null] or undefined.
// A null href renders the parent as plain text (e.g. "Company" has no page).
// `motion` = a hero.js set name: the hero becomes the Figma art + text layout
// with that page's motion graphic in the art slot.
function pageHero({ crumb, current, eyebrow, title, text, buttons, motion, motionLabel }) {
  const parent = crumb
    ? crumb[1]
      ? `<a class="light" href="${crumb[1]}">${crumb[0]} /</a> `
      : `<span class="light">${crumb[0]} /</span> `
    : "";
  const bc = current
    ? `      <p class="breadcrumb" style="text-align:center">${parent}<span class="current">${current}</span></p>\n`
    : "";
  const eb = eyebrow ? `      <p class="eyebrow">${eyebrow}</p>\n` : "";
  const btns = buttons
    ? `\n      <div class="btn-row" style="margin-top:32px">\n${buttons
        .map(([cls, href, label]) => `        <a class="btn ${cls}" href="${href}">${label}</a>`)
        .join("\n")}\n      </div>`
    : "";
  if (motion) {
    return `    <section class="container hero hero--motion">
      ${heroMotion(motion, motionLabel || title.replace(/<[^>]+>/g, " "))}
      <div>
${bc.replace(' style="text-align:center"', "")}${eb}      <h1 class="hero__title">${title}</h1>
      <p class="hero__text">${text}</p>${btns}
      </div>
    </section>`;
  }
  return `    <section class="container page-hero">
${bc}${eb}      <h1 class="hero__title">${title}</h1>
      <p class="hero__text">${text}</p>${btns}
    </section>`;
}

function overviewBand(title, ...paras) {
  return `  <section class="section band-navy">
    <div class="container stack-40" style="align-items:center;text-align:center;max-width:1250px">
      <h2 class="section-title section-title--center">${title}</h2>
      <div class="prose lead lead--justify" style="max-width:1080px">
        ${paras.map((p) => `<p>${p}</p>`).join("\n        ")}
      </div>
    </div>
  </section>`;
}

function checklist(title, count = 5) {
  const items = Array.from({ length: count }, (_, i) => `<li>${LINES[i % LINES.length]}</li>`).join("\n        ");
  return `  <section class="section">
    <div class="container" style="max-width:1250px">
      <h2 class="section-title">${title}</h2>
      <ul class="checklist">
        ${items}
      </ul>
    </div>
  </section>`;
}

const TECH_DEFAULT = [
  ["code", "Engineering"],
  ["cloud", "Cloud"],
  ["database", "Data"],
  ["gear", "DevOps"],
  ["chart", "Analytics"],
];

function techStrip(set = TECH_DEFAULT) {
  const tiles = set
    .map(
      ([icon, label]) => `        <div class="tech__tile">
          <div class="tech__disc">${picon(icon)}</div>
          <span class="tech__label">${label}</span>
        </div>`
    )
    .join("\n");
  return `  <section class="section--tight band-navy">
    <div class="container tech" style="max-width:1250px">
      <h2 class="section-title">Technologies</h2>
      <div class="tech__row">
${tiles}
      </div>
    </div>
  </section>`;
}

function faqSection() {
  const items = FAQ_Q.map(
    (q, i) => `        <div class="faq__item${i === 0 ? " is-open" : ""}">
          <button class="faq__q" aria-expanded="${i === 0 ? "true" : "false"}">
            <span>${q}</span><span class="chev" aria-hidden="true"></span>
          </button>
          <div class="faq__a"><div class="faq__a-inner">${LINES[i % LINES.length]}</div></div>
        </div>`
  ).join("\n");
  return `  <section class="section">
    <div class="container" style="max-width:1250px">
      <h2 class="section-title section-title--center">Frequently Asked Questions</h2>
      <div class="faq">
${items}
      </div>
    </div>
  </section>`;
}

// Card media: the pixelated (rest) and clear (hover) versions of one
// illustration, generated by build-images.js with an identical frame.
// Decorative — the card's text names it — so alt is empty.
const artKey = (img) => img.replace(/^illustration-/, "").replace(/\.png$/, "");
function cardMedia(img) {
  const k = artKey(img);
  return `<div class="card__media">
            <img class="card__img card__img--dots" src="assets/cards/${k}-dots.svg" alt="" width="720" height="540" loading="lazy" decoding="async" />
            <img class="card__img card__img--clear" src="assets/cards/${k}.png" alt="" width="720" height="540" loading="lazy" decoding="async" />
          </div>`;
}

// Card media drawn as a line-art element (illustrations/<key>.js) that depicts
// the card's service: dotted at rest, thick drawn lines on hover. Same 4:3 frame.
function cardIllus(key) {
  return `<div class="card__media">
            ${IL.illusSVG(IL.loadIllus(key))}
          </div>`;
}

function serviceCard(s, opts = {}) {
  const i = services.indexOf(s);
  const bullets = BULLETS.map((b) => `<li>${b}</li>`).join("\n                ");
  const titles = `<div class="card__titles">
              <span class="card__ghost" aria-hidden="true">${s.title}</span>
              <h3 class="card__title">${s.title}</h3>
            </div>`;
  // compact: just the element + heading; the whole card links to the service page
  if (opts.compact) {
    return `        <a class="card card--compact" href="${s.slug}.html">
          ${opts.illus ? cardIllus(s.illus) : cardMedia(s.art || s.img)}
          <div class="card__body">
            ${titles}
          </div>
        </a>`;
  }
  return `        <a class="card" href="${s.slug}.html">
          ${opts.illus ? cardIllus(s.illus) : cardMedia(s.art || s.img)}
          <div class="card__body">
            ${titles}
            <p class="card__desc">${SHORT[i % SHORT.length]}</p>
            <ul class="card__list">
                ${bullets}
            </ul>
            <span class="card__more">Know More</span>
          </div>
        </a>`;
}

// Centred call-to-action button under a section ([label, href]).
const sectionButton = (b) => (b ? `\n      <div class="btn-row section-more"><a class="btn btn--primary" href="${b[1]}">${b[0]}</a></div>` : "");

function cardSection(title, cards, dark = true, opts = {}) {
  return `  <section class="section${dark ? " band-navy" : ""}">
    <div class="container" style="max-width:1350px">
      <h2 class="section-title section-title--center">${title}</h2>
      <div class="card-grid">
${cards.map((s) => serviceCard(s, opts)).join("\n")}
      </div>${sectionButton(opts.button)}
    </div>
  </section>`;
}

function featureGrid(title, items, dark = false) {
  const cells = items
    .map(
      ([icon, heading], i) => `        <div class="feature">
          <div class="feature__ic">${picon(icon)}</div>
          <h3>${heading}</h3>
          <p>${SHORT[i % SHORT.length]}</p>
        </div>`
    )
    .join("\n");
  return `  <section class="section${dark ? " band-navy" : ""}">
    <div class="container" style="max-width:1250px">
      <h2 class="section-title section-title--center">${title}</h2>
      <div class="feature-grid">
${cells}
      </div>
    </div>
  </section>`;
}

// List row with the standard icon tile. rows = [icon, title, sub, tag, href]
function rowList(title, rows, button) {
  const items = rows
    .map(
      ([icon, heading, sub, tag, href]) => `        <a class="row-card" href="${href}">
          <div class="row-card__main">
            <div class="row-card__ic">${picon(icon)}</div>
            <div>
              <h3>${heading}</h3>
              <p>${sub}</p>
            </div>
          </div>
          <span class="tag">${tag}</span>
        </a>`
    )
    .join("\n");
  const heading = title ? `        <h2 class="section-title">${title}</h2>\n` : "";
  return `    <section class="section">
      <div class="container narrow">
${heading}        <div class="list-stack">
${items}
        </div>${sectionButton(button)}
      </div>
    </section>`;
}

// Stats band (home): four figures side by side. Each number counts up once
// when the band scrolls into view (js/main.js); the final value is in the
// HTML, so it reads correctly without JS or with reduced motion.
const STATS = [
  ["10+", "Years of Experience"],
  ["100+", "Projects Delivered"],
  ["8+", "Industries Served"],
  ["3Mn+", "Users on Our Platforms"],
];
function ticker(stats = STATS) {
  const items = stats.map(([n, l]) => `        <li class="stats__item"><span class="stats__num" data-count="${n}">${n}</span><span class="stats__label">${l}</span></li>`).join("\n");
  return `  <section class="stats band-navy" aria-label="Kaizen Infotech in numbers">
    <div class="container">
      <ul class="stats__list" style="--n:${stats.length}">
${items}
      </ul>
    </div>
  </section>`;
}

// "How We Work" — the delivery process as numbered steps
const STEPS = [
  ["bulb", "Understand"],
  ["pen", "Design"],
  ["code", "Develop"],
  ["rocket", "Deploy"],
  ["users", "Support"],
];
function howWeWork(dark = false) {
  const cells = STEPS.map(
    ([icon, t], i) => `        <li class="step">
          <div class="step__ic">${picon(icon)}</div>
          <span class="step__num">${String(i + 1).padStart(2, "0")}</span>
          <h3>${t}</h3>
          <p>${SHORT[(i + 2) % SHORT.length]}</p>
        </li>`
  ).join("\n");
  return `  <section class="section${dark ? " band-navy" : ""}">
    <div class="container" style="max-width:1250px">
      <h2 class="section-title section-title--center">How We Work</h2>
      <ol class="steps">
${cells}
      </ol>
    </div>
  </section>`;
}

function cta(text) {
  return `  <section class="section cta">
    <div class="container">
      <h2 class="cta__title">Ready to Get Started?</h2>
      <p class="cta__text">${text}</p>
      <div class="btn-row">
        <a class="btn btn--primary" href="contact.html">Contact Us</a>
        <a class="btn btn--ghost" href="services.html">All Services</a>
      </div>
    </div>
  </section>`;
}

/* =====================================================================
   Pages
   ===================================================================== */

// Service detail — the reference Figma page. Structure kept 1:1.
function servicePage(s) {
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  const t = plain(s.title);
  return (
    head(t, `${t} at Kaizen Infotech Solutions — tailor-made enterprise software and digital solutions.`) +
    "\n" +
    `${header("services")}
  <main>
    <div class="container">
      <p class="breadcrumb"><a class="light" href="services.html">Service /</a> <span class="current">${t}</span></p>
    </div>

    <section class="container hero">
      <div class="hero__art"><img src="assets/${s.img}" alt="${t} illustration" /></div>
      <div>
        <h1 class="hero__title">${s.title}</h1>
        <p class="hero__text">${L.tiny} Orci turpis euismod tellus volutpat. Ultricies amet viverra eget sed faucibus maecenas.</p>
      </div>
    </section>

${overviewBand("Overview", L.para, L.para2)}

${checklist("What We Deliver", 5)}

${techStrip([[s.icon, "Core"], ["gear", "DevOps"], ["cloud", "Cloud"], ["database", "Data"], ["shield", "Security"]])}

${faqSection()}

${cardSection("Explore More", others, true, { illus: true })}

${cta(`Tell us about your project and we will put together a tailored plan for ${t.toLowerCase()}.`)}
  </main>
${footer()}`
  );
}

function home() {
  return (
    head("Home", "Kaizen Infotech Solutions — tailor-made enterprise software, mobile apps, web portals and digital marketing that solve real business problems.") +
    "\n" +
    `${header("home")}
  <main>
${pageHero({
  eyebrow: "Kaizen Infotech Solutions",
  title: "Solve real business problems.<br />Build systems that scale.",
  text: `${L.tiny} We design tailor-made enterprise software and digital solutions for organisations across government, corporate and community sectors.`,
  buttons: [["btn--primary", "services.html", "Our Services"], ["btn--ghost", "contact.html", "Talk to Us"]],
  motion: "home",
  motionLabel: "Animated illustration of what Kaizen Infotech delivers",
})}

${ticker()}

${cardSection("What We Do", services, false, { illus: true, compact: true, button: ["Know More", "services.html"] })}

${workShowcase(PROJECTS.slice(0, 3))}

${featureGrid("Why Kaizen", [
  ["shield", "Secure by design"],
  ["rocket", "Built to scale"],
  ["users", "A partner, not a vendor"],
  ["chart", "Measurable results"],
  ["gear", "Engineering craft"],
  ["bulb", "Continuous improvement"],
])}

${howWeWork(true)}

${cta("Tell us about your project and we will put together a tailored plan built around your goals.")}
  </main>
${footer()}`
  );
}

function about() {
  return (
    head("About", "About Kaizen Infotech Solutions — who we are and how we deliver measurable results.") +
    "\n" +
    `${header("about")}
  <main>
${pageHero({ crumb: ["Company", null], current: "About Us", title: "About Kaizen Infotech", text: L.tiny, motion: "about", motionLabel: "Animated illustration of our team, the companies we work with and our values" })}

${ticker(STATS.slice(0, 3))}

${overviewBand("Our Story", L.para, L.para2)}

${featureGrid("What We Stand For", [
  ["bulb", "Kaizen mindset"],
  ["users", "People first"],
  ["shield", "Integrity"],
  ["chart", "Outcomes over output"],
  ["gear", "Craftsmanship"],
  ["rocket", "Ambition"],
])}

${techStrip([["users", "Teams"], ["gear", "Process"], ["shield", "Quality"], ["rocket", "Delivery"], ["chart", "Impact"]])}

${cta("Want to know how we can help your organisation? Let's start a conversation.")}
  </main>
${footer()}`
  );
}

function servicesPage() {
  return (
    head("Services", "Services at Kaizen Infotech — custom software, mobile apps, event management, web portals and digital marketing.") +
    "\n" +
    `${header("services")}
  <main>
${pageHero({
  current: "Services",
  title: "Our Services",
  text: `${L.tiny} From tailor-made platforms to marketing that moves the needle — everything you need under one roof.`,
  motion: "services",
  motionLabel: "Animated illustration of our five services",
})}

${cardSection("What We Offer", services, true, { illus: true })}

${faqSection()}

${cta("Not sure which service fits? Tell us about your project and we will point you in the right direction.")}
  </main>
${footer()}`
  );
}

// Placeholder projects — titles stay generic until real case studies exist.
// Used by the Work page and the home page's "Our Work" preview.
const PROJECTS = [
  ["globe", "Project 01 · Web Portal", SHORT[0], "Government"],
  ["users", "Project 02 · Member Platform", SHORT[1], "Community"],
  ["calendar", "Project 03 · Event Registration", SHORT[2], "Events"],
  ["mobile", "Project 04 · Mobile App", SHORT[3], "Corporate"],
  ["chart", "Project 05 · Reporting Dashboard", SHORT[4], "Enterprise"],
  ["megaphone", "Project 06 · Digital Campaign", SHORT[5], "Marketing"],
].map(([icon, t, sub, tag]) => [icon, t, sub, tag, "#"]);

// Home "Our Work" showcase: big photo cards (pixelated at rest, clear on hover /
// tap). Demo photos are the licensed Unsplash set in assets/blog/ (see README) —
// swap in real project screenshots here.
const WORK_PHOTOS = {
  "Project 01 · Web Portal": ["assets/blog/design.jpg", "Website wireframe sketches on paper"],
  "Project 02 · Member Platform": ["assets/blog/case-study.jpg", "A team discussing a project in a meeting room"],
  "Project 03 · Event Registration": ["assets/blog/news.jpg", "A speaker presenting on stage to an audience"],
  "Project 04 · Mobile App": ["assets/blog/engineering.jpg", "App source code on a laptop screen"],
  "Project 05 · Reporting Dashboard": ["assets/blog/insights.jpg", "Analytics charts on a laptop screen"],
  "Project 06 · Digital Campaign": ["assets/blog/marketing.jpg", "A hand holding a phone showing a social media feed"],
};
// What we did on each project (placeholder scope until real case studies exist)
const WORK_SCOPE = {
  "Project 01 · Web Portal": ["Strategy", "UX Design", "Web Portal", "CMS"],
  "Project 02 · Member Platform": ["Discovery", "Platform", "Payments", "Support"],
  "Project 03 · Event Registration": ["Registration", "Ticketing", "Check-in", "Reports"],
  "Project 04 · Mobile App": ["iOS", "Android", "API", "Analytics"],
  "Project 05 · Reporting Dashboard": ["Data", "Dashboards", "Exports", "Security"],
  "Project 06 · Digital Campaign": ["Strategy", "Content", "Social", "SEO"],
};

// Work page: alternating editorial case studies — big photo (pixelated at
// rest, clear on hover / tap) beside a details panel; rows flip sides.
function caseStudies(rows) {
  const items = rows
    .map(([, title, sub, tag, href], i) => {
      const [img, alt] = WORK_PHOTOS[title];
      const [num, name] = title.split(" · ");
      const n = num.replace("Project ", "");
      const chips = WORK_SCOPE[title].map((c) => `<li>${c}</li>`).join("");
      return `      <article class="case${i % 2 ? " case--flip" : ""}">
        <a class="case__media" href="${href}" aria-label="View case study: ${name}">
          <div class="case__frame" data-pixelate>
            <img class="card__photo" src="${img}" alt="${alt}" width="1200" height="675" loading="lazy" decoding="async" />
          </div>
          <span class="case__view" aria-hidden="true">View</span>
        </a>
        <div class="case__body">
          <div class="case__meta"><span class="case__num">${n}</span><span class="tag">${tag}</span></div>
          <h2 class="case__title">${name}</h2>
          <p class="case__text">${sub} ${L.tiny}</p>
          <ul class="case__chips" aria-label="What we did">${chips}</ul>
          <a class="case__cta" href="${href}">View Case Study <span aria-hidden="true">→</span></a>
        </div>
      </article>`;
    })
    .join(String.fromCharCode(10));
  return `  <section class="section cases">
    <div class="container" style="max-width:1250px">
${items}
    </div>
  </section>`;
}
function workShowcase(rows) {
  const cards = rows
    .map(([, title, sub, tag, href], i) => {
      const [img, alt] = WORK_PHOTOS[title];
      const [num, name] = title.split(" · ");
      return `        <a class="work-card${i === 0 ? " work-card--lead" : ""}" href="${href}">
          <div class="work-card__frame" data-pixelate>
            <img class="card__photo" src="${img}" alt="${alt}" width="1200" height="675" loading="lazy" decoding="async" />
          </div>
          <div class="work-card__shade" aria-hidden="true"></div>
          <div class="work-card__body">
            <div class="work-card__meta"><span class="work-card__num">${num.replace("Project ", "")}</span><span class="tag tag--glass">${tag}</span></div>
            <h3 class="work-card__title">${name}</h3>
            <p class="work-card__text">${sub}</p>
            <span class="work-card__cta">View Case Study <span aria-hidden="true">→</span></span>
          </div>
        </a>`;
    })
    .join(String.fromCharCode(10));
  return `  <section class="section band-navy work-showcase">
    <div class="container" style="max-width:1250px">
      <div class="work-showcase__head">
        <div>
          <p class="eyebrow">Selected Work</p>
          <h2 class="section-title">Our Work</h2>
        </div>
        <p class="work-showcase__intro">${L.tiny} A few of the platforms we have designed, built and shipped.</p>
        <a class="btn btn--ghost work-showcase__all" href="work.html">View All Work</a>
      </div>
      <div class="work-grid">
${cards}
      </div>
    </div>
  </section>`;
}

function work() {
  const rows = PROJECTS;
  return (
    head("Work", "Selected work and case studies from Kaizen Infotech Solutions.") +
    "\n" +
    `${header("work")}
  <main>
${pageHero({ current: "Our Work", title: "Our Work", text: `${L.tiny} A look at platforms we have designed, built and shipped.`, motion: "work", motionLabel: "Animated illustration of selected projects" })}

${caseStudies(rows)}

${cta("Have a project in mind? We would love to add it to this list.")}
  </main>
${footer()}`
  );
}

/* Blog thumbnails are photos (uploaded by the admin), not drawn elements.
   Same rest/hover rule as everything else: slightly pixelated at rest, clear
   on hover. js/main.js draws the pixelated layer from the photo itself, so it
   works for any uploaded image with no build step. Demo photos: Unsplash
   (free licence), see README. */
const BLOG_POSTS = [
  { tag: "Insights", img: "assets/blog/insights.jpg", alt: "Analytics charts on a laptop screen" },
  { tag: "Engineering", img: "assets/blog/engineering.jpg", alt: "Colourful source code on a laptop screen" },
  { tag: "Design", img: "assets/blog/design.jpg", alt: "Hand-drawn website wireframe sketches" },
  { tag: "Marketing", img: "assets/blog/marketing.jpg", alt: "Hand holding a phone showing a social media feed" },
  { tag: "Case Study", img: "assets/blog/case-study.jpg", alt: "Team presentation in a meeting room" },
  { tag: "News", img: "assets/blog/news.jpg", alt: "Speaker presenting on stage to an audience" },
];

function cardPhoto(img, alt) {
  return `<div class="card__media card__media--photo" data-pixelate>
            <img class="card__photo" src="${img}" alt="${alt}" width="1200" height="675" loading="lazy" decoding="async" />
          </div>`;
}

function blog() {
  // Demo posts. Real posts come from the admin, each with its own uploaded
  // thumbnail: 16:9 (1200×675 recommended), JPEG/WebP, under ~200 KB.
  const posts = BLOG_POSTS
    .map(
      ({ tag, img, alt }, i) => `        <a class="card card--post" href="#">
          ${cardPhoto(img, alt)}
          <div class="card__body">
            <span class="tag">${tag}</span>
            <h2 class="card__title">Lorem ipsum dolor sit amet ${String(i + 1).padStart(2, "0")}</h2>
            <p class="card__desc">${SHORT[i % SHORT.length]}</p>
            <span class="card__more">Read More</span>
          </div>
        </a>`
    )
    .join("\n");
  return (
    head("Blog", "Insights, ideas and updates from the Kaizen Infotech team.") +
    "\n" +
    `${header("blog")}
  <main>
${pageHero({ current: "Blog", title: "From the Blog", text: `${L.tiny} Ideas, notes and updates from our team.`, motion: "blog", motionLabel: "Animated illustration of our blog topics" })}

    <section class="section">
      <div class="container" style="max-width:1250px">
        <div class="card-grid">
${posts}
        </div>
      </div>
    </section>

${cta("Have a topic you'd like us to cover? Get in touch.")}
  </main>
${footer()}`
  );
}

function careers() {
  const rows = [
    ["code", "Software Engineer", "Engineering · Thane", "Apply"],
    ["mobile", "Mobile Developer", "Engineering · Thane", "Apply"],
    ["pen", "UI / UX Designer", "Design · Thane", "Apply"],
    ["megaphone", "Digital Marketing Executive", "Marketing · Thane", "Apply"],
    ["calendar", "Project Coordinator", "Operations · Thane", "Apply"],
  ].map(([icon, t, sub, tag]) => [icon, t, sub, tag, "contact.html"]);
  return (
    head("Careers", "Careers at Kaizen Infotech Solutions — grow with a team that builds systems that scale.") +
    "\n" +
    `${header("careers")}
  <main>
${pageHero({ current: "Careers", title: "Build With Us", text: L.tiny, motion: "careers", motionLabel: "Animated illustration of our open roles" })}

${overviewBand("Life at Kaizen", L.para)}

${rowList("Open Positions", rows)}

${cta("Don't see your role? Send us your resume anyway — we are always meeting good people.")}
  </main>
${footer()}`
  );
}

function contact() {
  return (
    head("Contact", "Contact Kaizen Infotech Solutions — Thane, Maharashtra. Let's build something that scales.") +
    "\n" +
    `${header("contact")}
  <main>
${pageHero({ current: "Contact", title: "Get in Touch", text: `${L.tiny} Tell us about your project and we'll get back to you.`, motion: "contact", motionLabel: "Animated illustration of ways to reach us" })}

    <section class="section--tight">
      <div class="container contact-grid">
        <form data-contact-form novalidate>
          <div class="field">
            <label for="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" autocomplete="name" required />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required />
          </div>
          <div class="field">
            <label for="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="How can we help?" />
          </div>
          <div class="field">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Tell us about your project…" required></textarea>
          </div>
          <button class="btn btn--primary" type="submit">Send Message</button>
          <p class="form-note" hidden role="status" style="margin-top:16px;color:var(--blue);font-size:0.95rem"></p>
        </form>

        <aside>
          <h2 class="section-title" style="font-size:1.5rem">Reach Us Directly</h2>
          <ul class="info-list">
            <li><div class="info-ic">${picon("mail")}</div><div><span class="k">Email</span><a href="mailto:communication@kaizeninfotech.com">communication@kaizeninfotech.com</a></div></li>
            <li><div class="info-ic">${picon("mobile")}</div><div><span class="k">Phone</span><a href="tel:+919372430855">+91 93724 30855</a></div></li>
            <li><div class="info-ic">${picon("pin")}</div><div><span class="k">Office</span><span>Thane West, Thane, Maharashtra 400604</span></div></li>
          </ul>
        </aside>
      </div>
    </section>
  </main>
${footer()}`
  );
}

/* =====================================================================
   Write
   ===================================================================== */
const pages = {
  "index.html": home(),
  "about.html": about(),
  "services.html": servicesPage(),
  "work.html": work(),
  "blog.html": blog(),
  "careers.html": careers(),
  "contact.html": contact(),
};
services.forEach((s) => (pages[`${s.slug}.html`] = servicePage(s)));

for (const [file, html] of Object.entries(pages)) {
  fs.writeFileSync(path.join(OUT, file), html, "utf8");
  console.log("wrote", file.padEnd(34), `${html.length} bytes`);
}
console.log(`\n${Object.keys(pages).length} pages built.`);
