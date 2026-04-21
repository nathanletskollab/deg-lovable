import { motion } from 'framer-motion'
import { useState } from 'react'

const faqs = [
  {
    q: 'Can I speak to Dr. Erica before committing?',
    a: 'While I don\'t offer phone consultations before becoming a patient, you\'re welcome to reach out through the Contact Page with any questions. Once you\'re an active patient, you\'ll have direct access to connect with me as part of your ongoing care.',
  },
  {
    q: 'What makes naturopathic care different?',
    a: 'Naturopathic care looks at the whole person — not just your symptoms. It\'s about understanding the root of what\'s going on and supporting your body\'s natural ability to heal.',
  },
  {
    q: 'Do I need a referral to book?',
    a: 'Nope! You can book an appointment anytime — no referral necessary.',
  },
  {
    q: 'Do you see children and teens?',
    a: 'Yes! I work with patients of all ages and enjoy supporting families on their wellness journeys.',
  },
  {
    q: 'Can I bring my partner or support person?',
    a: 'Of course. You\'re welcome to bring anyone who helps you feel comfortable and supported.',
  },
]

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      data-navbar-theme="dark"
      className="section-layer section-layer--overlap section-layer--has-overlap section-texture-dots relative z-[7] bg-[#E4E8E2] py-12 md:py-36 overflow-hidden"
    >
      <div className="container relative z-10 flex-col gap-14 px-6 lg:px-[130px] flex items-center justify-center py-0 my-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="type-eyebrow mb-4 text-center">
            Common Questions
          </p>
          <h2 className="type-h2 text-foreground">
            What to Expect When You Work With Me
          </h2>
        </motion.div>

        <div className="w-full flex flex-col gap-4 py-0 my-0 mb-[100px]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div
                  className="rounded-[10px] md:rounded-[14px] overflow-hidden transition-shadow duration-300"
                  style={{
                    background: '#DEDFD5',
                    boxShadow: '3px 3px 0 0 #A3AA99',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-left group min-h-[52px] md:min-h-[60px] px-4 py-3 md:px-6 md:py-4"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="font-sans font-medium text-foreground pr-4 leading-[1.4] text-base">
                      {faq.q}
                    </span>
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? '300px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="px-4 md:px-6 pb-4 md:pb-5 pt-0 font-sans text-base leading-[1.6] text-foreground/75">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
