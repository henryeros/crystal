import { WORK, type WorkKey } from "@/lib/generated/media";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://crystalkizor.com").replace(/\/$/, "");

export const SITE = {
  name: "Crystal Kizor",
  role: "Architect, Designer & Founder",
  url: SITE_URL,
  locale: "en_NG",
  location: "Enugu, Nigeria",
  tagline: "Building for the climate we actually live in.",
  description:
    "Crystal Kizor is an architect and founder designing climate-responsive buildings for hot climates. Studio COKA, The Effective Architect, ELEvated, AKO Alliance and Alive and Free.",
} as const;

export type OrbitId = "practice" | "platform" | "people";

export type Orbit = {
  id: OrbitId;
  index: string;
  verb: string;
  title: string;
  premise: string;
};

export const ORBITS: readonly Orbit[] = [
  {
    id: "practice",
    index: "01",
    verb: "Build",
    title: "The work that gets made",
    premise:
      "Buildings, interiors and objects designed for heat, humidity and unreliable power. Measured on comfort, energy and how people actually live.",
  },
  {
    id: "platform",
    index: "02",
    verb: "Teach",
    title: "The work that gets shared",
    premise:
      "Everything learned on site becomes method, writing, talks and training, so the next generation of African designers does not have to start from zero.",
  },
  {
    id: "people",
    index: "03",
    verb: "Lift",
    title: "The work that gets given",
    premise:
      "Access is the bottleneck. These initiatives return opportunity to the children, families and young people who make the rest of it worth doing.",
  },
] as const;

export type Venture = {
  id: string;
  name: string;
  lockup: string;
  suffix?: string;
  orbit: OrbitId;
  weight: "flagship" | "major" | "focused";
  kind: string;
  promise: string;
  body: string;
  signals: readonly string[];
  action: { label: string; href: string; provisional?: boolean };
  image: WorkKey;
  imageAlt: string;
};

export const VENTURES: readonly Venture[] = [
  {
    id: "studio-coka",
    name: "Studio COKA",
    lockup: "Studio",
    suffix: "COKA",
    orbit: "practice",
    weight: "flagship",
    kind: "Architecture · Interiors · Construction",
    promise: "Built for this climate. Designed for people.",
    body:
      "A design-and-build studio in Nigeria working across architecture, interiors and urban design. Every project is shaped to reduce energy demand and improve comfort before a single machine is switched on.",
    signals: ["Up to 70% lower energy demand", "Up to 90% less mechanical cooling", "Design-and-build, end to end"],
    action: { label: "Start a project", href: "https://studiocoka.com/hire" },
    image: "earth-house-approach",
    imageAlt: "Rammed earth residence set into a planted garden, with deep shaded veranda",
  },
  {
    id: "tea",
    name: "The Effective Architect",
    lockup: "The Effective Architect",
    suffix: "TEA",
    orbit: "platform",
    weight: "flagship",
    kind: "Education · Media",
    promise: "Design with method, not guesswork.",
    body:
      "A global platform training architects and designers to think clearly, design intentionally and execute at a high level. Climate-responsive method, career positioning and the parts of practice school never covers.",
    signals: ["10,000+ community", "Framework-led curriculum", "Students, designers, practitioners"],
    action: { label: "Join the waitlist", href: "#enquire", provisional: true },
    image: "crystal-at-desk",
    imageAlt: "Crystal Kizor reviewing drawings and material samples at her studio desk",
  },
  {
    id: "elevated",
    name: "ELEvated",
    lockup: "ELE",
    suffix: "vated",
    orbit: "practice",
    weight: "major",
    kind: "Furniture · Product Design",
    promise: "Objects rooted in African material and idea.",
    body:
      "A contemporary furniture and product line built from the same logic as the buildings: local material intelligence, honest construction, and pieces designed to be lived with rather than looked at.",
    signals: ["African materials", "Functional-first", "Made for the interiors we design"],
    action: { label: "Preview the collection", href: "#enquire", provisional: true },
    image: "nature-home-sitting-room",
    imageAlt: "Furnished family sitting room with layered natural materials and daylight",
  },
  {
    id: "speaking",
    name: "Speaking",
    lockup: "Speaking",
    orbit: "platform",
    weight: "major",
    kind: "Talks · Panels · Media",
    promise: "The case for building differently in Africa.",
    body:
      "TEDx speaker on indigenous modern architecture. Talks and conversations on climate-responsive design, African cities, material sovereignty, entrepreneurship and the built environment.",
    signals: ["TEDx: Indigenous Modern Architecture", "Universities, conferences, media", "Keynotes and panels"],
    action: { label: "Invite Crystal to speak", href: "#enquire" },
    image: "crystal-recording",
    imageAlt: "Crystal Kizor recording in her studio beside a microphone and material samples",
  },
  {
    id: "research",
    name: "Crystal Kizor",
    lockup: "Research",
    suffix: "& Writing",
    orbit: "platform",
    weight: "focused",
    kind: "Research · Authorship · Content",
    promise: "Thinking in public, weekly.",
    body:
      "Independent research and writing on how design pays back in value, health, comfort and quality of life, published through newsletters and long-running series across platforms.",
    signals: ["The ROI of Intentional Design", "Defining Nigerian Architecture", "Passive Cooling Tuesday"],
    action: { label: "Read the writing", href: "#ideas" },
    image: "crystal-seated",
    imageAlt: "Editorial portrait of Crystal Kizor seated beside an African architecture monograph",
  },
  {
    id: "ako",
    name: "AKO Alliance",
    lockup: "AKO",
    suffix: "Alliance",
    orbit: "people",
    weight: "major",
    kind: "Education · Opportunity",
    promise: "Every child back in a classroom.",
    body:
      "A non-profit working to return Nigeria's 20 million out-of-school children to school, capitalise family businesses, and back ideas that create long-term opportunity.",
    signals: ["120+ children sponsored", "500+ families supported", "Target: 1 million children"],
    action: { label: "Support the mission", href: "https://akoalliance.com/programs/" },
    image: "kasa-kofo-assembly",
    imageAlt: "Community gathered under a circular timber canopy around a mature tree",
  },
  {
    id: "alive-and-free",
    name: "Alive and Free",
    lockup: "Alive",
    suffix: "and Free",
    orbit: "people",
    weight: "focused",
    kind: "Youth Movement",
    promise: "Truth, healing, identity, purpose.",
    body:
      "A Christian youth movement creating honest spaces for young people navigating pressure, anxiety and the search for meaning, through gatherings, conversation and worship.",
    signals: ["Gatherings and conversations", "Restoration and purpose", "For young people"],
    action: { label: "Join a gathering", href: "#enquire", provisional: true },
    image: "kasa-kofo-workshop",
    imageAlt: "Daylit gallery space with perforated clay screens casting patterned light",
  },
] as const;

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

