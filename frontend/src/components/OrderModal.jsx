'use client'

import { useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import LeadForm from './landing/LeadForm'
import { TARIFF_LABELS } from '../data/landingContent'

export default function OrderModal({ isOpen, onClose, initialData = {} }) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, handleKey])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const tariffLabel = initialData.selectedTariff
    ? TARIFF_LABELS[initialData.selectedTariff] ?? initialData.selectedTariff
    : null

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center md:p-4">
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
        aria-hidden
      />

      <div
        className="relative w-full md:max-w-4xl max-h-[92dvh] overflow-y-auto rounded-t-[28px] md:rounded-[28px] bg-white z-10 shadow-[0_8px_40px_rgba(0,0,0,0.16)] pb-[max(0.5rem,env(safe-area-inset-bottom))]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <span className="w-10 h-1 rounded-full bg-[#d1d5db]" aria-hidden />
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 border border-ums-border text-ums-muted hover:text-[#111] transition-colors duration-200 cursor-pointer"
          aria-label="Закрыть"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        <div id="order-modal-title" className="sr-only">
          Записаться на обучение{tariffLabel ? ` — тариф ${tariffLabel}` : ''}
        </div>

        <div className="grid md:grid-cols-2 md:min-h-[480px]">
          <div className="p-5 sm:p-8 md:p-10 flex flex-col justify-center">
            <LeadForm
              variant="modal"
              initialData={initialData}
              onSuccess={onClose}
              id="order-modal-form"
              submitLabel="Узнать о курсе"
            />
          </div>

          <div className="relative hidden md:flex flex-col justify-end overflow-hidden rounded-r-[28px] bg-ums-accent p-8">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.45) 0%, transparent 55%)',
              }}
            />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
                Предзапись
              </div>
              <p className="font-display text-2xl font-bold text-white leading-snug mb-3">
                Начни подготовку раньше — войди в учебный год спокойно
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                Кураторы, разбор ДЗ и понятный прогресс по каждой теме
              </p>
              <div className="mt-8 h-40 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white/70 text-sm">
                Фото учеников
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
