/* =====================================================================
   Kaizen Infotech — hero motion graphics: which elements each page shows

   Every main page's hero runs a particle animation (js/hero-motion.js):
   dots fly in and form an element (pixelated), tighten into its crisp
   line drawing (clear), then disperse and re-form as the next element —
   an endless flow. Each page's elements depict that page.

   Element sources (all in the illus.js primitive format):
     card:<key>   illustrations/<key>.js        (720×540 card illustrations)
     icon:<key>   illustrations/icons/<key>.js  (96×96 icon elements)
     person:<badge>:<ring>  illustrations/hero/person.js (team member)
     clients      illustrations/hero/clients.js (client logo wall)

   Captions: title + sub, shown while an element is clear. Names, roles and
   companies marked "Lorem" are placeholders — replace with real content.
   ===================================================================== */
const IL = require("./illus.js");
const person = require("./illustrations/hero/person.js");

function load(src) {
  const [kind, a, b] = src.split(":");
  if (kind === "card") return IL.loadIllus(a);
  if (kind === "icon") return IL.loadIllus(`icons/${a}`);
  if (kind === "person") return person(a, b);
  if (kind === "clients") return IL.loadIllus("hero/clients");
  throw new Error(`unknown hero element "${src}"`);
}

const E = (src, t, s) => ({ src, t, s });

const SETS = {
  home: [
    E("icon:bulb", "Solve Real Business Problems", "Tailor-made enterprise software"),
    E("card:software", "Build Systems That Scale", "Custom software development"),
    E("icon:rocket", "Built to Scale", "From launch to growth"),
    E("icon:chart", "Deliver Measurable Results", "Outcomes over output"),
    E("icon:users", "A Partner, Not a Vendor", "Government · Corporate · Community"),
    E("icon:shield", "Secure by Design", "Lorem ipsum dolor sit amet"),
  ],
  about: [
    E("person:chart:light", "Lorem Ipsum", "Founder & CEO"),
    E("person:code:blue", "Dolor Sit", "Chief Technology Officer"),
    E("person:pen:light", "Amet Consectetur", "Design Lead"),
    E("person:check:blue", "Adipiscing Elit", "Project Manager"),
    E("clients", "Companies We've Worked With", "Government · Corporate · Community"),
    E("icon:bulb", "Kaizen Mindset", "Our value: continuous improvement"),
    E("icon:users", "People First", "Our value"),
    E("icon:shield", "Integrity", "Our value"),
    E("icon:chart", "Outcomes Over Output", "Our value"),
  ],
  services: [
    E("card:software", "Custom Software Development", "Service"),
    E("card:mobile", "Mobile App Development", "Service"),
    E("card:event", "Event Registration & Management", "Service"),
    E("card:web", "Enterprise Web Portals & Websites", "Service"),
    E("card:marketing", "Digital Marketing Services", "Service"),
  ],
  work: [
    E("card:web", "Project 01 · Web Portal", "Government"),
    E("icon:users", "Project 02 · Member Platform", "Community"),
    E("card:event", "Project 03 · Event Registration", "Events"),
    E("card:mobile", "Project 04 · Mobile App", "Corporate"),
    E("icon:chart", "Project 05 · Reporting Dashboard", "Enterprise"),
    E("card:marketing", "Project 06 · Digital Campaign", "Marketing"),
  ],
  blog: [
    E("icon:bulb", "Insights", "Lorem ipsum dolor sit amet"),
    E("icon:code", "Engineering", "Lorem ipsum dolor sit amet"),
    E("icon:pen", "Design", "Lorem ipsum dolor sit amet"),
    E("icon:megaphone", "Marketing", "Lorem ipsum dolor sit amet"),
    E("icon:chart", "Case Study", "Lorem ipsum dolor sit amet"),
    E("icon:globe", "News", "Lorem ipsum dolor sit amet"),
  ],
  careers: [
    E("icon:code", "Software Engineer", "Engineering · Thane"),
    E("icon:mobile", "Mobile Developer", "Engineering · Thane"),
    E("icon:pen", "UI / UX Designer", "Design · Thane"),
    E("icon:megaphone", "Digital Marketing Executive", "Marketing · Thane"),
    E("icon:calendar", "Project Coordinator", "Operations · Thane"),
    E("icon:users", "Life at Kaizen", "Grow with a team that builds systems that scale"),
  ],
  contact: [
    E("icon:mail", "Email Us", "communication@kaizeninfotech.com"),
    E("icon:mobile", "Call Us", "+91 93724 30855"),
    E("icon:pin", "Visit Us", "Thane West, Thane, Maharashtra 400604"),
    E("icon:users", "Let's Talk", "Tell us about your project"),
  ],
};

const r1 = (v) => (typeof v === "number" ? Math.round(v * 10) / 10 : Array.isArray(v) ? v.map(r1) : v);

// Compact JSON for one page: [{f:{w,h}, g:[{c, o, p}], t, s}]
function heroData(page) {
  const set = SETS[page];
  if (!set) throw new Error(`no hero set for "${page}"`);
  return set.map((e) => {
    const d = load(e.src);
    return {
      f: d.frame || IL.FRAME,
      g: d.groups.map((g) => ({ c: g.color, o: g.only || 0, p: r1(g.prims) })),
      t: e.t,
      s: e.s,
    };
  });
}

module.exports = { SETS, heroData };
