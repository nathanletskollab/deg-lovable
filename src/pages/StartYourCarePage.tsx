import { useEffect, useRef, useState } from 'react'
import { MotionConfig, motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import FooterDeg2025 from '@/components/FooterDeg2025'
import ericaPortrait from '@/assets/ericaheadshot_sm.png'
import officeFront from '@/assets/officefront.jpg'

const JANE_URL = 'https://drericagrenci.janeapp.com/'

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Icons for session details
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
    <path d="M8 4.5V8l2.5 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.485-2.015-4.5-4.5-4.5Z" stroke="currentColor" strokeWidth="1.25" />
    <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.25" />
  </svg>
)
const MonitorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
    <rect x="1.5" y="2.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
    <path d="M5.5 13.5h5M8 11.5v2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)
const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden
    style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }}
  >
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Shared care toggle hero ─────────────────────────────────────────────────

interface CareHeroProps {
  mode: 'start' | 'continue'
}

function CareHeroSection({ mode }: CareHeroProps) {
  const isStart = mode === 'start'

  const content = {
    start: {
      eyebrow: 'Your First Step',
      heading: <>Start with <em>Dr. Erica</em></>,
      body: 'Your first visit is a conversation. We take the time to understand your full history, trace patterns others may have missed, and build a clear picture of where you are — and where you want to go.',
    },
    continue: {
      eyebrow: 'Returning Patients',
      heading: <>Continue Your <em>Care</em></>,
      body: 'Welcome back. Book a follow-up, check in with your care team, or pick up where you left off.',
    },
  }

  const c = content[mode]

  // Start = sage green overlay, Continue = warm blush overlay
  const overlayColor = isStart
    ? 'rgba(185, 205, 190, 0.88)'
    : 'rgba(218, 198, 182, 0.88)'

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

      {/* Color tint overlay */}
      <div className="absolute inset-0" style={{ background: overlayColor }} aria-hidden />

      {/* Content — flex column, vertically centered, toggle anchored below body text */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-10 max-w-2xl mx-auto" style={{ paddingTop: '72px' }}>
        <motion.p
          className="type-eyebrow mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {c.eyebrow}
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.h1
            key={mode + '-heading'}
            className="text-foreground mb-5"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.75rem, 7vw, 5rem)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45 }}
          >
            {c.heading}
          </motion.h1>
        </AnimatePresence>

        <motion.p
          key={mode + '-body'}
          className="type-body text-foreground/70 max-w-[28rem] leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          {c.body}
        </motion.p>
      </div>
    </section>
  )
}

// ─── Trust section ────────────────────────────────────────────────────────────

