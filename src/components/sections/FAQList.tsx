import { ChevronDown } from 'lucide-react'
import type { FAQ } from '@/content/types'
import { cn } from '@/lib/cn'

/** Accessible accordion using native <details>/<summary>. `open` force-expands every item. */
export function FAQList({ items, className, open = false }: { items: FAQ[]; className?: string; open?: boolean }) {
  return (
    <div className={cn('divide-y divide-ink-200 overflow-hidden rounded-2xl border border-ink-200/70 bg-white', className)}>
      {items.map((f) => (
        <details key={f.q} open={open} className="group px-5 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-ink-900 [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown className="h-4 w-4 shrink-0 text-ink-400 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-ink-600">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
