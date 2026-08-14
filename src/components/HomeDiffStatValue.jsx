import { parseKeyFactCountParts } from '../utils/formatKeyFactStat'
import { useCountUpOnView } from '../hooks/useCountUpOnView'

/**
 * Glance strip big number — count-up on scroll into view.
 */
export default function HomeDiffStatValue({ value }) {
  const { count, suffix, finalValue } = parseKeyFactCountParts(value)
  const { ref, display } = useCountUpOnView(count, { suffix, finalValue })

  return (
    <dt ref={ref} className="hv2-stats__value home-diff-stat-value" aria-label={finalValue || undefined}>
      {display}
    </dt>
  )
}
