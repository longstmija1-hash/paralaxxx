'use client'

import {
  BookOpen,
  Heart,
  Lightbulb,
  LineChart,
  PlayCircle,
  ScrollText,
} from 'lucide-react'
import SectionShell from './ui/SectionShell'
import RevealOnScroll from './ui/RevealOnScroll'
import WaveAccent from './ui/WaveAccent'
import { PLATFORM_FEATURES, PLATFORM_SUB } from '../../data/landingContent'

const ICONS = [BookOpen, Lightbulb, LineChart, Heart, PlayCircle, ScrollText]

export default function PlatformFeaturesSection() {
  return (
    <SectionShell id="how" variant="tint">
      <RevealOnScroll>
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ums-accent">
            Как устроена платформа
          </p>
          <h2 className="section-heading">
            Учёба, в которую хочется <WaveAccent variant="ripple">возвращаться</WaveAccent>
          </h2>
          <p className="section-sub mx-auto">{PLATFORM_SUB}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {PLATFORM_FEATURES.map((feature, i) => {
            const Icon = ICONS[i]

            return (
              <article
                key={feature.title}
                className="group relative h-full overflow-hidden rounded-[28px] border border-[#dce3ff] bg-white p-6 transition-colors duration-200 hover:border-ums-accent/40 sm:p-7"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-ums-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#dce3ff] bg-ums-tint transition-colors duration-200 group-hover:border-ums-accent/30">
                    <Icon className="h-5 w-5 text-ums-accent" aria-hidden />
                  </div>
                  <span className="font-display pt-1 text-xs font-bold tabular-nums tracking-wider text-ums-accent/45">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mb-2 text-base font-bold leading-snug text-[#111] sm:text-[17px]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-ums-muted">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
