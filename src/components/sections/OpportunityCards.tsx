import { ArrowRight } from 'lucide-react'
import { CardSpotlight } from '@/components/fx/CardSpotlight'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { IconBadge } from '@/components/ui/IconBadge'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import type { Opportunity } from '@/content/types'
import { cn } from '@/lib/cn'

const colsClass: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

export function OpportunityCards({
  items,
  columns = 3,
  showCta = true,
}: {
  items: Opportunity[]
  columns?: number
  showCta?: boolean
}) {
  return (
    <Stagger className={cn('grid gap-5 sm:grid-cols-2', colsClass[columns] ?? 'lg:grid-cols-3')}>
      {items.map((o) => {
        const cta = showCta && o.ctaLabel && o.ctaHref
        return (
          <StaggerItem key={o.title}>
            <CardSpotlight className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <IconBadge icon={o.icon} tone="brand" />
                <Badge tone="neutral">{o.type}</Badge>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink-900">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{o.summary}</p>
              {o.detail && <p className="mt-3 text-sm leading-relaxed text-ink-500">{o.detail}</p>}
              {(o.meta || cta) && (
                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  {o.meta ? <span className="text-xs font-medium text-ink-400">{o.meta}</span> : <span />}
                  {cta && (
                    <ButtonLink to={o.ctaHref!} variant="subtle" size="sm">
                      {o.ctaLabel}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </ButtonLink>
                  )}
                </div>
              )}
            </CardSpotlight>
          </StaggerItem>
        )
      })}
    </Stagger>
  )
}
