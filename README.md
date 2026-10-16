# Crystal Kizor — Brand Landing Page

A single-page landing experience bringing seven ventures under one personal brand.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP + ScrollTrigger · Lenis · Sharp

Full design rationale and the Part 2 / Part 3 answers live in [`answer.md`](./answer.md).

## Getting started

```bash
npm install
npm run assets   # optimise source assets -> public/media + typed manifest
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script | Purpose |
|---|---|
| `npm run assets` | Sharp pipeline: extracts logo lockups, converts imagery to WebP, generates blur placeholders and the typed media manifest |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

## Environment

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for metadata, JSON-LD, sitemap and robots |

## Structure

```
assets/                     # supplied source assets (not served)
scripts/prepare-assets.mjs  # build-time image + logo pipeline
public/media/               # generated, optimised output
src/
  app/                      # layout, page, SEO routes, OG image
  components/
    layout/                 # Preloader, DockNav, Footer
    primitives/             # LineReveal, Reveal, Marquee, Counter, MediaFrame, Wordmark, ArrowLink, SectionLabel
    providers/              # IntroProvider, SmoothScroll
    sections/               # Hero, Positioning, ProofBar, Thesis, Ecosystem, Work, Method, Gallery, Ideas, Timeline, WhereNext
  lib/
    content.ts              # single source of truth for all copy, ventures, projects, pathways
    generated/media.ts      # generated asset manifest (do not edit)
    gsap.ts · motion.ts · motionTag.ts
```

All page copy and structure is data-driven from `src/lib/content.ts` — ventures, hierarchy tiers, projects, metrics, pathways and navigation. Editing that file reshapes the page.

## Asset pipeline

`npm run assets` is idempotent and re-runnable. It:

1. Extracts five logo lockups from the supplied collection sheet and converts cream-on-ink artwork into alpha-masked PNGs in both ink and bone tints.
2. Generates `icon.png` and `apple-icon.png` from the monogram.
3. Converts 32 source images to width-capped WebP (90 MB → 6.6 MB).
4. Emits `src/lib/generated/media.ts` with real dimensions and base64 blur placeholders.

## Accessibility & motion

`prefers-reduced-motion` is a fully supported path: smooth scroll is not initialised, the intro is skipped, GSAP timelines never build, and counters render their final value immediately.

## Deploy

Deploys to Vercel with no configuration. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
