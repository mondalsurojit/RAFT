import { User } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/cn'

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /[A-Za-z]/.test(w[0] ?? ''))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('')
}

interface PortraitProps {
  name: string
  image?: string
  className?: string
  rounded?: string
  placeholder?: boolean
  /** Extra classes on the <img> — e.g. `object-top` to keep heads in frame. */
  imgClassName?: string
}

/** Portrait that falls back to branded initials (or an icon for empty slots). */
export function Portrait({ name, image, className, rounded = 'rounded-2xl', placeholder, imgClassName }: PortraitProps) {
  const [errored, setErrored] = useState(false)

  if (image && !errored) {
    return (
      <img
        src={image}
        alt={name}
        onError={() => setErrored(true)}
        className={cn('object-cover object-center', rounded, imgClassName, className)}
        loading="lazy"
      />
    )
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center bg-brand-gradient-soft text-brand-700',
        rounded,
        className,
      )}
      aria-hidden
    >
      {placeholder ? (
        <User className="h-1/3 w-1/3 text-brand-400" />
      ) : (
        <span className="font-display text-xl font-bold">{initials(name)}</span>
      )}
    </div>
  )
}
