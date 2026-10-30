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
   team names marked "Lorem" are placeholders — replace with real content.
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
    E("card:software", "Your Vision, Our Code", "Custom software development company in Mumbai"),
    E("card:oms", "Organisation Management System", "One platform for your entire organisation"),
    E("card:restaurant", "Restaurant Chain Management", "Every outlet. One screen."),
    E("card:marketing", "Agent Bandhu", "WhatsApp automation that actually works"),
    E("card:event", "Kaizen Events", "From registration to entry – handled"),
    E("card:transit", "Automated Fare Collection", "Modern ticketing for modern transit"),
    E("icon:users", "3 Lakh+ Active Users", "15+ years · 25+ projects"),
  ],
  about: [
    E("person:chart:light", "Lorem Ipsum", "Founder & CEO"),
    E("person:code:blue", "Dolor Sit", "Chief Technology Officer"),
    E("person:pen:light", "Amet Consectetur", "Design Lead"),
    E("person:check:blue", "Adipiscing Elit", "Project Manager"),
    E("clients", "Who We Have Worked With", "Income Tax Department · Mumbai Port Trust · Rotary · JITO · MRPL"),
    E("icon:gear", "Software That Fits You", "No forced workflows, no generic modules"),
    E("icon:shield", "Government-Grade Code", "Data integrity, audit trails, reliability"),
    E("icon:pin", "Always Reachable", "Based in Maharashtra, serving India"),
    E("icon:users", "Support After Go-Live", "We maintain what we build"),
  ],
  products: [
    E("card:oms", "Organisation Management System", "Less Manual Work. More Visibility. Better Decisions."),
    E("card:restaurant", "Restaurant Chain Management", "Less Wastage. More Control. Better Margins."),
    E("card:marketing", "Agent Bandhu", "Your Sales Agent That Never Forgets."),
    E("card:event", "Kaizen Events", "Easy Registration. Secure Payments. Fast QR Check-In."),
    E("card:transit", "Automated Fare Collection", "Unified Ticketing. Digital Validation. Real-Time Visibility."),
  ],
  services: [
    E("card:software", "Custom Software Development", "Built around your business"),
    E("card:mobile", "Mobile App Development", "Android and iOS"),
    E("card:event", "Event Registration & Management", "Registration, payments, QR check-in"),
    E("card:web", "Enterprise Web Portals & Websites", "Built for performance and security"),
    E("card:marketing", "Digital Marketing Services", "WhatsApp marketing automation"),
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
    E("icon:bulb", "Insights", "Ideas from our team"),
    E("icon:code", "Engineering", "How we build software"),
    E("icon:pen", "Design", "Designing for real users"),
    E("icon:megaphone", "Marketing", "WhatsApp and digital marketing"),
    E("icon:chart", "Case Study", "Real problems, real results"),
    E("icon:globe", "News", "Updates from Kaizen Infotech"),
  ],
  careers: [
    E("icon:megaphone", "Digital Marketing Executive", "Marketing · Thane West · Work from office"),
    E("icon:chart", "Business Development Manager", "Sales · Thane West · Work from office"),
    E("icon:users", "Relationship Manager", "Client Success · Thane West · Work from office"),
    E("icon:code", "Live Systems From Month One", "Real products, real users"),
    E("icon:bulb", "Life at Kaizen", "A small team where your growth is real"),
  ],
  contact: [
    E("icon:mail", "Email Us", "promotion@kaizeninfotech.com"),
    E("icon:mobile", "Call Us", "+91 93721 30855"),
    E("icon:pin", "Visit Us", "Wagle Industrial Estate, Thane West, Maharashtra 400604"),
    E("icon:users", "Let's Build Something Together", "Tell us about your requirement"),
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
