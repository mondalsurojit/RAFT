import { ArrowRight, ArrowUpRight, Workflow } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ImageSlider } from '@/components/fx/ImageSlider'
import { Seo } from '@/components/layout/Seo'
import { FilterAside, type FilterStatus } from '@/components/sections/FilterAside'
import { PageHeader } from '@/components/sections/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { IconBadge } from '@/components/ui/IconBadge'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SmartLink } from '@/components/ui/SmartLink'
import { StoreBadges } from '@/components/ui/StoreBadges'
import type { Product } from '@/content'
import { products, roadmapProducts } from '@/content'
import { breadcrumbLd } from '@/lib/seo'

const statusTone = {
  deployed: 'success',
  development: 'signal',
  concept: 'neutral',
  planned: 'aqua',
} as const

const statusColor: Record<string, string> = {
  All: '#94a6bd',
  Deployed: '#1fa496',
  'In development': '#f5890b',
  Planned: '#43c0b0',
  Concept: '#94a6bd',
}

const allProducts = [...products, ...roadmapProducts]
const statusLabels = ['All', ...Array.from(new Set(allProducts.map((p) => p.status.label)))]
const productStatusList: FilterStatus[] = statusLabels.map((s) => ({
  label: s,
  color: statusColor[s] ?? '#94a6bd',
  count: s === 'All' ? allProducts.length : allProducts.filter((p) => p.status.label === s).length,
}))
const productSorts = [
  { label: 'Readiness: high → low', value: 'high' },
  { label: 'Readiness: low → high', value: 'low' },
]

function TrlMeter({ trl }: { trl: number }) {
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold uppercase tracking-wide text-ink-500">Technology readiness</span>
        <span className="font-semibold text-brand-700">TRL {trl}/9</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
        <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${(trl / 9) * 100}%` }} />
      </div>
    </div>
  )
}

/**
 * Featured product card — horizontal layout (image on the left, full content on the
 * right) so it stays sleek and compact in height without dropping any content. Spans
 * the full row.
 */
function FeaturedProduct({ p }: { p: Product }) {
  return (
    <StaggerItem className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-card sm:col-span-2 sm:flex-row">
      {p.images && p.images.length > 0 && (
        <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[38%] sm:max-w-[320px]">
          <div className="absolute inset-0">
            <ImageSlider
              images={p.images.map((src) => ({ src, alt: `${p.name} — flood imagery` }))}
              className="h-full w-full"
            />
          </div>
          <div className="pointer-events-none absolute right-3 top-3 z-10">
            <Badge tone={statusTone[p.status.tone]}>{p.status.label}</Badge>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          {p.logo ? (
            <img
              src={p.logo}
              alt={`${p.name} logo`}
              className="h-11 w-11 shrink-0 rounded-xl object-cover shadow-soft ring-1 ring-ink-200/60"
            />
          ) : (
            <IconBadge icon={p.icon} tone={p.accent} />
          )}
          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-tight text-ink-900">{p.name}</h2>
            <p className="text-sm font-medium text-brand-700">{p.tagline}</p>
          </div>
        </div>
        <p className="mt-3 max-w-prose text-pretty text-sm leading-relaxed text-ink-600">{p.summary}</p>

        {typeof p.trl === 'number' && <TrlMeter trl={p.trl} />}

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-4">
          <StoreBadges p={p} />
          <ButtonLink to={`/products/${p.slug}`} size="sm" className="ml-auto">
            Explore {p.name}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </StaggerItem>
  )
}

/** Simple card for roadmap / conceptual products. */
function RoadmapCard({ p }: { p: Product }) {
  return (
    <StaggerItem className="flex h-full flex-col rounded-2xl border border-dashed border-ink-300 bg-white/70 p-5">
      <div className="flex items-center justify-between">
        <IconBadge icon={p.icon} tone={p.accent} />
        <Badge tone="outline">{p.status.label}</Badge>
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink-900">{p.name}</h3>
      <p className="mt-1 text-sm font-medium text-ink-500">{p.tagline}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.summary}</p>
    </StaggerItem>
  )
}

export default function Products() {
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState('high')
  const list = useMemo(() => {
    const filtered = status === 'All' ? allProducts : allProducts.filter((p) => p.status.label === status)
    return [...filtered].sort((a, b) => {
      const at = a.trl ?? 0
      const bt = b.trl ?? 0
      return sort === 'high' ? bt - at : at - bt
    })
  }, [status, sort])

  return (
    <>
      <Seo
        title="Products"
        description="RAFT’s research-to-product portfolio — SnapFlood, VarshaAnalytics, and a roadmap of flood-resilience tools."
        path="/products"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
        kicker="Products"
        title="Research, translated into tools people use"
        description="We turn flood science into products — from a deployed citizen-science app to systems still taking shape — so insight reaches the people who need it."
      />

      {/* Filter aside (left) + product grid */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <FilterAside
            status={status}
            onStatus={setStatus}
            statuses={productStatusList}
            sort={sort}
            onSort={setSort}
            sorts={productSorts}
            resultText={`${list.length} ${list.length === 1 ? 'product' : 'products'}${status !== 'All' ? ` · ${status}` : ''}`}
          />

          <Stagger key={`${status}-${sort}`} className="grid gap-6 sm:grid-cols-2">
            {list.map((p) =>
              p.images && p.images.length > 0 ? (
                <FeaturedProduct key={p.slug} p={p} />
              ) : (
                <RoadmapCard key={p.slug} p={p} />
              ),
            )}
            {list.length === 0 && (
              <p className="rounded-2xl border border-dashed border-ink-300 bg-white p-8 text-center text-sm text-ink-500 sm:col-span-2">
                No products with this status yet.
              </p>
            )}
          </Stagger>
        </div>

        {/* Research → readiness — integrated below the grid, not a separate band */}
        <Reveal>
          <div className="mt-12 flex flex-col items-start gap-6 rounded-3xl border border-ink-200/70 bg-ink-50/80 p-8 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <IconBadge icon={Workflow} tone="brand" size="lg" />
              <div>
                <h3 className="text-xl font-bold text-ink-900">From research to readiness</h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-600">
                  Every product starts as research. See how our projects climb the Technology Readiness Levels from
                  concept to deployment.
                </p>
              </div>
            </div>
            <SmartLink
              to="/projects"
              className="inline-flex shrink-0 items-center gap-1.5 font-medium text-brand-700 hover:text-brand-800"
            >
              View projects &amp; TRL <ArrowUpRight className="h-4 w-4" />
            </SmartLink>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
