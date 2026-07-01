import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { NAV, type NavGroup } from '@/config/site'
import { cn } from '@/lib/cn'
import { Logo } from './Logo'

/**
 * Navbar active-state logic — deliberately explicit rather than relying on
 * <NavLink>. Netlify serves prerendered routes as directory URLs with a trailing
 * slash (`/products/snapflood/`), which makes NavLink's exact/`end` matching
 * unreliable and can leave the wrong option highlighted. Here we normalise the
 * path and pick the single most-specific match, so exactly ONE option per group
 * is ever highlighted — the one for the page you're on.
 */

/** Drop any trailing slash so `/x` and `/x/` compare equal. Root stays `/`. */
function normalizePath(pathname: string) {
  const p = pathname.replace(/\/+$/, '')
  return p === '' ? '/' : p
}

/** True when `to` is the current path exactly, or an ancestor segment of it. */
function matches(path: string, to?: string) {
  if (!to) return false
  if (to === '/') return path === '/'
  return path === to || path.startsWith(`${to}/`)
}

/**
 * The single most-specific child link that matches the current path (or null).
 * Longest match wins, so on `/products/snapflood` only "SnapFlood" lights up —
 * never also the ancestor "All Products".
 */
function activeChildTo(path: string, group: NavGroup): string | null {
  let best: string | null = null
  for (const c of group.children ?? []) {
    if (matches(path, c.to) && (best === null || c.to.length > best.length)) best = c.to
  }
  return best
}

export function Navbar() {
  const { pathname } = useLocation()
  const path = normalizePath(pathname)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  // Per-section collapse state for the mobile drawer. Empty = every section expanded by default.
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setOpenGroup(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300 ease-out-expo',
        scrolled
          ? 'border-b border-ink-200/70 bg-white/90 shadow-soft backdrop-blur-lg'
          : 'border-b border-transparent bg-white/60 backdrop-blur-md',
      )}
    >
      <Container className="flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((group) => {
              const activeTo = activeChildTo(path, group)
              const active = matches(path, group.to) || activeTo !== null
              if (!group.children) {
                return (
                  <li key={group.label}>
                    <Link
                      to={group.to!}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                        active ? 'text-brand-700' : 'text-ink-700 hover:text-brand-700',
                      )}
                    >
                      {group.label}
                    </Link>
                  </li>
                )
              }
              const isOpen = openGroup === group.label
              return (
                <li
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onMouseLeave={() => setOpenGroup((g) => (g === group.label ? null : g))}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() => setOpenGroup((g) => (g === group.label ? null : group.label))}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                      active || isOpen ? 'text-brand-700' : 'text-ink-700 hover:text-brand-700',
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      className={cn('h-3.5 w-3.5 transition-transform duration-300', isOpen && 'rotate-180')}
                    />
                  </button>
                  <div
                    className={cn(
                      'absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3 transition-all duration-200 ease-out-expo',
                      isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
                    )}
                  >
                    <div className="overflow-hidden rounded-2xl border border-ink-200/70 bg-white p-2 shadow-card-hover">
                      {group.children.map((child) => {
                        const childActive = child.to === activeTo
                        return (
                          <Link
                            key={child.to}
                            to={child.to}
                            aria-current={childActive ? 'page' : undefined}
                            onClick={() => setOpenGroup(null)}
                            className={cn(
                              'flex flex-col gap-0.5 rounded-xl px-3.5 py-2.5 transition-colors',
                              childActive ? 'bg-brand-50' : 'hover:bg-ink-50',
                            )}
                          >
                            <span className="text-sm font-semibold text-ink-900">{child.label}</span>
                            {child.description && (
                              <span className="text-xs text-ink-500">{child.description}</span>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink to="/get-involved" size="sm" className="hidden sm:inline-flex">
            Get Involved
          </ButtonLink>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer. The parent <header> has a backdrop-blur, which makes it the
          containing block for position:fixed children — so `inset-0` would collapse this
          overlay to the header's height. Pin it with explicit viewport height (h-dvh) and
          horizontal insets instead. overflow-hidden keeps the off-screen (closed) panel
          from adding horizontal page scroll. */}
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-[45] h-dvh overflow-hidden lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            'absolute right-0 top-0 flex h-full w-[min(22rem,86vw)] flex-col bg-white pt-[env(safe-area-inset-top)] shadow-2xl transition-transform duration-300 ease-out-expo',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex h-[var(--nav-h)] items-center justify-between border-b border-ink-200/70 px-5">
            <Logo subtitle={false} />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="flex flex-col gap-1">
              {NAV.map((group) => {
                if (!group.children) {
                  const active = matches(path, group.to)
                  return (
                    <li key={group.label}>
                      <Link
                        to={group.to!}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'block rounded-lg px-3 py-2.5 text-[0.95rem] font-semibold transition-colors',
                          active ? 'text-brand-700' : 'text-ink-900 hover:text-brand-700',
                        )}
                      >
                        {group.label}
                      </Link>
                    </li>
                  )
                }
                const activeTo = activeChildTo(path, group)
                const expanded = !collapsed[group.label]
                return (
                  <li key={group.label} className="py-0.5">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() =>
                        setCollapsed((c) => ({ ...c, [group.label]: !c[group.label] }))
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-2xs font-semibold uppercase tracking-[0.16em] text-ink-400 transition-colors hover:text-ink-600"
                    >
                      {group.label}
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-300',
                          !expanded && '-rotate-90',
                        )}
                      />
                    </button>
                    {/* Collapsible body — the grid-rows 1fr/0fr trick animates height smoothly. */}
                    <div
                      className={cn(
                        'grid transition-[grid-template-rows] duration-300 ease-out-expo',
                        expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                      )}
                    >
                      <div className="overflow-hidden">
                        {/* Sub-options sit a touch right of their section label so the hierarchy reads clearly. */}
                        <ul className="flex flex-col">
                          {group.children.map((child) => {
                            const childActive = child.to === activeTo
                            return (
                              <li key={child.to}>
                                <Link
                                  to={child.to}
                                  aria-current={childActive ? 'page' : undefined}
                                  className={cn(
                                    'block rounded-lg py-2 pl-5 pr-3 text-[0.95rem] font-medium transition-colors',
                                    childActive ? 'text-brand-700' : 'text-ink-700 hover:text-brand-700',
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="border-t border-ink-200/70 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <ButtonLink to="/get-involved" className="w-full">
              Get Involved
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  )
}
