import { useEffect, useRef } from 'react'
import { useHomeTrustBar } from '../hooks/useHomeTrustBar'
import { useHomeTrustDockPin } from '../hooks/useHomeTrustDockPin'

function TrustBrandMark({ brand, decorative = false }) {
  if (brand.logoSrc) {
    return (
      <img
        className="home-trust-brand-logo"
        src={brand.logoSrc}
        alt={decorative ? '' : brand.name}
        decoding="async"
        draggable={false}
      />
    )
  }

  return <span className="home-trust-brand-fallback">{brand.name}</span>
}

function TrustBrandGroup({ brands, decorative = false }) {
  return (
    <div className="home-trust-marquee-group" aria-hidden={decorative ? 'true' : undefined}>
      {brands.map((brand) => (
        <span
          key={`${decorative ? 'dup' : 'live'}-${brand.id}`}
          className="home-trust-brand"
          data-brand={brand.id}
        >
          <TrustBrandMark brand={brand} decorative={decorative} />
        </span>
      ))}
    </div>
  )
}

/**
 * Trust strip — DOM order is label → brands.
 * Brands are fixed to the first viewport bottom until the in-flow slot catches them.
 * Logo track mirrors the marketing HTML marquee (duplicated group + translateX(-50%)).
 */
export default function HomeTrustBar({ label, copy }) {
  const { brands } = useHomeTrustBar(copy)
  const { slotRef, dockRef, pinned } = useHomeTrustDockPin()
  const marqueeRef = useRef(null)
  const trackRef = useRef(null)
  const rateFrameRef = useRef(0)
  const rateTargetRef = useRef(1)

  useEffect(() => {
    const marquee = marqueeRef.current
    const track = trackRef.current
    if (!marquee || !track) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return undefined

    const tweenRate = (targetRate) => {
      const animation = track.getAnimations()[0]
      if (!animation) return
      if (rateTargetRef.current === targetRate) return
      rateTargetRef.current = targetRate

      cancelAnimationFrame(rateFrameRef.current)
      const startRate = animation.playbackRate
      const startedAt = performance.now()
      const duration = 520

      const updateRate = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration)
        const eased = 1 - (1 - progress) ** 3
        animation.updatePlaybackRate(startRate + (targetRate - startRate) * eased)
        if (progress < 1) rateFrameRef.current = requestAnimationFrame(updateRate)
      }

      rateFrameRef.current = requestAnimationFrame(updateRate)
    }

    const slow = () => tweenRate(0.42)
    const reset = () => tweenRate(1)

    marquee.addEventListener('pointerenter', slow)
    marquee.addEventListener('pointerleave', reset)
    marquee.addEventListener('focusin', slow)
    marquee.addEventListener('focusout', reset)

    return () => {
      cancelAnimationFrame(rateFrameRef.current)
      marquee.removeEventListener('pointerenter', slow)
      marquee.removeEventListener('pointerleave', reset)
      marquee.removeEventListener('focusin', slow)
      marquee.removeEventListener('focusout', reset)
    }
  }, [brands])

  if (!brands.length) return null

  return (
    <section className="home-trust-bar" aria-label={label}>
      <div className="home-section-inner home-trust-bar-inner mx-auto w-full max-w-[1160px]">
        {label ? <p className="home-trust-bar-label">{label}</p> : null}

        <div ref={slotRef} className="home-trust-brands-slot">
          <div
            ref={dockRef}
            className={`home-trust-dock${pinned ? ' is-pinned' : ''}`}
          >
            <div ref={marqueeRef} className="home-trust-marquee" tabIndex={0}>
              <div ref={trackRef} className="home-trust-marquee-track">
                <TrustBrandGroup brands={brands} />
                <TrustBrandGroup brands={brands} decorative />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
