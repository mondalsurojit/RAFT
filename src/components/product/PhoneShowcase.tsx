import { Wifi } from 'lucide-react'
import { useState } from 'react'
import type { Swiper as SwiperClass } from 'swiper'
import { A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ClientOnly } from 'vite-react-ssg'
import { cn } from '@/lib/cn'
import 'swiper/css'

interface PhoneShowcaseProps {
  images: { src: string; alt: string }[]
  className?: string
}

/** iPhone-style OS status bar: time + cellular / wifi / battery, with a dynamic island. */
function StatusBar() {
  return (
    <div className="relative flex h-8 shrink-0 items-center justify-between bg-ink-950 px-3.5 text-white">
      <span className="text-[10px] font-semibold tracking-tight">9:41</span>
      {/* Dynamic island */}
      <span
        aria-hidden
        className="absolute left-1/2 top-[7px] h-3 w-12 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10"
      />
      <div className="flex items-center gap-[5px]">
        {/* Cellular */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
          <rect x="0" y="7.5" width="3" height="3.5" rx="1" />
          <rect x="4.7" y="5" width="3" height="6" rx="1" />
          <rect x="9.3" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="14" y="0" width="3" height="11" rx="1" />
        </svg>
        <Wifi className="h-[13px] w-[13px]" strokeWidth={2.6} aria-hidden />
        {/* Battery */}
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden>
          <rect x="0.5" y="0.6" width="20" height="10.8" rx="3" stroke="currentColor" strokeOpacity="0.6" />
          <rect x="2" y="2.1" width="14.5" height="7.8" rx="1.6" fill="currentColor" />
          <rect x="22" y="3.6" width="2" height="4.8" rx="1" fill="currentColor" fillOpacity="0.7" />
        </svg>
      </div>
    </div>
  )
}

/**
 * A compact, realistic phone mockup that cycles app screenshots in a Swiper, with
 * a real-looking OS status bar at the top and modern pagination dots below the
 * device. The first screenshot is prerendered (ClientOnly fallback) so the page
 * still shows a clean device in static HTML; Swiper hydrates on the client.
 */
export function PhoneShowcase({ images, className }: PhoneShowcaseProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [active, setActive] = useState(0)

  return (
    <div className={cn('mx-auto w-full max-w-[12.5rem] sm:max-w-[14rem]', className)}>
      {/* Device */}
      <div className="relative overflow-hidden rounded-[2.2rem] border-[6px] border-ink-900 bg-ink-950 shadow-card-hover">
        <div className="flex aspect-[9/19.5] flex-col">
          <StatusBar />
          <div className="relative flex-1 overflow-hidden bg-ink-100">
            <ClientOnly
              fallback={
                images[0] ? (
                  <img
                    src={images[0].src}
                    alt={images[0].alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : null
              }
            >
              {() => (
                <Swiper
                  modules={[A11y, Autoplay]}
                  className="h-full w-full"
                  slidesPerView={1}
                  loop={images.length > 1}
                  autoplay={{ delay: 3200, disableOnInteraction: false }}
                  onSwiper={setSwiper}
                  onSlideChange={(s) => setActive(s.realIndex)}
                >
                  {images.map((im) => (
                    <SwiperSlide key={im.src}>
                      <img src={im.src} alt={im.alt} className="h-full w-full object-cover" loading="lazy" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </ClientOnly>
          </div>
        </div>
      </div>

      {/* Modern pagination dots — below the device */}
      {images.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {images.map((im, i) => (
            <button
              key={im.src}
              type="button"
              aria-label={`Show screen ${i + 1}`}
              aria-current={i === active}
              onClick={() => swiper?.slideToLoop(i)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 ease-out-expo',
                i === active ? 'w-6 bg-brand-600' : 'w-1.5 bg-ink-300 hover:bg-ink-400',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
