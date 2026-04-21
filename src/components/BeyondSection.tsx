import { motion } from 'framer-motion'
import wellnessLibrary from '@/assets/wellness-library.png?format=webp&as=url'
import earthSpiritBg from '@/assets/earth-spirit-medicine.png?format=webp&as=url'
import arrowRight from '@/assets/imgArrowRight1.svg'
import texturePattern from '@/assets/dc5bba8a-4237-4d55-aa67-2ea49d0a7c0d.png?format=webp&as=url'
import pineGradientBg from '@/assets/pine-gradient-bg.png?format=webp&as=url'

const BeyondSection = () => {
  return (
    <section
      id="beyond"
      data-navbar-theme="light"
      className="section-layer section-layer--overlap relative z-[8] overflow-hidden"
      style={{
        borderRadius: 'var(--section-radius)',
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
      <div className="container relative z-10 pt-16 pb-20 md:pt-36 md:pb-36">

        {/* Section header — all white */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20 max-w-3xl mx-auto"
        >
          <p className="type-eyebrow mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
            CONTINUUM
          </p>
          <h2 className="type-display mb-4" style={{ color: '#ffffff' }}>
            Beyond the clinic
          </h2>
          <p className="type-serif-lead max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1.25rem, 2vw, 1.625rem)' }}>
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
              className="md:w-1/2 aspect-square relative overflow-hidden"
              style={{ background: 'hsl(var(--primary))' }}
            >
              <img
                src={wellnessLibrary}
                alt="Wellness Library"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                width={693}
                height={623}
                loading="lazy"
              />
            </div>
            {/* Right: Text — square only on desktop (where it sits beside the image) */}
            <div
              className="md:w-1/2 md:aspect-square p-8 md:p-12 flex flex-col justify-center"
              style={{ background: 'hsl(var(--surface-warm))' }}
            >
              <h3 className="type-h1 mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                Wellness Library
              </h3>
              <p className="type-eyebrow mb-5" style={{ color: 'hsl(var(--foreground))' }}>
                PRACTICAL WELLNESS FOR REAL LIFE
              </p>
              <p className="type-body mb-3" style={{ color: 'hsl(var(--foreground) / 0.65)', lineHeight: 1.6 }}>
                The Wellness Library is a growing collection of tools, products, and rituals shaped by years of clinical work — and the questions I'm asked every day.
              </p>
              <p className="type-body mb-8" style={{ color: 'hsl(var(--foreground) / 0.65)', lineHeight: 1.6 }}>
                It's where I share what I use in my own home, for my own family, and within my practice.
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 h-10 w-full md:w-auto md:self-start rounded-full px-6 font-sans text-sm leading-none font-medium tracking-wide transition-colors"
                style={{ border: '1px solid rgba(36,35,33,0.3)', color: 'hsl(var(--foreground))' }}
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
              className="md:w-1/2 aspect-square relative overflow-hidden"
              style={{ background: 'hsl(var(--secondary))' }}
            >
              <img
                src={earthSpiritBg}
                alt="Earth Spirit Medicine"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                width={693}
                height={623}
                loading="lazy"
              />
            </div>
            {/* Right: Text — square only on desktop */}
            <div
              className="md:w-1/2 md:aspect-square p-8 md:p-12 flex flex-col justify-center"
              style={{ background: 'hsl(var(--surface-warm))' }}
            >
              <h3 className="type-h1 mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                Earth Spirit Medicine
              </h3>
              <p className="type-eyebrow mb-5" style={{ color: 'hsl(var(--foreground))' }}>
                HERBAL MANUFACTURING FOR CERTIFIED PRACTITIONERS
              </p>
              <p className="type-body mb-8" style={{ color: 'hsl(var(--foreground) / 0.65)', lineHeight: 1.6 }}>
                Founded from years of advanced herbal training and clinical practice, Earth Spirit Medicine develops custom botanical formulations for practitioners nationwide — and serves as the foundation for the herbal medicine within my clinic.
              </p>
              <a
                href="http://www.earthspiritmedicine.ca/"
                className="inline-flex items-center justify-center gap-2 h-10 w-full md:w-auto md:self-start rounded-full px-6 font-sans text-sm leading-none font-medium tracking-wide transition-colors"
                style={{ border: '1px solid rgba(36,35,33,0.3)', color: 'hsl(var(--foreground))' }}
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
