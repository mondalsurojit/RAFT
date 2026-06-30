import type { ReactNode } from 'react'
import { AuroraBackground } from '@/components/fx/AuroraBackground'
import { GridBackground } from '@/components/fx/GridBackground'
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

interface PageHeaderProps {
  kicker?: string
  title: ReactNode
  description?: ReactNode
  breadcrumb?: Crumb[]
  actions?: ReactNode
  align?: 'left' | 'center'
  children?: ReactNode
}

/** Standard inner-page hero with aurora + grid backdrop. */
export function PageHeader({ kicker, title, description, breadcrumb, actions, align = 'left', children }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-100 bg-white pb-16 pt-12 sm:pb-20 sm:pt-16">
      <AuroraBackground className="opacity-70" />
      <GridBackground />
      <Container>
        <div className={cn('flex flex-col gap-5', align === 'center' && 'items-center text-center')}>
          {breadcrumb && (
            <Reveal>
              <Breadcrumbs items={breadcrumb} />
            </Reveal>
          )}
          {kicker && (
            <Reveal delay={0.04}>
              <span className="kicker">
                <span aria-hidden className="h-px w-6 bg-gradient-to-r from-brand-500 to-aqua-500" />
                {kicker}
              </span>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={0.12}>
              <p
                className={cn(
                  'text-pretty text-lg leading-relaxed text-ink-600',
                  align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl',
                )}
              >
                {description}
              </p>
            </Reveal>
          )}
          {actions && (
            <Reveal delay={0.16}>
              <div className={cn('mt-2 flex flex-wrap gap-3', align === 'center' && 'justify-center')}>{actions}</div>
            </Reveal>
          )}
          {children}
        </div>
      </Container>
    </section>
  )
}
