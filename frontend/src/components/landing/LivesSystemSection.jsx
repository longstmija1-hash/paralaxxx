'use client'

import Image from 'next/image'
import { Heart, Skull } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import WaveAccent from './ui/WaveAccent'
import {
  LIVES_ROWS,
  LIVES_BODY,
  LIVES_FOOTNOTE,
} from '../../data/landingContent'

function LivesIcon({ count }) {
  if (count === 0) return <Skull className="w-6 h-6 text-[#111]" aria-hidden />
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <Heart
          key={i}
          className={`w-5 h-5 ${i < count ? 'text-[#111] fill-[#111]/10' : 'text-[#d1d5db]'}`}
          aria-hidden
        />
      ))}
    </div>
  )
}

export default function LivesSystemSection() {
  return (
    <SectionShell id="lives" variant="tint">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <UmsCard padding="lg">
          <h2 className="section-heading text-2xl md:text-3xl mb-4">
            Дисциплина работает сама. <WaveAccent variant="bounce">Без нервов родителей</WaveAccent>.
          </h2>
          <p className="text-ums-muted mb-6">{LIVES_BODY}</p>
          <div className="space-y-3">
            {LIVES_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-start gap-4 p-4 rounded-[20px] bg-[#fafafa] border border-ums-border"
              >
                <LivesIcon count={row.lives} />
                <div>
                  <div className="font-semibold text-[#111] text-sm">{row.label}</div>
                  <div className="text-ums-muted text-xs mt-0.5">{row.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </UmsCard>

        <div>
          <div className="relative overflow-hidden rounded-[28px] border border-[#dce3ff] bg-ums-tint aspect-[16/10] shadow-[0_12px_40px_rgba(124,145,249,0.12)]">
            <Image
              src="/images/lives-system.jpg"
              alt="Система трёх жизней: статус ученика, коины и награды за вовремя сданную домашку"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>
          <p className="text-ums-muted text-sm mt-6">{LIVES_FOOTNOTE}</p>
        </div>
      </div>
    </SectionShell>
  )
}
