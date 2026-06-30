import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { AuroraBackground } from '@/components/fx/AuroraBackground'
import { GridBackground } from '@/components/fx/GridBackground'
import { PhoneShowcase } from '@/components/product/PhoneShowcase'
import { Seo } from '@/components/layout/Seo'
import { CTASection } from '@/components/sections/CTASection'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { IconBadge } from '@/components/ui/IconBadge'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StoreBadges } from '@/components/ui/StoreBadges'
import { snapflood } from '@/content'
import { breadcrumbLd, softwareAppLd } from '@/lib/seo'

const SITE = 'https://snapflood.civil.iith.ac.in'

/** App screenshots shown in the phone-frame slider. */
const screens = Array.from({ length: 7 }, (_, i) => ({
  src: `/images/product/snapflood/screen-${i + 1}.jpeg`,
  alt: `SnapFlood app screen ${i + 1}`,
}))

export default function SnapFlood() {
  return (
    <>
      <Seo
        title="SnapFlood — Real-Time Urban Flood Reporting"
        description={snapflood.summary}
        path="/products/snapflood"
        type="article"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: 'SnapFlood', path: '/products/snapflood' },
          ]),
          softwareAppLd({
            name: 'SnapFlood',
            description: snapflood.summary,
            url: SITE,
            operatingSystem: 'Web, Android, iOS, iPadOS, macOS, visionOS',
            appStore: 'https://apps.apple.com/us/app/snapflood/id6746365714',
            playStore: 'https://play.google.com/store/apps/details?id=com.snapflood',
          }),
        ]}
      />

      {/* Hero — summary + phone-frame screenshot slider */}
      <section className="relative isolate overflow-hidden border-b border-ink-100 bg-white pb-20 pt-12 sm:pt-16">
        <AuroraBackground className="opacity-70" />
        <GridBackground />
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Breadcrumbs
              items={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }, { label: 'SnapFlood' }]}
            />
            {/* App-style header — logo at left, name + subheading beside it */}
            <div className="mt-6 flex items-center gap-4">
              {snapflood.logo ? (
                <img
                  src={snapflood.logo}
                  alt="SnapFlood logo"
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover shadow-soft ring-1 ring-ink-200/60"
                />
              ) : (
                <IconBadge icon={snapflood.icon} tone="brand" size="lg" />
              )}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <h1 className="text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">{snapflood.name}</h1>
                  <Badge tone="success" icon={CheckCircle2}>
                    {snapflood.status.label}
                  </Badge>
                </div>
                <p className="mt-1.5 text-base font-medium text-brand-700 sm:text-lg">{snapflood.tagline}</p>
              </div>
            </div>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-600">{snapflood.summary}</p>

            {/* This page is a brief gateway — the full experience lives on the main site */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink to={SITE} size="lg">
                Open the web app
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
            <StoreBadges p={snapflood} className="mt-4" />
          </div>

          {/* Compact phone mockup with a screenshot slider */}
          <Reveal
            delay={0.1}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <PhoneShowcase images={screens} />
          </Reveal>
        </Container>
      </section>

      {/* Highlights — a quick "what it does" */}
      <Section bg="muted">
        <SectionHeading
          align="center"
          kicker="Highlights"
          title="Simple to use, serious about data"
          description="A few of the things SnapFlood does — explore the rest on the main site."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {snapflood.features?.slice(0, 4).map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3 rounded-2xl border border-ink-200/70 bg-white p-4 shadow-soft"
            >
              <IconBadge icon={f.icon} tone="brand" size="sm" />
              <span className="text-sm font-medium text-ink-800">{f.title}</span>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        kicker="Continue on the main site"
        title="Explore the full SnapFlood experience"
        description="The live flood map, reporting tools and the latest from the project all live on the main SnapFlood site."
        primary={{ label: 'Go to snapflood.civil.iith.ac.in', to: SITE }}
        secondary={{ label: 'See all products', to: '/products' }}
      />
    </>
  )
}
