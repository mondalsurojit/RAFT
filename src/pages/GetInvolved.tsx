import { FileEdit, MessagesSquare, Rocket } from 'lucide-react'
import { Seo } from '@/components/layout/Seo'
import { CTASection } from '@/components/sections/CTASection'
import { OpportunityCards } from '@/components/sections/OpportunityCards'
import { PageHeader } from '@/components/sections/PageHeader'
import { IconBadge } from '@/components/ui/IconBadge'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { proposalOpportunities, supportOptions } from '@/content'
import { breadcrumbLd } from '@/lib/seo'

const steps = [
  { icon: MessagesSquare, title: 'Start a conversation', description: 'Share your area of interest and goals via the contact page.' },
  { icon: FileEdit, title: 'Co-develop the concept', description: 'We shape a scope, methodology and partnership that fits the call.' },
  { icon: Rocket, title: 'Submit & deliver', description: 'We submit jointly and, if funded, deliver the work together.' },
]

/** Proposals and support overlap heavily, so they’re presented as one set of engagement options. */
const engageOptions = [
  ...proposalOpportunities,
  ...supportOptions.filter((o) => o.title !== 'Partner on a Pilot'),
]

export default function GetInvolved() {
  return (
    <>
      <Seo
        title="Get Involved"
        description="Collaborate with RAFT on funded research and pilots, or support our work — fund a research theme, sponsor a product, or partner on a pilot."
        path="/get-involved"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Get Involved', path: '/get-involved' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Get Involved' }]}
        kicker="Engage"
        title="Work with RAFT"
        description="Collaborate on funded research, co-develop a proposal, or support the work directly. However you’d like to engage, there’s a path in."
      />

      {/* Collaborate & support — merged (proposals and support overlap) */}
      <Section>
        <SectionHeading
          kicker="Engage"
          title="Ways to work with us"
          description="From joint research proposals and agency pilots to sponsoring a product or contributing compute — here’s how to collaborate with and support RAFT."
        />
        <div className="mt-12">
          <OpportunityCards items={engageOptions} columns={3} showCta={false} />
        </div>
      </Section>

      {/* How a collaboration takes shape — second section */}
      <Section bg="gradient">
        <SectionHeading kicker="The process" title="How a collaboration takes shape" align="center" />
        <Stagger className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <StaggerItem key={s.title} className="rounded-2xl border border-ink-200/70 bg-white p-6 text-center shadow-soft">
              <div className="mx-auto w-fit">
                <IconBadge icon={s.icon} tone="brand" size="lg" />
              </div>
              <p className="mt-4 text-2xs font-semibold text-ink-400">STEP {i + 1}</p>
              <h3 className="mt-1 text-base font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CTASection
        title="Ready to engage?"
        description="Tell us about your idea, partnership, or how you’d like to support the work — we’ll take it from there."
        primary={{ label: 'Contact the team', to: '/contact' }}
        secondary={{ label: 'Read the FAQ', to: '/faq' }}
      />
    </>
  )
}
