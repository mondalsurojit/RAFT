import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface MarqueeProps {
  children: ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
}

/** Seamless infinite horizontal marquee (duplicates content for the loop). */
export function Marquee({ children, className, reverse = false, pauseOnHover = true }: MarqueeProps) {
  const track = cn(
    'flex shrink-0 items-center gap-10 pr-10 animate-marquee',
    reverse && '[animation-direction:reverse]',
    pauseOnHover && 'group-hover:[animation-play-state:paused]',
  )
  return (
    <div className={cn('group flex overflow-hidden mask-fade-x', className)}>
      <div className={track}>{children}</div>
      <div className={track} aria-hidden>
        {children}
      </div>
    </div>
  )
}
