import { ArrowRight, Home, Waves } from 'lucide-react'
import { AuroraBackground } from '@/components/fx/AuroraBackground'
import { GridBackground } from '@/components/fx/GridBackground'
import { Seo } from '@/components/layout/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SmartLink } from '@/components/ui/SmartLink'

const quickLinks = [
  { label: 'Research', to: '/research' },
  { label: 'Products', to: '/products' },
  { label: 'Publications', to: '/publications' },
  { label: 'Contact', to: '/contact' },
]

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-white">
        <AuroraBackground />
        <GridBackground />
        <Container className="py-24 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow">
            <Waves className="h-8 w-8 text-white" />
          </div>
          <p className="mt-8 font-display text-7xl font-bold text-gradient sm:text-8xl">404</p>
          <h1 className="mt-4 text-2xl font-bold text-ink-900 sm:text-3xl">This page drifted downstream</h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-ink-600">
            The page you’re looking for doesn’t exist or has moved. Let’s get you back to dry land.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink to="/" size="lg">
              <Home className="h-4 w-4" />
              Back to home
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {quickLinks.map((l) => (
              <SmartLink
                key={l.to}
                to={l.to}
                className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-brand-200 hover:text-brand-700"
              >
                {l.label}
              </SmartLink>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
