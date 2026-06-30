import { ArrowRight, ArrowUpRight, BadgeCheck, CheckCircle2, Quote, Sparkles } from 'lucide-react'
import { AuroraBackground } from '@/components/fx/AuroraBackground'
import { CardSpotlight } from '@/components/fx/CardSpotlight'
import { Carousel } from '@/components/fx/Carousel'
import { GridBackground } from '@/components/fx/GridBackground'
import { Spotlight } from '@/components/fx/Spotlight'
import { Seo } from '@/components/layout/Seo'
import { CTASection } from '@/components/sections/CTASection'
import { HeroProjectChips } from '@/components/sections/HeroProjectChips'
import { PartnersStrip } from '@/components/sections/PartnersStrip'
import { StatBand } from '@/components/sections/StatBand'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { IconBadge } from '@/components/ui/IconBadge'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SmartLink } from '@/components/ui/SmartLink'
import {
  approach,
  iith,
  newsItems,
  publicationMetrics,
  raft,
  researchAreas,
  snapflood,
  stats,
  ufis,
  varshamitra,
} from '@/content'
import { organizationLd, websiteLd } from '@/lib/seo'

export default function Home() {
  return (
    <>
      <Seo title="RAFT — Rainfall-runoff Analysis Modelling & Forecasting Tools" path="/" jsonLd={[organizationLd(), websiteLd()]} />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden bg-white">
        <AuroraBackground />
        <Spotlight />
        <GridBackground />
        <Container className="grid items-center gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
          <div>
            <Reveal>
              <Badge tone="brand" icon={Sparkles}>
                Hydroinformatics &amp; AI for climate · IIT Hyderabad
              </Badge>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Reading rainfall. Forecasting floods. Building{' '}
                <span className="text-gradient">climate-resilient</span> water futures.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-600">{raft.shortPitch}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink to="/projects" size="lg">
                  Explore our projects
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink to="/research" variant="secondary" size="lg">
                  Our research
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-6 flex items-center gap-2 text-sm text-ink-500">
                <BadgeCheck className="h-4 w-4 text-aqua-500" />
                Supported by DST-SPLICE &amp; the AI CoE for Sustainable Cities
              </p>
            </Reveal>
          </div>

          {/* Hero visual */}
          <Reveal delay={0.15} variants={{ hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
            {/* The whole composition floats very subtly; the two chips cycle through every project */}
            <div className="relative animate-float">
              <div className="relative overflow-hidden rounded-4xl border border-ink-200/70 bg-white shadow-card-hover">
                <img
                  src="/images/iith_campus.jpeg"
                  alt="IIT Hyderabad campus"
                  className="aspect-[4/3] w-full object-cover"
                  loading="eager"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <div className="glass flex items-center gap-2.5 rounded-xl py-2 pl-2.5 pr-3.5">
                    <img
                      src={iith.logo}
                      alt="IIT Hyderabad logo"
                      className="h-9 w-9 shrink-0 object-contain"
                      width={36}
                      height={36}
                    />
                    <div className="leading-tight">
                      <p className="text-2xs font-semibold uppercase tracking-wider text-brand-700">Hosted at</p>
                      <p className="text-sm font-semibold text-ink-900">IIT Hyderabad</p>
                    </div>
                  </div>
                </div>
              </div>
              <HeroProjectChips />
            </div>
          </Reveal>
        </Container>

        <Container className="pb-16">
          <StatBand stats={stats} />
        </Container>
      </section>

      {/* --------------------------------------------------------- Supported by */}
      <Section bg="muted" spacing="tight">
        <SectionHeading
          align="center"
          kicker="Funding & partners"
          title="Backed by national science & innovation programmes"
          description="RAFT’s work is enabled by Government of India science, technology and education initiatives."
        />
        <div className="mt-12">
          <PartnersStrip showCollaborators />
        </div>
      </Section>

      {/* -------------------------------------------------------- Research areas */}
      <Section bg="grid">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Research areas"
            title="Where hydrology meets data science"
            description="Seven domains where RAFT advances the science and practice of flood resilience."
            className="max-w-2xl"
          />
          <Reveal>
            <ButtonLink to="/research" variant="subtle">
              All research areas
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
        {/* One-row autoplay slider — compact, indicative; full detail lives on /research */}
        <div className="mt-12">
          <Carousel
            autoplay
            loop
            slidesPerView={1.15}
            breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.4 } }}
            fallbackClassName="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            slides={researchAreas.map((area) => (
              <SmartLink key={area.slug} to="/research" className="group block">
                <div className="overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-soft transition-shadow hover:shadow-card">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 via-aqua-50 to-brand-50">
                    {area.image && (
                      <img
                        src={area.image}
                        alt={area.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
                    <div className="absolute left-3 top-3">
                      <IconBadge icon={area.icon} tone={area.accent ?? 'brand'} size="sm" className="bg-white shadow-soft ring-white/60" />
                    </div>
                    <h3 className="absolute inset-x-3 bottom-3 flex items-center gap-1 text-sm font-semibold text-white">
                      {area.title}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:translate-x-0.5" />
                    </h3>
                  </div>
                </div>
              </SmartLink>
            ))}
          />
        </div>
      </Section>

      {/* ------------------------------------------------------------ UFIS band (flagship) */}
      <section className="relative isolate overflow-hidden bg-ink-950 text-ink-100">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <div className="absolute -left-[10%] top-[-20%] h-[30rem] w-[30rem] rounded-full bg-brand-700/25 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-20%] h-[26rem] w-[26rem] rounded-full bg-aqua-700/20 blur-3xl" />
        </div>
        <Container className="grid gap-12 py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="kicker text-aqua-300">
              <span aria-hidden className="h-px w-6 bg-aqua-400" />
              Flagship effort
            </span>
            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
              UFIS — the Urban Flood Information System
            </h2>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-ink-300">{ufis.focus}</p>
            <blockquote className="mt-6 flex gap-3 border-l-2 border-aqua-400/60 pl-5 text-ink-200">
              <Quote className="h-5 w-5 shrink-0 text-aqua-400" />
              <p className="italic">“{ufis.goalVerbatim}”</p>
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/about#vision" variant="primary">
                The UFIS vision
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink to="/projects" className="bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/20">
                See the projects
              </ButtonLink>
            </div>
          </div>
          <Stagger className="grid gap-3">
            {ufis.howBuilt.map((step, i) => (
              <StaggerItem
                key={step}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <span className="font-display text-lg font-bold text-aqua-300">0{i + 1}</span>
                <p className="text-sm leading-relaxed text-ink-200">{step}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ----------------------------------------------------------- Our approach */}
      <Section>
        <SectionHeading
          kicker="Our approach"
          title="From a raindrop to a decision"
          description={raft.whatWeDoVerbatim}
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((a, i) => (
            <StaggerItem key={a.title}>
              <CardSpotlight className="h-full p-6">
                <IconBadge icon={a.icon} tone={i % 2 === 0 ? 'brand' : 'aqua'} />
                <p className="mt-4 text-2xs font-semibold text-ink-400">0{i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-ink-900">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{a.description}</p>
              </CardSpotlight>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* -------------------------------------------------------------- Products */}
      <Section>
        <SectionHeading
          kicker="Products"
          title="Research, translated into tools people use"
          description="From a deployed citizen-science app to systems still taking shape — our portfolio turns science into impact."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* SnapFlood — flagship card; more content, so it runs taller down the left */}
          <Reveal className="lg:row-span-2">
            <CardSpotlight className="flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-start gap-3.5">
                {snapflood.logo ? (
                  <img
                    src={snapflood.logo}
                    alt="SnapFlood logo"
                    className="h-12 w-12 shrink-0 rounded-xl object-cover shadow-soft ring-1 ring-ink-200/60"
                  />
                ) : (
                  <IconBadge icon={snapflood.icon} tone="brand" size="md" className="shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-ink-900">{snapflood.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-brand-700">{snapflood.tagline}</p>
                </div>
                <span className="shrink-0">
                  <Badge tone="success" icon={CheckCircle2}>
                    {snapflood.status.label}
                  </Badge>
                </span>
              </div>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-600">{snapflood.summary}</p>
              {/* Feature chips — each with its own icon; they stretch to fill the card height evenly */}
              <ul className="mt-5 grid flex-1 gap-3 sm:grid-cols-2 [grid-auto-rows:minmax(min-content,1fr)]">
                {snapflood.features?.slice(0, 4).map((f) => (
                  <li
                    key={f.title}
                    className="flex items-center gap-3 rounded-xl border border-ink-200/70 bg-ink-50/40 px-3.5 py-3"
                  >
                    <IconBadge icon={f.icon} tone="brand" size="sm" />
                    <span className="text-sm font-medium text-ink-800">{f.title}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-5">
                <ButtonLink to="/products/snapflood" variant="secondary">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </CardSpotlight>
          </Reveal>

          {/* VarshaAnalytics — right column, top */}
          <Reveal>
            <CardSpotlight className="flex h-full flex-col p-6">
              <div className="flex items-start gap-3.5">
                <IconBadge icon={varshamitra.icon} tone="aqua" size="md" className="shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-ink-900">{varshamitra.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-aqua-700">{varshamitra.tagline}</p>
                </div>
                <span className="shrink-0">
                  <Badge tone="success" icon={CheckCircle2}>
                    {varshamitra.status.label}
                  </Badge>
                </span>
              </div>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-600">{varshamitra.summary}</p>
              <div className="mt-auto pt-5">
                <ButtonLink to="/products/varshamitra" variant="secondary">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </CardSpotlight>
          </Reveal>

          {/* More on the roadmap — right column, bottom */}
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-dashed border-ink-300 bg-ink-50/50 p-6">
              <p className="text-sm font-semibold text-ink-700">More on the roadmap</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                A public UFIS dashboard, flood early-warning service and rainfall nowcast API are in our sights.
              </p>
              <SmartLink
                to="/products"
                className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-brand-700 hover:text-brand-800"
              >
                See all products <ArrowRight className="h-3.5 w-3.5" />
              </SmartLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------------------- Research output band */}
      <Section bg="muted">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <SectionHeading
            kicker="Research output"
            title="A decade-plus of peer-reviewed hydrology"
            description="From operational forecasting at NOAA to flood inundation across Indian river basins — RAFT’s science is published and cited worldwide."
          />
          <Reveal>
            <div className="grid grid-cols-3 gap-4">
              {[
                { v: publicationMetrics.citations, s: '+', l: 'Citations' },
                { v: publicationMetrics.hIndex, s: '', l: 'h-index' },
                { v: publicationMetrics.i10Index, s: '', l: 'i10-index' },
              ].map((m) => (
                <div key={m.l} className="rounded-2xl border border-ink-200/70 bg-white p-5 text-center shadow-soft">
                  <p className="font-display text-3xl font-bold text-ink-900">
                    {m.v.toLocaleString()}
                    {m.s}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">{m.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <ButtonLink to="/publications" variant="subtle">
                Browse publications
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- News */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="News & media" title="Latest from RAFT" className="max-w-2xl" />
          <Reveal>
            <ButtonLink to="/news" variant="subtle">
              All news <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-12">
          <Carousel
            autoplay
            loop
            slidesPerView={1.1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            fallbackClassName="grid gap-5 md:grid-cols-3"
            slides={newsItems
              .filter((n) => !n.placeholder)
              .map((n) => (
                <SmartLink key={n.title} to={n.href ?? '/news'} className="group block h-full">
                  <div className="flex h-56 flex-col rounded-2xl border border-ink-200/70 bg-white p-6 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-card">
                    <div className="flex items-center gap-2 text-xs text-ink-500">
                      <Badge tone="neutral">{n.source}</Badge>
                      <span>{n.date}</span>
                    </div>
                    <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
                      {n.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-600">{n.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                      Read more <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </SmartLink>
              ))}
          />
        </div>
      </Section>

      <CTASection
        kicker="Work with us"
        title="Let’s build flood-resilient cities and communities"
        description="Collaborate on research, pilot UFIS in your region, or support the next product from research to deployment."
        primary={{ label: 'Get in touch', to: '/contact' }}
        secondary={{ label: 'Get involved', to: '/get-involved' }}
      />
    </>
  )
}
