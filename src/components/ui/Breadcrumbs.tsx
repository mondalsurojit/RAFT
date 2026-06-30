import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react'
import { cn } from '@/lib/cn'
import { SmartLink } from './SmartLink'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-500">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <Fragment key={item.label}>
              <li>
                {item.to && !last ? (
                  <SmartLink to={item.to} className="transition-colors hover:text-brand-700">
                    {item.label}
                  </SmartLink>
                ) : (
                  <span className={cn(last && 'font-medium text-ink-800')} aria-current={last ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
              {!last && <ChevronRight aria-hidden className="h-3.5 w-3.5 text-ink-300" />}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
