import { Head } from 'vite-react-ssg'
import { site } from '@/config/site'
import { absoluteUrl, DEFAULT_OG_IMAGE, formatTitle, type SeoMeta } from '@/lib/seo'

interface SeoProps extends SeoMeta {
  jsonLd?: object | object[]
}

/**
 * Per-page SEO: title, description, canonical, OpenGraph, Twitter card and
 * one or more JSON-LD blocks. Rendered into <head> at prerender time.
 */
export function Seo({ title, description, path = '/', image, type = 'website', noindex, jsonLd }: SeoProps) {
  const url = absoluteUrl(path)
  const fullTitle = formatTitle(title)
  const desc = description ?? site.description
  const img = absoluteUrl(image ?? DEFAULT_OG_IMAGE)
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Head>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={`${site.name} · ${site.org}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content={site.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {blocks.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Head>
  )
}
