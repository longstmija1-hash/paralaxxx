'use client'

import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import UmsButton from './ui/UmsButton'
import RevealOnScroll from './ui/RevealOnScroll'
import {
  PAIN_POINTS,
  PAIN_POINTS_HEADING,
  PAIN_POINTS_SUB,
} from '../../data/landingContent'

export default function PainPointsSection({ onScrollToForm }) {
  return (
    <SectionShell variant="tint">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <h2 className="section-heading">{PAIN_POINTS_HEADING}</h2>
          <p className="section-sub mx-auto">{PAIN_POINTS_SUB}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {PAIN_POINTS.map((item) => (
            <UmsCard key={item.quote}>
              <p className="text-[#111] font-medium leading-relaxed text-lg">{item.quote}</p>
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
