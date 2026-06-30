import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill="none">
      <rect width="40" height="40" rx="11" fill="url(#raftMark)" />
      <path
        d="M9 24.5c2.5 0 2.5-2.1 5-2.1s2.5 2.1 5 2.1 2.5-2.1 5-2.1 2.5 2.1 5 2.1"
        stroke="white"
        strokeOpacity="0.92"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M9 29.5c2.5 0 2.5-2.1 5-2.1s2.5 2.1 5 2.1 2.5-2.1 5-2.1 2.5 2.1 5 2.1"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M20 8c2.9 3.8 5 6.5 5 9.4a5 5 0 1 1-10 0C15 14.5 17.1 11.8 20 8Z" fill="white" />
      <defs>
        <linearGradient id="raftMark" x1="4" y1="3" x2="36" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0a56a2" />
          <stop offset="0.5" stopColor="#1888ec" />
          <stop offset="1" stopColor="#1fa496" />
        </linearGradient>
      </defs>
    </svg>
  )
}

interface LogoProps {
  className?: string
  subtitle?: boolean
  tone?: 'default' | 'light'
}

export function Logo({ className, subtitle = true, tone = 'default' }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="RAFT — IIT Hyderabad, home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <LogoMark className="h-9 w-9 shrink-0 transition-transform duration-300 ease-out-expo group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-lg font-bold tracking-tight',
            tone === 'light' ? 'text-white' : 'text-ink-900',
          )}
        >
          RAFT
        </span>
        {subtitle && (
          <span
            className={cn(
              'mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em]',
              tone === 'light' ? 'text-white/60' : 'text-ink-500',
            )}
          >
            IIT Hyderabad
          </span>
        )}
      </span>
    </Link>
  )
}
