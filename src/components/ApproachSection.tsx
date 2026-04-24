import React, { useRef, useState, useEffect, useCallback } from 'react'
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
      opacity: isActive ? 1 : 0.4,
      // Delight: active step drifts in from the left — feels like it's arriving
      transform: isActive ? 'translateX(0px)' : 'translateX(-7px)',
      transition: 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
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
        // Delight: subtle fill on hover — chips feel interactive, not static
        <span
          key={tag}
          className="tag-chip inline-block type-body-sm px-3 py-1 bg-background cursor-default"
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
  const [dotTops, setDotTops] = useState<number[]>([])
  // Delight: pulse keys — incrementing triggers the ring animation replay per dot
  const [pulseKeys, setPulseKeys] = useState([0, 0, 0])
  const prevActiveStep = useRef<number>(-1)

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

  // Scroll handler — whichever kicker is closest to 40vh sets the active step
  useEffect(() => {
    const recalc = () => {
      const el = containerRef.current
      if (!el) return

      // Active step: whichever kicker is closest to 40% down the viewport
      const target = window.innerHeight * 0.4
      let closest = 0
      let minDist = Infinity
      kickerRefs.current.forEach((kicker, i) => {
        if (!kicker) return
        const rect = kicker.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - target)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      })
      setActiveStep(closest)
    }

    recalc()
    window.addEventListener('scroll', recalc, { passive: true })
    return () => window.removeEventListener('scroll', recalc)
  }, [])

  // Delight: fire dot pulse ring when active step changes (skip initial mount)
  useEffect(() => {
    if (prevActiveStep.current === activeStep) return
    if (prevActiveStep.current >= 0) {
      setPulseKeys(keys => keys.map((k, i) => i === activeStep ? k + 1 : k))
    }
    prevActiveStep.current = activeStep
  }, [activeStep])

  const firstDot = dotTops[0] ?? 0
  const lastDot = dotTops[dotTops.length - 1] ?? 0
  const lineHeight = lastDot - firstDot
  // Snap to each step's dot — driven by activeStep, not raw scroll %
  const scaleY = dotTops.length === steps.length && lineHeight > 0
    ? (dotTops[activeStep] - firstDot) / lineHeight
    : 0

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
                className="absolute inset-0 w-full h-full object-contain object-right"
                width={1033}
                height={1536}
                loading="lazy"
                style={{
                  opacity: activeStep === i ? 0.45 : 0,
                  transition: 'opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
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
                  left: LINE_LEFT - 1,  // center the 2px line under the dot center
                  top: firstDot,
                  width: '2px',
                  height: lineHeight,
                  backgroundColor: 'hsl(var(--foreground) / 0.08)',
                }}
              >
                {/* scaleY snaps to active step's dot — GPU composited, intentional per-step feel */}
                <div
                  className="w-full h-full rounded-full origin-top"
                  style={{
                    backgroundColor: 'hsl(var(--foreground) / 0.25)',
                    transform: `scaleY(${scaleY})`,
                    transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                />
              </div>

              {dotTops.map((top, i) => {
                // Pre-compute centered position so nothing fights over `transform`
                const dotLeft = LINE_LEFT - DOT_SIZE / 2
                const dotTop = top - DOT_SIZE / 2
                return (
                  <React.Fragment key={i}>
                    {/* Delight: pulse ring — centered via left/top, scale-only animation, no transform conflict */}
                    {pulseKeys[i] > 0 && (
                      <motion.div
                        key={`pulse-${i}-${pulseKeys[i]}`}
                        className="absolute pointer-events-none rounded-full"
                        initial={{ scale: 1, opacity: 0.45 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                        style={{
                          left: dotLeft,
                          top: dotTop,
                          width: DOT_SIZE,
                          height: DOT_SIZE,
                          border: '1.5px solid hsl(var(--foreground))',
                          zIndex: 1,
                        }}
                      />
                    )}
                    {/* Dot — same centered position */}
                    <div
                      className="absolute rounded-full border-2"
                      style={{
                        left: dotLeft,
                        top: dotTop,
                        width: DOT_SIZE,
                        height: DOT_SIZE,
                        zIndex: 2,
                        borderColor:
                          activeStep === i
                            ? 'hsl(var(--foreground))'
                            : 'hsl(var(--foreground) / 0.2)',
                        backgroundColor:
                          activeStep === i
                            ? 'hsl(var(--foreground))'
                            : 'hsl(var(--secondary))',
                        transition: 'border-color 0.5s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                      }}
                    />
                  </React.Fragment>
                )
              })}
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

      {/* Closing statement — screen-filling resonance */}
      <div className="relative z-10">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="min-h-[85vh] flex flex-col justify-center items-center text-center py-24 md:py-32">
            <motion.p
              className="type-serif-statement text-foreground/50 mb-3 md:mb-5"
              initial={{ opacity: 0, transform: 'translateY(24px)', filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.3, ease: [0.23, 1, 0.32, 1] }}
            >
              This is not a one-time approach to health.
            </motion.p>
            <motion.p
              className="type-serif-statement text-foreground/80"
              initial={{ opacity: 0, transform: 'translateY(24px)', filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.3, ease: [0.23, 1, 0.32, 1], delay: 0.22 }}
            >
              It's a relationship, supported over time.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApproachSection
