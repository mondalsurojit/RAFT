import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Lightweight prose styling (no typography plugin) for rich text blocks.
 */
export function Prose({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'max-w-prose text-[1.0625rem] leading-relaxed text-ink-700',
        '[&_p]:mb-5',
        '[&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink-900',
        '[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink-900',
        '[&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-800',
        '[&_strong]:font-semibold [&_strong]:text-ink-900',
        '[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-brand-400',
        '[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol]:marker:text-ink-400',
        '[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-brand-300 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-ink-600',
        className,
      )}
    >
      {children}
    </div>
  )
}
