import { Layers, ListTree } from 'lucide-react'

function DocDetailMobileDrawerNavButton({
  side,
  label,
  hint,
  icon: Icon,
  isOpen,
  onClick,
  showLabel = false,
}) {
  const accessibleLabel = hint ? `${hint}：${label}` : label

  return (
    <button
      type="button"
      className={`docs-detail-mobile-drawer-nav-btn docs-detail-mobile-drawer-nav-btn--${side}${
        showLabel ? ' docs-detail-mobile-drawer-nav-btn--with-label' : ''
      }${isOpen ? ' is-active' : ''}`}
      aria-label={accessibleLabel}
      aria-expanded={isOpen}
      title={accessibleLabel}
      onClick={onClick}
    >
      <Icon
        size={14}
        strokeWidth={2.2}
        className="docs-detail-mobile-drawer-nav-btn-icon"
        aria-hidden="true"
      />
      {showLabel ? (
        <span className="docs-detail-mobile-drawer-nav-btn-label">{label}</span>
      ) : null}
    </button>
  )
}

export { DocDetailMobileDrawerNavButton }

export default function DocDetailMobileDrawerNav({
  leftLabel,
  leftHint,
  leftOpen,
  onLeftToggle,
  rightLabel,
  rightHint,
  rightOpen,
  onRightToggle,
  rightIcon: RightIcon = Layers,
  showLeft = true,
  showRight = true,
}) {
  return (
    <div className="docs-detail-mobile-drawer-nav" role="toolbar" aria-label={leftLabel}>
      {showLeft ? (
        <DocDetailMobileDrawerNavButton
          side="left"
          label={leftLabel}
          hint={leftHint}
          icon={ListTree}
          isOpen={leftOpen}
          onClick={onLeftToggle}
        />
      ) : null}
      {showRight ? (
        <DocDetailMobileDrawerNavButton
          side="right"
          label={rightLabel}
          hint={rightHint}
          icon={RightIcon}
          isOpen={rightOpen}
          onClick={onRightToggle}
        />
      ) : null}
    </div>
  )
}
