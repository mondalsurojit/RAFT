import data from '@content/data/research.json'
import { icon } from './icons'
import type { Feature, ResearchArea } from './types'

/** Research domains, capabilities, study regions and tools. Edit in `content/data/research.json`. */
export const researchAreas: ResearchArea[] = data.researchAreas.map((a) => ({
  ...a,
  icon: icon(a.icon),
  accent: a.accent as ResearchArea['accent'],
}))

/** RAFT’s corroborated, lab-specific research capabilities. */
export const capabilities: Feature[] = data.capabilities.map((c) => ({
  title: c.title,
  description: c.description,
  icon: icon(c.icon),
}))

/** River basins and regions in RAFT’s study scope. */
export const studyRegions: { name: string; kind: 'Riverine' | 'Urban' }[] = data.studyRegions.map(
  (r) => ({ name: r.name, kind: r.kind as 'Riverine' | 'Urban' }),
)

export const researchTools: string[] = data.researchTools
