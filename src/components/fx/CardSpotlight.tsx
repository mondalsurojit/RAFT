import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardSpotlightProps {
  children: ReactNode
  className?: string
  color?: string
}

/** Card with a radial glow that follows the cursor on hover. */
export function CardSpotlight({
  children,
  className,
  color = 'rgba(24,136,236,0.10)',
}: CardSpotlightProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-soft transition-shadow duration-300 hover:shadow-card',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 72%)` }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  )
}
