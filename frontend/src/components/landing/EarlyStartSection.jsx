'use client'

import { CalendarClock, Sun, TrendingUp } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import RevealOnScroll from './ui/RevealOnScroll'
import WaveAccent from './ui/WaveAccent'
import {
  EARLY_START_BENEFITS,
  EARLY_START_SUB,
} from '../../data/landingContent'

const ICONS = [CalendarClock, Sun, TrendingUp]

const ORBIT_VARIANTS = ['price', 'start', 'dual']

function BenefitOrbit({ variant }) {
  if (variant === 'price') {
    return (
      <div className="early-orbit" aria-hidden="true">
        <svg viewBox="0 0 160 160" className="early-orbit-spin absolute inset-0 h-full w-full">
          <circle
            cx="80"
            cy="80"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            className="text-ums-accent/35"
          />
          <circle cx="80" cy="22" r="4" className="fill-ums-accent/70" />
        </svg>
        <svg viewBox="0 0 160 160" className="early-orbit-spin-rev absolute inset-0 h-full w-full">
          <circle
            cx="80"
            cy="80"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 8"
            className="text-ums-coral/40"
          />
          <circle cx="122" cy="80" r="3" className="fill-ums-coral/80" />
        </svg>
        <div className="absolute inset-[28%] rounded-full border border-[#dce3ff] bg-white/70 backdrop-blur-[2px]" />
      </div>
    )
  }

  if (variant === 'start') {
    return (
      <div className="early-orbit" aria-hidden="true">
        <svg viewBox="0 0 160 160" className="early-orbit-spin absolute inset-0 h-full w-full">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect
              key={deg}
              x="78"
              y="14"
              width="4"
              height="16"
              rx="2"
              className="fill-ums-accent/45"
              transform={`rotate(${deg} 80 80)`}
            />
          ))}
          <circle
            cx="80"
            cy="80"
            r="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-ums-accent/25"
          />
        </svg>
        <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-ums-tint to-white border border-[#dce3ff]" />
        <div className="early-orbit-pulse absolute inset-[38%] rounded-full bg-ums-accent/15" />
      </div>
    )
  }

  return (
    <div className="early-orbit" aria-hidden="true">
      <svg viewBox="0 0 160 160" className="early-orbit-spin absolute inset-0 h-full w-full">
        <path
          d="M80 22a58 58 0 0 1 0 116"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-ums-accent/45"
        />
        <circle cx="80" cy="22" r="4.5" className="fill-ums-accent" />
      </svg>
      <svg viewBox="0 0 160 160" className="early-orbit-spin-rev absolute inset-0 h-full w-full">
        <path
          d="M80 138a58 58 0 0 1 0-116"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-ums-coral/45"
        />
        <circle cx="80" cy="138" r="4.5" className="fill-ums-coral" />
      </svg>
      <div className="absolute inset-[32%] rounded-full border border-[#dce3ff] bg-white/80" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ums-accent" />
    </div>
  )
}

export default function EarlyStartSection() {
  return (
    <SectionShell variant="white">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Займите место сейчас, чтобы избежать <WaveAccent variant="bounce">хаоса осенью</WaveAccent>
          </h2>
          <p className="section-sub mx-auto">{EARLY_START_SUB}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {EARLY_START_BENEFITS.map((item, i) => {
            const Icon = ICONS[i]
            const orbit = ORBIT_VARIANTS[i]

            return (
              <UmsCard
                key={item.title}
                className="early-benefit-card group relative h-full min-h-0 overflow-hidden sm:min-h-[220px]"
              >
                <BenefitOrbit variant={orbit} />

                <div className="relative z-[1]">
                  <div className="ums-icon-chip mb-4 h-12 w-12 transition-transform duration-300 ease-out group-hover:rotate-12">
                    <Icon className="h-6 w-6 text-ums-accent" aria-hidden />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-[#111]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-ums-muted">{item.description}</p>
                </div>
              </UmsCard>
            )
          })}
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
