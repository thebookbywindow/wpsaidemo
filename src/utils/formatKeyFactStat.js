/**
 * Split key-fact titles into a short stat value + label for the glance strip.
 * Does not change source copy — only display shaping.
 */
export function formatKeyFactStat(title = '') {
  const text = `${title}`.trim()
  if (!text) return { value: '', label: '' }

  let match = text.match(/^(\d+)\s*million\s+(.+)$/i)
  if (match) {
    return { value: `${match[1]}M+`, label: sentenceCase(match[2]) }
  }

  match = text.match(/^(\d+)\s*亿\s*(.+)$/)
  if (match) {
    return { value: `${match[1]}亿+`, label: match[2] }
  }

  match = text.match(/^(\d+)\s*万\+?\s*(.+)$/)
  if (match) {
    return { value: `${match[1]}万+`, label: match[2] }
  }

  match = text.match(/^(\d[\d,]*)\+\s+(.+)$/)
  if (match) {
    const raw = match[1].replace(/,/g, '')
    const numeric = Number(raw)
    const value =
      Number.isFinite(numeric) && numeric >= 1000
        ? `${Math.round(numeric / 1000)}K+`
        : `${match[1]}+`
    return { value, label: sentenceCase(match[2]) }
  }

  match = text.match(/^(\d+)\s+(.+)$/)
  if (match) {
    return { value: match[1], label: sentenceCase(match[2]) }
  }

  return { value: text, label: '' }
}

/**
 * Split a display value like "600M+" / "220+" / "46" / "20万+" into count + suffix
 * for the glance strip count-up animation.
 */
export function parseKeyFactCountParts(value = '') {
  const text = `${value}`.trim()
  if (!text) return { count: null, suffix: '', finalValue: '' }

  const match = text.match(/^(\d+(?:\.\d+)?)(.*)$/u)
  if (!match) return { count: null, suffix: '', finalValue: text }

  const count = Number(match[1])
  if (!Number.isFinite(count)) return { count: null, suffix: '', finalValue: text }

  return { count, suffix: match[2] ?? '', finalValue: text }
}

/** First markdown link URL in a key-fact description, if any. */
export function extractKeyFactHref(desc = '') {
  const match = `${desc}`.match(/\((https?:\/\/[^)\s]+)\)/)
  return match?.[1] ?? null
}

function sentenceCase(label = '') {
  const trimmed = `${label}`.trim()
  if (!trimmed || /[\u4e00-\u9fff]/.test(trimmed)) return trimmed
  return trimmed.replace(/^[a-z]/, (char) => char.toUpperCase())
}
