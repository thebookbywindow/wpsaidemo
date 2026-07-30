import { HOME_V2_CTA_BACKDROP } from '../data/homeV2Assets'
import { detectAndAlertPlatformDownload } from '../utils/detectClientPlatform'

/**
 * Closing download CTA — below FAQ, drives wps office download intent.
 * Visual: official hv2-cta with backdrop image.
 */
export default function HomeDownloadSection({ copy }) {
  if (!copy?.title || !copy?.ctaLabel) return null

  return (
    <section
      id="home-download"
      className="home-download-section hv2-cta-inner px-6"
      aria-labelledby="home-download-title"
    >
      <picture className="hv2-cta__backdrop" aria-hidden="true">
        <img
          className="hv2-cta__backdrop-img"
          src={HOME_V2_CTA_BACKDROP}
          alt=""
          width={1920}
          height={400}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="home-section-inner home-download-inner hv2-cta__content mx-auto w-full max-w-[920px]">
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
              onClick={() => {
                detectAndAlertPlatformDownload()
              }}
            >
              <span>{copy.ctaLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
