"use client";

import React, { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [isRendered, setIsRendered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Проверяем наличие согласия в localStorage
    const hasConsented = localStorage.getItem('cookie-accepted')
    if (!hasConsented) {
      // Через 2 секунды монтируем компонент
      const timer = setTimeout(() => {
        setIsRendered(true)
        // Небольшая задержка перед добавлением классов появления,
        // чтобы браузер успел отрисовать стартовое состояние (opacity-0)
        setTimeout(() => setIsVisible(true), 50)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-accepted', 'true')
    // Мгновенно скрываем модалку:
    setIsRendered(false)
  }

  // Не рендерим ничего, пока не прошло 2 секунды или если уже есть кука
  if (!isRendered) return null

  return (
    <div
      className={`fixed bottom-6 right-6 left-6 sm:left-auto z-[100] max-w-[340px] bg-dark-900/95 backdrop-blur-md border border-neon-purple/50 rounded-2xl p-5 shadow-[0_0_20px_rgba(191,90,242,0.15)] transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      <div className="flex items-start gap-4 mb-4">
        <p className="text-gray-300 text-sm leading-relaxed font-medium">
          🍪 Мы используем куки, чтобы твой путь к 100-му уровню знаний был максимально плавным. Оставаясь с нами, ты соглашаешься политикой обработки персональных данных.
        </p>
      </div>
      <div className="flex justify-end mt-2">
        <button
          onClick={handleAccept}
          className="btn-neon text-sm px-6 py-2 w-full sm:w-auto"
        >
          Понятно
        </button>
      </div>
    </div>
  )
}
