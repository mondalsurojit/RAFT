import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

type Background = 'default' | 'muted' | 'gradient' | 'grid' | 'dark'

const backgrounds: Record<Background, string> = {
  default: 'bg-white',
  muted: 'bg-ink-50',
  gradient: 'bg-mesh-light',
  grid: 'bg-ink-50',
  dark: 'bg-ink-950 text-ink-100',
}

interface SectionProps {
  id?: string
  className?: string
  innerClassName?: string
  children: ReactNode
  bg?: Background
  /** Wrap children in a centered Container (default) or render edge-to-edge. */
  container?: boolean
  size?: 'narrow' | 'content' | 'default' | 'wide'
  spacing?: 'default' | 'tight' | 'loose' | 'none'
}

const spacings = {
  none: '',
  tight: 'py-12 sm:py-16',
  default: 'py-20 sm:py-24 lg:py-28',
  loose: 'py-24 sm:py-32 lg:py-36',
}

export function Section({
  id,
  className,
  innerClassName,
  children,
  bg = 'default',
  container = true,
  size = 'default',
  spacing = 'default',
}: SectionProps) {
  const content = container ? (
    <Container size={size} className={innerClassName}>
      {children}
    </Container>
  ) : (
    children
  )

  return (
    <section
      id={id}
      className={cn('relative isolate', backgrounds[bg], spacings[spacing], className)}
    >
      {bg === 'grid' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid-light bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
      )}
      {content}
    </section>
  )
}
