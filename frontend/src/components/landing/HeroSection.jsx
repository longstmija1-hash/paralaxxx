'use client'

import Image from 'next/image'
import LeadForm from './LeadForm'
import UmsCard from './ui/UmsCard'
import UmsButton from './ui/UmsButton'
import WaveAccent from './ui/WaveAccent'
import { HERO_CONTENT } from '../../data/landingContent'

function HeroVisual({ className = '', priority = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] sm:rounded-[28px] border border-[#dce3ff] bg-ums-tint shadow-[0_12px_36px_rgba(124,145,249,0.14)] ${className}`}
    >
      <Image
        src="/images/hero-platform.jpg"
        alt="Школа и IT в единой образовательной системе Параллакс"
        width={1024}
        height={558}
        priority={priority}
        className="w-full h-auto aspect-[16/9] object-cover"
        sizes="(max-width: 1024px) 100vw, 560px"
      />
    </div>
  )
}

export default function HeroSection({ onOpenModal }) {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col overflow-hidden pt-[4.75rem] sm:pt-[5.5rem] md:pt-[6.25rem] bg-ums-bg lg:min-h-[100svh]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(124,145,249,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 35% at 50% 85%, rgba(255,107,91,0.05) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-4 sm:py-8 md:py-10 flex-grow">
        <div className="grid lg:grid-cols-2 gap-7 sm:gap-8 lg:gap-14 items-start">
          <div className="hero-copy mx-auto w-full max-w-md text-center sm:max-w-xl sm:text-left lg:mx-0 lg:max-w-none lg:pt-2">
            <div
              className="hero-reveal flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-x-3 sm:gap-y-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dce3ff] bg-ums-tint px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ums-accent">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="hero-status-ping absolute inline-flex h-full w-full rounded-full bg-ums-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ums-accent" />
                </span>
                {HERO_CONTENT.badge}
              </span>
              <p className="text-[11px] sm:text-sm text-ums-muted leading-snug max-w-[16rem] sm:max-w-none">
                {HERO_CONTENT.eyebrow}
              </p>
            </div>

            <h1
              className="hero-reveal mt-5 sm:mt-7 text-[1.55rem] sm:text-[2.15rem] md:text-[2.65rem] lg:text-[2.85rem] font-bold leading-[1.18] text-[#111] font-display tracking-tight text-balance"
              style={{ animationDelay: '120ms' }}
            >
              <span className="block">{HERO_CONTENT.titleLine1}</span>
              <span className="block">{HERO_CONTENT.titleLine2}</span>
              <WaveAccent
                variant="flow"
                className="mt-1.5 sm:mt-1 mx-auto sm:mx-0"
              >
                {HERO_CONTENT.titleAccentLine}
              </WaveAccent>
            </h1>

            <HeroVisual className="mt-5 mx-auto max-w-sm sm:max-w-none lg:hidden" priority />

            <p
              className="hero-reveal mt-4 sm:mt-5 text-[0.95rem] sm:text-lg text-ums-muted leading-relaxed mx-auto sm:mx-0 max-w-[20rem] sm:max-w-lg"
              style={{ animationDelay: '180ms' }}
            >
              <span className="sm:hidden">{HERO_CONTENT.subtitleMobile}</span>
              <span className="hidden sm:inline">{HERO_CONTENT.subtitle}</span>
            </p>

            <div
              className="hero-reveal mt-5 sm:mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:items-stretch sm:gap-0"
              style={{ animationDelay: '240ms' }}
              aria-label="Два образовательных трека"
            >
              {HERO_CONTENT.tracks.map((track, i) => (
                <div key={track.label} className="flex items-stretch sm:contents">
                  {i > 0 && (
                    <div
                      className="hidden sm:flex items-center px-3 text-ums-accent/50 font-display text-lg font-bold"
                      aria-hidden="true"
                    >
                      ‖
                    </div>
                  )}
                  <a
                    href="#courses"
                    className="group flex-1 min-w-0 rounded-2xl border border-[#dce3ff] bg-white/90 px-2.5 py-3 sm:border-transparent sm:bg-transparent sm:px-1 sm:py-1 sm:-mx-1 transition-colors duration-200 hover:border-[#dce3ff] hover:bg-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent/40"
                  >
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-ums-accent mb-1">
                      {track.label}
                    </div>
                    <div className="text-[12px] sm:text-sm text-[#111] font-semibold leading-snug group-hover:text-ums-accent transition-colors duration-200">
                      {track.hint}
                    </div>
                  </a>
                </div>
              ))}
            </div>

            <div
              className="hero-reveal mt-5 sm:mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-start"
              style={{ animationDelay: '300ms' }}
            >
              <UmsButton
                onClick={() => onOpenModal?.({})}
                className="w-full sm:w-auto shadow-[0_8px_24px_rgba(17,17,17,0.12)] hover:shadow-[0_10px_28px_rgba(17,17,17,0.16)] transition-shadow duration-200"
              >
                {HERO_CONTENT.primaryCta}
              </UmsButton>
              <UmsButton variant="secondary" href="#courses" className="w-full sm:w-auto">
                {HERO_CONTENT.secondaryCta}
              </UmsButton>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <HeroVisual className="hidden lg:block" />
            <UmsCard hover={false} padding="sm" className="sm:!p-7 !rounded-[20px] sm:!rounded-[28px]">
              <LeadForm variant="inline" id="hero-lead-form" />
            </UmsCard>
          </div>
        </div>
      </div>
    </section>
  )
}
