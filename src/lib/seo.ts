import { site } from '@/config/site'

export interface SeoMeta {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  noindex?: boolean
}

/**
 * Default social card. An SVG card ships in /public/og — for best
 * compatibility across all social platforms, export a 1200×630 PNG and
 * point this at it.
 */
export const DEFAULT_OG_IMAGE = '/images/og/raft-og.svg'

export function absoluteUrl(path = '/'): string {
  if (/^https?:/.test(path)) return path
  return `${site.url}${path.startsWith('/') ? '' : '/'}${path}`
}

export function formatTitle(title?: string): string {
  if (!title) return `${site.name} — ${site.longName} · ${site.org}`
  if (title.toUpperCase().includes('RAFT')) return `${title} · ${site.org}`
  return `${title} · ${site.name}, ${site.org}`
}

/* ------------------------------------------------------------------ */
/*  JSON-LD structured-data builders                                   */
/* ------------------------------------------------------------------ */

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: `${site.name} — ${site.longName}`,
    alternateName: 'RAFT Research Team',
    url: site.url,
    logo: absoluteUrl('/favicon.svg'),
    description: site.description,
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: site.orgLong,
      url: 'https://www.iith.ac.in/',
    },
    sameAs: Object.values(site.social),
    areaServed: 'IN',
    knowsAbout: [
      'Hydroinformatics',
      'Urban flood forecasting',
      'Rainfall-runoff modelling',
      'Hydrological modelling',
      'Artificial intelligence for climate',
    ],
  }
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${site.name} · ${site.org}`,
    url: site.url,
    inLanguage: 'en',
    description: site.description,
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  }
}

interface PersonLdInput {
  name: string
  jobTitle: string
  email?: string
  links?: string[]
  knowsAbout?: string[]
  image?: string
}

export function personLd(p: PersonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: p.name,
    jobTitle: p.jobTitle,
    worksFor: { '@type': 'CollegeOrUniversity', name: site.orgLong, url: 'https://www.iith.ac.in/' },
    ...(p.email ? { email: p.email } : {}),
    ...(p.image ? { image: absoluteUrl(p.image) } : {}),
    ...(p.links?.length ? { sameAs: p.links } : {}),
    ...(p.knowsAbout?.length ? { knowsAbout: p.knowsAbout } : {}),
  }
}

interface SoftwareLdInput {
  name: string
  description: string
  url: string
  operatingSystem: string
  appStore?: string
  playStore?: string
}

export function softwareAppLd(s: SoftwareLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: s.name,
    applicationCategory: 'Weather',
    operatingSystem: s.operatingSystem,
    description: s.description,
    url: s.url,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    creator: organizationLd(),
    ...(s.appStore || s.playStore
      ? { downloadUrl: [s.appStore, s.playStore].filter(Boolean) as string[] }
      : {}),
  }
}
