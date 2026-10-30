/* =====================================================================
   Kaizen Infotech — static site generator
   Writes plain HTML pages that share one <head>, header and footer,
   plus sitemap.xml and robots.txt.

   Run from this folder:   node build.js
   Then preview:           node serve.js   → http://localhost:8099

   Words live in content.js (from "Kaizen Website Full Content.docx").
   Edit content there and structure here, not in the generated .html
   files — they are overwritten on every build.
   ===================================================================== */
const fs = require("fs");
const IL = require("./illus.js"); // line-art illustration elements (cards, product art)
const HERO = require("./hero.js"); // hero motion graphics: which elements each page shows
const C = require("./content.js"); // site copy + SEO data
const path = require("path");

const OUT = __dirname;
const { SITE } = C;

/* ---------------------------------------------------------------------
   Placeholder copy (Lorem ipsum) — only Work and Blog still use it,
   until real case studies and posts exist.
   --------------------------------------------------------------------- */
const L = {
  tiny:
    "Lorem ipsum dolor sit amet consectetur. Aliquet amet fermentum viverra lacinia proin sit lobortis.",
};
const SHORT = [
  "Lorem ipsum dolor sit amet consectetur. Aliquet amet fermentum viverra lacinia proin sit lobortis.",
  "Et ultrices laoreet mi curabitur amet eu elit posuere in. Morbi sit amet lorem gravida.",
  "Arcu facilisi sit eget vitae elit in. Velit aliquet interdum morbi ipsum quis laoreet.",
  "Pellentesque et risus pulvinar neque sed diam amet euismod. Vitae fringilla habitant tellus.",
  "Velit turpis neque orci adipiscing urna. Sodales tortor rhoncus massa velit convallis.",
  "Turpis massa turpis a duis eu nulla quisque. Urna et nunc eget integer ut velit.",
];

/* ---------------------------------------------------------------------
   Services — slug, title, Figma illustration, icon, drawn element
   --------------------------------------------------------------------- */
const services = [
  // illus = the line-art element (illustrations/<illus>.js) that depicts this service in What We Do
  { slug: "custom-software-development", title: "Custom Software Development", img: "illustration-software.png", icon: "code", illus: "software" },
  { slug: "mobile-app-development", title: "Mobile App Development", img: "illustration-hardware.png", icon: "mobile", illus: "mobile" },
  { slug: "event-management", title: "Event Registration &amp; Management", img: "illustration-web.png", icon: "calendar", illus: "event" },
  { slug: "enterprise-web-portals", title: "Enterprise Web Portals &amp; Websites", img: "illustration-web.png", icon: "globe", illus: "web" },
  { slug: "digital-marketing", title: "Digital Marketing Services", img: "illustration-marketing.png", icon: "megaphone", illus: "marketing" },
];
services.forEach((s) => Object.assign(s, C.SERVICE_COPY[s.slug]));

// Products — one page each (flat files, so every relative asset path keeps working)
const products = C.PRODUCTS.map((p) => ({ ...p, file: `${p.slug}.html` }));

const nav = [
  ["index.html", "Home", "home"],
  ["products.html", "Products", "products"],
  ["services.html", "Services", "services"],
  ["work.html", "Work", "work"],
  ["about.html", "About", "about"],
  ["blog.html", "Blog", "blog"],
  ["careers.html", "Careers", "careers"],
  ["contact.html", "Contact", "contact"],
];

/* ---------------------------------------------------------------------
   Text helpers
   --------------------------------------------------------------------- */
