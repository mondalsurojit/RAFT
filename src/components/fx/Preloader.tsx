import { useState } from 'react'
import { LogoMark } from '@/components/layout/Logo'

/**
 * Brand preloader shown on the first paint of every (prerendered) page.
 *
 * The fade-out is driven by a pure CSS keyframe (`.raft-preloader`) so the page
 * still reveals itself with JavaScript disabled — React only unmounts the node
 * once the veil animation ends. The veil animates its background alpha and its
 * backdrop blur together, so the content underneath resolves from a soft blur
 * into focus rather than just popping in. Because the overlay is the only thing
 * carrying the blur (and it is removed afterwards) there is no lingering
 * containing-block side effect on the sticky nav or any fixed children.
 */
export function Preloader() {
  const [done, setDone] = useState(false)
  if (done) return null

  return (
    <div
      className="raft-preloader pointer-events-none fixed inset-0 z-[100] grid place-items-center"
      aria-hidden
      onAnimationEnd={(e) => {
        // Only the veil's own animation (the longest) should tear the overlay down.
        if (e.animationName === 'raft-preloader-out') setDone(true)
      }}
    >
      {/* Ambient brand glow behind the mark */}
      <div
        aria-hidden
        className="raft-preloader-glow pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(24,136,236,0.13), rgba(31,164,150,0.06) 55%, transparent)',
        }}
      />

      <div className="raft-preloader-content flex flex-col items-center gap-5">
        <LogoMark className="h-16 w-16 drop-shadow-[0_10px_28px_rgba(10,86,162,0.28)]" />
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-display text-2xl font-bold tracking-tight text-ink-900">RAFT</span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-ink-400">
            IIT Hyderabad
          </span>
        </div>
        <div className="relative mt-1 h-[3px] w-28 overflow-hidden rounded-full bg-ink-200/70">
          <span className="raft-preloader-bar absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-brand-500 to-aqua-500" />
        </div>
      </div>
    </div>
  )
}
