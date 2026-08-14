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
    <div className="hv2-proof__stars home-media-stars" aria-label={`${rating} out of 5 stars`}>
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
      <div className="hv2-proof__thumb home-media-card-thumb">
        <img
          src={item.thumb}
          alt=""
          className="hv2-proof__thumb-img home-media-card-thumb-img"
          loading="lazy"
          decoding="async"
          width={320}
          height={180}
        />
        {isVideo ? (
          <span className="hv2-proof__badge home-media-card-badge" aria-hidden="true">
            <Play size={12} fill="currentColor" />
            {item.duration ? <span>{item.duration}</span> : null}
          </span>
        ) : null}
      </div>

      <div className="hv2-proof__body home-media-card-body">
        {typeof rating === 'number' ? <StarRow rating={rating} /> : null}
        <p className="hv2-proof__quote home-media-card-quote">
          {item.quote.startsWith('"') ? item.quote : `"${item.quote}"`}
        </p>
        <span className="hv2-proof__author home-media-card-author">{item.author}</span>
      </div>
    </>
  )
}

/**
 * Social-proof media — pill tabs + fixed card grid.
 */
export default function HomeMediaProof({ title, summary, tabsCopy }) {
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

  const pages = Array.from({ length: Math.ceil(items.length / 2) }, (_, index) =>
    items.slice(index * 2, index * 2 + 2),
  )

  const renderCard = (item) => {
    const href = resolveMediaItemHref(item)
    const isVideo = Boolean(item.youtubeId)
    const linkLabel = isVideo
      ? `Play video by ${item.author}`
      : `Read review from ${item.author}`

    const content = <MediaCardContent item={item} />
    const link = isVideo ? (
      <button
        type="button"
        className="hv2-proof__link home-media-card-link"
        onClick={() => setActiveVideo(item)}
        aria-label={linkLabel}
      >
        {content}
      </button>
    ) : href ? (
      <a
        className="hv2-proof__link home-media-card-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={linkLabel}
      >
        {content}
      </a>
    ) : (
      <div className="hv2-proof__link home-media-card-link">{content}</div>
    )

    return (
      <div key={item.id} className="hv2-proof__card home-media-card">
        {link}
      </div>
    )
  }

  return (
    <>
      <div className="hv2-container home-section-inner">
        {title ? (
          <h2 id={titleId} className="hv2-section-title home-section-title">
            {title}
          </h2>
        ) : null}
        {summary ? <p className="hv2-section-sub home-media-summary">{summary}</p> : null}

        <div className="hv2-proof__tabs-row home-media-content">
          <nav className="hv2-tabs home-media-tabs" role="tablist" aria-label={title}>
            {HOME_MEDIA_PROOF_TABS.map((tab) => {
              const copy = tabsCopy?.[tab.id]
              const selected = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`hv2-tab home-media-tab${selected ? ' is-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="home-media-tab-name">{copy?.name ?? tab.id}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <ul className="hv2-proof__grid home-media-grid" role="tabpanel" aria-label={title}>
          {pages.map((page, index) => (
            <li key={`${tabMeta.id}-page-${index}`} className="hv2-proof__page">
              {page.map(renderCard)}
            </li>
          ))}
        </ul>
      </div>

      {activeVideo ? (
        <dialog
          open
          className="hv2-proof__modal home-media-video-modal"
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
        </dialog>
      ) : null}
    </>
  )
}
