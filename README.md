# Kaizen Infotech — Website

A simple, minimalist multi-page website built from the Figma **"Kaizen Website"**
service-page design. Every page reuses the same design system taken directly
from the Figma file — navy `#001f32`, blue `#117abf`, light-blue `#e0f1ff`,
Lato type, italic-light section headings, and the card / FAQ / CTA / footer
components.

Body copy is placeholder **Lorem ipsum** — swap it for real content when ready.

## Run it

```bash
node build.js         # regenerate all pages from build.js
node serve.js         # preview → http://localhost:8099
node build-images.js  # regenerate card images — only when the illustrations change
```

No dependencies — just Node. Any static server works too (`npx serve .`).

> **Edit `build.js`, not the `.html` files.** The pages are generated; a
> rebuild overwrites hand edits.

## Pages

| File | Page | Sections |
|------|------|----------|
| `index.html` | Home | Hero · Who We Are · What We Do · Why Kaizen · Technologies · FAQ · CTA |
| `about.html` | About | Hero · Our Story · What We Stand For · Technologies · CTA |
| `services.html` | Services | Hero · What We Offer (all 5) · FAQ · CTA |
| `work.html` | Work | Hero · Project list · CTA |
| `blog.html` | Blog | Hero · Article cards · CTA |
| `careers.html` | Careers | Hero · Life at Kaizen · Open Positions · CTA |
| `contact.html` | Contact | Hero · Form + Reach Us Directly |
| `custom-software-development.html` | Service detail | **Reference Figma page, 1:1** |
| `mobile-app-development.html` | Service detail | same structure |
| `event-management.html` | Service detail | same structure |
| `enterprise-web-portals.html` | Service detail | same structure |
| `digital-marketing.html` | Service detail | same structure |

Service detail sections, as in Figma: Breadcrumb · Hero · Overview ·
What We Deliver · Technologies · FAQ · Explore More · Ready to Get Started.

Navigation (Home · About · Services · Work · Blog · Careers · Contact) matches
both the Figma header and the live kaizeninfotech.com site.

## The icon standard

**Every icon on the site follows one rule:**

| State | Look |
|-------|------|
| **Rest** | Line icon rendered **pixelated** — dense, evenly spaced dots, clearly legible (matches the dotted Figma illustrations) |
| **Hover** | The same icon as **one clean, clear line** that draws itself in |

**Icons are multi-colour elements.** Every icon in use is an **icon element**
(`illustrations/icons/<name>.js`). It follows the same standard as the card
elements (see below): navy, blue, light blue and red parts that are dotted at
rest and drawn in thick lines on hover, in a 96×96 frame. Every icon shares one
dot (7), pitch (10) and line weight (5.5), so all icons read as one set.
`picon("name")` renders the element when `illustrations/icons/name.js`
exists. Preview them all with `node tools/icon-preview.js out/`, which shows
each icon at real tile size and at 3× zoom, at rest and on hover.

**Add an icon:** create `illustrations/icons/<name>.js` with
`icon("<name>", groups)` from `_shapes.js` (same primitives as the card
elements), then call `picon("<name>")`.

The single-colour fallback below is used only for an icon without an element
file.

How it works (fallback): each icon is hand-drawn line art (`ICONS` in `build.js`) rendered
twice by the `.picon` component (`css/style.css`) — a dotted stroke
(`.picon__dots`) and a solid stroke (`.picon__line`) — and crossfaded on hover.
Timing overlaps so the icon never blinks out mid-transition. Hovering the whole
card / tile / row also triggers it, keyboard focus gets the same clear state,
and `prefers-reduced-motion` is respected.

There are no one-off icons: every `<svg>` on the site is either the shared icon
definitions or an instance of this component.

Icon elements: `code` `mobile` `calendar` `globe` `megaphone` `gear`
`shield` `chart` `cloud` `database` `rocket` `users` `bulb` `mail` `pin` `pen`.

Fallback line icons: `code` `mobile` `calendar` `globe` `megaphone` `chip` `gear`
`shield` `chart` `cloud` `database` `rocket` `users` `bulb` `mail` `pin` `pen`
`article`.

## Card images (no longer used on any card)

Every card now shows a drawn element (next section). The generated images below
are kept for reference and the service-page hero art. Card illustrations follow the icon rule too: **pixelated but visible at rest,
clear on hover**, with the same timing as the icons.

Each card stacks two images that share one identical 4:3 frame:

| File | State |
|------|-------|
| `assets/cards/<name>-dots.svg` | **Rest** — the illustration redrawn as a grid of uniform round dots (the icon dot language at image scale) |
| `assets/cards/<name>.png` | **Hover** — the clear illustration |

Both are generated from the Figma PNGs in `assets/` by `build-images.js`
(no dependencies). It:

1. **Knocks out the off-white background** to true transparency (no grey box on cards).
2. **Auto-frames** each illustration into the same 4:3 crop so cards line up.
3. **Resizes** the clear version (~130–180 KB each, down from ~1.5 MB).
4. **Draws the dot version.** It aligns the grid to the artwork so edges land on
   clean rows, and keeps strokes one dot thick without breaking thin curves.
   It snaps each dot to the artwork's own five colours.

