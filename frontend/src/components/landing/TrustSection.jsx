'use client'

import Image from 'next/image'
import { BookOpen, Code2, MessageCircle, Users } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import CountUpStat from './ui/CountUpStat'
import RevealOnScroll from './ui/RevealOnScroll'
import WaveAccent from './ui/WaveAccent'
import {
  TRUST_CAPTION,
  TRUST_STATS,
  TRUST_SUB,
} from '../../data/landingContent'

const ICONS = [BookOpen, Code2, MessageCircle, Users]

export default function TrustSection() {
  return (
    <SectionShell variant="white">
      <RevealOnScroll>
        <div className="mb-10 max-w-2xl md:mb-14 text-left">
          <p className="mb-2 sm:mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ums-accent">
            Почему Параллакс
          </p>
          <h2 className="section-heading !mb-2 sm:!mb-4">
            ПАРАЛЛАКС — это система, которая даёт{' '}
            <WaveAccent variant="arc">результат</WaveAccent>
          </h2>
          <p className="mt-2 sm:mt-3 text-[0.95rem] leading-relaxed text-ums-muted sm:text-lg">{TRUST_SUB}</p>
        </div>

        <div className="grid items-stretch gap-5 sm:gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative overflow-hidden rounded-[22px] sm:rounded-[32px] border border-[#dce3ff] bg-gradient-to-br from-ums-tint via-white to-[#f7f8ff] lg:col-span-5">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ums-accent/10 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-ums-coral/10 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative aspect-[16/10] sm:aspect-[5/6] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
              <Image
                src="/images/hero-platform.jpg"
                alt="Школа и IT на одной платформе Параллакс"
                fill
                className="object-cover object-center opacity-95"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/55 via-[#111]/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ums-accent">
                    Фундамент
                  </span>
                  <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ums-coral">
                    IT
                  </span>
                </div>
                <p className="font-display text-lg font-bold leading-snug text-white sm:text-xl">
                  {TRUST_CAPTION}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="divide-y divide-[#ececec] overflow-hidden rounded-[20px] sm:rounded-[28px] border border-[#ececec] bg-[#fafafa]/60">
              {TRUST_STATS.map((stat, i) => {
                const Icon = ICONS[i]
                return (
                  <div
                    key={stat.label}
                    className="group flex items-center gap-3 px-4 py-4 transition-colors duration-200 hover:bg-white sm:gap-5 sm:px-6 sm:py-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#dce3ff] bg-white transition-colors duration-200 group-hover:border-ums-accent/30">
                      <Icon className="h-5 w-5 text-ums-accent" aria-hidden />
                    </div>

                    <CountUpStat
                      value={stat.value}
                      label={stat.hint}
                      className="min-w-0 flex-1"
                      valueClassName="font-display text-2xl font-bold tracking-tight text-[#111] sm:text-3xl"
                      labelClassName="mt-0.5 text-sm text-ums-muted"
                    />

                    <span className="hidden shrink-0 rounded-full border border-ums-border bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ums-muted sm:inline-flex">
                      {stat.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
