import { GraduationCap, IdCard, Mail, MapPin, Microscope } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SmartLink } from '@/components/ui/SmartLink'
import { NAV } from '@/config/site'
import { site } from '@/config/site'
import { contact, funders, iith } from '@/content'
import { LogoMark } from './Logo'

const socials = [
  { label: 'Google Scholar', href: site.social.scholar, icon: GraduationCap },
  { label: 'ResearchGate', href: site.social.researchgate, icon: Microscope },
  { label: 'ORCID', href: site.social.orcid, icon: IdCard },
]

const columns = NAV.filter((g) => g.children)

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-ink-300">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -left-[10%] top-[-30%] h-[28rem] w-[28rem] rounded-full bg-brand-700/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-aqua-700/15 blur-3xl" />
      </div>

      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-10 w-10" />
              <div className="leading-none">
                <p className="font-display text-xl font-bold text-white">RAFT</p>
                <p className="mt-1 text-2xs font-semibold uppercase tracking-[0.16em] text-ink-500">IIT Hyderabad</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-400">{site.longName}.</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-400">
              Hydroinformatics, flood forecasting and AI-for-climate research — building toward flood-resilient cities
              and communities.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <SmartLink
                  key={s.label}
                  to={s.href}
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-ink-300 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </SmartLink>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((group) => (
              <div key={group.label}>
                <p className="text-sm font-semibold text-white">{group.label}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.children!.map((child) => (
                    <li key={child.to}>
                      <SmartLink
                        to={child.to}
                        className="text-sm text-ink-400 transition-colors hover:text-white"
                      >
                        {child.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact + supported-by */}
        <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="space-y-3 text-sm text-ink-400">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
              <span>
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-aqua-400" />
              <SmartLink to={`mailto:${contact.lead}`} className="transition-colors hover:text-white">
                {contact.lead}
              </SmartLink>
            </p>
          </div>
          <div>
            <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-ink-500">Supported by</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {funders.map((f) => (
                <SmartLink
                  key={f.name}
                  to={f.url ?? '#'}
                  className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-ink-300 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {f.name}
                </SmartLink>
              ))}
            </div>
            <p className="mt-5 text-xs text-ink-500">
              Hosted by{' '}
              <SmartLink to={iith.urls.main} className="font-medium text-ink-300 hover:text-white">
                {iith.name}
              </SmartLink>
              .
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-ink-500 sm:flex-row">
          <p>
            © {year} RAFT, IIT Hyderabad. All rights reserved.
          </p>
          <p className="italic text-ink-500">“{iith.motto}”</p>
        </div>
      </Container>
    </footer>
  )
}
