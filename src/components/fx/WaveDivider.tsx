import { cn } from '@/lib/cn'

interface WaveDividerProps {
  className?: string
  /** Tailwind fill-* class for the wave colour (matches the next section's bg). */
  fill?: string
  flip?: boolean
  layered?: boolean
}

/** Thematic layered water wave used to transition between sections. */
export function WaveDivider({ className, fill = 'fill-white', flip = false, layered = true }: WaveDividerProps) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none w-full overflow-hidden leading-[0]', flip && 'rotate-180', className)}
    >
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-[56px] w-full sm:h-[88px]">
        {layered && (
          <>
            <path
              className={cn(fill, 'opacity-40')}
              d="M0,40 C220,96 420,8 720,48 C1010,86 1240,24 1440,64 L1440,120 L0,120 Z"
            />
            <path
              className={cn(fill, 'opacity-70')}
              d="M0,72 C260,40 460,104 720,72 C980,40 1200,104 1440,80 L1440,120 L0,120 Z"
            />
          </>
        )}
        <path
          className={fill}
          d="M0,88 C240,120 480,56 720,80 C960,104 1200,72 1440,96 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  )
}
