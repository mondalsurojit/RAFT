import { Info } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Tasteful "indicative / to-be-confirmed" note for placeholder content. */
export function PlaceholderNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex items-start gap-2.5 rounded-xl border border-signal-200 bg-signal-50/70 px-4 py-3 text-sm text-signal-800',
        className,
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-signal-600" />
      <span className="leading-relaxed">{children}</span>
    </div>
  )
}
