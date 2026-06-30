import type { ComponentType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'brand' | 'aqua' | 'signal' | 'neutral' | 'success' | 'outline'

const tones: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-700 ring-brand-200/70',
  aqua: 'bg-aqua-50 text-aqua-700 ring-aqua-200/70',
  signal: 'bg-signal-50 text-signal-700 ring-signal-200/70',
  neutral: 'bg-ink-100 text-ink-700 ring-ink-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  outline: 'bg-white text-ink-700 ring-ink-200',
}

interface BadgeProps {
  tone?: Tone
  icon?: ComponentType<{ className?: string }>
  className?: string
  children: ReactNode
}

export function Badge({ tone = 'brand', icon: Icon, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  )
}
