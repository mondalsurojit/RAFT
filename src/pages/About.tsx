import { ArrowRight, Compass, Quote, Target } from 'lucide-react'
import { useState } from 'react'
import { ImageSlider } from '@/components/fx/ImageSlider'
import { UfisDiagram } from '@/components/fx/UfisDiagram'
import { Seo } from '@/components/layout/Seo'
import { PageHeader } from '@/components/sections/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { IconBadge } from '@/components/ui/IconBadge'
import { Portrait } from '@/components/ui/Portrait'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SmartLink } from '@/components/ui/SmartLink'
import { approach, iith, lead, raft, snapflood, timeline, ufis, varshamitra } from '@/content'
import type { TimelineItem } from '@/content/types'
import { breadcrumbLd } from '@/lib/seo'

/** Small milestone thumbnail — image when supplied, else a branded year tile. */
function MilestoneThumb({ item }: { item: TimelineItem }) {
  const [errored, setErrored] = useState(false)
  return (
    <div className="hidden h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-ink-200/70 bg-gradient-to-br from-brand-100 via-aqua-50 to-brand-50 sm:block">
      {item.image && !errored ? (
        <img
          src={item.image}
          alt={item.title}
          onError={() => setErrored(true)}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-display text-base font-bold text-brand-600">{item.year}</span>
        </div>
      )}
    </div>
  )
}

const groupPhotos = [
  { src: '/images/team/group-1.jpeg', alt: 'The RAFT research group' },
  { src: '/images/team/group-2.png', alt: 'The RAFT team at IIT Hyderabad' },
]

