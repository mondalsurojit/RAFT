import data from '@content/data/events.json'
import type { EventItem } from './types'

/**
 * Events. PLACEHOLDER entries — replace with real workshops, talks and field
 * activities in `content/data/events.json`. Kept structurally complete so the
 * page renders production-ready.
 */
export const events: EventItem[] = data.events.map((e) => ({
  ...e,
  status: e.status as EventItem['status'],
}))
