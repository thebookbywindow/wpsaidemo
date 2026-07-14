import { FaAndroid, FaApple, FaLinux, FaMobileAlt, FaTabletAlt, FaWindows } from 'react-icons/fa'

const PLATFORM_ICON_MAP = {
  windows: FaWindows,
  mac: FaApple,
  ipad: FaTabletAlt,
  ios: FaMobileAlt,
  android: FaAndroid,
  linux: FaLinux,
}

/**
 * SEO/GEO entity strip: products + platforms with crawlable labels and internal links.
 */
export default function HomeEntityCatalog({ title, summary, groupLabels, groups, navigateTo }) {
  return (
    <section className="home-entity-catalog px-6 py-10" aria-labelledby="home-entity-catalog-title">
      <div className="home-section-inner mx-auto w-full max-w-[1160px]">
        <h2 id="home-entity-catalog-title" className="home-section-title text-center text-[clamp(20px,2.5vw,26px)] font-semibold text-[#1a202c]">
          {title}
        </h2>
        <p className="home-section-subtitle mx-auto mt-2 max-w-[760px] text-center text-[14px] leading-relaxed text-[#4a5568]">
          {summary}
        </p>

        <div className="home-entity-catalog-panel mt-8">
          {groups.map((group, groupIndex) => (
            <div key={group.id} className="home-entity-catalog-group">
              {groupIndex > 0 ? <div className="home-entity-catalog-divider" aria-hidden="true" /> : null}
              <div className="home-entity-catalog-group-body">
                <h3 className="home-entity-catalog-group-title">{groupLabels[group.id]}</h3>
                <ul className="home-entity-catalog-list">
                  {group.items.map((item) => {
                    const PlatformIcon = item.platform ? PLATFORM_ICON_MAP[item.platform] : null
                    const content = (
                      <>
                        <span
                          className={`home-entity-catalog-icon${item.platform ? ' home-entity-catalog-icon--platform' : ''}`}
                          style={item.color ? { background: item.color } : undefined}
                          aria-hidden="true"
                        >
                          {PlatformIcon ? <PlatformIcon /> : item.glyph}
                        </span>
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
                          <span className="home-entity-catalog-item home-entity-catalog-item--static">{content}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
