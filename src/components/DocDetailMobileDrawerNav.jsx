import { Layers, ListTree } from 'lucide-react'

function DocDetailMobileDrawerNavButton({
  side,
  label,
  hint,
  icon: Icon,
  isOpen,
  onClick,
}) {
  const accessibleLabel = hint ? `${hint}：${label}` : label

  return (
    <button
      type="button"
      className={`docs-detail-mobile-drawer-nav-btn docs-detail-mobile-drawer-nav-btn--${side}${
        isOpen ? ' is-active' : ''
      }`}
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
    </button>
  )
}

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
  showRight = true,
}) {
  return (
    <div className="docs-detail-mobile-drawer-nav" role="toolbar" aria-label={leftLabel}>
      <DocDetailMobileDrawerNavButton
        side="left"
        label={leftLabel}
        hint={leftHint}
        icon={ListTree}
        isOpen={leftOpen}
        onClick={onLeftToggle}
      />
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
