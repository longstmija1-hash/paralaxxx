"use client";

import { useState, Suspense, lazy, useCallback } from 'react'
import LandingNavbar from '../components/landing/LandingNavbar'
import HeroSection from '../components/landing/HeroSection'
import CountdownSection from '../components/landing/CountdownSection'
import UrgencyStripe from '../components/landing/UrgencyStripe'
import EarlyStartSection from '../components/landing/EarlyStartSection'
import PainPointsSection from '../components/landing/PainPointsSection'
import WhyStartNowSection from '../components/landing/WhyStartNowSection'
import PlatformFeaturesSection from '../components/landing/PlatformFeaturesSection'
import SupportSection from '../components/landing/SupportSection'
import LivesSystemSection from '../components/landing/LivesSystemSection'
import TeachersSection from '../components/landing/TeachersSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import TrustChipsSection from '../components/landing/TrustChipsSection'
import TrustSection from '../components/landing/TrustSection'
import PricingMatrixSection from '../components/landing/PricingMatrixSection'
import FAQSection from '../components/landing/FAQSection'
import FinalCTASection from '../components/landing/FinalCTASection'
import LandingFooter from '../components/landing/LandingFooter'
import MobileStickyCTA from '../components/landing/MobileStickyCTA'
import CoursesSection from '../components/CoursesSection'
import ScrollProgress from '../components/landing/ui/ScrollProgress'

const OrderModal = lazy(() => import('../components/OrderModal'))

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  const openModal = useCallback((data = {}) => {
    setModalData(data)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => setModalOpen(false), [])

  const scrollToForm = useCallback(() => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-ums-bg pb-[5.5rem] lg:pb-0">
      <ScrollProgress />
      <LandingNavbar onOpenModal={openModal} onScrollToForm={scrollToForm} />
      <HeroSection onOpenModal={openModal} />
      <CountdownSection onOpenModal={openModal} />
      <UrgencyStripe onOpenModal={openModal} />
      <EarlyStartSection />
      <PainPointsSection onScrollToForm={scrollToForm} />
      <WhyStartNowSection />
      <PlatformFeaturesSection />
      <SupportSection />
      <CoursesSection openModal={openModal} />
      <LivesSystemSection />
      <TeachersSection />
      <TrustChipsSection />
      <TestimonialsSection onOpenModal={openModal} />
      <TrustSection />
      <PricingMatrixSection onOpenModal={openModal} />
      <FAQSection />
      <FinalCTASection />
      <LandingFooter />
      <MobileStickyCTA onOpenModal={openModal} onScrollToForm={scrollToForm} />
      <Suspense fallback={null}>
        <OrderModal isOpen={modalOpen} onClose={closeModal} initialData={modalData} />
      </Suspense>
    </div>
  )
}
