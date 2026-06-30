import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
  children: ReactNode
}

const EXTERNAL = /^(https?:|mailto:|tel:)/i

/**
 * Routes internal paths through react-router and sends external / protocol
 * links (and in-page hashes) to a plain anchor with safe rel attributes.
 */
export function SmartLink({ to, children, ...rest }: SmartLinkProps) {
  if (EXTERNAL.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }
  if (to.startsWith('#')) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  )
}
