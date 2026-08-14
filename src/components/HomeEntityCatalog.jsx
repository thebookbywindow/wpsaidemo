import { FaAndroid, FaApple, FaLinux, FaMobileAlt, FaTabletAlt, FaWindows } from 'react-icons/fa'
import { HOME_V2_DOWNLOAD_SHIELD } from '../data/homeV2Assets'
import {
  detectAndAlertPlatformDownload,
} from '../utils/detectClientPlatform'

const PLATFORM_ICON_MAP = {
  windows: FaWindows,
  mac: FaApple,
  ipad: FaTabletAlt,
  ios: FaMobileAlt,
  android: FaAndroid,
  linux: FaLinux,
}

function PlatformList({ groups, groupLabels, navigateTo, showTitles = true }) {
  return groups.map((group) => (
    <div key={group.id} className="home-entity-catalog-group">
      <div className="home-entity-catalog-group-body">
        {showTitles && groupLabels?.[group.id] ? (
          <h3 className="home-entity-catalog-group-title">{groupLabels[group.id]}</h3>
        ) : null}
        <ul className="home-entity-catalog-list">
          {group.items.map((item) => {
            const PlatformIcon = PLATFORM_ICON_MAP[item.platform]
            const content = (
              <>
                {PlatformIcon ? (
                  <span
                    className="home-entity-catalog-icon home-entity-catalog-icon--platform"
                    aria-hidden="true"
                  >
                    <PlatformIcon />
                  </span>
                ) : null}
                <span className="home-entity-catalog-label">{item.label}</span>
              </>
            )

            return (
              <li key={item.id}>
                {item.path ? (
                  <a
                    className="home-entity-catalog-item"
                    href={item.path}
                    onClick={(event) => {
                      event.preventDefault()
                      navigateTo(item.path)
                    }}
                  >
                    {content}
                  </a>
                ) : (
                  <span className="home-entity-catalog-item home-entity-catalog-item--static">
                    {content}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  ))
}

/**
 * Platforms strip — full section, or compact hero panel with Free download inside.
 */
export default function HomeEntityCatalog({
  title,
  summary,
  groupLabels,
  groups,
  navigateTo,
  variant = 'section',
  ctaLabel,
}) {
  if (variant === 'hero') {
    const platformItems = groups.flatMap((group) => group.items ?? [])

    return (
      <div className="hv2-hero__actions home-hero-actions">
        {ctaLabel ? (
          <button
            className="hv2-hero__download home-hero-download-btn"
            type="button"
            aria-label="Free download WPS Office for your device"
            onClick={() => {
              detectAndAlertPlatformDownload()
            }}
          >
            <span>{ctaLabel}</span>
            <img
              className="home-hero-download-btn-shield"
              src={HOME_V2_DOWNLOAD_SHIELD}
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
              draggable={false}
            />
          </button>
        ) : null}
        <p className="hv2-hero__platforms">
          {title ? `${title}: ` : ''}
          {platformItems.map((item) => item.label).join(', ')}
        </p>
      </div>
    )
  }

  return (
    <section className="home-entity-catalog px-6 py-10" aria-labelledby="home-entity-catalog-title">
      <div className="home-section-inner mx-auto w-full max-w-[1160px]">
        <h2
          id="home-entity-catalog-title"
          className="home-section-title text-center text-[clamp(20px,2.5vw,26px)] font-semibold text-[#1a202c]"
        >
          {title}
        </h2>
        <p className="home-section-subtitle mx-auto mt-2 max-w-[760px] text-center text-[14px] leading-relaxed text-[#4a5568]">
          {summary}
        </p>

        <div className="home-entity-catalog-panel mt-8">
          <PlatformList groups={groups} groupLabels={groupLabels} navigateTo={navigateTo} />
        </div>
      </div>
    </section>
  )
}
