import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import {
  DOC_DETAIL_INDEX_DEMO_VIDEO_SRC,
  getDocDetailIndexVideoLabels,
} from '../utils/docDetailIndexVideo'

export default function DocDetailIndexVideoModal({
  isOpen,
  isZhContent,
  title,
  videoSrc = DOC_DETAIL_INDEX_DEMO_VIDEO_SRC,
  onClose,
}) {
  const titleId = useId()
  const closeButtonRef = useRef(null)
  const labels = getDocDetailIndexVideoLabels(isZhContent)
  const loadSession = isOpen ? videoSrc : ''
  const [loadSessionSeen, setLoadSessionSeen] = useState(loadSession)
  const [hasLoadError, setHasLoadError] = useState(false)
  if (loadSessionSeen !== loadSession) {
    setLoadSessionSeen(loadSession)
    setHasLoadError(false)
  }

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    closeButtonRef.current?.focus()

    return undefined
  }, [isOpen, videoSrc])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className="docs-detail-index-video-modal" role="presentation">
      <button
        type="button"
        className="docs-detail-index-video-modal-backdrop"
        aria-label={labels.closeAriaLabel}
        onClick={onClose}
      />
      <div
        className="docs-detail-index-video-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="docs-detail-index-video-modal-header">
          <h2 id={titleId} className="docs-detail-index-video-modal-title">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="docs-detail-index-video-modal-close"
            aria-label={labels.closeAriaLabel}
            onClick={onClose}
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </header>
        <div className="docs-detail-index-video-modal-body">
          {hasLoadError ? (
            <p className="docs-detail-index-video-modal-error">{labels.loadError}</p>
          ) : (
            <video
              key={videoSrc}
              className="docs-detail-index-video-modal-player"
              controls
              autoPlay
              playsInline
              preload="metadata"
              src={videoSrc}
              onError={() => setHasLoadError(true)}
            >
              <track kind="captions" />
            </video>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
