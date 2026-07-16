'use client'

import { useInViewOnce } from '../../../hooks/useCountUp'

export default function RevealOnScroll({ children, className = '' }) {
  const [ref, inView] = useInViewOnce({ threshold: 0.12 })

  return (
    <div
      ref={ref}
      className={`transition-all duration-300 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } motion-reduce:opacity-100 motion-reduce:translate-y-0 ${className}`}
    >
      {children}
    </div>
  )
}
