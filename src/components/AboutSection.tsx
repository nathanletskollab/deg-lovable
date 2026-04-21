import { motion } from 'framer-motion'
import heroPortrait from '@/assets/hero-portrait.png?format=webp&as=url'

const AboutSection = () => {
  return (
    <section
      id="about"
      data-navbar-theme="dark"
      className="section-layer section-layer--overlap section-layer--has-overlap relative z-[6] overflow-hidden pt-20 md:pt-32 pb-36 md:pb-52"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left: Portrait */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="w-[72%] md:w-full max-w-[420px] aspect-square rounded-full overflow-hidden"
              style={{ boxShadow: '8px 10px 0 0 rgba(24, 25, 23, 0.12)' }}
            >
              <img
                src={heroPortrait}
                alt="Dr. Erica Grenci"
                className="w-full h-full object-cover object-top"
                width={778}
                height={780}
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="type-eyebrow mb-5">About Dr. Erica</p>
            <h2 className="type-display text-foreground mb-8 leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.02em' }}
            >
              Meet Dr.&nbsp;Erica Grenci and the Philosophy Behind Her{' '}
              <em>Care</em>
            </h2>

            <div className="space-y-4 type-body leading-[1.6] text-foreground">
              <p>
                I'm a board-certified naturopathic doctor and mother of two. My work blends <strong>modern assessment</strong> with a strong foundation in <strong>herbal medicine</strong> — something I practice every day with my own family and in my clinical work.
              </p>
              <p>
                Alongside my naturopathic education, I completed postgraduate herbal studies and spent years inside apothecaries learning hands-on plant preparation. I now support other naturopaths in this work as well.
              </p>
              <p>
                Since 2017, I've supported women and men through many stages of health, with a special focus on fertility. Much of my approach comes from understanding how stress, sleep, digestion, hormones, and environment shape the body over time.
              </p>
              <p>
                <strong>My focus is simple:</strong> Help you understand your patterns clearly, support your physiology with intention, and build practical daily rituals that gently <strong>restore balance</strong>.
              </p>
            </div>

            <a
              href="#approach"
              className="inline-flex items-center gap-2 h-10 mt-10 px-6 rounded-full font-sans text-sm leading-none font-medium tracking-wide transition-colors"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              Read Erica's Story & Philosophy
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
