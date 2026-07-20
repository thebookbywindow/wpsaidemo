import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
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
          <>
            <span className="home-media-card-play" aria-hidden="true">
              <Play size={22} fill="currentColor" />
            </span>
            {item.duration ? (
              <span className="home-media-card-duration">{item.duration}</span>
            ) : null}
          </>
        ) : null}
      </div>

      <div className="home-media-card-body">
        {typeof item.rating === 'number' ? <StarRow rating={item.rating} /> : null}
        <p className="home-media-card-quote">
          {item.quote.startsWith('"') ? item.quote : `"${item.quote}"`}
        </p>
        <span className="home-media-card-author">{item.author}</span>
      </div>
    </>
  )
}

/**
 * Social-proof media strip — capsule tabs above review grid.
 */
export default function HomeMediaProof({ title, tabsCopy }) {
  const titleId = useId()
  const scrollerRef = useRef(null)
  const [activeTab, setActiveTab] = useState(HOME_MEDIA_PROOF_TABS[0]?.id ?? 'kol')
  const [activeVideo, setActiveVideo] = useState(null)
  const [sliderOverflow, setSliderOverflow] = useState(false)

  const tabMeta =
    HOME_MEDIA_PROOF_TABS.find((tab) => tab.id === activeTab) ?? HOME_MEDIA_PROOF_TABS[0]
  const items = tabMeta?.items ?? []
  const activeTabDesc = tabsCopy?.[activeTab]?.desc ?? tabsCopy?.[tabMeta?.id]?.desc

  const updateSliderOverflow = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) {
      setSliderOverflow(false)
      return
    }
    setSliderOverflow(scroller.scrollWidth - scroller.clientWidth > 1)
  }, [])

  useLayoutEffect(() => {
    updateSliderOverflow()
  }, [activeTab, items, updateSliderOverflow])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return undefined

    const resizeObserver = new ResizeObserver(() => updateSliderOverflow())
    resizeObserver.observe(scroller)

    const mutationObserver = new MutationObserver(() => updateSliderOverflow())
    mutationObserver.observe(scroller, { childList: true, subtree: true })

    const onWindowResize = () => updateSliderOverflow()
    window.addEventListener('resize', onWindowResize)

    const images = scroller.querySelectorAll('img')
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', updateSliderOverflow, { once: true })
      }
    })

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('resize', onWindowResize)
    }
  }, [activeTab, items, updateSliderOverflow])

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
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : 'Media proof'}
    >
      {title ? (
        <h2
          id={titleId}
          className="home-section-title text-center text-[clamp(20px,2.5vw,26px)] font-semibold text-[#1a202c]"
        >
          {title}
        </h2>
      ) : null}

      <div className="home-section-inner mx-auto w-full max-w-[1160px]">
        <div className="home-media-content">
          <div className="home-media-layout">
            <div className="home-media-slider-wrap">
              <div className="home-media-tabs-wrap">
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
                {activeTabDesc ? (
                  <p className="home-media-tab-desc" key={activeTab}>
                    {activeTabDesc}
                  </p>
                ) : null}
              </div>

              <div className="home-media-slider-row">
                {sliderOverflow ? (
                  <button
                    type="button"
                    className="home-media-slider-nav is-prev"
                    aria-label="Previous"
                    onClick={() => scrollByPage(-1)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                ) : null}

                <div
                  ref={scrollerRef}
                  className={`home-media-grid${sliderOverflow ? '' : ' is-fits-viewport'}`}
                  role="tabpanel"
                  tabIndex={sliderOverflow ? 0 : -1}
                >
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

                {sliderOverflow ? (
                  <button
                    type="button"
                    className="home-media-slider-nav is-next"
                    aria-label="Next"
                    onClick={() => scrollByPage(1)}
                  >
                    <ChevronRight size={20} />
                  </button>
                ) : null}
              </div>
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
