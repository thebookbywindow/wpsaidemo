import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Homepage FAQ — SEO query-shaped Q&A in a single accordion panel.
 */
export default function HomeFaq({ title, faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0)

  if (!faqs.length) return null

  const handleSummaryClick = (index, event) => {
    event.preventDefault()
    setOpenIndex((current) => (current === index ? -1 : index))
  }

  return (
    <section className="home-faq-section px-6 py-12 pb-20" id="home-faq">
      <div className="home-section-inner mx-auto w-full max-w-[920px]">
        <h2
          id="home-faq-title"
          className="home-section-title text-center text-[#1a202c]"
        >
          {title}
        </h2>

        <div
          className="home-faq-panel mt-8"
          role="region"
          aria-labelledby="home-faq-title"
        >
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <details
                key={item.question}
                className="home-faq-item"
                open={isOpen}
              >
                <summary
                  className="home-faq-summary"
                  onClick={(event) => handleSummaryClick(index, event)}
                >
                  <span className="home-faq-question">{item.question}</span>
                  <span className="home-faq-icon" aria-hidden="true">
                    <ChevronDown size={18} strokeWidth={2.25} />
                  </span>
                </summary>
                <div className="home-faq-answer">
                  <p>{item.answer}</p>
                </div>
              </details>
            )
          })}
        </div>
      </div>
    </section>
  )
}
