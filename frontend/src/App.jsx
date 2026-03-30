import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SubjectPage from './pages/SubjectPage'
import AnnouncementMarquee from './components/AnnouncementMarquee'
import CookieConsent from './components/CookieConsent'

export default function App() {
  return (
    <>
      {/* Мы убрали SafeComponent, чтобы он не мешал. Теперь банер стоит просто так */}
      <AnnouncementMarquee />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/subject/:subjectId" element={<SubjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CookieConsent />
    </>
  )
}