import data from '@content/data/raft.json'
import { icon } from './icons'
import type { Feature, Stat, TimelineItem } from './types'

/**
 * Core RAFT identity, UFIS framing, the four-pillar approach, values, headline
 * stats and milestone timeline.
 *
 * All editable content lives in `content/data/raft.json` — this module only
 * loads it and resolves icon names to Lucide components. Verbatim official text
 * is sourced from the group's IITH page (see docs/research-dossier.md).
 */

interface RaftInfo {
  name: string
  longName: string
  parent: string
  tagline: string
  taglineVerbatim: string
  shortPitch: string
  whatWeDoVerbatim: string
  vision: string
  mission: string
  missionIsEditorial: boolean
  origin: { year: number; note: string }
}

interface UfisInfo {
  acronym: string
  expansion: string
  focus: string
  goalVerbatim: string
  howBuilt: string[]
  maturity: string
}

export const raft: RaftInfo = data.raft

/** UFIS — the group’s flagship effort. */
export const ufis: UfisInfo = data.ufis

const toFeature = (f: { title: string; description: string; icon: string }): Feature => ({
  title: f.title,
  description: f.description,
  icon: icon(f.icon),
})

/** What we do — the four pillars of RAFT’s work (verbatim framing). */
export const approach: Feature[] = data.approach.map(toFeature)

export const values: Feature[] = data.values.map(toFeature)

/** Headline metrics — all drawn from verified public sources (Google Scholar snapshot). */
export const stats: Stat[] = data.stats as Stat[]

/**
 * Milestone timeline. `verified: true` items are corroborated by public sources;
 * `verified: false` items are forward-looking or team-supplied framing.
 */
export const timeline: TimelineItem[] = data.timeline as TimelineItem[]
