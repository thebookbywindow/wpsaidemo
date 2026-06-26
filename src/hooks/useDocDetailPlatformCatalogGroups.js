import { useMemo } from 'react'
import {
  flattenDocDetailPlatformsForCatalog,
  groupDocDetailPlatformsForCatalog,
} from '../data/docDetailTocData'

export function useDocDetailPlatformCatalogGroups(platforms, isZhContent) {
  return useMemo(
    () => groupDocDetailPlatformsForCatalog(platforms, isZhContent),
    [platforms, isZhContent],
  )
}

export function useDocDetailFlatPlatformCatalog(platforms, isZhContent) {
  return useMemo(
    () => flattenDocDetailPlatformsForCatalog(platforms, isZhContent),
    [platforms, isZhContent],
  )
}
