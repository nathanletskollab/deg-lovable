import './index.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import GlassBlock from './components/GlassBlock'
import QuoteVideoSection from './components/QuoteVideoSection'
import ApproachSection from './components/ApproachSection'
import AboutSection from './components/AboutSection'
import FAQSection from './components/FAQSection'
import BeyondSection from './components/BeyondSection'
import FooterDeg2025 from './components/FooterDeg2025'

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <GlassBlock />
      <QuoteVideoSection />
      <ApproachSection />
      <AboutSection />
      <FAQSection />
      <BeyondSection />
      <FooterDeg2025 />
    </div>
  )
}
