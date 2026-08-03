import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { startPlatformDownload } from '../utils/detectClientPlatform'

const PLATFORM_ASSETS = {
  windows: {
    icons: [{ src: '/images/platforms/windows.svg', alt: 'free download wps office for windows' }],
    cta: 'arrow',
    downloadId: 'windows',
  },
  linux: {
    icons: [{ src: '/images/platforms/linux.svg', alt: 'free download wps office for linux' }],
    cta: 'menu',
    menuId: 'linux-download-menu',
  },
  mac: {
    icons: [{ src: '/images/platforms/macos.svg', alt: 'free download wps office for mac' }],
    cta: 'arrow',
    downloadId: 'mac',
  },
  mobile: {
    icons: [
      { src: '/images/platforms/android.svg', alt: 'free download wps office for android' },
      { src: '/images/platforms/ios.svg', alt: 'free download wps office for ios' },
    ],
    cta: 'menu',
    menuId: 'mobile-download-menu',
  },
}

function triggerCardDownload(downloadId) {
  startPlatformDownload(downloadId || 'windows', { openGuidance: true })
}

function DownloadCtaIcon({ variant }) {
  if (variant === 'menu') {
    return (
      <span className="btn-icon down-roll" aria-hidden="true">
        <span className="down-spin">
          <img src="/images/platforms/down.svg" alt="" />
          <img className="btn-icon-clone" src="/images/platforms/down.svg" alt="" />
        </span>
      </span>
    )
  }

  return (
    <span className="btn-icon arrow-roll" aria-hidden="true">
      <img src="/images/platforms/arrow-up-right.svg" alt="" />
      <img className="btn-icon-clone" src="/images/platforms/arrow-up-right.svg" alt="" />
    </span>
  )
}

/**
 * Direct parity with pdf.wps.com `#download.home-pc-download`.
 */
export default function HomePlatformDownloads({ copy }) {
  const rootRef = useRef(null)
  const cardsRef = useRef(null)
  const [openMenu, setOpenMenu] = useState(null)

  const placeDropdown = (menuId) => {
    const cards = cardsRef.current
    const menu = cards?.querySelector(`#${menuId}`)
    if (!cards || !menu) return

    const cardIndex = menuId.includes('linux') ? 1 : 3
    const card = cards.querySelectorAll('.download-card')[cardIndex]
    const btn = card?.querySelector('button')
    if (!btn) return

    const cr = cards.getBoundingClientRect()
    const br = btn.getBoundingClientRect()
    menu.style.setProperty('--dropdown-top', `${Math.round(br.bottom - cr.top + 8)}px`)
    menu.style.setProperty('--dropdown-left', `${Math.round(br.left - cr.left)}px`)
  }

  useLayoutEffect(() => {
    if (!openMenu) return
    placeDropdown(openMenu)
  }, [openMenu])

  useEffect(() => {
    if (!openMenu) return undefined

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpenMenu(null)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpenMenu(null)
    }
    const onResize = () => placeDropdown(openMenu)

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [openMenu])

  if (!copy?.title || !copy?.cards?.length) return null

  const titlePrefix = copy.titlePrefix || copy.title
  const titleSuffix = copy.titleSuffix || ''
  const forLabel = copy.forLabel || 'WPS Office for'
  const ctaLabel = copy.ctaLabel || 'Free Download'

  const menuCards = copy.cards.filter((card) => card.menu?.length)

  return (
    <section
      ref={rootRef}
      id="download"
      className="home-pc-download"
      aria-labelledby="home-platform-downloads-title"
    >
      <div className="download-layout">
        <div className="download-intro">
          <h2 id="home-platform-downloads-title" className="is-split-title" dir="auto">
            <span className="download-title-line download-title-line--prefix">{titlePrefix}</span>
            {titleSuffix ? (
              <>
                <span className="download-title-space" aria-hidden="true">
                  &nbsp;
                </span>
                <span className="download-title-line download-title-line--suffix">{titleSuffix}</span>
              </>
            ) : null}
          </h2>
          {copy.summary ? <p dir="auto">{copy.summary}</p> : null}
        </div>

        <div ref={cardsRef} className="download-cards">
          {copy.cards.map((card) => {
            const asset = PLATFORM_ASSETS[card.id] || { icons: [], cta: 'arrow' }
            const isMenu = asset.cta === 'menu'
            const menuId = asset.menuId
            const expanded = Boolean(menuId && openMenu === menuId)

            return (
              <article key={card.id} className="download-card">
                <div className="download-card__main">
                  <div className="platforms">
                    {asset.icons.map((icon) => (
                      <img key={icon.src} src={icon.src} alt={icon.alt} />
                    ))}
                  </div>

                  <div className="heading">
                    <p className="label">{forLabel}</p>
                    <h3>{card.label}</h3>
                  </div>

                  <div className="body">
                    {card.desc ? (
                      <p className={`desc${card.descVariant === 'awards' ? ' desc--awards' : ''}`}>
                        {card.descVariant === 'awards'
                          ? card.desc.split('\n').map((line, index, arr) => (
                              <span key={`${card.id}-${index}`}>
                                {line}
                                {index < arr.length - 1 ? <br /> : null}
                              </span>
                            ))
                          : card.desc}
                      </p>
                    ) : null}
                    {card.meta ? <p className="meta">{card.meta}</p> : null}
                  </div>
                </div>

                <button
                  type="button"
                  className={`btn blue${isMenu ? ' download-toggle' : ''}`}
                  aria-expanded={isMenu ? expanded : undefined}
                  aria-controls={isMenu ? menuId : undefined}
                  onClick={() => {
                    if (isMenu && menuId) {
                      setOpenMenu(expanded ? null : menuId)
                      return
                    }
                    triggerCardDownload(asset.downloadId || card.platform || card.id)
                  }}
                >
                  <span className="btn-label">
                    <span className="home-pc-btn-text">
                      <span className="home-pc-btn-roll">
                        <span className="home-pc-btn-roll-line">{ctaLabel}</span>
                        <span className="home-pc-btn-roll-line" aria-hidden="true">
                          {ctaLabel}
                        </span>
                      </span>
                    </span>
                  </span>
                  <DownloadCtaIcon variant={asset.cta} />
                </button>
              </article>
            )
          })}

          {menuCards.map((card) => {
            const menuId = PLATFORM_ASSETS[card.id]?.menuId
            if (!menuId) return null
            const expanded = openMenu === menuId
            const kind = menuId.includes('linux') ? 'linux' : 'mobile'

            return (
              <div
                key={menuId}
                id={menuId}
                className={`dropdown ${kind}${expanded ? ' is-open' : ''}`}
              >
                {card.menu.map((item) => (
                  <div
                    key={item.id}
                    className="drop-row"
                    role="button"
                    tabIndex={expanded ? 0 : -1}
                    onClick={() => {
                      setOpenMenu(null)
                      triggerCardDownload(item.platform || item.id)
                    }}
                    onKeyDown={(event) => {
                      if (event.key !== 'Enter' && event.key !== ' ') return
                      event.preventDefault()
                      setOpenMenu(null)
                      triggerCardDownload(item.platform || item.id)
                    }}
                  >
                    <img src={item.iconSrc || '/images/platforms/download.svg'} alt="" />{' '}
                    {item.label}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
