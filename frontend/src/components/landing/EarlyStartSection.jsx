'use client'

import { CalendarClock, Sun, TrendingUp } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import RevealOnScroll from './ui/RevealOnScroll'
import {
  EARLY_START_BENEFITS,
  EARLY_START_HEADING,
  EARLY_START_SUB,
} from '../../data/landingContent'

const ICONS = [CalendarClock, Sun, TrendingUp]

export default function EarlyStartSection() {
  return (
    <SectionShell variant="white">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <h2 className="section-heading">{EARLY_START_HEADING}</h2>
          <p className="section-sub mx-auto">{EARLY_START_SUB}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {EARLY_START_BENEFITS.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <UmsCard key={item.title} className="h-full">
                <div className="ums-icon-chip mb-4 w-12 h-12">
                  <Icon className="w-6 h-6 text-ums-accent" aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-[#111] mb-3">{item.title}</h3>
                <p className="text-ums-muted text-sm leading-relaxed">{item.description}</p>
              </UmsCard>
            )
          })}
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
