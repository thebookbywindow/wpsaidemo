import { renderFaqAnswer } from '../utils/renderFaqAnswer'

/**
 * Spotlight feature bullets — title links to official WPS feature page when url is set.
 */
export default function HomeAiSpotlightFeatureList({ features = [] }) {
  if (!features.length) return null

  return (
    <ul className="home-ai-spotlight-features">
      {features.map((feature) => {
        const key = feature.id ?? feature.label
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
