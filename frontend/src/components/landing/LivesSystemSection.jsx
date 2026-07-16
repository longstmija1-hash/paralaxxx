'use client'

import { Heart, Skull } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import MediaPlaceholder from './ui/MediaPlaceholder'
import { LIVES_ROWS } from '../../data/landingContent'

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
          <h2 className="section-heading text-2xl md:text-3xl mb-4">Система 3-х жизней</h2>
          <p className="text-ums-muted mb-6">
            Каждый месяц ты получаешь <span className="text-[#111] font-semibold">3 жизни</span>.
            Не сдал домашку до дедлайна — сгорает 1 жизнь. Это мотивирует заниматься регулярно.
          </p>
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
          <MediaPlaceholder label="Скриншот системы жизней" aspect="16/10" />
          <p className="text-ums-muted text-sm mt-6">
            Это <span className="text-[#111] font-medium">мотивирует</span> детей и радует родителей — ребёнок
            делает всё сам.
          </p>
        </div>
      </div>
    </SectionShell>
  )
}
