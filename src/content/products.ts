import data from '@content/data/products.json'
import { icon } from './icons'
import type { LinkRef, Product } from './types'

/**
 * Products. Edit the content in `content/data/products.json` — this module loads
 * it, resolves icon names to Lucide components and exposes typed objects.
 */

interface RawLink {
  label: string
  href: string
  icon?: string
}

interface RawFeature {
  title: string
  description: string
  icon: string
}

interface RawProduct {
  slug: string
  name: string
  tagline: string
  status: { label: string; tone: string }
  summary: string
  description?: string
  icon: string
  accent: string
  features?: RawFeature[]
  howItWorks?: { title: string; description: string }[]
  platforms?: RawLink[]
  audience?: string[]
  links?: RawLink[]
  funding?: string
  contact?: string[]
  placeholder?: boolean
  note?: string
  images?: string[]
  trl?: number
  logo?: string
}

const toLink = (l: RawLink): LinkRef => ({
  label: l.label,
  href: l.href,
  ...(l.icon ? { icon: icon(l.icon) } : {}),
})

function toProduct(p: RawProduct): Product {
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    status: { label: p.status.label, tone: p.status.tone as Product['status']['tone'] },
    summary: p.summary,
    description: p.description,
    icon: icon(p.icon),
    accent: p.accent as Product['accent'],
    features: p.features?.map((f) => ({ title: f.title, description: f.description, icon: icon(f.icon) })),
    howItWorks: p.howItWorks,
    platforms: p.platforms?.map(toLink),
    audience: p.audience,
    links: p.links?.map(toLink),
    funding: p.funding,
    contact: p.contact,
    placeholder: p.placeholder,
    note: p.note,
    images: p.images,
    trl: p.trl,
    logo: p.logo,
  }
}

const file = data as unknown as {
  snapflood: RawProduct
  varshamitra: RawProduct
  roadmap: RawProduct[]
}

export const snapflood: Product = toProduct(file.snapflood)
export const varshamitra: Product = toProduct(file.varshamitra)

/** The two named products surfaced in primary navigation. */
export const products: Product[] = [snapflood, varshamitra]

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug)

/**
 * Roadmap products — PLACEHOLDER cards representing planned directions.
 * Replace or confirm with the RAFT team before publishing.
 */
export const roadmapProducts: Product[] = file.roadmap.map(toProduct)