const plain = (s) => s.replace(/&amp;/g, "&");
// Escape plain content text for HTML (content.js holds no markup)
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pageUrl = (file) => SITE.url + (file === "index.html" ? "" : file);
const mailto = (addr, subject) => `mailto:${addr}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
// Fall back to an existing element if a drawn element file is missing
const illusKey = (k) => (fs.existsSync(`${__dirname}/illustrations/${k}.js`) ? k : "software");

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
   SEO — structured data (JSON-LD, schema.org)
   ===================================================================== */
const ORG_ID = SITE.url + "#organization";
const SITE_ID = SITE.url + "#website";
const LOGO = SITE.url + "assets/logo.png";
const postalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.locality,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postal,
  addressCountry: SITE.address.country,
});
const orgRef = { "@id": ORG_ID };

function orgNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: ["Kaizen Infotech", "Kaizen Infotech Solutions"],
    url: SITE.url,
    logo: LOGO,
    slogan: SITE.tagline,
    description: C.HOME.metaDesc,
    email: SITE.email,
    telephone: SITE.phone,
    address: postalAddress(),
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: ["Custom software development", "Enterprise software", "Mobile app development", "Business process automation", "WhatsApp marketing automation", "Event registration software", "Automated fare collection"],
    sameAs: SITE.social.map(([, u]) => u),
  };
}
const websiteNode = () => ({ "@type": "WebSite", "@id": SITE_ID, url: SITE.url, name: SITE.name, inLanguage: "en-IN", publisher: orgRef });
const webPage = (type, file, title, desc) => ({
  "@type": type,
  "@id": pageUrl(file) + "#webpage",
  url: pageUrl(file),
  name: title,
  description: desc,
  inLanguage: "en-IN",
  isPartOf: { "@id": SITE_ID },
  about: orgRef,
});
const faqNode = (faq) => ({
  "@type": "FAQPage",
  mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});
// crumbs: [[name, file], ...] — Home is added in front
const breadcrumbNode = (crumbs) => ({
  "@type": "BreadcrumbList",
  itemListElement: [["Home", "index.html"], ...crumbs].map(([name, file], i) => ({ "@type": "ListItem", position: i + 1, name, item: pageUrl(file) })),
});

function jsonLd(nodes) {
  const LT = String.fromCharCode(92) + "u003c"; // JSON escape for "<" — never "</script>" inside the JSON
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": [websiteNode(), ...nodes] }).split("<").join(LT);
  return `  <script type="application/ld+json">${json}</script>\n`;
}

/* =====================================================================
   Shared chrome
   ===================================================================== */
// One <head> for every page: title, description, canonical, social cards, JSON-LD
function head({ file, title, desc, schema = [] }) {
  const url = pageUrl(file);
  const t = esc(title), d = esc(desc);
  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${t}</title>
  <meta name="description" content="${d}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${url}" />
  <meta name="theme-color" content="#001f32" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${esc(SITE.name)}" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:title" content="${t}" />
  <meta property="og:description" content="${d}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${LOGO}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="${SITE.twitter}" />
  <meta name="twitter:title" content="${t}" />
  <meta name="twitter:description" content="${d}" />
  <meta name="twitter:image" content="${LOGO}" />
  <link rel="icon" href="assets/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
${jsonLd(schema)}</head>
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
        <img src="assets/logo.png" alt="Kaizen Infotech Solutions Pvt. Ltd." width="160" height="52" />
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
  const social = SITE.social.map(([n, u]) => `<a href="${u}" rel="noopener" target="_blank">${n}</a>`).join(" · ");
  return `  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__logo">
          <img src="assets/logo-footer.png" alt="Kaizen Infotech Solutions Pvt. Ltd." loading="lazy" />
        </div>
        <div class="footer__col">
          <h4>COMPANY</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="work.html">Our Work</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4>PRODUCTS</h4>
          <ul>
${products.map((p) => `            <li><a href="${p.file}">${esc(p.card)}</a></li>`).join("\n")}
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
          <h4>GET IN TOUCH</h4>
          <ul>
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></li>
            <li><a href="${SITE.maps}" rel="noopener" target="_blank">${esc(SITE.address.street)}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postal}</a></li>
            <li>${social}</li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© <span data-year>2026</span> ${SITE.name} All rights reserved.</span>
        <span>${SITE.tagline}</span>
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

// Optional eyebrow + intro paragraph above a section's grid (centred)
function sectionHead(title, { eyebrow, intro, center = true } = {}) {
  const eb = eyebrow ? `      <p class="eyebrow"${center ? ' style="text-align:center"' : ""}>${esc(eyebrow)}</p>\n` : "";
  const lead = intro ? `\n      <p class="lead section-intro${center ? " section-intro--center" : ""}">${esc(intro)}</p>` : "";
  return `${eb}      <h2 class="section-title${center ? " section-title--center" : ""}">${esc(title)}</h2>${lead}`;
}

// Text band: title + paragraphs (navy by default)
function overviewBand(title, paras, dark = true) {
  return `  <section class="section${dark ? " band-navy" : ""}">
    <div class="container stack-40" style="align-items:center;text-align:center;max-width:1250px">
      <h2 class="section-title section-title--center">${esc(title)}</h2>
      <div class="prose lead lead--justify" style="max-width:1080px">
        ${paras.map((p) => `<p>${esc(p)}</p>`).join("\n        ")}
      </div>
    </div>
  </section>`;
}

