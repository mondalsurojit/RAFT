import data from '@content/data/team.json'
import type { TeamMember } from './types'

/**
 * RAFT members (beyond the group lead, Dr. Regonda — see person.ts).
 * Edit the lists in `content/data/team.json`. Photos live at
 * /public/images/team/<file>; a member with no `image` falls back to branded
 * initials automatically (see the Portrait component).
 */
export const currentMembers: TeamMember[] = data.current

/** Past members of the lab. */
export const pastMembers: TeamMember[] = data.past

export const joinTeamBlurb: string = data.joinBlurb
