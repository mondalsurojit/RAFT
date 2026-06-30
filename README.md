# RAFT — IIT Hyderabad

Website for **RAFT (Rainfall-runoff Analysis Modelling and Forecasting Tools)**, the hydroinformatics research group at IIT Hyderabad. Static, prerendered, light-theme React site.

## Stack

React 18 · TypeScript · Vite 6 · **vite-react-ssg** (static prerender) · Tailwind 3 · Framer Motion · Swiper · Leaflet · Lucide · react-markdown.

## Commands

```bash
npm install
npm run dev        # dev server   → http://localhost:5173
npm run build      # static site  → dist/ (18 prerendered routes)
npm run preview    # serve dist/   → http://localhost:4173
npm run typecheck  # tsc --noEmit
```

## Structure

```
content/             # editable content (no code) — see "Editing content"
  data/*.json        # structured site data, one file per topic
  blogs/*.md         # blog posts (Markdown + frontmatter)
src/
  pages/             # one component per route
  components/        # ui/ · fx/ · sections/ · layout/ · charts/
  content/           # loaders: read content/data/*.json, resolve icons, export typed objects
    types.ts  icons.ts  index.ts
  config/site.ts     # identity, canonical URL, nav, socials
  lib/               # cn · motion variants · seo helpers
  styles/globals.css
public/              # images, favicon, og, robots, sitemap, manifest
```

Path aliases: `@/*` → `src/*`, `@content/*` → `content/*`.

## Editing content

Site copy lives in `content/data/*.json` — edit and rebuild, no code changes. Icons are names (e.g. `"icon": "Camera"`) resolved via [`src/content/icons.ts`](src/content/icons.ts); images point to `/images/...` under `public/`. Mind JSON trailing commas.

| File | Controls |
|---|---|
| `raft.json` | identity, UFIS, approach, values, stats, timeline |
| `projects.json` | projects + TRL scale |
| `products.json` | SnapFlood, VarshaAnalytics, roadmap |
| `research.json` | research areas, capabilities, regions, tools |
| `publications.json` | citation metrics + publications |
| `team.json` · `person.json` | members + group lead |
| `partners.json` · `engagement.json` | funders/collaborators + opportunities/FAQ |
| `news.json` · `events.json` | news + events |
| `contact.json` · `iith.json` | contact details + institute facts |

**Blog:** add a `.md` file in `content/blogs/` (frontmatter + Markdown); filename = URL slug. Also add its path to `scripts/generate-sitemap.mjs`.

**Secrets** (contact-form endpoint, Google client ID) live in `.env`, never in JSON — see `.env.example`.

## Deploy

Fully static — deploy `dist/` to any static host (IITH web hosting, Netlify, GitHub Pages, S3/CloudFront).

1. **Set the production origin** — edit `site.url` in `src/config/site.ts` and `BASE` in `scripts/generate-sitemap.mjs` (or set `SITE_URL` env before build). Default is the placeholder `https://raft.iith.ac.in`.
2. `npm run build`
3. **Serve `dist/`** — URLs are clean directories (`/about/` → `about/index.html`); configure the host for `index.html`-style fallbacks. A 404 can be served from any route's HTML if desired.
