/**
 * WPS Office apps — names/icons from official wps.com homepage.
 * Icons saved under /icons/wps/*.svg (extracted from https://www.wps.com/).
 */
export const HOME_HERO_COMPONENTS = Object.freeze([
  Object.freeze({
    id: 'copilot',
    name: 'Copilot',
    color: '#2052FC',
    iconSrc: '/icons/wps/copilot.svg',
  }),
  Object.freeze({
    id: 'docs',
    name: 'Docs',
    color: '#1D70F5',
    iconSrc: '/icons/wps/docs.svg',
  }),
  Object.freeze({
    id: 'slides',
    name: 'Slides',
    color: '#F17C22',
    iconSrc: '/icons/wps/slides.svg',
  }),
  Object.freeze({
    id: 'sheets',
    name: 'Sheets',
    color: '#1FAF5B',
    iconSrc: '/icons/wps/sheets.svg',
  }),
  Object.freeze({
    id: 'pdf',
    name: 'PDF',
    color: '#EB2F3B',
    iconSrc: '/icons/wps/pdf.svg',
  }),
  Object.freeze({
    id: 'photos',
    name: 'Photos',
    color: '#6D5AFA',
    iconSrc: '/icons/wps/photos.svg',
  }),
  Object.freeze({
    id: 'airpage',
    name: 'AirPage',
    color: '#9152FF',
    iconSrc: '/icons/wps/airpage.svg',
  }),
  Object.freeze({
    id: 'airsheet',
    name: 'AirSheet',
    color: '#1EA623',
    iconSrc: '/icons/wps/airsheet.svg',
  }),
  Object.freeze({
    id: 'forms',
    name: 'Forms',
    color: '#009BBA',
    iconSrc: '/icons/wps/forms.svg',
  }),
  Object.freeze({
    id: 'dbsheet',
    name: 'DBSheet',
    color: '#00A692',
    iconSrc: '/icons/wps/dbsheet.svg',
  }),
])

const COPILOT_HERO_COMPONENT = HOME_HERO_COMPONENTS.find((item) => item.id === 'copilot') ?? null

export const HOME_HERO_COPILOT = COPILOT_HERO_COMPONENT
  ? Object.freeze({
      ...COPILOT_HERO_COMPONENT,
      imageSrc: '/images/intl-ai-features/wps-ai-copilot-hub.jpg',
      imageWidth: 708,
      imageHeight: 600,
      sourceImageUrl:
        'https://ds.cache.wpscdn.com/wps_ai_website/_nuxt/ai-banner-img.db370249.jpg',
    })
  : null

/** Hero typewriter cycle — Copilot has its own section below the fold. */
export const HOME_HERO_TYPEWRITER_COMPONENTS = Object.freeze(
  HOME_HERO_COMPONENTS.filter((item) => item.id !== 'copilot'),
)

export const HOME_HERO_COMPONENT_NAMES = HOME_HERO_COMPONENTS.map((item) => item.name)

export const HOME_HERO_TYPEWRITER_NAMES = HOME_HERO_TYPEWRITER_COMPONENTS.map(
  (item) => item.name,
)

/** Icon occupies the first typewriter slot before text letters. */
export const HERO_TYPEWRITER_ICON_SLOTS = 1

/**
 * Advance rotating hero index with safe wrap / empty / out-of-range handling.
 * @param {number} current
 * @param {number} length
 * @returns {number}
 */
export function nextHeroComponentIndex(current, length) {
  if (!Number.isFinite(length) || length < 1) return 0
  if (!Number.isFinite(current) || current < 0 || current >= length) return 0
  return (current + 1) % length
}

/**
 * Resolve active item; empty list returns null.
 * @param {ReadonlyArray<{ id: string, name: string, color: string }>} items
 * @param {number} index
 */
export function resolveHeroComponent(items, index) {
  if (!Array.isArray(items) || items.length === 0) return null
  if (!Number.isFinite(index) || index < 0 || index >= items.length) {
    return items[0] ?? null
  }
  return items[index] ?? null
}

/**
 * Clamp revealed character count for typewriter reveal.
 * @param {number} visibleCount
 * @param {number} slotCount total slots (icon + text letters)
 */
export function clampVisibleCharCount(visibleCount, slotCount) {
  if (!Number.isFinite(slotCount) || slotCount < 0) return 0
  if (!Number.isFinite(visibleCount) || visibleCount < 0) return 0
  if (visibleCount > slotCount) return slotCount
  return Math.floor(visibleCount)
}

/**
 * Total typewriter slots: icon first, then one slot per name letter.
 * @param {string} name
 */
export function getHeroTypewriterSlotCount(name) {
  const textLength = typeof name === 'string' ? name.length : 0
  return textLength + HERO_TYPEWRITER_ICON_SLOTS
}

/**
 * Whether the icon slot has been revealed in the current typing pass.
 * @param {number} visibleCount
 */
export function shouldShowHeroIcon(visibleCount) {
  return clampVisibleCharCount(visibleCount, HERO_TYPEWRITER_ICON_SLOTS) >= HERO_TYPEWRITER_ICON_SLOTS
}

/**
 * Progressive label reveal — icon slot then full word (width animates in UI).
 * @param {string} text
 * @param {number} visibleCount
 */
export function getTypedHeroLabel(text, visibleCount) {
  const source = typeof text === 'string' ? text : ''
  const totalSlots = getHeroTypewriterSlotCount(source)
  const clamped = clampVisibleCharCount(visibleCount, totalSlots)
  if (clamped <= HERO_TYPEWRITER_ICON_SLOTS) return ''
  return source
}

/**
 * Longest label — used to reserve pill width like Notion measure span.
 * @param {ReadonlyArray<{ name: string }>} items
 */
export function getHeroLabelMeasureText(items = HOME_HERO_COMPONENTS) {
  if (!Array.isArray(items) || items.length === 0) return ''
  return items.reduce((longest, item) => {
    const name = item?.name ?? ''
    return name.length > longest.length ? name : longest
  }, '')
}

/**
 * Pure typewriter step machine for hero label cycling.
 * @param {{ phase: 'typing'|'hold'|'clearing', visibleCount: number, index: number, textLength: number, itemCount: number }} state
 */
export function stepHeroTypewriter(state) {
  const phase = state?.phase
  const textLength = Number.isFinite(state?.textLength) ? Math.max(0, state.textLength) : 0
  const itemCount = Number.isFinite(state?.itemCount) ? Math.max(0, state.itemCount) : 0
  const visibleCount = clampVisibleCharCount(state?.visibleCount, textLength)
  const index = Number.isFinite(state?.index) ? state.index : 0

  if (itemCount < 1) {
    return { phase: 'hold', visibleCount: 0, index: 0, delayMs: 0 }
  }

  if (phase === 'typing') {
    if (visibleCount < textLength) {
      return {
        phase: 'hold',
        visibleCount: textLength,
        index,
        delayMs: 'hold',
      }
    }
    return { phase: 'hold', visibleCount: textLength, index, delayMs: 'hold' }
  }

  if (phase === 'hold') {
    if (itemCount < 2) {
      return { phase: 'hold', visibleCount: textLength, index, delayMs: 'hold' }
    }
    // One round = type full word (e.g. P → PD → PDF), then jump to next word typing
    const nextIndex = nextHeroComponentIndex(index, itemCount)
    return { phase: 'typing', visibleCount: 0, index: nextIndex, delayMs: 'gap' }
  }

  return { phase: 'typing', visibleCount: 0, index, delayMs: 'char' }
}
