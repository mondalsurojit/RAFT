import data from '@content/data/person.json'
import { icon } from './icons'
import type { LinkRef } from './types'

/**
 * Dr. Satish Kumar Regonda — group lead. All fields verified from public
 * sources. Edit in `content/data/person.json`.
 */

interface Education {
  degree: string
  field: string
  institution: string
  year: string
}

interface Lead {
  name: string
  shortName: string
  role: string
  title: string
  departments: string[]
  org: string
  email: string
  office: string
  image: string
  bio: string[]
  education: Education[]
  positions: string[]
  interests: string[]
  tools: string[]
  phoneNote: string
}

export const lead: Lead = data.lead

export const leadLinks: LinkRef[] = data.leadLinks.map((l) => ({
  label: l.label,
  href: l.href,
  icon: icon(l.icon),
}))
