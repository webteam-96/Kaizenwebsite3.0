/* =====================================================================
   Kaizen Infotech — site copy and SEO data
   Source: "Kaizen Website Full Content.docx" (SEO + AEO + AI visibility
   revamp, October 2026). build.js renders this into the pages; edit the
   words here, not in the generated .html files.

   Plain text only (no HTML): build.js escapes everything it inserts.
   Dashes in the source (" - ") are written as en dashes (" – ").
   ===================================================================== */

const SITE = {
  name: "Kaizen Infotech Solutions Pvt. Ltd.",
  short: "Kaizen Infotech",
  url: "https://www.kaizeninfotech.com/", // canonical origin (with trailing slash)
  tagline: "Your Vision, Our Code.",
  email: "promotion@kaizeninfotech.com",
  careersEmail: "careers@kaizeninfotech.com",
  phone: "+91 93721 30855",
  phoneHref: "+919372130855",
  address: {
    street: "Centrum Business Square, A 406, Road No. 16, Nehru Nagar, Wagle Industrial Estate",
    locality: "Thane West",
    region: "Maharashtra",
    postal: "400604",
    country: "IN",
  },
  maps: "https://share.google/4qGwhOovRaaMws0Kv",
  social: [
    ["LinkedIn", "https://in.linkedin.com/company/kaizen-infotech-solutions-pvt-ltd-"],
    ["Instagram", "https://www.instagram.com/kaizeninfotech/"],
    ["Facebook", "https://www.facebook.com/officialkaizeninfotech/"],
    ["X", "https://x.com/infotech_kaizen"],
  ],
  twitter: "@infotech_kaizen",
  clients: ["Rotary International", "Mumbai Port Trust", "Income Tax Department of India", "JITO", "MRPL", "Orion Gametes"],
};
SITE.addressLine = `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postal}`;

// Figures used on Home and About (3 counters)
const STATS = [
  ["15+", "Years of Enterprise Software"],
  ["25+", "Projects Delivered"],
  ["3 Lakh+", "Active Users on Our Platforms"],
];

/* ------------------------------------------------------------------ Home */
const HOME = {
  metaTitle: "Custom Software Development Company in Mumbai | Kaizen Infotech Solutions Pvt. Ltd.",
  metaDesc: "Kaizen Infotech Solutions Pvt. Ltd. builds custom enterprise software, products and automation tools for Indian businesses. 15+ years of enterprise software, 25+ projects, 3 lakh+ users. Your Vision, Our Code.",
  eyebrow: "Custom Software Development Company in Mumbai",
  h1: "Your Vision, Our Code",
  text: "Kaizen Infotech Solutions Pvt. Ltd. builds software that solves real problems for real organisations – from restaurant chains and transit operators to government bodies and growing enterprises.",
  whatWeDo: {
    eyebrow: "What We Do",
    title: "Software That Fits Your Business – Not the Other Way Around",
    text: "We do not sell subscriptions to tools built for someone else's workflow. We build products and custom software around the exact way your business operates.",
  },
  products: {
    eyebrow: "Our Products",
    title: "Five Products. Five Industries. One Team Behind All of Them.",
    text: "Every product we have built started as a real problem a real organisation asked us to solve.",
  },
  work: {
    title: "Trusted by Organisations That Cannot Afford to Get It Wrong",
    text: "From the Income Tax Department of India to Rotary International district events to Mumbai Port Trust – our software runs in environments where reliability is non-negotiable.",
  },
  why: {
    eyebrow: "Why Kaizen",
    title: "15+ Years of Building Software That Lasts",
    text: "Kaizen Infotech Solutions Pvt. Ltd. has been building enterprise software for over 15 years. We have delivered 25+ projects, built 5 software products, and created platforms that serve more than 3 lakh active users. We are a small team of engineers who take ownership of every project we build – from the first requirement discussion to go-live and beyond.",
    items: [
      ["rocket", "Products", "Ready-to-deploy platforms for specific industries – restaurants, transit, events, and more."],
      ["code", "Custom Software", "Enterprise software designed and built from scratch around your team's exact requirements."],
      ["gear", "Automation", "Workflows, follow-ups, reports, and alerts – automated so your team does not have to."],
      ["shield", "Government-Grade Reliability", "Code written with data integrity, audit trails, and long-term reliability in mind."],
      ["pin", "Based in Maharashtra", "We serve clients across India – and you can always reach us."],
      ["users", "We Maintain What We Build", "Our relationship does not end at go-live. Bug fixes, updates, and new features – we are a call away."],
    ],
  },
  // Home "How We Work" keeps its five step names; the words come from the project process
  steps: [
    ["bulb", "Understand", "We understand your business, your problem, and what the software needs to accomplish. No jargon, no assumptions."],
    ["pen", "Design", "We define exactly what will be built, how long it will take, and what it will cost. Everything in writing."],
    ["code", "Develop", "Iterative development with regular demos. You see progress, give feedback, and course-correct early."],
    ["rocket", "Deploy", "Thorough testing, data migration if needed, training for your team, and a smooth go-live."],
    ["users", "Support", "We maintain what we build. Bug fixes, updates, and new features – we are a call away."],
  ],
  faq: [
    ["What does Kaizen Infotech Solutions Pvt. Ltd. do?", "Kaizen Infotech Solutions Pvt. Ltd. is a custom software development company based in Maharashtra. We build enterprise software, industry-specific products, and automation tools for Indian businesses. With 15+ years of enterprise software experience, we have delivered 25+ projects for clients including government departments, hospitality groups, transit operators, and membership organisations."],
    ["Where is Kaizen Infotech Solutions Pvt. Ltd. located?", `Our office is at ${SITE.addressLine}.`],
    ["What industries does Kaizen Infotech Solutions Pvt. Ltd. serve?", "We build software for restaurants and hospitality chains, public transit operators, membership and event organisations, government bodies, and enterprises across sectors including real estate, manufacturing, and professional services."],
    ["How long has Kaizen Infotech Solutions Pvt. Ltd. been in business?", "Kaizen Infotech Solutions Pvt. Ltd. has been building enterprise software for Indian businesses for over 15 years, with a track record spanning government departments, hospitality groups, transit operators, and enterprises across India."],
  ],
  cta: "Tell us what you need. Whether you have a detailed brief or just an idea, we will tell you honestly if we can help – and how.",
};

