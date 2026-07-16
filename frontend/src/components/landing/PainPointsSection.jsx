'use client'

import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import UmsButton from './ui/UmsButton'
import RevealOnScroll from './ui/RevealOnScroll'
import { PAIN_POINTS } from '../../data/landingContent'

export default function PainPointsSection({ onScrollToForm }) {
  return (
    <SectionShell variant="tint">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <h2 className="section-heading">Мы понимаем твои чувства</h2>
          <p className="section-sub mx-auto">
            Подготовка к экзаменам вызывает тревогу — это нормально. Мы знаем, с чем сталкиваются ученики.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {PAIN_POINTS.map((item) => (
            <UmsCard key={item.quote}>
              <p className="text-[#111] font-medium mb-6 leading-relaxed text-lg">{item.quote}</p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-ums-accent font-display">{item.stat}</span>
                <span className="text-sm text-ums-muted pb-1">{item.statLabel}</span>
              </div>
            </UmsCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <UmsButton onClick={onScrollToForm} className="px-8">
            Получить бесплатную консультацию
          </UmsButton>
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
