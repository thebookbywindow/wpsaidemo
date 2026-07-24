/**
 * Official wps.com product icons (Docs / Slides / Sheets / PDF / AirPage / AirSheet / Forms / DBSheet).
 */
export default function HomeHeroProductIcon({ item, className = 'home-hero-product-pill-icon' }) {
  if (!item?.iconSrc) return null

  return (
    <img
      className={className}
      src={item.iconSrc}
      alt=""
      draggable={false}
      decoding="async"
    />
  )
}
