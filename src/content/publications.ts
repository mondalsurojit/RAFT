import data from '@content/data/publications.json'
import type { Publication } from './types'

/**
 * Citation metrics — Google Scholar snapshot. These values drift over time;
 * treat as approximate. Edit metrics + the publication list in
 * `content/data/publications.json`.
 */
export const publicationMetrics = data.metrics

/** Build a resolvable link for a DOI. */
export const doiUrl = (doi: string) => `https://doi.org/${doi}`

/**
 * Selected, verified publications (titles, venues, years and DOIs corroborated
 * from public records). This is a curated subset, not the complete list.
 */
export const publications: Publication[] = data.publications as Publication[]

/** Distinct research areas present in the publication set (for filtering). */
export const publicationAreas = Array.from(
  new Set(publications.map((p) => p.area).filter(Boolean)),
) as string[]
