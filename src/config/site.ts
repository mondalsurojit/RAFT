/**
 * Global site configuration: identity, canonical URL, navigation, socials.
 * Centralised so SEO, header, footer and JSON-LD stay in sync.
 */

export interface NavLeaf {
  label: string
  to: string
  description?: string
  badge?: string
}

export interface NavGroup {
  label: string
  to?: string
  children?: NavLeaf[]
}

export const site = {
  name: 'RAFT',
  longName: 'Rainfall-runoff Analysis Modelling and Forecasting Tools',
  org: 'IIT Hyderabad',
  orgLong: 'Indian Institute of Technology Hyderabad',
  /** Canonical production origin — update when the final domain is provisioned. */
  url: 'https://raft.iith.ac.in',
  tagline: 'Hydroinformatics & AI for climate-resilient water futures',
  description:
    'RAFT is a research group and innovation lab at IIT Hyderabad advancing rainfall-runoff analysis, urban flood forecasting and AI-for-climate decision systems — evolving from a 2019 research group into a research-based consulting initiative.',
  founded: 2019,
  locale: 'en_IN',
  email: 'contact@raft.iith.ac.in', // PLACEHOLDER — confirm official address
  // Verified research profiles of the group lead, Dr. Satish Regonda.
  social: {
    scholar: 'https://scholar.google.com/citations?user=cTXdUlUAAAAJ&hl=en',
    researchgate: 'https://www.researchgate.net/profile/Satish-Regonda',
    orcid: 'https://orcid.org/0000-0003-3188-9415',
  },
} as const

/** Primary navigation — grouped into mega-menu columns. */
export const NAV: NavGroup[] = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    children: [
      { label: 'About RAFT', to: '/about', description: 'Our story, vision, mission & the UFIS goal' },
      { label: 'Team', to: '/team', description: 'Researchers, students and mentors' },
    ],
  },
  {
    label: 'Research',
    children: [
      { label: 'Research Areas', to: '/research', description: 'Hydroinformatics, flood forecasting & AI' },
      { label: 'Projects', to: '/projects', description: 'Initiatives mapped to TRL maturity' },
      { label: 'Publications', to: '/publications', description: 'Peer-reviewed research output' },
    ],
  },
  {
    label: 'Products',
    children: [
      { label: 'All Products', to: '/products', description: 'Our research-to-product portfolio' },
      { label: 'SnapFlood', to: '/products/snapflood', description: 'Community flood intelligence platform' },
      { label: 'VarshaAnalytics', to: '/products/varshamitra', description: 'Rainfall analytics & insights' },
    ],
  },
  {
    label: 'Engage',
    to: '/get-involved',
    children: [
      { label: 'Get Involved', to: '/get-involved', description: 'Collaborate, partner & support our work' },
      { label: 'FAQ', to: '/faq', description: 'Answers, grouped & searchable' },
    ],
  },
  {
    label: 'News',
    children: [
      { label: 'Events', to: '/events', description: 'Workshops, talks & field activities' },
      { label: 'News & Media', to: '/news', description: 'Press, images & videos' },
      { label: 'Blogs', to: '/blog', description: 'Explainers on flood science' },
    ],
  },
  { label: 'Contact', to: '/contact' },
]

/** Flat list of all routable pages — used for sitemap generation & footer. */
export const ROUTES: { path: string; label: string }[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About RAFT' },
  { path: '/research', label: 'Research Areas' },
  { path: '/projects', label: 'Projects' },
  { path: '/publications', label: 'Publications' },
  { path: '/products', label: 'Products' },
  { path: '/products/snapflood', label: 'SnapFlood' },
  { path: '/products/varshamitra', label: 'VarshaAnalytics' },
  { path: '/team', label: 'Team' },
  { path: '/get-involved', label: 'Get Involved' },
  { path: '/faq', label: 'FAQ' },
  { path: '/events', label: 'Events' },
  { path: '/news', label: 'News & Media' },
  { path: '/blog', label: 'Blogs' },
  { path: '/contact', label: 'Contact' },
]
