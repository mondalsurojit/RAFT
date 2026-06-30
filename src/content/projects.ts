import data from '@content/data/projects.json'
import { icon } from './icons'
import type { Project } from './types'

/**
 * Projects mapped to Technology Readiness Levels (TRL 1–9).
 * Edit the list in `content/data/projects.json`. TRL values are INDICATIVE
 * editorial estimates based on public maturity signals — confirm with the team.
 */
export const trlScale: { level: number; label: string }[] = data.trlScale

export const projects: Project[] = data.projects.map((p) => ({
  ...p,
  icon: icon(p.icon),
  accent: p.accent as Project['accent'],
}))
