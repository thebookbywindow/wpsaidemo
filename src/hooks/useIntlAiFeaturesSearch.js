import { useMemo, useState } from 'react'
import {
  filterIntlAiFeatureGroups,
  normalizeIntlAiSearchQuery,
} from '../utils/intlAiFeaturesSearch'

/**
 * Instant search filter for the Intl AI features directory page.
 */
export function useIntlAiFeaturesSearch(groups) {
  const [query, setQuery] = useState('')

  const normalizedQuery = useMemo(() => normalizeIntlAiSearchQuery(query), [query])
  const filteredGroups = useMemo(
    () => filterIntlAiFeatureGroups(groups, query),
    [groups, query],
  )

  const isFiltering = normalizedQuery.length > 0
  const isEmpty = isFiltering && filteredGroups.length === 0

  return {
    query,
    setQuery,
    clearQuery: () => setQuery(''),
    filteredGroups,
    isFiltering,
    isEmpty,
  }
}
