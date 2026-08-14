import { ArrowUpRight } from 'lucide-react'
import { faqAnswerLinkLabels } from '../utils/homeFaq'
import { renderFaqAnswer } from '../utils/renderFaqAnswer'

/**
 * Spotlight feature bullets — title links to official WPS feature page when url is set.
 * variant="deck" → divider rows + trailing arrow for the colored stack cards.
 * Deck rows are already one link each — descriptions render as plain text (no nested <a>).
 */
export default function HomeAiSpotlightFeatureList({
  features = [],
  variant = 'default',
  className = '',
}) {
  if (!features.length) return null

  const isDeck = variant === 'deck'

  return (
    <ul
      className={`${isDeck ? 'hv2-deck__features home-ai-deck-features' : 'home-ai-spotlight-features'}${className ? ` ${className}` : ''}`}
    >
      {features.map((feature) => {
        const key = feature.id ?? feature.label

        if (isDeck) {
          const body = (
            <>
              <span className="home-ai-deck-feature-copy">
                <span className="home-ai-deck-feature-title">{feature.label}</span>
                {feature.description ? (
                  <span className="home-ai-deck-feature-desc">
                    {faqAnswerLinkLabels(feature.description)}
                  </span>
                ) : null}
              </span>
              <ArrowUpRight className="home-ai-deck-feature-arrow" size={20} strokeWidth={1.75} aria-hidden="true" />
            </>
          )

          return (
            <li key={key} className="hv2-deck__feature-row home-ai-deck-feature">
              {feature.url ? (
                <a
                    className="hv2-deck__feature home-ai-deck-feature-link"
                  href={feature.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {body}
                </a>
              ) : (
                <span className="hv2-deck__feature home-ai-deck-feature-link is-static">{body}</span>
              )}
            </li>
          )
        }

        const title = feature.url ? (
          <a
            className="home-faq-link home-ai-spotlight-feature-link"
            href={feature.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {feature.label}
          </a>
        ) : (
          <span className="home-ai-spotlight-feature-title">{feature.label}</span>
        )

        return (
          <li key={key} className="home-ai-spotlight-feature">
            <span className="home-ai-spotlight-feature-title">{title}</span>
            {feature.description ? (
              <span className="home-ai-spotlight-feature-desc">
                {renderFaqAnswer(feature.description)}
              </span>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
