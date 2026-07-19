import { useHomeTrustBar } from '../hooks/useHomeTrustBar'
import { useHomeTrustDockPin } from '../hooks/useHomeTrustDockPin'

/**
 * Trust strip — DOM order is label → brands.
 * Brands are fixed to the first viewport bottom until the in-flow slot catches them.
 */
export default function HomeTrustBar({ label, copy }) {
  const { marqueeItems } = useHomeTrustBar(copy)
  const { slotRef, dockRef, pinned } = useHomeTrustDockPin()

  return (
    <section className="home-trust-bar" aria-label={label}>
      <div className="home-section-inner home-trust-bar-inner mx-auto w-full max-w-[1160px]">
        {label ? <p className="home-trust-bar-label">{label}</p> : null}

        <div ref={slotRef} className="home-trust-brands-slot">
          <div
            ref={dockRef}
            className={`home-trust-dock${pinned ? ' is-pinned' : ''}`}
          >
            <div className="home-trust-marquee">
              <div className="home-trust-marquee-track">
                {marqueeItems.map((name) => (
                  <span key={name} className="home-trust-brand">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