export const METRICS: readonly Metric[] = [
  { value: 100, suffix: "k+", label: "sqm designed", note: "Designed and coordinated across sectors" },
  { value: 70, suffix: "%", label: "less energy", note: "Measured reduction in energy demand" },
  { value: 90, suffix: "%", label: "less cooling", note: "Reduction in mechanical cooling load" },
  { value: 10, suffix: "k+", label: "learning", note: "Designers inside The Effective Architect" },
  { value: 120, suffix: "+", label: "back in school", note: "Children sponsored through AKO Alliance" },
] as const;

export type Project = {
  id: string;
  title: string;
  place: string;
  year: string;
  discipline: string;
  venture: string;
  note: string;
  stats: readonly { value: string; label: string }[];
  image?: WorkKey;
  alt?: string;
  href?: string;
};

export const PROJECTS: readonly Project[] = [
  {
    id: "nature-home",
    title: "Nature Home",
    place: "Enugu, Nigeria",
    year: "2022 — 2026",
    discipline: "Residential · Design & Build",
    venture: "Studio COKA",
    note: "A seven-bedroom home oriented to catch the south-west wind. It runs on natural ventilation and fans roughly 70% of the time.",
    stats: [
      { value: "79%", label: "lower energy cost" },
      { value: "90%", label: "rooms cross-ventilated" },
      { value: "15kVA", label: "solar, off-grid 79% of the time" },
    ],
    image: "nature-home-tree-shade",
    alt: "Front elevation of Nature Home under a mature flame tree",
    href: "https://studiocoka.com/projects/nature-home-2",
  },
  {
    id: "earth-house",
    title: "The Passive House Prototype",
    place: "Hot-humid climate",
    year: "2024",
    discipline: "Residential · Prototype",
    venture: "Studio COKA",
    note: "A fully passively-cooled house study. Thick earth walls, deep overhangs, high-level openings and a planted edge doing the work of an air conditioner.",
    stats: [
      { value: "100%", label: "passively cooled" },
      { value: "0", label: "mechanical cooling designed in" },
      { value: "Earth", label: "primary wall material" },
    ],
    image: "earth-house-approach",
    alt: "Rammed earth prototype house with deep brick overhang and garden approach",
  },
  {
    id: "tesh",
    title: "TESH Nsukka",
    place: "Nsukka, Enugu",
    year: "2018",
    discipline: "Healthcare · Renovation",
    venture: "Studio COKA",
    note: "Nigeria's first off-grid hospital, designed at 23. Solar powered, naturally cooled waiting hall, completely independent of the national grid.",
    stats: [
      { value: "₦8M", label: "saved annually" },
      { value: "95%", label: "diesel reduction" },
      { value: "400%", label: "increase in patient visits" },
    ],
    image: "nature-home-atrium",
    alt: "Naturally aspirated daylit waiting hall designed for solar cooling at TESH Nsukka",
    href: "https://studiocoka.com/projects/nigeria-first-off-grid-hospital",
  },
  {
    id: "kasa-kofo",
    title: "Kasa Kofo Community Centre",
    place: "Casamance, Senegal",
    year: "2025",
    discipline: "Civic · Proposal",
    venture: "Studio COKA",
    note: "A community centre that also teaches, trades and remembers. Workshop, library, craft museum, market and assembly hall under one shaded roof.",
    stats: [
      { value: "5", label: "programmes in one building" },
      { value: "60%", label: "of children miss senior secondary" },
      { value: "45%", label: "of livelihoods depend on farming" },
    ],
    image: "kasa-kofo-elevation",
    alt: "Rammed earth community centre with a sweeping timber roof and ramp",
  },
  {
    id: "hayat",
    title: "House of the Future",
    place: "United Arab Emirates",
    year: "2025 — 2026",
    discipline: "Residential · Concept",
    venture: "Studio COKA",
    note: "A courtyard home wrapped in a three-layer mashrabiya of air, shade and light. Ancient principle, modern technology, built for a hot desert city.",
    stats: [
      { value: "3-in-1", label: "mashrabiya courtyard system" },
      { value: "$250k", label: "estimated project cost" },
      { value: "Indoor / outdoor", label: "living strategy" },
    ],
    image: "earth-house-courtyard",
    alt: "Shaded courtyard threshold with filtered light through a screened wall",
  },
  {
    id: "event-center",
    title: "International Event Center",
    place: "Enugu, Nigeria",
    year: "2024",
    discipline: "Civic · Cultural",
    venture: "Studio COKA",
    note: "A sculptural civic venue shaped by movement and climate. Deep overhangs and a layered facade cut heat gain before mechanical systems are needed.",
    stats: [
      { value: "Civic", label: "cultural typology" },
      { value: "Layered", label: "climate-responsive envelope" },
      { value: "2024", label: "design year" },
    ],
    image: "kasa-kofo-library",
    alt: "Tall daylit circulation hall lined with earth walls and timber doors",
    href: "https://studiocoka.com/projects/international-event-center-enugu",
  },
] as const;

