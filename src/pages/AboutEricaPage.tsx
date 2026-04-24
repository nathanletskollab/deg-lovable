import { useEffect, useRef, useState } from 'react'
import { motion, useInView, MotionConfig } from 'framer-motion'
import Navbar from '@/components/Navbar'
import FooterDeg2025 from '@/components/FooterDeg2025'
import aboutPortrait from '@/assets/about-portrait.jpg?format=webp&as=url'
import earthSpiritBg from '@/assets/earth-spirit-bg.jpg?format=webp&as=url'
import officeFront from '@/assets/officefront.jpg?format=webp&as=url'

// ─── Scroll reveal ───────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-72px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Shared primitives ───────────────────────────────────────────────────────

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="type-eyebrow mb-5">{children}</p>
)

const TextLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="inline-flex items-center gap-1.5 text-sm font-sans text-foreground/65 hover:text-foreground transition-colors pb-0.5"
    style={{ borderBottom: '1px solid hsl(var(--foreground) / 0.2)' }}
  >
    {children}
    <span aria-hidden>→</span>
  </a>
)

// Editorial pull-quote — no border stripe
const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mt-10 pt-8 pb-2">
    <span
      className="absolute -top-2 left-0 font-serif leading-none select-none pointer-events-none"
      aria-hidden
      style={{ fontSize: '6rem', color: 'hsl(var(--primary) / 0.10)' }}
    >
      "
    </span>
    <p className="font-serif text-xl md:text-[1.4rem] italic text-foreground/75 leading-relaxed relative z-10 pl-2">
      {children}
    </p>
  </div>
)

// ─── Pillar accordion (A + C) ────────────────────────────────────────────────

