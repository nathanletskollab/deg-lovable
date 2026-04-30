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
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-background">
        <Navbar />
        <div className="home-main-stack">
          <div className="home-hero-stage">
            <HeroSection />
          </div>
          <GlassBlock />
          <QuoteVideoSection />
          <ApproachSection />
          <AboutSection />
          <FAQSection />
        </div>
        <div className="home-beyond-layer">
          <BeyondSection />
        </div>
        <div className="footer-sticky-wrapper">
          <FooterDeg2025 />
        </div>
      </div>
    </MotionConfig>
  )
}
