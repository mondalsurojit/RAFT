import { Briefcase, GraduationCap, Mail, MapPin, Wrench } from 'lucide-react'
import { Seo } from '@/components/layout/Seo'
import { PageHeader } from '@/components/sections/PageHeader'
import { Portrait } from '@/components/ui/Portrait'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SmartLink } from '@/components/ui/SmartLink'
import { currentMembers, joinTeamBlurb, lead, leadLinks, pastMembers } from '@/content'
import type { TeamMember } from '@/content/types'
import { cn } from '@/lib/cn'
import { breadcrumbLd, personLd } from '@/lib/seo'

interface TLItem {
  marker: string
  title: string
  sub?: string
}

function MiniTimeline({ items, scroll }: { items: TLItem[]; scroll?: boolean }) {
  return (
    <div className={cn(scroll && 'max-h-72 overflow-y-auto pr-3 [scrollbar-width:thin]')}>
      <ol className="relative ml-2 space-y-4 border-l border-ink-200">
        {items.map((it, i) => (
          <li key={i} className="relative pl-5">
            <span aria-hidden className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-400 ring-2 ring-white" />
            <p className="text-2xs font-bold uppercase tracking-wide text-brand-700">{it.marker}</p>
            <p className="text-sm font-semibold text-ink-900">{it.title}</p>
            {it.sub && <p className="text-xs text-ink-500">{it.sub}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}

function MemberCard({ m }: { m: TeamMember }) {
  return (
    <StaggerItem className="group flex flex-col overflow-hidden rounded-xl border border-ink-200/70 bg-white shadow-soft transition-shadow hover:shadow-card">
      <Portrait
        name={m.name}
        image={m.image}
        className="aspect-[4/5] w-full"
        rounded="rounded-none"
        imgClassName="object-top transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
      />
      <div className="px-4 py-3">
        <p className="text-sm font-semibold leading-tight text-ink-900">{m.name}</p>
        <p className="mt-0.5 text-xs font-medium text-brand-700">{m.role}</p>
      </div>
    </StaggerItem>
  )
}

function MemberGrid({ members }: { members: TeamMember[] }) {
  return (
    <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {members.map((mem) => (
        <MemberCard key={mem.name} m={mem} />
      ))}
    </Stagger>
  )
}

export default function Team() {
  const education: TLItem[] = lead.education.map((e) => ({
    marker: e.year,
    title: e.degree,
    sub: `${e.field} · ${e.institution}`,
  }))
  const positions: TLItem[] = lead.positions.map((p) => {
    const [title, marker] = p.split(' — ')
    return { marker: marker ?? '', title }
  })

  return (
    <>
      <Seo
        title="Team"
        description={`Meet the people behind RAFT — led by ${lead.name}, ${lead.title} at IIT Hyderabad.`}
        path="/team"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Team', path: '/team' },
          ]),
          personLd({
            name: lead.name,
            jobTitle: lead.title,
            email: lead.email,
            image: lead.image,
            links: leadLinks.map((l) => l.href),
            knowsAbout: [...lead.interests],
          }),
        ]}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Team' }]}
        kicker="Team"
        title="The people behind the research"
        description="A research group led by Dr. Satish Kumar Regonda, bringing together hydrology, climate science, data science and engineering."
      />

      {/* Lead spotlight */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Portrait + contact */}
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-card">
              <Portrait
                name={lead.name}
                image={lead.image}
                className="aspect-[4/3] w-full"
                rounded="rounded-none"
                imgClassName="object-top"
              />
              <div className="p-6">
                <p className="text-2xs font-semibold uppercase tracking-wider text-brand-700">Group Lead</p>
                <h2 className="mt-1 font-display text-xl font-bold text-ink-900">{lead.name}</h2>
                <p className="text-sm text-ink-500">{lead.role}</p>
                <ul className="mt-4 space-y-2 text-sm text-ink-600">
                  {lead.departments.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-aqua-500" />
                      <span>{d}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua-500" />
                    <span>{lead.office}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-aqua-500" />
                    <SmartLink to={`mailto:${lead.email}`} className="text-brand-700 hover:text-brand-800">
                      {lead.email}
                    </SmartLink>
                  </li>
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {leadLinks.map((l) => (
                    <SmartLink
                      key={l.label}
                      to={l.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 transition-colors hover:border-brand-200 hover:text-brand-700"
                    >
                      {l.icon && <l.icon className="h-3.5 w-3.5" />}
                      {l.label}
                    </SmartLink>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bio + timelines */}
          <div>
            <SectionHeading kicker="Group Lead" title="Dr. Satish Kumar Regonda" />
            <div className="mt-5 space-y-4 leading-relaxed text-ink-700">
              {lead.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-900">
                  <GraduationCap className="h-4 w-4 text-brand-600" /> Education
                </h3>
                <MiniTimeline items={education} />
              </div>
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-900">
                  <Briefcase className="h-4 w-4 text-brand-600" /> Selected positions
                </h3>
                <MiniTimeline items={positions} scroll />
              </div>
            </div>
          </div>
        </div>

        {/* Research interests + tools — full width, below both cards */}
        <div className="mt-12 grid gap-8 rounded-3xl border border-ink-200/70 bg-ink-50/60 p-6 sm:p-8 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-ink-900">Research interests</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {lead.interests.map((i) => (
                <span key={i} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-100">
                  {i}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-ink-900">
              <Wrench className="h-4 w-4 text-brand-600" /> Tools & methods
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {lead.tools.map((t) => (
                <span key={t} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink-700 ring-1 ring-inset ring-ink-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Current members */}
      <Section bg="muted">
        <SectionHeading kicker="Our people" title="Current members" description={joinTeamBlurb} />
        <MemberGrid members={currentMembers} />
      </Section>

      {/* Past members */}
      <Section>
        <SectionHeading
          kicker="Alumni"
          title="Past members"
          description="Former members now contributing across academia, government and industry."
        />
        <MemberGrid members={pastMembers} />
      </Section>
    </>
  )
}
