'use client'

import { Heart, Layers2, Sparkles } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import RevealOnScroll from './ui/RevealOnScroll'
import WaveAccent from './ui/WaveAccent'
import { WHY_START_NOW } from '../../data/landingContent'

const PILLAR_ICONS = [Layers2, Heart]

export default function WhyStartNowSection() {
  return (
    <SectionShell variant="white">
      <RevealOnScroll>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dce3ff] bg-ums-tint px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ums-accent">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {WHY_START_NOW.chip}
            </div>

            <h2 className="section-heading max-w-xl">
              Месяцы без системы — это <WaveAccent variant="brush">упущенное время</WaveAccent> и нервы
            </h2>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-ums-muted sm:text-lg">
              {WHY_START_NOW.body}
            </p>

            <ol className="space-y-0">
              {WHY_START_NOW.highlights.map((item, i) => (
                <li
                  key={item.title}
                  className="group relative flex gap-4 border-t border-[#ececec] py-4 last:border-b sm:gap-5 sm:py-5"
                >
                  <span className="font-display w-8 shrink-0 pt-0.5 text-sm font-bold tabular-nums tracking-wider text-ums-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="mb-1 text-base font-bold text-[#111] transition-colors duration-200 group-hover:text-ums-accent">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ums-muted sm:text-[15px]">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6 lg:pt-2">
            <div className="why-panel relative overflow-hidden rounded-[32px] border border-[#dce3ff] bg-gradient-to-br from-ums-tint via-white to-[#f7f8ff] p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ums-accent/10 blur-2xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-ums-coral/10 blur-2xl"
                aria-hidden="true"
              />

              <p className="relative z-[1] mb-6 text-[11px] font-bold uppercase tracking-[0.16em] text-ums-accent">
                {WHY_START_NOW.panelTitle}
              </p>

              <div className="relative z-[1] space-y-4">
                {WHY_START_NOW.pillars.map((pillar, i) => {
                  const Icon = PILLAR_ICONS[i]
                  return (
                    <div key={pillar.label} className="relative">
                      {i < WHY_START_NOW.pillars.length - 1 && (
                        <div
                          className="absolute left-[1.35rem] top-[3.4rem] h-[calc(100%+0.35rem)] w-px bg-gradient-to-b from-ums-accent/40 to-ums-coral/40"
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex items-start gap-4 rounded-[24px] border border-white/80 bg-white/80 p-4 shadow-[0_8px_24px_rgba(124,145,249,0.08)] backdrop-blur-[2px] transition-colors duration-200 hover:border-ums-accent/25 sm:p-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#dce3ff] bg-ums-tint">
                          <Icon className="h-5 w-5 text-ums-accent" aria-hidden />
                        </div>
                        <div className="min-w-0">
                          <div className="font-display text-xl font-bold tracking-tight text-[#111] sm:text-2xl">
                            {pillar.value}
                          </div>
                          <div className="mt-1 text-sm font-semibold text-[#111]">
                            {pillar.label}
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-ums-muted">
                            {pillar.hint}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="relative z-[1] mt-6 border-t border-[#dce3ff]/80 pt-5 text-sm leading-relaxed text-ums-muted">
                Один ритм. Два результата. Без пяти разных репетиторов.
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
