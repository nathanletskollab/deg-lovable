import { motion } from 'framer-motion'
import heroPortrait from '@/assets/hero-portrait.jpg?format=webp&as=url'
import naturopathySvg from '@/assets/naturopathy-herbal-medicine.svg'

const HeroSection = () => {
  return (
    <section data-navbar-theme="light" className="section-layer relative min-h-screen overflow-hidden" style={{ position: 'sticky', top: 0, zIndex: 0 }}>
      {/* Full-bleed portrait */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPortrait}
          alt="Dr. Erica Grenci, Naturopathic Doctor"
          className="w-full h-full object-cover object-[center_15%]"
          width={1440}
          height={1920}
          fetchPriority="high"
          style={{
            filter: 'contrast(0.95) saturate(0.88) brightness(1.04)',
          }}
        />
        {/* Warm tonal overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, hsl(35 20% 30% / 0.08) 0%, hsl(35 25% 20% / 0.25) 60%, hsl(35 20% 12% / 0.55) 100%)',
          }}
        />
        {/* Left-side darkening for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, hsl(35 15% 10% / 0.35) 0%, transparent 55%)',
          }}
        />
        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }}
        />
      </div>

      {/* Text content — bottom-left */}
      <div className="relative z-10 min-h-screen flex items-end">
        <div className="w-full pb-16 md:pb-48 lg:pb-52 pt-32 px-6 sm:px-10 md:px-14 lg:px-20 xl:px-[5rem] max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg"
          >
            <h1
              className="type-display"
              style={{ color: 'hsl(40 30% 96%)' }}
            >
              A balanced body
              <br />
              <em className="italic font-normal">heals itself</em>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-3 py-[20px]"
            >
              <img
                src={naturopathySvg}
                alt="Naturopathic & Herbal Medicine"
                className="w-[280px] md:w-[470px] h-auto brightness-[10] opacity-70"
                style={{ objectFit: 'fill' }}
              />
            </motion.div>

            <p className="type-body max-w-[24rem] mt-4 text-white/95">
              Toronto-based naturopathic care for women and families seeking a
              more thoughtful, long-term approach to their health.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-[60px]"
            >
              <a
                href="https://drericagrenci.janeapp.com/"
                className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-white/95 text-foreground font-sans text-sm leading-none font-medium tracking-wide hover:bg-white shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
              >
                Start with Dr. Erica
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
