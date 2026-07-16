'use client'

import { CheckCircle2, Sparkles, TrendingUp, Users } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import RevealOnScroll from './ui/RevealOnScroll'
import { WHY_START_NOW } from '../../data/landingContent'

const STAT_ICONS = [Users, TrendingUp]

export default function WhyStartNowSection() {
  return (
    <SectionShell variant="white">
      <RevealOnScroll>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-ums-tint border border-[#dce3ff] rounded-full text-ums-accent text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" aria-hidden />
              {WHY_START_NOW.chip}
            </div>
            <h2 className="section-heading">{WHY_START_NOW.headline}</h2>
            <p className="text-ums-muted leading-relaxed mb-6">{WHY_START_NOW.body}</p>
            <ul className="space-y-3">
              {WHY_START_NOW.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ums-muted">
                  <CheckCircle2 className="w-5 h-5 text-ums-accent shrink-0 mt-0.5" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { label: 'Два трека — одна система', value: 'Школа + IT' },
              { label: 'Дисциплина без контроля', value: '3 жизни' },
            ].map((stat, i) => {
              const Icon = STAT_ICONS[i]
              return (
                <div key={stat.label} className="ums-stat-row flex-col sm:flex-row items-start sm:items-center">
                  <div>
                    <div className="text-2xl font-black text-[#111] font-display">{stat.value}</div>
                    <div className="text-xs text-ums-muted mt-1">{stat.label}</div>
                  </div>
                  <div className="ums-icon-chip w-10 h-10 sm:ml-auto">
                    <Icon className="w-5 h-5 text-ums-accent" aria-hidden />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
