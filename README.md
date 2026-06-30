# RAFT — IIT Hyderabad

Official website for **RAFT (Rainfall-runoff Analysis Modelling and Forecasting Tools)**, the hydroinformatics research group and innovation lab led by **Dr. Satish Kumar Regonda** in the Department of Civil Engineering, IIT Hyderabad.

A premium, light-theme, statically-prerendered marketing & research site: fast, SEO-complete, accessible, and built to scale as RAFT grows.

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | **React 18 + TypeScript** |
| Build / dev | **Vite 6** |
| Rendering | **Static prerendering (SSG)** via `vite-react-ssg` — every route ships as static HTML, no server required |
| Styling | **Tailwind CSS 3** (custom design-token system) |
| Animation | **Framer Motion** (scroll reveals, micro-interactions; respects `prefers-reduced-motion`) |
| Charts | **Chart.js** + `react-chartjs-2` (client-only, hydrated) |
| Sliders | **Swiper** (client-only, hydrated) |
| Icons | **Lucide React** |
| SEO | `react-helmet-async` (via `vite-react-ssg`'s `<Head>`) — per-page title/meta/OG/Twitter/canonical + JSON-LD |
| Routing | `react-router` route records (lazy, code-split per page) |

Premium UI patterns (aurora/spotlight/grid backgrounds, cursor-spotlight cards, water wave dividers, marquee, animated counters) are hand-built in `src/components/fx` in the spirit of Aceternity UI — no heavyweight UI dependency.

---

## Getting started

```bash
npm install        # install dependencies
npm run dev        # local dev server (http://localhost:5173)
npm run build      # generate the static site into dist/  (runs prebuild sitemap step)
npm run preview    # serve the built dist/ locally (http://localhost:4173)
npm run typecheck  # tsc --noEmit (currently 0 errors)
```

`npm run build` output: 19 prerendered HTML routes in `dist/` (including the blog index and one static page per blog post), ready for any static host or CDN.

---

## Project structure

```
src/
  main.tsx                 # ViteReactSSG entry
  App.tsx                  # route table (all routes + per-post blog routes + 404), lazy + code-split
  config/site.ts           # site identity, canonical URL, navigation, socials
  lib/
    cn.ts                  # className merge (clsx + tailwind-merge)
    motion.ts              # shared Framer Motion variants
    seo.ts                 # canonical/OG helpers + JSON-LD builders
  content/                 # CONTENT LOADERS — read content/data/*.json, resolve icons, export typed objects
    types.ts               # all content interfaces (DB/API-ready shapes)
    icons.ts               # icon-name → Lucide component registry (used by the loaders)
    raft.ts person.ts research.ts products.ts projects.ts publications.ts
    team.ts partners.ts engagement.ts news.ts events.ts iith.ts contact.ts
    index.ts               # barrel
  components/
    ui/                    # primitives: Button, Card, Badge, Section, Container, …
    fx/                    # premium effects: AuroraBackground, Spotlight, Carousel, …
    charts/                # Chart.js wrappers (client-only via <ClientOnly>)
    sections/              # composed, reusable page sections (PageHeader, CTASection, …)
    layout/                # Navbar (mega-menu), Footer, Seo, Layout, ScrollManager
  pages/                   # one file per route (default-exported page component)
  styles/globals.css       # Tailwind layers, base styles, utilities
public/                    # favicon, og card, robots.txt, sitemap.xml, manifest, images
content/                   # ← MAINTAINER-EDITABLE CONTENT (edit here, no code) — see "Editing content"
  data/*.json              # structured site data, one JSON file per topic
  blogs/*.md               # blog posts (Markdown + frontmatter)
docs/                      # local-only research notes & dossier (git-ignored, kept on disk)
```

### Editing content

All editable site content lives in the top-level **`content/`** folder — change a file there, rebuild, and the site updates. **Nothing in `src/` needs to change for routine content edits.**

```
content/
  data/        # structured data, one JSON file per topic (see table below)
  blogs/       # blog posts, one Markdown file per post
```

#### Structured data — `content/data/*.json`

| File | What it controls |
|---|---|
| `raft.json` | RAFT identity & tagline, the UFIS summary, the 4-pillar approach, values, headline stats, and the milestone timeline |
| `projects.json` | The Projects list (+ the TRL scale labels) |
| `products.json` | SnapFlood, VarshaAnalytics, and the roadmap product cards |
| `research.json` | Research areas, capabilities, study regions, tools |
| `publications.json` | Citation metrics + the publications list |
| `team.json` | Current members, past members, and the "join us" blurb |
| `person.json` | The group lead's profile and external links |
| `partners.json` | Funders, collaborators, and partner notes |
| `engagement.json` | Get-involved opportunities, support options, and the FAQ |
| `news.json` | News & media items, and the media gallery |
| `events.json` | Events list |
| `contact.json` | Emails, postal address, map query (NOT the form keys — those live in `.env`) |
| `iith.json` | IIT Hyderabad institutional facts + logo path |

**Rules for editing JSON safely**

- Keep the **quotes** `"like this"` around every text value and field name.
- **No trailing commas** — the last item in a list or block must not be followed by a comma. This is the most common mistake.
- To add an item, copy an existing `{ ... }` block, paste it, and edit the values.
- **Icons** are written as a name, e.g. `"icon": "Camera"`. Valid names are the keys in [`src/content/icons.ts`](src/content/icons.ts). To use a new icon, a developer adds one line there.
- **Images** point to files in `public/images/...` (e.g. `/images/team/x.jpeg`). Put the file there first, then reference it with a path starting at `/images`.

#### How it works (for developers)

The JSON is loaded by the thin modules in [`src/content/*.ts`](src/content/), which resolve icon names to Lucide components via [`src/content/icons.ts`](src/content/icons.ts) and re-export fully-typed objects. Pages import from `@/content` exactly as before — the JSON move is invisible to them. Interfaces live in [`src/content/types.ts`](src/content/types.ts) and are ready to back with a CMS/API later. The `@content` path alias (in `vite.config.ts` + `tsconfig.json`) points at the root `content/` folder.

#### Secrets / integration keys — `.env` (not content)

The contact-form endpoint and Google sign-in client ID are configuration, not content, so they live in `.env` (see `.env.example`). Never put these in the JSON files.

### Information architecture (routes)

`/` · `/about` (incl. Vision, Mission & UFIS) · `/research` · `/projects` · `/publications` · `/products` · `/products/snapflood` · `/products/varshamitra` · `/team` · `/collaborations` · `/get-involved` (proposals + funding calls + careers) · `/events` · `/news` · `/blog` (+ one route per post in `src/content/blog.ts`) · `/support` · `/contact` (+ 404).

Navigation groups these into a mega-menu: **About · Research · Products · Engage · News** (Blog lives under News).

### Blog

Each post is a self-contained Markdown file in [`content/blogs/`](content/blogs/) — separate from the app source — with YAML-style frontmatter for its metadata (`title`, `excerpt`, `date`, `readingTime`, `author`, `tags`, `cover`, `pinned`, `order`). Files are imported at **build time** (Vite raw-glob in [`src/content/blog.ts`](src/content/blog.ts)) and rendered with `react-markdown` + `remark-gfm`, so the **full article is prerendered** — no runtime fetch, no SEO compromise. The filename (minus `.md`) becomes the URL slug; `##`/`###` headings feed the sticky "On this page" navigation. Add a `.md` file and it appears in the index, nav listing and build output — also add its path to `scripts/generate-sitemap.mjs`. The pinned post is featured at the top of the index.

---

## Design system

- **Tokens** in `tailwind.config.js`: `brand` (ocean azure, primary), `aqua` (teal accent), `signal` (flood-alert amber), `ink` (cool slate neutrals), and `iith` (institutional sun/indigo accents).
- **Type**: Space Grotesk (display) · Inter (body) · JetBrains Mono (data).
- **Light theme** throughout, with dark contrast bands (UFIS, footer, CTA) for depth.
- WCAG-minded: skip link, focus-visible rings, reduced-motion support, semantic landmarks, alt text, accessible disclosure (`<details>`) FAQ and native-link navigation.

> **IIT Hyderabad brand colours:** IITH publishes its logo colours in **CMYK only** — the `iith.*` hex values here are unofficial sRGB approximations used sparingly for institutional accents. Replace with official web colours if IITH provides them.

---

## Deployment

The site is fully static. Deploy `dist/` to any static host (IITH web hosting, Netlify, GitHub Pages, S3/CloudFront, etc.).

1. Set the production origin: edit `site.url` in `src/config/site.ts` and `BASE` in `scripts/generate-sitemap.mjs` (or set `SITE_URL` env before build). Default is the placeholder `https://raft.iith.ac.in`.
2. `npm run build`
3. Serve `dist/`. URLs are clean directories (e.g. `/about/` → `about/index.html`). Configure the host to serve `dist/index.html`-style fallbacks; a `404` can be served from any route's HTML if desired.

---

## ⚠️ Content to confirm before publishing

Per the brief, **no facts were invented**. Verified facts (Dr. Regonda's profile, SnapFlood, publications, IITH details, funders) are sourced in [`docs/research-dossier.md`](docs/research-dossier.md). The following are **client-provided or editorial and should be confirmed** — each is clearly marked in the UI and/or content files:

| Item | Status | Where |
|---|---|---|
| **Founding year "2019"** | Not independently verifiable online (Dr. Regonda joined IITH in 2017; headed Dept. of Climate Change 2019–2022). Framed via timeline, marked "indicative". | `content/raft.ts` |
| **"Research-based consulting startup" evolution** | Not publicly corroborated; presented as forward-looking direction. | `content/raft.ts`, Engage pages |
| **Mission statement** | RAFT publishes no labelled mission; ours is editorial synthesis (flagged in-page). | `content/raft.ts`, `/vision-mission` |
| **VarshaMitra Analytics** | Verified as IITH's 2023 *mascot* for SnapFlood. The "Analytics product" is framed as a **roadmap** direction (flagged in-page). | `content/products.ts`, `/products/varshamitra` |
| **Project TRL values** | Indicative editorial estimates, not official. | `content/projects.ts`, `/projects` |
| **Team photos** | Member names/roles are **real** (from the RAFT page). Photos are wired in `public/images/team/` — `satish-regonda.png` plus `surojit.png`, `divyansh.png`, `jagannath.png`, and `vamshi/lagnajeet/saipriya/surya-kiran/padmini.jpeg`. Missing photos fall back to branded initials. | `public/images/team/`, `content/team.ts` |
| **About team photo** | The About lead column shows a placeholder for a **group photo** — drop one at `public/images/team/group.jpg` and it appears (until then a placeholder icon shows). | `public/images/team/`, `pages/About.tsx` |
| **Milestone thumbnails** | About timeline tiles fall back to a branded year tile; set `image:` on a `timeline` item (under `/public`) for a real thumbnail. The 2017 item uses `images/iith_campus.jpeg`. | `content/raft.ts` |
| **Events, funding calls, get-involved, support, media gallery** | Forward-looking placeholders reflecting RAFT's direction. | `content/engagement.ts`, `events.ts`, `news.ts` |
| **Contact: group email, phone, PIN code** | `contact@raft.iith.ac.in` is a placeholder; phone & PIN differ across sources. Lead email `satishr@ce.iith.ac.in` is verified. | `content/contact.ts` |
| **OG social image** | An SVG card ships in `public/images/og/`; export a 1200×630 **PNG** for best cross-platform support and point `DEFAULT_OG_IMAGE` (`src/lib/seo.ts`) at it. | `public/images/og/`, `src/lib/seo.ts` |
| **Media gallery assets** | News gallery uses placeholder tiles — swap in real images/videos when available. | `news.ts` |

Note: the department site is **`civil.iith.ac.in`** (the older `ce.iith.ac.in` host no longer resolves). Dr. Regonda's faculty profile is at `iith.ac.in/ce/satishr/`.

---

*Built for IIT Hyderabad. Hosted by IIT Hyderabad; supported by DST-SPLICE and the AI CoE for Sustainable Cities.*
