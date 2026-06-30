import data from '@content/data/partners.json'
import { icon } from './icons'
import type { Partner } from './types'

/**
 * Funding & ministry ecosystem and academic collaborators.
 * Edit in `content/data/partners.json`. Each organisation’s identity and role is
 * verified; the specific funder→RAFT linkage was supplied by the project brief.
 */

interface RawPartner {
  name: string
  fullName?: string
  kind: string
  role: string
  url?: string
  icon: string
  logo?: string
}

const toPartner = (p: RawPartner): Partner => ({
  name: p.name,
  fullName: p.fullName,
  kind: p.kind as Partner['kind'],
  role: p.role,
  url: p.url,
  icon: icon(p.icon),
  logo: p.logo,
})

export const funders: Partner[] = data.funders.map(toPartner)

/** Academic collaborators corroborated through RAFT’s flood-forecasting work. */
export const collaborators: Partner[] = data.collaborators.map(toPartner)

/** Note shown alongside the partner logos. */
export const partnerNote: string = data.partnerNote

export const hostNote = { icon: icon(data.hostNote.icon), text: data.hostNote.text }
