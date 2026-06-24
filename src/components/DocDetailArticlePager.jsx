import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  getDocDetailArticleNavTargetLabel,
  getDocDetailArticlePagerLabels,
} from '../utils/docDetailArticleNav'

function DocDetailArticlePagerLink({
  direction,
  item,
  labels,
  onNavigate,
}) {
  const isPrevious = direction === 'previous'
  const label = isPrevious ? labels.previous : labels.next
  const ariaLabel = isPrevious ? labels.previousAriaLabel : labels.nextAriaLabel
  const targetLabel = getDocDetailArticleNavTargetLabel(item)

  if (!item) {
    return (
      <span
        className={`docs-detail-article-pager-link docs-detail-article-pager-link--${direction} is-disabled`}
        aria-hidden="true"
      />
    )
  }

  return (
    <button
      type="button"
      className={`docs-detail-article-pager-link docs-detail-article-pager-link--${direction}`}
      aria-label={`${ariaLabel}：${targetLabel}`}
      onClick={() => onNavigate(item.platformId, item.sectionId)}
    >
      {isPrevious ? <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" /> : null}
      <span className="docs-detail-article-pager-link-text">
        <span className="docs-detail-article-pager-link-label">{label}</span>
        <span className="docs-detail-article-pager-link-target">{targetLabel}</span>
      </span>
      {!isPrevious ? <ChevronRight size={16} strokeWidth={2} aria-hidden="true" /> : null}
    </button>
  )
}

export default function DocDetailArticlePager({
  prev,
  next,
  isZhContent,
  onNavigate,
}) {
  const labels = getDocDetailArticlePagerLabels(isZhContent)

  if (!prev && !next) {
    return null
  }

  return (
    <nav className="docs-detail-article-pager" aria-label={labels.navAriaLabel}>
      <DocDetailArticlePagerLink
        direction="previous"
        item={prev}
        labels={labels}
        onNavigate={onNavigate}
      />
      <DocDetailArticlePagerLink
        direction="next"
        item={next}
        labels={labels}
        onNavigate={onNavigate}
      />
    </nav>
  )
}
