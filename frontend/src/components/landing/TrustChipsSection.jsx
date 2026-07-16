'use client'

import SectionShell from './ui/SectionShell'
import RevealOnScroll from './ui/RevealOnScroll'
import { TRUST_CHIPS, TRUST_CHIPS_LABEL } from '../../data/landingContent'

export default function TrustChipsSection() {
  return (
    <SectionShell variant="white" className="!py-10 sm:!py-12">
      <RevealOnScroll>
        <p className="text-center text-sm font-medium text-ums-muted mb-5">{TRUST_CHIPS_LABEL}</p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {TRUST_CHIPS.map((chip) => (
            <span
              key={chip}
              className="px-4 py-2 rounded-full bg-ums-tint border border-[#dce3ff] text-sm font-semibold text-[#111]"
            >
              {chip}
            </span>
          ))}
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
