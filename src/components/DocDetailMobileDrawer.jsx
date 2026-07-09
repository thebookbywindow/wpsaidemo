import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function DocDetailMobileDrawer({
  side,
  isOpen = false,
  isMobile = false,
  onClose,
  panelLabel = '',
  showPanelHead = true,
  children,
}) {
  if (!isMobile) {
    return children
  }

  const isLeft = side === 'left'
  const CloseIcon = isLeft ? ChevronLeft : ChevronRight

  return (
    <div
      className={`docs-detail-mobile-drawer docs-detail-mobile-drawer--${side}${
        isOpen ? ' is-open' : ''
      }`}
    >
      <div
        className="docs-detail-mobile-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label={panelLabel}
        aria-hidden={!isOpen}
      >
        {showPanelHead ? (
          <div className="docs-detail-mobile-drawer-panel-head">
            <span className="docs-detail-mobile-drawer-panel-title">{panelLabel}</span>
            <button
              type="button"
              className="docs-detail-mobile-drawer-close"
              aria-label={panelLabel}
              title={panelLabel}
              onClick={onClose}
            >
              <CloseIcon size={16} strokeWidth={2.25} aria-hidden="true" />
            </button>
          </div>
        ) : null}
        <div className="docs-detail-mobile-drawer-panel-body">{children}</div>
      </div>
    </div>
  )
}
