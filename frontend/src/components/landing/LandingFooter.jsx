'use client'

import { useState } from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { X } from 'lucide-react'
import ParallaxLogo from '../Logo'
import UmsButton from './ui/UmsButton'
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from '../../data/landingContent'

function PrivacyModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white border border-ums-border rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6 border-b border-ums-border flex items-center justify-between">
          <h2 className="text-2xl font-black text-[#111]">Политика конфиденциальности</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-ums-border text-ums-muted hover:text-[#111] cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh] text-ums-muted text-sm space-y-4">
          <p>
            Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем
            вашу информацию.
          </p>
          <p>
            Мы собираем информацию при оформлении заявки на сайте. Данные используются для связи по
            поводу занятий и улучшения платформы.
          </p>
          <p>
            Ваши данные надёжно защищены. Мы не передаём их третьим лицам без вашего согласия, за
            исключением случаев, предусмотренных законом.
          </p>
        </div>
        <div className="p-6 border-t border-ums-border flex justify-end">
          <UmsButton onClick={onClose}>Закрыть</UmsButton>
        </div>
      </div>
    </div>
  )
}

export default function LandingFooter() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)

  return (
    <>
      <footer className="border-t border-ums-border py-12 px-4 bg-ums-bg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-4">
              <ParallaxLogo size="md" />
            </div>
            <p className="text-ums-muted text-sm">© 2026 ПАРАЛЛАКС. Все права защищены.</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-5">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a
                href={CONTACT_PHONE_HREF}
                className="text-[#111] text-xl hover:text-ums-muted transition-colors duration-200 cursor-pointer"
              >
                {CONTACT_PHONE}
              </a>
              <div className="flex items-center gap-5 text-2xl">
                <a
                  href="https://t.me/BNp0D0KTpAnnA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] transition-colors duration-200 hover:text-[#111] cursor-pointer"
                  aria-label="Telegram"
                >
                  <FaTelegramPlane />
                </a>
                <a
                  href="https://max.ru/u/f9LHodD0cOJH9YLhQHH7ahys0fzwdOZZfVcPexgH8nLQBtS8XZ0L9GN6yuI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] font-black text-xl tracking-widest transition-colors duration-200 hover:text-[#111] cursor-pointer"
                  aria-label="MAX"
                >
                  MAX
                </a>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-ums-muted">
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-[#111] transition-colors duration-200 cursor-pointer bg-transparent border-0"
              >
                Политика конфиденциальности
              </button>
            </div>
          </div>
        </div>
      </footer>

      {isPrivacyOpen && <PrivacyModal onClose={() => setIsPrivacyOpen(false)} />}
    </>
  )
}
