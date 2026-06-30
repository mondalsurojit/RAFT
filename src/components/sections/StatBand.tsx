import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import type { Stat } from '@/content/types'
import { cn } from '@/lib/cn'

interface StatBandProps {
  stats: Stat[]
  tone?: 'light' | 'dark'
  className?: string
}

// Static map so Tailwind's content scanner keeps these classes.
const colsClass: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
}

export function StatBand({ stats, tone = 'light', className }: StatBandProps) {
  const dark = tone === 'dark'
  return (
    <Stagger
      className={cn(
        'grid grid-cols-2 gap-px overflow-hidden rounded-3xl border',
        dark ? 'border-white/10 bg-white/10' : 'border-ink-200/70 bg-ink-200/70',
        colsClass[stats.length] ?? 'lg:grid-cols-4',
        className,
      )}
    >
      {stats.map((s) => (
        <StaggerItem
          key={s.label}
          className={cn('flex flex-col items-center justify-center px-4 py-8 text-center', dark ? 'bg-ink-950' : 'bg-white')}
        >
          <div className={cn('font-display text-3xl font-bold sm:text-4xl', dark ? 'text-white' : 'text-ink-900')}>
            <AnimatedCounter to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
          </div>
          <div className={cn('mt-1.5 text-sm font-medium', dark ? 'text-ink-300' : 'text-ink-700')}>{s.label}</div>
          {s.hint && <div className={cn('mt-1 text-xs', dark ? 'text-ink-500' : 'text-ink-400')}>{s.hint}</div>}
        </StaggerItem>
      ))}
    </Stagger>
  )
}
