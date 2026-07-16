'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import UmsButton from './ui/UmsButton'
import UmsBadge from './ui/UmsBadge'
import { COUNTDOWN_TARGET, COUNTDOWN_COPY } from '../../data/landingContent'

function getTimeLeft(target) {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  }
}

function TimeBlock({ value, label }) {
  return (
    <div className="text-center min-w-[4.5rem] px-3 py-4 bg-[#fafafa] border border-ums-border rounded-[20px]">
      <div className="text-3xl sm:text-4xl font-black text-[#111] tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs text-ums-muted uppercase tracking-wider mt-1">{label}</div>
    </div>
  )
}

export default function CountdownSection({ onOpenModal }) {
  const [time, setTime] = useState(() => getTimeLeft(COUNTDOWN_TARGET))

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const id = setInterval(() => {
      setTime(getTimeLeft(COUNTDOWN_TARGET))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <SectionShell variant="tint">
      <UmsCard padding="lg" className="max-w-3xl mx-auto text-center" hover={false}>
        <div className="flex justify-center mb-6">
          <UmsBadge variant="accent">{COUNTDOWN_COPY.badge}</UmsBadge>
        </div>

        <h2 className="section-heading">
          {time.expired ? COUNTDOWN_COPY.titleExpired : COUNTDOWN_COPY.title}
        </h2>
        <p className="section-sub mx-auto mb-10">{COUNTDOWN_COPY.body}</p>

        {!time.expired && (
          <div className="flex justify-center gap-3 sm:gap-4 mb-10 flex-wrap">
            <TimeBlock value={time.days} label="дни" />
            <TimeBlock value={time.hours} label="часы" />
            <TimeBlock value={time.minutes} label="минуты" />
            <TimeBlock value={time.seconds} label="секунды" />
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-ums-muted text-sm mb-6">
          <Clock className="w-4 h-4 text-ums-accent" aria-hidden />
          <span>{COUNTDOWN_COPY.bonus}</span>
        </div>

        <UmsButton onClick={() => onOpenModal?.({})} className="px-8">
          {COUNTDOWN_COPY.cta}
        </UmsButton>
      </UmsCard>
    </SectionShell>
  )
}
