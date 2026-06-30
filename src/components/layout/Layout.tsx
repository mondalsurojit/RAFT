import { MotionConfig } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { Preloader } from '@/components/fx/Preloader'
import { AnnouncementBar } from './AnnouncementBar'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { BackToTop, ScrollManager } from './ScrollManager'

/** Root layout: announcement bar, sticky nav, routed page, footer. */
export function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <ScrollManager />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}
