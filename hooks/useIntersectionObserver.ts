'use client'

import { useState, useEffect, useRef, RefObject } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

interface UseIntersectionObserverReturn {
  ref: RefObject<HTMLDivElement>
  isIntersecting: boolean
  entry: IntersectionObserverEntry | null
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  const frozen = freezeOnceVisible && isIntersecting

  useEffect(() => {
    const node = ref.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry)
      setIsIntersecting(entry.isIntersecting)
    }, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [threshold, root, rootMargin, frozen])

  return { ref, isIntersecting, entry }
}

export function useOnScreen(
  options: UseIntersectionObserverOptions = {}
): [RefObject<HTMLDivElement>, boolean] {
  const { ref, isIntersecting } = useIntersectionObserver({
    ...options,
    freezeOnceVisible: true,
  })

  return [ref, isIntersecting]
}