function TrustSection() {
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
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center pb-20 md:pb-28"
        >
          <p className="type-eyebrow mb-5">You Don't Have to Start From Scratch</p>
          <h2
            className="text-foreground mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Bring what you have — past tests, diagnoses, notes, or nothing at all.
          </h2>
          <p className="type-body text-foreground/60 leading-relaxed">
            We start by understanding your full picture as it is today, and build from there. Many patients arrive with years of unanswered questions — the initial consultation is designed to hold all of that, and finally make sense of it.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Premium consultation card + FAQ ─────────────────────────────────────────

const FAQS = [
  {
    q: "Can I still book if I'm not exactly sure what's going on?",
    a: "Absolutely. Many patients come in without a clear diagnosis. Dr. Erica is trained to work through ambiguity — that's often where the most important work happens.",
  },
  {
    q: 'What actually happens in the first session?',
    a: "Dr. Erica will walk through your full health history — from childhood to now. She'll ask detailed questions about your current symptoms, lifestyle, stress, sleep, and more. By the end, you'll have a clear sense of her clinical impression and where your care is headed.",
  },
  {
    q: 'Will I leave with a plan, or does it take time?',
    a: "Most patients leave with an initial direction on the same day. Some cases require labs or further review before a full protocol is finalized — Dr. Erica will let you know what applies to you.",
  },
  {
    q: 'Do I need to do testing right away?',
    a: "Not necessarily. Some cases benefit from targeted lab work upfront; others don't. Testing is always purposeful — never routine for the sake of it.",
  },
  {
    q: 'What does this usually end up costing beyond the first visit?',
    a: "Follow-up visits are shorter and less expensive than the initial consult. Lab costs vary depending on what's ordered and your coverage. Dr. Erica will be transparent about costs before anything is recommended.",
  },
  {
    q: 'Is this something I do once, or is it ongoing care?',
    a: "Both are possible. Some patients come in for a defined period of support; others maintain an ongoing relationship with Dr. Erica over years. There's no pressure to commit beyond what makes sense for you.",
  },
  {
    q: 'Can I just get testing or supplements without a consultation?',
    a: "A consultation is required before any testing or prescribing. This ensures recommendations are actually appropriate for your case — not generic or guessed.",
  },
  {
    q: 'Is this covered by insurance?',
    a: "Many extended health plans in Canada cover naturopathic visits. Check your plan details. Receipts are provided for all appointments for reimbursement submission.",
  },
  {
    q: 'Do I need to prepare anything before booking?',
    a: "Nothing is required to book. Gathering recent lab work or a list of current medications before your appointment is helpful, but Dr. Erica will guide you through everything you need.",
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${index}`
  return (
    <div style={{ borderBottom: '1px solid hsl(var(--foreground) / 0.1)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left transition-colors hover:text-foreground"
        aria-expanded={open}
        aria-controls={id}
        style={{ color: open ? 'hsl(var(--foreground))' : 'hsl(var(--foreground) / 0.75)' }}
      >
        <span className="font-sans text-sm font-medium leading-snug">{q}</span>
        <span className="flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--primary))' }}>
          <ChevronDown open={open} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-4 font-sans text-sm leading-relaxed" style={{ color: 'hsl(var(--foreground) / 0.6)' }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ConsultationSection() {
  return (
    <section
      id="what-to-expect"
      data-navbar-theme="dark"
      className="section-layer section-layer--overlap section-layer--has-overlap relative z-[3] pt-20 md:pt-28"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div className="container pb-28 md:pb-40">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-xl mx-auto mb-12 md:mb-16"
        >
          <p className="type-eyebrow mb-4">Book Your Visit</p>
          <h2
            className="text-foreground"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
            }}
          >
            The Initial Consultation
          </h2>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden"
          style={{
            boxShadow: '6px 7px 0 0 rgba(24, 25, 23, 0.20)',
            border: '1px solid hsl(var(--foreground) / 0.07)',
          }}
        >
          <div className="grid lg:grid-cols-[1fr_1.1fr]">

            {/* ── LEFT: Booking card ─────────────────────────────── */}
            <div
              className="flex flex-col p-8 md:p-12"
              style={{ background: 'hsl(var(--surface-warm))' }}
            >
              {/* Provider identity */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
                  style={{ boxShadow: '0 2px 12px rgba(24,25,23,0.14)' }}
                >
                  <img
                    src={ericaPortrait}
                    alt="Dr. Erica Grenci"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p
                    className="text-foreground"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.0625rem', fontWeight: 500, lineHeight: 1.2 }}
                  >
                    Dr. Erica Grenci, ND
                  </p>
                  <p className="type-eyebrow mt-0.5" style={{ fontSize: '0.65rem', letterSpacing: '0.14em' }}>
                    Naturopathic &amp; Herbal Medicine
                  </p>
                </div>
              </div>

              {/* Session title */}
              <h3
                className="text-foreground mb-5"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                }}
              >
                Initial<br />Consultation
              </h3>

              {/* Session meta */}
              <div className="flex flex-wrap gap-4 mb-6">
                {[
                  { icon: <ClockIcon />, label: '60 Minutes' },
                  { icon: <LocationIcon />, label: 'In-Person' },
                  { icon: <MonitorIcon />, label: 'Virtual' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <span style={{ color: 'hsl(var(--foreground) / 0.45)' }}>{item.icon}</span>
                    <span
                      className="font-sans uppercase tracking-widest"
                      style={{ fontSize: '0.65rem', fontWeight: 600, color: 'hsl(var(--foreground) / 0.5)' }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <p
                className="text-foreground mb-5"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '2rem',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                $300
              </p>

              {/* Description */}
              <p className="type-body text-foreground/60 leading-relaxed mb-8 flex-1">
                A clear first step to understand your symptoms, your history, and what kind of support would actually make sense. Dr. Erica reviews your full health picture and leaves you with a grounded, reasoned direction forward.
              </p>

              {/* CTA */}
              <a
                href={JANE_URL}
                className="flex items-center justify-between gap-3 h-14 px-7 rounded-2xl font-sans text-sm font-medium tracking-wide transition-all hover:opacity-90 group"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
              >
                <span>Book Your Consultation</span>
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                  style={{ background: 'hsl(var(--primary-foreground) / 0.12)' }}
                >
                  <ArrowRight />
                </span>
              </a>

              {/* Footnote */}
              <p className="font-sans mt-4 text-center" style={{ fontSize: '0.7rem', color: 'hsl(var(--foreground) / 0.35)', lineHeight: 1.5 }}>
                Lab work recommended during or after your visit is billed separately.
              </p>
            </div>

            {/* ── RIGHT: FAQ accordion ───────────────────────────── */}
            <div
              className="flex flex-col p-8 md:p-12"
              style={{ background: 'hsl(0 0% 100%)' }}
            >
              <p className="type-eyebrow mb-6">You Might Be Wondering…</p>
              <div className="flex-1">
                {FAQS.map((faq, i) => (
                  <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Outcomes ─────────────────────────────────────────────────────────────────

const outcomes = [
  {
    number: '01',
    title: 'A clearer direction',
    body: "Many patients leave their first appointment understanding their health patterns for the first time. Dr. Erica takes the time to explain her clinical reasoning clearly — so the plan makes sense to you.",
    delay: 0.1,
  },
  {
    number: '02',
    title: 'Deeper insight, if needed',
    body: 'For more complex cases, targeted lab testing or further diagnostics may be recommended. This gives Dr. Erica the precise data needed to build the most effective long-term protocol.',
    delay: 0.2,
  },
  {
    number: '03',
    title: 'Ongoing support',
    body: "Most patients move into a follow-up rhythm — returning as things shift, adjusting protocols, and deepening their care over time. You won't be left to figure it out alone.",
    delay: 0.3,
  },
]

function OutcomesSection() {
  return (
    <section
      data-navbar-theme="dark"
      className="section-layer section-layer--overlap section-layer--has-overlap relative z-[4] pt-20 md:pt-28"
      style={{ background: 'hsl(var(--surface-warm))' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <p className="type-eyebrow mb-4">Where care can go from here</p>
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
            What comes after the <em>first visit</em>
          </h2>
          <p className="type-body text-foreground/65 max-w-md">
            Every patient's path is different — but here's what you can generally expect as you begin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 pb-28 md:pb-40">
          {outcomes.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: item.delay }}
              className="rounded-2xl p-7 md:p-8 flex flex-col gap-4"
              style={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(var(--border))' }}
            >
              <span className="font-sans text-xs font-medium tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                {item.number}
              </span>
              <h3
                className="text-foreground"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.015em',
                }}
              >
                {item.title}
              </h3>
              <p className="type-body text-foreground/65 leading-relaxed flex-1">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StartYourCarePage() {
  const footerRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const syncSpacer = () => {
      if (!footerRef.current || !spacerRef.current) return
      const fh = footerRef.current.offsetHeight
      const vh = window.innerHeight
      const isStickyActive = window.innerWidth >= 768
      if (!isStickyActive) { spacerRef.current.style.height = '0px'; return }
      spacerRef.current.style.height = `${Math.max(0, vh - fh)}px`
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
          <CareHeroSection mode="start" />
          <TrustSection />
          <ConsultationSection />
          <OutcomesSection />
          <div ref={spacerRef} aria-hidden="true" style={{ height: 0 }} />
        </div>
        <div ref={footerRef} className="footer-sticky-wrapper">
          <FooterDeg2025 />
        </div>
      </div>
    </MotionConfig>
  )
}