**Why the grid size differs per illustration.** The Figma illustrations are
drawn at different native dot sizes. Software is chunky, at ~14.7px spacing in
the frame; marketing and hardware are fine, at ~7.5px. So the script measures
each one and sets its rest grid to **1.45× its own dot spacing**, capped at 17:

| Illustration | Source spacing | Rest grid |
|---|---|---|
| Software | ~14.7 | 17 |
| Web | ~9 | 13 |
| Marketing | ~7.6 | 11 |
| Hardware | ~7.5 | 11 |

That keeps every card equally "pixelated but visible", and hover always
sharpens. With one global grid, the software card's rest state was as fine as
its own art, so hover changed nothing. An independent review panel picked
this 2–1 over one global grid. The trade-off is that the software card's
resting dots are a bit larger than its neighbours'.

To retune, edit `CONFIG.halftone` at the top of `build-images.js`:
- `pitchRatio`: how much coarser the rest grid is than the art.
- `maxPitch`: the upper limit on the grid.
- `dot`: dot size.
- `ART[i].pitch`: overrides the grid for one illustration.

Then run `node build-images.js`. The output is deterministic, so identical
input gives byte-identical files.

## Drawn elements instead of images (every card)

The service cards don't use pictures: **What We Do** (home), **What We Offer**
(Services) and **Explore More** (service pages). Blog cards use photos instead
(see "Blog thumbnails" below). Each shows a line-art **element** that depicts its own
heading, in the same 4:3 frame:

| Element | Card | Origin |
|---|---|---|
| **software** | Custom Software Development | traced from its Figma illustration |
| **mobile** | Mobile App Development | original design (no Figma picture depicts it) |
| **event** | Event Registration & Management | original design (no Figma picture depicts it) |
| **web** | Enterprise Web Portals & Websites | traced from its Figma illustration |
| **marketing** | Digital Marketing Services | traced from its Figma illustration |
| **hardware** | not used on a card at the moment | traced from its Figma illustration |

Explore More shows each linked service's element.

All six share one visual language: the same palette, a 15px dot rhythm,
11px dots and 7px hover lines. That way any set of them reads as one family.

| State | Look |
|-------|------|
| **Rest** | Dotted strokes: the pixelated picture |
| **Hover** | Thick solid strokes that draw themselves in: a line-drawn icon of the same picture |

It's the same rule and timing as the icon elements. In `build.js`,
`cardSection(..., { illus: true })` and `cardIllus(key)` render them.

- `illus.js` is the engine. It renders the geometry twice: dotted for rest,
  and thick with a draw-in for hover.
- `illustrations/<name>.js` holds the geometry: lines, arcs, curves, rects and
  dots in 720×540 frame coordinates, grouped by colour. A group can be marked:
  - `only: "rest"`: extra rows that rebuild a dense dotted fill (a solid gear,
    a double bezel) without cluttering the hover icon;
  - `only: "hover"`: shown only in the hover state.
- `tools/illus-preview.js` is the tracing and preview tool:
  ```bash
  node tools/illus-preview.js software out/                    # sheet: source | rest | hover | overlay  + labelled grid
  node tools/illus-preview.js software out/ crop 400 250 150 120 # zoomed crop with your geometry overlaid
  node tools/illus-preview.js row out/ software mobile event      # a row of elements at card size: rest + hover
  ```
  Run `node build.js` after editing an illustration.

## Blog thumbnails — photos, pixelated at rest

Blog posts will be added by an admin, each with its own uploaded image, so
Blog cards show **photos**, not drawn elements. They follow the same rule as
everything else:

| State | Look |
|-------|------|
| **Rest** | The photo, **slightly pixelated** (about 7px blocks) |
| **Hover** | The **clear** photo (fades in, with a slight 3% zoom) |

The pixelated layer is drawn in the browser by `js/main.js` from the photo
itself. Any uploaded image works, with no build step and nothing to prepare.
Without JavaScript the photo simply shows clear.

**Markup for a post thumbnail** (what the CMS template should output):

```html
<div class="card__media card__media--photo" data-pixelate>
  <img class="card__photo" src="…" alt="…" width="1200" height="675" loading="lazy" decoding="async" />
</div>
```

**Image guidelines for admins** (common blog / social-share standard):
- **16:9**, ideally **1200×675** px (minimum 800×450). Other sizes are
  centre-cropped to 16:9.
- JPEG or WebP, under ~200 KB.
- Put the subject near the centre, because crops trim the edges.
- Always write alt text that describes the photo.

To make the rest state more or less pixelated, change `--pixel` (block size
in CSS px) on `.card__media--photo` in `css/style.css`.

The home page's **Our Work** showcase reuses three of these photos (`WORK_PHOTOS` in `build.js`).
Swap them for real project screenshots there.

**Demo photos** (`assets/blog/`, from Unsplash, free under the Unsplash
licence; replace them with real post images):

