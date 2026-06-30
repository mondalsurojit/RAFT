import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { SmartLink } from './SmartLink'

type Variant = 'primary' | 'solid' | 'secondary' | 'ghost' | 'subtle' | 'aqua' | 'link'
type Size = 'sm' | 'md' | 'lg' | 'icon'

const base =
  'inline-flex select-none items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-gradient text-white shadow-glow hover:-translate-y-0.5 hover:shadow-card-hover',
  solid: 'bg-brand-600 text-white shadow-soft hover:bg-brand-700',
  secondary: 'bg-white text-ink-800 shadow-soft ring-1 ring-inset ring-ink-200 hover:bg-ink-50 hover:ring-ink-300',
  ghost: 'text-ink-700 hover:bg-ink-100',
  subtle: 'bg-brand-50 text-brand-700 hover:bg-brand-100',
  aqua: 'bg-aqua-500 text-white shadow-soft hover:bg-aqua-600',
  link: 'px-0 text-brand-700 underline-offset-4 hover:text-brand-800 hover:underline',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-[0.95rem]',
  icon: 'h-11 w-11',
}

export function buttonVariants({ variant = 'primary', size = 'md' }: { variant?: Variant; size?: Size } = {}) {
  return cn(base, variants[variant], sizes[size])
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  )
}

interface ButtonLinkProps {
  to: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  'aria-label'?: string
}

export function ButtonLink({ to, variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <SmartLink to={to} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </SmartLink>
  )
}
