"use client";

import { MARQUEE_ITEMS } from '../data/landingContent'

export default function AnnouncementMarquee() {
  const text = MARQUEE_ITEMS.join('  •  ')
  const repeatedText = [...Array(2)].map((_, i) => (
    <span key={i} className="mx-6 sm:mx-8 whitespace-nowrap">{text}</span>
  ))

  const handleMouseEnter = (e) => {
    const anims = e.currentTarget.getAnimations()
    anims.forEach((anim) => {
      anim.playbackRate = 0.25
    })
  }

  const handleMouseLeave = (e) => {
    const anims = e.currentTarget.getAnimations()
    anims.forEach((anim) => {
      anim.playbackRate = 1
    })
  }

  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-animation {
          animation: ticker-scroll 40s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-animation {
            animation: none;
          }
        }
      `}</style>
      <div className="fixed top-14 left-0 right-0 z-40 h-8 sm:h-9 bg-white border-b border-ums-border overflow-hidden flex items-center">
        <div
          className="flex shrink-0 ticker-animation text-xs sm:text-sm font-medium w-max cursor-default"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex shrink-0 px-3 sm:px-4 text-[#111]">
            {repeatedText}
          </div>
          <div className="flex shrink-0 px-3 sm:px-4 text-[#111]">
            {repeatedText}
          </div>
        </div>
      </div>
    </>
  )
}