| File | Photo | By |
|---|---|---|
| insights.jpg | analytics charts on a laptop | Luke Chesser |
| engineering.jpg | code on a laptop screen | Mohammad Rahmani |
| design.jpg | website wireframe sketches | Hal Gatewood |
| marketing.jpg | social media feed on a phone | Swello |
| case-study.jpg | team presentation | Campaign Creators |
| news.jpg | speaker on stage | Carlos Gil |

## Hero motion graphics (main pages)

The hero on every main page (Home, About, Services, Work, Blog, Careers,
Contact) runs a motion graphic modelled on the "Hero Loop" reference video.
One cloud of coloured dots keeps re-forming into that page's elements:

1. **Assemble.** Dots fly in and form the element: the pixelated state.
2. **Clear.** Dots tighten onto its lines as the crisp thick-line drawing draws
   itself in, and a caption appears with the element's title and subtitle.
3. **Disperse.** The drawing fades and the dots burst into a scattered cloud,
   which then re-forms as the next element. It never stops.

**Hover** holds the current element clear and enlarges it; moving away resumes
the flow. On touch screens, tap to hold or release.

The animation pauses while off-screen or in a background tab. With
`prefers-reduced-motion` it gently crossfades between the clear drawings
instead of flying the dots.

- `hero.js`: which elements each page shows, with captions. **About** shows
  team members (portrait, role badge, name and position), companies we've
  worked with (a logo wall) and our values. Every other page has its own set:
  services, projects, blog topics, open roles, contact details. Names and
  companies marked *Lorem* are placeholders; replace them in `hero.js`.
- Elements reuse the same geometry as everywhere else: the card illustrations,
  the icon elements, and `illustrations/hero/` (person, clients).
- `js/hero-motion.js`: the canvas particle engine (no dependencies).

## Scroll animations + micro-interactions

`js/motion.js` (with the matching block at the end of `css/style.css`) runs on
every page.

- **Scroll reveal.** Every container animates in once as it enters the
  viewport, with no markup changes needed:
  - headings and text fade up;
  - cards, features, steps and stats rise in a staggered cascade;
  - project and job rows slide in from the left;
  - technology tiles pop in, and the hero graphic zooms in.
  To animate a new kind of element, add its selector to `TARGETS`.
- **Micro-interactions:**
  - a scroll progress bar, a header shadow on scroll, and back-to-top with a
    progress ring;
  - a button ripple and lift;
  - cards tilt toward the pointer and their arrow nudges;
  - rows shift and show an arrow;
  - tiles lift;
  - form fields lift on focus, and an incomplete form shakes and focuses the
    first empty field;
  - footer links nudge, and the hero graphic has a light parallax.
- **Safe defaults.** Without JS nothing is hidden. With
  `prefers-reduced-motion` there is no animation. Tilt only runs with a mouse.
  Reveals use `translate`/`opacity` and clean up after themselves, so hover
  effects keep working.

## Structure

```
├── build.js          # generator: content, sections, icons → *.html
├── build-images.js   # card images: clear PNG + pixelated dot SVG per illustration
├── hero.js           # hero motion graphics: each page's elements + captions
├── illus.js          # line-art element engine (What We Do): dotted rest / thick-line hover
├── illustrations/    # card element geometry: software, mobile, event, web, marketing, hardware (.js)
│   └── icons/        # icon element geometry (96×96): one file per icon + _shapes.js helpers
├── tools/            # illus-preview.js (card elements), icon-preview.js (icon elements)
├── serve.js          # zero-dependency preview server
├── *.html            # 12 generated pages (see table)
├── css/style.css     # design system, components, icon + card standards (responsive)
├── js/main.js        # mobile nav, FAQ accordion, contact form
├── js/motion.js      # scroll reveals + micro-interactions (every page)
├── js/hero-motion.js # hero particle animation (assemble → clear → disperse)
├── assets/           # logo + source illustrations exported from Figma
│   ├── cards/        # generated card images (rest + hover)
│   └── blog/         # demo blog thumbnails (1200×675)
└── README.md
```

## Before going live

- **Contact form isn't connected.** It validates input and then tells visitors
  honestly that online messages aren't on yet, pointing them to email — it
  never pretends a message was sent. Wire `[data-contact-form]` in
  `js/main.js` to your backend or a service like Formspree.
- **Placeholder links (`#`)** — individual blog posts, case studies, and
  Privacy Policy / Terms of Service pages don't exist yet.
- **Placeholder content** — project names ("Project 01 · Web Portal"), job
  openings, and all Lorem ipsum should be replaced with real content.
- **Illustrations.** Figma provides 4 dotted illustrations for 5 services, so
  one repeats. Mobile App and Event Management reuse the closest ones.
  Event Management's *card* uses the marketing art so it never sits next to
  its twin, Enterprise Web Portals. Add dedicated art to `assets/`, point the
  service at it in `build.js`, and run `node build-images.js`.
- Body type is 18px (the Figma's 24px was sized for a 1512px artboard);
  everything else matches the design.
