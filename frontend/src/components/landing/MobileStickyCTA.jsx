'use client'

import UmsButton from './ui/UmsButton'

export default function MobileStickyCTA({ onOpenModal, onScrollToForm }) {
  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-ums-border bg-white/95 backdrop-blur-md px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-lg mx-auto flex gap-2">
        <UmsButton
          variant="secondary"
          onClick={onScrollToForm}
          className="flex-1 !py-2.5 !text-sm !rounded-2xl"
        >
          Консультация
        </UmsButton>
        <UmsButton onClick={() => onOpenModal?.({})} className="flex-1 !py-2.5 !text-sm !rounded-2xl">
          Записаться
        </UmsButton>
      </div>
    </div>
  )
}
