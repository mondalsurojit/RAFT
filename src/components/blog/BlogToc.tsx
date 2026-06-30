import { ChevronDown, List, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

const INLINE_TOC_ID = 'blog-toc-inline'

export interface TocEntry {
  level: number
  text: string
  id: string
}

function jumpTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Mobile-only "On this page" card rendered at the top of an article. Collapsible
 * but expanded by default, so readers get the lay of the land without scrolling.
 */
export function TocInline({ toc }: { toc: TocEntry[] }) {
  const [open, setOpen] = useState(true)
  if (toc.length < 2) return null

  return (
    <div
      id={INLINE_TOC_ID}
      className="overflow-hidden rounded-2xl border border-ink-200/70 bg-ink-50/60 lg:hidden"
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3"
      >
        <span className="inline-flex items-center gap-2 text-2xs font-semibold uppercase tracking-[0.16em] text-ink-500">
          <List className="h-3.5 w-3.5" /> On this page
        </span>
        <ChevronDown
          className={cn('h-4 w-4 text-ink-400 transition-transform duration-300', !open && '-rotate-90')}
        />
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out-expo',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <ul className="space-y-0.5 px-2.5 pb-3">
            {toc.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(t.id)}
                  className={cn(
                    'block w-full rounded-lg px-2 py-1.5 text-left text-sm text-ink-600 transition-colors hover:bg-white hover:text-ink-900',
                    t.level === 3 && 'pl-5 text-[0.8125rem] text-ink-500',
                  )}
                >
                  {t.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/**
 * Mobile-only floating button that opens a bottom-sheet table of contents and
 * jumps to a section on tap. Sits on the left so it never collides with the
 * back-to-top control on the right.
 */
export function TocFab({ toc, activeId }: { toc: TocEntry[]; activeId: string }) {
  const [open, setOpen] = useState(false)
  // Only reveal the floating button once the reader has scrolled past the inline
  // "On this page" card — until then that card already serves the same purpose.
  const [pastInline, setPastInline] = useState(false)

  useEffect(() => {
    const el = document.getElementById(INLINE_TOC_ID)
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setPastInline(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (toc.length < 2) return null

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="On this page"
        aria-expanded={open}
        aria-hidden={!pastInline}
        tabIndex={pastInline ? 0 : -1}
        onClick={() => setOpen(true)}
        className={cn(
          'fixed bottom-6 left-5 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 ring-1 ring-white/20 transition-all duration-300 ease-out-expo active:scale-95',
          pastInline ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
        )}
      >
        <List className="h-5 w-5" />
      </button>

      {/* Bottom sheet */}
      <div
        className={cn(
          'fixed inset-0 z-[44] transition-opacity duration-300',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"
        />
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 max-h-[70dvh] overflow-y-auto rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl transition-transform duration-300 ease-out-expo',
            open ? 'translate-y-0' : 'translate-y-full',
          )}
        >
          <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-ink-200" />
          <div className="mb-2 flex items-center justify-between">
            <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-ink-400">On this page</p>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="-mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="space-y-0.5 pb-1">
            {toc.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => {
                    jumpTo(t.id)
                    setOpen(false)
                  }}
                  className={cn(
                    'block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    t.level === 3 && 'pl-6 text-[0.8125rem]',
                    activeId === t.id
                      ? 'bg-brand-50 font-medium text-brand-700'
                      : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
                  )}
                >
                  {t.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
