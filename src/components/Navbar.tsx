import { forwardRef, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { X, MessageCircle } from 'lucide-react'
import headerLogo from '@/assets/logo-white.svg'
import iconStart from '@/assets/Layer 39.svg'
import iconCare from '@/assets/Layer 1.svg'
import iconPractice from '@/assets/Layer 2.svg'
import iconBeyond from '@/assets/Layer 36.svg'

const NAV_SECTIONS = [
  {
    label: 'Start Your Care',
    icon: iconStart,
    links: [
      { text: 'New Patients', href: '/start-your-care' },
      { text: 'All Appointments', href: 'https://drericagrenci.janeapp.com/' },
      { text: 'Follow-Up Visit', href: 'https://drericagrenci.janeapp.com/' },
    ],
  },
  {
    label: 'Your Care',
    icon: iconCare,
    links: [
      { text: 'Continue Your Care', href: '/continue-your-care' },
    ],
  },
  {
    label: 'About the Practice',
    icon: iconPractice,
    links: [
      { text: 'About Dr. Erica', href: '#about' },
      { text: 'Our Approach to Care', href: '#approach' },
      { text: 'FAQ', href: '#faq' },
      { text: 'Care Team', href: '#about' },
    ],
  },
  {
    label: 'Beyond the Clinic',
    icon: iconBeyond,
    links: [
      { text: 'The Wellness Library', href: '#beyond' },
      { text: 'Earth Spirit Medicine', href: '#beyond' },
    ],
  },
  {
    label: 'Connect',
    icon: null,
    links: [
      { text: 'Start a Conversation', href: '#connect' },
    ],
  },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const isCarePage = location.pathname === '/start-your-care' || location.pathname === '/continue-your-care'
  const isStartPage = location.pathname === '/start-your-care'

  useEffect(() => {
    let frame = 0

    const getThemeAtPoint = (x: number, y: number) => {
      const elements = document.elementsFromPoint(x, y)
      for (const element of elements) {
        if (navRef.current?.contains(element)) continue
        const themedSection = element.closest('[data-navbar-theme]')
        if (themedSection instanceof HTMLElement) {
          return themedSection.dataset.navbarTheme ?? 'light'
        }
      }
      return 'light'
    }

    const updateTheme = () => {
      const nav = navRef.current
      if (!nav) return
      const rect = nav.getBoundingClientRect()
      const sampleY = Math.min(window.innerHeight - 1, rect.top + rect.height / 2)
      const samplePoints = [window.innerWidth * 0.25, window.innerWidth * 0.5, window.innerWidth * 0.75]
      const themes = samplePoints.map((x) =>
        getThemeAtPoint(Math.max(0, Math.min(window.innerWidth - 1, x)), sampleY)
      )
      const darkVotes = themes.filter((theme) => theme === 'dark').length
      setIsDark(darkVotes > themes.length / 2)
      setIsPastHero(window.scrollY > window.innerHeight * 0.82)
    }

    const requestUpdate = () => {
      cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateTheme)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const textClass = isDark ? 'text-foreground/90' : 'text-white/90'
  const borderClass = isDark ? 'border-foreground/20' : 'border-white/20'
  const iconClass = isDark ? 'text-foreground/80' : 'text-white/80'
  const hoverBg = isDark ? 'hover:bg-foreground/10' : 'hover:bg-white/10'

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <nav ref={navRef} className="fixed top-4 left-4 right-4 z-50 flex justify-center">
        <div
          className="flex items-center justify-between w-full max-w-[1400px] transition-all duration-500"
          style={{
            padding: '16px 40px',
            borderRadius: '58px',
            background: isPastHero
              ? isDark
                ? 'linear-gradient(172deg, rgba(0,0,0,0.06) 5.24%, rgba(0,0,0,0.03) 94.76%)'
                : 'linear-gradient(172deg, rgba(255,255,255,0.10) 5.24%, rgba(255,255,255,0.05) 94.76%)'
              : 'transparent',
            boxShadow: isPastHero
              ? '0 305px 85px 0 rgba(0,0,0,0.00), 0 195px 78px 0 rgba(0,0,0,0.01), 0 110px 66px 0 rgba(0,0,0,0.05), 0 49px 49px 0 rgba(0,0,0,0.09), 0 12px 27px 0 rgba(0,0,0,0.10)'
              : 'none',
            backdropFilter: isPastHero ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: isPastHero ? 'blur(20px)' : 'none',
          }}
        >
          <a href="/" className="flex-shrink-0">
            <img
              src={headerLogo}
              alt="Dr. Erica, ND"
              className={`w-auto transition-all duration-500 ${isDark ? 'brightness-0' : ''} ${isCarePage ? 'h-[16px] md:h-[20px]' : 'h-[22px] md:h-7'}`}
            />
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Care pages: always-visible toggle pill — shown on all screen sizes */}
            {isCarePage ? (
              <div
                className="inline-flex p-1 rounded-full"
                style={{
                  background: isDark ? 'hsl(var(--foreground) / 0.07)' : 'rgba(255,255,255,0.18)',
                  border: isDark ? '1px solid hsl(var(--foreground) / 0.12)' : '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
                role="group"
                aria-label="Choose care type"
              >
                <button
                  onClick={() => navigate('/start-your-care')}
                  className="h-7 px-3 sm:h-8 sm:px-4 rounded-full font-sans text-[11px] sm:text-xs font-medium tracking-wide"
                  style={
                    isStartPage
                      ? { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
                      : { background: 'transparent', color: isDark ? 'hsl(var(--foreground) / 0.6)' : 'rgba(255,255,255,0.7)' }
                  }
                  aria-current={isStartPage ? 'page' : undefined}
                >
                  First time
                </button>
                <button
                  onClick={() => navigate('/continue-your-care')}
                  className="h-7 px-3 sm:h-8 sm:px-4 rounded-full font-sans text-[11px] sm:text-xs font-medium tracking-wide"
                  style={
                    !isStartPage
                      ? { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
                      : { background: 'transparent', color: isDark ? 'hsl(var(--foreground) / 0.6)' : 'rgba(255,255,255,0.7)' }
                  }
                  aria-current={!isStartPage ? 'page' : undefined}
                >
                  Returning
                </button>
              </div>
            ) : isPastHero ? (
              <>
                <a
                  href="/start-your-care"
                  className={`hidden lg:inline-flex items-center gap-2 h-10 px-6 rounded-full border ${borderClass} text-sm leading-none font-sans font-medium tracking-wide ${textClass} ${hoverBg} transition-all duration-500`}
                >
                  Start Your Care
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="ml-0.5">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="/continue-your-care"
                  className={`hidden lg:inline-flex items-center gap-2 h-10 px-6 rounded-full border ${borderClass} text-sm leading-none font-sans font-medium tracking-wide ${textClass} ${hoverBg} transition-all duration-500`}
                >
                  Continue Your Care
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="ml-0.5">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </>
            ) : null}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${iconClass} hover:opacity-100 transition-all duration-500`}
              aria-label="Menu"
              aria-expanded={isOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {isOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M4 6h16" strokeLinecap="round" />
                    <path d="M4 12h16" strokeLinecap="round" />
                    <path d="M4 18h16" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] hidden sm:block bg-foreground/20 backdrop-blur-sm"
              onClick={closeMenu}
            />

            {/* Mobile panel — slides up from bottom */}
            <motion.div
              initial={{ y: '100%', x: 0 }}
              animate={{ y: 0, x: 0 }}
              exit={{ y: '100%', x: 0 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-0 z-[70] sm:hidden flex flex-col"
              style={{ background: 'hsl(var(--background))' }}
            >
              <PanelContent closeMenu={closeMenu} />
            </motion.div>

            {/* Desktop panel — slides from right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[420px] hidden sm:flex flex-col shadow-2xl"
              style={{ background: 'hsl(var(--background))' }}
            >
              <PanelContent closeMenu={closeMenu} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const PanelContent = forwardRef<HTMLDivElement, { closeMenu: () => void }>(function PanelContent({ closeMenu }, _ref) {
  return (
    <>
      <div className="flex items-center justify-between px-8 pt-5 pb-3 sm:py-6">
        <img src={headerLogo} alt="Dr. Erica, ND" className="h-5 w-auto brightness-0" decoding="sync" loading="eager" />
        <button
          onClick={closeMenu}
          className="p-2 text-foreground/50 hover:text-foreground transition-colors"
          aria-label="Close menu"
        >
          <X size={22} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-2 sm:py-4 space-y-5 sm:space-y-8">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              {section.icon ? (
                <img src={section.icon} alt="" aria-hidden className="w-[18px] h-[18px] opacity-35" />
              ) : (
                <MessageCircle aria-hidden className="w-[18px] h-[18px] text-foreground/35" strokeWidth={1.5} />
              )}
              <span className="font-sans uppercase tracking-[0.18em] text-foreground/40 text-xs">
                {section.label}
              </span>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              {section.links.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-1 sm:py-1.5 text-foreground/80 hover:text-foreground transition-colors font-serif text-lg font-normal"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-8 pb-5 sm:pb-8 pt-3 sm:pt-4 space-y-2.5 sm:space-y-3">
        <a
          href="/start-your-care"
          onClick={closeMenu}
          className="flex items-center justify-center gap-2 h-10 w-full px-6 rounded-full bg-primary text-primary-foreground text-sm leading-none font-sans font-medium tracking-wide hover:bg-primary/90 transition-colors"
        >
          Start Your Care
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a
          href="#connect"
          onClick={closeMenu}
          className="flex items-center justify-center gap-2 h-10 w-full px-6 rounded-full border border-foreground/20 text-foreground/70 text-sm leading-none font-sans font-medium tracking-wide hover:bg-foreground/5 transition-colors"
        >
          Ask a Question
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </>
  )
})

export default Navbar
