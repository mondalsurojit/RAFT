// Generates public/sitemap.xml from the canonical route list.
// Runs automatically before `npm run build` (see package.json "prebuild").
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const BASE = process.env.SITE_URL || 'https://raft.iith.ac.in'

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/research', priority: '0.9' },
  { path: '/projects', priority: '0.8' },
  { path: '/publications', priority: '0.8' },
  { path: '/products', priority: '0.9' },
  { path: '/products/snapflood', priority: '0.9' },
  { path: '/products/varshamitra', priority: '0.7' },
  { path: '/team', priority: '0.7' },
  { path: '/get-involved', priority: '0.6' },
  { path: '/faq', priority: '0.5' },
  { path: '/events', priority: '0.5' },
  { path: '/news', priority: '0.6' },
  { path: '/contact', priority: '0.7' },
  { path: '/blog', priority: '0.6' },
  // Blog posts — keep in sync with content/blogs/*.md
  { path: '/blog/snapflood', priority: '0.6' },
  { path: '/blog/varshaanalytics', priority: '0.5' },
  { path: '/blog/understanding-urban-flooding', priority: '0.5' },
]

const lastmod = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10)

const urls = routes
  .map(
    (r) =>
      `  <url>\n    <loc>${BASE}${r.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

const out = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml')
writeFileSync(out, xml)
console.log(`sitemap.xml written with ${routes.length} routes -> ${BASE}`)
