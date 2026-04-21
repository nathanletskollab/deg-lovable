import { useEffect, useRef } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import FooterDeg2025 from '@/components/FooterDeg2025'
import ericaPortrait from '@/assets/ericaheadshot_sm.png'
import ctaPortrait from '@/assets/cta-portrait.jpg'
import aboutPortrait from '@/assets/about-portrait.jpg'
import officeFront from '@/assets/officefront.jpg'

const JANE_URL = 'https://drericagrenci.janeapp.com/'

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function ContinueHeroSection() {
  return (
    <section
      data-navbar-theme="dark"
      className="section-layer relative overflow-hidden"
      style={{ height: '60vh', minHeight: '480px' }}
    >
      {/* Full-bleed background image */}
      <img
        src={officeFront}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        style={{ opacity: 0.55 }}
        loading="eager"
      />

      {/* Warm blush tint overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(218, 198, 182, 0.88)' }} aria-hidden />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-10 max-w-2xl mx-auto" style={{ paddingTop: '72px' }}>
        <motion.p
          className="type-eyebrow mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Returning Patients
        </motion.p>

        <motion.h1
          className="text-foreground mb-5"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.75rem, 7vw, 5rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08 }}
        >
          Continue Your <em>Care</em>
        </motion.h1>

        <motion.p
          className="type-body text-foreground/70 max-w-[26rem] leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.22 }}
        >
          Welcome back. Book a follow-up, check in with your care team, or pick up where you left off.
        </motion.p>
      </div>
    </section>
  )
}

function DrEricaSessionsSection() {
  return (
    <section
      data-navbar-theme="dark"
      className="section-layer section-layer--overlap section-layer--has-overlap relative z-[2] pt-20 md:pt-28"
      style={{ background: 'hsl(0 0% 100%)' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <p className="type-eyebrow mb-4">With Dr. Erica</p>
          <h2
            className="text-foreground mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
            }}
          >
            Sessions with <em>Dr. Erica</em>
          </h2>
          <p className="type-body text-foreground/65 max-w-md">
            Follow-ups, plan updates, or guidance on what to do next.
          </p>
        </motion.div>

        {/* Triage card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          whileHover={{ boxShadow: '0 8px 32px rgba(0,0,0,0.07)' }}
          className="rounded-2xl border border-foreground/8 p-7 md:p-10 mb-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-12"
          style={{ background: 'hsl(var(--surface-warm))' }}
        >
          <div className="flex-1">
            <p className="type-eyebrow mb-2">Not sure where you're at?</p>
            <p className="type-body text-foreground/80">
              Answer a few quick questions and Dr. Erica will point you to the right session.
            </p>
          </div>
          <div className="flex-shrink-0">
            <motion.a
              href={JANE_URL}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              className="inline-flex items-center gap-2 h-10 px-6 rounded-full font-sans text-sm font-medium tracking-wide whitespace-nowrap"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              Find the right session
              <ArrowRight />
            </motion.a>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="type-eyebrow mb-5"
          style={{ color: 'hsl(var(--foreground) / 0.4)' }}
        >
          Or, if you know what you need:
        </motion.p>

        {/* Session type cards — 3 options */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-12">
          {[
            {
              title: 'Quick Check-In',
              tag: '15–20 min',
              desc: 'For quick updates, a specific question, or small adjustments to your plan. When things are on track and you just need a touch point.',
              color: 'hsl(var(--card-mint))',
              cta: 'Get on point',
              delay: 0.1,
            },
            {
              title: 'Standard Follow-Up',
              tag: '45 min',
              desc: 'Best when things have changed or you need a deeper review. Progress your plan, adjust protocols, and assess how your body is responding.',
              color: 'hsl(var(--card-sage))',
              cta: 'Book now',
              delay: 0.2,
            },
            {
              title: 'Deeper Session',
              tag: '60–75 min',
              desc: 'For more complex situations or when you need more time and support. New concerns, significant shifts, or cases that need thorough reassessment.',
              color: 'hsl(var(--card-peach))',
              cta: 'Get in touch',
              delay: 0.3,
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: card.delay, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -6, boxShadow: '6px 7px 0 0 rgba(24, 25, 23, 0.15)' }}
              className="rounded-2xl p-7 md:p-8 flex flex-col gap-4 group"
              style={{ background: card.color, cursor: 'default' }}
            >
              <div className="flex items-start justify-between gap-3">
                <h3
                  className="text-foreground"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)',
                    fontWeight: 500,
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </h3>
                <span className="flex-shrink-0 font-sans text-xs font-medium tracking-widest uppercase text-foreground/45 mt-0.5 transition-colors duration-300 group-hover:text-foreground/65">
                  {card.tag}
                </span>
              </div>
              <p className="type-body text-foreground/70 flex-1 leading-relaxed">{card.desc}</p>
              <a
                href={JANE_URL}
                className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-foreground/65 hover:text-foreground transition-colors mt-auto"
              >
                {card.cta}
                <span className="inline-flex transition-transform duration-200 ease-out group-hover:translate-x-[3px]">
                  <ArrowRight />
                </span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center pb-20 md:pb-28"
        >
          <motion.a
            href={JANE_URL}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            className="inline-flex items-center gap-2 h-10 px-6 rounded-full font-sans text-sm leading-none font-medium tracking-wide"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
          >
            Book Your Session with Dr. Erica
            <ArrowRight />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

const teamMembers = [
  {
    name: 'Dr. Erica Grenci',
    title: 'ND — Naturopathic Doctor',
    desc: "Women's health, fertility, hormonal balance, and herbal medicine. Your primary care provider.",
    photo: ericaPortrait,
    delay: 0.1,
  },
  {
    name: 'Care Team Member',
    title: 'Registered Acupuncturist',
    desc: 'Integrative acupuncture supporting pain, stress regulation, and hormonal health alongside naturopathic care.',
    photo: ctaPortrait,
    delay: 0.2,
  },
  {
    name: 'Care Team Member',
    title: 'Holistic Nutritionist',
    desc: 'Nutritional guidance and personalized protocols for digestive health, energy, and long-term wellness.',
    photo: aboutPortrait,
    delay: 0.3,
  },
]

function CareTeamSection() {
  return (
    <section
      data-navbar-theme="dark"
      className="section-layer section-layer--overlap section-layer--has-overlap relative z-[3] pt-20 md:pt-28"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <p className="type-eyebrow mb-4">Your Team</p>
          <h2
            className="text-foreground mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
            }}
          >
            Sessions with the <em>Care Team</em>
          </h2>
          <p className="type-body text-foreground/65 max-w-md">
            Dr. Erica brings in additional support when appropriate to help you move forward, holding your progress across every session.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 pb-28 md:pb-40">
          {teamMembers.map((member) => (
            <motion.div
              key={member.title + member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: member.delay }}
              className="flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: 'hsl(0 0% 100%)',
                border: '1px solid hsl(var(--border))',
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-1 p-6 gap-3">
                <div>
                  <h3
                    className="text-foreground"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.125rem', fontWeight: 500 }}
                  >
                    {member.name}
                  </h3>
                  <p className="type-eyebrow mt-0.5" style={{ fontSize: '0.7rem' }}>{member.title}</p>
                </div>
                <p className="type-body-sm text-foreground/65 flex-1">{member.desc}</p>
                <a
                  href={JANE_URL}
                  className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-foreground/65 hover:text-foreground transition-colors mt-2"
                >
                  Book Now
                  <ArrowRight />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ContinueYourCarePage() {
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
          <ContinueHeroSection />
          <DrEricaSessionsSection />
          <CareTeamSection />
          <div ref={spacerRef} aria-hidden="true" style={{ height: 0 }} />
        </div>
        <div ref={footerRef} className="footer-sticky-wrapper">
          <FooterDeg2025 />
        </div>
      </div>
    </MotionConfig>
  )
}
