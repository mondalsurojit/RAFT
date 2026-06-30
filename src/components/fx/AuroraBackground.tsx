import { cn } from '@/lib/cn'

/** Soft animated aurora blobs for light hero/section backgrounds. */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div className="absolute -left-[12%] top-[-25%] h-[34rem] w-[34rem] rounded-full bg-brand-300/30 blur-3xl animate-aurora" />
      <div className="absolute right-[-12%] top-[-15%] h-[30rem] w-[30rem] rounded-full bg-aqua-300/30 blur-3xl animate-aurora [animation-delay:-5s]" />
      <div className="absolute bottom-[-30%] left-[18%] h-[32rem] w-[32rem] rounded-full bg-brand-200/40 blur-3xl animate-aurora [animation-delay:-9s]" />
    </div>
  )
}
