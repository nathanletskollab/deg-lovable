import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import step1Img from '@/assets/step-1.png?format=webp&as=url'
import step2Img from '@/assets/step-2.png?format=webp&as=url'
import step3Img from '@/assets/step-3.png?format=webp&as=url'

const steps = [
  {
    label: 'Step 1',
    title: 'Assessment',
    headline: 'You don\'t have to start over',
    subline: 'Everything you\'ve already tried matters.',
    body: 'We begin by listening — so you can finally feel understood. This is a 60-minute consultation where I take the time to understand your full history, your patterns, and what may have been missed.',
    supporting: undefined as string | undefined,
    moment: 'Many patients tell me this is the first time they\'ve been able to connect all the pieces.',
    tags: ['Health History', 'Root Cause Analysis', 'Advanced Testing'],
    image: step1Img,
  },
  {
    label: 'Step 2',
    title: 'Personalized Plan',
    headline: 'Built around your body',
    subline: 'No generic protocols.',
    body: 'Together, we build a plan — so you know exactly what to do next. This plan reflects your biology, your life, and what will actually work for you.',
    supporting: 'This may include nutrition, lifestyle shifts, targeted herbal support, and other tools I\'ve developed and refined through years of practice.',
    moment: 'You leave with clarity on what matters most — and what doesn\'t.',
    tags: ['Custom Protocol', 'Lifestyle Strategy', 'Botanical Medicine'],
    image: step2Img,
  },
  {
    label: 'Step 3',
    title: 'Ongoing Support',
    headline: 'You won\'t be left on your own',
    subline: 'Support continues between visits.',
    body: 'Your care continues beyond the visit — so you\'re never left figuring things out on your own. Through follow-ups, check-ins, and ongoing guidance, your care evolves as your body changes.',
    supporting: 'You\'ll have access to the resources, tools, and support systems I use in my own practice and daily life.',
    moment: 'Over time, we revisit your health, track changes, and adjust your care as needed.',
    tags: ['Continued Care', 'Priority Access', 'Ongoing Guidance'],
    image: step3Img,
  },
]

const DOT_SIZE = 12
const LINE_LEFT = 15

