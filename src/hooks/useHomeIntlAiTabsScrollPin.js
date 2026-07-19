/**
 * Re-export intl AI sticky-tab scroll pin + shared math helpers.
 * Implementation lives in useHomeTabsScrollPin.js (shared with media proof).
 */
export {
  HOME_INTL_AI_STICKY_GAP_PX,
  HOME_INTL_AI_TAB_HYSTERESIS,
  getAdjacentIntlAiTabId,
  getIntlAiProgressFromTabIndex,
  getIntlAiScrollablePx,
  getIntlAiScrollProgress,
  getIntlAiTabHorizontalScrollLeft,
  getIntlAiTabIndexFromProgress,
  useHomeIntlAiTabsScrollPin,
} from './useHomeTabsScrollPin.js'
