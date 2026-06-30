import type { ComponentType } from 'react'
import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from '@/components/layout/Layout'
import { blogPosts } from '@/content'

/** Map a page module's default export onto react-router's `Component` field. */
function lazyPage(loader: () => Promise<{ default: ComponentType }>) {
  return () => loader().then((m) => ({ Component: m.default }))
}

/** One static route per blog post so each prerenders to its own HTML. */
const blogPostRoutes: RouteRecord[] = blogPosts.map((post) => ({
  path: `blog/${post.slug}`,
  entry: 'src/pages/BlogPost.tsx',
  lazy: lazyPage(() => import('@/pages/BlogPost')),
}))

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/layout/Layout.tsx',
    children: [
      { index: true, entry: 'src/pages/Home.tsx', lazy: lazyPage(() => import('@/pages/Home')) },
      { path: 'about', entry: 'src/pages/About.tsx', lazy: lazyPage(() => import('@/pages/About')) },
      { path: 'research', entry: 'src/pages/Research.tsx', lazy: lazyPage(() => import('@/pages/Research')) },
      { path: 'projects', entry: 'src/pages/Projects.tsx', lazy: lazyPage(() => import('@/pages/Projects')) },
      { path: 'publications', entry: 'src/pages/Publications.tsx', lazy: lazyPage(() => import('@/pages/Publications')) },
      { path: 'products', entry: 'src/pages/Products.tsx', lazy: lazyPage(() => import('@/pages/Products')) },
      { path: 'products/snapflood', entry: 'src/pages/SnapFlood.tsx', lazy: lazyPage(() => import('@/pages/SnapFlood')) },
      { path: 'products/varshamitra', entry: 'src/pages/VarshaMitra.tsx', lazy: lazyPage(() => import('@/pages/VarshaMitra')) },
      { path: 'team', entry: 'src/pages/Team.tsx', lazy: lazyPage(() => import('@/pages/Team')) },
      { path: 'get-involved', entry: 'src/pages/GetInvolved.tsx', lazy: lazyPage(() => import('@/pages/GetInvolved')) },
      { path: 'faq', entry: 'src/pages/Faq.tsx', lazy: lazyPage(() => import('@/pages/Faq')) },
      { path: 'events', entry: 'src/pages/Events.tsx', lazy: lazyPage(() => import('@/pages/Events')) },
      { path: 'news', entry: 'src/pages/News.tsx', lazy: lazyPage(() => import('@/pages/News')) },
      { path: 'blog', entry: 'src/pages/Blog.tsx', lazy: lazyPage(() => import('@/pages/Blog')) },
      ...blogPostRoutes,
      { path: 'contact', entry: 'src/pages/Contact.tsx', lazy: lazyPage(() => import('@/pages/Contact')) },
      { path: '*', entry: 'src/pages/NotFound.tsx', lazy: lazyPage(() => import('@/pages/NotFound')) },
    ],
  },
]
