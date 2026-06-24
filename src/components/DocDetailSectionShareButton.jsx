import { Share2 } from 'lucide-react'
import {
  getDocDetailSectionShareLabels,
  useDocDetailSectionShare,
} from '../hooks/useDocDetailSectionShare'

export default function DocDetailSectionShareButton({ isZhContent, title = '' }) {
  const { share, isCopied } = useDocDetailSectionShare({ title })
  const labels = getDocDetailSectionShareLabels(isZhContent)

  return (
    <button
      type="button"
      className="docs-detail-section-share-btn"
      aria-label={isCopied ? labels.copiedAriaLabel : labels.shareAriaLabel}
      title={isCopied ? labels.copiedAriaLabel : labels.shareAriaLabel}
      onClick={share}
    >
      <Share2 size={16} strokeWidth={2} aria-hidden="true" />
    </button>
  )
}
