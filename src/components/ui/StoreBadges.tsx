import type { Product } from '@/content'
import { cn } from '@/lib/cn'
import { SmartLink } from './SmartLink'

/**
 * Official App Store + Google Play badges. Both source files are the same 119.66×40
 * canvas, so at a shared height they render identical in size.
 */
export function StoreBadges({ p, className }: { p: Product; className?: string }) {
  const apple = p.links?.find((l) => l.href.includes('apps.apple'))
  const play = p.links?.find((l) => l.href.includes('play.google'))
  if (!apple && !play) return null
  return (
    <div className={cn('flex flex-wrap items-center gap-2.5', className)}>
      {apple && (
        <SmartLink
          to={apple.href}
          aria-label="Download on the App Store"
          className="inline-flex items-center transition-opacity hover:opacity-80"
        >
          <img src="/images/brand/app-store.svg" alt="Download on the App Store" className="h-9 w-auto" loading="lazy" />
        </SmartLink>
      )}
      {play && (
        <SmartLink
          to={play.href}
          aria-label="Get it on Google Play"
          className="inline-flex items-center transition-opacity hover:opacity-80"
        >
          <img src="/images/brand/google-play.svg" alt="Get it on Google Play" className="h-9 w-auto" loading="lazy" />
        </SmartLink>
      )}
    </div>
  )
}
