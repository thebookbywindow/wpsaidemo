/**
 * Closing download CTA — below FAQ, drives wps office download intent.
 */
export default function HomeDownloadSection({ copy, onDownloadClick }) {
  if (!copy?.title || !copy?.ctaLabel) return null

  return (
    <section
      id="home-download"
      className="home-download-section px-6 pb-24 pt-4"
      aria-labelledby="home-download-title"
    >
      <div className="home-section-inner mx-auto w-full max-w-[920px]">
        <div className="home-download-panel">
          <h2 id="home-download-title" className="home-download-title">
            {copy.title}
          </h2>
          <div className="home-download-actions">
            <button
              className="home-download-cta"
              type="button"
              onClick={onDownloadClick}
            >
              {copy.ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
