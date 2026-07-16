'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Parse strings like "100+", "95%", "15+", "24/7" into animatable numbers.
 * Returns { prefix, target, suffix, static } — static values skip animation.
 */
export function parseStatValue(raw) {
  const str = String(raw).trim()
  if (str.includes('/')) {
    return { static: true, display: str }
  }
  const match = str.match(/^([^\d]*)(\d+)(.*)$/)
  if (!match) {
    return { static: true, display: str }
  }
  return {
    static: false,
    prefix: match[1] || '',
    target: Number(match[2]),
    suffix: match[3] || '',
  }
}

export function useCountUp(target, { duration = 1200, enabled = true } = {}) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!enabled || started.current) {
      if (!enabled) setValue(0)
      return
    }
    started.current = true

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setValue(target)
      return
    }

    setValue(0)
    const start = performance.now()
    let frame

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, enabled])

  return value
}

export function useInViewOnce({ threshold = 0.25, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, threshold, rootMargin])

  return [ref, inView]
}
