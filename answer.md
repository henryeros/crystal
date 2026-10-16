# Crystal Kizor — Submission

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis smooth scroll · Motion (Web Animations API) · Grava local font

---

## Submission note (<=200 words)

The brief's hard problem isn't layout — it's that seven ventures read as a scattered CV unless something holds them together. I didn't start with sections. I started with a thesis: **"Building for the climate we actually live in."**

Everything flows from one question — *how do we build better in hot climates, and who benefits?* Crystal's work splits into three answers: **Build** (Studio COKA), **Teach** (The Effective Architect, speaking, writing), **Lift** (AKO Alliance). That single spine creates cohesion and hierarchy in the same move.

Technically, the biggest decision was keeping Crystal herself as the hero — not her buildings. Five full-screen portraits slide in a crossfade carousel that works on touch swipe (mobile), mouse drag (desktop), arrow buttons, dot indicators, and keyboard arrows. A horizontal pill nav replaces the hamburger because at this brand level, every interaction should feel immediate and confident, not hidden.

Next.js for static rendering and sharp image optimisation; GSAP for parallax and scroll choreography; Lenis for inertia scrolling; the Grava typeface (loaded locally) to match the supplied brand wordmark exactly. The site scores 0 insertBefore reconciliation errors because React manages every node — no innerHTML mutations at runtime.

---

## Part 1 — Web development and architecture

### The thinking

**The positioning problem.** Crystal is an architect, educator, entrepreneur, speaker and convener. Presented flatly, that reads as unfocused. Presented as *one thesis with three expressions*, it reads as range. The page commits to architecture-for-hot-climates as the spine, then shows the other ventures as consequences of it rather than departures from it.

**The hierarchy problem.** Seven equal cards would have flattened everything. Instead:

| Tier | Ventures | Treatment |
|---|---|---|
| Flagship | Studio COKA, The Effective Architect | Full-width feature rows, large imagery, full copy |
| Supporting | Speaking, Insights, AKO Alliance | Cards |
| Focused | Method, Testimonials | Dedicated sections |

Studio COKA leads because it is the commercial engine and the proof. TEA is second because it is the fastest-growing audience. The mission work sits last — not as an afterthought, but as the payoff the rest makes possible.

### Page structure

Loader -> Hero (5-slide portrait carousel) -> About -> Projects (hover list) -> Method (drag rail) -> Testimonials -> Insights -> Contact / Footer

### Key technical decisions

- **Static rendering.** The whole page prerenders — no client data fetching, no layout shift.
- **Hero slider: fully manual.** Touch swipe (40 px threshold, vertical-cancel to avoid scroll conflict), mouse drag (50 px threshold, skips link/button targets), prev/next arrow buttons, clickable dot indicators, keyboard left/right arrows, and auto-cycle that pauses on hover. All five controls share a single goTo(idx) function so state is never duplicated.
- **No innerHTML at runtime.** STEPS and TESTIMONIALS are React constants rendered directly in JSX. Previously, imperative .innerHTML mutations on React-managed nodes caused a "Failed to execute insertBefore on Node" crash during Fast Refresh. Eliminating that is how we get zero reconciliation errors.
- **Horizontal pill nav.** About, Projects, Method, Voices, Contact me — visible without a tap. On mobile the two rightmost links collapse with hidden md:flex so the pill stays compact; About and Contact always show.
- **Grava font.** Loaded via next/font/local from public/fonts/grava/ — both text and display weights — mapped to --font-grava and --font-grava-display. No FOUT, no third-party round-trip.
- **Motion split.** GSAP for parallax scrub and the preloader. Motion (Web Animations API) for the fast opacity crossfades in the slider and hover list — lighter than GSAP for those simple tweens.
- **Loader.** Uses style.display = none (not .remove()) to hide the loader after the entrance animation. Removing a React-managed node causes a reconciliation crash.
- **Reduced motion is a first-class path.** Lenis never initialises, preloader skips, all GSAP timelines short-circuit, hero auto-cycle stays off.
- **Colour** sampled directly from the supplied photography: bone #f2eee5, ink #1a1411, clay #a9502a.
- **SEO.** Per-route metadata, sitemap.ts, robots.ts, semantic landmarks, proper alt text on every image.

