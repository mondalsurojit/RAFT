import type { LucideIcon } from 'lucide-react'

/** A labelled hyperlink (internal path or external URL). */
export interface LinkRef {
  label: string
  href: string
  icon?: LucideIcon
}

export interface Stat {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  hint?: string
}

export interface Feature {
  title: string
  description: string
  icon: LucideIcon
}

export interface ResearchArea {
  slug: string
  title: string
  summary: string
  keywords: string[]
  icon: LucideIcon
  accent?: 'brand' | 'aqua' | 'signal' | 'indigo'
  /** Optional cover image under /public. */
  image?: string
}

export interface TimelineItem {
  year: string
  title: string
  description: string
  /** True when independently corroborated by public sources. */
  verified: boolean
  /** Optional thumbnail under /public — falls back to a branded year tile. */
  image?: string
}

export interface ProductStatus {
  label: string
  tone: 'deployed' | 'development' | 'concept' | 'planned'
}

export interface Product {
  slug: string
  name: string
  tagline: string
  status: ProductStatus
  summary: string
  description?: string
  icon: LucideIcon
  accent: 'brand' | 'aqua' | 'signal' | 'indigo'
  features?: Feature[]
  howItWorks?: { title: string; description: string }[]
  platforms?: LinkRef[]
  audience?: string[]
  links?: LinkRef[]
  funding?: string
  contact?: string[]
  placeholder?: boolean
  note?: string
  /** Gallery images under /public for the product slider. */
  images?: string[]
  /** Technology Readiness Level 1–9 (indicative). */
  trl?: number
  /** Brand logo under /public (used in place of the generic icon). */
  logo?: string
}

export interface Project {
  slug: string
  title: string
  category: string
  summary: string
  /** Technology Readiness Level 1–9 (indicative). */
  trl: number
  status: string
  region?: string
  tags: string[]
  icon: LucideIcon
  accent?: 'brand' | 'aqua' | 'signal' | 'indigo'
  placeholder?: boolean
  /** Small indicative image under /public. */
  image?: string
}

export interface Publication {
  title: string
  venue: string
  year: number
  authors?: string
  doi?: string
  area?: string
}

export interface TeamMember {
  name: string
  role: string
  group?: string
  bio?: string
  image?: string
  links?: LinkRef[]
  placeholder?: boolean
}

export interface Partner {
  name: string
  fullName?: string
  kind: 'funder' | 'ministry' | 'academic'
  role: string
  url?: string
  icon: LucideIcon
  /** Real logo under /public (falls back to the icon when absent). */
  logo?: string
}

export interface NewsItem {
  title: string
  date: string
  source: string
  category: 'press' | 'milestone' | 'release' | 'media'
  excerpt: string
  href?: string
  placeholder?: boolean
}

export interface EventItem {
  title: string
  date: string
  location: string
  kind: string
  description: string
  status: 'upcoming' | 'past'
  href?: string
  placeholder?: boolean
}

export interface Opportunity {
  title: string
  type: string
  summary: string
  detail?: string
  icon: LucideIcon
  ctaLabel?: string
  ctaHref?: string
  meta?: string
  placeholder?: boolean
}

export interface FAQ {
  q: string
  a: string
}

export interface FAQGroup {
  title: string
  faqs: FAQ[]
}