function checklist(title, items) {
  return `  <section class="section">
    <div class="container" style="max-width:1250px">
      <h2 class="section-title">${esc(title)}</h2>
      <ul class="checklist">
        ${items.map((t) => `<li>${esc(t)}</li>`).join("\n        ")}
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

function techStrip(set = TECH_DEFAULT, title = "Technologies") {
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
      <h2 class="section-title">${title}</h2>
      <div class="tech__row">
${tiles}
      </div>
    </div>
  </section>`;
}

// FAQ accordion. items = [[question, answer], ...]; answers are plain text
// unless opts.html. FAQPage schema is added by the page, from the same items.
function faqSection(items, { title = "Frequently Asked Questions", html = false, cls = "" } = {}) {
  const rows = items
    .map(
      ([q, a], i) => `        <div class="faq__item${i === 0 ? " is-open" : ""}">
          <button class="faq__q" aria-expanded="${i === 0 ? "true" : "false"}">
            <span>${esc(q)}</span><span class="chev" aria-hidden="true"></span>
          </button>
          <div class="faq__a"><div class="faq__a-inner">${html ? a : esc(a)}</div></div>
        </div>`
    )
    .join("\n");
  return `  <section class="section">
    <div class="container" style="max-width:1250px">
      <h2 class="section-title section-title--center">${esc(title)}</h2>
      <div class="faq${cls ? " " + cls : ""}">
${rows}
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
// the card's subject: dotted at rest, thick drawn lines on hover. Same 4:3 frame.
function cardIllus(key) {
  return `<div class="card__media">
            ${IL.illusSVG(IL.loadIllus(illusKey(key)))}
          </div>`;
}

// One card. item = { href, title (HTML-safe), illus, desc?, bullets? }
function card(item, opts = {}) {
  const titles = `<div class="card__titles">
              <span class="card__ghost" aria-hidden="true">${item.title}</span>
              <h3 class="card__title">${item.title}</h3>
            </div>`;
  // compact: just the element + heading; the whole card links to its page
  if (opts.compact) {
    return `        <a class="card card--compact" href="${item.href}">
          ${cardIllus(item.illus)}
          <div class="card__body">
            ${titles}
          </div>
        </a>`;
  }
  const bullets = (item.bullets || []).map((b) => `<li>${esc(b)}</li>`).join("\n                ");
  return `        <a class="card" href="${item.href}">
          ${cardIllus(item.illus)}
          <div class="card__body">
            ${titles}
            <p class="card__desc">${esc(item.desc)}</p>
            ${bullets ? `<ul class="card__list">\n                ${bullets}\n            </ul>` : ""}
            <span class="card__more">Know More</span>
          </div>
        </a>`;
}
const serviceItem = (s) => ({ href: `${s.slug}.html`, title: s.title, illus: s.illus, desc: s.card, bullets: s.bullets });
const productItem = (p) => ({ href: p.file, title: esc(p.card), illus: p.illus, desc: p.cardDesc, bullets: [p.oneLine] });

// Centred call-to-action button under a section ([label, href]).
const sectionButton = (b) => (b ? `\n      <div class="btn-row section-more"><a class="btn btn--primary" href="${b[1]}">${b[0]}</a></div>` : "");

function cardSection(title, items, dark = true, opts = {}) {
  return `  <section class="section${dark ? " band-navy" : ""}"${opts.id ? ` id="${opts.id}"` : ""}>
    <div class="container" style="max-width:1350px">
${sectionHead(title, opts)}
      <div class="card-grid">
${items.map((it) => card(it, opts)).join("\n")}
      </div>${sectionButton(opts.button)}
    </div>
  </section>`;
}

// items = [[icon, heading, text], ...]
function featureGrid(title, items, dark = false, opts = {}) {
  const cells = items
    .map(
      ([icon, heading, text]) => `        <div class="feature">
          <div class="feature__ic">${picon(icon)}</div>
          <h3>${esc(heading)}</h3>
          <p>${esc(text)}</p>
        </div>`
    )
    .join("\n");
  const cols = items.length === 4 ? " feature-grid--2" : "";
  return `  <section class="section${dark ? " band-navy" : ""}">
    <div class="container" style="max-width:1250px">
${sectionHead(title, opts)}
      <div class="feature-grid${cols}">
${cells}
      </div>${sectionButton(opts.button)}
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

// Stats band: figures side by side. Each number counts up once when the band
// scrolls into view (js/main.js); the final value is in the HTML, so it reads
// correctly without JS or with reduced motion.
function ticker(stats = C.STATS) {
  const items = stats.map(([n, l]) => `        <li class="stats__item"><span class="stats__num" data-count="${n}">${n}</span><span class="stats__label">${l}</span></li>`).join("\n");
  return `  <section class="stats band-navy" aria-label="Kaizen Infotech in numbers">
    <div class="container">
      <ul class="stats__list" style="--n:${stats.length}">
${items}
      </ul>
    </div>
  </section>`;
}

// Numbered steps (How We Work, our journey). steps = [[icon, title, text], ...]
function steps(title, items, dark = false) {
  const cells = items
    .map(
      ([icon, t, text], i) => `        <li class="step">
          <div class="step__ic">${picon(icon)}</div>
          <span class="step__num">${String(i + 1).padStart(2, "0")}</span>
          <h3>${esc(t)}</h3>
          <p>${esc(text)}</p>
        </li>`
    )
    .join("\n");
  return `  <section class="section${dark ? " band-navy" : ""}">
    <div class="container" style="max-width:1250px">
      <h2 class="section-title section-title--center">${esc(title)}</h2>
      <ol class="steps"${items.length !== 5 ? ` style="--steps:${items.length}"` : ""}>
${cells}
      </ol>
    </div>
  </section>`;
}

// Client names (the logos are still to come from the designer)
function clientList(cls = "") {
  return `<ul class="clients${cls ? " " + cls : ""}" aria-label="Clients">${SITE.clients.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>`;
}
function clientsSection(title) {
  return `  <section class="section">
    <div class="container" style="max-width:1250px">
      <h2 class="section-title section-title--center">${esc(title)}</h2>
      ${clientList("clients--center")}
    </div>
  </section>`;
}

function cta(text, { title = "Ready to Get Started?", primary = ["Contact Us", "contact.html"], secondary = ["All Services", "services.html"] } = {}) {
  return `  <section class="section cta">
    <div class="container">
      <h2 class="cta__title">${esc(title)}</h2>
      <p class="cta__text">${esc(text)}</p>
      <div class="btn-row">
        <a class="btn btn--primary" href="${primary[1]}">${esc(primary[0])}</a>
        ${secondary ? `<a class="btn btn--ghost" href="${secondary[1]}">${esc(secondary[0])}</a>` : ""}
      </div>
    </div>
  </section>`;
}

/* =====================================================================
   Pages
   ===================================================================== */

// Service detail — the reference Figma page. Structure kept 1:1.
function servicePage(s) {
  const file = `${s.slug}.html`;
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  const t = plain(s.title);
  const product = s.product && products.find((p) => p.slug === s.product);
  const title = `${t} in Mumbai | ${SITE.name}`;
  const desc = `${s.hero}`.slice(0, 300);
  return (
    head({
      file,
      title,
      desc,
      schema: [
        webPage("WebPage", file, title, desc),
        { "@type": "Service", name: t, serviceType: t, description: s.hero, provider: orgRef, areaServed: { "@type": "Country", name: "India" }, url: pageUrl(file) },
        breadcrumbNode([["Services", "services.html"], [t, file]]),
      ],
    }) +
    "\n" +
    `${header("services")}
  <main>
    <div class="container">
      <p class="breadcrumb"><a class="light" href="services.html">Service /</a> <span class="current">${t}</span></p>
    </div>

    <section class="container hero">
      <div class="hero__art"><img src="assets/${s.img}" alt="${t} illustration" width="440" height="330" /></div>
      <div>
        <h1 class="hero__title">${s.title}</h1>
        <p class="hero__text">${esc(s.hero)}</p>
        <div class="btn-row hero__btns">
          <a class="btn btn--primary" href="contact.html">Talk to Us</a>
          ${product ? `<a class="btn btn--ghost" href="${product.file}">View ${esc(product.short)}</a>` : ""}
        </div>
      </div>
    </section>

${overviewBand("Overview", s.overview)}

${checklist("What We Deliver", s.deliver)}

${techStrip([[s.icon, "Core"], ["gear", "DevOps"], ["cloud", "Cloud"], ["database", "Data"], ["shield", "Security"]])}

${faqSection(s.faq)}

${cardSection("Explore More", others.map(serviceItem), true)}

${cta(`Tell us about your project and we will put together a tailored plan for ${t.toLowerCase()}.`)}
  </main>
${footer()}`
  );
}

// Product detail — same component set as the service page
function productPage(p) {
  const others = products.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    head({
      file: p.file,
      title: p.metaTitle,
      desc: p.metaDesc,
      schema: [
        webPage("WebPage", p.file, p.metaTitle, p.metaDesc),
        {
          "@type": "SoftwareApplication",
          "@id": pageUrl(p.file) + "#software",
          name: p.name,
          alternateName: p.short,
          applicationCategory: p.category,
          description: p.metaDesc,
          slogan: p.tagline,
          url: pageUrl(p.file),
          featureList: p.modules.map((m) => m[1]).join(", "),
          audience: { "@type": "BusinessAudience", name: p.bestFor },
          author: orgRef,
          publisher: orgRef,
        },
        faqNode(p.faq),
        breadcrumbNode([["Products", "products.html"], [p.name, p.file]]),
      ],
    }) +
    "\n" +
    `${header("products")}
  <main>
    <div class="container">
      <p class="breadcrumb"><a class="light" href="products.html">Products /</a> <span class="current">${esc(p.name)}</span></p>
    </div>

    <section class="container hero">
      <div class="hero__art hero__art--illus">${IL.illusSVG(IL.loadIllus(illusKey(p.illus)))}</div>
      <div>
        <p class="eyebrow">${esc(p.tagline)}</p>
        <h1 class="hero__title">${esc(p.h1)}</h1>
        <p class="hero__text">${esc(p.cardDesc)}</p>
        <div class="btn-row hero__btns">
          <a class="btn btn--primary" href="contact.html">${esc(p.ctaButton)}</a>
          <a class="btn btn--ghost" href="products.html">All Products</a>
        </div>
      </div>
    </section>

${overviewBand("Overview", p.intro)}

${featureGrid(p.modulesTitle, p.modules)}

${overviewBand("Best For", [p.bestFor])}

${checklist(p.benefitsTitle, p.benefits)}

${faqSection(p.faq, { title: `${p.short} – Frequently Asked Questions` })}

${cardSection("Explore More Products", others.map(productItem), true)}

${cta(p.ctaText, { title: p.ctaButton, primary: [p.ctaButton, "contact.html"], secondary: ["All Products", "products.html"] })}
  </main>
${footer()}`
  );
}

