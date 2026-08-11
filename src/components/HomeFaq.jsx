import { useEffect, useId, useRef, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { HOME_FAQ_TOPIC_IDS } from '../data/homeFaqTopics'
import { renderFaqAnswer } from '../utils/renderFaqAnswer'

/**
 * Homepage FAQ — topic pills + single-open accordion.
 * Copy comes from uiText; layout matches the pill / ± accordion pattern.
 */
export default function HomeFaq({ title, faqTopics = {} }) {
  const titleId = useId()
  const navRef = useRef(null)
  const topics = HOME_FAQ_TOPIC_IDS.map((id) => ({ id, ...faqTopics[id] })).filter(
    (topic) => topic.label && topic.faqs?.length,
  )

  const [activeTopicId, setActiveTopicId] = useState(topics[0]?.id ?? '')
  const [openIndex, setOpenIndex] = useState(0)

  const activeTopic = topics.find((topic) => topic.id === activeTopicId) ?? topics[0]

  useEffect(() => {
    setOpenIndex(0)
  }, [activeTopicId])

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
    <section className="home-faq-section" id="home-faq">
      <div className="hv2-container home-section-inner">
        <h2 id={titleId} className="hv2-section-title home-section-title">
          {title}
        </h2>

        <div className="home-faq-layout">
          <div className="hv2-faq__topics-row home-faq-nav-wrap">
            <nav
              className="hv2-tabs hv2-faq__topics home-faq-nav"
              role="tablist"
              aria-label={title}
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
                    className={`hv2-tab home-faq-nav-item${selected ? ' is-active' : ''}`}
                    onClick={() => setActiveTopicId(topic.id)}
                  >
                    <span className="home-faq-nav-name">{topic.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="hv2-faq__list home-faq-panel" role="tabpanel" aria-labelledby={titleId}>
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
                        <Minus size={18} strokeWidth={2.25} />
                      ) : (
                        <Plus size={18} strokeWidth={2.25} />
                      )}
                    </span>
                  </summary>
                  <div className="hv2-faq__answer home-faq-answer">
                    <p>{renderFaqAnswer(item.answer)}</p>
                  </div>
                </details>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
