import {
  FaFacebookF,
  FaWhatsapp,
  FaFacebookMessenger,
  FaGoogle,
  FaEnvelope,
  FaLink,
} from 'react-icons/fa'
import {
  getDocDetailSectionShareLabels,
  useDocDetailSectionShare,
} from '../hooks/useDocDetailSectionShare'

const SHARE_ITEMS = [
  { id: 'facebook', Icon: FaFacebookF, actionKey: 'facebook' },
  { id: 'whatsapp', Icon: FaWhatsapp, actionKey: 'whatsapp' },
  { id: 'messenger', Icon: FaFacebookMessenger, actionKey: 'messenger' },
  { id: 'google', Icon: FaGoogle, actionKey: 'google' },
  { id: 'email', Icon: FaEnvelope, actionKey: 'email' },
  { id: 'copyLink', Icon: FaLink, actionKey: 'copyLink' },
]

export default function DocDetailSectionShareButton({ isZhContent, title = '' }) {
  const { actions, isCopied } = useDocDetailSectionShare({ title })
  const labels = getDocDetailSectionShareLabels(isZhContent)

  return (
    <div className="docs-detail-section-share" role="group" aria-label={labels.shareAriaLabel}>
      <span className="docs-detail-section-share-label">{labels.shareLabel}</span>
      <div className="docs-detail-section-share-icons">
        {SHARE_ITEMS.map(({ id, Icon, actionKey }) => {
          const isCopyAction = actionKey === 'copyLink'
          const itemLabel = isCopyAction && isCopied ? labels.copiedAriaLabel : labels[id]

          return (
            <button
              key={id}
              type="button"
              className="docs-detail-section-share-btn"
              aria-label={itemLabel}
              title={itemLabel}
              onClick={actions[actionKey]}
            >
              <Icon size={15} aria-hidden="true" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
