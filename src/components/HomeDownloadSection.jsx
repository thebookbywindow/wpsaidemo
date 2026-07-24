import { ShieldCheck } from 'lucide-react'

/**
 * Closing download CTA — below FAQ, drives wps office download intent.
 */
export default function HomeDownloadSection({ copy, onDownloadClick }) {
  if (!copy?.title || !copy?.ctaLabel) return null

  return (
    <section
      id="home-download"
      className="home-download-section px-6"
      aria-labelledby="home-download-title"
    >
      <div className="home-section-inner home-download-inner mx-auto w-full max-w-[920px]">
        <div className="home-download-panel">
          <h2 id="home-download-title" className="home-download-title">
            {copy.title}
          </h2>
          {copy.description ? (
            <p className="home-download-desc">{copy.description}</p>
          ) : null}
          <div className="home-download-actions">
            <button
              className="home-download-cta"
              type="button"
              onClick={onDownloadClick}
            >
              <span>{copy.ctaLabel}</span>
              <ShieldCheck
                className="home-download-cta-shield"
                size={18}
                strokeWidth={2.25}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
