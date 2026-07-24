import { useMemo } from 'react'
import { HOME_TRUST_BRANDS, resolveHomeTrustBrands } from '../data/homeTrustBrands'

/**
 * Resolves trust-bar brands (name + logo) for the active locale.
 */
export function useHomeTrustBar(copy) {
  return useMemo(() => {
    const brands = resolveHomeTrustBrands(copy?.brands?.length ? copy.brands : HOME_TRUST_BRANDS.map((b) => b.name))
    return { brands }
  }, [copy])
}
