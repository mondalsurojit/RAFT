/**
 * Blog content.
 *
 * Each post is a self-contained Markdown file in the top-level `content/blogs/`
 * folder — separate from the application source, but imported at BUILD time
 * (Vite raw-glob) so the full article is baked into the prerendered HTML. No
 * runtime fetch, no loading state, no SEO compromise.
 *
 * To add or edit a post, just edit the `.md` file: YAML-style frontmatter holds
 * the metadata (title, date, tags, …) and the body is plain Markdown rendered
 * with react-markdown. The filename (minus `.md`) becomes the URL slug.
 */
export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  author: string
  tags: string[]
  /** Gallery images under /public — shown as a Swiper slider (thumbnail + in-article) when >1. */
  images: string[]
  /** Social-card image (defaults to the first gallery image). */
  cover?: string
  /** Pinned posts are surfaced first / featured on the blog index. */
  pinned: boolean
  /** Manual ordering within the listing (lower = earlier). */
  order: number
  body: string
}

/** Raw Markdown for every post, inlined at build time. */
const files = import.meta.glob('/content/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

interface Frontmatter {
  data: Record<string, string>
  body: string
}

/** Minimal, dependency-free frontmatter parser (`key: value`, one per line). */
function parseFrontmatter(raw: string): Frontmatter {
  const normalised = raw.replace(/^﻿/, '') // strip a leading BOM, if present
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(normalised)
  if (!match) return { data: {}, body: normalised.trim() }

  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return { data, body: match[2].trim() }
}

/** Split a comma-separated frontmatter value into a trimmed, non-empty list. */
function list(value?: string): string[] {
  return value ? value.split(',').map((s) => s.trim()).filter(Boolean) : []
}

function toPost(path: string, raw: string): BlogPost {
  const slug = (path.split('/').pop() ?? '').replace(/\.md$/, '')
  const { data, body } = parseFrontmatter(raw)
  // Explicit `images:` list, else fall back to a single `cover:`.
  const images = data.images ? list(data.images) : data.cover ? [data.cover] : []
  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || '',
    date: data.date || '',
    readingTime: data.readingTime || '',
    author: data.author || 'RAFT',
    tags: list(data.tags),
    images,
    cover: data.cover || images[0] || undefined,
    pinned: data.pinned === 'true',
    order: data.order ? Number(data.order) : 999,
    body,
  }
}

export const blogPosts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return a.order - b.order
  })

export const blogPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug)
