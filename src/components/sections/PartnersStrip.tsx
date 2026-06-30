import { IconBadge } from '@/components/ui/IconBadge'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { SmartLink } from '@/components/ui/SmartLink'
import { collaborators, funders } from '@/content'
import { cn } from '@/lib/cn'

interface PartnersStripProps {
  showCollaborators?: boolean
  className?: string
}

export function PartnersStrip({ showCollaborators = false, className }: PartnersStripProps) {
  return (
    <div className={className}>
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {funders.map((f) => (
          <StaggerItem key={f.name}>
            <SmartLink
              to={f.url ?? '#'}
              className="group flex h-full flex-col gap-3 rounded-2xl border border-ink-200/70 bg-white p-5 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card"
            >
              {f.logo ? (
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2 shadow-soft ring-1 ring-inset ring-ink-200">
                  <img src={f.logo} alt={`${f.name} logo`} className="h-full w-full object-contain" loading="lazy" />
                </span>
              ) : (
                <IconBadge icon={f.icon} tone="indigo" size="lg" />
              )}
              <p className="text-sm font-semibold text-ink-900">{f.name}</p>
              <p className="line-clamp-3 text-xs leading-relaxed text-ink-500">{f.role}</p>
            </SmartLink>
          </StaggerItem>
        ))}
      </Stagger>

      {showCollaborators && (
        <div className="mt-10">
          <p className="kicker mb-4">In collaboration with</p>
          <div className="flex flex-wrap gap-2.5">
            {collaborators.map((c) => (
              <SmartLink
                key={c.name}
                to={c.url ?? '#'}
                className={cn(
                  'rounded-full border border-ink-200 bg-ink-50 px-3.5 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700',
                )}
              >
                {c.name}
              </SmartLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
