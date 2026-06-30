import { ArrowLeft, Clock, User } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { TocFab, TocInline, type TocEntry } from '@/components/blog/BlogToc'
import { ImageSlider } from '@/components/fx/ImageSlider'
import { Seo } from '@/components/layout/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { SmartLink } from '@/components/ui/SmartLink'
import { blogPostBySlug } from '@/content'
import { cn } from '@/lib/cn'
import { breadcrumbLd } from '@/lib/seo'

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

/** Flatten a React node tree to its text content (for heading ids). */
function toText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(toText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return toText((node as { props: { children?: React.ReactNode } }).props.children)
  }
  return ''
}

/** Pull h2/h3 headings out of the Markdown source for the side navigation. */
function buildToc(md: string): TocEntry[] {
  const toc: TocEntry[] = []
  let inFence = false
  for (const line of md.split('\n')) {
    if (line.trim().startsWith('```')) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const match = /^(#{2,3})\s+(.*)$/.exec(line)
    if (match) {
      const text = match[2].trim()
      toc.push({ level: match[1].length, text, id: slugify(text) })
    }
  }
  return toc
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 id={slugify(toText(children))} className="scroll-mt-28 pt-2 text-2xl font-bold text-ink-900">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={slugify(toText(children))} className="scroll-mt-28 text-lg font-semibold text-ink-900">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="leading-relaxed text-ink-700">{children}</p>,
  ul: ({ children }) => <ul className="ml-1 list-disc space-y-2 pl-5 text-ink-700 marker:text-brand-400">{children}</ul>,
  ol: ({ children }) => <ol className="ml-1 list-decimal space-y-2 pl-5 text-ink-700 marker:text-ink-400">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink-900">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-brand-300 pl-5 italic text-ink-600">{children}</blockquote>
  ),
  hr: () => <hr className="border-ink-200" />,
  a: ({ href, children }) => (
    <SmartLink to={href ?? '#'} className="font-medium text-brand-700 underline-offset-2 hover:underline">
      {children}
    </SmartLink>
  ),
  code: ({ children }) => (
    <code className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[0.85em] text-ink-800">{children}</code>
  ),
}

export default function BlogPost() {
  const { pathname } = useLocation()
  const slug = pathname.split('/').filter(Boolean).pop() ?? ''
  const post = blogPostBySlug(slug)

  const toc = useMemo(() => (post ? buildToc(post.body) : []), [post])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (!toc.length) return
    const els = toc.map((t) => document.getElementById(t.id)).filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-100px 0px -66% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [toc])

  if (!post) {
    return (
      <Container className="py-32 text-center">
        <h1 className="text-2xl font-bold text-ink-900">Post not found</h1>
        <SmartLink to="/blog" className="mt-4 inline-block font-medium text-brand-700 hover:underline">
          ← Back to the blog
        </SmartLink>
      </Container>
    )
  }

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.cover}
        type="article"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Blogs', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      {/* Article header */}
      <section className="border-b border-ink-200/70 bg-ink-50/60 py-12 sm:py-16">
        <Container>
          <SmartLink
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" /> Blogs
          </SmartLink>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {post.tags.map((t) => (
              <Badge key={t} tone="brand">
                {t}
              </Badge>
            ))}
          </div>
          <h1 className="mt-3 max-w-3xl text-balance text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span>{post.date}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
        </Container>
      </section>

      {/* Body + on-this-page */}
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* On this page */}
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="mb-3 text-2xs font-semibold uppercase tracking-[0.16em] text-ink-400">On this page</p>
                <ul className="max-h-[70vh] space-y-0.5 overflow-y-auto border-l border-ink-200 [scrollbar-width:thin]">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth' })}
                        className={cn(
                          '-ml-px block w-full border-l-2 py-1.5 pr-2 text-left text-sm transition-colors',
                          t.level === 3 ? 'pl-7' : 'pl-4',
                          activeId === t.id
                            ? 'border-brand-600 font-medium text-brand-700'
                            : 'border-transparent text-ink-500 hover:text-ink-800',
                        )}
                      >
                        {t.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* Article */}
          <article className="min-w-0 max-w-[47rem] space-y-5">
            {post.images.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-soft">
                {post.images.length > 1 ? (
                  <ImageSlider
                    images={post.images.map((src) => ({ src, alt: post.title }))}
                    className="aspect-[11/5] w-full"
                    autoplay={false}
                    fade={false}
                  />
                ) : (
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    className="aspect-[11/5] w-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            )}

            {/* Mobile-only table of contents (the desktop one lives in the left aside). */}
            <TocInline toc={toc} />

            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {post.body}
            </ReactMarkdown>

            <div className="!mt-12 border-t border-ink-200 pt-6">
              <p className="text-sm text-ink-500">
                Have a topic you’d like RAFT to write about?{' '}
                <SmartLink to="/contact" className="font-medium text-brand-700 hover:underline">
                  Get in touch
                </SmartLink>
                .
              </p>
            </div>
          </article>
        </div>
      </Container>

      {/* Mobile-only floating jump-to-section control */}
      <TocFab toc={toc} activeId={activeId} />
    </>
  )
}
