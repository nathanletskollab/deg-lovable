import { forwardRef, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
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
      { text: 'About Dr. Erica', href: '/about' },
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

type VisualTab = 'start' | 'return' | null

// Shared toggle pill — rendered twice (mobile center + desktop right) to avoid layout conflicts
function TogglePill({
  visualTab,
  isDark,
  isCarePage,
  handleTabClick,
  layoutPrefix,
  size = 'md',
  showChrome = true,
}: {
  visualTab: VisualTab
  isDark: boolean
  isCarePage: boolean
  handleTabClick: (tab: 'start' | 'return', path: string) => void
  layoutPrefix: string
  size?: 'sm' | 'md'
  showChrome?: boolean
}) {
  const [hoveredBtn, setHoveredBtn] = useState<'start' | 'return' | null>(null)
  const btnClass = size === 'sm'
    ? 'relative h-8 px-3 rounded-full font-sans text-[11px] font-medium tracking-wide transition-all duration-200'
    : 'relative h-7 px-3 sm:h-8 sm:px-4 rounded-full font-sans text-[11px] sm:text-xs font-medium tracking-wide transition-all duration-200'

  const getButtonStyle = (tab: 'start' | 'return') => {
    const isSelected = visualTab === tab
    const isHovered = hoveredBtn === tab && !isSelected
    return {
      color: isSelected
        ? 'hsl(var(--primary-foreground))'
        : isDark ? 'hsl(var(--foreground) / 0.65)' : 'rgba(255,255,255,0.75)',
      background: isHovered
        ? isDark ? 'hsl(var(--foreground) / 0.1)' : 'rgba(255,255,255,0.18)'
        : 'transparent',
    }
  }

  return (
    <div
      className="inline-flex p-1 rounded-full"
      style={{
        background: showChrome
          ? isDark ? 'hsl(var(--foreground) / 0.07)' : 'rgba(255,255,255,0.18)'
          : 'transparent',
        border: showChrome
          ? isDark ? '1px solid hsl(var(--foreground) / 0.12)' : '1px solid rgba(255,255,255,0.3)'
          : '1px solid transparent',
        backdropFilter: showChrome ? 'blur(8px)' : 'none',
      }}
      role="group"
      aria-label="Choose care type"
    >
      <button
        onClick={() => handleTabClick('start', '/start-your-care')}
        onMouseEnter={() => setHoveredBtn('start')}
        onMouseLeave={() => setHoveredBtn(null)}
        className={btnClass}
        style={getButtonStyle('start')}
        aria-current={isCarePage && visualTab === 'start' ? 'page' : undefined}
      >
        {visualTab === 'start' && (
          <motion.div
            layoutId={`${layoutPrefix}-pill`}
            className="absolute inset-0 rounded-full"
            style={{ background: 'hsl(var(--primary))' }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
        )}
        <span className="relative z-10">First time</span>
      </button>
      <button
        onClick={() => handleTabClick('return', '/continue-your-care')}
        onMouseEnter={() => setHoveredBtn('return')}
        onMouseLeave={() => setHoveredBtn(null)}
        className={btnClass}
        style={getButtonStyle('return')}
        aria-current={isCarePage && visualTab === 'return' ? 'page' : undefined}
      >
        {visualTab === 'return' && (
          <motion.div
            layoutId={`${layoutPrefix}-pill`}
            className="absolute inset-0 rounded-full"
            style={{ background: 'hsl(var(--primary))' }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
        )}
        <span className="relative z-10">Returning</span>
      </button>
    </div>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const themeStateRef = useRef({
    isLeftDark: false,
    isRightDark: false,
    isDark: false,
    isPastHero: false,
  })
  const location = useLocation()
  const navigate = useNavigate()

  const isCarePage = location.pathname === '/start-your-care' || location.pathname === '/continue-your-care'
  // On care pages show the selected tab; on all other pages no tab is pre-selected
  const [visualTab, setVisualTab] = useState<VisualTab>(
    location.pathname === '/continue-your-care' ? 'return' :
    location.pathname === '/start-your-care' ? 'start' : null
  )

  // Split-screen theme: logo tracks left side, toggle/hamburger track right side
  const [isLeftDark, setIsLeftDark] = useState(false)
  const [isRightDark, setIsRightDark] = useState(false)

  const handleTabClick = (tab: 'start' | 'return', path: string) => {
    if (visualTab === tab) return
    setVisualTab(tab)
    setTimeout(() => navigate(path), 260)
  }

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
      const clamp = (x: number) => Math.max(0, Math.min(window.innerWidth - 1, x))

      // Left side: sample two points near the logo
      const leftThemes = [0.08, 0.18].map(f => getThemeAtPoint(clamp(window.innerWidth * f), sampleY))
      const leftDarkVotes = leftThemes.filter(t => t === 'dark').length
      const nextLeftDark = leftDarkVotes > leftThemes.length / 2

      // Right side: sample two points near the toggle/hamburger
      const rightThemes = [0.72, 0.88].map(f => getThemeAtPoint(clamp(window.innerWidth * f), sampleY))
      const rightDarkVotes = rightThemes.filter(t => t === 'dark').length
      const nextRightDark = rightDarkVotes > rightThemes.length / 2

      // Overall dark = majority of all four sample points (used for nav background)
      const allVotes = leftDarkVotes + rightDarkVotes
      const nextDark = allVotes > 2

      // Hysteresis prevents rapid on/off toggles around the hero boundary.
      const pastHeroExit = window.innerHeight * 0.74
      const pastHeroEnter = window.innerHeight * 0.88
      const currentPastHero = themeStateRef.current.isPastHero
      const nextPastHero = currentPastHero
        ? window.scrollY > pastHeroExit
        : window.scrollY > pastHeroEnter

      const current = themeStateRef.current
      if (current.isLeftDark !== nextLeftDark) setIsLeftDark(nextLeftDark)
      if (current.isRightDark !== nextRightDark) setIsRightDark(nextRightDark)
      if (current.isDark !== nextDark) setIsDark(nextDark)
      if (current.isPastHero !== nextPastHero) setIsPastHero(nextPastHero)

      themeStateRef.current = {
        isLeftDark: nextLeftDark,
        isRightDark: nextRightDark,
        isDark: nextDark,
        isPastHero: nextPastHero,
      }
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

  // Right-side classes (toggle, hamburger)
  const iconClass = isRightDark ? 'text-foreground/80' : 'text-white/80'

  const closeMenu = () => setIsOpen(false)

  const toggleProps = { visualTab, isDark: isRightDark, isCarePage, handleTabClick, showChrome: isPastHero || isCarePage }

  return (
    <>
      <nav ref={navRef} className="fixed top-4 left-4 right-4 z-50 flex justify-center">
        {/*
          Mobile:  3-col grid  [monogram | toggle (center) | hamburger]
          Desktop: flex row    [wordmark  ………………  toggle | hamburger]
        */}
        <div
          className="w-full max-w-[1400px] transition-all duration-500 items-center px-4 py-3 sm:px-10 sm:py-4
                     grid grid-cols-[auto_1fr_auto]
                     sm:flex sm:justify-between"
          style={{
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
          {/* Mobile: serif "E" monogram — compact, elegant, leaves room for the toggle */}
          <a href="/" className="flex-shrink-0 z-10 sm:hidden" aria-label="Dr. Erica, ND">
            <span
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '22px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                color: isLeftDark ? 'hsl(var(--foreground) / 0.9)' : 'rgba(255,255,255,0.9)',
                lineHeight: 1,
                transition: 'color 0.5s',
              }}
            >
              E
            </span>
          </a>

          {/* Desktop: full wordmark */}
          <a href="/" className="flex-shrink-0 z-10 hidden sm:block">
            <img
              src={headerLogo}
              alt="Dr. Erica, ND"
              className={`w-auto h-[16px] md:h-[20px] transition-all duration-500 ${isLeftDark ? 'brightness-0' : ''}`}
            />
          </a>

          {/* Mobile center: toggle always visible — it's the primary nav action */}
          <div className="flex justify-center sm:hidden">
            <TogglePill {...toggleProps} layoutPrefix="mob" size="sm" />
          </div>

          {/* Right group */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 z-10">
            {/* Desktop toggle — global, replaces the two separate CTA links */}
            <div className="hidden sm:block">
              <TogglePill {...toggleProps} layoutPrefix="desk" size="md" />
            </div>

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

            {/* Mobile panel — slides up from bottom with top corner radius */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="fixed bottom-0 left-0 right-0 z-[70] sm:hidden flex flex-col"
              style={{
                background: 'hsl(var(--background))',
                height: 'calc(100dvh - 20px)',
                borderTopLeftRadius: '28px',
                borderTopRightRadius: '28px',
                boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
              }}
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-2 sm:py-4 space-y-5 sm:space-y-8">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              {section.icon ? (
                <img src={section.icon} alt="" aria-hidden className="w-[18px] h-[18px] opacity-35" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="w-[18px] h-[18px] text-foreground/35"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
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

      <div className="px-8 pb-8 sm:pb-8 pt-3 sm:pt-4 space-y-2.5 sm:space-y-3">
        <a
          href="/start-your-care"
          onClick={closeMenu}
          className="brand-button-motion flex items-center justify-center gap-2 h-10 w-full px-6 rounded-full bg-primary text-primary-foreground text-sm leading-none font-sans font-medium tracking-wide hover:bg-primary/90"
        >
          Start Your Care
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a
          href="#connect"
          onClick={closeMenu}
          className="brand-button-motion flex items-center justify-center gap-2 h-10 w-full px-6 rounded-full border border-foreground/20 text-foreground/70 text-sm leading-none font-sans font-medium tracking-wide hover:bg-foreground/5"
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
