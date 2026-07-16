"use client";

import React, { useState, useEffect } from 'react'
import UmsButton from './landing/ui/UmsButton'

export default function CookieConsent() {
  const [isRendered, setIsRendered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookie-accepted')
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setIsRendered(true)
        setTimeout(() => setIsVisible(true), 50)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-accepted', 'true')
    setIsRendered(false)
  }

  if (!isRendered) return null

  return (
    <div
      className={`fixed bottom-6 right-6 left-6 sm:left-auto z-[100] max-w-[340px] bg-white border border-ums-border rounded-[28px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex items-start gap-4 mb-4">
        <p className="text-ums-muted text-sm leading-relaxed">
          Мы используем cookie, чтобы сайт работал корректно. Оставаясь с нами, вы соглашаетесь с
          политикой обработки персональных данных.
        </p>
      </div>
      <div className="flex justify-end mt-2">
        <UmsButton onClick={handleAccept} className="text-sm px-6 py-2 w-full sm:w-auto">
          Понятно
        </UmsButton>
      </div>
    </div>
  )
}
