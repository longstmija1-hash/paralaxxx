'use client'

import LeadForm from './LeadForm'
import UmsCard from './ui/UmsCard'
import UmsButton from './ui/UmsButton'
import MediaPlaceholder from './ui/MediaPlaceholder'
import { HERO_CONTENT } from '../../data/landingContent'

export default function HeroSection({ onOpenModal }) {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col overflow-hidden pt-[5.25rem] sm:pt-[5.5rem] md:pt-[6.25rem] bg-ums-bg lg:min-h-[100svh]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 50% at 85% 10%, rgba(124,145,249,0.16) 0%, transparent 55%), radial-gradient(ellipse 45% 35% at 8% 75%, rgba(255,107,91,0.06) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-10 flex-grow">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <div className="hero-copy max-w-xl lg:max-w-none lg:pt-2">
            <p className="hero-reveal font-display text-[1.65rem] sm:text-3xl md:text-[2.15rem] font-bold tracking-[0.08em] text-[#111] leading-none">
              {HERO_CONTENT.brand}
            </p>

            <div
              className="hero-reveal mt-4 sm:mt-5 flex flex-wrap items-center gap-x-3 gap-y-2"
              style={{ animationDelay: '60ms' }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dce3ff] bg-ums-tint px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ums-accent">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="hero-status-ping absolute inline-flex h-full w-full rounded-full bg-ums-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ums-accent" />
                </span>
                {HERO_CONTENT.badge}
              </span>
              <p className="text-xs sm:text-sm text-ums-muted">{HERO_CONTENT.eyebrow}</p>
            </div>

            <h1
              className="hero-reveal mt-5 sm:mt-7 text-[1.55rem] sm:text-[2.15rem] md:text-[2.65rem] lg:text-[2.85rem] font-bold leading-[1.12] text-[#111] font-display tracking-tight"
              style={{ animationDelay: '120ms' }}
            >
              <span className="sm:hidden">
                {HERO_CONTENT.titleBefore} —{' '}
                <span className="text-ums-accent">{HERO_CONTENT.titleAccent}</span>
              </span>
              <span className="hidden sm:block">
                <span className="block">{HERO_CONTENT.titleLine1}</span>
                <span className="block">{HERO_CONTENT.titleLine2}</span>
                <span className="mt-1 inline-block border-b-[3px] border-ums-accent/40 pb-0.5 text-ums-accent">
                  {HERO_CONTENT.titleAccentLine}
                </span>
              </span>
            </h1>

            <p
              className="hero-reveal mt-4 sm:mt-5 text-base sm:text-lg text-ums-muted leading-relaxed max-w-lg"
              style={{ animationDelay: '180ms' }}
            >
              {HERO_CONTENT.subtitle}
            </p>

            <div
              className="hero-reveal mt-6 sm:mt-7 flex flex-col sm:flex-row sm:items-stretch gap-3 sm:gap-0"
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
                    className="group flex-1 min-w-0 rounded-2xl border border-transparent px-1 py-1 -mx-1 transition-colors duration-200 hover:border-[#dce3ff] hover:bg-white/70 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent/40"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-ums-accent mb-1">
                      {track.label}
                    </div>
                    <div className="text-sm text-[#111] font-semibold leading-snug group-hover:text-ums-accent transition-colors duration-200">
                      {track.hint}
                    </div>
                  </a>
                </div>
              ))}
            </div>

            <div
              className="hero-reveal mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3"
              style={{ animationDelay: '300ms' }}
            >
              <UmsButton onClick={() => onOpenModal?.({})} className="w-full sm:w-auto shadow-[0_8px_24px_rgba(17,17,17,0.12)] hover:shadow-[0_10px_28px_rgba(17,17,17,0.16)] transition-shadow duration-200">
                {HERO_CONTENT.primaryCta}
              </UmsButton>
              <UmsButton variant="secondary" href="#courses" className="w-full sm:w-auto">
                {HERO_CONTENT.secondaryCta}
              </UmsButton>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <div className="lg:hidden">
              <MediaPlaceholder label="Фото платформы / учеников" aspect="16/10" />
            </div>
            <div className="hidden lg:block">
              <MediaPlaceholder label="Фото платформы / учеников" aspect="4/3" />
            </div>
            <UmsCard hover={false} padding="sm" className="sm:!p-7">
              <LeadForm variant="inline" id="hero-lead-form" />
            </UmsCard>
          </div>
        </div>
      </div>
    </section>
  )
}
