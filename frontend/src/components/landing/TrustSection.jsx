'use client'

import { Award, Shield, TrendingUp, Users } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import MediaPlaceholder from './ui/MediaPlaceholder'
import CountUpStat from './ui/CountUpStat'
import RevealOnScroll from './ui/RevealOnScroll'
import { TRUST_STATS } from '../../data/landingContent'

const ICONS = [Users, TrendingUp, Award, Shield]

export default function TrustSection() {
  return (
    <SectionShell variant="white">
      <RevealOnScroll>
        <h2 className="section-heading mb-10 md:mb-14 max-w-2xl">
          ПАРАЛЛАКС помогает прийти к желаемому результату
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <MediaPlaceholder
            label="Групповое фото учеников"
            aspect="4/5"
            overlayText="100+ учеников уже с нами"
          />

          <div className="flex flex-col gap-4">
            {TRUST_STATS.map((stat, i) => {
              const Icon = ICONS[i]
              return (
                <div key={stat.label} className="ums-stat-row">
                  <CountUpStat
                    value={stat.value}
                    label={stat.label}
                    valueClassName="text-2xl sm:text-3xl font-black text-[#111]"
                    labelClassName="text-sm text-ums-muted mt-1"
                  />
                  <div className="ums-icon-chip w-12 h-12">
                    <Icon className="w-6 h-6 text-ums-accent" aria-hidden />
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
