/**
 * Official wps.com product icons (Docs / Slides / Sheets / PDF / AirPage / AirSheet / Forms / DBSheet).
 */
export default function HomeHeroProductIcon({ item }) {
  if (!item?.iconSrc) return null

  return (
    <img
      className="home-hero-product-pill-icon"
      src={item.iconSrc}
      alt=""
      draggable={false}
      decoding="async"
    />
  )
}
