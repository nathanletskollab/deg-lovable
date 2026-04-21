import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'
import './GlassBlock.css'
import ericaPhoto from '@/assets/hero-portrait.png?format=webp&as=url'
import sectionBg from '@/assets/section1_background.png?format=webp&as=url'
import arrowDark from '@/assets/imgArrowRight1.svg'
import arrowLight from '@/assets/imgArrowRight.svg'
import iconEarlyYears from '@/assets/icons/EarlyYears.svg'
import iconPregnancy from '@/assets/icons/Pregnancy.svg'
import iconRunningEmpty from '@/assets/icons/RunningEmpty.svg'
import iconRootCause from '@/assets/icons/RootCause.svg'
import iconStress from '@/assets/icons/Stress.svg'

const CARDS = [
  {
    id: 1,
    bg: '#f1dbd3',
    label: 'The\nEarly Years',
    title: 'When Your Hormones Take Over',
    body: 'Irregular cycles, mood shifts, PMS, or feeling unlike yourself.',
    cta: 'Find your rhythm',
    icon: iconEarlyYears,
  },
  {
    id: 2,
    bg: '#e6e2da',
    label: 'Planning\nfor Pregnancy',
    title: "When You're Ready to Conceive",
    body: "Fertility is more than timing. We'll prepare your body, cycle, and hormones for what's ahead.",
    cta: 'Get fertility support',
    icon: iconPregnancy,
  },
  {
    id: 3,
    bg: '#dedfd5',
    label: 'Running\non Empty',
    title: 'When Energy Disappears',
    body: "Burnout, brain fog, or fatigue? We'll restore your energy at the root.",
    cta: 'Rebuild your energy',
    icon: iconRunningEmpty,
  },
  {
    id: 4,
    bg: '#e8e4d5',
    label: 'The\nRoot Cause',
    title: 'When Digestion Gets Complicated',
    body: "Bloating or sensitivities? We'll uncover the cause and bring lasting relief.",
    cta: 'Heal your digestion',
    icon: iconRootCause,
  },
  {
    id: 5,
    bg: '#f1dbd3',
    label: 'When Stress\nTakes Over',
    title: 'When Life Throws You Off Balance',
    body: "Stress or restless nights? We'll calm your system and reset your rhythm.",
    cta: 'Find your calm',
    icon: iconStress,
  },
] as const

const LightCard = ({ card }: { card: typeof CARDS[number] }) => (
  <article className="card" style={{ background: card.bg }}>
    <div className="card-icon-wrap">
      <img src={card.icon} alt="" aria-hidden="true" className="card-icon-svg" />
    </div>
    <p className="card-label whitespace-pre-line">{card.label}</p>
    <h3 className="card-title">{card.title}</h3>
    <p className="card-body">{card.body}</p>
    <a className="card-btn" href="https://drericagrenci.janeapp.com/">
      {card.cta}
      <img src={arrowDark} alt="" aria-hidden="true" />
    </a>
  </article>
)

const PineCard = () => (
  <article className="card card--pine">
    <div className="card-pine-photo">
      <img src={ericaPhoto} alt="Dr. Erica" loading="lazy" />
    </div>
    <p className="card-pine-heading">Not sure where to start?</p>
    <p className="card-pine-body">
      Tell me what's going on, and I'll guide you forward.
    </p>
    <a className="card-pine-btn" href="https://drericagrenci.janeapp.com/">
      Ask Dr. Erica
      <img src={arrowLight} alt="" aria-hidden="true" />
    </a>
  </article>
)

export default function GlassBlock() {
  const isMobile = useIsMobile()
  const allItems = [
    ...CARDS.map((c, i) => ({ type: 'light' as const, card: c, i })),
    { type: 'pine' as const, card: null, i: CARDS.length },
  ]

  return (
    <section data-navbar-theme="dark" className="glass-block">
      <img src={sectionBg} alt="" aria-hidden="true" className="glass-block-bg-img" />
      <div className="glass-block-inner">
        <h2 className="glass-heading">
          Hello, <strong className="font-serif">I'm Dr. Erica</strong>.
        </h2>
        <p className="glass-subheading whitespace-pre-line">
          I help moms and families move beyond quick fixes{'\n'}— to find real, lasting health from within.
        </p>

        {isMobile ? (
          <div className="flex flex-col">
            {allItems.map((item, idx) => (
              <div
                key={item.i}
                className="sticky"
                style={{
                  top: `${100 + item.i * 12}px`,
                  zIndex: item.i + 1,
                  marginBottom: idx === allItems.length - 1 ? '0px' : '60px',
                }}
              >
                {item.type === 'light' ? (
                  <LightCard card={item.card!} />
                ) : (
                  <PineCard />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-cards">
            {CARDS.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <LightCard card={card} />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: CARDS.length * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <PineCard />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
