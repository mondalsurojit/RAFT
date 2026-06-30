import { ArrowRight, BookOpen, MapPin, Wrench } from 'lucide-react'
import { useState } from 'react'
import { CardSpotlight } from '@/components/fx/CardSpotlight'
import { Seo } from '@/components/layout/Seo'
import { CTASection } from '@/components/sections/CTASection'
import { PageHeader } from '@/components/sections/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { IconBadge } from '@/components/ui/IconBadge'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { capabilities, researchAreas, researchTools, studyRegions } from '@/content'
import type { ResearchArea } from '@/content'
import { breadcrumbLd } from '@/lib/seo'

function ResearchCard({ area }: { area: ResearchArea }) {
  const [errored, setErrored] = useState(false)
  return (
    <StaggerItem className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-card">
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 via-aqua-50 to-brand-50">
          {area.image && !errored && (
            <img
              src={area.image}
              alt={area.title}
              loading="lazy"
              onError={() => setErrored(true)}
              className="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
          <div className="absolute left-4 top-4">
            <IconBadge icon={area.icon} tone={area.accent ?? 'brand'} className="bg-white shadow-soft ring-white/60" />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold text-ink-900">{area.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{area.summary}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {area.keywords.map((k) => (
              <span key={k} className="rounded-full bg-ink-100 px-2.5 py-1 text-2xs font-medium text-ink-600">
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </StaggerItem>
  )
}

export default function Research() {
  return (
    <>
      <Seo
        title="Research Areas"
        description="Hydroinformatics, rainfall-runoff modelling, urban flood forecasting, hydrodynamics, remote sensing, AI for climate and decision-support — the domains where RAFT works."
        path="/research"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Research Areas', path: '/research' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Research Areas' }]}
        kicker="Research"
        title="Where hydrology meets data science"
        description="RAFT advances the science and practice of flood resilience across seven connected domains — from catchment hydrology to AI-driven forecasting and risk communication."
      />

      {/* Research areas */}
      <Section>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((area) => (
            <ResearchCard key={area.slug} area={area} />
          ))}
        </Stagger>
      </Section>

      {/* Capabilities */}
      <Section bg="muted">
        <SectionHeading
          kicker="In practice"
          title="What RAFT actually builds"
          description="Corroborated, lab-specific capabilities — the methods and systems behind our research."
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <StaggerItem key={c.title} className="flex gap-4 rounded-2xl border border-ink-200/70 bg-white p-5 shadow-soft">
              <IconBadge icon={c.icon} tone="aqua" />
              <div>
                <h3 className="text-base font-semibold text-ink-900">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{c.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Study regions + tools */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-600" />
              <h2 className="text-2xl font-bold text-ink-900">Study regions</h2>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600">
              River basins and urban areas in RAFT’s active study scope.
            </p>
            <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
              {studyRegions.map((r) => (
                <StaggerItem
                  key={r.name}
                  className="flex items-center justify-between rounded-xl border border-ink-200/70 bg-white px-4 py-3 shadow-soft"
                >
                  <span className="text-sm font-medium text-ink-800">{r.name}</span>
                  <Badge tone={r.kind === 'Urban' ? 'signal' : 'aqua'}>{r.kind}</Badge>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-brand-600" />
              <h2 className="text-2xl font-bold text-ink-900">Tools & methods</h2>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600">
              The modelling, geospatial and machine-learning stack we work with.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {researchTools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-ink-200 bg-ink-50 px-4 py-2 text-sm font-medium text-ink-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Links to projects / publications */}
      <Section bg="grid" spacing="tight">
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <CardSpotlight className="flex h-full flex-col p-8">
              <IconBadge icon={MapPin} tone="brand" size="lg" />
              <h3 className="mt-5 text-xl font-bold text-ink-900">Projects & TRL</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                See our initiatives mapped to technology readiness — from concept to deployed.
              </p>
              <ButtonLink to="/projects" variant="subtle" size="sm" className="mt-5 w-fit">
                View projects <ArrowRight className="h-3.5 w-3.5" />
              </ButtonLink>
            </CardSpotlight>
          </Reveal>
          <Reveal delay={0.06}>
            <CardSpotlight className="flex h-full flex-col p-8">
              <IconBadge icon={BookOpen} tone="aqua" size="lg" />
              <h3 className="mt-5 text-xl font-bold text-ink-900">Publications</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Explore peer-reviewed research across hydrology, forecasting and climate.
              </p>
              <ButtonLink to="/publications" variant="subtle" size="sm" className="mt-5 w-fit">
                Browse publications <ArrowRight className="h-3.5 w-3.5" />
              </ButtonLink>
            </CardSpotlight>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Have a research challenge in flood or water?"
        description="We collaborate across institutions, agencies and industry. Let’s talk."
        primary={{ label: 'Get involved', to: '/get-involved' }}
        secondary={{ label: 'Contact the team', to: '/contact' }}
      />
    </>
  )
}
