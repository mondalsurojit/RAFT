import { ExternalLink, Info, MapPin } from 'lucide-react'
import { useMemo, useState } from 'react'
import { TRLChart } from '@/components/charts'
import { Seo } from '@/components/layout/Seo'
import { CTASection } from '@/components/sections/CTASection'
import { FilterAside, type FilterStatus } from '@/components/sections/FilterAside'
import { PageHeader } from '@/components/sections/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SmartLink } from '@/components/ui/SmartLink'
import { projects, trlScale } from '@/content'
import type { Project } from '@/content/types'
import { breadcrumbLd } from '@/lib/seo'

const statusTone: Record<string, 'success' | 'signal' | 'aqua' | 'neutral'> = {
  Deployed: 'success',
  'In development': 'signal',
  'Active research': 'aqua',
  Concept: 'neutral',
}

const statusColor: Record<string, string> = {
  All: '#94a6bd',
  Deployed: '#1fa496',
  'In development': '#f5890b',
  'Active research': '#1888ec',
  Concept: '#94a6bd',
}

const projectStatuses = ['All', ...Array.from(new Set(projects.map((p) => p.status)))]
const projectStatusList: FilterStatus[] = projectStatuses.map((s) => ({
  label: s,
  color: statusColor[s] ?? '#94a6bd',
  count: s === 'All' ? projects.length : projects.filter((p) => p.status === s).length,
}))
const projectSorts = [
  { label: 'Maturity: high → low', value: 'high' },
  { label: 'Maturity: low → high', value: 'low' },
]

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-ink-200/70 bg-white p-5 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-start justify-between gap-3">
        {/* Small indicative image (falls back to an icon tile) */}
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-ink-200/70 bg-gradient-to-br from-brand-100 via-aqua-50 to-brand-50">
          {p.image ? (
            <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center">
              <p.icon className="h-5 w-5 text-brand-600" />
            </span>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Badge tone={statusTone[p.status] ?? 'neutral'}>{p.status}</Badge>
          {p.placeholder && <Badge tone="outline">Indicative</Badge>}
        </div>
      </div>

      <p className="mt-4 text-2xs font-semibold uppercase tracking-wider text-ink-400">{p.category}</p>
      <h3 className="mt-1 text-lg font-semibold text-ink-900">{p.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{p.summary}</p>

      {/* TRL meter */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-ink-500">Technology Readiness</span>
          <span className="font-semibold text-brand-700">TRL {p.trl} / 9</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
          <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${(p.trl / 9) * 100}%` }} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {p.region && (
          <span className="inline-flex items-center gap-1 text-xs text-ink-500">
            <MapPin className="h-3.5 w-3.5" />
            {p.region}
          </span>
        )}
        {p.tags.map((t) => (
          <span key={t} className="rounded-full bg-ink-100 px-2.5 py-0.5 text-2xs font-medium text-ink-600">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState('high')
  const [showTrlInfo, setShowTrlInfo] = useState(false)
  const list = useMemo(() => {
    const filtered = status === 'All' ? projects : projects.filter((p) => p.status === status)
    return [...filtered].sort((a, b) => (sort === 'high' ? b.trl - a.trl : a.trl - b.trl))
  }, [status, sort])

  return (
    <>
      <Seo
        title="Projects"
        description="RAFT projects mapped to Technology Readiness Levels — from deployed citizen-science apps to forecasting systems in active research."
        path="/projects"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
        kicker="Projects · TRL"
        title="From concept to deployment"
        description="Our initiatives span the innovation pipeline. Each is mapped to a Technology Readiness Level (TRL 1–9) so you can see exactly how mature it is."
      />

      {/* TRL chart + definition — equal height, compact */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-ink-200/70 bg-white p-6 shadow-card">
              <h2 className="mb-3 text-lg font-semibold text-ink-900">Project maturity at a glance</h2>
              <div className="flex-1">
                <TRLChart height={300} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-ink-200/70 bg-white p-6 shadow-card">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-ink-900">What TRL means</h2>
                <div className="relative">
                  <button
                    type="button"
                    aria-label="About Technology Readiness Levels"
                    aria-expanded={showTrlInfo}
                    onClick={() => setShowTrlInfo((v) => !v)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-100 hover:text-brand-600"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                  {showTrlInfo && (
                    <div
                      role="tooltip"
                      className="absolute left-0 top-full z-20 mt-2 w-72 rounded-xl border border-ink-200 bg-white p-3 text-xs leading-relaxed text-ink-600 shadow-card-hover"
                    >
                      <strong className="text-ink-800">Technology Readiness Level (TRL)</strong> is a 1–9 scale for how
                      mature a technology is — from a basic concept (1) to a system proven in real operation (9).
                      <SmartLink
                        to="https://en.wikipedia.org/wiki/Technology_readiness_level"
                        className="mt-1.5 inline-flex items-center gap-1 font-medium text-brand-700 hover:text-brand-800"
                      >
                        Read more <ExternalLink className="h-3 w-3" />
                      </SmartLink>
                    </div>
                  )}
                </div>
              </div>
              <ol className="mt-4 flex flex-1 flex-col justify-between text-sm">
                {trlScale.map((s) => (
                  <li key={s.level} className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-2xs font-bold text-brand-700">
                      {s.level}
                    </span>
                    <span className="text-ink-600">{s.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Filter aside (left) + project cards */}
      <Section bg="muted">
        <SectionHeading kicker="Portfolio" title="All projects" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[220px_1fr]">
          <FilterAside
            status={status}
            onStatus={setStatus}
            statuses={projectStatusList}
            sort={sort}
            onSort={setSort}
            sorts={projectSorts}
            resultText={`${list.length} ${list.length === 1 ? 'project' : 'projects'}${status !== 'All' ? ` · ${status}` : ''}`}
          />

          <Stagger key={`${status}-${sort}`} className="grid gap-5 sm:grid-cols-2">
            {list.map((p) => (
              <StaggerItem key={p.slug}>
                <ProjectCard p={p} />
              </StaggerItem>
            ))}
            {list.length === 0 && (
              <p className="rounded-2xl border border-dashed border-ink-300 bg-white p-8 text-center text-sm text-ink-500 sm:col-span-2">
                No projects with this status yet.
              </p>
            )}
          </Stagger>
        </div>
      </Section>

      <CTASection
        title="Want to advance a project with us?"
        description="Co-fund a pilot, contribute data or compute, or partner to raise a project’s readiness."
        primary={{ label: 'Get involved', to: '/get-involved' }}
        secondary={{ label: 'Contact us', to: '/contact' }}
      />
    </>
  )
}
