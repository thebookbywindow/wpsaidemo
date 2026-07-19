import { HOME_HERO_TYPEWRITER_NAMES } from '../data/homeHeroComponents'
import { resolveHeroTitleParts } from '../data/homeHeroTitle'
import { useHomeHeroComponentCycle } from '../hooks/useHomeHeroComponentCycle'
import HomeHeroProductIcon from './HomeHeroProductIcon'

/**
 * Hero H1: lead + (join + typewriter) + tail.
 * On mobile, join + typewriter wrap together as the second line.
 */
export default function HomeHeroTitle({ lead, join, tail, prefix, title }) {
  const { main: titleLead, join: titleJoin } = resolveHeroTitleParts({
    lead,
    join,
    prefix,
  })
  const titleTail = tail ?? ''
  const {
    active,
    index,
    typedName,
    phase,
    visibleCount,
    showIcon,
    prefersReducedMotion,
  } = useHomeHeroComponentCycle()

  const seoLabel =
    title ??
    `${titleLead}${titleJoin ? `${titleJoin} ` : ''}${HOME_HERO_TYPEWRITER_NAMES.join(', ')}${titleTail}`
  const showLabel = typedName.length > 0
  const isEmpty = visibleCount === 0
  const isTyping = phase === 'typing'

  return (
    <h1 className="home-hero-title mx-auto max-w-4xl">
      <span className="sr-only">{seoLabel}</span>
      <span className="home-hero-title-visual" aria-hidden="true">
        <span
          className={[
            'home-hero-title-line1',
            isTyping && !prefersReducedMotion ? 'is-typing' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {titleLead ? (
            <span
              key={`lead-${index}-${visibleCount}`}
              className={[
                'home-hero-title-lead',
                isTyping && !prefersReducedMotion ? 'is-live' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {titleLead}
            </span>
          ) : null}

          <span className="home-hero-title-join-group">
            {titleJoin ? (
              <span className="home-hero-title-join">{titleJoin}</span>
            ) : null}
            <span
              className={[
                'home-hero-product-pill',
                isEmpty ? 'is-empty' : '',
                phase === 'typing' && showIcon && !showLabel ? 'is-gap' : '',
                prefersReducedMotion ? 'is-static' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={
                active
                  ? {
                      '--pill-accent': active.color,
                      '--pill-accent-soft': `${active.color}1f`,
                    }
                  : undefined
              }
            >
              {showIcon ? <HomeHeroProductIcon item={active} /> : null}
              {showLabel ? (
                <span className="home-hero-product-pill-typed" data-typed={typedName}>
                  {typedName}
                </span>
              ) : null}
            </span>
          </span>
        </span>
        {titleTail ? <span className="home-hero-title-tail">{titleTail}</span> : null}
      </span>
    </h1>
  )
}
