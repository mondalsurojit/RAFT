import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  kicker?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  titleClassName?: string
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-4', align === 'center' && 'items-center text-center', className)}>
      {kicker && (
        <Reveal>
          <span className="kicker">
            <span aria-hidden className="h-px w-6 bg-gradient-to-r from-brand-500 to-aqua-500" />
            {kicker}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Heading
          className={cn(
            'text-balance text-3xl leading-[1.1] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.08]',
            titleClassName,
          )}
        >
          {title}
        </Heading>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'text-pretty text-base leading-relaxed text-ink-600 sm:text-lg',
              align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
