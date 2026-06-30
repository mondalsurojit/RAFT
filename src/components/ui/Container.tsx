import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const sizes = {
  narrow: 'max-w-3xl',
  content: 'max-w-5xl',
  default: 'max-w-7xl',
  wide: 'max-w-[1440px]',
} as const

interface ContainerProps {
  as?: ElementType
  size?: keyof typeof sizes
  className?: string
  children: ReactNode
}

export function Container({ as: Tag = 'div', size = 'default', className, children }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', sizes[size], className)}>{children}</Tag>
  )
}
