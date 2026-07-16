'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import { FAQ_ITEMS } from '../../data/landingContent'

function AccordionItem({ faq, isOpen, onClick }) {
  return (
    <UmsCard padding="sm" className="mb-4 overflow-hidden">
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left flex items-center justify-between gap-4 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent focus-visible:ring-offset-2 rounded-xl"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[#111] text-base leading-relaxed">{faq.q}</span>
        <span className="text-[#111] flex-shrink-0">
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>

      {isOpen && (
        <div className="pt-4 text-ums-muted text-sm leading-relaxed border-t border-ums-border mt-4">
          {faq.a}
        </div>
      )}
    </UmsCard>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <SectionShell id="faq" variant="white">
      <div className="text-center mb-12">
        <h2 className="section-heading">Часто задаваемые вопросы</h2>
      </div>

      <div className="max-w-3xl mx-auto">
        {FAQ_ITEMS.map((faq, index) => (
          <AccordionItem
            key={faq.q}
            faq={faq}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </SectionShell>
  )
}
