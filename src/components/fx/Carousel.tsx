import type { ReactNode } from 'react'
import { A11y, Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ClientOnly } from 'vite-react-ssg'
import { cn } from '@/lib/cn'
import 'swiper/css'
import 'swiper/css/pagination'

interface CarouselProps {
  slides: ReactNode[]
  className?: string
  fallbackClassName?: string
  slidesPerView?: number
  breakpoints?: Record<number, { slidesPerView: number }>
  autoplay?: boolean
  loop?: boolean
}

/** Swiper slider, rendered client-only with a static grid fallback for SSG. */
export function Carousel({
  slides,
  className,
  fallbackClassName = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  slidesPerView = 1.15,
  breakpoints,
  autoplay = false,
  loop = true,
}: CarouselProps) {
  return (
    <ClientOnly
      fallback={
        <div className={fallbackClassName}>
          {slides.slice(0, 3).map((s, i) => (
            <div key={i}>{s}</div>
          ))}
        </div>
      }
    >
      {() => (
        <Swiper
          modules={[Pagination, A11y, ...(autoplay ? [Autoplay] : [])]}
          spaceBetween={20}
          slidesPerView={slidesPerView}
          breakpoints={breakpoints}
          loop={loop && slides.length > 3}
          autoplay={autoplay ? { delay: 3800, disableOnInteraction: true } : false}
          pagination={{ clickable: true }}
          className={cn('!pb-12', className)}
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i} className="!h-auto">
              {s}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </ClientOnly>
  )
}