export const PRINCIPLES = [
  { index: "01", title: "Orientation", body: "Put the plan where the wind already is. Free cooling begins with a compass." },
  { index: "02", title: "Mass", body: "Thick earth and brick walls slow heat down so interiors stay stable through the day." },
  { index: "03", title: "Openings", body: "Large low openings to catch air, high-level openings to let the hot air leave." },
  { index: "04", title: "Shade", body: "Deep overhangs and cantilevers stop the sun before it reaches glass." },
  { index: "05", title: "Trees", body: "Existing trees kept as thermal buffers. They cool air, soften light and bring the butterflies back." },
  { index: "06", title: "Height", body: "Atriums and high headroom give warm air somewhere to go." },
] as const;

export const GALLERY: readonly { key: WorkKey; caption: string }[] = [
  { key: "nature-home-atrium", caption: "Atrium · Nature Home" },
  { key: "earth-house-bedroom", caption: "Bedroom · Passive House Prototype" },
  { key: "nature-home-cantilever", caption: "Cantilever shading · Enugu" },
  { key: "kasa-kofo-canopy", caption: "Assembly hall · Kasa Kofo" },
  { key: "nature-home-bedroom", caption: "Bedroom · Nature Home" },
  { key: "earth-house-veranda", caption: "Veranda · Passive House Prototype" },
  { key: "nature-home-screen", caption: "Timber dividers · Nature Home" },
  { key: "earth-house-garden", caption: "Garden edge · Passive House Prototype" },
  { key: "nature-home-stair", caption: "Stair · Nature Home" },
  { key: "earth-house-living", caption: "Courtyard washroom · Passive House Prototype" },
  { key: "nature-home-dining", caption: "Dining · Nature Home" },
  { key: "nature-home-back-garden", caption: "New planting · Nature Home" },
  { key: "earth-house-threshold", caption: "Threshold · Passive House Prototype" },
  { key: "nature-home-kitchen", caption: "Kitchen · Nature Home" },
  { key: "nature-home-detail", caption: "Detail · Nature Home" },
  { key: "nature-home-lounge", caption: "Lounge · Nature Home" },
  { key: "nature-home-street", caption: "Studio COKA · Enugu" },
] as const;

