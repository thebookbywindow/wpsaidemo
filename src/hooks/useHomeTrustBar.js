import { useMemo } from 'react'
import { HOME_TRUST_BRANDS } from '../data/homeTrustBrands'

/**
 * Resolves trust-bar brand names for the active locale.
 */
export function useHomeTrustBar(copy) {
  return useMemo(() => {
    const rawBrands = copy?.brands?.length ? copy.brands : HOME_TRUST_BRANDS
    const brands = [...new Set(rawBrands)]
    return { brands, marqueeItems: brands }
  }, [copy])
}
