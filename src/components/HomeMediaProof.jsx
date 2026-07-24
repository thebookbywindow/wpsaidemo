import { useEffect, useId, useState } from 'react'
import { Play, X } from 'lucide-react'
import { HOME_MEDIA_PROOF_TABS } from '../data/homeMediaProof'

function resolveMediaItemHref(item) {
  if (item.href) {
    return item.href
  }
  if (item.youtubeId) {
    return `https://www.youtube.com/watch?v=${item.youtubeId}`
  }
  return null
}

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

function MediaCardContent({ item }) {
  const isVideo = Boolean(item.youtubeId)
  const rating = typeof item.rating === 'number' ? item.rating : isVideo ? 4.5 : null

  return (
    <>
      <div className="home-media-card-thumb">
        <img
          src={item.thumb}
          alt=""
          className="home-media-card-thumb-img"
          loading="lazy"
          decoding="async"
          width={320}
          height={180}
        />
        {isVideo ? (
          <span className="home-media-card-badge" aria-hidden="true">
            <Play size={12} fill="currentColor" />
            {item.duration ? <span>{item.duration}</span> : null}
          </span>
        ) : null}
      </div>

      <div className="home-media-card-body">
        {typeof rating === 'number' ? <StarRow rating={rating} /> : null}
        <p className="home-media-card-quote">
          {item.quote.startsWith('"') ? item.quote : `"${item.quote}"`}
        </p>
        <span className="home-media-card-author">{item.author}</span>
      </div>
    </>
  )
}

/**
 * Social-proof media — pill tabs + fixed card grid.
 */
export default function HomeMediaProof({ title, tabsCopy }) {
  const titleId = useId()
  const [activeTab, setActiveTab] = useState(HOME_MEDIA_PROOF_TABS[0]?.id ?? 'kol')
  const [activeVideo, setActiveVideo] = useState(null)

  const tabMeta =
    HOME_MEDIA_PROOF_TABS.find((tab) => tab.id === activeTab) ?? HOME_MEDIA_PROOF_TABS[0]
  const items = tabMeta?.items ?? []

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

  if (!tabMeta) return null

  return (
    <section
      id="home-media-proof"
      className="home-media-proof-section px-6 py-12"
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : 'Media proof'}
    >
      <div className="home-section-inner mx-auto w-full max-w-[1160px]">
        {title ? (
          <h2 id={titleId} className="home-section-title text-center text-[#1a202c]">
            {title}
          </h2>
        ) : null}

        <div className="home-media-content">
          <nav className="home-media-tabs" role="tablist" aria-label={title}>
            {HOME_MEDIA_PROOF_TABS.map((tab) => {
              const copy = tabsCopy?.[tab.id]
              const selected = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`home-media-tab${selected ? ' is-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="home-media-tab-name">{copy?.name ?? tab.id}</span>
                </button>
              )
            })}
          </nav>

          <div className="home-media-grid" role="tabpanel">
            {items.map((item) => {
              const href = resolveMediaItemHref(item)
              const isVideo = Boolean(item.youtubeId)
              const linkLabel = isVideo
                ? `Play video by ${item.author}`
                : `Read review from ${item.author}`

              if (isVideo) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="home-media-card home-media-card--interactive"
                    onClick={() => setActiveVideo(item)}
                    aria-label={linkLabel}
                  >
                    <MediaCardContent item={item} />
                  </button>
                )
              }

              if (href) {
                return (
                  <a
                    key={item.id}
                    className="home-media-card home-media-card--interactive"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={linkLabel}
                  >
                    <MediaCardContent item={item} />
                  </a>
                )
              }

              return (
                <article key={item.id} className="home-media-card">
                  <MediaCardContent item={item} />
                </article>
              )
            })}
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
