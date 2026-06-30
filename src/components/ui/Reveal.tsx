import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
  as?: keyof typeof motion
}

/** Single element that animates into view once. Respects reduced motion via MotionConfig. */
export function Reveal({ children, className, delay = 0, variants = fadeUp, as = 'div' }: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  amount?: number
  delayChildren?: number
  as?: keyof typeof motion
}

/** Parent that staggers its <StaggerItem> children into view. */
export function Stagger({ children, className, amount = 0.09, delayChildren = 0, as = 'div' }: StaggerProps) {
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      variants={staggerContainer(amount, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  variants?: Variants
  as?: keyof typeof motion
}

export function StaggerItem({ children, className, variants = fadeUp, as = 'div' }: StaggerItemProps) {
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  )
}
