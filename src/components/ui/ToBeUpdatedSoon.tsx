import { Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ToBeUpdatedSoonProps {
  /** Headline. Defaults to a generic "more coming soon" message. */
  title?: string
  /** Supporting line below the headline. */
  description?: string
  /** Pill label shown above the headline. */
  badge?: string
  className?: string
  /** Optional CTA buttons rendered below the message. */
  children?: ReactNode
}

/**
 * A premium, on-theme placeholder for sections whose full content is still being
 * prepared. Shows a brand mark, a live "in progress" pill and a shimmering
 * skeleton that hints content is on its way — reusable across any unfinished page.
 */
export function ToBeUpdatedSoon({
  title = 'More coming soon',
  description = 'We’re putting the finishing touches on this page. Check back shortly — there’s more on the way.',
  badge = 'In progress',
  className,
  children,
}: ToBeUpdatedSoonProps) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-3xl border border-ink-200/70 bg-white px-6 py-12 text-center shadow-card sm:px-12 sm:py-16',
        className,
      )}
    >
      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-48 bg-gradient-to-b from-brand-50/90 via-aqua-50/40 to-transparent"
      />

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
        <Sparkles className="h-7 w-7" />
      </div>

      <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-aqua-50 px-3 py-1 text-2xs font-semibold uppercase tracking-[0.16em] text-aqua-700 ring-1 ring-inset ring-aqua-100">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-aqua-500" />
        </span>
        {badge}
      </div>

      <h2 className="mt-4 text-2xl font-bold text-ink-900 sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-ink-600">{description}</p>

      {/* Skeleton shimmer — hints that real content is being prepared */}
      <div aria-hidden className="mx-auto mt-8 flex max-w-sm flex-col items-center gap-2.5">
        {['w-full', 'w-5/6', 'w-2/3'].map((w) => (
          <div
            key={w}
            className={cn(
              'h-3 rounded-full bg-gradient-to-r from-ink-100 via-ink-200/50 to-ink-100 bg-[length:200%_100%]',
              'animate-shimmer',
              w,
            )}
          />
        ))}
      </div>

      {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>}
    </div>
  )
}