export const TIMELINE = [
  {
    year: "2018",
    age: "at 23",
    title: "Nigeria's first off-grid hospital",
    body: "Designed and built a fully solar-powered eye hospital in Nsukka with a naturally cooled central waiting hall.",
  },
  {
    year: "2022",
    age: "at 27",
    title: "Nature Home",
    body: "A seven-bedroom home for her parents, oriented for cross-ventilation. 79% lower energy cost than their smaller previous house.",
  },
  {
    year: "2024",
    age: "at 28",
    title: "Studio COKA founded",
    body: "A design-and-build studio for home and business owners who want intentional, climate-responsive space. Plus a 100% passively-cooled prototype.",
  },
  {
    year: "2025",
    age: "at 29 — 30",
    title: "House of the Future · TEDx",
    body: "A UAE house prototype exploring local material and culture, and a TEDx talk on integrating indigenous architecture into modern living.",
  },
  {
    year: "2026",
    age: "at 30",
    title: "The Effective Architect",
    body: "A global education platform with a 10,000+ community, and AKO Alliance scaling toward one million children returned to school.",
  },
] as const;

export const WRITING = [
  {
    title: "The ROI of Intentional Design",
    kind: "Newsletter · Weekly",
    meta: "1,709 subscribers",
    body: "How good design pays back in value, health, comfort and quality of life.",
    href: "#enquire",
    provisional: true,
  },
  {
    title: "Defining Nigerian Architecture",
    kind: "Series",
    meta: "Ongoing",
    body: "What a Nigerian architecture made of Nigerian material and climate actually looks like.",
    href: "#enquire",
    provisional: true,
  },
  {
    title: "Passive Cooling Tuesday",
    kind: "Series",
    meta: "Weekly",
    body: "One passive cooling decision, broken down, every week.",
    href: "#enquire",
    provisional: true,
  },
  {
    title: "Building Local",
    kind: "Series",
    meta: "Ongoing",
    body: "Local materials are not poor. They are knowledge, continuity and wealth.",
    href: "#enquire",
    provisional: true,
  },
] as const;

export type Pathway = {
  id: string;
  audience: string;
  question: string;
  answer: string;
  destination: string;
  href: string;
  provisional?: boolean;
};

export const PATHWAYS: readonly Pathway[] = [
  {
    id: "build",
    audience: "Homeowners, developers, institutions",
    question: "I want to build something.",
    answer:
      "Start with the studio. Design-and-build, architecture-only or interiors, with climate performance written into the brief from day one.",
    destination: "Studio COKA",
    href: "https://studiocoka.com/hire",
  },
  {
    id: "learn",
    audience: "Architects, students, built-environment professionals",
    question: "I want to design like this.",
    answer:
      "The Effective Architect teaches the method behind the work: climate logic, design process and the career positioning that makes it pay.",
    destination: "The Effective Architect",
    href: "#enquire",
    provisional: true,
  },
  {
    id: "stage",
    audience: "Conferences, universities, media, brands",
    question: "I need a speaker.",
    answer:
      "Talks on climate-responsive design, African cities, indigenous architecture and entrepreneurship. Keynotes, panels and long-form conversation.",
    destination: "Speaking",
    href: "#enquire",
  },
  {
    id: "give",
    audience: "Partners, funders, volunteers",
    question: "I want to back the mission.",
    answer:
      "AKO Alliance returns out-of-school children to the classroom and capitalises family businesses. Alive and Free walks with young people.",
    destination: "AKO Alliance",
    href: "https://akoalliance.com/volunteers-partners/",
  },
] as const;