function productsPage() {
  const P = C.PRODUCTS_PAGE;
  const file = "products.html";
  return (
    head({
      file,
      title: P.metaTitle,
      desc: P.metaDesc,
      schema: [
        webPage("CollectionPage", file, P.metaTitle, P.metaDesc),
        {
          "@type": "ItemList",
          name: "Software products by " + SITE.name,
          itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: pageUrl(p.file), name: p.name })),
        },
        breadcrumbNode([["Products", file]]),
      ],
    }) +
    "\n" +
    `${header("products")}
  <main>
${pageHero({
  current: "Products",
  title: esc(P.h1),
  text: esc(P.text),
  buttons: [["btn--primary", "contact.html", "Request a Demo"], ["btn--ghost", "#product-list", "See the Products"]],
  motion: "products",
  motionLabel: "Animated illustration of our five software products",
})}

${cardSection(P.gridTitle, products.map(productItem), true, { id: "product-list" })}

${featureGrid("Built for Real Business Problems", products.map((p) => [p.icon, p.card, p.oneLine + " " + p.bestFor]), false)}

${cta(P.cta, { title: "See a Product in Action", primary: ["Request a Demo", "contact.html"], secondary: ["Custom Software", "services.html"] })}
  </main>
${footer()}`
  );
}

function home() {
  const H = C.HOME;
  const file = "index.html";
  return (
    head({
      file,
      title: H.metaTitle,
      desc: H.metaDesc,
      schema: [orgNode(), webPage("WebPage", file, H.metaTitle, H.metaDesc), faqNode(H.faq)],
    }) +
    "\n" +
    `${header("home")}
  <main>
${pageHero({
  eyebrow: esc(H.eyebrow),
  title: esc(H.h1),
  text: esc(H.text),
  buttons: [["btn--primary", "contact.html", "Talk to Us →"], ["btn--ghost", "work.html", "See Our Work →"]],
  motion: "home",
  motionLabel: "Animated illustration of what Kaizen Infotech builds",
})}

${ticker()}

${cardSection(H.whatWeDo.title, services.map(serviceItem), false, { compact: true, eyebrow: H.whatWeDo.eyebrow, intro: H.whatWeDo.text, button: ["Know More", "services.html"] })}

${cardSection(H.products.title, products.map(productItem), false, { compact: true, eyebrow: H.products.eyebrow, intro: H.products.text, button: ["Explore All Products →", "products.html"] })}

${workShowcase(PROJECTS.slice(0, 3), { intro: H.work.text, clients: true })}

${featureGrid(H.why.title, H.why.items, false, { eyebrow: H.why.eyebrow, intro: H.why.text, button: ["Our Story →", "about.html"] })}

${steps("How We Work", H.steps, true)}

${faqSection(H.faq)}

${cta(H.cta, { primary: ["Talk to Us", "contact.html"], secondary: ["All Products", "products.html"] })}
  </main>
${footer()}`
  );
}