/* ----------------------------------------------------------------- About */
const ABOUT = {
  metaTitle: "About Us | Kaizen Infotech Solutions Pvt. Ltd. – 15+ Years of Enterprise Software in India",
  metaDesc: "Learn about Kaizen Infotech Solutions Pvt. Ltd.: 15+ years of enterprise software development, 25+ projects and 3 lakh+ users. Software trusted by government bodies and enterprises across India.",
  h1: "Built on 15+ Years of Solving Real Problems",
  text: "Kaizen Infotech Solutions Pvt. Ltd. started with a clear purpose: build software that actually works for Indian businesses, in the way Indian businesses actually operate.",
  who: {
    title: "Who We Are",
    paras: [
      "We are based in Maharashtra. We are not a large agency with hundreds of clients managed by account managers. We are a focused engineering team that takes a limited number of projects at a time, so every client gets our full attention.",
      "We have delivered 25+ projects, built 5 software products, and created platforms that serve more than 3 lakh active users – for clients across government, hospitality, transit, and membership organisations across India.",
    ],
  },
  journey: {
    title: "How We Got Here – and Where We Are",
    items: [
      ["bulb", "How It Started", "Kaizen Infotech Solutions Pvt. Ltd. was built with one goal: create enterprise software that actually fits the way Indian businesses operate. No off-the-shelf compromises. No generic modules. Just software that works."],
      ["shield", "First Government Deployment", "Our first major government project was a turning point. It proved we could build software that meets the reliability, audit, and accountability standards of public sector organisations – and we have been doing it ever since."],
      ["chart", "Where We Stand Today", "25+ projects delivered. 5 software products built and deployed. 3 lakh+ active users on our platforms. Clients across government, hospitality, transit, and membership organisations across India."],
    ],
  },
  why: {
    title: "Why Clients Choose Us",
    items: [
      ["gear", "Software That Fits You", "We build software that fits your business – not the other way around. No forced workflows, no generic modules."],
      ["shield", "Government-Grade Code", "We have worked on government-grade projects, so our code is written with data integrity, audit trails, and long-term reliability in mind."],
      ["pin", "Always Reachable", "We are based in Maharashtra and serve clients across India. You can always reach us."],
      ["users", "Support After Go-Live", "We maintain the software we build. Our relationship does not end at go-live."],
    ],
  },
  culture: {
    title: "How We Work",
    paras: [
      "We are a work-from-office team. Every engineer, designer, and manager works together in person – which means faster decisions, clearer communication, and better software.",
      "We hire people who want to learn by working on real, complex problems – not tutorials. If you join our team, you will be working on live systems used by thousands of people from your first month.",
    ],
  },
  clientsTitle: "Who We Have Worked With",
  faq: [
    ["When was Kaizen Infotech Solutions Pvt. Ltd. founded?", "Kaizen Infotech Solutions Pvt. Ltd. has been in business for more than 15 years, building enterprise software from Maharashtra, India."],
    ["Who are the clients of Kaizen Infotech Solutions Pvt. Ltd.?", "Our clients include the Income Tax Department of India, Mumbai Port Trust, Rotary International district organisations, JITO, MRPL, and Orion Gametes, among others."],
    ["What is the tagline of Kaizen Infotech Solutions Pvt. Ltd.?", "The tagline of Kaizen Infotech Solutions Pvt. Ltd. is 'Your Vision, Our Code.' It reflects our commitment to building software that is designed entirely around the client's specific requirements."],
  ],
  cta: "Want to know how we can help your organisation? Let's start a conversation.",
};

/* -------------------------------------------------------------- Services */
const SERVICES_PAGE = {
  metaTitle: "Custom Software Development Services in Mumbai | Kaizen Infotech Solutions Pvt. Ltd.",
  metaDesc: "Kaizen Infotech Solutions Pvt. Ltd. offers custom software development, enterprise application development, web and mobile application development, and automation solutions for Indian businesses. Based in Maharashtra, serving clients across India.",
  h1: "Custom Software Built Around Your Business",
  text: "Every organisation is different – so why should your software be generic? Kaizen Infotech Solutions Pvt. Ltd. designs and builds software from scratch in Maharashtra, based on how your business actually works. No compromises on features, no paying for modules you do not need.",
  offerTitle: "What We Offer",
  build: {
    title: "What We Build",
    text: "Every organisation is different. The way you manage your team, track your sales, run your operations – none of it is exactly like anyone else.",
    items: [
      ["globe", "Enterprise Web Applications", "Full-stack web applications for internal operations, customer portals, and industry-specific workflows. Built for performance, security, and long-term maintainability."],
      ["mobile", "Mobile Applications", "Android and iOS applications for field teams, customer-facing tools, and operational dashboards. Designed to work reliably even in low-connectivity environments."],
      ["gear", "Business Process Automation", "Approvals, follow-ups, data entry, report generation – we identify the repetitive tasks in your workflow and automate them. Your team focuses on decisions, not manual work."],
      ["shield", "Government and Public Sector Software", "Software built to the reliability, security, and audit-trail standards required by government departments. We have delivered government-facing systems since 2017."],
      ["database", "System Integration", "Connect your existing tools – accounting software, CRM, inventory systems, payment gateways – into a unified workflow. No more duplicate data entry across disconnected systems."],
      ["rocket", "Product Development", "Have an idea for a software product? We will take it from concept to a deployable, scalable product. We have built five products of our own using the same process."],
    ],
  },
  stepsTitle: "How a Project Works With Us",
  steps: [
    ["bulb", "Discovery", "We understand your business, your problem, and what the software needs to accomplish. No jargon, no assumptions."],
    ["pen", "Scoping", "We define exactly what will be built, how long it will take, and what it will cost. Everything in writing, no ambiguity."],
    ["code", "Build", "Iterative development with regular demos. You see progress, give feedback, and course-correct early rather than at the end."],
    ["rocket", "Launch", "Thorough testing, data migration (if needed), training for your team, and a smooth go-live."],
    ["users", "Support", "We maintain what we build. Bug fixes, updates, and new features – we are a call away."],
  ],
  faq: [
    ["Does Kaizen Infotech Solutions Pvt. Ltd. build software from scratch or customise existing platforms?", "We primarily build custom software from scratch, designed around your specific requirements. We also integrate and extend existing platforms where that is the better solution for the client."],
    ["How long does a custom software project take?", "Project timelines vary based on scope. A focused internal tool may take 6 to 10 weeks. A full enterprise platform with multiple modules typically takes 4 to 8 months. We define and agree on timelines before any work begins."],
    ["Does Kaizen Infotech Solutions Pvt. Ltd. work with government organisations?", "Yes. We have been building software for government and public sector organisations since 2017. Our first major government deployment was in that year, and we understand the compliance, audit, and reliability requirements of public sector projects."],
  ],
  ctaTitle: "Tell Us What You Need",
  cta: `Email ${SITE.email} or call ${SITE.phone} – or send us a message and we will get back to you.`,
};

