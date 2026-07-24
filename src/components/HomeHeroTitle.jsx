import { HOME_HERO_TYPEWRITER_NAMES } from '../data/homeHeroComponents'
import { resolveHeroTitleParts } from '../data/homeHeroTitle'
import { useHomeHeroComponentCycle } from '../hooks/useHomeHeroComponentCycle'
import HomeHeroProductRoller from './HomeHeroProductRoller'

const HERO_TITLE_BRAND = 'WPS AI'

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
 * On mobile, join + roller wrap together as the second line.
 */
export default function HomeHeroTitle({ lead, join, tail, prefix, title }) {
  const { main: titleLead, join: titleJoin } = resolveHeroTitleParts({
    lead,
    join,
    prefix,
  })
  const titleTail = tail ?? ''
  const { index, items, prefersReducedMotion } = useHomeHeroComponentCycle()

  const seoLabel =
    title ??
    `${titleLead}${titleJoin ? `${titleJoin} ` : ''}${HOME_HERO_TYPEWRITER_NAMES.join(', ')}${titleTail}`

  return (
    <h1 className="home-hero-title mx-auto max-w-4xl">
      <span className="sr-only">{seoLabel}</span>
      <span className="home-hero-title-visual" aria-hidden="true">
        <span className="home-hero-title-line1">
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
        </span>
        {titleTail ? (
          <span className="home-hero-title-tail">{renderHeroTitleTail(titleTail)}</span>
        ) : null}
      </span>
    </h1>
  )
}
