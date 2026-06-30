import data from '@content/data/news.json'
import type { NewsItem } from './types'

/**
 * News & media — press coverage of RAFT’s Urban Flood Information System (UFIS),
 * SnapFlood and related work. Edit in `content/data/news.json`.
 */
export const newsItems: NewsItem[] = data.newsItems.map((n) => ({
  ...n,
  category: n.category as NewsItem['category'],
}))

/** Media gallery — replace placeholder tiles with real images/videos. */
export const mediaGallery: { type: 'image' | 'video'; title: string; placeholder: true }[] =
  data.mediaGallery.map((m) => ({
    type: m.type as 'image' | 'video',
    title: m.title,
    placeholder: true as const,
  }))
