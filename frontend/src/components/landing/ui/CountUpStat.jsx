'use client'

import { parseStatValue, useCountUp, useInViewOnce } from '../../../hooks/useCountUp'

export default function CountUpStat({
  value,
  label,
  shortLabel,
  className = '',
  valueClassName = 'text-2xl sm:text-3xl font-black text-[#111]',
  labelClassName = 'text-xs text-ums-muted mt-0.5',
}) {
  const [ref, inView] = useInViewOnce()
  const parsed = parseStatValue(value)
  const count = useCountUp(parsed.static ? 0 : parsed.target, {
    enabled: inView && !parsed.static,
  })

  const display = parsed.static
    ? parsed.display
    : `${parsed.prefix}${inView ? count : 0}${parsed.suffix}`

  return (
    <div ref={ref} className={className}>
      <div className={valueClassName}>{display}</div>
      {label && (
        <div className={labelClassName}>
          {shortLabel ? (
            <>
              <span className="sm:hidden">{shortLabel}</span>
              <span className="hidden sm:inline">{label}</span>
            </>
          ) : (
            label
          )}
        </div>
      )}
    </div>
  )
}
