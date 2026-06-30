import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

interface CTASectionProps {
  kicker?: string
  title: string
  description?: string
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
  className?: string
}

export function CTASection({ kicker, title, description, primary, secondary, className }: CTASectionProps) {
  return (
    <section className={cn('relative bg-white py-20 sm:py-24', className)}>
      <Container>
        <Reveal>
          {/* Animated border — the gradient's colour travels around the edge with a soft
              glow behind it. Driven by a rotating @property angle (see globals.css), so the
              element never transforms and the effect is always visible. */}
          <div className="animated-border rounded-4xl p-[2px] shadow-card">
            <div className="relative isolate overflow-hidden rounded-[calc(2rem-2px)] bg-gradient-to-br from-brand-50 via-white to-aqua-50/70 px-6 py-14 text-center sm:px-12 sm:py-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-grid-light bg-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
              />
              {kicker && (
                <p className="mb-3 text-2xs font-semibold uppercase tracking-[0.18em] text-brand-600">{kicker}</p>
              )}
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold text-ink-900 sm:text-4xl">{title}</h2>
              {description && (
                <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink-600">{description}</p>
              )}
              {(primary || secondary) && (
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {primary && (
                    <ButtonLink to={primary.to} variant="primary" size="lg">
                      {primary.label}
                      <ArrowRight className="h-4 w-4" />
                    </ButtonLink>
                  )}
                  {secondary && (
                    <ButtonLink to={secondary.to} variant="secondary" size="lg">
                      {secondary.label}
                    </ButtonLink>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
