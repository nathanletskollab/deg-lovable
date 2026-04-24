import './FooterDeg2025.css'
import logoImage from '@/assets/footer/eg-logo-stacked.png'
import iconStart from '@/assets/Layer 39.svg'
import iconCare from '@/assets/Layer 1.svg'
import iconPractice from '@/assets/Layer 2.svg'
import iconBeyond from '@/assets/Layer 36.svg'
import arrowRightLight from '@/assets/imgArrowRight1.svg'
import beachVideo from '@/assets/beach-video.mp4'
import beachPoster from '@/assets/beach-poster.jpg'

const menuColumns = [
  {
    title: 'START YOUR CARE',
    icon: iconStart,
    items: [
      { label: 'Start with Dr. Erica', href: '/start-your-care' },
      { label: 'Book an Appointment', href: 'https://drericagrenci.janeapp.com/' },
      { label: 'Follow-Up with Erica', href: 'https://drericagrenci.janeapp.com/' },
    ],
  },
  {
    title: 'YOUR CARE',
    icon: iconCare,
    items: [
      { label: 'Continue Your Care', href: '/continue-your-care' },
      { label: 'Your Care Team', href: '/continue-your-care#team' },
      { label: 'Your Health Record', href: '#', qualifier: 'coming soon' },
    ],
  },
  {
    title: 'ABOUT THE PRACTICE',
    icon: iconPractice,
    items: [
      { label: 'About Dr. Erica', href: '#about' },
      { label: 'Our Approach to Care', href: '#approach' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'BEYOND THE CLINIC',
    icon: iconBeyond,
    items: [
      { label: 'The Wellness Library', href: '#beyond' },
      { label: 'Earth Spirit Medicine', href: '#beyond' },
      { label: 'Earth Spirit Sanctuary', href: '#', qualifier: 'coming soon' },
    ],
  },
]

export default function FooterDeg2025() {
  return (
    <main data-navbar-theme="dark" className="footer-page relative" style={{ zIndex: 0 }}>

      {/* Video background */}
      <div className="footer-video-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={beachPoster}
          className="footer-video"
        >
          <source src={beachVideo} type="video/mp4" />
        </video>
        <div className="footer-video-overlay" />
      </div>

      <section className="footer-content">
        <div className="menu-grid px-0 text-left">
          {menuColumns.map((column) => (
            <article key={column.title} className="menu-column">
              <h2>
                <img src={column.icon} alt="" aria-hidden className="menu-icon" />
                {column.title}
              </h2>
              <ul>
                {column.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="menu-line"
                      {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.label}
                    </a>
                    {item.qualifier && (
                      <span className="menu-line-qualifier">{item.qualifier}</span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="cta-block">
          <h1>Not sure where to start?</h1>
          <p className="text-base">Begin with Dr. Erica — we will guide you.</p>
          <div className="cta-actions">
            <a href="/start-your-care" className="primary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', borderRadius: '58px', height: '40px', padding: '0 24px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              Start with Dr. Erica <img src={arrowRightLight} alt="" aria-hidden />
            </a>
            <a href="#connect" className="secondary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', borderRadius: '58px', height: '40px', padding: '0 24px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              Ask a Question <img src={arrowRightLight} alt="" aria-hidden />
            </a>
          </div>
          <a href="/continue-your-care" className="patient-link">
            <span className="text-base">Already a patient? </span>
            <span className="patient-link-underlined text-base">Continue your care →</span>
          </a>
        </div>

        <div className="logo-wrap">
          <img src={logoImage} alt="Dr. Erica, ND" />
        </div>
      </section>

      <footer className="legal-row">
        <p className="text-sm">© {new Date().getFullYear()} Dr. Erica Grenci, ND. All rights reserved.</p>
        <div>
          <a href="/privacy" className="text-sm">Privacy Policy</a>
          <a href="/terms" className="text-sm">Terms</a>
        </div>
      </footer>
    </main>
  )
}
