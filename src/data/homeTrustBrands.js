/**
 * Trust strip brands — logo assets under /public/images/trust-logos/.
 * Prefer monochrome mac-logo_* SVGs from the marketing reference when available.
 */

export const HOME_TRUST_BRANDS = Object.freeze([
  Object.freeze({
    id: 'unesco',
    name: 'UNESCO',
    logoSrc: '/images/trust-logos/unesco.svg',
  }),
  Object.freeze({
    id: 'g2',
    name: 'G2',
    logoSrc: '/images/trust-logos/mac-logo-g2.svg',
  }),
  Object.freeze({
    id: 'aws',
    name: 'AWS',
    logoSrc: '/images/trust-logos/mac-logo-aws.svg',
  }),
  Object.freeze({
    id: 'cnet',
    name: 'CNET',
    logoSrc: '/images/trust-logos/mac-logo-cnet.svg',
  }),
  Object.freeze({
    id: 'trustpilot',
    name: 'Trustpilot',
    logoSrc: '/images/trust-logos/mac-logo-trustpilot.svg',
  }),
  Object.freeze({
    id: 'techradar',
    name: 'TechRadar',
    logoSrc: '/images/trust-logos/techradar.svg',
  }),
  Object.freeze({
    id: 'forbes',
    name: 'Forbes',
    logoSrc: '/images/trust-logos/mac-logo-forbes.svg',
  }),
])

const BRAND_BY_NAME = Object.freeze(
  Object.fromEntries(HOME_TRUST_BRANDS.map((brand) => [brand.name.toLowerCase(), brand])),
)

/** Resolve locale brand names to catalog entries (logo + stable id). */
export function resolveHomeTrustBrands(names = []) {
  const list = names.length ? names : HOME_TRUST_BRANDS.map((brand) => brand.name)
  const seen = new Set()
  const brands = []

  for (const raw of list) {
    const name = `${raw}`.trim()
    if (!name) continue
    const key = name.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)

    const catalog = BRAND_BY_NAME[key]
    brands.push(
      catalog ?? {
        id: key.replace(/\s+/g, '-'),
        name,
        logoSrc: null,
      },
    )
  }

  return brands
}
