'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import UmsButton from './ui/UmsButton'
import RevealOnScroll from './ui/RevealOnScroll'
import { TESTIMONIALS } from '../../data/landingContent'

const AVATAR_COLORS = ['#7c91f9', '#a78bfa', '#64748b', '#94a3b8', '#6366f1', '#0ea5e9']

function initials(name) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function TestimonialsSection({ onOpenModal }) {
  const [index, setIndex] = useState(0)
  const current = TESTIMONIALS[index]

  const prev = () => setIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1))

  return (
    <SectionShell id="reviews" variant="tint">
      <RevealOnScroll>
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="section-heading">Результаты и истории учеников</h2>
          <p className="section-sub mx-auto text-base sm:text-lg">Отзывы наших учеников и родителей</p>
        </div>

        <UmsCard padding="sm" className="max-w-4xl mx-auto relative sm:!p-8" hover={false}>
          <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#ececec] absolute top-4 left-4 sm:top-6 sm:left-6" aria-hidden />

          <div className="pt-6 sm:pt-8 px-1 sm:px-6 pb-2">
            <div className="flex gap-1 mb-3 sm:mb-4">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-200" aria-hidden />
              ))}
            </div>

            <p className="text-ums-muted text-base sm:text-lg leading-relaxed mb-5 sm:mb-6 min-h-[5rem] sm:min-h-[6rem]">
              {current.text}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
                  aria-hidden
                >
                  {initials(current.name)}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[#111] truncate">{current.name}</div>
                  <div className="text-sm text-ums-muted truncate">{current.role}</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={prev}
                  className="w-11 h-11 rounded-full border border-ums-border flex items-center justify-center text-[#111] hover:bg-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent transition-colors duration-200 cursor-pointer bg-white"
                  aria-label="Предыдущий отзыв"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-ums-muted tabular-nums min-w-[2.5rem] text-center">
                  {index + 1}/{TESTIMONIALS.length}
                </span>
                <button
                  type="button"
                  onClick={next}
                  className="w-11 h-11 rounded-full border border-ums-border flex items-center justify-center text-[#111] hover:bg-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent transition-colors duration-200 cursor-pointer bg-white"
                  aria-label="Следующий отзыв"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 pb-3 sm:pb-4">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent ${
                  i === index ? 'bg-ums-accent' : 'bg-[#d1d5db] hover:bg-[#9ca3af]'
                }`}
                aria-label={`Отзыв ${i + 1}`}
              />
            ))}
          </div>
        </UmsCard>

        <div className="text-center mt-8 sm:mt-10">
          <UmsButton onClick={() => onOpenModal?.({})} className="px-8 w-full sm:w-auto max-w-xs">
            Записаться
          </UmsButton>
          <p className="text-sm text-ums-muted mt-3 px-2">
            Присоединяйся к ученикам с реальными результатами
          </p>
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