function PillarAccordion({
  pillars,
}: {
  pillars: { title: string; body: string }[]
}) {
  const [open, setOpen] = useState<number>(0)

  return (
    <div className="w-full">
      <div style={{ height: '1px', background: 'hsl(var(--foreground) / 0.07)' }} />

      {pillars.map((p, i) => {
        const isOpen = open === i
        const num = String(i + 1).padStart(2, '0')

        return (
          <FadeUp key={p.title} delay={i * 0.06}>
            <div className="relative" style={{ isolation: 'isolate' }}>

              {/* Pine green wipe — scaleX from left */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'hsl(var(--primary) / 0.05)',
                  transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left center',
                  transition: 'transform 0.58s cubic-bezier(0.22, 1, 0.36, 1)',
                  zIndex: 0,
                }}
              />

              {/* Strip trigger */}
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="relative z-10 w-full flex items-center gap-5 md:gap-7 py-6 md:py-7 text-left"
                aria-expanded={isOpen}
                aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${p.title}`}
              >
                {/* Ghost number */}
                <span
                  aria-hidden
                  className="flex-shrink-0 font-serif font-semibold leading-none"
                  style={{
                    width: '3rem',
                    fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
                    letterSpacing: '-0.04em',
                    color: isOpen
                      ? 'hsl(var(--primary) / 0.50)'
                      : 'hsl(var(--primary) / 0.13)',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {num}
                </span>

                {/* Title */}
                <h3
                  className="flex-1 font-serif font-semibold text-foreground"
                  style={{ fontSize: 'clamp(1.15rem, 2.8vw, 1.45rem)', lineHeight: 1.1 }}
                >
                  {p.title}
                </h3>

                {/* +/× indicator */}
                <span
                  aria-hidden
                  className="flex-shrink-0 font-sans text-muted-foreground/30 text-xl leading-none"
                  style={{
                    display: 'inline-block',
                    width: '1.25rem',
                    textAlign: 'center',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  +
                </span>
              </button>

              {/* Expandable body — grid-template-rows */}
              <div
                className="relative z-10"
                style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.52s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                  <p
                    className="font-sans text-[14px] leading-[1.85] text-foreground/62 pb-7"
                    style={{ paddingLeft: 'calc(3rem + 1.25rem)', maxWidth: '50ch' }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>

              {/* Bottom hairline */}
              <div
                className="relative z-10"
                style={{ height: '1px', background: 'hsl(var(--foreground) / 0.07)' }}
              />
            </div>
          </FadeUp>
        )
      })}
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

const pillars = [
  {
    title: 'Clinical Assessment',
    body: 'Looking at your full picture — history, labs, lived patterns — instead of treating symptoms in isolation.',
  },
  {
    title: 'Herbal Medicine',
    body: 'Plant-based protocols formulated with intention, drawn from years of hands-on apothecary work.',
  },
  {
    title: 'Education & Empowerment',
    body: 'Helping you understand your body well enough to make your own decisions between visits.',
  },
]

const patterns = [
  {
    num: '01',
    when: 'First',
    titleItalic: "I've seen",
    titleBold: 'care rushed.',
    body: 'Twelve-minute visits. Problems split into specialties. No one holding the whole picture, and no time to think out loud about what might actually be happening.',
  },
  {
    num: '02',
    when: 'Then',
    titleItalic: "I've seen",
    titleBold: 'discernment erode.',
    body: 'People drowning in advice from every direction. Supplements without reasons. Protocols that quietly contradict each other. After a while, even sensible information stops feeling sensible.',
  },
  {
    num: '03',
    when: 'Still',
    titleItalic: "I've seen patients",
    titleBold: 'carry too much.',
    body: 'Tracking, researching, advocating, translating between providers. Work that was never theirs to do alone, and that quietly wears people down.',
  },
]

const worldview = [
  {
    title: 'What we eat',
    body: 'The most repeated input the body receives — every day, for a lifetime.',
  },
  {
    title: 'Where we live',
    body: 'Light, air, the spaces we return to, the rhythms a place asks of us.',
  },
  {
    title: 'The weight we hold',
    body: 'Stress, grief, responsibility — the quiet things bodies carry without naming.',
  },
  {
    title: 'Systems of influence',
    body: 'Family, work, culture, and the era we happen to be alive in.',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

const AboutEricaPage = () => {
  const footerRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'About Dr. Erica — Dr. Erica, ND'
  }, [])

  useEffect(() => {
    const syncSpacer = () => {
      if (!footerRef.current || !spacerRef.current) return
      const fh = footerRef.current.offsetHeight
      const vh = window.innerHeight
      if (window.innerWidth < 768) {
        spacerRef.current.style.height = '0px'
        return
      }
      spacerRef.current.style.height = `${Math.max(0, vh - fh)}px`
    }
    syncSpacer()
    window.addEventListener('resize', syncSpacer)
    return () => window.removeEventListener('resize', syncSpacer)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'hsl(var(--background))', overflow: 'clip' }}>
      <main className="min-h-screen">

        {/* ── 0 · Opening ──────────────────────────────────────────────────── */}
        <section
          data-navbar-theme="light"
          className="relative bg-background"
          style={{ paddingBottom: 'var(--section-overlap)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'var(--texture-grain)', opacity: 0.022 }}
          />
          <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-32 pb-20 md:pt-44 md:pb-28">
            <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-16 items-center">

              <FadeUp>
                <Eyebrow>Nice to meet you</Eyebrow>
                <h1 className="font-serif text-[2.6rem] sm:text-5xl md:text-[3.4rem] leading-[1.05] mb-6 text-foreground">
                  <span className="italic font-light text-foreground/65">Nice to meet you,</span>
                  <br />
                  <span className="font-semibold">I'm Erica.</span>
                </h1>
                <p className="font-sans text-base sm:text-[17px] text-muted-foreground leading-[1.78] max-w-[46ch]">
                  A naturopathic doctor and a mother of two, living and working in Toronto. I cook from the garden when I can, drink the teas I make, and raise my kids with the same medicine I use in clinic. Health, for me, isn't theoretical — it's how I move through a day.
                </p>
              </FadeUp>

              <FadeUp delay={0.14}>
                <div
                  className="aspect-[4/5] w-full max-w-xs mx-auto md:max-w-none overflow-hidden"
                  style={{ borderRadius: '18px' }}
                >
                  <img
                    src={aboutPortrait}
                    alt="Dr. Erica Grenci"
                    className="w-full h-full object-cover"
                    style={{ filter: 'contrast(0.95) saturate(0.82) brightness(1.03)' }}
                  />
                </div>
                <p className="text-center mt-3 font-sans text-[10px] tracking-widest uppercase text-muted-foreground/45">
                  Family. Garden. Candid.
                </p>
              </FadeUp>

            </div>
          </div>
        </section>

        {/* ── 1 · What shaped this work ────────────────────────────────────── */}
        <section
          className="section-layer section-layer--overlap relative z-10 bg-muted"
          style={{ paddingBottom: 'var(--section-overlap)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'var(--texture-grain)', opacity: 0.022 }}
          />
          <div className="max-w-2xl mx-auto px-6 sm:px-10 py-20 md:py-28">
            <FadeUp>
              <Eyebrow>What shaped this work</Eyebrow>
              <h2 className="font-serif text-[1.9rem] md:text-[2.4rem] leading-[1.1] mb-7 text-foreground">
                <span className="italic font-light text-foreground/65">I was a patient</span>{' '}
                <span className="font-semibold">before I was a doctor.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="space-y-4">
                <p className="font-sans text-[15px] md:text-base leading-[1.8] text-foreground/85">
                  My tonsils came out young. Then came rounds of antibiotics, ear infections that kept coming back, and a quiet feeling — even as a kid — that the answer was always the same regardless of the question.
                </p>
                <p className="font-sans text-[15px] md:text-base leading-[1.8] text-foreground/85">
                  For years I was told nothing was wrong while clearly something was. I learned what it feels like to be <em>managed</em> rather than understood — to leave appointments with a prescription and no real picture of what was happening inside my body.
                </p>
                <p className="font-sans text-[15px] md:text-base leading-[1.8] text-muted-foreground italic">
                  I went into medicine partly to study what I'd been missing.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.14}>
              <PullQuote>Most people don't know what balance feels like.</PullQuote>
            </FadeUp>
          </div>
        </section>

        {/* ── 2 · Three patterns ───────────────────────────────────────────── */}
        <section
          className="section-layer section-layer--overlap relative z-20 bg-background"
          style={{ paddingBottom: 'var(--section-overlap)' }}
        >
          <div className="max-w-2xl mx-auto px-6 sm:px-10 py-20 md:py-28">
            <FadeUp>
              <Eyebrow>What I keep seeing</Eyebrow>
              <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] leading-[1.02] mb-5 text-foreground">
                <span className="italic font-light text-foreground/40">Three patterns</span>
                <br />
                <span className="font-semibold">I've watched repeat.</span>
              </h2>
              <p className="font-sans text-[15px] md:text-base leading-[1.8] text-muted-foreground mb-14 max-w-[48ch]">
                Not theories. What I've watched walk into the room, year after year, in different bodies and different stories.
              </p>
            </FadeUp>

            <div className="space-y-0">
              {patterns.map((p, i) => (
                <FadeUp key={p.num} delay={i * 0.09}>
                  <div
                    className="relative py-10 md:py-12 overflow-hidden"
                    style={{
                      borderTop: '1px solid hsl(var(--foreground) / 0.08)',
                    }}
                  >
                    {/* Ghost number — large ambient texture */}
                    <span
                      aria-hidden
                      className="absolute right-0 top-1/2 -translate-y-1/2 font-serif font-semibold leading-none select-none pointer-events-none"
                      style={{
                        fontSize: 'clamp(6rem, 14vw, 9rem)',
                        color: 'hsl(var(--primary) / 0.055)',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {p.num}
                    </span>

                    {/* Content */}
                    <div className="relative pr-12 md:pr-16">
                      <p className="font-sans text-[9px] font-medium tracking-[0.32em] uppercase text-muted-foreground/40 mb-4">
                        {p.when}
                      </p>
                      <h3
                        className="font-serif leading-[1.05] text-foreground mb-5"
                        style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)' }}
                      >
                        <span className="italic font-light text-foreground/38">{p.titleItalic}</span>{' '}
                        <span className="font-semibold">{p.titleBold}</span>
                      </h3>
                      <p className="font-sans text-[14px] md:text-[15px] leading-[1.85] text-foreground/68 max-w-[46ch]">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
              {/* Bottom rule */}
              <div style={{ borderTop: '1px solid hsl(var(--foreground) / 0.08)' }} />
            </div>

            {/* Pull quote — editorial statement scale */}
            <FadeUp delay={0.1} className="mt-16 md:mt-20">
              <p
                className="font-serif italic text-foreground/60 leading-[1.2]"
                style={{
                  fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
                  textWrap: 'balance',
                }}
              >
                "We have more health advice than ever, and ironically, less about our bodies."
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 3 · What I focus on ──────────────────────────────────────────── */}
        <section
          className="section-layer section-layer--overlap relative z-30 bg-muted"
          style={{ paddingBottom: 'var(--section-overlap)' }}
        >
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 md:py-28">
            <FadeUp>
              <Eyebrow>The practice</Eyebrow>
              <h2 className="font-serif text-[1.9rem] md:text-[2.4rem] leading-[1.1] mb-5 text-foreground">
                <span className="italic font-light text-foreground/65">What I</span>{' '}
                <span className="font-semibold">focus on.</span>
              </h2>
              <p className="font-sans text-[15px] md:text-base leading-[1.8] text-muted-foreground mb-12 max-w-[54ch]">
                Three pieces of work, returned to in different proportions for different people.
              </p>
            </FadeUp>

            <PillarAccordion pillars={pillars} />

            <FadeUp delay={0.14} className="mt-10">
              <p className="font-sans text-xs text-muted-foreground italic max-w-lg leading-relaxed mb-5">
                It usually takes all three to address what's been going on beneath the surface.
              </p>
              <TextLink href="/how-i-work">See how care unfolds</TextLink>
            </FadeUp>
          </div>
        </section>

        {/* ── 4 · Plants are not a side practice ──────────────────────────── */}
        <section
          className="section-layer section-layer--overlap relative z-40"
          style={{
            background: 'hsl(27 46% 64% / 0.11)',
            paddingBottom: 'var(--section-overlap)',
          }}
        >
          <div className="max-w-5xl mx-auto px-6 sm:px-10 py-20 md:py-28">
            <div className="grid grid-cols-1 md:grid-cols-[0.88fr_1.12fr] gap-12 md:gap-16 items-center">

              <FadeUp delay={0.06} className="order-last md:order-first">
                <div
                  className="aspect-[4/5] w-full max-w-xs mx-auto md:max-w-none overflow-hidden"
                  style={{ borderRadius: '18px' }}
                >
                  <img
                    src={earthSpiritBg}
                    alt="Apothecary work"
                    className="w-full h-full object-cover"
                    style={{ filter: 'contrast(0.9) saturate(0.75) brightness(1.07)', objectPosition: 'center' }}
                  />
                </div>
                <p className="text-center mt-3 font-sans text-[10px] tracking-widest uppercase text-muted-foreground/45">
                  Hand. Plant. Slow.
                </p>
              </FadeUp>

              <FadeUp>
                <Eyebrow>A medicine I trust</Eyebrow>
                <h2 className="font-serif text-[1.9rem] md:text-[2.4rem] leading-[1.1] mb-7 text-foreground">
                  <span className="italic font-light text-foreground/65">Plants are</span>{' '}
                  <span className="font-semibold">not a side practice.</span>
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="font-sans text-[15px] md:text-base leading-[1.8] text-foreground/85">
                    Alongside my naturopathic training, I completed postgraduate herbal studies and spent years inside apothecaries learning formulation by hand — measuring, macerating, tasting, adjusting. It's slow work, and it changed how I practice medicine.
                  </p>
                  <p className="font-sans text-[15px] md:text-base leading-[1.8] text-foreground/85">
                    Plants meet the body in a language it already knows. They rarely override; they invite. The intentional preparation matters as much as the plant itself — what's chosen, what it's paired with, how it's made.
                  </p>
                  <p className="font-sans text-[15px] md:text-base leading-[1.8] text-muted-foreground italic">
                    I now also support other naturopaths in this craft, through a small herbal practice I run alongside the clinic.
                  </p>
                </div>
                <TextLink href="/earth-spirit-medicine">More on Earth Spirit Medicine</TextLink>
              </FadeUp>

            </div>
          </div>
        </section>

        {/* ── 5 · Health is shaped by more ─────────────────────────────────── */}
        <section
          className="section-layer section-layer--overlap relative z-50 bg-muted"
          style={{ paddingBottom: 'var(--section-overlap)' }}
        >
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 md:py-28">
            <FadeUp>
              <Eyebrow>How I see health now</Eyebrow>
              <h2 className="font-serif text-[1.9rem] md:text-[2.4rem] leading-[1.1] mb-5 text-foreground">
                <span className="italic font-light text-foreground/65">Health is shaped by</span>{' '}
                <span className="font-semibold">more than the body.</span>
              </h2>
              <p className="font-sans text-[15px] md:text-base leading-[1.8] text-muted-foreground mb-10 max-w-[54ch]">
                The longer I practice, the more I notice that what's happening inside someone is rarely separate from the conditions around them.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {worldview.map((w, i) => (
                <FadeUp key={w.title} delay={i * 0.07}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full transition-all duration-300 hover:border-foreground/20 hover:shadow-sm">
                    <span className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground/50 mb-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-serif text-base md:text-[17px] font-semibold text-foreground mb-2 leading-tight">
                      {w.title}
                    </h3>
                    <p className="font-sans text-[13px] text-muted-foreground leading-[1.75]">
                      {w.body}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.1}>
              <div className="h-44 md:h-52 w-full overflow-hidden mb-8" style={{ borderRadius: '18px' }}>
                <img
                  src={officeFront}
                  alt="The clinic — a heritage home in a quiet Toronto neighbourhood"
                  className="w-full h-full object-cover"
                  style={{ filter: 'contrast(0.92) saturate(0.78) brightness(1.06)', objectPosition: 'center 40%' }}
                />
              </div>
              <p className="text-center font-sans text-[10px] tracking-widest uppercase text-muted-foreground/45 mb-8">
                What surrounds the body matters.
              </p>
            </FadeUp>

            <FadeUp delay={0.06}>
              <p className="font-sans text-[15px] leading-[1.8] text-foreground/78">
                This is also the work that lives outside the clinic.{' '}
                <a
                  href="/wellness-library"
                  className="text-foreground transition-colors pb-0.5"
                  style={{ borderBottom: '1px solid hsl(var(--foreground) / 0.32)' }}
                >
                  The Wellness Library →
                </a>
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 6 · Slow Medicine band ───────────────────────────────────────── */}
        <section
          className="section-layer section-layer--overlap relative z-[60]"
          style={{
            background: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            paddingBottom: 'var(--section-overlap)',
          }}
        >
          <div className="max-w-2xl mx-auto px-6 sm:px-10 py-20 md:py-24 text-center">
            <FadeUp>
              <p
                className="type-eyebrow mb-5"
                style={{ color: 'hsl(var(--primary-foreground) / 0.55)' }}
              >
                A note on pace
              </p>
              <h2 className="font-serif text-2xl md:text-[1.85rem] leading-[1.15] mb-7">
                <span className="italic font-light" style={{ opacity: 0.82 }}>The craft of</span>{' '}
                <span className="font-semibold">Slow Medicine.</span>
              </h2>
              <p
                className="font-serif italic text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
                style={{ opacity: 0.88 }}
              >
                "If this sounds like an older way of practicing — it is. But it's also the most
                honest. We sit. We listen. We think. And then we build something intentional."
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 7 · Present-day expansion ────────────────────────────────────── */}
        <section
          className="section-layer section-layer--overlap relative z-[70] bg-background"
          style={{ paddingBottom: 'var(--section-overlap)' }}
        >
          <div className="max-w-2xl mx-auto px-6 sm:px-10 py-20 md:py-28">
            <FadeUp>
              <Eyebrow>Where this work is going</Eyebrow>
              <h2 className="font-serif text-[1.9rem] md:text-[2.4rem] leading-[1.1] mb-7 text-foreground">
                <span className="italic font-light text-foreground/65">My work has grown into</span>{' '}
                <span className="font-semibold">something larger than one-on-one care.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="space-y-4 mb-10">
                <p className="font-sans text-[15px] md:text-base leading-[1.8] text-foreground/85">
                  The clinic lives in a heritage home in a quiet Toronto neighbourhood — chosen on purpose, as a counterweight to the rooms most people are used to being seen in.
                </p>
                <p className="font-sans text-[15px] md:text-base leading-[1.8] text-foreground/85">
                  Over time I've made room for a small, aligned team of practitioners — people whose work I trust enough to bring into yours when it helps. I stay involved either way.
                </p>
                <p className="font-sans text-[15px] md:text-base leading-[1.8] text-muted-foreground">
                  Alongside the clinic, I've been building tools for continuity — so that what happens inside a visit can keep going outside of it. A library, a place to track care, ways to stay in conversation. The aim is the same as it's always been: that you don't have to carry this alone.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <TextLink href="/care-team">Meet the care team</TextLink>
                <TextLink href="/how-i-work">How care unfolds</TextLink>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 8 · Closing CTA ──────────────────────────────────────────────── */}
        <section className="section-layer section-layer--overlap relative z-[80] bg-background pb-16 md:pb-24">
          <div className="max-w-xl mx-auto px-6 sm:px-10 pt-0">
            <FadeUp>
              <div
                className="flex flex-col items-center justify-center text-center px-8 py-20 md:py-24"
                style={{
                  background: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  borderRadius: '24px',
                }}
              >
                <h2 className="font-serif text-3xl md:text-[2.4rem] leading-tight mb-8">
                  <span className="italic font-light" style={{ opacity: 0.82 }}>
                    Ready to begin
                  </span>
                  <br />
                  <span className="font-semibold">a different conversation?</span>
                </h2>
                <a
                  href="/start-your-care"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full font-sans text-[13px] font-medium tracking-widest uppercase transition-all duration-300 shadow-sm hover:opacity-90"
                  style={{
                    background: 'hsl(var(--primary-foreground))',
                    color: 'hsl(var(--primary))',
                  }}
                >
                  Begin with Erica
                </a>
                <p
                  className="mt-8 font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
                  style={{ opacity: 0.6 }}
                >
                  Care unfolding at your pace
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        <div ref={spacerRef} />
      </main>
      </div>

      <div ref={footerRef} className="footer-sticky-wrapper">
        <FooterDeg2025 />
      </div>
    </MotionConfig>
  )
}

export default AboutEricaPage
