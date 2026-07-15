import { ExternalLink } from 'lucide-react'

/**
 * Homepage catalog of WPS International AI features with official external URLs.
 * Copilot is shown as suite-wide entry points; component groups are Writer → Photos.
 */
export default function HomeIntlAiFeatures({
  title,
  summary,
  groups,
  copilotLinks,
  copilotLabel,
}) {
  if (!groups?.length) return null

  return (
    <section
      id="home-intl-ai"
      className="home-intl-ai-section px-6 py-12"
      aria-labelledby="home-intl-ai-title"
    >
      <div className="home-section-inner mx-auto w-full max-w-[1160px]">
        <h2
          id="home-intl-ai-title"
          className="home-section-title text-center text-[clamp(20px,2.5vw,26px)] font-semibold text-[#1a202c]"
        >
          {title}
        </h2>
        <p className="home-section-subtitle mx-auto mt-2 max-w-[760px] text-center text-[14px] leading-relaxed text-[#4a5568]">
          {summary}
        </p>

        {copilotLinks?.length ? (
          <div className="home-intl-ai-copilot mt-8">
            <p className="home-intl-ai-copilot-label">{copilotLabel}</p>
            <ul className="home-intl-ai-copilot-list">
              {copilotLinks.map((item) => (
                <li key={item.id}>
                  <a
                    className="home-intl-ai-link"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="home-intl-ai-link-label">{item.label}</span>
                    <ExternalLink className="home-intl-ai-link-icon" size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="home-intl-ai-grid mt-6">
          {groups.map((group) => (
            <article key={group.id} className="home-intl-ai-group">
              <h3 className="home-intl-ai-group-title">{group.title}</h3>
              {group.note ? <p className="home-intl-ai-group-note">{group.note}</p> : null}
              <ul className="home-intl-ai-list">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <a
                      className="home-intl-ai-link"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="home-intl-ai-link-label">{item.label}</span>
                      <ExternalLink className="home-intl-ai-link-icon" size={14} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
