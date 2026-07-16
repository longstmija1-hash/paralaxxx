'use client'

import LeadForm from './LeadForm'
import UmsCard from './ui/UmsCard'
import UmsButton from './ui/UmsButton'
import UmsBadge from './ui/UmsBadge'
import MediaPlaceholder from './ui/MediaPlaceholder'
import CountUpStat from './ui/CountUpStat'
import { HERO_STATS } from '../../data/landingContent'

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
            'radial-gradient(ellipse 70% 55% at 70% 20%, rgba(124,145,249,0.14) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 15% 80%, rgba(124,145,249,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-10 flex-grow">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <div>
            <UmsBadge variant="accent">Набор открыт</UmsBadge>
            <p className="text-xs sm:text-sm text-ums-muted mt-2.5 mb-4 sm:mb-6">
              Мест с максимальной скидкой ограничено
            </p>

            <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] mb-4 sm:mb-6 text-[#111] font-display tracking-tight">
              Подготовим к{' '}
              <span className="text-ums-accent">ЕГЭ и ОГЭ</span>
              {' '}и прокачаем школьные оценки
            </h1>

            <p className="text-base sm:text-lg text-ums-muted max-w-xl mb-5 sm:mb-8">
              Школьные предметы, экзамены и IT-курсы на одной платформе. Кураторы, разбор ДЗ и
              понятный прогресс — без зубрёжки и хаоса.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3 mb-5 sm:mb-8">
              {HERO_STATS.map((s) => (
                <CountUpStat
                  key={s.label}
                  value={s.value}
                  label={s.label}
                  shortLabel={s.shortLabel}
                  className="ums-card ums-stat-accent px-2.5 py-2.5 sm:px-4 sm:py-3 min-w-0 sm:min-w-[7rem]"
                  valueClassName="text-xl sm:text-3xl font-black text-[#111] leading-none"
                  labelClassName="text-[10px] sm:text-xs text-ums-muted mt-1 leading-tight"
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6 lg:hidden">
              <UmsButton onClick={() => onOpenModal?.({})} className="w-full sm:w-auto">
                Записаться
              </UmsButton>
              <UmsButton variant="secondary" href="#courses" className="w-full sm:w-auto">
                Посмотреть курсы
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