// The five service detail pages (same slugs as before). Copy is drawn from the
// Services, product and About sections of the content document.
const SERVICE_FAQ = SERVICES_PAGE.faq;
const SERVICE_COPY = {
  "custom-software-development": {
    card: "Enterprise software designed and built from scratch around your team's exact requirements.",
    bullets: ["Built around your workflow", "Approvals, follow-ups and reports automated", "Connected to the tools you already use", "Maintained after go-live"],
    hero: "Kaizen Infotech Solutions Pvt. Ltd. designs and builds custom software from scratch, based on how your business actually works. No compromises on features, no paying for modules you do not need.",
    overview: [
      "Every organisation is different. The way you manage your team, track your sales, run your operations – none of it is exactly like anyone else. So why should your software be generic? We do not sell subscriptions to tools built for someone else's workflow.",
      "We are a focused engineering team based in Maharashtra that takes ownership of every project we build – from the first requirement discussion to go-live and beyond. Our code is written with data integrity, audit trails, and long-term reliability in mind.",
    ],
    deliver: [
      "Enterprise web applications for internal operations, customer portals, and industry-specific workflows.",
      "Business process automation – approvals, follow-ups, data entry, and report generation handled automatically.",
      "System integration that connects accounting software, CRM, inventory systems, and payment gateways into one workflow.",
      "Product development from concept to a deployable, scalable product – the same process behind our five products.",
      "Ongoing maintenance after go-live: bug fixes, updates, and new features.",
    ],
    faq: [SERVICE_FAQ[0], SERVICE_FAQ[1], ["Do you maintain the software after it goes live?", "Yes. We maintain the software we build. Our relationship does not end at go-live – bug fixes, updates, and new features are a call away."]],
  },
  "mobile-app-development": {
    card: "Android and iOS apps for field teams, customer-facing tools, and operational dashboards.",
    bullets: ["Android and iOS", "Field team and customer apps", "Reliable in low connectivity", "Connected to your back office"],
    hero: "Kaizen Infotech Solutions Pvt. Ltd. builds Android and iOS applications for field teams, customer-facing tools, and operational dashboards – designed to work reliably even in low-connectivity environments.",
    overview: [
      "Your team and your customers already work from their phones. We build mobile applications around the exact way your business operates, connected to the systems your team relies on every day.",
      "Our mobile work is already in use at the gate and on the move: event volunteers check in delegates by scanning QR codes on a standard smartphone with Kaizen Events, and transit passengers buy tickets through the mobile app channel of our Automated Fare Collection system.",
    ],
    deliver: [
      "Android and iOS applications built around your workflows.",
      "Apps for field teams that keep working reliably in low-connectivity environments.",
      "Customer-facing tools for bookings, tickets, payments, and updates.",
      "Operational dashboards that put live business data on a phone.",
      "Integration with your back-office systems, payment gateways, and existing tools.",
    ],
    faq: [
      ["Do you build apps for both Android and iOS?", "Yes. Kaizen Infotech Solutions Pvt. Ltd. builds Android and iOS applications for field teams, customer-facing tools, and operational dashboards."],
      ["Will the app work where connectivity is poor?", "Our mobile applications are designed to work reliably even in low-connectivity environments, so field teams are not held up by a weak signal."],
      SERVICE_FAQ[1],
    ],
  },
  "event-management": {
    card: "Online registration, secure payments, and QR check-in for events with hundreds to thousands of attendees.",
    bullets: ["Branded registration pages", "UPI, card and net banking payments", "QR check-in in under 3 seconds", "Live attendee dashboard"],
    hero: "From registration to entry – handled. Kaizen Infotech Solutions Pvt. Ltd. runs online registration, secure payment collection, and QR-based check-in for conferences, membership events, and community gatherings.",
    overview: [
      "Running a large event means managing registrations, chasing payments, printing delegate lists, and handling long check-in queues on the day. If any part breaks down, it reflects on your entire event.",
      "With Kaizen Events, delegates register online, pay securely, and receive a QR code. At the venue, entry takes under 3 seconds per person – and your team has live attendance numbers the entire time.",
    ],
    deliver: [
      "Branded registration pages with custom fields, delegate categories, pricing tiers, and group bookings.",
      "Secure payments via UPI, cards, and net banking – confirmed instantly.",
      "A unique QR entry ticket in every attendee's confirmation email.",
      "QR check-in at the gate on any smartphone – under 3 seconds per delegate.",
      "A live dashboard of registrations, payments, and attendance, with clean data to export afterwards.",
    ],
    product: "kaizen-events",
    faq: null, // filled from the Kaizen Events product FAQ below
  },
  "enterprise-web-portals": {
    card: "Full-stack web applications for internal operations, customer portals, and industry-specific workflows.",
    bullets: ["Customer and member portals", "Internal operations systems", "Government-grade audit trails", "Built for performance and security"],
    hero: "Kaizen Infotech Solutions Pvt. Ltd. builds enterprise web applications and portals for internal operations, customer portals, and industry-specific workflows – built for performance, security, and long-term maintainability.",
    overview: [
      "Full-stack web applications designed around how your organisation actually works, with one login and one accurate view of your data instead of disconnected tools.",
      "For government departments and public sector bodies, we build to the reliability, security, and audit-trail standards they require. We have delivered government-facing systems since 2017.",
    ],
    deliver: [
      "Customer and member portals built for your industry's workflows.",
      "Internal operations systems that replace spreadsheets and disconnected tools.",
      "Government and public sector software with full audit trails.",
      "Integration with accounting software, CRM, inventory systems, and payment gateways.",
      "Performance, security, and long-term maintainability – plus support after go-live.",
    ],
    faq: [SERVICE_FAQ[2], SERVICE_FAQ[0], SERVICE_FAQ[1]],
  },
  "digital-marketing": {
    card: "WhatsApp marketing automation: personalised campaigns, follow-ups, and reminders for thousands of contacts.",
    bullets: ["Bulk personalised campaigns", "Automated follow-up sequences", "Customer segments", "Payment and reminder alerts"],
    hero: "Reach customers on the app they already use every day. Kaizen Infotech Solutions Pvt. Ltd. automates WhatsApp marketing – personalised campaigns, follow-ups, and reminders – with Agent Bandhu.",
    overview: [
      "Most Indian businesses already use WhatsApp to talk to customers. The problem is that it is all manual: messages sent one at a time, follow-ups that depend on someone remembering, and no record of who was contacted when.",
      "Agent Bandhu automates all of it. Send personalised campaigns to thousands of contacts, run automated follow-up sequences, and manage your entire customer pipeline – while your sales team focuses on the conversations that need a human.",
    ],
    deliver: [
      "Bulk personalised WhatsApp campaigns that read like a direct message, not a blast.",
      "Automated follow-up sequences triggered by what each lead does.",
      "Customer segments by purchase history, location, product interest, or any tag.",
      "Payment due, overdue, and appointment reminders sent on time.",
      "Birthday and anniversary messages that build loyalty without manual effort.",
    ],
    product: "agent-bandhu",
    faq: null, // filled from the Agent Bandhu product FAQ below
  },
};

