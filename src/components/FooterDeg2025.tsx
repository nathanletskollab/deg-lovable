import './FooterDeg2025.css'
import textureImage from '@/assets/imgMashaKotliarenkoY0ZEs82Oxl0Unsplash2.jpg'
import logoImage from '@/assets/EG-logo_stacked-v2.svg'
import iconStart from '@/assets/Layer 39.svg'
import iconCare from '@/assets/Layer 1.svg'
import iconPractice from '@/assets/Layer 2.svg'
import iconBeyond from '@/assets/Layer 36.svg'
import arrowRightDark from '@/assets/imgArrowRight.svg'
import arrowRightLight from '@/assets/imgArrowRight1.svg'

const menuColumns = [
  {
    title: 'START YOUR CARE',
    icon: iconStart,
    items: ['Start with Dr. Erica', 'Book an Appointment', 'Follow-Up with Erica'],
  },
  {
    title: 'YOUR CARE',
    icon: iconCare,
    items: ['Continue Your Care', 'Your Care Team', 'Your Health Record\n(coming soon)'],
  },
  {
    title: 'ABOUT THE PRACTICE',
    icon: iconPractice,
    items: ['About Dr. Erica', 'Our Approach to Care', 'FAQ'],
  },
  {
    title: 'BEYOND THE CLINIC',
    icon: iconBeyond,
    items: ['The Wellness Library', 'Earth Spirit Medicine', 'Earth Spirit Sanctuary\n(coming soon)'],
  },
]

export default function FooterDeg2025() {
  return (
    <main data-navbar-theme="dark" className="footer-page section-layer section-layer--overlap relative" style={{ borderRadius: 0, zIndex: 0 }}>
      <section className="footer-content">
        <div className="menu-grid px-0 text-left">
          {menuColumns.map((column) => (
            <article key={column.title} className="menu-column">
              <h2>
                <img src={column.icon} alt="" aria-hidden className="menu-icon" />
                {column.title}
              </h2>
              <ul>
                {column.items.map((item) => {
                  const [label, qualifier] = item.split('\n')
                  return (
                    <li key={item}>
                      <span className="menu-line">{label}</span>
                      {qualifier && (
                        <span className="menu-line-qualifier">{qualifier}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </article>
          ))}
        </div>

        <div className="cta-block">
          <h1>Not sure where to start?</h1>
          <p className="text-base">Begin with Dr. Erica — we will guide you.</p>
          <div className="cta-actions">
            <button className="primary-btn" type="button">
              Start with Dr. Erica <img src={arrowRightDark} alt="" aria-hidden />
            </button>
            <button className="secondary-btn" type="button">
              Ask a Question <img src={arrowRightLight} alt="" aria-hidden />
            </button>
          </div>
          <a href="https://drericagrenci.janeapp.com/" className="patient-link">
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
          <a href="/" className="text-sm">Privacy Policy</a>
          <a href="/" className="text-sm">Terms</a>
        </div>
      </footer>

      <div className="texture-mask">
        <div className="texture-overlay" />
        <img src={textureImage} alt="" aria-hidden />
      </div>
    </main>
  )
}
