'use client'

import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Check, ChevronDown } from 'lucide-react'
import PillToggle from './PillToggle'
import {
  PLAN_TRACKS,
  GRADES_BY_TRACK,
  getGradeConfig,
  TARIFF_MODAL_MAP,
} from '../../data/pricingMatrix'
import { formatPrice } from '../../lib/formatPrice'

function SubjectToggle({ options, value, onChange }) {
  return (
    <div className="inline-flex w-full bg-[#f5f5f5] rounded-full p-1">
      {options.map((opt) => {
        const active = value === opt.id
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`flex-1 py-2 px-1.5 sm:py-2.5 sm:px-3 rounded-full text-[11px] sm:text-sm font-semibold leading-tight transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent ${
              active ? 'bg-white text-[#111] shadow-sm' : 'text-[#9ca3af] hover:text-[#6b7280]'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function FeatureList({ tier, collapsed = false }) {
  const previewCount = 3
  const [open, setOpen] = useState(!collapsed)
  const features = tier.features
  const visible = open ? features : features.slice(0, previewCount)
  const hiddenCount = features.length - previewCount

  return (
    <div className="flex-grow">
      <p className="text-sm font-bold text-[#111] mb-3">Что входит в тариф:</p>
      {tier.includesTier && (
        <p className="text-sm text-[#6b7280] mb-3">
          Всё, что в тарифе «{tier.includesTier}», плюс:
        </p>
      )}
      <ul className="space-y-2.5">
        {visible.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-[#374151]">
            <Check className="w-4 h-4 text-[#111] shrink-0 mt-0.5" strokeWidth={2.5} aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {collapsed && hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ums-accent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent rounded-md"
        >
          {open ? 'Свернуть' : `Ещё ${hiddenCount}`}
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      )}
    </div>
  )
}

function PricingTierCard({
  tier,
  subjectKey,
  subjectOptions,
  onSubjectChange,
  onOpenModal,
  trackId,
  grade,
  className = '',
  compactFeatures = false,
}) {
  const availableOptions = subjectOptions.filter((o) => tier.prices[o.id])
  const effectiveKey = tier.prices[subjectKey]
    ? subjectKey
    : availableOptions[0]?.id
  const price = effectiveKey ? tier.prices[effectiveKey] : null
  const subjectLabel = availableOptions.find((o) => o.id === effectiveKey)?.label || ''

  if (!price) return null

  const isPopular = Boolean(tier.badge && /популяр/i.test(tier.badge))

  return (
    <article
      className={`relative flex flex-col bg-white rounded-[28px] p-5 sm:p-7 h-full transition-all duration-200 ${
        isPopular
          ? 'border-2 border-ums-accent shadow-[0_8px_32px_rgba(124,145,249,0.18)]'
          : 'border border-[#ececec] shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
      } ${className}`}
    >
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-ums-tint flex items-center justify-center">
        <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-ums-accent" aria-hidden />
      </div>

      <div className="flex items-center gap-2 mb-4 sm:mb-5 pr-14 sm:pr-16">
        <h3 className="text-xl sm:text-2xl font-black text-[#111]">{tier.name}</h3>
        {tier.badge && (
          <span
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wide ${
              isPopular ? 'bg-ums-accent text-white' : 'bg-[#111] text-white'
            }`}
          >
            {tier.badge}
          </span>
        )}
      </div>

      <div className="mb-4">
        <div className="text-[1.75rem] sm:text-[2.25rem] font-black text-[#111] leading-none tracking-tight">
          {formatPrice(price.current)} ₽
        </div>
        <div className="text-sm text-[#6b7280] mt-1">со скидкой на выбранный формат</div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-sm text-[#9ca3af] line-through">{formatPrice(price.original)} ₽</span>
          <span className="px-2 py-0.5 rounded-md bg-[#7c91f9] text-white text-xs font-bold">
            Скидка {price.discount}%
          </span>
        </div>
      </div>

      {availableOptions.length > 1 && (
        <div className="mb-5">
          <SubjectToggle
            options={availableOptions}
            value={effectiveKey}
            onChange={onSubjectChange}
          />
        </div>
      )}
      {availableOptions.length === 1 && (
        <p className="text-sm font-semibold text-[#111] mb-5 px-3 py-2 rounded-2xl bg-[#fafafa] border border-ums-border">
          {availableOptions[0].label}
        </p>
      )}

      <p className="text-sm text-[#6b7280] leading-relaxed mb-5">{tier.tagline}</p>

      <FeatureList tier={tier} collapsed={compactFeatures} />

      <button
        type="button"
        onClick={() =>
          onOpenModal?.({
            selectedTariff: TARIFF_MODAL_MAP[tier.id] || tier.id,
            selectedProgram: `Класс ${grade}, ${tier.name}, ${subjectLabel}, ${PLAN_TRACKS.find((t) => t.id === trackId)?.label}`,
          })
        }
        className="mt-6 sm:mt-8 w-full py-3.5 sm:py-4 rounded-full bg-[#111] text-white font-bold text-base hover:bg-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent focus-visible:ring-offset-2 transition-colors duration-200 cursor-pointer"
      >
        Записаться
      </button>
    </article>
  )
}

function PackageBlock({ items }) {
  const [open, setOpen] = useState(false)
  const restCount = Math.max(0, items.length - 2)

  return (
    <div className="bg-white border border-[#ececec] rounded-[28px] p-4 sm:p-8 mb-5 sm:mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      <h3 className="text-base sm:text-lg font-bold text-[#111] mb-3 sm:mb-4">Что в пакете:</h3>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {items.map((item, index) => (
          <li
            key={item}
            className={`items-start gap-2.5 text-sm text-[#374151] bg-[#fafafa] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 ${
              index >= 2 && !open ? 'hidden sm:flex' : 'flex'
            }`}
          >
            <Check className="w-4 h-4 text-ums-accent shrink-0 mt-0.5" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {restCount > 0 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ums-accent cursor-pointer"
        >
          {open ? 'Свернуть' : `Ещё ${restCount}`}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      )}
    </div>
  )
}

export default function PricingMatrixSection({ onOpenModal }) {
  const [trackId, setTrackId] = useState('year')
  const [grade, setGrade] = useState(9)
  const [subjectKey, setSubjectKey] = useState('focusSchool')
  const [mobileTierId, setMobileTierId] = useState(null)

  const grades = GRADES_BY_TRACK[trackId] || []
  const gradeConfig = useMemo(() => getGradeConfig(grade), [grade])

  const orderedTiers = useMemo(() => {
    if (!gradeConfig) return []
    return [...gradeConfig.tiers].sort((a, b) => {
      const aPop = a.badge && /популяр/i.test(a.badge) ? 0 : 1
      const bPop = b.badge && /популяр/i.test(b.badge) ? 0 : 1
      return aPop - bPop
    })
  }, [gradeConfig])

  useEffect(() => {
    if (!grades.includes(grade)) {
      setGrade(grades[0])
    }
  }, [grades, grade])

  useEffect(() => {
    if (!gradeConfig) return
    const first = gradeConfig.subjectOptions[0]?.id
    if (first && !gradeConfig.subjectOptions.some((o) => o.id === subjectKey)) {
      setSubjectKey(first)
    }
  }, [gradeConfig, subjectKey])

  useEffect(() => {
    if (!orderedTiers.length) return
    const popular = orderedTiers.find((t) => t.badge && /популяр/i.test(t.badge))
    setMobileTierId(popular?.id || orderedTiers[0].id)
  }, [orderedTiers])

  if (!gradeConfig) return null

  const gradeOptions = grades.map((g) => ({
    id: g,
    label: `Переходишь в ${g} класс`,
    shortLabel: `${g} кл`,
  }))

  const trackOptions = PLAN_TRACKS.map((t) => ({
    id: t.id,
    label: t.label,
    shortLabel: t.shortLabel,
  }))

  const activeMobileTier =
    orderedTiers.find((t) => t.id === mobileTierId) || orderedTiers[0]

  return (
    <section id="pricing" className="landing-section py-12 sm:py-20 md:py-24 px-4 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-4xl md:text-[2.75rem] font-black text-[#111] text-center mb-3 sm:mb-4 leading-tight font-display tracking-tight">
          Выберите формат участия на учебный год
        </h2>
        <p className="text-center text-ums-muted text-sm sm:text-base max-w-2xl mx-auto mb-6 sm:mb-10">
          Стандарт — один трек. Про — комплекс школа + IT. Премиум — максимум и наставничество
          основателей.
        </p>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-10">
          <PillToggle options={trackOptions} value={trackId} onChange={setTrackId} />
          <PillToggle options={gradeOptions} value={grade} onChange={setGrade} size="sm" scrollable />
        </div>

        <PackageBlock items={gradeConfig.packageItems} />

        {/* Mobile: tier pills + one card */}
        <div className="lg:hidden">
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-none -mx-1 px-1 pb-1">
            {orderedTiers.map((tier) => {
              const active = tier.id === activeMobileTier?.id
              const isPopular = Boolean(tier.badge && /популяр/i.test(tier.badge))
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setMobileTierId(tier.id)}
                  className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent ${
                    active
                      ? isPopular
                        ? 'bg-ums-accent text-white'
                        : 'bg-[#111] text-white'
                      : 'bg-white border border-ums-border text-ums-muted'
                  }`}
                >
                  {tier.name}
                  {isPopular ? ' · топ' : ''}
                </button>
              )
            })}
          </div>

          {activeMobileTier && (
            <PricingTierCard
              key={activeMobileTier.id}
              tier={activeMobileTier}
              subjectKey={subjectKey}
              subjectOptions={gradeConfig.subjectOptions}
              onSubjectChange={setSubjectKey}
              onOpenModal={onOpenModal}
              trackId={trackId}
              grade={grade}
              compactFeatures
            />
          )}
        </div>

        {/* Desktop: original order grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {gradeConfig.tiers.map((tier) => (
            <PricingTierCard
              key={tier.id}
              tier={tier}
              subjectKey={subjectKey}
              subjectOptions={gradeConfig.subjectOptions}
              onSubjectChange={setSubjectKey}
              onOpenModal={onOpenModal}
              trackId={trackId}
              grade={grade}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
