/**
 * Trust strip brands — official home-v2 grayscale logos.
 * Order matches https://www.wps.ai/en-US/ `.hv2-hero__marquee-set`.
 */
import { withPublicAssetPath } from '../utils/publicAssetPath'

export const HOME_TRUST_BRANDS = Object.freeze([
  Object.freeze({
    id: 'unesco',
    name: 'UNESCO',
    logoSrc: withPublicAssetPath('/images/home-v2/trust-unesco.png'),
  }),
  Object.freeze({
    id: 'g2',
    name: 'G2',
    logoSrc: withPublicAssetPath('/images/home-v2/trust-g2.png'),
  }),
  Object.freeze({
    id: 'aws',
    name: 'AWS',
    logoSrc: withPublicAssetPath('/images/home-v2/trust-aws.webp'),
  }),
  Object.freeze({
    id: 'cnet',
    name: 'CNET',
    logoSrc: withPublicAssetPath('/images/home-v2/trust-cnet.png'),
  }),
  Object.freeze({
    id: 'techradar',
    name: 'TechRadar',
    logoSrc: withPublicAssetPath('/images/home-v2/trust-techradar.webp'),
  }),
  Object.freeze({
    id: 'forbes',
    name: 'Forbes',
    logoSrc: withPublicAssetPath('/images/home-v2/trust-forbes.webp'),
  }),
  Object.freeze({
    id: 'trustpilot',
    name: 'Trustpilot',
    logoSrc: withPublicAssetPath('/images/home-v2/trust-trustpilot.webp'),
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
