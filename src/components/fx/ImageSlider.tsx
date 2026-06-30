import { A11y, Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ClientOnly } from 'vite-react-ssg'
import { cn } from '@/lib/cn'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

export interface SlideImage {
  src: string
  alt: string
}

interface ImageSliderProps {
  images: SlideImage[]
  /** Sizing/shape classes for the slider frame (e.g. aspect + rounded). */
  className?: string
  imgClassName?: string
  autoplay?: boolean
  fade?: boolean
  /** Show clickable pagination dots (default true). */
  pagination?: boolean
}

/**
 * Full-bleed image slider (one image per view). Rendered client-only with a
 * static first-image fallback so the prerendered HTML shows a clean single image.
 */
export function ImageSlider({
  images,
  className,
  imgClassName,
  autoplay = true,
  fade = true,
  pagination = true,
}: ImageSliderProps) {
  const frame = cn('relative overflow-hidden bg-ink-100', className)
  const img = cn('h-full w-full object-cover', imgClassName)

  return (
    <ClientOnly
      fallback={
        <div className={frame}>
          {images[0] && <img src={images[0].src} alt={images[0].alt} className={img} loading="lazy" />}
        </div>
      }
    >
      {() => (
        <Swiper
          modules={[A11y, ...(pagination ? [Pagination] : []), ...(autoplay ? [Autoplay] : []), ...(fade ? [EffectFade] : [])]}
          className={cn('h-full w-full', className)}
          slidesPerView={1}
          loop={images.length > 1}
          effect={fade ? 'fade' : undefined}
          fadeEffect={fade ? { crossFade: true } : undefined}
          autoplay={autoplay ? { delay: 4200, disableOnInteraction: false } : false}
          pagination={pagination ? { clickable: true } : false}
        >
          {images.map((im) => (
            <SwiperSlide key={im.src}>
              <img src={im.src} alt={im.alt} className={img} loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </ClientOnly>
  )
}
