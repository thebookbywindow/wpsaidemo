import { useEffect, useId, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { HOME_MEDIA_PROOF_TABS } from '../data/homeMediaProof'

function StarRow({ rating = 0 }) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const value = rating - index
    if (value >= 1) return 'full'
    if (value >= 0.5) return 'half'
    return 'empty'
  })

  return (
    <div className="home-media-stars" aria-label={`${rating} out of 5 stars`}>
      {stars.map((kind, index) => (
        <span key={index} className={`home-media-star is-${kind}`} aria-hidden="true" />
      ))}
    </div>
  )
}

/**
 * Social-proof media strip — WPS-style left nav + review grid.
 */
export default function HomeMediaProof({ title, tabsCopy }) {
  const titleId = useId()
  const scrollerRef = useRef(null)
  const [activeTab, setActiveTab] = useState(HOME_MEDIA_PROOF_TABS[0]?.id ?? 'kol')
  const [activeVideo, setActiveVideo] = useState(null)

  const tabMeta =
    HOME_MEDIA_PROOF_TABS.find((tab) => tab.id === activeTab) ?? HOME_MEDIA_PROOF_TABS[0]
  const items = tabMeta?.items ?? []

  useEffect(() => {
    const scroller = scrollerRef.current
    if (scroller) scroller.scrollTo({ left: 0, behavior: 'auto' })
  }, [activeTab])

  useEffect(() => {
    if (!activeVideo) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveVideo(null)
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [activeVideo])

  const scrollByPage = (direction) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const delta = Math.max(scroller.clientWidth * 0.9, 240) * direction
    scroller.scrollBy({ left: delta, behavior: 'smooth' })
  }

  if (!tabMeta) return null

  return (
    <section
      id="home-media-proof"
      className="home-media-proof-section px-6 py-12"
      aria-labelledby={titleId}
    >
      <div className="home-section-inner mx-auto w-full max-w-[1160px]">
        {title ? (
          <h2
            id={titleId}
            className="home-section-title text-center text-[clamp(20px,2.5vw,26px)] font-semibold text-[#1a202c]"
          >
            {title}
          </h2>
        ) : null}

        <div className="home-media-content">
          <div className="home-media-layout">
            <nav className="home-media-nav" role="tablist" aria-label={title}>
              {HOME_MEDIA_PROOF_TABS.map((tab) => {
                const copy = tabsCopy?.[tab.id]
                const selected = tab.id === activeTab
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={`home-media-nav-item${selected ? ' is-active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="home-media-nav-name">{copy?.name ?? tab.id}</span>
                    {copy?.desc ? (
                      <span className="home-media-nav-desc">{copy.desc}</span>
                    ) : null}
                  </button>
                )
              })}
            </nav>

            <div className="home-media-slider-wrap">
              <button
                type="button"
                className="home-media-slider-nav is-prev"
                aria-label="Previous"
                onClick={() => scrollByPage(-1)}
              >
                <ChevronLeft size={20} />
              </button>

              <div
                ref={scrollerRef}
                className="home-media-grid"
                role="tabpanel"
                tabIndex={0}
              >
                {items.map((item) => {
                  const isVideo = Boolean(item.youtubeId)
                  const thumbInner = (
                    <>
                      <img
                        src={item.thumb}
                        alt={item.author}
                        className="home-media-card-thumb-img"
                        loading="lazy"
                        decoding="async"
                        width={320}
                        height={180}
                      />
                      {isVideo ? (
                        <>
                          <span className="home-media-card-play" aria-hidden="true">
                            <Play size={22} fill="currentColor" />
                          </span>
                          {item.duration ? (
                            <span className="home-media-card-duration">
                              {item.duration}
                            </span>
                          ) : null}
                        </>
                      ) : null}
                    </>
                  )

                  return (
                    <article key={item.id} className="home-media-card">
                      {isVideo ? (
                        <button
                          type="button"
                          className="home-media-card-thumb"
                          onClick={() => setActiveVideo(item)}
                          aria-label={`Play video by ${item.author}`}
                        >
                          {thumbInner}
                        </button>
                      ) : (
                        <div className="home-media-card-thumb">{thumbInner}</div>
                      )}

                      <div className="home-media-card-body">
                        {typeof item.rating === 'number' ? (
                          <StarRow rating={item.rating} />
                        ) : null}
                        <p className="home-media-card-quote">
                          {item.quote.startsWith('"') ? item.quote : `"${item.quote}"`}
                        </p>
                        <span className="home-media-card-author">{item.author}</span>
                      </div>
                    </article>
                  )
                })}
              </div>

              <button
                type="button"
                className="home-media-slider-nav is-next"
                aria-label="Next"
                onClick={() => scrollByPage(1)}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeVideo ? (
        <div
          className="home-media-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.author}
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="home-media-video-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="home-media-video-modal-close"
              aria-label="Close video"
              onClick={() => setActiveVideo(null)}
            >
              <X size={20} />
            </button>
            <div className="home-media-video-modal-player">
              <iframe
                title={activeVideo.author}
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
