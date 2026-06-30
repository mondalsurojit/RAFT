import { ArrowRight, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SmartLink } from '@/components/ui/SmartLink'

export function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-ink-950 text-ink-100">
      <Container className="flex h-9 items-center justify-between gap-4 text-2xs sm:text-xs">
        <p className="flex min-w-0 items-center gap-2">
          <Sparkles className="hidden h-3.5 w-3.5 shrink-0 text-aqua-300 sm:inline" />
          <span className="truncate">
            <span className="font-semibold text-white">Snap – Upload – Contribute</span>
            <span className="hidden text-ink-400 md:inline"> · Join us in building a global flood database.</span>
          </span>
        </p>
        <SmartLink
          to="/products/snapflood"
          className="group inline-flex shrink-0 items-center gap-1 font-medium text-aqua-300 transition-colors hover:text-aqua-200"
        >
          Explore SnapFlood
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </SmartLink>
      </Container>
    </div>
  )
}
