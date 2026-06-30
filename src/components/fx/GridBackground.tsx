import { cn } from '@/lib/cn'

interface GridBackgroundProps {
  variant?: 'grid' | 'dot'
  className?: string
  fade?: boolean
}

/** Faint grid or dot pattern with a soft radial fade-out mask. */
export function GridBackground({ variant = 'grid', className, fade = true }: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 -z-10',
        variant === 'dot' ? 'bg-dot-light bg-dot' : 'bg-grid-light bg-grid',
        fade && '[mask-image:radial-gradient(ellipse_at_center,black_22%,transparent_72%)]',
        className,
      )}
    />
  )
}