/* -------------------------------------------------------------- Products */
const PRODUCTS_PAGE = {
  metaTitle: "Our Software Products | Kaizen Infotech Solutions Pvt. Ltd.",
  metaDesc: "Explore the software products built by Kaizen Infotech Solutions Pvt. Ltd.: OMS for enterprise management, Restaurant Chain Software, Agent Bandhu WhatsApp CRM, Kaizen Events, and Automated Fare Collection. Ready to deploy. Built in India.",
  h1: "Software Products Built for Real Business Problems",
  text: "Every product Kaizen Infotech Solutions Pvt. Ltd. has built started because an organisation came to us with a problem that existing tools could not solve. We solved it once, built it properly, and made it available to everyone with the same problem.",
  gridTitle: "Five Products. Five Industries.",
  cta: "Tell us which product fits your organisation and we will show you a live demo.",
};

// illus = drawn element (illustrations/<illus>.js); icon = picon for lists
const PRODUCTS = [
  {
    slug: "organisation-management-system",
    name: "Organisation Management System (OMS)",
    card: "Organisation Management System",
    short: "OMS",
    illus: "oms",
    icon: "users",
    category: "BusinessApplication",
    oneLine: "One platform for your entire organisation.",
    cardDesc: "OMS connects sales, HR, finance, projects, and internal messaging into a single system. No more switching between tools. Every decision made on live, accurate data.",
    metaTitle: "Organisation Management System (OMS) | Kaizen Infotech Solutions Pvt. Ltd.",
    metaDesc: "OMS by Kaizen Infotech Solutions Pvt. Ltd. is an all-in-one business platform with Sales CRM, HRMS, Finance, Project Management, Internal Messaging and Automation. Reduce manual work and get complete visibility. Built for Indian enterprises.",
    h1: "Organisation Management System (OMS)",
    tagline: "Less Manual Work. More Visibility. Better Decisions.",
    intro: [
      "Most organisations reach a point where their tools stop keeping up. Sales uses one CRM. HR is on a different system. Finance is on spreadsheets. Projects are tracked in WhatsApp groups. Nobody has a single accurate view of the business.",
      "OMS by Kaizen Infotech Solutions Pvt. Ltd. brings every department onto one integrated platform. One login. One source of truth. Complete visibility for managers and team members alike.",
    ],
    modulesTitle: "What OMS Includes",
    modules: [
      ["chart", "Sales and CRM", "Track every lead, manage your pipeline, assign follow-ups. Sales managers see the full picture in real time."],
      ["users", "HRMS", "Employee records, attendance, leave management, and payroll – all in one place without spreadsheets."],
      ["calendar", "Project Management", "Create projects, assign tasks, set deadlines, track progress. Know the status of every project without a status meeting."],
      ["database", "Finance", "Invoicing, expense tracking, GST compliance, and financial reporting – updated automatically as transactions happen."],
      ["mail", "Internal Messaging", "Team communication built directly into the platform. No need for a separate chat tool."],
      ["gear", "Automation", "Follow-up reminders, approval workflows, scheduled reports – triggered automatically by rules you set."],
    ],
    benefitsTitle: "How OMS Changes the Way Your Team Works",
    benefits: [
      "Every department in one view – sales, HR, finance, and projects on a single screen.",
      "Managers get real-time status without having to chase updates from individuals.",
      "Routine follow-ups, reminders, and reports happen automatically.",
      "Full audit trail on every action – know what happened, when, and who did it.",
      "New team members onboard faster because everything is in one place.",
    ],
    bestFor: "Indian businesses and organisations with 20 to 500 employees running operations across multiple departments – real estate, manufacturing, professional services, and government sector organisations.",
    ctaButton: "Request a Demo",
    ctaText: "Talk to the Kaizen Infotech Solutions Pvt. Ltd. team about configuring OMS for your organisation.",
    faq: [
      ["What is the Organisation Management System by Kaizen Infotech Solutions Pvt. Ltd.?", "The OMS is an all-in-one business management platform that brings Sales CRM, HRMS, Project Management, Finance, Internal Messaging, and Automation into a single integrated system. It is designed for Indian enterprises that want to reduce manual work, eliminate disconnected tools, and get real-time visibility across all departments."],
      ["Which businesses should use OMS?", "OMS is best suited for Indian organisations with 20 to 500 employees that are managing operations across multiple departments using a combination of spreadsheets, standalone CRM tools, and messaging apps. Industries include real estate, manufacturing, professional services, and government sector bodies."],
      ["Does OMS include payroll?", "Yes. The HRMS module in OMS includes payroll processing, along with attendance tracking, leave management, and employee records."],
    ],
  },
  {
    slug: "restaurant-chain-management-software",
    name: "Restaurant Chain Management Software",
    card: "Restaurant Chain Management",
    short: "Restaurant Software",
    illus: "restaurant",
    icon: "chart",
    category: "BusinessApplication",
    oneLine: "Every outlet. One screen.",
    cardDesc: "Manage billing, inventory, kitchen orders, Swiggy, Zomato, and staff across all your outlets from a single platform. See your profit margins in real time.",
    metaTitle: "Restaurant Chain Management Software | Kaizen Infotech Solutions Pvt. Ltd.",
    metaDesc: "Restaurant chain management software by Kaizen Infotech Solutions Pvt. Ltd.: POS billing, inventory, kitchen management, Swiggy and Zomato integration, HRMS, and live profit dashboards across all outlets. Built for multi-outlet restaurants in India.",
    h1: "Restaurant Chain Management Software",
    tagline: "Less Wastage. More Control. Better Margins.",
    intro: [
      "Running a chain of outlets means managing billing, stock, kitchen operations, delivery orders, and staff – all at once, across multiple locations. When each outlet operates independently, margins shrink, wastage goes unnoticed, and the month-end numbers are always a surprise.",
      "This software by Kaizen Infotech Solutions Pvt. Ltd. connects every outlet into one platform. Owners see live profit across all branches. The team spends less time on paperwork and more time on service.",
    ],
    modulesTitle: "Everything Your Chain Needs in One System",
    modules: [
      ["code", "Billing and POS", "Fast counter billing across all outlets. Supports cash, card, UPI, and digital wallets. Synced to the central system instantly."],
      ["database", "Inventory Management", "Stock reduces automatically as dishes are sold. Low-stock alerts sent before you run out. Nothing goes untracked."],
      ["article", "Kitchen Management", "Orders go directly to a kitchen display screen the moment they are placed. No paper tickets, no miscommunication."],
      ["users", "Waiter Management", "Table assignment, order tracking, and floor management from a central system."],
      ["mobile", "Swiggy and Zomato Integration", "Online delivery orders appear on the same screen as counter orders. One view for all channels."],
      ["chart", "Owner's Dashboard", "Live sales, cost, and profit across every outlet. Compare branches, spot problems, act immediately."],
      ["megaphone", "Loyalty and CRM", "Track customer visits, manage loyalty points, and send targeted offers to repeat customers."],
      ["calendar", "HRMS and Payroll", "Staff attendance, shifts, and payroll managed centrally for all outlets."],
      ["shield", "Finance and GST", "Automated GST calculations on every bill. Financial summaries generated without manual effort."],
    ],
    benefitsTitle: "What Actually Improves",
    benefits: [
      "Wastage drops because every ingredient is tracked against every dish sold.",
      "Swiggy and Zomato revenue is captured alongside counter sales – no revenue gap.",
      "Kitchen errors reduce because orders go directly to a display, not passed verbally.",
      "Owners compare outlet performance in real time and fix problems before they compound.",
      "Payroll and GST filing take a fraction of the time they used to.",
      "Automation handles the routine: auto-reorder when stock is low, scheduled daily reports, and approval workflows for purchases.",
    ],
    bestFor: "Restaurant chain owners in India with 2 or more outlets – QSR chains, casual dining brands, cloud kitchen networks, and franchise operations.",
    ctaButton: "Book a Demo",
    ctaText: "See how Kaizen Infotech Solutions Pvt. Ltd. sets this up for your restaurant chain.",
    faq: [
      ["Does the software integrate with Swiggy and Zomato?", "Yes. Online delivery orders from Swiggy and Zomato appear on the same screen as your counter orders. There is no need to manage separate tablets or manually re-enter delivery orders."],
      ["Can I see profit and sales across all my outlets in one place?", "Yes. The Owner's Dashboard shows live sales, cost, and profit data across every outlet, updated in real time. You can view consolidated numbers for the full chain or drill down into a specific branch."],
      ["Does the restaurant software include staff payroll?", "Yes. The HRMS and Payroll module manages staff attendance, shift scheduling, and payroll processing for all outlets from a central system."],
    ],
  },
  {
    slug: "agent-bandhu",
    name: "Agent Bandhu",
    card: "Agent Bandhu",
    short: "Agent Bandhu",
    illus: "marketing",
    icon: "megaphone",
    category: "CommunicationApplication",
    oneLine: "WhatsApp automation that actually works.",
    cardDesc: "Send personalised campaigns to thousands of contacts, automate follow-ups and reminders, and manage your customer pipeline – all through WhatsApp.",
    metaTitle: "Agent Bandhu – WhatsApp Marketing Automation and CRM | Kaizen Infotech Solutions Pvt. Ltd.",
    metaDesc: "Agent Bandhu by Kaizen Infotech Solutions Pvt. Ltd. automates your WhatsApp marketing, follow-ups and customer pipeline. Send personalised bulk campaigns, set automated reminders and manage your CRM through WhatsApp. Built for Indian sales teams.",
    h1: "Agent Bandhu – WhatsApp Marketing Automation",
    tagline: "Your Sales Agent That Never Forgets.",
    intro: [
      "Most Indian businesses already use WhatsApp to talk to customers. The problem is that it is all manual. Messages sent one at a time. Follow-ups depending on someone remembering. No record of who was contacted when.",
      "Agent Bandhu automates all of it. Send personalised campaigns to thousands of contacts, run automated follow-up sequences, and manage your entire customer pipeline – through the app your customers are already using every day.",
    ],
    modulesTitle: "What Agent Bandhu Does",
    modules: [
      ["megaphone", "Bulk Personalised Campaigns", "Send to thousands of contacts at once. Each message is personalised with the recipient's name, product, amount, or any other field – so it feels like a direct message, not a blast."],
      ["gear", "Automated Follow-Up Sequences", "Set triggers and the system handles the follow-up. Lead comes in, welcome message goes out. No response in 2 days, follow-up goes out automatically."],
      ["users", "Industry-Specific CRM", "Customer profiles, deal stages, interaction history, and task management – all connected to your WhatsApp conversations."],
      ["calendar", "Payment and Reminder Alerts", "Automated payment due reminders, overdue nudges, appointment reminders – sent at the right time without anyone having to remember."],
      ["chart", "Customer Segments", "Group customers by purchase history, location, product interest, or any tag. Send targeted messages to the right group."],
      ["mail", "Birthday and Anniversary Messages", "Automated relationship messages sent on the right date for every contact. Loyalty built without manual effort."],
    ],
    benefitsTitle: "Why WhatsApp Automation Outperforms Email and SMS",
    benefits: [
      "WhatsApp messages are read far more reliably than email – your message actually gets seen.",
      "Follow-ups happen on schedule even when your team is busy or away.",
      "Every customer interaction is recorded, so the full history is always visible to your team.",
      "Automation reduces the manual work on your sales team so they can focus on conversations that need a human.",
    ],
    bestFor: "Sales-driven businesses in real estate, education, insurance, retail, healthcare, and professional services – where WhatsApp is already the primary customer communication channel.",
    ctaButton: "Get Started with Agent Bandhu",
    ctaText: "Talk to Kaizen Infotech Solutions Pvt. Ltd. to see a live demo and discuss how Agent Bandhu fits your sales process.",
    faq: [
      ["What is Agent Bandhu?", "Agent Bandhu is a WhatsApp marketing automation and CRM platform developed by Kaizen Infotech Solutions Pvt. Ltd. It allows businesses to send personalised bulk WhatsApp campaigns, automate follow-up sequences and reminders, and manage their full customer pipeline through WhatsApp."],
      ["How is Agent Bandhu different from a regular WhatsApp Business account?", "A standard WhatsApp Business account lets you send messages manually and set up a few quick replies. Agent Bandhu adds bulk personalised messaging, automated sequences triggered by customer actions, a built-in CRM with deal stages and history, and customer segmentation – making it a complete sales automation tool rather than just a messaging app."],
      ["Which industries use Agent Bandhu?", "Agent Bandhu is used by businesses in real estate, coaching and education institutes, insurance and financial services, retail, healthcare, and professional services – any business where follow-up and relationship management on WhatsApp are central to sales."],
    ],
  },
  {
    slug: "kaizen-events",
    name: "Kaizen Events",
    card: "Kaizen Events",
    short: "Kaizen Events",
    illus: "event",
    icon: "calendar",
    category: "BusinessApplication",
    oneLine: "From registration to entry – handled.",
    cardDesc: "Online registration, secure payment collection, and QR-based check-in at the gate. Built for events with hundreds to thousands of attendees.",
    metaTitle: "Kaizen Events – Event Registration, Payments and QR Check-In | Kaizen Infotech Solutions Pvt. Ltd.",
    metaDesc: "Kaizen Events by Kaizen Infotech Solutions Pvt. Ltd. is an end-to-end event management platform: online registration, secure payment gateway and QR-based entry check-in. Built for conferences, membership events and community gatherings in India.",
    h1: "Kaizen Events – Event Registration and Management Platform",
    tagline: "Easy Registration. Secure Payments. Fast QR Check-In.",
    intro: [
      "Running a large event means managing registrations, chasing payments, printing delegate lists, and handling long check-in queues on the day. If any part breaks down, it reflects on your entire event.",
      "Kaizen Events by Kaizen Infotech Solutions Pvt. Ltd. replaces every manual step with a clean digital process. Delegates register online, pay securely, and receive a QR code. At the venue, entry takes under 3 seconds per person. Your team has live attendance numbers the entire time.",
    ],
    modulesTitle: "How Kaizen Events Works",
    modules: [
      ["globe", "Online Registration", "Branded registration page with custom fields, delegate categories, pricing tiers, and group booking support. Attendees register from any device in minutes."],
      ["shield", "Secure Payment Gateway", "Payments via UPI, cards, and net banking. Confirmed instantly. Registration updated automatically on payment success."],
      ["article", "QR Entry Tickets", "Every registered attendee gets a unique QR code in their confirmation. The same code is used for entry at the event."],
      ["mobile", "QR Check-In at the Gate", "Volunteers scan QR codes on any smartphone. Verification is instant – under 3 seconds. No printed lists, no manual searching."],
      ["chart", "Live Attendee Dashboard", "Organisers see total registrations, category counts, payment status, and live attendance in real time throughout the event."],
      ["mail", "Automated Confirmations", "Every registrant receives an instant confirmation email with their QR code and event details. No manual follow-up needed."],
    ],
    benefitsTitle: "What Improves for Your Event",
    benefits: [
      "Registrations happen 24/7 without any manual intervention from your team.",
      "Long check-in queues are eliminated – scanning takes under 3 seconds per delegate.",
      "All payments are digital, transparent, and automatically reconciled.",
      "Your organising team has live attendance data throughout the event.",
      "Clean attendee data exportable for post-event records, accounting, and future communications.",
    ],
    bestFor: "Membership organisations (Rotary, Lions, JITO), corporate event teams, professional conference organisers, trade associations, and community groups running events with 100 to 10,000+ attendees.",
    ctaButton: "Request a Demo",
    ctaText: "Contact Kaizen Infotech Solutions Pvt. Ltd. to see how Kaizen Events handles your next conference or gathering.",
    faq: [
      ["What is Kaizen Events?", "Kaizen Events is an event management platform developed by Kaizen Infotech Solutions Pvt. Ltd. that handles online registration, payment collection, and QR-based entry check-in for events of all sizes. It is designed for organisations that want to replace paper-based and manual event processes with a reliable digital system."],
      ["How does QR check-in work at the event?", "When an attendee registers and pays, they receive a confirmation with a unique QR code. At the event venue, a volunteer or staff member scans the QR code on a standard smartphone. The system verifies registration and marks attendance in under 3 seconds. No printed lists or manual checking required."],
      ["What payment methods does Kaizen Events support?", "Kaizen Events supports UPI, credit and debit cards, and net banking through an integrated payment gateway. Payments are confirmed instantly and the attendee's registration status is updated automatically."],
    ],
  },
  {
    slug: "automated-fare-collection",
    name: "Automated Fare Collection (AFC) System",
    card: "Automated Fare Collection",
    short: "AFC",
    illus: "transit",
    icon: "rocket",
    category: "BusinessApplication",
    oneLine: "Modern ticketing for modern transit.",
    cardDesc: "QR-based fare validation, unified ticketing across metro and ropeway, and real-time footfall tracking. Built for operators who cannot afford downtime.",
    metaTitle: "Automated Fare Collection System for Metro and Ropeway | Kaizen Infotech Solutions Pvt. Ltd.",
    metaDesc: "AFC system by Kaizen Infotech Solutions Pvt. Ltd.: unified ticketing, QR-based digital entry validation, and real-time footfall and revenue reporting for metro rail and ropeway operators. Built for mission-critical transit operations in India.",
    h1: "Automated Fare Collection (AFC) System",
    tagline: "Unified Ticketing. Digital Validation. Real-Time Visibility.",
    intro: [
      "Transit operations run on precision. Every passenger must be accounted for, every rupee tracked, and the entry gate must work reliably when thousands of people are moving through during peak hours. A failure at any point affects both the passenger experience and the operator's revenue.",
      "The AFC system by Kaizen Infotech Solutions Pvt. Ltd. is built for this environment. Deployed for metro rail and ropeway operations, it provides unified ticketing, instant QR-based validation at entry points, and live operational dashboards – giving operators complete control.",
    ],
    modulesTitle: "What the AFC System Includes",
    modules: [
      ["globe", "Unified Ticketing Platform", "One system managing fare collection for both metro and ropeway operations. Tickets sold at counters, kiosks, and mobile app – all reconciled in one place."],
      ["article", "QR-Based Digital Validation", "Passengers scan a QR code at the entry gate for instant, contactless validation. Under 2 seconds per passenger. Designed for peak-hour throughput."],
      ["users", "Real-Time Footfall Tracking", "Live count of passengers through every gate at every station, updated continuously. Operations managers monitor flow and respond to surges in real time."],
      ["chart", "Automated Revenue Reports", "Daily, weekly, and monthly revenue reports generated automatically. Full audit trail of every transaction. Reconciliation is straightforward."],
      ["mobile", "Multi-Channel Ticket Sales", "Counter staff, kiosks, and mobile app sales all captured in the same system. No separate reconciliation needed across channels."],
      ["shield", "System Monitoring and Alerts", "Real-time alerts for gate hardware failures, connectivity issues, or unusual transaction activity. Operations staff notified immediately."],
    ],
    benefitsTitle: "What Improves for Transit Operators",
    benefits: [
      "Passengers move through entry gates faster with instant QR validation – queues are eliminated.",
      "Revenue is fully accounted for – every ticket issued and every entry recorded, with no gap.",
      "Operations managers have live passenger data to manage platform resources during peak hours.",
      "End-of-day reconciliation is automated – no manual counting or cross-checking.",
      "The system is built for high-traffic, mission-critical environments where downtime is not an option.",
    ],
    bestFor: "Metro rail operators, ropeway and cable car operators, and regional transit authorities in India that are replacing manual or legacy cash-based fare collection with a modern, digital system.",
    ctaButton: "Speak to Our Team",
    ctaText: "Contact Kaizen Infotech Solutions Pvt. Ltd. to discuss your transit ticketing requirements with an engineer who understands fare collection systems.",
    faq: [
      ["What is Automated Fare Collection?", "Automated Fare Collection (AFC) is a digital ticketing and entry validation system for public transit. It replaces manual cash transactions at entry gates with electronic tickets – typically QR codes or smart cards – validated automatically as passengers enter. The AFC system by Kaizen Infotech Solutions Pvt. Ltd. serves metro and ropeway operators."],
      ["Does the AFC system work for both metro rail and ropeway operations?", "Yes. The AFC system by Kaizen Infotech Solutions Pvt. Ltd. is designed to manage fare collection for both metro rail and ropeway operations from a single unified platform, with integrated pricing and route management for both transit modes."],
      ["How does the AFC system handle peak-hour passenger volumes?", "The QR-based validation at entry gates is designed to process each passenger in under 2 seconds. The system is built for high-throughput environments and has been deployed successfully in transit operations with large daily passenger volumes."],
    ],
  },
];
const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);
SERVICE_COPY["event-management"].faq = productBySlug("kaizen-events").faq;
SERVICE_COPY["digital-marketing"].faq = productBySlug("agent-bandhu").faq;

