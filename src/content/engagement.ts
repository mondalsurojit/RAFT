import data from '@content/data/engagement.json'
import { icon } from './icons'
import type { FAQGroup, Opportunity } from './types'

/**
 * Engagement content (Proposals, Support, FAQs).
 * Edit in `content/data/engagement.json`. The opportunity offerings are
 * forward-looking PLACEHOLDER items reflecting RAFT’s stated direction — confirm
 * specifics before publishing.
 */

interface RawOpportunity {
  title: string
  type: string
  summary: string
  detail?: string
  icon: string
  ctaLabel?: string
  ctaHref?: string
  meta?: string
  placeholder?: boolean
}

const toOpportunity = (o: RawOpportunity): Opportunity => ({
  title: o.title,
  type: o.type,
  summary: o.summary,
  detail: o.detail,
  icon: icon(o.icon),
  ctaLabel: o.ctaLabel,
  ctaHref: o.ctaHref,
  meta: o.meta,
  placeholder: o.placeholder,
})

export const proposalOpportunities: Opportunity[] = data.proposalOpportunities.map(toOpportunity)

export const supportOptions: Opportunity[] = data.supportOptions.map(toOpportunity)

/** FAQs grouped by topic — surfaced on the searchable /faq page. */
export const faqGroups: FAQGroup[] = data.faqGroups
