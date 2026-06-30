import { ArrowUpRight, Clock, Pin, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ImageSlider } from '@/components/fx/ImageSlider'
import { Seo } from '@/components/layout/Seo'
import { PageHeader } from '@/components/sections/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Section } from '@/components/ui/Section'
import { SmartLink } from '@/components/ui/SmartLink'
import { blogPosts } from '@/content'
import type { BlogPost } from '@/content'
import { cn } from '@/lib/cn'
import { breadcrumbLd } from '@/lib/seo'

const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags))).sort()

/** Featured image: a Swiper slider when >1 image, else a single image, else a branded tile. */
function FeaturedThumb({ post, className }: { post: BlogPost; className?: string }) {
  const slides = post.images.map((src) => ({ src, alt: post.title }))
  if (slides.length > 1) {
    // Elevated above the card's stretched link so swipe/dots work; the text still navigates.
    return (
      <div className={cn('relative z-10 overflow-hidden', className)}>
        <ImageSlider images={slides} className="h-full w-full" autoplay fade={false} />
      </div>
    )
  }
  if (slides.length === 1) {
    return (
      <div className={cn('overflow-hidden bg-ink-100', className)}>
        <img src={slides[0].src} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
      </div>
    )
  }
  return (
    <div className={cn('flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-100 via-aqua-50 to-brand-50', className)}>
      <span className="font-display text-5xl font-bold text-brand-300">{post.title.charAt(0)}</span>
    </div>
  )
}

/** Large featured (pinned) card — image beside content on large screens. */
function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative grid overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-card lg:grid-cols-[1.55fr_1fr]">
      <div className="order-2 flex flex-col justify-center p-5 sm:p-6 lg:order-1">
        <div className="flex flex-wrap items-center gap-2">
          {post.pinned && (
            <span title="Pinned" className="inline-flex text-ink-400">
              <Pin className="h-3.5 w-3.5" aria-label="Pinned" />
            </span>
          )}
          {post.tags.map((t) => (
            <Badge key={t} tone="brand">
              {t}
            </Badge>
          ))}
          <span className="inline-flex items-center gap-1 text-xs text-ink-500">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>
        <h2 className="mt-2.5 text-pretty text-xl font-bold leading-snug text-ink-900 group-hover:text-brand-700">
          <SmartLink to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </SmartLink>
        </h2>
        <p className="mt-2 line-clamp-2 text-pretty text-sm leading-relaxed text-ink-600">{post.excerpt}</p>
        <span className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          Read the post <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <FeaturedThumb post={post} className="order-1 aspect-[16/9] w-full lg:order-2 lg:aspect-auto lg:h-full" />
    </article>
  )
}

/** Compact list card — concise, text-focused. */
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <SmartLink
      to={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-ink-200/70 bg-white p-5 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="flex flex-wrap items-center gap-2">
        {post.tags.slice(0, 1).map((t) => (
          <Badge key={t} tone="aqua">
            {t}
          </Badge>
        ))}
        <span className="text-xs text-ink-500">{post.date}</span>
      </div>
      <h3 className="mt-3 flex-1 text-base font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs text-ink-400">
          <Clock className="h-3.5 w-3.5" />
          {post.readingTime}
        </span>
        <ArrowUpRight className="h-4 w-4 text-brand-600" />
      </div>
    </SmartLink>
  )
}

export default function Blog() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return blogPosts.filter((p) => {
      const byTag = tag === 'All' || p.tags.includes(tag)
      const byQuery = !q || `${p.title} ${p.excerpt} ${p.tags.join(' ')}`.toLowerCase().includes(q)
      return byTag && byQuery
    })
  }, [query, tag])

  const isFiltering = query.trim() !== '' || tag !== 'All'
  const featured = !isFiltering ? blogPosts.find((p) => p.pinned) ?? blogPosts[0] : undefined
  const gridPosts = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered

  return (
    <>
      <Seo
        title="Blogs"
        description="Explainers and notes from RAFT on urban flooding, rainfall-runoff modelling, forecasting and community flood reporting."
        path="/blog"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Blogs' }]}
        kicker="Blogs"
        title="Notes on water, weather and resilience"
        description="Plain-language explainers on how flood science works — and how RAFT puts it to use."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Filter / search aside — left */}
          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            <div>
              <label className="mb-2 block text-2xs font-semibold uppercase tracking-wide text-ink-500">Search</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search posts…"
                  className="w-full rounded-full border border-ink-200 bg-white py-2.5 pl-10 pr-4 text-sm text-ink-900 shadow-soft placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-2xs font-semibold uppercase tracking-wide text-ink-500">Topics</p>
              <div className="flex flex-wrap gap-2">
                {['All', ...allTags].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag(t)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                      tag === t
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-ink-200 bg-white text-ink-600 hover:border-brand-200 hover:text-brand-700',
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <div>
            <p className="text-sm text-ink-500">
              {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
              {tag !== 'All' && ` in ${tag}`}
              {query.trim() && ` matching “${query.trim()}”`}
            </p>

            {featured && (
              <div className="mt-4">
                <FeaturedCard post={featured} />
              </div>
            )}

            {gridPosts.length > 0 && (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {gridPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="mt-4 rounded-2xl border border-dashed border-ink-300 bg-white p-10 text-center text-sm text-ink-500">
                No posts match your search.
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
