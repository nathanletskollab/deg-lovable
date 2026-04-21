import { useEffect, useRef } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import GlassBlock from '@/components/GlassBlock'
import QuoteVideoSection from '@/components/QuoteVideoSection'
import ApproachSection from '@/components/ApproachSection'
import AboutSection from '@/components/AboutSection'
import FAQSection from '@/components/FAQSection'
import BeyondSection from '@/components/BeyondSection'
import FooterDeg2025 from '@/components/FooterDeg2025'

export default function HomePage() {
  const footerRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const syncSpacer = () => {
      if (!footerRef.current || !spacerRef.current) return
      const fh = footerRef.current.offsetHeight
      const vh = window.innerHeight
      const isStickyActive = window.innerWidth >= 768
      if (!isStickyActive) {
        spacerRef.current.style.height = '0px'
        return
      }
      const extra = Math.max(0, vh - fh)
      spacerRef.current.style.height = `${extra}px`
    }
    syncSpacer()
    window.addEventListener('resize', syncSpacer)
    return () => window.removeEventListener('resize', syncSpacer)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-background">
        <Navbar />
        <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'hsl(var(--background))' }}>
          <HeroSection />
          <GlassBlock />
          <QuoteVideoSection />
          <ApproachSection />
          <AboutSection />
          <FAQSection />
          <BeyondSection />
          <div ref={spacerRef} aria-hidden="true" style={{ height: 0 }} />
        </div>
        <div ref={footerRef} className="footer-sticky-wrapper">
          <FooterDeg2025 />
        </div>
      </div>
    </MotionConfig>
  )
}
