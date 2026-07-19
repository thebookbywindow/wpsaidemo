import { HOME_HERO_COPILOT } from '../data/homeHeroComponents'
import { getHomeAiPillarDirectoryHref } from '../data/homeAiCapabilities'

/**
 * Dedicated Copilot spotlight — below Trusted worldwide, above AI capabilities.
 */
export default function HomeHeroCopilot({ copy, localeAiFeaturesPath, navigateTo }) {
  if (!copy || !HOME_HERO_COPILOT) return null

  const href = getHomeAiPillarDirectoryHref(localeAiFeaturesPath, 'copilot')
  const features = copy.features ?? []
  const imageAlt = copy.imageAlt ?? copy.title ?? HOME_HERO_COPILOT.name

  return (
    <section
      id="home-copilot"
      className="home-hero-copilot-section px-6 py-10"
      aria-labelledby="home-copilot-title"
    >
      <div className="home-section-inner mx-auto w-full max-w-[1160px]">
        <article className="home-hero-copilot-panel">
          <div className="home-hero-copilot-body">
            <div className="home-hero-copilot-head">
              <img
                className="home-hero-copilot-icon"
                src={HOME_HERO_COPILOT.iconSrc}
                alt=""
                width={48}
                height={48}
                draggable={false}
                decoding="async"
              />
              <div className="home-hero-copilot-head-text">
                {copy.badge ? (
                  <p className="home-hero-copilot-badge">{copy.badge}</p>
                ) : null}
                <h2 id="home-copilot-title" className="home-hero-copilot-title">
                  {copy.title}
                </h2>
              </div>
            </div>

            {copy.summary ? (
              <p className="home-hero-copilot-summary">{copy.summary}</p>
            ) : null}

            {features.length ? (
              <ul className="home-hero-copilot-features">
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            ) : null}

            {href ? (
              <a
                className="home-hero-copilot-link"
                href={href}
                onClick={(event) => {
                  event.preventDefault()
                  navigateTo?.(href, { scrollToTop: false })
                }}
              >
                {copy.ctaLabel}
                <span aria-hidden="true">→</span>
              </a>
            ) : null}
          </div>

          {HOME_HERO_COPILOT.imageSrc ? (
            <div className="home-hero-copilot-media">
              <img
                className="home-hero-copilot-image"
                src={HOME_HERO_COPILOT.imageSrc}
                alt={imageAlt}
                width={1160}
                height={652}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          ) : null}
        </article>
      </div>
    </section>
  )
}