const TimelineStep = ({
  step,
  isActive,
  stepRef,
  kickerRef,
}: {
  step: (typeof steps)[0]
  index: number
  isActive: boolean
  stepRef: (el: HTMLDivElement | null) => void
  kickerRef: (el: HTMLSpanElement | null) => void
}) => (
  <div
    ref={stepRef}
    className="relative pl-8 md:pl-16 py-16 md:py-24"
    style={{
      opacity: isActive ? 1 : 0.55,
      transition: 'opacity 0.5s ease',
    }}
  >
    <span
      ref={kickerRef}
      data-dot-anchor
      className="block type-eyebrow mb-4"
    >
      {step.label} — {step.title}
    </span>

    <h3 className="type-h1 text-foreground leading-tight mb-2">
      {step.headline}
    </h3>

    <p className="type-serif-italic text-foreground/50 mb-6">{step.subline}</p>

    <p className="type-body text-foreground/75 mb-4 max-w-2xl">{step.body}</p>
    {step.supporting && (
      <p className="type-body text-foreground/55 mb-4 max-w-2xl">
        {step.supporting}
      </p>
    )}

    <p className="type-body-sm italic text-foreground/35 mb-6 max-w-sm">
      — {step.moment}
    </p>

    <div className="flex flex-wrap gap-2">
      {step.tags.map((tag) => (
        <span
          key={tag}
          className="inline-block type-body-sm px-3 py-1 bg-background"
          style={{ borderRadius: '60px', border: '2px solid rgba(196, 183, 165, 0.80)' }}
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
)

const ApproachSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const kickerRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [dotTops, setDotTops] = useState<number[]>([])

  const measureDots = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const containerRect = container.getBoundingClientRect()
    const tops: number[] = []
    kickerRefs.current.forEach((el) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - containerRect.top
      tops.push(Math.round(center))
    })
    setDotTops(tops)
  }, [])

  useEffect(() => {
    measureDots()
    window.addEventListener('resize', measureDots)
    if (document.fonts?.ready) {
      document.fonts.ready.then(measureDots)
    }
    return () => window.removeEventListener('resize', measureDots)
  }, [measureDots])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    stepRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveStep(i)
          })
        },
        { threshold: [0.15, 0.3, 0.5], rootMargin: '-10% 0px -40% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    const recalc = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const totalHeight = el.scrollHeight
      const scrolled = -rect.top + window.innerHeight * 0.5
      const pct = Math.max(0, Math.min(100, (scrolled / totalHeight) * 100))
      setProgress(pct)
    }
    recalc()
    window.addEventListener('scroll', recalc, { passive: true })
    return () => window.removeEventListener('scroll', recalc)
  }, [])

  useEffect(() => {
    measureDots()
  }, [measureDots])

  const firstDot = dotTops[0] ?? 0
  const lastDot = dotTops[dotTops.length - 1] ?? 0
  const lineHeight = lastDot - firstDot
  const progressHeight = lineHeight > 0 ? (progress / 100) * lineHeight : 0

  return (
    <section
      id="approach"
      data-navbar-theme="dark"
      className="section-layer section-layer--has-overlap section-texture-grain relative z-[5] -mt-[100px] md:-mt-[140px] rounded-t-[var(--section-radius)]"
      style={{ backgroundColor: 'hsl(var(--background))' }}
    >
      {/* Intro */}
      <div className="container max-w-5xl mx-auto relative z-10 text-center pt-12 md:pt-36 mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="type-eyebrow mb-6">Balance begins with listening</p>
          <h2 className="type-h1 text-foreground text-center mb-5">
            You may have never had the space to{' '}
            <strong className="font-medium">tell your full story</strong>.
          </h2>
          <p className="type-body text-foreground/60 max-w-2xl mx-auto">
            I take the time to understand your history, your patterns, and the
            signals your body has been sending — so nothing important gets
            overlooked.
          </p>
        </motion.div>
      </div>

      {/* Timeline with sticky image */}
      <div className="relative">
        {/* Sticky image frame */}
        <div className="hidden md:block sticky top-[10vh] h-0 z-[1] pointer-events-none">
          <div className="absolute right-0 top-0 w-[45%] h-[80vh]">
            {steps.map((step, i) => (
              <img
                key={i}
                src={step.image}
                alt=""
                className="absolute inset-0 w-full h-full object-contain object-right transition-opacity duration-700"
                width={1033}
                height={1536}
                loading="lazy"
                style={{
                  opacity: activeStep === i ? 0.45 : 0,
                }}
              />
            ))}
          </div>
        </div>

        <div
          ref={containerRef}
          className="container max-w-3xl mx-auto relative px-6 z-[2]"
        >
          {/* Vertical line */}
          {dotTops.length === steps.length && (
            <>
              <div
                className="absolute pointer-events-none"
                style={{
                  left: `${LINE_LEFT}px`,
                  top: `${firstDot}px`,
                  width: '2px',
                  height: `${lineHeight}px`,
                  backgroundColor: 'hsl(var(--foreground) / 0.08)',
                  transform: 'translateX(-1px)',
                }}
              >
                <div
                  className="w-full rounded-full"
                  style={{
                    height: `${Math.min(progressHeight, lineHeight)}px`,
                    backgroundColor: 'hsl(var(--foreground) / 0.25)',
                    transition: 'height 0.15s linear',
                  }}
                />
              </div>

              {dotTops.map((top, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border-2 transition-all duration-500"
                  style={{
                    left: `${LINE_LEFT}px`,
                    top: `${top}px`,
                    width: `${DOT_SIZE}px`,
                    height: `${DOT_SIZE}px`,
                    transform: `translate(-${DOT_SIZE / 2}px, -${DOT_SIZE / 2}px)`,
                    zIndex: 2,
                    borderColor:
                      activeStep === i
                        ? 'hsl(var(--foreground))'
                        : 'hsl(var(--foreground) / 0.2)',
                    backgroundColor:
                      activeStep === i
                        ? 'hsl(var(--foreground))'
                        : 'hsl(var(--secondary))',
                  }}
                />
              ))}
            </>
          )}

          {steps.map((step, i) => (
            <TimelineStep
              key={i}
              step={step}
              index={i}
              isActive={activeStep === i}
              stepRef={(el) => { stepRefs.current[i] = el }}
              kickerRef={(el) => { kickerRefs.current[i] = el }}
            />
          ))}
        </div>
      </div>

      {/* Closing quote */}
      <div className="container max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="text-center pt-24 md:pt-32 pb-24 md:pb-48"
        >
          <p className="type-serif-quote text-foreground/60 mb-1">
            This is not a one-time<br className="md:hidden" /> approach to health.
          </p>
          <p className="type-serif-quote text-foreground/60 mb-10">
            It's a relationship,<br className="md:hidden" /> supported over time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ApproachSection
