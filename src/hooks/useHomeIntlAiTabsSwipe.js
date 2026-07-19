/**
 * @deprecated Capsule gestures were replaced by scroll-pin tab switching.
 * Re-export kept so older imports / validators keep resolving.
 */
export {
  getAdjacentIntlAiTabId,
  getIntlAiProgressFromTabIndex,
  getIntlAiScrollProgress,
  getIntlAiTabIndexFromProgress,
  HOME_INTL_AI_STICKY_GAP_PX,
  useHomeIntlAiTabsScrollPin as useHomeIntlAiTabsSwipe,
} from './useHomeIntlAiTabsScrollPin.js'