export type HeroSlide = {
  id: string;
  badge: string;
  role: string;
  headline: string;
  emphasis: string;
  headlineEnd: string;
  story: string;
  metricValue: string;
  metricLabel: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  imageKey: WorkKey;
  imageAlt: string;
};

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: "architecture",
    badge: "01 / Studio COKA",
    role: "Architect · Founder · Sustainable Pioneer",
    headline: "I design buildings for the climate we",
    emphasis: "actually live in.",
    headlineEnd: "",
    story: "Cooler, calmer, and naturally ventilated before a machine is switched on. Over 100,000 sqm designed across West Africa with up to 70% lower energy demand.",
    metricValue: "Up to 70%",
    metricLabel: "Measured reduction in cooling & energy demand",
    primaryCta: { label: "Explore Built Projects", href: "#work" },
    secondaryCta: { label: "Contact Crystal", href: "#contact" },
    imageKey: "crystal-standing",
    imageAlt: "Crystal Kizor in an earthy architectural studio with models and drawings",
  },
  {
    id: "education",
    badge: "02 / The Effective Architect",
    role: "Educator · Global Community Founder",
    headline: "Training 10,000+ designers to design with",
    emphasis: "method, not guesswork.",
    headlineEnd: "",
    story: "Founder of TEA — equipping African architects and global practitioners with climate-responsive logic, site analysis rigor, and career positioning.",
    metricValue: "10,000+",
    metricLabel: "Architects & practitioners in the global TEA network",
    primaryCta: { label: "Discover TEA Platform", href: "#ecosystem" },
    secondaryCta: { label: "Enquire About Training", href: "#contact" },
    imageKey: "crystal-at-desk",
    imageAlt: "Crystal Kizor reviewing architectural blueprints and materials at her drafting desk",
  },
  {
    id: "healthcare",
    badge: "03 / TESH Nsukka",
    role: "Healthcare & Sustainable Impact",
    headline: "Nigeria's first off-grid hospital,",
    emphasis: "designed at age 23.",
    headlineEnd: "",
    story: "A completely solar-powered eye hospital with naturally aspirated, convective cooling halls. Zero diesel dependency, saving ₦8M annually for over 6 years.",
    metricValue: "₦8M/yr",
    metricLabel: "Saved annually with 95% diesel reduction",
    primaryCta: { label: "View Hospital Case Study", href: "#work" },
    secondaryCta: { label: "Commission a Project", href: "#contact" },
    imageKey: "crystal-seated",
    imageAlt: "Editorial portrait of Crystal Kizor seated beside an African architecture monograph",
  },
  {
    id: "speaking",
    badge: "04 / Thought Leadership",
    role: "TEDx Speaker · Author · Researcher",
    headline: "Reimagining indigenous African materials on",
    emphasis: "global stages.",
    headlineEnd: "",
    story: "TEDx speaker on Indigenous Modern Architecture. Author of 'The ROI of Intentional Design' and advocate for tropical passive building intelligence.",
    metricValue: "TEDx",
    metricLabel: "Keynote on Indigenous Modern Architecture",
    primaryCta: { label: "Read Her Research", href: "#ideas" },
    secondaryCta: { label: "Book for a Keynote", href: "#contact" },
    imageKey: "crystal-recording",
    imageAlt: "Crystal Kizor in her studio with microphone and material samples",
  },
  {
    id: "foundation",
    badge: "05 / AKO Alliance",
    role: "Foundation Founder & Social Advocate",
    headline: "Returning out-of-school children to the",
    emphasis: "classroom.",
    headlineEnd: "",
    story: "Over 120 children sponsored back into school and 500+ family enterprises capitalized across Nigeria. Architecture that creates sustainable human opportunity.",
    metricValue: "120+ Kids",
    metricLabel: "Returned to school · Target: 1 Million Children",
    primaryCta: { label: "Explore AKO Alliance", href: "#ecosystem" },
    secondaryCta: { label: "Support the Mission", href: "#contact" },
    imageKey: "crystal-arms-folded",
    imageAlt: "Crystal Kizor poised with arms folded in her warm studio workspace",
  },
] as const;

export const NAV = [
  { label: "About Crystal", href: "#positioning" },
  { label: "Built Projects", href: "#work" },
  { label: "Ventures", href: "#ecosystem" },
  { label: "Passive Method", href: "#method" },
  { label: "Gallery", href: "#gallery" },
  { label: "Insights & Press", href: "#ideas" },
  { label: "Contact Crystal", href: "#contact" },
] as const;

export const SOCIALS = [
  { label: "Studio COKA", href: "https://studiocoka.com" },
  { label: "Instagram", href: "https://www.instagram.com/studio.coka/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/studio-coka/" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC21NBowgir5hC8ZStfBCXIg" },
  { label: "AKO Alliance", href: "https://akoalliance.com" },
] as const;

export const HERO_IMAGE = WORK["crystal-standing"];
