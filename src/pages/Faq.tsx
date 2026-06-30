import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Seo } from '@/components/layout/Seo'
import { CTASection } from '@/components/sections/CTASection'
import { FAQList } from '@/components/sections/FAQList'
import { PageHeader } from '@/components/sections/PageHeader'
import { Section } from '@/components/ui/Section'
import { SmartLink } from '@/components/ui/SmartLink'
import { faqGroups } from '@/content'
import { breadcrumbLd } from '@/lib/seo'

export default function Faq() {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const groups = useMemo(() => {
    if (!q) return faqGroups
    return faqGroups
      .map((g) => ({
        ...g,
        faqs: g.faqs.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)),
      }))
      .filter((g) => g.faqs.length > 0)
  }, [q])

  const total = groups.reduce((n, g) => n + g.faqs.length, 0)

  return (
    <>
      <Seo
        title="FAQ"
        description="Frequently asked questions about RAFT — collaboration, students, support, products and data — grouped by topic and searchable."
        path="/faq"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
        kicker="Engage"
        title="Frequently asked questions"
        description="Answers about collaborating, joining, supporting our work and using our products — grouped by topic and searchable."
      />

      <Section>
        {/* Search */}
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              aria-label="Search FAQs"
              className="w-full rounded-full border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm text-ink-800 shadow-soft transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
          </div>
          {q && (
            <p className="mt-3 text-center text-sm text-ink-500">
              {total} {total === 1 ? 'result' : 'results'} for “{query.trim()}”
            </p>
          )}
        </div>

        {/* Grouped FAQs */}
        <div className="mx-auto mt-12 max-w-3xl space-y-12">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="mb-4 flex items-baseline gap-2 text-lg font-semibold text-ink-900">
                {g.title}
                <span className="text-xs font-medium text-ink-400">
                  {g.faqs.length} {g.faqs.length === 1 ? 'question' : 'questions'}
                </span>
              </h2>
              <FAQList items={g.faqs} open={!!q} />
            </div>
          ))}

          {groups.length === 0 && (
            <div className="rounded-2xl border border-dashed border-ink-300 bg-white p-10 text-center">
              <p className="text-sm text-ink-500">
                No questions match “{query.trim()}”. Try a different term, or{' '}
                <SmartLink to="/contact" className="font-medium text-brand-700 hover:text-brand-800">
                  contact us
                </SmartLink>
                .
              </p>
            </div>
          )}
        </div>
      </Section>

      <CTASection
        title="Still have a question?"
        description="If your question isn’t answered here, get in touch — we’re happy to help."
        primary={{ label: 'Contact the team', to: '/contact' }}
        secondary={{ label: 'Get involved', to: '/get-involved' }}
      />
    </>
  )
}
