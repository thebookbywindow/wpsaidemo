import { useEffect, useRef, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { HOME_FAQ_TOPIC_IDS } from '../data/homeFaqTopics'
import { renderFaqAnswer } from '../utils/renderFaqAnswer'

/**
 * Homepage FAQ — topic pills + single-open accordion.
 * Copy comes from uiText; layout matches the pill / ± accordion pattern.
 */
export default function HomeFaq({ title, faqTopics = {} }) {
  const navRef = useRef(null)
  const topics = HOME_FAQ_TOPIC_IDS.map((id) => ({ id, ...faqTopics[id] })).filter(
    (topic) => topic.label && topic.faqs?.length,
  )

  const [activeTopicId, setActiveTopicId] = useState(topics[0]?.id ?? '')
  const [openIndex, setOpenIndex] = useState(0)

  const activeTopic = topics.find((topic) => topic.id === activeTopicId) ?? topics[0]

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const activeTab = nav.querySelector('.home-faq-nav-item.is-active')
    activeTab?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [activeTopicId])

  if (!topics.length || !activeTopic) return null

  const handleSummaryClick = (index, event) => {
    event.preventDefault()
    setOpenIndex((current) => (current === index ? -1 : index))
  }

  return (
    <div className="hv2-container home-section-inner">
      <h2 className="hv2-section-title home-section-title">
        {title}
      </h2>

      <div className="hv2-faq__topics-row home-faq-nav-wrap">
        <div
          className="hv2-tabs hv2-faq__topics home-faq-nav"
          role="tablist"
          aria-label="FAQ topics"
          ref={navRef}
        >
          {topics.map((topic) => {
            const selected = topic.id === activeTopicId
            return (
              <button
                key={topic.id}
                type="button"
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                aria-controls="hv2-faq-panel"
                className={`hv2-tab home-faq-nav-item${selected ? ' is-active' : ''}`}
                onClick={() => {
                  setActiveTopicId(topic.id)
                  setOpenIndex(0)
                }}
              >
                <span className="home-faq-nav-name">{topic.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        id="hv2-faq-panel"
        className="hv2-faq__list home-faq-panel"
        role="tabpanel"
        aria-label={activeTopic.label}
      >
        {activeTopic.faqs.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <details key={item.question} className="hv2-faq__item home-faq-item" open={isOpen}>
              <summary
                className="hv2-faq__summary home-faq-summary"
                onClick={(event) => handleSummaryClick(index, event)}
              >
                <span className="hv2-faq__question home-faq-question">{item.question}</span>
                <span className="hv2-faq__icon home-faq-icon" aria-hidden="true">
                  {isOpen ? (
                    <Minus size={24} strokeWidth={2} />
                  ) : (
                    <Plus size={24} strokeWidth={2} />
                  )}
                </span>
              </summary>
              <div className="hv2-faq__answer home-faq-answer">
                {renderFaqAnswer(item.answer)}
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )
}
