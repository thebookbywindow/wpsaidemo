import { useEffect, useLayoutEffect, useRef } from 'react'
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

function TrustBrandGroup({ brands, decorative = false, copyKey = 'live' }) {
  return (
    <div className="home-trust-marquee-group" aria-hidden={decorative ? 'true' : undefined}>
      {brands.map((brand) => (
        <span
          key={`${copyKey}-${brand.id}`}
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
 * Seamless marquee: duplicate groups + pixel-exact translate (not -50%).
 */
export default function HomeTrustBar({ label, copy }) {
  const { brands } = useHomeTrustBar(copy)
  const { slotRef, dockRef, pinned } = useHomeTrustDockPin()
  const marqueeRef = useRef(null)
  const trackRef = useRef(null)
  const rateFrameRef = useRef(0)
  const rateTargetRef = useRef(1)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track || !brands.length) return undefined

    const firstGroup = track.querySelector('.home-trust-marquee-group')
    if (!firstGroup) return undefined

    let cancelled = false

    const syncShift = () => {
      if (cancelled) return
      const width = Math.round(firstGroup.getBoundingClientRect().width)
      if (width <= 0) return

      const prev = Number.parseFloat(track.style.getPropertyValue('--trust-shift')) || 0
      const alreadyReady = track.classList.contains('is-ready')
      // Ignore sub-pixel noise; rewriting --trust-shift mid-loop causes a visible hitch.
      if (alreadyReady && Math.abs(prev - width) < 1) return

      track.classList.remove('is-ready')
      track.style.setProperty('--trust-shift', `${width}px`)
      // Restart from 0 so the keyframe distance matches the measured group width.
      track.style.animation = 'none'
      void track.offsetWidth
      track.style.animation = ''
      track.classList.add('is-ready')
    }

    const waitImages = async () => {
      const images = [...track.querySelectorAll('img')]
      await Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve()
          return img.decode?.().catch(() => undefined) ??
            new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true })
              img.addEventListener('error', resolve, { once: true })
            })
        }),
      )
      if (!cancelled) syncShift()
    }

    syncShift()
    void waitImages()

    const observer = new ResizeObserver(syncShift)
    observer.observe(firstGroup)
    window.addEventListener('resize', syncShift)

    return () => {
      cancelled = true
      observer.disconnect()
      window.removeEventListener('resize', syncShift)
    }
  }, [brands])

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
      <div className="home-trust-bar-inner w-full">
        {label ? <p className="home-trust-bar-label">{label}</p> : null}

        <div ref={slotRef} className="home-trust-brands-slot">
          <div
            ref={dockRef}
            className={`home-trust-dock${pinned ? ' is-pinned' : ''}`}
          >
            <div ref={marqueeRef} className="home-trust-marquee" tabIndex={0}>
              <div ref={trackRef} className="home-trust-marquee-track">
                <TrustBrandGroup brands={brands} copyKey="a" />
                <TrustBrandGroup brands={brands} decorative copyKey="b" />
                <TrustBrandGroup brands={brands} decorative copyKey="c" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
