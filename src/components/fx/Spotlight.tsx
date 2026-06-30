import { cn } from '@/lib/cn'

/** Large soft radial spotlight glow, anchored top-centre by default. */
export function Spotlight({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div className="absolute left-1/2 top-0 h-[38rem] w-[62rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(24,136,236,0.16),transparent_62%)] blur-2xl" />
    </div>
  )
}
