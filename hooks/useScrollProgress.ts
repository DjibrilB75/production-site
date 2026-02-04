'use client'

import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { RefObject } from 'react'

interface UseScrollProgressReturn {
  scrollYProgress: MotionValue<number>
  scrollY: MotionValue<number>
}

export function useScrollProgress(
  ref?: RefObject<HTMLElement>
): UseScrollProgressReturn {
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  return { scrollYProgress, scrollY }
}

export function useParallax(
  scrollYProgress: MotionValue<number>,
  distance: number
): MotionValue<number> {
  return useTransform(scrollYProgress, [0, 1], [-distance, distance])
}

export function useGalleryProgress(
  ref: RefObject<HTMLElement>,
  totalItems: number
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const currentIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalItems - 1]
  )

  return { scrollYProgress, currentIndex }
}
