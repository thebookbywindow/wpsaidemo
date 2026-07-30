import { useSyncExternalStore } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { FaAndroid, FaApple, FaLinux, FaMobileAlt, FaTabletAlt, FaWindows } from 'react-icons/fa'
import { HOME_V2_DOWNLOAD_SHIELD } from '../data/homeV2Assets'
import { HOME_TRUST_DOCK_PIN_DISABLE_MQ } from '../hooks/useHomeTrustDockPin'
import {
  alertPlatformDownload,
  detectAndAlertPlatformDownload,
} from '../utils/detectClientPlatform'

const subscribeHeroPlatformMobile = (onStoreChange) => {
  const mediaQuery = window.matchMedia(HOME_TRUST_DOCK_PIN_DISABLE_MQ)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}
const getHeroPlatformMobileSnapshot = () =>
  window.matchMedia(HOME_TRUST_DOCK_PIN_DISABLE_MQ).matches
const getHeroPlatformMobileServerSnapshot = () => false

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
  const isMobile = useSyncExternalStore(
    subscribeHeroPlatformMobile,
    getHeroPlatformMobileSnapshot,
    getHeroPlatformMobileServerSnapshot,
  )

  if (variant === 'hero') {
    const platformItems = groups.flatMap((group) => group.items ?? [])

    return (
      <div className="home-hero-platforms" aria-label={title || groupLabels?.platforms || 'Platforms'}>
        <div className="home-entity-catalog-panel home-entity-catalog-panel--hero">
          {ctaLabel ? (
            <div className="home-hero-actions">
              <button
                className="home-hero-download-btn"
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
            </div>
          ) : null}

          <div className="home-hero-platform-row">
            {title ? <span className="home-hero-platform-prefix">{title}</span> : null}
            <ul className="home-hero-platform-list">
              {platformItems.map((item) => (
                <li key={item.id}>
                  {isMobile ? (
                    <span className="home-hero-platform-link home-hero-platform-link--static">
                      <span className="home-hero-platform-label">{item.label}</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="home-hero-platform-link"
                      onClick={() => {
                        alertPlatformDownload(item.platform || item.label)
                      }}
                    >
                      <span className="home-hero-platform-label">{item.label}</span>
                      <ArrowUpRight
                        className="home-hero-platform-arrow"
                        size={12}
                        strokeWidth={2.25}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
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