---

## Part 2 — AI product thinking (<=300 words)

### Heat Check — a pre-design climate brief tool for Studio COKA

**What it does.** A homeowner or developer drops a pin on a map, picks building type, number of storeys, and budget band. Heat Check fetches 10 years of hourly climate data for that exact location, computes sun path, prevailing wind direction, and overheating hours, then returns a one-page *climate brief*: the five passive design moves that matter most on that site, ranked by impact per naira, with trade-offs named plainly. It downloads as a PDF and — with consent — becomes a pre-qualified enquiry to Studio COKA.

**Who it is for.** Homeowners, developers, and institutions about to build in a hot climate — people who currently brief an architect with a Pinterest board and a vague sense that they don't want generator noise.

**The problem it solves.** Clients can't distinguish climate-responsive design from decoration, so they price architecture as a drawing cost. Studio COKA burns unpaid hours educating prospects before a contract exists. Heat Check moves that education upstream and makes it scalable.

**How someone uses it.** They land on the site, click "Get your free climate brief," pin their site, answer three questions, and receive a beautifully formatted PDF in under 30 seconds. No sign-up required to generate it — sign-up is prompted only if they want to save or share it.

**Technology.** Climate data from Open-Meteo Historical and NASA POWER — free, no API key, global coverage. The physics (solar geometry, degree-hours, wind rose) runs as deterministic TypeScript, not as an LLM. Gemini 2.5 Flash does only what models are genuinely good at: turning that numeric analysis plus retrieved precedents from Studio COKA's project corpus into specific, readable, brand-consistent prose, returned as schema-validated JSON. Chosen for latency, cost at scale, and native structured output.

**First working version.** Two weeks: a Next.js route handler, a map picker (Mapbox GL), the climate math module, ~20 Studio COKA projects embedded in pgvector for retrieval, Zod-enforced model output, React-PDF export, lead forwarded to the studio inbox.

**Limits and safeguards.** This is design guidance, not engineering certification — stated prominently. Climate grids are ~10 km, so site-specific obstructions are unknown and the brief says so explicitly. Every number shown comes from the deterministic layer, never from the model — eliminating fabricated savings claims. Rate limits, cost caps, and explicit consent before any data is stored.

---

## Part 3 — Analytics and improvement (<=250 words)

**What I would track.** Outcomes, not vanity. Primary: qualified enquiries, segmented by interest (architecture, keynote, TEA, AKO). Secondary: scroll depth reaching the contact section, venture-card click-through rate, outbound clicks per destination, and which entry point each converter arrived through. Health: field Core Web Vitals (LCP, INP, CLS from real users) — not lab scores.

**Tools.** GA4 for funnels and channel attribution; Vercel Speed Insights for real-user performance; Microsoft Clarity for free session replay and heatmaps; Google Search Console for organic queries and impressions; UTM parameters on every outbound link so Studio COKA and AKO can attribute traffic back to the portfolio site.

**How I would use the data.** Scroll depth tells me if the hierarchy is wrong — if 60% never reach the Method section, the About section is over-long. Session replay shows rage-clicks on non-interactive elements. CTR imbalance across interest categories tells me whether the page's weighting matches actual demand, and I'd reorder sections accordingly. Speed Insights INP spikes on mobile would send me back to reduce interaction listeners.

**The scenario: 5,000 visitors, 5 enquiries (0.1% CVR).**

First, I'd check whether the number is real: submit a test enquiry, verify the handler fires, check spam filters. A broken form or a Gmail promotions tab filter is the single most common cause and the cheapest to rule out.

Then: is it the right traffic? Bot share, geography vs. service area, channel mix. 5,000 irrelevant visits isn't a conversion problem.

Then friction: mobile field count, required vs. optional fields, trust signals near the CTA.

Finally, I'd question the metric itself. One architecture commission can be worth six figures. The better fix isn't a bigger button — it's a micro-conversion ladder (Heat Check brief, newsletter sign-up) so the other 4,995 visitors have a low-commitment next step instead of a high-commitment one.
