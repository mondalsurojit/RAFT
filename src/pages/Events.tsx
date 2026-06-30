import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Seo } from '@/components/layout/Seo'
import { PageHeader } from '@/components/sections/PageHeader'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { events } from '@/content'
import type { EventItem } from '@/content/types'
import { cn } from '@/lib/cn'
import { breadcrumbLd } from '@/lib/seo'

function EventRow({ e }: { e: EventItem }) {
  return (
    <StaggerItem className="flex gap-5 rounded-2xl border border-ink-200/70 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-brand-50 px-4 py-3 text-center">
        <CalendarDays className="h-5 w-5 text-brand-600" />
        <span className="mt-1.5 text-2xs font-semibold uppercase tracking-wide text-brand-700">{e.kind}</span>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {e.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {e.location}
          </span>
        </div>
        <h3 className="mt-1.5 text-lg font-semibold text-ink-900">{e.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{e.description}</p>
      </div>
    </StaggerItem>
  )
}

const tabs = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past' },
] as const

export default function Events() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')
  const list = events.filter((e) => e.status === tab)

  return (
    <>
      <Seo
        title="Events"
        description="Workshops, seminars, community data drives and conference activities from RAFT, IIT Hyderabad."
        path="/events"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Events', path: '/events' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Events' }]}
        kicker="Events"
        title="Workshops, talks & field activities"
        description="Where RAFT shares research, trains practitioners and engages communities on flood resilience."
      />

      <Section>
        {/* Toggle */}
        <div className="inline-flex rounded-full border border-ink-200 bg-ink-50 p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-pressed={tab === t.key}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-colors',
                tab === t.key ? 'bg-white text-brand-700 shadow-soft' : 'text-ink-500 hover:text-ink-700',
              )}
            >
              {t.label} highlights
            </button>
          ))}
        </div>

        <Stagger key={tab} className="mt-8 grid gap-4">
          {list.length > 0 ? (
            list.map((e) => <EventRow key={e.title} e={e} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-ink-300 bg-white p-10 text-center text-sm text-ink-500">
              No {tab} highlights to show right now.
            </div>
          )}
        </Stagger>
      </Section>
    </>
  )
}
