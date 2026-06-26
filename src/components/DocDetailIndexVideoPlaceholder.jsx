import { Play } from 'lucide-react'
import DocDetailIndexVideoModal from './DocDetailIndexVideoModal'
import { useDocDetailIndexVideo } from '../hooks/useDocDetailIndexVideo'
import {
  DOC_DETAIL_INDEX_VIDEO_DURATION,
  getDocDetailIndexVideoLabels,
} from '../utils/docDetailIndexVideo'

export default function DocDetailIndexVideoPlaceholder({
  isZhContent,
  title = '',
  enabled = true,
}) {
  const { isOpen, open, close } = useDocDetailIndexVideo()
  const labels = getDocDetailIndexVideoLabels(isZhContent)

  if (!enabled) {
    return null
  }
  const displayTitle = title.trim() || labels.fallbackTitle
  const duration = DOC_DETAIL_INDEX_VIDEO_DURATION

  return (
    <>
      <button
        type="button"
        className="docs-detail-index-video-placeholder"
        aria-label={
          isZhContent
            ? `${labels.playAriaLabel}：${displayTitle}，时长 ${duration}`
            : `${labels.playAriaLabel}: ${displayTitle}, ${duration}`
        }
        onClick={open}
      >
        <span className="docs-detail-index-video-preview">
          <span className="docs-detail-index-video-play" aria-hidden="true">
            <Play size={18} strokeWidth={0} fill="currentColor" />
          </span>
          <span className="docs-detail-index-video-duration" aria-hidden="true">
            {duration}
          </span>
        </span>
        <span className="docs-detail-index-video-caption">{displayTitle}</span>
      </button>
      <DocDetailIndexVideoModal
        isOpen={isOpen}
        isZhContent={isZhContent}
        title={displayTitle}
        onClose={close}
      />
    </>
  )
}
