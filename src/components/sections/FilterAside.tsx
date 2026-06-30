import { ArrowDownUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface FilterStatus {
  label: string
  /** Dot colour (hex) shown beside the label. */
  color: string
  count: number
}

export interface FilterSort {
  label: string
  value: string
}

interface FilterAsideProps {
  title?: string
  status: string
  onStatus: (s: string) => void
  statuses: FilterStatus[]
  sort?: string
  onSort?: (s: string) => void
  sorts?: FilterSort[]
  resultText?: string
  className?: string
}

/** Reusable filter sidebar: a Sort select + status list with colour dots and live counts. */
export function FilterAside({
  title = 'Filter by status',
  status,
  onStatus,
  statuses,
  sort,
  onSort,
  sorts,
  resultText,
  className,
}: FilterAsideProps) {
  return (
    <aside className={cn('h-fit space-y-6 lg:sticky lg:top-24', className)}>
      {sorts && sorts.length > 0 && onSort && (
        <div>
          <label className="mb-2 block text-2xs font-semibold uppercase tracking-wide text-ink-500">Sort by</label>
          <div className="relative">
            <ArrowDownUp className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <select
              value={sort}
              onChange={(e) => onSort(e.target.value)}
              className="w-full appearance-none rounded-full border border-ink-200 bg-white py-2.5 pl-10 pr-9 text-sm font-medium text-ink-800 shadow-soft focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-2xs font-semibold uppercase tracking-wide text-ink-500">{title}</p>
        <div className="flex flex-col gap-1">
          {statuses.map((s) => {
            const active = status === s.label
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => onStatus(s.label)}
                aria-pressed={active}
                className={cn(
                  'flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors',
                  active
                    ? 'bg-brand-50 font-medium text-brand-800 ring-1 ring-inset ring-brand-100'
                    : 'text-ink-600 hover:bg-ink-50',
                )}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white" style={{ background: s.color }} />
                <span className="flex-1 truncate">{s.label}</span>
                <span className={cn('text-xs tabular-nums', active ? 'text-brand-700' : 'text-ink-400')}>
                  {s.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {resultText && <p className="text-sm text-ink-500">{resultText}</p>}
    </aside>
  )
}
