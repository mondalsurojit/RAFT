import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps {
  as?: ElementType
  className?: string
  hover?: boolean
  children: ReactNode
}

export function Card({ as: Tag = 'div', className, hover = false, children }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-ink-200/70 bg-white shadow-soft',
        hover &&
          'transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-ink-200 hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
