import {
  ALL_PRODUCTS_GROUP_ID_PREFIX,
  useAllProductsDirectory,
} from '../hooks/useAllProductsDirectory'
import { useHomeIntlAiStickyAnchorTabs } from '../hooks/useHomeIntlAiStickyAnchorTabs'
import { joinPath } from '../utils/pathUrl'

function AllProductsLink({ item, currentUrlLocale, navigateTo }) {
  const targetPath = joinPath(currentUrlLocale, item.path)

  return (
    <a
      className="intl-ai-dir-link"
      href={targetPath}
      onClick={(event) => {
        event.preventDefault()
        navigateTo(targetPath)
      }}
    >
      {item.displayName ?? item.name}
    </a>
  )
}

function AllProductsGroup({ group, isFirst, currentUrlLocale, navigateTo }) {
  if (!group?.items?.length) return null

  return (
    <article
      id={`${ALL_PRODUCTS_GROUP_ID_PREFIX}${group.id}`}
      data-pillar-id={group.id}
      className={`intl-ai-dir-group${isFirst ? '' : ' is-divided'}`}
    >
      <h2 className="intl-ai-dir-group-title">
        {group.iconSrc ? (
          <img
            className="intl-ai-dir-group-icon"
            src={group.iconSrc}
            alt=""
            draggable={false}
            decoding="async"
          />
        ) : null}
        <span>{group.title}</span>
      </h2>
      <div className="intl-ai-dir-list">
        {group.items.map((item) => (
          <AllProductsLink
            key={item.path ?? item.name}
            item={item}
            currentUrlLocale={currentUrlLocale}
            navigateTo={navigateTo}
          />
        ))}
      </div>
    </article>
  )
}

/**
 * Free AI Tools / all-products catalog — category sitemap only.
 */
export default function AllProductsPage({
  copy,
  sections,
  currentUrlLocale,
  navigateTo,
}) {
  const { groups, pillarIds, activeId, setActiveId } = useAllProductsDirectory(sections)
  const { tabsDockRef, scrollToPillar } = useHomeIntlAiStickyAnchorTabs({
    pillarIds,
    activeId,
    setActiveId,
    blockIdPrefix: ALL_PRODUCTS_GROUP_ID_PREFIX,
  })

  if (!groups.length) return null

  return (
    <div className="all-products-page bg-transparent">
      <section className="site-page-hero site-page-hero--aurora px-6 pt-12 pb-4">
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="text-center">
            <h1 className="text-[clamp(30px,4.5vw,48px)] font-extrabold tracking-[-0.03em] text-[#1a202c]">
              {copy?.title}
            </h1>
          </div>
        </div>
      </section>

      <section
        className="site-page-transition-section site-page-transition-section--aurora px-6 pt-2 pb-8"
        aria-label={copy?.title ?? 'Free AI Tools'}
      >
        <div className="mx-auto w-full max-w-[1160px]">
          <div ref={tabsDockRef} className="home-intl-ai-tabs-dock intl-ai-dir-tabs-dock">
            <div className="home-intl-ai-tabs-wrap">
              <nav
                className="home-intl-ai-tabs"
                aria-label={copy?.tabsAriaLabel ?? 'Product categories'}
              >
                {groups.map((group) => {
                  const selected = group.id === activeId
                  return (
                    <button
                      key={group.id}
                      type="button"
                      id={`all-products-tab-${group.id}`}
                      aria-current={selected ? 'true' : undefined}
                      className={`home-intl-ai-tab${selected ? ' is-active' : ''}`}
                      onClick={() => scrollToPillar(group.id)}
                    >
                      {group.iconSrc ? (
                        <img
                          className="home-intl-ai-tab-icon"
                          src={group.iconSrc}
                          alt=""
                          draggable={false}
                          decoding="async"
                        />
                      ) : null}
                      <span className="home-intl-ai-tab-name">{group.title}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          <div className="intl-ai-dir-panel">
            {groups.map((group, index) => (
              <AllProductsGroup
                key={group.id}
                group={group}
                isFirst={index === 0}
                currentUrlLocale={currentUrlLocale}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
