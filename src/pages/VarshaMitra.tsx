import { ArrowRight, CloudRain } from 'lucide-react'
import { AuroraBackground } from '@/components/fx/AuroraBackground'
import { GridBackground } from '@/components/fx/GridBackground'
import { Seo } from '@/components/layout/Seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { ToBeUpdatedSoon } from '@/components/ui/ToBeUpdatedSoon'
import { varshamitra } from '@/content'
import { breadcrumbLd } from '@/lib/seo'

export default function VarshaMitra() {
  return (
    <>
      <Seo
        title={varshamitra.name}
        description={varshamitra.summary}
        path="/products/varshamitra"
        type="article"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: varshamitra.name, path: '/products/varshamitra' },
        ])}
      />

      {/* Hero — heading only */}
      <section className="relative isolate overflow-hidden border-b border-ink-100 bg-white pb-16 pt-12 sm:pt-16">
        <AuroraBackground className="opacity-60" />
        <GridBackground />
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '/products' },
              { label: varshamitra.name },
            ]}
          />
          {/* App-style header — icon at left, name + subheading beside it */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-aqua-100 to-brand-50 ring-1 ring-inset ring-aqua-200/60">
              <CloudRain className="h-8 w-8 text-aqua-600" />
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">{varshamitra.name}</h1>
              <p className="mt-1.5 text-base font-medium text-aqua-700 sm:text-lg">{varshamitra.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">{varshamitra.summary}</p>
        </Container>
      </section>

      {/* Full overview still in progress */}
      <Section>
        <ToBeUpdatedSoon
          title="A fuller VarshaAnalytics page is on the way"
          description="We’re preparing a complete overview — capabilities, community dashboards and rainfall insights. In the meantime, reach out and we’ll gladly share more."
        >
          <ButtonLink to="/contact">
            Get in touch <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink to="/products" variant="secondary">
            All products
          </ButtonLink>
        </ToBeUpdatedSoon>
      </Section>
    </>
  )
}
