'use client'

import { Check } from 'lucide-react'

export default function PillToggle({ options, value, onChange, size = 'md', scrollable = false }) {
  const padding = size === 'sm' ? 'p-1' : 'p-1.5'
  const btnPad = size === 'sm' ? 'px-3 py-2.5' : 'px-4 py-3'

  const inner = (
    <div
      className={`inline-flex w-full max-w-full bg-white border border-[#e8e8e8] rounded-full ${padding} shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${
        scrollable ? 'min-w-max' : ''
      }`}
      role="tablist"
    >
      {options.map((opt) => {
        const active = value === opt.id
        const hasShort = Boolean(opt.shortLabel)
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={`${scrollable ? 'shrink-0' : 'flex-1 min-w-0'} flex items-center justify-center gap-2 rounded-full ${btnPad} text-left sm:text-center transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent focus-visible:ring-offset-1 ${
              active
                ? 'bg-[#f3f3f3] text-[#111] shadow-sm'
                : 'bg-transparent text-[#9ca3af] hover:text-[#6b7280]'
            }`}
          >
            <span
              className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                active ? 'bg-[#111]' : 'bg-[#d1d5db]'
              }`}
            >
              <Check className="w-3 h-3 text-white" strokeWidth={3} aria-hidden />
            </span>
            <span
              className={`${scrollable && !hasShort ? 'whitespace-nowrap' : ''} text-sm leading-snug ${
                size === 'sm' ? 'font-medium' : 'font-semibold'
              }`}
            >
              {hasShort ? (
                <>
                  <span className="sm:hidden whitespace-nowrap">{opt.shortLabel}</span>
                  <span className={`${scrollable ? 'whitespace-nowrap' : ''} hidden sm:inline`}>
                    {opt.label}
                  </span>
                </>
              ) : (
                opt.label
              )}
            </span>
          </button>
        )
      })}
    </div>
  )

  if (scrollable) {
    return <div className="overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">{inner}</div>
  }

  return inner
}
