'use client'

import { CalendarX2, Eye, Gamepad2, Hourglass, Quote } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import UmsButton from './ui/UmsButton'
import RevealOnScroll from './ui/RevealOnScroll'
import WaveAccent from './ui/WaveAccent'
import {
  PAIN_POINTS,
  PAIN_POINTS_CTA,
  PAIN_POINTS_NOTE,
  PAIN_POINTS_SUB,
} from '../../data/landingContent'

const ICONS = [CalendarX2, Eye, Hourglass, Gamepad2]

export default function PainPointsSection({ onScrollToForm }) {
  return (
    <SectionShell variant="tint">
      <RevealOnScroll>
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ums-accent">
            Знакомые ситуации
          </p>
          <h2 className="section-heading">
            Мы знаем, с чем вы сталкиваетесь <WaveAccent variant="zigzag">каждый год</WaveAccent>
          </h2>
          <p className="section-sub mx-auto">{PAIN_POINTS_SUB}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {PAIN_POINTS.map((item, i) => {
            const Icon = ICONS[i]

            return (
              <article
                key={item.id}
                className="pain-quote group relative overflow-hidden rounded-[22px] sm:rounded-[28px] border border-[#dce3ff] bg-white/90 py-4 pl-6 pr-4 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-colors duration-200 hover:border-ums-accent/40 hover:bg-white sm:py-6 sm:pl-8 sm:pr-6"
              >
                <div
                  className="pointer-events-none absolute -right-3 -top-4 font-display text-[5.5rem] leading-none text-ums-accent/[0.07] transition-colors duration-200 group-hover:text-ums-accent/15"
                  aria-hidden="true"
                >
                  ”
                </div>

                <div className="relative z-[1] mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#dce3ff] bg-ums-tint transition-colors duration-200 group-hover:border-ums-accent/30">
                    <Icon className="h-5 w-5 text-ums-accent" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-xs font-bold tabular-nums tracking-wider text-ums-accent">
                      {item.id}
                    </div>
                    <div className="truncate text-sm font-semibold text-[#111]">{item.label}</div>
                  </div>
                  <Quote
                    className="ml-auto h-5 w-5 shrink-0 text-ums-coral/70"
                    aria-hidden
                  />
                </div>

                <p className="relative z-[1] text-base font-medium leading-relaxed text-[#222] sm:text-lg">
                  {item.quote}
                </p>

                <div
                  className="absolute inset-y-5 left-0 w-1 rounded-full bg-gradient-to-b from-ums-coral/80 to-ums-accent/50 opacity-80"
                  aria-hidden="true"
                />
              </article>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center sm:mt-14">
          <p className="max-w-md text-sm text-ums-muted">{PAIN_POINTS_NOTE}</p>
          <UmsButton onClick={onScrollToForm} className="px-8">
            {PAIN_POINTS_CTA}
          </UmsButton>
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
