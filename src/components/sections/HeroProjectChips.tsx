import { AnimatePresence, motion } from 'framer-motion'
import type { ComponentType } from 'react'
import { useEffect, useState } from 'react'
import { IconBadge } from '@/components/ui/IconBadge'
import { projects, snapflood } from '@/content'
import { cn } from '@/lib/cn'

type Tone = 'brand' | 'aqua' | 'signal' | 'indigo'

interface ShowcaseItem {
  name: string
  subtitle: string
  icon: ComponentType<{ className?: string }>
  tone: Tone
  logo?: string
}

/** Concise display names for the longer project titles (chips are small). */
const SHORT_NAMES: Record<string, string> = {
  'riverine-flood-forecasting': 'Riverine Forecasting',
  'rainfall-nowcasting': 'Rainfall Nowcasting',
  'urban-flood-risk-mapping': 'Flood-Risk Mapping',
  'satellite-rainfall': 'Satellite Rainfall',
  'social-media-flood-extraction': 'Social-Media Floods',
}

const showcase: ShowcaseItem[] = projects.map((p) => ({
  name: SHORT_NAMES[p.slug] ?? p.title.split(' — ')[0],
  subtitle: p.category,
  icon: p.icon,
  tone: (p.accent ?? 'brand') as Tone,
  // The SnapFlood card uses the real product logo instead of an icon.
  logo: p.slug === 'snapflood' ? snapflood.logo : undefined,
}))

const N = showcase.length

function ChipBody({ item }: { item: ShowcaseItem }) {
  return (
    <div className="flex items-center gap-2.5">
      {item.logo ? (
        <img
          src={item.logo}
          alt=""
          className="h-9 w-9 shrink-0 rounded-lg object-cover shadow-soft ring-1 ring-ink-200/60"
        />
      ) : (
        <IconBadge icon={item.icon} tone={item.tone} size="sm" />
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ink-900">{item.name}</p>
        <p className="truncate text-xs text-ink-500">{item.subtitle}</p>
      </div>
    </div>
  )
}

/** A fixed-size floating card whose contents cross-fade as the project changes. */
function FloatingChip({ item, className }: { item: ShowcaseItem; className: string }) {
  return (
    <div className={cn('absolute hidden w-60 sm:block', className)}>
      <div className="relative h-[60px] overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-card">
        <AnimatePresence initial={false}>
          <motion.div
            key={item.name}
            className="absolute inset-0 flex items-center px-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChipBody item={item} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/**
 * Two floating chips overlaid on the hero image that gently rotate through every
 * project. The two chips are offset (opposite ends of the list) and change on
 * alternating beats, so the showcase feels continuous rather than synchronised.
 * Honours prefers-reduced-motion by holding a static pair.
 */
export function HeroProjectChips() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setTick((t) => t + 1), 1500)
    return () => clearInterval(id)
  }, [])

  const a = Math.floor(tick / 2) % N
  const b = (Math.floor((tick + 1) / 2) + Math.floor(N / 2)) % N

  return (
    <>
      <FloatingChip item={showcase[a]} className="-left-4 top-6" />
      <FloatingChip item={showcase[b]} className="-bottom-5 -right-3" />
    </>
  )
}