function about() {
  const A = C.ABOUT;
  const file = "about.html";
  return (
    head({
      file,
      title: A.metaTitle,
      desc: A.metaDesc,
      schema: [webPage("AboutPage", file, A.metaTitle, A.metaDesc), faqNode(A.faq), breadcrumbNode([["About Us", file]])],
    }) +
    "\n" +
    `${header("about")}
  <main>
${pageHero({ crumb: ["Company", null], current: "About Us", title: esc(A.h1), text: esc(A.text), motion: "about", motionLabel: "Animated illustration of our team, the organisations we work with and what we stand for" })}

${ticker()}

${overviewBand(A.who.title, A.who.paras)}

${steps(A.journey.title, A.journey.items)}

${featureGrid(A.why.title, A.why.items, true)}

${overviewBand(A.culture.title, A.culture.paras, false)}

${techStrip([["users", "Teams"], ["gear", "Process"], ["shield", "Quality"], ["rocket", "Delivery"], ["chart", "Impact"]], "How We Deliver")}

${clientsSection(A.clientsTitle)}

${faqSection(A.faq, { title: "About – Frequently Asked Questions" })}

${cta(A.cta)}
  </main>
${footer()}`
  );
}

function servicesPage() {
  const S = C.SERVICES_PAGE;
  const file = "services.html";
  return (
    head({
      file,
      title: S.metaTitle,
      desc: S.metaDesc,
      schema: [
        webPage("WebPage", file, S.metaTitle, S.metaDesc),
        ...S.build.items.map(([, name, text]) => ({ "@type": "Service", name, serviceType: name, description: text, provider: orgRef, areaServed: { "@type": "Country", name: "India" } })),
        faqNode(S.faq),
        breadcrumbNode([["Services", file]]),
      ],
    }) +
    "\n" +
    `${header("services")}
  <main>
${pageHero({
  current: "Services",
  title: esc(S.h1),
  text: esc(S.text),
  buttons: [["btn--primary", "contact.html", "Tell Us What You Need"], ["btn--ghost", "products.html", "Our Products"]],
  motion: "services",
  motionLabel: "Animated illustration of our five services",
})}

${cardSection(S.offerTitle, services.map(serviceItem), true)}

${featureGrid(S.build.title, S.build.items, false, { intro: S.build.text })}

${steps(S.stepsTitle, S.steps, true)}

${faqSection(S.faq, { title: "Services – Frequently Asked Questions" })}

${cta(S.cta, { title: S.ctaTitle, primary: ["Send Us a Message", "contact.html"], secondary: [`Call ${SITE.phone}`, `tel:${SITE.phoneHref}`] })}
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
          <div class="case__frame">
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
function workShowcase(rows, { intro, clients } = {}) {
  const cards = rows
    .map(([, title, sub, tag, href], i) => {
      const [img, alt] = WORK_PHOTOS[title];
      const [num, name] = title.split(" · ");
      return `        <a class="work-card${i === 0 ? " work-card--lead" : ""}" href="${href}">
          <div class="work-card__frame">
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
        <p class="work-showcase__intro">${esc(intro || C.WORK.text)}</p>
        <a class="btn btn--ghost work-showcase__all" href="work.html">View All Work</a>
      </div>${clients ? `\n      ${clientList("clients--glass")}` : ""}
      <div class="work-grid">
${cards}
      </div>
    </div>
  </section>`;
}

function work() {
  const W = C.WORK;
  const file = "work.html";
  return (
    head({ file, title: W.metaTitle, desc: W.metaDesc, schema: [webPage("CollectionPage", file, W.metaTitle, W.metaDesc), breadcrumbNode([["Our Work", file]])] }) +
    "\n" +
    `${header("work")}
  <main>
${pageHero({ current: "Our Work", title: "Our Work", text: esc(W.text), motion: "work", motionLabel: "Animated illustration of selected projects" })}

${caseStudies(PROJECTS)}

${clientsSection("Trusted by Organisations That Cannot Afford to Get It Wrong")}

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
  return `<div class="card__media card__media--photo">
            <img class="card__photo" src="${img}" alt="${alt}" width="1200" height="675" loading="lazy" decoding="async" />
          </div>`;
}

function blog() {
  const B = C.BLOG;
  const file = "blog.html";
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
    head({ file, title: B.metaTitle, desc: B.metaDesc, schema: [webPage("Blog", file, B.metaTitle, B.metaDesc), breadcrumbNode([["Blog", file]])] }) +
    "\n" +
    `${header("blog")}
  <main>
${pageHero({ current: "Blog", title: "From the Blog", text: "Ideas, notes, and updates from the Kaizen Infotech Solutions Pvt. Ltd. team on custom software, automation, and building products for Indian businesses.", motion: "blog", motionLabel: "Animated illustration of our blog topics" })}

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
  const K = C.CAREERS;
  const file = "careers.html";
  const location = `${SITE.address.locality}, ${SITE.address.region}`;
  const rows = K.roles.map((r) => [r.icon, esc(r.title), `${r.team} · ${location} · Work from office`, "Apply", mailto(SITE.careersEmail, `${r.title} Application`)]);
  const list = (items) => `<ul>${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
  const details = K.roles.map((r) => [
    r.title,
    `<p>${esc(r.overview)}</p><h3 class="role__h">What you will do</h3>${list(r.do)}<h3 class="role__h">What we are looking for</h3>${list(r.want)}<p>${esc(r.apply)} to <a href="${mailto(SITE.careersEmail, `${r.title} Application`)}">${SITE.careersEmail}</a> with the subject “${esc(r.title)} Application”.</p>`,
  ]);
  const jobs = K.roles.map((r) => ({
    "@type": "JobPosting",
    title: r.title,
    description: `<p>${r.overview}</p><p>What you will do:</p><ul>${r.do.map((t) => `<li>${t}</li>`).join("")}</ul><p>What we are looking for:</p><ul>${r.want.map((t) => `<li>${t}</li>`).join("")}</ul>`,
    datePosted: K.datePosted,
    hiringOrganization: { "@type": "Organization", name: SITE.name, sameAs: SITE.url, logo: LOGO },
    jobLocation: { "@type": "Place", address: postalAddress() },
    directApply: false,
  }));
  return (
    head({ file, title: K.metaTitle, desc: K.metaDesc, schema: [webPage("WebPage", file, K.metaTitle, K.metaDesc), ...jobs, breadcrumbNode([["Careers", file]])] }) +
    "\n" +
    `${header("careers")}
  <main>
${pageHero({ current: "Careers", title: esc(K.h1), text: esc(K.text), buttons: [["btn--primary", "#open-positions", "See Open Positions"], ["btn--ghost", mailto(SITE.careersEmail), "Email Your Resume"]], motion: "careers", motionLabel: "Animated illustration of our open roles" })}

${overviewBand("Life at Kaizen", K.life)}

${rowList("Open Positions", rows).replace('<section class="section">', '<section class="section" id="open-positions">')}

${faqSection(details, { title: "About the Roles", html: true, cls: "faq--roles" })}

${checklist(K.cultureTitle, K.culture)}

${cta(K.cta, { title: "Don't See Your Role?", primary: ["Email Your Resume", mailto(SITE.careersEmail)], secondary: ["About Us", "about.html"] })}
  </main>
${footer()}`
  );
}

function contact() {
  const K = C.CONTACT;
  const file = "contact.html";
  const social = SITE.social.map(([n, u]) => `<a href="${u}" rel="noopener" target="_blank">${n}</a>`).join(" · ");
  return (
    head({
      file,
      title: K.metaTitle,
      desc: K.metaDesc,
      schema: [
        webPage("ContactPage", file, K.metaTitle, K.metaDesc),
        {
          "@type": "LocalBusiness",
          "@id": SITE.url + "#localbusiness",
          name: SITE.name,
          url: SITE.url,
          image: LOGO,
          logo: LOGO,
          email: SITE.email,
          telephone: SITE.phone,
          address: postalAddress(),
          hasMap: SITE.maps,
          areaServed: { "@type": "Country", name: "India" },
          parentOrganization: orgRef,
          sameAs: SITE.social.map(([, u]) => u),
        },
        breadcrumbNode([["Contact", file]]),
      ],
    }) +
    "\n" +
    `${header("contact")}
  <main>
${pageHero({ current: "Contact", title: esc(K.h1), text: esc(K.text), motion: "contact", motionLabel: "Animated illustration of ways to reach us" })}

    <section class="section--tight">
      <div class="container contact-grid">
        <form data-contact-form novalidate>
          <div class="field">
            <label for="name">Full Name</label>
            <input id="name" name="name" type="text" placeholder="Your full name" autocomplete="name" required />
          </div>
          <div class="field">
            <label for="company">Company / Organisation Name <span class="field__opt">(optional)</span></label>
            <input id="company" name="company" type="text" placeholder="Your company or organisation" autocomplete="organization" />
          </div>
          <div class="field">
            <label for="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" placeholder="+91" autocomplete="tel" required />
          </div>
          <div class="field">
            <label for="email">Email Address</label>
            <input id="email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required />
          </div>
          <div class="field">
            <label for="topic">What are you looking for?</label>
            <select id="topic" name="topic">
${K.topics.map((t) => `              <option>${esc(t)}</option>`).join("\n")}
            </select>
          </div>
          <div class="field">
            <label for="message">Tell us about your requirement</label>
            <textarea id="message" name="message" rows="5" placeholder="What would you like to build or improve?" required></textarea>
          </div>
          <button class="btn btn--primary" type="submit">Send Message</button>
          <p class="form-note" hidden role="status" style="margin-top:16px;color:var(--blue);font-size:0.95rem"></p>
        </form>

        <aside>
          <h2 class="section-title" style="font-size:1.5rem">Reach Us Directly</h2>
          <ul class="info-list">
            <li><div class="info-ic">${picon("mail")}</div><div><span class="k">Email</span><a href="mailto:${SITE.email}">${SITE.email}</a></div></li>
            <li><div class="info-ic">${picon("mobile")}</div><div><span class="k">Phone</span><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></div></li>
            <li><div class="info-ic">${picon("pin")}</div><div><span class="k">Office</span><span>${esc(SITE.name)}<br />${esc(SITE.addressLine)}</span><a href="${SITE.maps}" rel="noopener" target="_blank">View on Google Maps</a></div></li>
            <li><div class="info-ic">${picon("globe")}</div><div><span class="k">Follow Us</span><span>${social}</span></div></li>
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
  "products.html": productsPage(),
  "services.html": servicesPage(),
  "work.html": work(),
  "blog.html": blog(),
  "careers.html": careers(),
  "contact.html": contact(),
};
products.forEach((p) => (pages[p.file] = productPage(p)));
services.forEach((s) => (pages[`${s.slug}.html`] = servicePage(s)));

for (const [file, html] of Object.entries(pages)) {
  fs.writeFileSync(path.join(OUT, file), html, "utf8");
  console.log("wrote", file.padEnd(40), `${html.length} bytes`);
}

// Search engines: every page in the sitemap, and robots.txt pointing at it
const today = new Date().toISOString().slice(0, 10);
const PRIORITY = { "index.html": "1.0", "products.html": "0.9", "services.html": "0.9" };
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(pages)
  .map((f) => `  <url><loc>${pageUrl(f)}</loc><lastmod>${today}</lastmod><priority>${PRIORITY[f] || (products.some((p) => p.file === f) ? "0.8" : "0.7")}</priority></url>`)
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(OUT, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}sitemap.xml\n`, "utf8");
console.log(`\n${Object.keys(pages).length} pages built, plus sitemap.xml and robots.txt.`);
