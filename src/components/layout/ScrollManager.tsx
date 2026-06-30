import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'

/** Resets scroll on route change; scrolls to the in-page anchor when a hash is present. */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])
  return null
}

/**
 * Floating "back to top" button that appears after scrolling down.
 * Its ring is a circular progress indicator showing how far the page is scrolled.
 */
export function BackToTop() {
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      setProgress(p)
      setShow(window.scrollY > 640)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const R = 21
  const C = 2 * Math.PI * R

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-40 transition-all duration-300 ease-out-expo',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <button
        type="button"
        aria-label={`Back to top — ${Math.round(progress * 100)}% scrolled`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="group relative grid h-12 w-12 place-items-center rounded-full bg-white/60 backdrop-blur-sm transition-colors hover:bg-white/80"
      >
        {/* Progress ring — transparent track + brand progress, no opaque box */}
        <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden fill="none">
          <circle cx="24" cy="24" r={R} stroke="currentColor" strokeWidth="3" className="text-ink-200/70" />
          <circle
            cx="24"
            cy="24"
            r={R}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-brand-600"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <ChevronUp className="relative h-5 w-5 text-brand-700 transition-colors group-hover:text-brand-900" />
      </button>
    </div>
  )
}