export default function About() {
  const milestones = [...timeline].reverse()

  return (
    <>
      <Seo
        title="About RAFT"
        description={raft.shortPitch}
        path="/about"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'About RAFT', path: '/about' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About RAFT' }]}
        kicker="About RAFT"
        title="A research group on a mission to make water predictable"
        description={raft.shortPitch}
      />

      {/* Story + team photo slider — equal columns */}
      <Section>
        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col justify-center">
            <SectionHeading
              kicker="Who we are"
              title="Rainfall, runoff and resilience"
              description={`${raft.longName} — RAFT — is a hydroinformatics group and innovation lab in the Department of Civil Engineering at ${iith.short}.`}
            />
            <div className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-ink-700">
              <p>{raft.whatWeDoVerbatim}</p>
              <p>
                Our goal is simple to state and hard to achieve: give scientists, engineers, policymakers and citizens a
                shared, trustworthy picture of flood risk — and the tools to act on it.
              </p>
            </div>
            <ButtonLink to="/team" variant="subtle" size="sm" className="mt-7 w-fit">
              Meet the team
              <ArrowRight className="h-3.5 w-3.5" />
            </ButtonLink>
          </div>

          {/* Team group-photo slider */}
          <Reveal className="h-full min-w-0">
            <figure className="flex h-full min-w-0 min-h-[20rem] flex-col overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-card">
              <ImageSlider images={groupPhotos} className="w-full min-h-[18rem] flex-1" />
              <figcaption className="border-t border-ink-100 p-4 text-center text-sm text-ink-500">
                The RAFT group — researchers, students and mentors.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Quote — below, attributed to Dr. Regonda */}
        <Reveal>
          <blockquote className="mt-10 flex flex-col gap-5 rounded-3xl border border-brand-100 bg-brand-50/50 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
            <Quote className="h-8 w-8 shrink-0 text-brand-300" />
            <p className="flex-1 text-pretty text-xl font-medium italic leading-snug text-ink-800">
              “{raft.taglineVerbatim}”
            </p>
            <div className="flex shrink-0 items-center gap-3 border-ink-200 sm:border-l sm:pl-6">
              <Portrait
                name={lead.name}
                image={lead.image}
                className="h-12 w-12 shrink-0"
                rounded="rounded-full"
                imgClassName="object-top"
              />
              <div>
                <p className="text-sm font-semibold text-ink-900">{lead.name}</p>
                <p className="text-xs text-ink-500">Group Lead</p>
              </div>
            </div>
          </blockquote>
        </Reveal>
      </Section>

      {/* Vision & Mission */}
      <Section id="vision" bg="muted">
        <SectionHeading
          kicker="Purpose"
          title="Vision & mission"
          description="The direction we’re heading, and the work that gets us there."
          align="center"
        />
        <Reveal>
          <div className="mt-12 overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-card">
            <div className="grid lg:grid-cols-2">
              {/* Vision */}
              <div className="relative isolate flex flex-col p-8 sm:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-brand-50/80 to-transparent"
                />
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-2xs font-semibold uppercase tracking-[0.16em] text-brand-700 ring-1 ring-inset ring-brand-100">
                  <Compass className="h-3.5 w-3.5" />
                  Our Vision
                </div>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-800">{raft.vision}</p>
              </div>

              {/* Mission */}
              <div className="relative isolate flex flex-col border-t border-ink-200/70 bg-aqua-50/30 p-8 sm:p-10 lg:border-l lg:border-t-0">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-aqua-50/80 to-transparent"
                />
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-aqua-50 px-3 py-1 text-2xs font-semibold uppercase tracking-[0.16em] text-aqua-700 ring-1 ring-inset ring-aqua-100">
                  <Target className="h-3.5 w-3.5" />
                  Our Mission
                </div>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-800">{raft.mission}</p>
              </div>
            </div>

            {/* Shared footer — how we get there */}
            <div className="border-t border-ink-200/70 bg-ink-50/60 px-8 py-6 sm:px-10">
              <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-ink-400">How we get there</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {approach.map((a) => (
                  <span
                    key={a.title}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink-700 ring-1 ring-inset ring-ink-200"
                  >
                    {a.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* UFIS deep dive */}
      <section className="relative isolate overflow-hidden bg-ink-950 py-24 text-ink-100">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <div className="absolute -left-[10%] top-[-20%] h-[30rem] w-[30rem] rounded-full bg-brand-700/25 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-10%] h-[26rem] w-[26rem] rounded-full bg-aqua-700/20 blur-3xl" />
        </div>
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="kicker text-aqua-300">
              <span aria-hidden className="h-px w-6 bg-aqua-400" />
              The vision in action
            </span>
            <Badge tone="aqua">{ufis.acronym}</Badge>
          </div>
          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">{ufis.expansion}</h2>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-ink-300">{ufis.focus}</p>
          <blockquote className="mt-8 flex gap-3 border-l-2 border-aqua-400/60 pl-5">
            <Quote className="h-5 w-5 shrink-0 text-aqua-400" />
            <p className="text-lg italic text-ink-100">“{ufis.goalVerbatim}”</p>
          </blockquote>

          {/* Animated data-flow diagram */}
          <Reveal>
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-7">
              <p className="mb-4 text-2xs font-semibold uppercase tracking-[0.16em] text-aqua-300">
                How the system flows
              </p>
              <UfisDiagram />
            </div>
          </Reveal>

          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
            {ufis.howBuilt.map((step, i) => (
              <StaggerItem key={step} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="font-display text-lg font-bold text-aqua-300">0{i + 1}</span>
                <p className="text-sm leading-relaxed text-ink-200">{step}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-ink-300">
              <span className="font-semibold text-white">Where it stands: </span>
              {ufis.maturity}
            </p>

            {/* Live products + link to all — within the same panel. On mobile the label
                sits on its own line with both products kept together in the row below it. */}
            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:flex-wrap sm:items-center">
              <span className="text-2xs font-semibold uppercase tracking-[0.16em] text-aqua-300">Live now</span>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <SmartLink
                  to="/products/snapflood"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-3.5 text-sm font-medium text-ink-100 transition-colors hover:bg-white/10"
                >
                  <img src={snapflood.logo} alt="" className="h-6 w-6 rounded-md object-cover" />
                  {snapflood.name}
                </SmartLink>
                <SmartLink
                  to="/products/varshamitra"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-2 pr-3.5 text-sm font-medium text-ink-100 transition-colors hover:bg-white/10"
                >
                  <varshamitra.icon className="h-4 w-4 text-aqua-300" />
                  {varshamitra.name}
                </SmartLink>
              </div>
              <SmartLink
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-aqua-300 hover:text-aqua-200 sm:ml-auto"
              >
                See all projects <ArrowRight className="h-4 w-4" />
              </SmartLink>
            </div>
          </div>
        </div>
      </section>

      {/* How we work — moved below UFIS */}
      <Section>
        <SectionHeading kicker="How we work" title="Four moves, from data to decisions" />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((a, i) => (
            <StaggerItem key={a.title} className="rounded-2xl border border-ink-200/70 bg-white p-6 shadow-soft">
              <IconBadge icon={a.icon} tone={i % 2 === 0 ? 'brand' : 'aqua'} />
              <h3 className="mt-4 text-lg font-semibold text-ink-900">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{a.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Milestones — last section, most recent first, with thumbnails */}
      <Section bg="muted">
        <SectionHeading
          kicker="Our journey"
          title="Milestones along the way"
          description="A timeline grounded in verified events, most recent first. Items marked “indicative” are forward-looking or team-supplied framing."
        />
        <Stagger as="ol" className="relative mt-12 ml-3 border-l border-ink-200">
          {milestones.map((t) => (
            <StaggerItem as="li" key={t.year + t.title} className="relative pb-10 pl-8 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-500 ring-1 ring-brand-200"
              />
              <div className="flex items-start gap-5">
                <MilestoneThumb item={t} />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-sm font-bold text-brand-700">{t.year}</span>
                    {!t.verified && <Badge tone="neutral">Indicative</Badge>}
                  </div>
                  <h3 className="mt-1 font-semibold text-ink-900">{t.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-600">{t.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  )
}
