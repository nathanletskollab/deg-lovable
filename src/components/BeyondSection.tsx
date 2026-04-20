import { motion } from 'framer-motion'
import wellnessLibrary from '@/assets/wellness-library.png'
import earthSpiritBg from '@/assets/earth-spirit-medicine.png'
import arrowRight from '@/assets/imgArrowRight1.svg'
import texturePattern from '@/assets/dc5bba8a-4237-4d55-aa67-2ea49d0a7c0d.png'
import pineGradientBg from '@/assets/pine-gradient-bg.png'

const BeyondSection = () => {
  return (
    <section
      id="beyond"
      data-navbar-theme="light"
      className="section-layer section-layer--overlap section-layer--has-overlap relative z-[8] overflow-hidden"
      style={{
        borderRadius: 'var(--section-radius) var(--section-radius) 0 0',
      }}
    >
      {/* Pine gradient base */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${pineGradientBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${texturePattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-16 pb-8 md:py-36">

        {/* Section header — all white */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="type-eyebrow mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
            CONTINUUM
          </p>
          <h2 className="type-display mb-4" style={{ color: '#ffffff' }}>
            Beyond the clinic
          </h2>
          <p className="type-serif-lead max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            My practice flows into how I live, parent, and create. Beyond the clinic, these projects are extensions of my mission — each built to share, teach, and support in new ways.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {/* Wellness Library Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group flex flex-col md:flex-row overflow-hidden"
            style={{ borderRadius: 'var(--section-radius)' }}
          >
            {/* Left: Brand image */}
            <div
              className="md:w-1/2 aspect-[4/3] md:aspect-auto relative overflow-hidden"
              style={{ background: '#1F3931', minHeight: '280px' }}
            >
              <img
                src={wellnessLibrary}
                alt="Wellness Library"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            {/* Right: Text */}
            <div
              className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
              style={{ background: 'hsl(var(--surface-warm))' }}
            >
              <h2 className="type-h1 mb-2" style={{ color: '#242321' }}>
                Wellness Library
              </h2>
              <p className="type-eyebrow mb-5" style={{ color: '#242321' }}>
                PRACTICAL WELLNESS FOR REAL LIFE
              </p>
              <p className="type-body-md mb-3" style={{ color: '#5a5750', lineHeight: 1.6 }}>
                The Wellness Library is a growing collection of tools, products, and rituals shaped by years of clinical work — and the questions I'm asked every day.
              </p>
              <p className="type-body-md mb-8" style={{ color: '#5a5750', lineHeight: 1.6 }}>
                It's where I share what I use in my own home, for my own family, and within my practice.
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 w-full md:w-auto md:self-start rounded-full px-6 py-3 font-sans text-base transition-colors"
                style={{ border: '1px solid rgba(36,35,33,0.3)', color: '#242321' }}
              >
                Explore the Wellness Library
                <img src={arrowRight} alt="" aria-hidden="true" className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Earth Spirit Medicine Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex flex-col md:flex-row overflow-hidden"
            style={{ borderRadius: 'var(--section-radius)' }}
          >
            {/* Left: Brand image */}
            <div
              className="md:w-1/2 aspect-[4/3] md:aspect-auto relative overflow-hidden"
              style={{ background: '#E8E2D5', minHeight: '280px' }}
            >
              <img
                src={earthSpiritBg}
                alt="Earth Spirit Medicine"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            {/* Right: Text */}
            <div
              className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
              style={{ background: 'hsl(var(--surface-warm))' }}
            >
              <h2 className="type-h1 mb-2" style={{ color: '#242321' }}>
                Earth Spirit Medicine
              </h2>
              <p className="type-eyebrow mb-5" style={{ color: '#242321' }}>
                HERBAL MANUFACTURING FOR CERTIFIED PRACTITIONERS
              </p>
              <p className="type-body-md mb-8" style={{ color: '#5a5750', lineHeight: 1.6 }}>
                Founded from years of advanced herbal training and clinical practice, Earth Spirit Medicine develops custom botanical formulations for practitioners nationwide — and serves as the foundation for the herbal medicine within my clinic.
              </p>
              <a
                href="http://www.earthspiritmedicine.ca/"
                className="inline-flex items-center justify-center gap-2 w-full md:w-auto md:self-start rounded-full px-6 py-3 font-sans text-base transition-colors"
                style={{ border: '1px solid rgba(36,35,33,0.3)', color: '#242321' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="md:hidden">Learn More</span>
                <span className="hidden md:inline">Learn More About Earth Spirit Medicine</span>
                <img src={arrowRight} alt="" aria-hidden="true" className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BeyondSection
