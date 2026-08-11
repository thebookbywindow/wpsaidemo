import { useSyncExternalStore } from 'react'
import { HOME_HERO_TYPEWRITER_NAMES } from '../data/homeHeroComponents'
import { resolveHeroTitleParts } from '../data/homeHeroTitle'
import { useHomeHeroComponentCycle } from '../hooks/useHomeHeroComponentCycle'
import HomeHeroProductRoller from './HomeHeroProductRoller'

const HERO_TITLE_BRAND = 'WPS AI'
const HERO_MOBILE_MQ = '(max-width: 720px)'

const subscribeHeroMobile = (onStoreChange) => {
  const mediaQuery = window.matchMedia(HERO_MOBILE_MQ)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}
const getHeroMobileSnapshot = () => window.matchMedia(HERO_MOBILE_MQ).matches
const getHeroMobileServerSnapshot = () => false

function renderHeroTitleTail(text) {
  const index = text.indexOf(HERO_TITLE_BRAND)
  if (index === -1) return text

  return (
    <>
      {text.slice(0, index)}
      <span className="home-hero-title-tail-brand">{HERO_TITLE_BRAND}</span>
      {text.slice(index + HERO_TITLE_BRAND.length)}
    </>
  )
}

/**
 * Hero H1: lead + (join + 3D product roller) + tail.
 * Mobile: shorter lead, join ("for") sits on the first line; roller below.
 */
export default function HomeHeroTitle({
  lead,
  join,
  leadMobile,
  joinMobile,
  tail,
  prefix,
  title,
}) {
  const isMobile = useSyncExternalStore(
    subscribeHeroMobile,
    getHeroMobileSnapshot,
    getHeroMobileServerSnapshot,
  )

  const desktopParts = resolveHeroTitleParts({ lead, join, prefix })
  const mobileParts = resolveHeroTitleParts({
    lead: leadMobile ?? lead,
    join: joinMobile ?? join,
    prefix,
  })
  const titleLead = isMobile ? mobileParts.main : desktopParts.main
  const titleJoin = isMobile ? mobileParts.join : desktopParts.join
  const titleTail = tail ?? ''
  const { index, items, prefersReducedMotion } = useHomeHeroComponentCycle()

  const seoLabel =
    title ??
    `${desktopParts.main}${desktopParts.join ? `${desktopParts.join} ` : ''}${HOME_HERO_TYPEWRITER_NAMES.join(', ')}${titleTail}`

  return (
    <h1 className="hv2-hero__title home-hero-title">
      <span className="sr-only">{seoLabel}</span>
      <span className="home-hero-title-visual" aria-hidden="true">
        <span className={`home-hero-title-line1${isMobile ? ' is-mobile' : ''}`}>
          {isMobile ? (
            <>
              <span className="home-hero-title-lead-line">
                {titleLead ? <span className="home-hero-title-lead">{titleLead}</span> : null}
                {titleJoin ? <span className="home-hero-title-join">{titleJoin}</span> : null}
              </span>
              <span className="home-hero-title-join-group">
                <HomeHeroProductRoller
                  items={items}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </span>
            </>
          ) : (
            <>
              {titleLead ? <span className="home-hero-title-lead">{titleLead}</span> : null}
              <span className="home-hero-title-join-group">
                {titleJoin ? (
                  <span className="home-hero-title-join">{titleJoin}</span>
                ) : null}
                <HomeHeroProductRoller
                  items={items}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </span>
            </>
          )}
        </span>
        {titleTail ? (
          <span className="home-hero-title-tail">{renderHeroTitleTail(titleTail)}</span>
        ) : null}
      </span>
    </h1>
  )
}
