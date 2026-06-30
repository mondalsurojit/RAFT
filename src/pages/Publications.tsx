import { ArrowDownUp, BarChart3, ChevronLeft, ChevronRight, GraduationCap, Info, PieChart, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { PublicationAreasChart, PublicationsByYearChart } from '@/components/charts'
import { Seo } from '@/components/layout/Seo'
import { PageHeader } from '@/components/sections/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SmartLink } from '@/components/ui/SmartLink'
import { site } from '@/config/site'
import { doiUrl, publicationAreas, publicationMetrics, publications } from '@/content'
import { cn } from '@/lib/cn'
import { breadcrumbLd } from '@/lib/seo'

const PER_PAGE = 5

type Sort = 'latest' | 'oldest'

const metricCards = [
  { label: 'Citations', value: publicationMetrics.citations, suffix: '+' },
  { label: 'h-index', value: publicationMetrics.hIndex, suffix: '' },
  { label: 'i10-index', value: publicationMetrics.i10Index, suffix: '' },
]

export default function Publications() {
  const [area, setArea] = useState('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('latest')
  const [page, setPage] = useState(1)
  const [showInfo, setShowInfo] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = publications.filter((p) => {
      const byArea = area === 'All' || p.area === area
      const byQuery = !q || `${p.title} ${p.venue} ${p.area ?? ''}`.toLowerCase().includes(q)
      return byArea && byQuery
    })
    return [...list].sort((a, b) => (sort === 'latest' ? b.year - a.year : a.year - b.year))
  }, [area, query, sort])

  // Reset to page 1 whenever the filter/sort set changes.
  useEffect(() => setPage(1), [area, query, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const current = Math.min(page, pageCount)
  const pageItems = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  return (
    <>
      <Seo
        title="Publications"
        description="Selected peer-reviewed publications from RAFT across hydrology, flood forecasting, hydroclimatology and AI for water."
        path="/publications"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Publications', path: '/publications' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Publications' }]}
        kicker="Publications"
        title="Peer-reviewed, cited worldwide"
        description="A curated selection of RAFT’s research output — from operational ensemble forecasting to flood inundation across Indian river basins."
      />

      {/* Analytics — metrics on the left, charts on the right */}
      <Section>
        <Reveal>
          <div className="rounded-3xl border border-ink-200/70 bg-white p-6 shadow-card sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-ink-900">Research metrics</h2>
                <div className="relative">
                  <button
                    type="button"
                    aria-label="About these metrics"
                    aria-expanded={showInfo}
                    onClick={() => setShowInfo((v) => !v)}
                    onBlur={() => setShowInfo(false)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-100 hover:text-brand-600"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                  {showInfo && (
                    <div
                      role="tooltip"
                      className="absolute left-0 top-full z-20 mt-2 w-64 rounded-xl border border-ink-200 bg-white p-3 text-xs leading-relaxed text-ink-600 shadow-card-hover"
                    >
                      Metrics are a {publicationMetrics.source} snapshot ({publicationMetrics.snapshot}) and drift over
                      time.
                    </div>
                  )}
                </div>
              </div>
              <ButtonLink to={site.social.scholar} variant="secondary" size="sm">
                <GraduationCap className="h-4 w-4" />
                Google Scholar
              </ButtonLink>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
              {/* 3 metric boxes — left */}
              <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
                {metricCards.map((m) => (
                  <div key={m.label} className="flex flex-col justify-center rounded-2xl bg-ink-50 p-4 text-center lg:py-6">
                    <p className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                      {m.value.toLocaleString()}
                      {m.suffix}
                    </p>
                    <p className="mt-1 text-2xs text-ink-500 sm:text-xs">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* 2 charts — right */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-ink-200/70 bg-white p-5">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-800">
                    <BarChart3 className="h-4 w-4 text-brand-600" />
                    Publications by year (selected)
                  </p>
                  <PublicationsByYearChart />
                </div>
                <div className="rounded-2xl border border-ink-200/70 bg-white p-5">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-800">
                    <PieChart className="h-4 w-4 text-aqua-600" />
                    By research area
                  </p>
                  <PublicationAreasChart />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Publication list — filter/search/sort aside on the left, results on the right */}
      <Section bg="muted">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Aside controls */}
          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            <div>
              <label className="mb-2 block text-2xs font-semibold uppercase tracking-wide text-ink-500">Search</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Title, venue or area…"
                  className="w-full rounded-full border border-ink-200 bg-white py-2.5 pl-10 pr-4 text-sm text-ink-900 shadow-soft placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-2xs font-semibold uppercase tracking-wide text-ink-500">Sort by</label>
              <div className="relative">
                <ArrowDownUp className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="w-full appearance-none rounded-full border border-ink-200 bg-white py-2.5 pl-10 pr-9 text-sm font-medium text-ink-800 shadow-soft focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                >
                  <option value="latest">Latest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
                <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-ink-400" />
              </div>
            </div>

            <div>
              <p className="mb-2 text-2xs font-semibold uppercase tracking-wide text-ink-500">Research area</p>
              <div className="flex flex-wrap gap-2">
                {['All', ...publicationAreas].map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setArea(a)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                      area === a
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-ink-200 bg-white text-ink-600 hover:border-brand-200 hover:text-brand-700',
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <div>
            <p className="text-sm text-ink-500">
              {filtered.length} {filtered.length === 1 ? 'publication' : 'publications'}
              {area !== 'All' && ` in ${area}`}
              {query && ` matching “${query}”`}
            </p>

            <ul className="mt-4 space-y-3">
              {pageItems.map((p) => (
                <li
                  key={p.title}
                  className="flex flex-col gap-3 rounded-2xl border border-ink-200/70 bg-white p-5 shadow-soft transition-shadow hover:shadow-card sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="neutral">{p.year}</Badge>
                      {p.area && <span className="text-xs font-medium text-aqua-700">{p.area}</span>}
                    </div>
                    <h3 className="mt-2 text-pretty font-semibold leading-snug text-ink-900">{p.title}</h3>
                    <p className="mt-1 text-sm italic text-ink-500">{p.venue}</p>
                  </div>
                  {p.doi ? (
                    <SmartLink
                      to={doiUrl(p.doi)}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink-200 px-3.5 py-1.5 text-sm font-medium text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
                    >
                      DOI
                    </SmartLink>
                  ) : (
                    <span className="shrink-0 text-xs text-ink-400">DOI to be added</span>
                  )}
                </li>
              ))}
              {pageItems.length === 0 && (
                <li className="rounded-2xl border border-dashed border-ink-300 bg-white p-8 text-center text-sm text-ink-500">
                  No publications match your search.
                </li>
              )}
            </ul>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="mt-8 flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={current === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    aria-current={n === current ? 'page' : undefined}
                    className={cn(
                      'inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors',
                      n === current
                        ? 'bg-brand-600 text-white'
                        : 'border border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700',
                    )}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Next page"
                  disabled={current === pageCount}
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            <p className="mt-8 text-sm text-ink-500">
              This is a curated subset. See{' '}
              <SmartLink to={site.social.scholar} className="font-medium text-brand-700 hover:text-brand-800">
                Google Scholar
              </SmartLink>{' '}
              for the complete, up-to-date list.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
