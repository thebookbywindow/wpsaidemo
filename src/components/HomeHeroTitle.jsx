import { useSyncExternalStore } from 'react'
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

  return (
    <h1 className="hv2-hero__title home-hero-title">
      <span className="hv2-hero__title-visual home-hero-title-visual" aria-hidden="true">
        <span className={`hv2-hero__line home-hero-title-line1${isMobile ? ' is-mobile' : ''}`}>
          <span className="hv2-hero__lead home-hero-title-lead">
            {titleLead}
            {titleJoin}
          </span>
          <HomeHeroProductRoller
            items={items}
            index={index}
            prefersReducedMotion={prefersReducedMotion}
          />
        </span>
        {titleTail ? (
          <span className="hv2-hero__tail home-hero-title-tail">{renderHeroTitleTail(titleTail)}</span>
        ) : null}
      </span>
    </h1>
  )
}
