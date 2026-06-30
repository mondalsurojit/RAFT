import type { ComponentType } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'brand' | 'aqua' | 'signal' | 'indigo' | 'neutral'
type Size = 'sm' | 'md' | 'lg'

const tones: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-600 ring-brand-100',
  aqua: 'bg-aqua-50 text-aqua-600 ring-aqua-100',
  signal: 'bg-signal-50 text-signal-600 ring-signal-100',
  indigo: 'bg-iith-indigo/10 text-iith-indigo ring-iith-indigo/15',
  neutral: 'bg-ink-100 text-ink-700 ring-ink-200',
}

const sizes: Record<Size, { box: string; icon: string }> = {
  sm: { box: 'h-9 w-9 rounded-lg', icon: 'h-4 w-4' },
  md: { box: 'h-12 w-12 rounded-xl', icon: 'h-5 w-5' },
  lg: { box: 'h-14 w-14 rounded-2xl', icon: 'h-6 w-6' },
}

interface IconBadgeProps {
  icon: ComponentType<{ className?: string }>
  tone?: Tone
  size?: Size
  className?: string
}

/** Tinted, ringed container for a Lucide icon — the workhorse of feature cards. */
export function IconBadge({ icon: Icon, tone = 'brand', size = 'md', className }: IconBadgeProps) {
  const s = sizes[size]
  return (
    <span className={cn('inline-flex items-center justify-center ring-1 ring-inset', tones[tone], s.box, className)}>
      <Icon className={s.icon} />
    </span>
  )
}
