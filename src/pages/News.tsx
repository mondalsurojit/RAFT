import { ArrowUpRight, Image as ImageIcon, Video } from 'lucide-react'
import { Carousel } from '@/components/fx/Carousel'
import { Seo } from '@/components/layout/Seo'
import { PageHeader } from '@/components/sections/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SmartLink } from '@/components/ui/SmartLink'
import { mediaGallery, newsItems } from '@/content'
import type { NewsItem } from '@/content/types'
import { breadcrumbLd } from '@/lib/seo'

const categoryTone = {
  press: 'brand',
  milestone: 'aqua',
  release: 'success',
  media: 'neutral',
} as const

function PressCard({ n }: { n: NewsItem }) {
  return (
    <SmartLink
      to={n.href ?? '/news'}
      className="group flex h-60 flex-col rounded-2xl border border-ink-200/70 bg-white p-6 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="flex items-center gap-2">
        <Badge tone={categoryTone[n.category]}>{n.category}</Badge>
        <span className="text-xs text-ink-500">{n.date}</span>
      </div>
      <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
        {n.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-600">{n.excerpt}</p>
      <div className="mt-auto flex items-center justify-between pt-3">
        <span className="text-xs font-medium text-ink-400">{n.source}</span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-700">
          Read <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </SmartLink>
  )
}

export default function News() {
  // Group press items into pairs → each slide is a column of two stacked cards (2 rows).
  // If the count is odd, the trailing column borrows the first item so the grid stays
  // full and the autoplay loop feels continuous (no half-empty column).
  const pairs: NewsItem[][] = []
  for (let i = 0; i < newsItems.length; i += 2) pairs.push(newsItems.slice(i, i + 2))
  const lastPair = pairs[pairs.length - 1]
  if (lastPair && lastPair.length === 1 && newsItems.length > 1) lastPair.push(newsItems[0])

  return (
    <>
      <Seo
        title="News & Media"
        description="Press coverage and media from RAFT, IIT Hyderabad — including the Urban Flood Information System (UFIS) and SnapFlood."
        path="/news"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'News & Media', path: '/news' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'News & Media' }]}
        kicker="News & Media"
        title="In the news"
        description="Coverage and milestones as RAFT’s research reaches communities, agencies and the public."
      />

      {/* Press — 2-row autoplay loop slider */}
      <Section>
        <SectionHeading kicker="Press & releases" title="Stories about our work" />
        <div className="mt-10">
          <Carousel
            autoplay
            loop
            slidesPerView={1.05}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            fallbackClassName="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            slides={pairs.map((pair, i) => (
              <div key={i} className="flex flex-col gap-5">
                {pair.map((n) => (
                  <PressCard key={n.title} n={n} />
                ))}
              </div>
            ))}
          />
        </div>
      </Section>

      {/* Media gallery — autoplay loop slider */}
      <Section bg="muted">
        <SectionHeading
          kicker="Gallery"
          title="Images & videos"
          description="Field campaigns, workshops and community engagement."
        />
        <div className="mt-10">
          <Carousel
            autoplay
            loop
            slidesPerView={1.2}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            slides={mediaGallery.map((mItem) => (
              <div
                key={mItem.title}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-ink-200/70 bg-gradient-to-br from-brand-100 via-aqua-50 to-brand-50 p-5"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-60">
                  {mItem.type === 'video' ? (
                    <Video className="h-10 w-10 text-brand-400" />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-brand-400" />
                  )}
                </div>
                <div className="relative flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink-800">{mItem.title}</span>
                  <Badge tone="outline">{mItem.type === 'video' ? 'Video' : 'Image'}</Badge>
                </div>
              </div>
            ))}
          />
        </div>
      </Section>
    </>
  )
}