/* --------------------------------------------------------------- Contact */
const CONTACT = {
  metaTitle: "Contact Us | Kaizen Infotech Solutions Pvt. Ltd. – Maharashtra",
  metaDesc: `Contact Kaizen Infotech Solutions Pvt. Ltd. for custom software development, product enquiries and project discussions. Office: Centrum Business Square, Wagle Industrial Estate, Thane West. Phone: ${SITE.phone}. Email: ${SITE.email}`,
  h1: "Let's Build Something Together",
  text: "Whether you have a detailed brief or just an idea, reach out to Kaizen Infotech Solutions Pvt. Ltd. and let's talk. We will tell you honestly if we can help – and how.",
  topics: ["Custom Software Development", "Product Enquiry", "General Enquiry", "Careers"],
};

/* --------------------------------------------------------------- Careers */
const CAREERS = {
  metaTitle: "Careers at Kaizen Infotech Solutions Pvt. Ltd. | Software Jobs in Mumbai",
  metaDesc: `Join Kaizen Infotech Solutions Pvt. Ltd. in Maharashtra. We are hiring a Digital Marketing Executive, a Business Development Manager and a Relationship Manager. Apply at ${SITE.careersEmail}`,
  h1: "Build Your Career at Kaizen Infotech Solutions Pvt. Ltd.",
  text: "We are a small, focused team. When you join us, you work on real products used by real organisations – from your first week. No mock projects, no tutorial exercises.",
  life: [
    "We are based in Maharashtra and we work from the office. You will learn faster by working alongside senior engineers and product thinkers in person than you would in any remote-first setup.",
    "We hire people who want to learn by working on real, complex problems – not tutorials. If you join our team, you will be working on live systems used by thousands of people from your first month.",
  ],
  datePosted: "2026-10-30",
  roles: [
    {
      title: "Digital Marketing Executive",
      icon: "megaphone",
      team: "Marketing",
      overview: "We are looking for a Digital Marketing Executive who can own our online presence – social media, SEO, content, and paid campaigns. You will work directly with the leadership team to build the Kaizen Infotech Solutions Pvt. Ltd. brand online.",
      do: [
        "Plan and execute social media content across LinkedIn, Instagram, Facebook, and X.",
        "Write SEO-optimised website content, product descriptions, and case studies.",
        "Manage paid campaigns on Google and Meta platforms.",
        "Track performance metrics and report on what is working and what is not.",
        "Coordinate with the design team to produce visual content.",
      ],
      want: [
        "1 to 3 years of digital marketing experience, preferably at a B2B software or tech company.",
        "Strong writing skills in English – you will be writing a lot.",
        "Hands-on experience with Google Analytics, Meta Ads, and LinkedIn Campaign Manager.",
        "Basic SEO knowledge – keyword research, on-page SEO, content structure.",
      ],
      apply: "Send your resume and portfolio",
    },
    {
      title: "Business Development Manager",
      icon: "chart",
      team: "Sales",
      overview: "We are looking for a Business Development Manager to grow our client base. You will identify new opportunities, build relationships with potential clients, and represent Kaizen Infotech Solutions Pvt. Ltd. in business conversations.",
      do: [
        "Identify and pursue new business opportunities in enterprise, government, and hospitality sectors.",
        "Conduct discovery calls, understand client requirements, and coordinate with the technical team to prepare proposals.",
        "Build and maintain a pipeline of qualified opportunities.",
        "Represent Kaizen Infotech Solutions Pvt. Ltd. at industry events, networking meets, and client meetings.",
        "Own the end-to-end sales cycle from first contact to signed agreement.",
      ],
      want: [
        "2 to 5 years of B2B sales or business development experience in software, IT services, or technology.",
        "Strong communication and presentation skills.",
        "Experience selling to enterprise or government clients is a plus.",
        "Self-directed, comfortable working with targets, and able to manage your own pipeline.",
      ],
      apply: "Send your resume",
    },
    {
      title: "Relationship Manager",
      icon: "users",
      team: "Client Success",
      overview: "We are looking for a Relationship Manager to manage our existing client accounts. You will be the primary point of contact for clients after a project goes live – ensuring they are getting the most out of the software and that any issues are resolved quickly.",
      do: [
        "Own the post-delivery relationship with clients across all active accounts.",
        "Conduct regular check-ins, collect feedback, and ensure client satisfaction.",
        "Coordinate with the technical team to resolve issues and prioritise client requests.",
        "Identify opportunities to expand services within existing accounts.",
        "Track account health and flag risks before they become problems.",
      ],
      want: [
        "1 to 3 years of account management or client servicing experience in software or IT.",
        "Strong interpersonal and communication skills.",
        "Comfortable managing multiple accounts simultaneously.",
        "Detail-oriented, responsive, and good at following through on commitments.",
      ],
      apply: "Send your resume",
    },
  ],
  cultureTitle: "What Working Here Looks Like",
  culture: [
    "Work from our office in Maharashtra – you learn faster working alongside the team in person.",
    "Work on live software used by real users from your first month.",
    "A small team means your contributions are visible and your growth is real.",
    "Direct access to senior engineers and leadership – no hierarchy blocking your questions.",
  ],
  cta: `Don't see your role? Send your resume to ${SITE.careersEmail} anyway – we are always meeting good people.`,
};

/* ------------------------------------------------------- Work and Blog */
const WORK = {
  metaTitle: "Our Work and Case Studies | Kaizen Infotech Solutions Pvt. Ltd.",
  metaDesc: "Selected work by Kaizen Infotech Solutions Pvt. Ltd.: web portals, member platforms, event registration, mobile apps and dashboards for government, enterprise, hospitality and community organisations across India.",
  text: "From the Income Tax Department of India to Rotary International district events and Mumbai Port Trust – a look at the platforms we have designed, built, and shipped.",
};
const BLOG = {
  metaTitle: "Blog – Software, Automation and Product Insights | Kaizen Infotech Solutions Pvt. Ltd.",
  metaDesc: "Insights, ideas and updates from the Kaizen Infotech Solutions Pvt. Ltd. team on custom software, automation, product development and digital marketing in India.",
};

module.exports = { SITE, STATS, HOME, ABOUT, SERVICES_PAGE, SERVICE_COPY, PRODUCTS_PAGE, PRODUCTS, productBySlug, CONTACT, CAREERS, WORK, BLOG };
