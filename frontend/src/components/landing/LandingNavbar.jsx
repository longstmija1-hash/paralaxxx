'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import ParallaxLogo from '../Logo'
import UmsButton from './ui/UmsButton'
import { NAV_LINKS, CONTACT_PHONE, CONTACT_PHONE_HREF } from '../../data/landingContent'

export default function LandingNavbar({ onOpenModal, onScrollToForm }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  const handleCta = () => {
    setMobileOpen(false)
    onOpenModal?.({})
  }

  const handleScrollForm = () => {
    setMobileOpen(false)
    onScrollToForm?.()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14">
      <div className="relative z-20 h-14 bg-white/95 backdrop-blur-md border-b border-ums-border shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-full flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center shrink-0 h-9">
            <span className="md:hidden inline-flex items-center">
              <ParallaxLogo size="sm" href="#" showWordmark={false} />
            </span>
            <span className="hidden md:inline-flex items-center">
              <ParallaxLogo size="md" href="#" />
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm text-ums-muted">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-ums-accent transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 h-9">
            <a
              href={CONTACT_PHONE_HREF}
              className="hidden md:inline-flex items-center gap-2 text-[#111] text-sm hover:text-ums-muted transition-colors duration-200 cursor-pointer"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden />
              {CONTACT_PHONE}
            </a>
            <UmsButton variant="secondary" onClick={handleScrollForm} className="hidden sm:inline-flex text-sm px-4 !py-0 h-9">
              Консультация
            </UmsButton>
            <UmsButton onClick={handleCta} className="hidden sm:inline-flex text-sm px-4 !py-0 h-9">
              Записаться
            </UmsButton>
            <UmsButton onClick={handleCta} className="sm:hidden text-xs px-3 !py-0 h-9 leading-none">
              Запись
            </UmsButton>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full border border-ums-border text-ums-muted hover:text-[#111] hover:border-[#d1d5db] transition-colors duration-200 cursor-pointer"
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-10" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-[#111]/40 backdrop-blur-[2px] cursor-pointer"
            aria-label="Закрыть меню"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-14 left-0 right-0 bottom-0 bg-white flex flex-col shadow-xl">
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-4">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[#111] font-medium py-3.5 px-2 rounded-xl hover:bg-ums-tint hover:text-ums-accent transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={CONTACT_PHONE_HREF}
                  className="inline-flex items-center gap-2 text-[#111] py-3.5 px-2 font-medium cursor-pointer"
                >
                  <Phone className="w-4 h-4" aria-hidden />
                  {CONTACT_PHONE}
                </a>
              </div>
            </div>
            <div className="shrink-0 border-t border-ums-border px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] flex flex-col gap-2 bg-white">
              <UmsButton onClick={handleCta} className="w-full">
                Записаться
              </UmsButton>
              <UmsButton variant="secondary" onClick={handleScrollForm} className="w-full">
                Консультация
              </UmsButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
