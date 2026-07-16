'use client'

import { URGENCY_STRIPE_ITEMS } from '../../data/landingContent'

function StripeTrack({ items }) {
  return (
    <div className="flex shrink-0 items-center gap-8 sm:gap-12 px-4 sm:px-6">
      {items.map((item) => (
        <span key={item} className="flex shrink-0 items-center gap-8 sm:gap-12">
          <span className="whitespace-nowrap text-xs sm:text-base font-bold tracking-wide uppercase">
            {item}
          </span>
          <span
            className="inline-block h-1.5 w-1.5 rotate-45 rounded-[1px] bg-white/80"
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  )
}

export default function UrgencyStripe({ onOpenModal }) {
  const slow = (e) => {
    e.currentTarget.getAnimations?.().forEach((anim) => {
      anim.playbackRate = 0.3
    })
  }

  const restore = (e) => {
    e.currentTarget.getAnimations?.().forEach((anim) => {
      anim.playbackRate = 1
    })
  }

  return (
    <div className="relative z-10 overflow-hidden bg-gradient-to-b from-ums-tint to-white py-3.5 sm:py-7">
      <button
        type="button"
        onClick={() => onOpenModal?.({})}
        className="urgency-stripe group block w-[112%] -ml-[6%] origin-center -rotate-[1.5deg] sm:-rotate-[2.75deg] cursor-pointer border-y-2 border-white/30 bg-ums-coral text-white shadow-[0_10px_28px_rgba(255,107,91,0.28)] transition-colors duration-200 hover:bg-[#ff5a48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        aria-label="Забронировать место — открыть заявку"
      >
        <div className="overflow-hidden py-2.5 sm:py-3.5">
          <div
            className="urgency-stripe-track flex w-max"
            onMouseEnter={slow}
            onMouseLeave={restore}
          >
            <StripeTrack items={URGENCY_STRIPE_ITEMS} />
            <StripeTrack items={URGENCY_STRIPE_ITEMS} />
            <StripeTrack items={URGENCY_STRIPE_ITEMS} />
            <StripeTrack items={URGENCY_STRIPE_ITEMS} />
          </div>
        </div>
      </button>
    </div>
  )
}
